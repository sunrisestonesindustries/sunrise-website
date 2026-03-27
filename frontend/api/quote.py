import json
import os
import smtplib
from datetime import datetime
from email.message import EmailMessage
from http.server import BaseHTTPRequestHandler


class QuoteEmailError(RuntimeError):
    """Raised when sending the quote email fails at a known SMTP step."""


def json_response(handler, status_code, payload):
    body = json.dumps(payload).encode("utf-8")
    handler.send_response(status_code)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.send_header("Access-Control-Allow-Origin", "*")
    handler.send_header("Access-Control-Allow-Headers", "Content-Type")
    handler.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
    handler.end_headers()
    handler.wfile.write(body)


def read_request_json(handler):
    content_length = int(handler.headers.get("content-length", "0") or "0")
    raw_body = handler.rfile.read(content_length) if content_length > 0 else b"{}"

    try:
        return json.loads(raw_body.decode("utf-8") or "{}")
    except json.JSONDecodeError as error:
        raise ValueError("Invalid JSON body.") from error


def normalize_smtp_password(password):
    """Allow pasted Gmail app passwords with visual spacing."""
    return "".join((password or "").split())


def normalize_quote_payload(data):
    normalized = {}
    for key, value in (data or {}).items():
        normalized[key] = value.strip() if isinstance(value, str) else value

    required_fields = ["name", "contact", "email", "country", "state", "inquiry"]
    missing_fields = [field for field in required_fields if not normalized.get(field)]
    if missing_fields:
        raise ValueError(f"Missing required fields: {', '.join(missing_fields)}")

    return normalized


def build_quote_email(data):
    cart_items = data.get("cartItems") or []
    lines = [
        "New quote request received.",
        "",
        f"Full Name: {data.get('name', '')}",
        f"Phone/Contact: {data.get('contact', '')}",
        f"Email: {data.get('email', '')}",
        f"Country: {data.get('country', '')}",
        f"State/Region: {data.get('state', '')}",
        "",
        "Inquiry:",
        data.get("inquiry", ""),
        "",
        "Cart Details:",
    ]

    if cart_items:
        for index, item in enumerate(cart_items, start=1):
            lines.extend([
                f"{index}. {item.get('stoneName', 'Stone item')}",
                f"   Product Code: {item.get('stoneCode', '')}",
                f"   Size: {item.get('size', '')}",
                f"   Finish: {item.get('finish', '')}",
                f"   Edge: {item.get('edge', '')}",
                f"   Quantity: {item.get('sqm', '')}",
            ])
    else:
        lines.append("No cart items were attached to this request.")

    return "\n".join(lines)


def send_quote_email(data):
    smtp_host = os.environ.get("SMTP_HOST")
    smtp_port = int(os.environ.get("SMTP_PORT", "587"))
    smtp_user = os.environ.get("SMTP_USER")
    smtp_pass = normalize_smtp_password(os.environ.get("SMTP_PASS"))
    quote_to_email = os.environ.get("QUOTE_TO_EMAIL", "sunrisestonesindustries@gmail.com")

    if not smtp_host or not smtp_user or not smtp_pass:
        raise QuoteEmailError(
            "SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in Vercel project settings."
        )

    message = EmailMessage()
    message["Subject"] = f"Quote Request from {data.get('name', 'Customer')}"
    message["From"] = smtp_user
    message["To"] = quote_to_email
    if data.get("email"):
        message["Reply-To"] = data["email"]
    message.set_content(build_quote_email(data))

    try:
        with smtplib.SMTP(smtp_host, smtp_port, timeout=20) as server:
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(smtp_user, smtp_pass)
            server.send_message(message)
    except smtplib.SMTPAuthenticationError as error:
        raise QuoteEmailError(
            "SMTP authentication failed during login. Gmail usually requires a Google App Password, not the normal account password."
        ) from error
    except smtplib.SMTPConnectError as error:
        raise QuoteEmailError(f"Failed to connect to SMTP server {smtp_host}:{smtp_port}.") from error
    except smtplib.SMTPServerDisconnected as error:
        raise QuoteEmailError("SMTP server disconnected before the email was sent.") from error
    except smtplib.SMTPException as error:
        raise QuoteEmailError(f"SMTP error while sending quote email: {error}") from error


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.end_headers()

    def do_GET(self):
        json_response(self, 405, {"error": "Method not allowed. Use POST."})

    def do_POST(self):
        try:
            data = normalize_quote_payload(read_request_json(self))
            send_quote_email(data)
        except ValueError as error:
            json_response(self, 400, {"error": str(error)})
            return
        except QuoteEmailError as error:
            json_response(self, 500, {"error": str(error)})
            return
        except Exception as error:
            json_response(self, 500, {"error": f"Failed to send quote email: {error}"})
            return

        json_response(
            self,
            201,
            {
                "status": "success",
                "message": "Quote request received. We will contact you soon.",
                "request_id": f"SR-{datetime.now().strftime('%Y%m%d%H%M%S')}",
                "timestamp": datetime.now().isoformat(),
            },
        )

    def log_message(self, format_string, *args):
        return
