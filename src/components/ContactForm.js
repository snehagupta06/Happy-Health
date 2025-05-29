import React, { useState } from "react";
import "./ContactForm.css"; // Create this CSS file

const ContactForm = () => {
  const [contact, setContact] = useState({ name: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
    setContact({ name: "", message: "" });
  };

  return (
    <div className="contact-form">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <label>Your Name</label>
        <input
          type="text"
          value={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
          required
        />

        <label>Your Message</label>
        <textarea
          value={contact.message}
          onChange={(e) => setContact({ ...contact, message: e.target.value })}
          rows="5"
          required
        />

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ContactForm;
