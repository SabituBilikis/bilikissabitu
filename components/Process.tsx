const steps = [
  {
    n: "1",
    title: "Design in Figma",
    body: "Product strategy, IA, UX architecture, and UI — including the states most teams skip.",
  },
  {
    n: "2",
    title: "Build AI-native",
    body: "React Native and Next.js via an AI-native workflow with Claude Code — no dev handoff, no translation loss.",
  },
  {
    n: "3",
    title: "Ship to production",
    body: "Owned end to end, from the first frame in Figma to a working production build headed for the Play Store.",
  },
];

export default function Process() {
  return (
    <section id="process">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-eyebrow">My process, explained</span>
          <h2>One person, the whole path.</h2>
          <span className="sec-idx">Figma → live · no handoff</span>
        </div>
        <div className="process-cards">
          {steps.map((s) => (
            <div className="step" key={s.n}>
              <span className="step-n">{s.n}</span>
              <div className="step-body">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </div>
          ))}

          {/* hand-drawn orange connectors (decorative) */}
          <svg
            className="connector c1"
            viewBox="0 0 150 130"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 118 C 28 44, 92 72, 138 20"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="12" cy="118" r="5" stroke="currentColor" strokeWidth="2.5" fill="#FFFFFF" />
            <circle cx="138" cy="20" r="5" stroke="currentColor" strokeWidth="2.5" fill="#FFFFFF" />
          </svg>
          <svg
            className="connector c2"
            viewBox="0 0 150 150"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M16 22 C 74 30, 18 82, 72 80 C 116 78, 58 132, 138 122"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="16" cy="22" r="5" stroke="currentColor" strokeWidth="2.5" fill="#FFFFFF" />
            <circle cx="138" cy="122" r="5" stroke="currentColor" strokeWidth="2.5" fill="#FFFFFF" />
          </svg>
        </div>
      </div>
    </section>
  );
}
