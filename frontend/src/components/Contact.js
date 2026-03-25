import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

function Contact({ contact }) {
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuoteForm({ ...quoteForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/quote', quoteForm);
      setSubmitted(true);
      setQuoteForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting quote:', error);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <h2>Get in <span>Touch</span></h2>
        <p>Reach out to us for quotes, inquiries, or custom orders</p>

        <div className="contact-grid">
          <div className="contact-card">
            <h3>📧 Email</h3>
            <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
          </div>

          <div className="contact-card">
            <h3>📞 Phone</h3>
            <p><a href={`tel:${contact.phone}`}>{contact.phone}</a></p>
          </div>

          <div className="contact-card">
            <h3>📍 Location</h3>
            <p>{contact.location}</p>
          </div>
        </div>

        <form className="quote-form" onSubmit={handleSubmit}>
          <h3>Request a Quote</h3>
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={quoteForm.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={quoteForm.email}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            value={quoteForm.phone}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Tell us about your project..."
            rows="4"
            value={quoteForm.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit" className="cta-button-light">Send Quote Request</button>
          {submitted && <p className="success-message">Quote request sent successfully!</p>}
        </form>
      </div>
    </section>
  );
}

export default Contact;
