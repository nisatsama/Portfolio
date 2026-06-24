import "./Contact.css";

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <span className="contact-tag">LET'S CONNECT</span>
          <h2>Got an Idea? Let's Build It Together 🚀</h2>
          <p>
            Whether it's an internship opportunity, a project collaboration, or
            just a friendly tech conversation, my inbox is always open.
          </p>
        </div>

        <div className="contact-card">
          <div className="contact-info">
            <h3>Reach Out</h3>

            <div className="info-item">
              <span>📧</span>
              <a href="mailto:nisatsama7547@gmail.com">
                nisatsama7547@gmail.com
              </a>
            </div>

            {/* <div className="info-item">
              <span>📱</span>
              <a href="tel:+91XXXXXXXXXX">+91 XXXXX XXXXX</a>
            </div> */}

            <div className="info-item">
              <span>📍</span>
              <p>Kolkata, India</p>
            </div>
          </div>

          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />

            <input type="email" placeholder="Your Email" required />

            <textarea
              rows="5"
              placeholder="Tell me about your project..."
              required
            ></textarea>

            <button type="submit">Send Message ✨</button>
          </form>
        </div>

        <div className="social-links">
          <a
            href="https://github.com/nisatsama"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <a
            href="http://linkedin.com/in/nisat-sama-aa02a53a3"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=nisatsama7547@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            📧 Email
          </a>
          {/* <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noreferrer"
          >
            Leetcode GeekforGeeks Resume
          </a> */}
        </div>
      </div>
    </section>
  );
}

export default Contact;
