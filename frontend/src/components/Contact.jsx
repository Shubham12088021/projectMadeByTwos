import "./contact.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/contact", {
        name,
        email,
        message,
      });

      toast.success("Message sent successfully!");
      form.reset();
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-wrapper">
        <h2>Let’s keep in touch</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name</label>
            <input type="text" name="name" required />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" required />
          </div>

          <div className="form-group">
            <label>Your Message</label>
            <textarea name="message" rows="4" required></textarea>
          </div>

          <button
            type="submit"
            className="contact-btn"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message →"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
