import Image from "next/image";
import PhoneFrame from "@/components/PhoneFrame";
import BrowserFrame from "@/components/BrowserFrame";
import TabletFrame from "@/components/TabletFrame";
import ChromeBrowserMockup from "@/components/ChromeBrowserMockup";
import TabletVideoMockup from "@/components/TabletVideoMockup";
import LearnFunPrinciplesMockup from "@/components/LearnFunPrinciplesMockup";
import { PhonicsDemo, FeedbackDecisionComparison, TabletInteractiveCanvas, BeforeAfterComparisonMockup } from "@/components/LearnFunMicroInteractions";
import type { CSBlock, FigBlock } from "@/lib/case-studies";
import type { StateKey } from "@/lib/projects";

const stateClass: Record<StateKey, string> = {
  empty: "s-empty",
  load: "s-load",
  error: "s-error",
  ai: "s-ai",
  ok: "s-ok",
};

/** Original CSS/SVG "scattered fragments" illustration — chat, note, link, screenshot. No third-party UI copied. */
function ScatteredIllustration({ ratio }: { ratio: FigBlock["ratio"] }) {
  return (
    <div className={`fig-scatter fig-${ratio}`} role="img" aria-label="Saved items scattered across a chat, a notes app, a browser bookmark, and a screenshot gallery">
      <div className="scatter-card chat" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="none"><path d="M3 4h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8l-4 3v-3H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
        <span className="ln w70"></span>
        <span className="ln w45"></span>
      </div>
      <div className="scatter-card note" aria-hidden="true">
        <span className="ln w60"></span>
        <span className="ln w80"></span>
        <span className="ln w40"></span>
      </div>
      <div className="scatter-card link" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="none"><path d="M8.5 11.5 11.5 8.5M9 6l.7-.7a2.5 2.5 0 0 1 3.5 3.5L12.5 9.5M11 14l-.7.7a2.5 2.5 0 0 1-3.5-3.5L7.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
        <span className="ln w75"></span>
      </div>
      <div className="scatter-card shot" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="none"><rect x="2.5" y="3.5" width="15" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="7" cy="8" r="1.3" stroke="currentColor" strokeWidth="1.2"/><path d="m4 14 3.5-3.5 2.5 2.5 3-3.5 3 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
      </div>
    </div>
  );
}

function Figure({ block }: { block: FigBlock }) {
  if (block.device === "chrome") {
    return (
      <figure className="fig fig-chrome-wrap">
        <ChromeBrowserMockup
          video={block.video}
          poster={block.screen?.src}
        />
        {block.captionHtml && <figcaption dangerouslySetInnerHTML={{ __html: block.captionHtml }} />}
      </figure>
    );
  }

  if (block.device === "tablet") {
    return (
      <figure className="fig fig-tablet-wrap">
        <TabletVideoMockup
          video={block.video}
          poster={block.screen?.src}
          image={block.kind === "img" ? block.screen?.src : undefined}
          videos={block.videos}
        />
        {block.captionHtml && <figcaption dangerouslySetInnerHTML={{ __html: block.captionHtml }} />}
      </figure>
    );
  }

  return (
    <figure className="fig">
      {block.video ? (
        <video
          className={`fig-video fig-${block.ratio}`}
          src={block.video}
          controls
          playsInline
          preload="metadata"
        />
      ) : block.screen && block.raw ? (
        <div className={`fig-raw fig-${block.ratio}`}>
          <Image src={block.screen.src} alt={block.screen.alt} fill sizes="(max-width:700px) 90vw, 780px" style={{ objectFit: "contain" }} />
        </div>
      ) : block.screen && block.device === "web" ? (
        <div className={`fig-shot fig-${block.ratio}`}>
          <BrowserFrame src={block.screen.src} alt={block.screen.alt} sizes="(max-width:700px) 90vw, 780px" />
        </div>
      ) : block.screen ? (
        <div className={`fig-shot fig-${block.ratio}`}>
          <PhoneFrame src={block.screen.src} alt={block.screen.alt} sizes="(max-width:700px) 90vw, 420px" />
        </div>
      ) : block.illustration === "scattered" ? (
        <ScatteredIllustration ratio={block.ratio} />
      ) : (
        <div className={`fig-ph fig-${block.ratio}${block.kind === "vid" ? " vid" : ""}`}>
          <span className="fig-ph-icon">{block.kind === "vid" ? "▶" : "▧"}</span>
          <span className="fig-ph-label">{block.kind === "vid" ? "Video placeholder" : "Image placeholder"}</span>
        </div>
      )}
      <figcaption dangerouslySetInnerHTML={{ __html: block.captionHtml }} />
    </figure>
  );
}

