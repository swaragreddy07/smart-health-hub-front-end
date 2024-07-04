//This is the Contact Us Page
import React from 'react';
import Header from './Header';

function ContactUs() {
  return (
    <div>
      <Header />
      <section className="contact-us">
        <div className="container">
          <div className="contact-form-container">
            <h2>Contact Us</h2>
            <form className="contact-form">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" required></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="contact-image">
            <img src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?w=740&t=st=1709817154~exp=1709817754~hmac=7cfbf62d4d7a82cf7569ebbd9650bc50003e25927553afedd24518b98a25a897" alt="Contact Us" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
