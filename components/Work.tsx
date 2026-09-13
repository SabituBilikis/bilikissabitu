import Link from "next/link";
import { projects } from "@/lib/projects";
import Mockup from "@/components/Mockup";

export default function Work() {
  return (
    <section id="work">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-eyebrow">Selected work</span>
          <h2>Trust under uncertainty, shipped.</h2>
          <span className="sec-idx">0{projects.length} recent case studies</span>
        </div>
        <div className="grid" id="grid">
          {projects.map((p) => (
            <Link key={p.id} className="card work-card-isabel" href={`/work/${p.id}`}>
              <div className="card-thumb work-card__frame">
                {p.thumb ? (
                  <Mockup
                    device={p.thumb.device}
                    screens={p.thumb.screens}
                    video={p.thumb.video}
                    sizes={p.thumb.device === "web" || p.thumb.device === "chrome" ? "(max-width:760px) 90vw, 600px" : "(max-width:760px) 40vw, 200px"}
                  />
                ) : (
                  <div
                    className="card-thumb-placeholder"
                    role="img"
                    aria-label={`${p.title} — project preview`}
                  >
                    <span>{p.title}</span>
                  </div>
                )}

                {/* Isabel Shic floating detail panel */}
                <div className="work-card__meta">
                  <div className="work-card__panel">
                    <div className="work-card__orb" aria-hidden="true">
                      <svg className="work-card__arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="work-card__copy">
                      <p className="work-card__title">
                        <span className="work-card__company">{p.title}</span>
                        <span className="work-card__domain-badge">{p.domain.split("·")[0].trim()}</span>
                      </p>
                      <p className="work-card__description">{p.line}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
