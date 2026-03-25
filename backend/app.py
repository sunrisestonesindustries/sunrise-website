"""
SUNRISE INDUSTRIES - Flask Backend API
"""

import os
import smtplib
from email.message import EmailMessage
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from datetime import datetime


def load_env_file():
    """Load simple KEY=VALUE pairs from backend/.env without extra dependencies."""
    env_path = os.path.join(os.path.dirname(__file__), '.env')
    if not os.path.exists(env_path):
        return

    with open(env_path, 'r', encoding='utf-8') as env_file:
        for raw_line in env_file:
            line = raw_line.strip()
            if not line or line.startswith('#') or '=' not in line:
                continue

            key, value = line.split('=', 1)
            key = key.strip()
            value = value.strip().strip('"').strip("'")

            if key and key not in os.environ:
                os.environ[key] = value


load_env_file()

BASE_DIR = os.path.dirname(__file__)
FRONTEND_BUILD_DIR = os.path.abspath(os.path.join(BASE_DIR, '..', 'frontend', 'build'))

app = Flask(__name__, static_folder=FRONTEND_BUILD_DIR, static_url_path='/')

# Enable CORS to allow requests from React frontend
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Company data
COMPANY_DATA = {
    "name": "SUNRISE INDUSTRIES",
    "description": "Premium Tandur Limestone Exporters to USA",
    "tagline": "Exquisite natural stone for international markets",
    "email": "sunrisestoneindustries@gmail.com",
    "phone": "+1 (800) SUNRISE-1",
    "location": "Export Partners, USA Headquarters"
}

# Products data
PRODUCTS = [
    {
        "id": 1,
        "name": "Blue",
        "color": "#357abd",
        "description": "Deep and sophisticated blue tones for premium applications",
        "gradient": "linear-gradient(135deg, #4a90e2 0%, #357abd 100%)"
    },
    {
        "id": 2,
        "name": "Yellow",
        "color": "#d4a545",
        "description": "Warm and elegant golden yellow finishes",
        "gradient": "linear-gradient(135deg, #f5d76e 0%, #d4a545 100%)"
    },
    {
        "id": 3,
        "name": "Gray",
        "color": "#7a7a7a",
        "description": "Neutral gray tones with modern elegance",
        "gradient": "linear-gradient(135deg, #a8a8a8 0%, #7a7a7a 100%)"
    },
    {
        "id": 4,
        "name": "Black",
        "color": "#0f0f0f",
        "description": "Rich black limestone for contemporary designs",
        "gradient": "linear-gradient(135deg, #2a2a2a 0%, #0f0f0f 100%)"
    }
]

# Features data
FEATURES = [
    {
        "id": 1,
        "icon": "🏔️",
        "title": "Premium Quality",
        "description": "Sourced from the finest Tandur quarries, ensuring superior durability and aesthetic appeal for your projects."
    },
    {
        "id": 2,
        "icon": "📐",
        "title": "Custom Sizes",
        "description": "We provide bespoke sizing options tailored to your specific requirements and project specifications."
    },
    {
        "id": 3,
        "icon": "🌍",
        "title": "Global Export",
        "description": "Reliable international shipping and logistics to ensure your limestone arrives in perfect condition."
    }
]

# About data
ABOUT_DATA = {
    "title": "About SUNRISE INDUSTRIES",
    "content": [
        "SUNRISE INDUSTRIES has established itself as a leading exporter of premium Tandur limestone to markets across the USA and beyond.",
        "With a commitment to quality, sustainability, and customer satisfaction, we provide natural stone solutions for residential, commercial, and industrial applications."
    ],
    "offerings": [
        "Premium Tandur limestone in four exclusive colors",
        "Custom sizing for all project requirements",
        "Competitive international pricing",
        "Reliable and timely delivery",
        "Expert consultation and support",
        "Sustainable sourcing practices"
    ]
}

# Contact data
CONTACT_INFO = {
    "email": "sunrisestoneindustries@gmail.com",
    "phone": "+1 (800) SUNRISE-1",
    "location": "Export Partners, USA Headquarters"
}


class QuoteEmailError(RuntimeError):
    """Raised when the quote email flow fails at a known SMTP step."""


def build_quote_email(data):
    cart_items = data.get('cartItems') or []
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
        data.get('inquiry', ''),
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
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_pass = os.environ.get('SMTP_PASS')
    quote_to_email = os.environ.get('QUOTE_TO_EMAIL', 'sunrisestoneindustries@gmail.com')

    if not smtp_host or not smtp_user or not smtp_pass:
        raise RuntimeError('SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS.')

    message = EmailMessage()
    message['Subject'] = f"Quote Request from {data.get('name', 'Customer')}"
    message['From'] = smtp_user
    message['To'] = quote_to_email
    if data.get('email'):
        message['Reply-To'] = data['email']
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
            'SMTP authentication failed during login. Gmail usually requires a Google App Password, not the normal account password.'
        ) from error
    except smtplib.SMTPConnectError as error:
        raise QuoteEmailError(f'Failed to connect to SMTP server {smtp_host}:{smtp_port}.') from error
    except smtplib.SMTPServerDisconnected as error:
        raise QuoteEmailError('SMTP server disconnected before the email was sent.') from error
    except smtplib.SMTPException as error:
        raise QuoteEmailError(f'SMTP error while sending quote email: {error}') from error


