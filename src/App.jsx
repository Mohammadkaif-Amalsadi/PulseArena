import { useMemo, useState } from "react";

const profile = {
  name: "Mohammadkaif I. Amalsadi",
  title: "Software Developer",
  subtitle:
    "Backend-focused developer building practical products with Java, Spring Boot, React, Node.js, cloud deployment, data systems, and multiplayer game tooling.",
  location: "Navsari, Gujarat, India",
  email: "amalsadikaif98@gmail.com",
  phone: "+91 97732 79670",
  github: "https://github.com/Mohammadkaif-Amalsadi/PulseArena",
  linkedin: "https://www.linkedin.com/in/kaif-amalsadi-30583730a/",
  photo: "/assets/images/profile-photo.jpg",
};

const services = [
  {
    title: "Backend Development",
    text: "Designing Java and Spring Boot applications, REST APIs, WebSocket-powered features, and structured backend systems that are ready for real usage.",
  },
  {
    title: "Automation & Data Systems",
    text: "Building admin-friendly workflows for record processing, Excel and Google Sheets operations, validation, parsing, and reliable internal tooling.",
  },
  {
    title: "Game & Multiplayer Systems",
    text: "Working on multiplayer backends, player sessions, authentication flows, real-time state handling, and gameplay-support systems for online experiences.",
  },
];

const skills = [
  "Java",
  "Spring Boot",
  "Node.js",
  "React",
  "REST APIs",
  "WebSockets",
  "AWS EC2",
  "AWS RDS",
  "MySQL",
  "Git & GitHub",
  "MS Excel",
  "Google Sheets",
  "Data Verification",
  "Record Management",
];

const timeline = [
  {
    heading: "Java Full Stack Development",
    meta: "Besant Technologies, Bangalore • 2025 – Present",
    body: "Focused on backend development, modern application workflows, and full-stack implementation with hands-on product building.",
  },
  {
    heading: "B.Sc. in Information Technology",
    meta: "BMIIT, Gujarat • Feb 2022 – Mar 2024 • CGPA 7.68/10",
    body: "Built the technical foundation in programming, systems, software development, and digital problem solving.",
  },
  {
    heading: "B.Sc. in Data Science & Programming",
    meta: "Online • Jun 2024 – Mar 2025",
    body: "Expanded problem-solving ability through data-centric thinking, structured workflows, and technical analysis.",
  },
];

const experience = [
  {
    heading: "Data Entry Operator",
    meta: "PRO • Feb 2025 – Nov 2025",
    bullets: [
      "Maintained accurate trade and transaction records for users inside gaming-related platforms.",
      "Performed routine data entry, verification, and user information updates.",
      "Managed digital records and improved consistency across internal systems.",
      "Resolved mismatched user data and organized structured digital information.",
    ],
  },
];

const projects = [
  {
    title: "Real-Time Chat Application",
    stack: "Java, Spring Boot, React, WebSockets",
    text: "Built a real-time bi-directional messaging system using WebSockets and STOMP with live session tracking and instant message routing.",
  },
  {
    title: "Discord Community Bot",
    stack: "Java, JDA",
    text: "Developed an event-driven Discord bot for automated moderation, persistent user data handling, and multi-user community workflows.",
  },
  {
    title: "Cloud-Deployed REST API",
    stack: "Java, Spring Boot, AWS, MySQL",
    text: "Deployed Spring Boot APIs on AWS EC2 with RDS MySQL and configured IAM, security groups, and production-style environment setup.",
  },
  {
    title: "Multiplayer Game Backend",
    stack: "Node.js, REST APIs",
    text: "Built backend services for a 2D multiplayer game including player authentication, session handling, and character data management.",
  },
  {
    title: "Automated Record Parsing & Excel Tool",
    stack: "Excel Automation, Parsing, Data Ops",
    text: "Created a tool to parse user replies and automatically store records in structured Excel sheets, reducing manual effort and improving consistency.",
  },
  {
    title: "Community Management System",
    stack: "Admin Systems, User Records",
    text: "Managed user records, moderation logs, and backend support operations for online communities with high daily interaction.",
  },
];