export default function Block({ block }: { block: CSBlock }) {
  switch (block.t) {
    case "p":
      return <p dangerouslySetInnerHTML={{ __html: block.html }} />;

    case "fig":
      return <Figure block={block} />;

    case "figrow":
      return (
        <div className="figrow">
          {block.items.map((item, i) => (
            <Figure key={i} block={item} />
          ))}
        </div>
      );

    case "cards":
      return (
        <div className="cards">
          {block.items.map(([num, title, bodyHtml]) => (
            <div className="ccard" key={num}>
              <span className="mono">{num}</span>
              <h4>{title}</h4>
              <p dangerouslySetInnerHTML={{ __html: bodyHtml }} />
            </div>
          ))}
        </div>
      );

    case "thesis":
      return (
        <div className="thesis">
          <span className="mono">The challenge</span>
          <p dangerouslySetInnerHTML={{ __html: block.html }} />
        </div>
      );

    case "principles":
      return (
        <div className="principles">
          {block.items.map(([num, title, bodyHtml]) => (
            <div className="pr" key={num}>
              <span className="num">{num}</span>
              <div>
                <h4>{title}</h4>
                <p dangerouslySetInnerHTML={{ __html: bodyHtml }} />
              </div>
            </div>
          ))}
        </div>
      );

    case "decision":
      return (
        <div className={`decision${block.key ? " key" : ""}`}>
          <div className="d-top">
            <span className="d-kicker">{block.kicker}</span>
            {(block.badges || []).map((b) => (
              <span className="badge" key={b}>
                P·{b}
              </span>
            ))}
          </div>
          <h4>{block.title}</h4>
          <p dangerouslySetInnerHTML={{ __html: block.bodyHtml }} />
        </div>
      );

    case "alt":
      return (
        <div className="alt">
          <div className="alt-col">
            <h4>{block.a.heading}</h4>
            <ul>
              {block.a.items.map(([kind, text], i) => (
                <li className={kind} key={i}>
                  <i>{kind === "pro" ? "✓" : "✗"}</i>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="alt-col">
            <h4>{block.b.heading}</h4>
            <ul>
              {block.b.items.map(([kind, text], i) => (
                <li className={kind} key={i}>
                  <i>{kind === "pro" ? "✓" : "✗"}</i>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="verdict">
            <span className="mono">Verdict</span>
            <p dangerouslySetInnerHTML={{ __html: block.verdictHtml }} />
          </div>
        </div>
      );

    case "states":
      return (
        <div className="staterows">
          {block.items.map(([state, label, bodyHtml]) => (
            <div className="staterow" key={state}>
              <span className={`s-label ${stateClass[state]}`}>{label}</span>
              <p dangerouslySetInnerHTML={{ __html: bodyHtml }} />
            </div>
          ))}
        </div>
      );

    case "banner":
      return (
        <div className="banner">
          <span className="mono">Outcome</span>
          <p dangerouslySetInnerHTML={{ __html: block.html }} />
        </div>
      );

    case "takes":
      return (
        <div className="takes">
          {block.items.map(([num, title, bodyHtml]) => (
            <div className="take" key={num}>
              <span className="num">{num}</span>
              <div>
                <h4>{title}</h4>
                <p dangerouslySetInnerHTML={{ __html: bodyHtml }} />
              </div>
            </div>
          ))}
        </div>
      );

    case "nda":
      return (
        <div className="nda-note">
          <span className="ic">NDA</span>
          <p dangerouslySetInnerHTML={{ __html: block.html }} />
        </div>
      );

    case "phonics-interactive":
      return <PhonicsDemo />;

    case "tablet-canvas":
      return <TabletInteractiveCanvas />;

    case "learn-fun-principles":
      return <LearnFunPrinciplesMockup />;

    case "before-after-mockup":
      return <BeforeAfterComparisonMockup />;

    case "feedback-chain":
      return (
        <FeedbackDecisionComparison
          feedback={block.feedback}
          decision={block.decision}
          before={block.before}
          after={block.after}
        />
      );

    default:
      return null;
  }
}
