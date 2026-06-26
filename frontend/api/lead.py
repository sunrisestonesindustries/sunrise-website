import json
import os
import smtplib
from datetime import datetime
from email.message import EmailMessage
from http.server import BaseHTTPRequestHandler


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
    return "".join((password or "").split())


def send_lead_email(data):
    smtp_host = os.environ.get("SMTP_HOST")
    smtp_port = int(os.environ.get("SMTP_PORT", "587"))
    smtp_user = os.environ.get("SMTP_USER")
    smtp_pass = normalize_smtp_password(os.environ.get("SMTP_PASS"))
    lead_to_email = os.environ.get("QUOTE_TO_EMAIL", "sunrisestonesindustries@gmail.com")

    if not smtp_host or not smtp_user or not smtp_pass:
        raise RuntimeError("SMTP not configured.")

    name  = (data.get("name") or "").strip()
    phone = (data.get("phone") or "").strip()
    email = (data.get("email") or "").strip()

    if not name or not phone or not email:
        raise ValueError("Missing required fields: name, phone, email.")

    body = "\n".join([
        "New lead captured via exit intent popup.",
        "",
        f"Name:  {name}",
        f"Phone: {phone}",
        f"Email: {email}",
        "",
        f"Captured at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S UTC')}",
    ])

    msg = EmailMessage()
    msg["Subject"] = f"New Lead: {name}"
    msg["From"]    = smtp_user
    msg["To"]      = lead_to_email
    msg["Reply-To"] = email
    msg.set_content(body)

    with smtplib.SMTP(smtp_host, smtp_port, timeout=20) as server:
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(smtp_user, smtp_pass)
        server.send_message(msg)


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.end_headers()

    def do_GET(self):
        json_response(self, 405, {"error": "Method not allowed."})

    def do_POST(self):
        try:
            data = read_request_json(self)
            send_lead_email(data)
        except ValueError as error:
            json_response(self, 400, {"error": str(error)})
            return
        except Exception as error:
            json_response(self, 500, {"error": str(error)})
            return

        json_response(self, 201, {
            "status": "success",
            "message": "Lead captured.",
        })

    def log_message(self, format_string, *args):
        return
