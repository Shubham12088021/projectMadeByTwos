import "./contact.css";

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    const mailtoLink = `mailto:support@yourbrand.com?subject=Contact from ${name}&body=From: ${email}%0D%0A%0D%0A${message}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="contact-page">
      <div className="contact-wrapper">
        <h2>Let’s keep in touch</h2>
        <p className="contact-subtitle">
          We’d love to hear from you. Feel free to reach out anytime.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Your Message</label>
            <textarea
              name="message"
              rows="4"
              placeholder="Type your message..."
              required
            ></textarea>
          </div>

          <button type="submit" className="contact-btn">
            Send Message →
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
