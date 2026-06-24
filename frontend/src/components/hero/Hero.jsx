import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="spotlight"></div>

      <div className="hero-content">
        <div className="availability">🟢 Available for Internships</div>

        <h1>
          Hi, I'm <span>Nisat Sama</span>
        </h1>

        <h2>
          Aspiring Software Engineer &
          <br />
          Full Stack Developer
        </h2>

        <p>
          Building scalable web applications, solving DSA problems, and
          transforming ideas into impactful products.
        </p>

        <div className="hero-buttons">
          <a href="#projects" className="primary-btn">
            View Projects
          </a>

          <a href="/NisatSama.pdf" className="secondary-btn">
            Resume
          </a>
        </div>
      </div>

      <div className="floating-cards">
        <div className="card react">⚛ React</div>
        <div className="card java">☕ Java</div>
        <div className="card node">🚀 Node.js</div>
        <div className="card mongo">🍃 MongoDB</div>
        <div className="card dsa">🧠 DSA</div>
      </div>
    </section>
  );
}
