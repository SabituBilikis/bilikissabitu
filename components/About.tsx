const tools = [
  "Figma",
  "Next.js",
  "React Native / Expo",
  "Claude Code",
  "Design Systems",
  "WCAG Accessibility",
  "Prototyping",
  "AI-Native Workflow",
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
              Across healthcare, education, and AI-driven experiences, I focus on turning complex problems into simple, accessible products that people can confidently use.
            </p>
            <div className="about-body">
              <p>
                Over the past 3+ years, I have designed patient-facing healthtech platforms, educational products, and 0→1 digital experiences — working across product strategy, UX architecture, interaction design, UI systems, prototyping, and developer collaboration.
              </p>
              <p>
                My AI-assisted workflow helps me move from idea to validated product faster while maintaining strong design decisions. I recently designed and shipped <b>Learn Fun</b>, an offline-first educational app for children ages 1–5, from concept through production release preparation on Google Play. I am also designing <b>Recall</b>, a personal knowledge app built around helping people capture and retrieve information more effectively.
              </p>
              <p>
                I work best on complex products where design has real impact — improving trust, reducing friction, increasing adoption, and helping users complete meaningful tasks with confidence.
              </p>
              <p>
                I believe great product design is not about creating more screens. It is about understanding people, making thoughtful decisions, and building experiences that solve real problems.
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
