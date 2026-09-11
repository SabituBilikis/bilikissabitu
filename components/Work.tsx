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
            <Link key={p.id} className="card" href={`/work/${p.id}`}>
              {p.thumb ? (
                <div className="card-thumb">
                  <Mockup
                    device={p.thumb.device}
                    screens={p.thumb.screens}
                    sizes={p.thumb.device === "web" ? "(max-width:760px) 90vw, 600px" : "(max-width:760px) 40vw, 200px"}
                  />
                </div>
              ) : (
                <div
                  className="card-thumb"
                  role="img"
                  aria-label={`${p.title} — project preview (placeholder)`}
                >
                  <span>IMG · {p.title}</span>
                </div>
              )}
              <div className="card-body">
                <h3 className="card-title">{p.title}</h3>
                <p className="card-line">{p.line}</p>
                <div className="card-meta">
                  <span className="card-domain">{p.domain}</span>
                  <span className="card-open">
                    Read case study <span className="arw">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
