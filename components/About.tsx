const tools = [
  "Figma",
  "Claude / Codex",
  "Antigravity",
  "Design Systems",
  "Next.js",
  "React Native",
  "Prototyping",
  "AI-Assisted Workflow",
];

const experience = [
  ["2026", "Product Designer, Learn Fun & Recall", "Independent, building toward Play Store launch"],
  ["2025", "Product Designer (Contract, NDA)", "0→1 AI telehealth platform"],
  ["2022 to 2025", "UX Designer, Medixbot", "Healthtech, Sakarya, Turkey (remote)"],
  ["2020 to 2022", "Associate Web Designer, Reign Signature", "London, UK (remote)"],
  ["2021 to 2022", "Design Associate, KcySoft", "Lagos, Nigeria"],
];

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-eyebrow">About</span>
          <h2>I design digital products where trust, clarity, and usability matter.</h2>
          <span className="sec-idx">Bilikis Sabitu</span>
        </div>
        <div className="about-grid">
          <div>
            <p className="about-lede">
              I’m a Product Designer who turns complex ideas into simple, intuitive products, helping take them from early concept to something people can actually use.
            </p>
            <div className="about-body">
              <p>
                Over the past 3+ years, I’ve worked across healthcare, education, and digital products, designing experiences from 0→1 and improving existing ones. My work spans product thinking, user flows, UX architecture, interaction design, UI systems, prototyping, and close collaboration with developers.
              </p>
              <p>
                I also use AI as an active part of my design workflow. Tools like Claude, Codex, and Antigravity help me explore product ideas, accelerate research and synthesis, test interactions, refine code, and turn designs into functional prototypes. This allows me to move quickly from an idea to something tangible that can be tested, improved, and taken closer to implementation without replacing the thinking and judgment behind good design.
              </p>
              <p>
                One example is <b>Learn Fun</b>, an offline-first educational app for children ages 1–5 that I designed from the ground up, taking it from an initial idea through product thinking, UX, interface design, prototyping, and preparation for release on Google Play.
              </p>
              <p>
                I also designed <b>Recall</b>, a personal knowledge product that helps people capture information and find it again when they need it, taking the product from concept through a functional experience.
              </p>
              <p>
                I enjoy working on products where there’s more to solve than how a screen should look, where I can think through the problem, simplify complex flows, reduce friction, prototype ideas, and help turn an early concept into a product that’s ready to move forward.
              </p>
              <p>
                For me, great product design isn’t about creating more screens. It’s about making the right decisions, solving the right problems, and building products people can confidently use.
              </p>
            </div>
            <div className="toolbar">
              <span className="mono">Stack &amp; tools</span>
              <div className="tools">
                {tools.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div>
            <span className="mono" style={{ display: "block", marginBottom: 16 }}>
              Experience
            </span>
            <div className="timeline">
              {experience.map(([date, role, co]) => (
                <div className="tl-row" key={role}>
                  <span className="tl-date">{date}</span>
                  <div>
                    <div className="tl-role">{role}</div>
                    <div className="tl-co">{co}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
