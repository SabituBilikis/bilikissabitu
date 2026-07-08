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
  ["2026", "Product Designer, Recall", "Independent, building toward Play Store launch"],
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
          <h2>What happens when one person owns the whole path?</h2>
          <span className="sec-idx">Bilikis Sabitu</span>
        </div>
        <div className="about-grid">
          <div>
            <p className="about-lede">
              My throughline across every project is the same, <b>I design for trust when the stakes are real</b>, for a system that never pretends to be certain when it isn&apos;t.
            </p>
            <div className="about-body">
              <p>
                I spent three years designing patient facing healthtech, and now I build 0→1 products where I own the whole path. Product strategy, UX architecture, UI, and the production frontend, all of it. The AI native workflow is what makes solo, production grade output possible. Right now that means designing and building Recall on my own, from Figma to a working native app, with a Play Store launch on the way.
              </p>
              <p>
                I work best on complex, multi role products where design decisions carry real business weight, health, fintech, marketplaces, AI tools. Conversion, trust, adoption. Not decoration.
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