def test_smtp_connection():
    """Verify SMTP config, TLS, and login without sending an email."""
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_pass = os.environ.get('SMTP_PASS')

    if not smtp_host or not smtp_user or not smtp_pass:
        raise QuoteEmailError('SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS.')

    try:
        with smtplib.SMTP(smtp_host, smtp_port, timeout=20) as server:
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(smtp_user, smtp_pass)
    except smtplib.SMTPAuthenticationError as error:
        raise QuoteEmailError(
            'SMTP authentication failed during login. Gmail usually requires a Google App Password, not the normal account password.'
        ) from error
    except smtplib.SMTPConnectError as error:
        raise QuoteEmailError(f'Failed to connect to SMTP server {smtp_host}:{smtp_port}.') from error
    except smtplib.SMTPServerDisconnected as error:
        raise QuoteEmailError('SMTP server disconnected before login completed.') from error
    except smtplib.SMTPException as error:
        raise QuoteEmailError(f'SMTP error while testing login: {error}') from error


# Routes

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "ok", "timestamp": datetime.now().isoformat()})


@app.route('/api/company', methods=['GET'])
def get_company():
    """Get company information"""
    return jsonify(COMPANY_DATA)


@app.route('/api/products', methods=['GET'])
def get_products():
    """Get all products"""
    return jsonify({"products": PRODUCTS})


@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Get specific product by ID"""
    product = next((p for p in PRODUCTS if p['id'] == product_id), None)
    if product:
        return jsonify(product)
    return jsonify({"error": "Product not found"}), 404


@app.route('/api/features', methods=['GET'])
def get_features():
    """Get all features"""
    return jsonify({"features": FEATURES})


@app.route('/api/about', methods=['GET'])
def get_about():
    """Get about information"""
    return jsonify(ABOUT_DATA)


@app.route('/api/contact', methods=['GET'])
def get_contact():
    """Get contact information"""
    return jsonify(CONTACT_INFO)


@app.route('/api/debug-smtp', methods=['GET'])
def debug_smtp():
    """Temporary debug route to validate SMTP configuration."""
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = os.environ.get('SMTP_PORT', '587')
    smtp_user = os.environ.get('SMTP_USER')
    smtp_pass = os.environ.get('SMTP_PASS')

    try:
        test_smtp_connection()
    except QuoteEmailError as error:
        return jsonify({
            "status": "error",
            "stage": "smtp_login",
            "error": str(error),
            "config": {
                "smtp_host": smtp_host,
                "smtp_port": smtp_port,
                "smtp_user": smtp_user,
                "smtp_pass_set": bool(smtp_pass),
                "smtp_pass_length": len(smtp_pass) if smtp_pass else 0,
            }
        }), 500

    return jsonify({
        "status": "ok",
        "message": "SMTP connection and login succeeded.",
        "config": {
            "smtp_host": smtp_host,
            "smtp_port": smtp_port,
            "smtp_user": smtp_user,
            "smtp_pass_set": bool(smtp_pass),
            "smtp_pass_length": len(smtp_pass) if smtp_pass else 0,
        }
    })


@app.route('/api/quote', methods=['POST'])
def request_quote():
    """Handle quote requests"""
    data = request.get_json() or {}
    
    # Validate required fields
    required_fields = ['name', 'contact', 'email', 'country', 'state', 'inquiry']
    missing_fields = [field for field in required_fields if not data.get(field)]
    if missing_fields:
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

    try:
        send_quote_email(data)
    except QuoteEmailError as error:
        return jsonify({"error": str(error)}), 500
    except Exception as error:
        return jsonify({"error": f"Failed to send quote email: {error}"}), 500

    quote_request = {
        "status": "success",
        "message": "Quote request received. We will contact you soon.",
        "request_id": f"SR-{datetime.now().strftime('%Y%m%d%H%M%S')}",
        "timestamp": datetime.now().isoformat()
    }

    return jsonify(quote_request), 201


@app.route('/api/inquiry', methods=['POST'])
def send_inquiry():
    """Handle general inquiries"""
    data = request.get_json()
    
    if not data.get('name') or not data.get('email') or not data.get('message'):
        return jsonify({"error": "Name, email, and message are required"}), 400
    
    inquiry = {
        "status": "success",
        "message": "Inquiry received. We will respond shortly.",
        "inquiry_id": f"INQ-{datetime.now().strftime('%Y%m%d%H%M%S')}",
        "timestamp": datetime.now().isoformat()
    }
    
    return jsonify(inquiry), 201


@app.route('/api/testimonials', methods=['GET'])
def get_testimonials():
    """Get testimonials"""
    testimonials = [
        {
            "id": 1,
            "name": "John Smith",
            "company": "Premium Builders Inc.",
            "text": "SUNRISE INDUSTRIES provided exceptional quality limestone for our luxury project. Highly recommended!",
            "rating": 5
        },
        {
            "id": 2,
            "name": "Maria Garcia",
            "company": "Metropolitan Constructions",
            "text": "The custom sizing options and delivery efficiency are outstanding. Great partnership!",
            "rating": 5
        },
        {
            "id": 3,
            "name": "David Chen",
            "company": "Modern Architects Ltd.",
            "text": "Top-tier natural stone with excellent customer service. Best supplier we've worked with.",
            "rating": 5
        }
    ]
    return jsonify({"testimonials": testimonials})


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    """Serve the React production build when it exists."""
    if not os.path.isdir(FRONTEND_BUILD_DIR):
        return jsonify({"error": "Frontend build not found. Run the frontend build before deployment."}), 404

    requested_path = os.path.join(FRONTEND_BUILD_DIR, path)
    if path and os.path.exists(requested_path):
        return send_from_directory(FRONTEND_BUILD_DIR, path)

    return send_from_directory(FRONTEND_BUILD_DIR, 'index.html')


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