const portfolioPoints = [
  "Pokemon-inspired 2D MMORPG direction built in Unity 2D.",
  "Multiplayer handling for online interaction and session flow.",
  "Sprite-driven maps, route progression, and world navigation systems.",
  "Atmosphere-focused audio work including music integration.",
  "The project is still under development and evolving into a larger playable world.",
];

function HeroPortrait() {
  const [hasImageError, setHasImageError] = useState(false);

  if (!hasImageError) {
    return (
      <div className="portrait-frame">
        <img
          className="portrait-image"
          src={profile.photo}
          alt={`${profile.name} portrait`}
          loading="eager"
          onError={() => setHasImageError(true)}
        />
        <div className="portrait-badge">
          <span>Photo Slot</span>
          <strong>Replace `/assets/images/profile-photo.jpg` anytime</strong>
        </div>
      </div>
    );
  }

  return (
    <div className="portrait-frame portrait-fallback">
      <div className="portrait-orb" />
      <div className="portrait-copy">
        <span>Profile image placeholder</span>
        <strong>Add `public/assets/images/profile-photo.jpg`</strong>
      </div>
    </div>
  );
}

function App() {
  const quickLinks = useMemo(
    () => [
      { label: "GitHub", href: profile.github },
      { label: "LinkedIn", href: profile.linkedin },
      { label: "Email", href: `mailto:${profile.email}` },
    ],
    []
  );

  return (
    <div className="portfolio-app">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <nav className="navbar">
        <div className="brand">Mohammadkaif</div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#contact" className="nav-cta">
            Contact
          </a>
        </div>
      </nav>

      <main className="page-shell">
        <section id="home" className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow">Portfolio</span>
            <h1>Hello, I&apos;m {profile.name}</h1>
            <h2>{profile.title}</h2>
            <p>{profile.subtitle}</p>

            <div className="hero-actions">
              <a className="primary-button" href="#projects">
                View Projects
              </a>
              <a className="secondary-button" href="#contact">
                Contact Me
              </a>
            </div>

            <div className="hero-links">
              {quickLinks.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              ))}
            </div>

            <div className="hero-stats">
              <article>
                <strong>6+</strong>
                <span>Project highlights</span>
              </article>
              <article>
                <strong>2</strong>
                <span>Resume profiles</span>
              </article>
              <article>
                <strong>AWS</strong>
                <span>Cloud deployment experience</span>
              </article>
            </div>
          </div>

          <div className="hero-visual">
            <HeroPortrait />
          </div>
        </section>

        <section id="about" className="content-section">
          <div className="section-header">
            <span className="eyebrow">About</span>
            <h3>Blending software development with data accuracy and system thinking</h3>
          </div>

          <div className="about-grid">
            <div className="about-card">
              <p>
                I am a software developer with experience in Java, Spring Boot, React,
                Node.js, REST APIs, WebSockets, and AWS deployment. I enjoy building
                practical backend systems, automation workflows, and scalable tools that
                solve real operational problems.
              </p>
              <p>
                Alongside development, I also have hands-on experience in data entry,
                record verification, digital file management, and structured information
                workflows. That mix helps me focus not just on building features, but on
                making systems reliable, organized, and usable.
              </p>
            </div>

            <div className="about-card detail-card">
              <div>
                <span>Location</span>
                <strong>{profile.location}</strong>
              </div>
              <div>
                <span>Email</span>
                <strong>{profile.email}</strong>
              </div>
              <div>
                <span>Phone</span>
                <strong>{profile.phone}</strong>
              </div>
              <div>
                <span>LinkedIn</span>
                <strong>kaif-amalsadi-30583730a</strong>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="content-section">
          <div className="section-header">
            <span className="eyebrow">Services</span>
            <h3>What I focus on</h3>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <article key={service.title} className="service-card">
                <h4>{service.title}</h4>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section split-section">
          <div className="split-column">
            <div className="section-header">
              <span className="eyebrow">Education</span>
              <h3>Learning path</h3>
            </div>
            <div className="timeline-list">
              {timeline.map((item) => (
                <article key={item.heading} className="timeline-card">
                  <h4>{item.heading}</h4>
                  <span>{item.meta}</span>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="split-column">
            <div className="section-header">
              <span className="eyebrow">Experience</span>
              <h3>Work snapshot</h3>
            </div>
            <div className="timeline-list">
              {experience.map((item) => (
                <article key={item.heading} className="timeline-card">
                  <h4>{item.heading}</h4>
                  <span>{item.meta}</span>
                  <ul>
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="section-header">
            <span className="eyebrow">Skills</span>
            <h3>Technical and operational strengths</h3>
          </div>

          <div className="skill-cloud">
            {skills.map((skill) => (
              <span key={skill} className="skill-pill">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section id="projects" className="content-section">
          <div className="section-header">
            <span className="eyebrow">Projects</span>
            <h3>Selected work</h3>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.title} className="project-card">
                <span className="project-stack">{project.stack}</span>
                <h4>{project.title}</h4>
                <p>{project.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="portfolio" className="content-section portfolio-section">
          <div className="section-header">
            <span className="eyebrow">Portfolio</span>
            <h3>Featured build: Unity 2D MMORPG project</h3>
          </div>

          <div className="portfolio-hero-card">
            <div className="portfolio-kicker">
              <span>Active Project Showcase</span>
              <strong>Work in progress</strong>
            </div>
            <h4>Pokemon-inspired online world with multiplayer foundations</h4>
            <p>
              This showcase highlights a 2D Unity project built around exploration,
              routes, sprites, multiplayer handling, and atmosphere. It is still under
              development and represents a live creation journey rather than a finished launch.
            </p>
          </div>

          <div className="portfolio-grid">
            <div className="portfolio-video-card">
              <div className="video-shell">
                <div className="video-shell-bar">
                  <span className="video-dot video-dot-pink" />
                  <span className="video-dot video-dot-blue" />
                  <span className="video-dot video-dot-gold" />
                  <p>Creation Preview</p>
                </div>
                <video
                  className="portfolio-video"
                  src="/assets/videos/creation.mp4"
                  controls
                  playsInline
                  preload="metadata"
                />
              </div>
              <div className="video-note">
                <strong>Video slot ready</strong>
                <span>Drop your latest build clip into `public/assets/videos/creation.mp4`.</span>
              </div>
            </div>

            <div className="portfolio-copy-card">
              <div className="portfolio-pills">
                <span>Unity 2D</span>
                <span>MMORPG Prototype</span>
                <span>Under Development</span>
              </div>

              <p>
                I created a 2D MMORPG-style game inspired by Pokemon using Unity 2D. The
                project is centered on building a playable multiplayer world with
                sprite-based environments, route progression, and a structured exploration flow.
              </p>
              <p>
                The current work includes multiplayer handling, route systems, sprite maps,
                music integration, and the gameplay foundations needed to support a larger
                online experience over time.
              </p>

              <ul className="portfolio-points">
                {portfolioPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <div className="portfolio-metrics">
                <article>
                  <strong>Unity 2D</strong>
                  <span>Engine and gameplay foundation</span>
                </article>
                <article>
                  <strong>Multiplayer</strong>
                  <span>Online systems and player flow</span>
                </article>
                <article>
                  <strong>WIP</strong>
                  <span>Still expanding with new systems</span>
                </article>
              </div>

              <div className="resume-actions">
                <a
                  className="primary-button"
                  href="/assets/files/MohammadKaifNvs.pdf"
                  download="MohammadKaifNvs.pdf"
                >
                  Download Software Resume
                </a>
                <a
                  className="secondary-button"
                  href="/assets/files/Kaif DataEntry.pdf"
                  download="Kaif DataEntry.pdf"
                >
                  Download Data Resume
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="content-section contact-section">
          <div className="section-header">
            <span className="eyebrow">Contact</span>
            <h3>Let&apos;s connect</h3>
          </div>

          <div className="contact-grid">
            <article className="contact-card">
              <span>Email</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </article>
            <article className="contact-card">
              <span>Phone</span>
              <a href="tel:+919773279670">{profile.phone}</a>
            </article>
            <article className="contact-card">
              <span>GitHub</span>
              <a href={profile.github} target="_blank" rel="noreferrer">
                Mohammadkaif-Amalsadi/PulseArena
              </a>
            </article>
            <article className="contact-card">
              <span>LinkedIn</span>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                kaif-amalsadi-30583730a
              </a>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
