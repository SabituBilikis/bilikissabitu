import PhoneFrame from "@/components/PhoneFrame";

type Tile = { g: string; label: string; img: { src: string; alt: string } };

// Two columns of phone-framed real screens, duplicated for a seamless vertical loop.
const columns: Tile[][] = [
  [
    { g: "g-onb", label: "Recall", img: { src: "/images/recall/collections.png", alt: "Recall collections screen with saved item folders" } },
    { g: "g-app", label: "Telehealth", img: { src: "/images/telehealth/home.png", alt: "Telehealth patient home screen" } },
    { g: "g-sys", label: "Climapt", img: { src: "/images/climapt/risk-map.png", alt: "Climapt climate risk map screen" } },
    { g: "g-cri", label: "Recall", img: { src: "/images/recall/collection-detail.png", alt: "Recall collection detail with saved items" } },
  ],
  [
    { g: "g-pay", label: "Recall", img: { src: "/images/recall/home-empty.png", alt: "Recall first-run empty state" } },
    { g: "g-dash", label: "Telehealth", img: { src: "/images/telehealth/insurance.png", alt: "Telehealth insurance verification screen" } },
    { g: "g-onb", label: "Recall", img: { src: "/images/recall/home.png", alt: "Recall home screen" } },
    { g: "g-app", label: "Climapt", img: { src: "/images/climapt/ai-chat.png", alt: "Climapt AI assistant chat screen" } },
  ],
];

function Column({ tiles }: { tiles: Tile[] }) {
  // duplicate the set so the vertical loop wraps seamlessly at translateY(-50%)
  const loop = [...tiles, ...tiles];
  return (
    <div className="mcol">
      <div className="mcoltrack">
        {loop.map((t, i) => (
          <div
            key={i}
            className={`mtile ${t.g}`}
            aria-hidden={i >= tiles.length ? true : undefined}
          >
            <PhoneFrame src={t.img.src} alt={i >= tiles.length ? "" : t.img.alt} sizes="(max-width:560px) 45vw, 180px" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Showcase() {
  return (
    <section className="showcase" aria-label="Work preview">
      <div className="wrap" style={{ paddingInline: 0 }}>
        <div className="showcase-box">
          <div className="mcols">
            {columns.map((tiles, i) => (
              <Column key={i} tiles={tiles} />
            ))}
          </div>
          <a className="sc-cta" href="#work" aria-label="See recent work">
            <span className="sc-bubble">See recent work</span>
            <span className="sc-orb" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
