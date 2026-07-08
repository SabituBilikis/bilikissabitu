type Pill = { label: string; logo: string };

const leftStack: Pill[] = [
  { label: "Figma", logo: "figma" },
  { label: "Claude Code", logo: "claude" },
  { label: "Codex", logo: "openai" },
];

const rightStack: Pill[] = [
  { label: "ChatGPT", logo: "openai" },
  { label: "Lovable", logo: "lovable" },
  { label: "Antigravity", logo: "antigravity" },
];

function Stack({ side, pills }: { side: "left" | "right"; pills: Pill[] }) {
  return (
    <div className={`stack ${side}`}>
      {pills.map((p) => (
        <span className="stack-pill" key={p.label}>
          <img src={`/logos/${p.logo}.svg`} alt="" aria-hidden="true" />
          {p.label}
        </span>
      ))}
    </div>
  );
}

export default function Intro() {
  return (
    <section className="intro" id="intro">
      <div className="wrap intro-wrap">
        <Stack side="left" pills={leftStack} />
        <div className="intro-inner">
          <span className="intro-hello">Hello!</span>
          <p className="intro-lead">
            I design and ship products where the design decisions carry real
            business weight.{" "}
            <span className="muted">
              Conversion, trust, adoption. Not decoration.
            </span>
          </p>
        </div>
        <Stack side="right" pills={rightStack} />
      </div>
    </section>
  );
}
