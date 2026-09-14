import type { StateKey, Screen } from "@/lib/projects";

export type FigBlock = {
  kind: "img" | "vid";
  ratio: "r169" | "r219" | "r43" | "r45" | "r920";
  captionHtml: string;
  /** Real exported screen — when present, renders as a device-framed image instead of a placeholder. */
  screen?: Screen;
  /** When true with `screen` set, renders the image plain (no phone bezel) — for UI crops that aren't full screens. */
  raw?: boolean;
  /** When "web" or "tablet" or "chrome" with `screen` set, renders inside a matching device frame instead of a phone bezel. */
  device?: "web" | "tablet" | "mobile" | "chrome";
  /** Real video src — when present (kind:"vid"), renders an inline <video> instead of a placeholder. */
  video?: string;
  /** Multiple video options for interactive device mockup switcher */
  videos?: { label: string; video: string; poster?: string }[];
  /** Original CSS/SVG illustration key — for concept figures with no matching real asset. */
  illustration?: "scattered";
};

export type CSBlock =
  | { t: "p"; html: string }
  | ({ t: "fig" } & FigBlock)
  | { t: "figrow"; items: FigBlock[]; cols?: number }
  | { t: "cards"; items: [num: string, title: string, bodyHtml: string][] }
  | { t: "thesis"; html: string }
  | { t: "principles"; items: [num: string, title: string, bodyHtml: string][] }
  | { t: "decision"; key?: boolean; kicker: string; badges?: string[]; title: string; bodyHtml: string }
  | {
      t: "alt";
      a: { heading: string; items: [kind: "pro" | "con", text: string][] };
      b: { heading: string; items: [kind: "pro" | "con", text: string][] };
      verdictHtml: string;
    }
  | { t: "states"; items: [state: StateKey, label: string, bodyHtml: string][] }
  | { t: "banner"; html: string }
  | { t: "takes"; items: [num: string, title: string, bodyHtml: string][] }
  | { t: "nda"; html: string }
  | { t: "phonics-interactive" }
  | { t: "tablet-canvas" }
  | { t: "learn-fun-principles" }
  | {
      t: "before-after-mockup";
      topCaption?: string;
      beforePill?: string;
      afterPill?: string;
      beforeSrc?: string;
      beforeAlt?: string;
      beforeNoteTitle?: string;
      beforeNoteDesc?: string;
      afterSrc?: string;
      afterAlt?: string;
      afterNoteTitle?: string;
      afterNoteDesc?: string;
      frameBg?: string;
    }
  | {
      t: "feedback-chain";
      feedback: { kicker: string; quote: string };
      decision: { kicker: string; action: string };
      before: { label: string; title: string; desc: string; items?: string[]; html?: string };
      after: { label: string; title: string; desc: string; items?: string[]; html?: string };
    };

export interface CaseStudySection {
  id: string;
  label: string;
  heading: string;
  blocks: CSBlock[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  nav: string;
  tags: [label: string, cls: string][];
  sub: string;
  meta: [label: string, value: string][];
  /** Optional CTA link rendered at the end of the tags row (e.g. a public repo or web app). */
  githubUrl?: string;
  /** Optional Google Play Store link rendered alongside githubUrl/cta */
  playStoreUrl?: string;
  /** Optional hero block rendered immediately after cs-meta before sections */
  heroBlock?: CSBlock;
  sections: CaseStudySection[];
  next: string;
}

export const caseStudyOrder = ["learn-fun", "recall", "telehealth", "climapt", "earthquake"];

const R = (name: string) => `/images/recall/${name}.png`;

export const caseStudies: Record<string, CaseStudy> = {
  /* ---------------- RECALL ---------------- */
  recall: {
    slug: "recall",
    title: "Recall",
    nav: "Recall",
    tags: [
      ["Product Design · 0→1", "shipped"],
      ["Mobile · 7 weeks", "nda"],
      ["Play Store Launch Pending", "live"],
    ],
    sub: "A personal memory system for everything you don't want to lose.",
    githubUrl: "https://github.com/SabituBilikis/Recall",
    meta: [
      ["My Role", "Product Designer & Builder: Product Strategy, UX Architecture, Figma, Prototyping & React Native Implementation"],
      ["Workflow", "AI-assisted workflow moving rapidly between product decisions, Figma, prototyping, and production build"],
      ["Status", "Production-ready · Google Play launch pending · 7 weeks (2026)"],
    ],
    heroBlock: {
      t: "fig",
      kind: "vid",
      ratio: "r169",
      captionHtml: "<b>Recall</b> — Full product walkthrough demonstrating instant one-tap capture, search, and retrieval without manual filing.",
      video: "/images/recall/demo-landscape.mp4",
      screen: { src: R("home"), alt: "Recall personal memory app preview" },
    },
    next: "telehealth",
    sections: [
      {
        id: "problem",
        label: "The Problem",
        heading: "Saving is easy. Finding is the problem.",
        blocks: [
          {
            t: "p",
            html: "We save things constantly. A screenshot. A WhatsApp message. A useful link. A note we meant to come back to. <b>The problem isn't saving. It's remembering where we saved it when we need it again.</b>",
          },
          {
            t: "p",
            html: "<b>Recall</b> explores a simpler approach: capture anything quickly, then find it later without having to organize your life first. I designed the product from strategy through production, using an AI-assisted workflow to move quickly between product decisions, Figma, prototyping, and implementation.",
          },
          {
            t: "p",
            html: "My useful information was scattered across: <b>WhatsApp · Notes · Browser bookmarks · Camera Roll</b>. Each app solved one part of the problem, but together they created another:",
          },
          {
            t: "thesis",
            html: "I could remember that I had saved something without remembering where.",
          },
          {
            t: "p",
            html: "Traditional organization assumes people will remember: what something is called, where it belongs, which folder they put it in, and when they saved it. But memory doesn't work like that. You remember: <em>\"That article about how Linear handles onboarding.\"</em> Not: <em>\"I saved it in Product Research → Onboarding → References.\"</em> That observation became the foundation for Recall.",
          },
          {
            t: "fig",
            kind: "img",
            ratio: "r169",
            captionHtml: "Fig 1.0 · The scattered workflow: information lost across self-chats, bookmarks, notes, and screenshot galleries.",
            illustration: "scattered",
          },
        ],
      },
      {
        id: "question",
        label: "The Product Question",
        heading: "What if saving required no organization at all?",
        blocks: [
          {
            t: "p",
            html: "Instead of asking people to build another filing system, I explored a different model:",
          },
          {
            t: "thesis",
            html: "Capture first. Let retrieval do the organizing.",
          },
          {
            t: "p",
            html: "That insight led directly to three core product principles:",
          },
          {
            t: "principles",
            items: [
              ["01", "Capture should disappear", "Saving something should take almost no thought, zero mental overhead, and zero configuration."],
              ["02", "Retrieval should match memory", "People should be able to search using the way they remember something, rather than needing perfect metadata."],
              ["03", "A saved item should never silently disappear", "If Recall promises to remember something, failure becomes a product problem—not just a technical error."],
            ],
          },
        ],
      },
      {
        id: "constraints",
        label: "The Constraints",
        heading: "Designing under competing product priorities.",
        blocks: [
          {
            t: "p",
            html: "Designing the product meant balancing several competing priorities:",
          },
          {
            t: "cards",
            items: [
              [
                "01",
                "Four types of content",
                "Screenshots, links, notes, and files behave differently, but needed to feel like one coherent, effortless system.",
              ],
              [
                "02",
                "Zero organization burden",
                "Folders, tags, and metadata could make retrieval more powerful—but they would also add friction at the moment of capture.",
              ],
              [
                "03",
                "Capture happens mid-task",
                "People don't usually save something when they are calmly organizing their information. They save it while reading, scrolling, messaging, or working.",
              ],
              [
                "04",
                "A seven-week product window",
                "The product needed to become a real, usable experience—not an endless collection of future features or conceptual prototypes.",
              ],
            ],
          },
        ],
      },
      {
        id: "decision",
        label: "Critical Decision #1",
        heading: "Should Recall organize for you—or ask you to organize yourself?",
        blocks: [
          {
            t: "p",
            html: "I explored two different retrieval models to resolve how information should be surfaced:",
          },
          {
            t: "alt",
            a: {
              heading: "Option A — Folder-based organization (The familiar approach)",
              items: [
                ["pro", "Familiar mental model with visible structure"],
                ["pro", "Easy to browse categories manually"],
                ["con", "Moves organizational work to the moment of capture"],
                ["con", "Directly conflicts with the one-tap capture principle; users abandon filing within weeks"],
              ],
            },
            b: {
              heading: "Option B — Search-first retrieval (The lighter approach)",
              items: [
                ["pro", "Zero filing burden; capture remains instantaneous"],
                ["pro", "Works reliably even when the library grows large and messy"],
                ["pro", "Matches associative human memory instead of rigid hierarchies"],
                ["con", "The product becomes much more dependent on retrieval quality"],
              ],
            },
            verdictHtml:
              "<b>The Decision: Search first.</b> The folder model solved organization, but organization wasn't the problem I was trying to solve. It would have recreated the same filing burden inside the product I was designing to remove it. Recall's structure became: <b>Capture → Store → Search → Find</b> rather than: <em>Capture → Name → Tag → File → Remember where you filed it</em>.",
          },
          {
            t: "before-after-mockup",
            topCaption: "System Model Comparison",
            beforeSrc: R("collections"),
            beforeAlt: "Option A: Folder-based collection taxonomy requiring filing and manual grouping",
            beforeNoteTitle: "Option A · Folder Taxonomy",
            beforeNoteDesc: "Forces users to categorize, name, and file before finishing capture. Fails when users are mid-task.",
            afterSrc: R("search"),
            afterAlt: "Option B: Search-first associative retrieval matching human memory",
            afterNoteTitle: "Option B · Search-First Model",
            afterNoteDesc: "Zero upfront filing. One-tap capture with flexible, query-based search matching how you remember.",
            frameBg: "linear-gradient(180deg, #1E293B 0%, #0F172A 100%)",
          },
        ],
      },
      {
        id: "capture-design",
        label: "Designing Capture",
        heading: "The rule: saving shouldn't ask for anything back.",
        blocks: [
          {
            t: "p",
            html: "I deliberately removed the usual capture friction steps: <b>No title. No tags. No folder picker.</b> The user taps save; Recall takes over. The deeper interaction happens later, when the user has actually come back looking for something.",
          },
          {
            t: "p",
            html: "<b>The capture flow:</b> <em>Choose content → Save → Confirmation → Continue what you were doing.</em> The goal was not to make saving feel sophisticated—it was to make saving feel <b>invisible</b>.",
          },
          {
            t: "figrow",
            items: [
              {
                kind: "img",
                ratio: "r43",
                captionHtml: "Fig 2.1 · <b>Universal capture sheet</b>: one tap for screenshots, links, notes, or files.",
                screen: { src: R("capture"), alt: "Recall capture sheet for saving screenshots, links, notes, or files" },
              },
              {
                kind: "img",
                ratio: "r43",
                captionHtml: "Fig 2.2 · <b>Quick link capture</b>: pasting a URL with zero tagging or manual category prompts.",
                screen: { src: R("add-link"), alt: "Recall link capture interface without forced tag fields" },
              },
            ],
          },
          {
            t: "decision",
            key: true,
            kicker: "Interaction Decision",
            title: "Optimistic capture",
            bodyHtml:
              "The moment someone saves an item, the interface confirms it immediately while the underlying work continues in the background. This makes capture feel instant. But it creates an important product responsibility: <em>What happens if the save fails after we've already told the user it worked?</em> That question led directly to designing for failure.",
          },
        ],
      },
      {
        id: "failure-design",
        label: "Designing for Failure",
        heading: "If Recall is a memory system, losing something is unacceptable.",
        blocks: [
          {
            t: "p",
            html: "I treated system states as part of the core experience rather than edge-case screens. A product that promises to remember cannot treat failed saves or background syncs as an implementation detail.",
          },
          {
            t: "states",
            items: [
              [
                "empty",
                "Empty State",
                "The user hasn't saved anything yet. Instead of presenting a dead end, the empty state gives the user one obvious next action with a prominent, welcoming capture button.",
              ],
              [
                "load",
                "Loading State",
                "The item is being processed in flight. The user gets immediate optimistic confirmation without being blocked or forced to wait.",
              ],
              [
                "error",
                "Error State",
                "The save failed. Instead of silently disappearing, the item remains visible and the user gets a clear recovery path and retry button. <b>Design principle:</b> Never make the user wonder whether something they trusted the product to remember is gone.",
              ],
              [
                "ok",
                "Success State",
                "The item is saved and ready to retrieve. The success state is intentionally quiet. The goal is not celebration—it's confidence.",
              ],
            ],
          },
          {
            t: "figrow",
            cols: 3,
            items: [
              {
                kind: "img",
                ratio: "r43",
                captionHtml: "Fig 3.1 · <b>Empty State</b>: First-run invitation with direct capture action.",
                screen: { src: R("home-empty"), alt: "Recall first-run empty state inviting the user to save their first item" },
              },
              {
                kind: "img",
                ratio: "r43",
                captionHtml: "Fig 3.2 · <b>Loading State</b>: Optimistic capture in flight with progress feedback.",
                screen: { src: R("uploading"), alt: "Recall file uploading progress state" },
              },
              {
                kind: "img",
                ratio: "r43",
                captionHtml: "Fig 3.3 · <b>Success State</b>: Saved confirmation, ready for search.",
                screen: { src: R("saved"), alt: "Recall item saved confirmation state" },
              },
            ],
          },
        ],
      },
      {
        id: "hardest-decision",
        label: "The Hardest Decision",
        heading: "I wanted AI retrieval. I removed it.",
        blocks: [
          {
            t: "p",
            html: "AI-powered retrieval was part of the original vision. The idea was compelling: <em>What if Recall could understand what you meant instead of relying on exact search terms?</em> But building that into v1 introduced a difficult trade-off.",
          },
          {
            t: "p",
            html: "More intelligence meant: <b>more engineering complexity · more uncertainty · more edge cases · more time before launch</b>. And most importantly: <b>it wasn't necessary to prove the core product.</b> So I cut it.",
          },
          {
            t: "decision",
            key: true,
            kicker: "Why I cut AI",
            title: "The first version needed to prove one thing",
            bodyHtml:
              "<em>Can Recall make saving and finding personal information meaningfully easier?</em> It didn't need to pretend it could understand everything. So v1 focused on: <b>Fast capture + reliable storage + simple retrieval</b>. AI retrieval became a future direction rather than a marketing claim.",
          },
          {
            t: "thesis",
            html: "AI should solve a product problem—not become the product's identity.",
          },
          {
            t: "p",
            html: "For me, that was an important distinction. The AI-assisted workflow helped accelerate the design and implementation process. But I deliberately chose <b>not to put AI inside the product until it could meaningfully improve the user experience.</b>",
          },
        ],
      },
      {
        id: "production",
        label: "Concept to Production",
        heading: "The design had to survive contact with implementation.",
        blocks: [
          {
            t: "p",
            html: "Recall wasn't designed as a static prototype. I worked through the product in Figma, then used an AI-assisted workflow to move into implementation and iterate against the actual product. This changed some design decisions. A design that looked elegant in isolation wasn't automatically the right decision once I considered: <b>implementation complexity, product scope, state management, responsiveness, reliability, and release requirements</b>. The final product reflects those trade-offs.",
          },
          {
            t: "fig",
            kind: "vid",
            ratio: "r169",
            captionHtml: "Fig 4.0 · <b>Complete Product Showcase</b>: Live capture, instant save, fast query search, and full item retrieval in React Native.",
            video: "/images/recall/demo-landscape.mp4",
          },
          {
            t: "figrow",
            cols: 4,
            items: [
              {
                kind: "img",
                ratio: "r43",
                captionHtml: "<b>Home</b> · Instant feed & capture",
                screen: { src: R("home"), alt: "Recall home screen" },
              },
              {
                kind: "img",
                ratio: "r43",
                captionHtml: "<b>Capture</b> · Universal sheet",
                screen: { src: R("capture"), alt: "Recall universal capture sheet" },
              },
              {
                kind: "img",
                ratio: "r43",
                captionHtml: "<b>Search</b> · Associative query",
                screen: { src: R("search"), alt: "Recall instant search results" },
              },
              {
                kind: "img",
                ratio: "r43",
                captionHtml: "<b>Saved Item</b> · View & detail",
                screen: { src: R("collection-detail"), alt: "Recall saved item detail screen" },
              },
            ],
          },
        ],
      },
      {
        id: "details",
        label: "Product Details & Outcome",
        heading: "A production-ready product shipped in seven weeks.",
        blocks: [
          {
            t: "cards",
            items: [
              [
                "01",
                "Multiple content types",
                "Recall supports Screenshots, Links, Notes, and Files without forcing each type into a separate, fractured workflow.",
              ],
              [
                "02",
                "Lightweight retrieval",
                "Instant, query-based search serves as the primary organizational mechanism, eliminating manual filing chores.",
              ],
              [
                "03",
                "Designed system states",
                "Empty, loading, success, and error states were engineered as first-class citizens of the user experience, not bolted on after.",
              ],
              [
                "04",
                "Production-ready experience",
                "Includes supporting architecture: privacy considerations, data safety compliance, and Play Store release assets.",
              ],
            ],
          },
          {
            t: "p",
            html: "Recall became a production-ready mobile product within <b>seven weeks</b>. The biggest outcome wasn't the number of screens. It was proving that the core idea could survive the journey from: <b>Product problem → UX model → interface → prototype → implementation → release preparation</b> without expanding into an unnecessarily complex v1. <b>Google Play launch is currently pending.</b>",
          },
        ],
      },
      {
        id: "retro",
        label: "Retrospective",
        heading: "What seven weeks taught me about building products.",
        blocks: [
          {
            t: "takes",
            items: [
              [
                "01",
                "Friction compounds",
                "Every additional field at the moment of capture gives the user another reason not to save something. Removing friction wasn't a visual decision—it was a product strategy decision.",
              ],
              [
                "02",
                "The best feature can still be the wrong feature",
                "AI retrieval was the most exciting feature on the roadmap. It was also the feature I didn't need yet. Cutting it gave the core experience room to become reliable.",
              ],
              [
                "03",
                "Failure states define trust",
                "A product that promises to remember something cannot treat failed saves as an implementation detail. The error experience is part of the product promise.",
              ],
              [
                "04",
                "Shipping changes design decisions",
                "Moving from Figma into a real product exposed constraints that weren't obvious in the prototype. Good product design isn't just about what should exist—it's about making the right thing possible within real constraints.",
              ],
            ],
          },
        ],
      },
    ],
  },

  /* ---------------- LEARN FUN ---------------- */
  "learn-fun": {
    slug: "learn-fun",
    title: "Learn Fun",
    nav: "Learn Fun",
    tags: [
      ["Google Play Live", "live"],
      ["Offline-First PWA", "shipped"],
      ["Ages 1–5 · Toddler UX", "live"],
      ["Product Design & Build", "nda"],
    ],
    sub: "Play. Learn. Grow. — Designing an offline-first learning platform for toddlers & preschoolers (Ages 1–5).",
    githubUrl: "https://learnfunkids.vercel.app/",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.learnfunkids.app",
    meta: [
      ["My Role", "Product Designer & Builder: Strategy, UX Architecture, Design System, Prototyping, Web Speech & Audio"],
      ["Target Users", "Toddlers & Preschoolers (Ages 1–5) and Parents / Educators"],
      ["Platform & Tech", "React 18 · TypeScript · Vite · Tailwind CSS · Web Speech API · Offline PWA & Android TWA"],
    ],
    heroBlock: {
      t: "fig",
      kind: "vid",
      ratio: "r169",
      device: "chrome",
      video: "/images/learn-fun/learn-fun-case-study.mp4",
      screen: { src: "/images/learn-fun/video-frame.jpg", alt: "Learn Fun app walkthrough inside desktop Chrome browser mockup" },
      captionHtml: "<b>Learn Fun</b> — Desktop Chrome browser experience showing interactive lesson modules, phonics, and touch-first interactions.",
    },
    next: "recall",
    sections: [
      {
        id: "challenge",
        label: "01 · Challenge",
        heading: "Designing for children who may not be able to read yet.",
        blocks: [
          {
            t: "thesis",
            html: "Young children don't need more things competing for their attention. They need learning experiences that are simple enough to understand, engaging enough to explore, and flexible enough to work wherever learning happens. Designing for early learners completely inverts traditional digital product assumptions.",
          },
          {
            t: "cards",
            items: [
              [
                "01",
                "Limited or no reading ability",
                "Children aged 1–5 cannot rely on text instructions. Every action must be communicated through color, shape, audio, and visual recognition.",
              ],
              [
                "02",
                "Short attention spans",
                "Toddlers learn through immediate cause-and-effect. Every tap must deliver instant, predictable feedback with zero lag and zero dead ends.",
              ],
              [
                "03",
                "Touch-first & developing motor skills",
                "Fine motor precision is still developing. Hit targets must be large (min 64px) and forgiving to prevent accidental tap frustration.",
              ],
              [
                "04",
                "Different developmental stages",
                "A 2-year-old explores sensory colors and animals, while a 5-year-old connects phonemes and letter sounds into early literacy.",
              ],
            ],
          },
          {
            t: "decision",
            key: true,
            kicker: "The Core Design Question",
            title: "Independence for child, confidence for parent",
            bodyHtml:
              "<b>How might I create a learning experience that feels simple enough for a young child to explore independently, while still giving parents confidence in what the child is learning?</b>",
          },
        ],
      },
      {
        id: "tablet",
        label: "02 · Tablet Context",
        heading: "What does a five-year-old need to understand without being told what to do?",
        blocks: [
          {
            t: "p",
            html: "Although Learn Fun is available through the web and can be installed for offline use, I treated the <b>tablet as the primary learning environment</b>. A larger touch surface creates dedicated room for generous touch targets, clear visual separation between choices, and spontaneous child exploration.",
          },
          {
            t: "fig",
            kind: "vid",
            ratio: "r45",
            device: "tablet",
            video: "/images/learn-fun/learn-fun-tablet-1.mp4",
            screen: { src: "/images/learn-fun/tablet-frame-1.jpg", alt: "Phonics & Letter Sound interaction" },
            videos: [
              {
                label: "Phonics & Letter Sound (A)",
                video: "/images/learn-fun/learn-fun-tablet-1.mp4",
                poster: "/images/learn-fun/tablet-frame-1.jpg",
              },
              {
                label: "Numbers & Counting (2)",
                video: "/images/learn-fun/learn-fun-tablet-2.mp4",
                poster: "/images/learn-fun/tablet-frame-2.jpg",
              },
            ],
            captionHtml: "Fig 1.1 · <b>Learn Fun tablet interface</b> — Interactive learning experience demonstrated across Phonics and Numbers with tactile audio cues.",
          },
        ],
      },
      {
        id: "principles",
        label: "Design Principles",
        heading: "Three rules that shaped every screen.",
        blocks: [
          { t: "learn-fun-principles" },
        ],
      },
      {
        id: "structure",
        label: "Learning Structure",
        heading: "Foundations organized for gradual discovery.",
        blocks: [
          {
            t: "p",
            html: "Learn Fun organizes activities around foundational early childhood topics: <b>Letters · Numbers · Shapes · Animals · Home · School</b>. Rather than presenting a large amount of content at once, activities are grouped into recognizable categories so children can gradually discover what interests them.",
          },
          {
            t: "cards",
            items: [
              [
                "Pillar 1",
                "Recognition over reading",
                "Visual silhouettes, cheerful emojis, and auditory prompts introduce each topic without text dependencies.",
              ],
              [
                "Pillar 2",
                "Interaction over instructions",
                "Zero multi-step tutorials. Children immediately learn by tapping, hearing, and seeing instant visual reactions.",
              ],
              [
                "Pillar 3",
                "Repetition over complexity",
                "Predictable layouts let toddlers independently replay their favorite activities until concepts stick.",
              ],
            ],
          },
        ],
      },
      {
        id: "phonics",
        label: "Feedback Loop #1",
        heading: "From letters to phonics: user feedback changed the product.",
        blocks: [
          {
            t: "p",
            html: "During early testing, parent and caregiver feedback revealed a crucial insight: <em>Knowing what a letter looks like is fundamentally different from knowing what it sounds like.</em> This feedback directly evolved the product from visual recognition to full phonics, connecting <b>Letter → Sound → Word</b>.",
          },
          {
            t: "fig",
            kind: "vid",
            ratio: "r169",
            device: "chrome",
            video: "/images/learn-fun/learn-fun-phonics.mp4",
            screen: { src: "/images/learn-fun/phonics-video-frame.jpg", alt: "Learn Fun Phonics sound discovery in desktop Chrome browser" },
            captionHtml: "<b>Learn Fun Phonics</b> — Interactive sound discovery module connecting letter recognition with spoken phonemes.",
          },
        ],
      },
      {
        id: "simplicity",
        label: "Feedback Loop #2",
        heading: "Removing what wasn't helping: eliminating visual noise.",
        blocks: [
          {
            t: "p",
            html: "Testing with young children surfaced an important observation: extraneous decorative icons did not contribute meaningfully to navigation or learning. For early learners, visual elements aren't neutral—they actively compete for attention.",
          },
          {
            t: "before-after-mockup",
          },
        ],
      },
      {
        id: "reset-progress",
        label: "Feedback Loop #3",
        heading: "Starting afresh: adding a one-tap progress erase button.",
        blocks: [
          {
            t: "p",
            html: "User feedback highlighted a critical friction point: whenever parents or children wanted to replay learning modules or hand the device to a sibling, there was no way to restart cleanly without uninstalling the app. Adding an accessible <b>Erase button</b> at the top navigation lets users reset their progress instantly without technical hurdles.",
          },
          {
            t: "before-after-mockup",
            topCaption: "Progress Reset & Replay",
            beforeSrc: "/images/learn-fun/reset-progress-before.png",
            beforeAlt: "Before: Top header lacked a reset action, requiring app uninstallation to restart lessons",
            beforeNoteTitle: "Uninstall Required to Reset",
            beforeNoteDesc: "No native way to clear stars or start over. Families had to delete and reinstall the app to replay from scratch.",
            afterSrc: "/images/learn-fun/reset-progress-after.png",
            afterAlt: "After: Prominent Erase button added to the top header for instant progress reset",
            afterNoteTitle: "One-Tap Erase Header",
            afterNoteDesc: "Added an accessible, tactile Erase button in the top navigation bar, enabling seamless replays for siblings and repeat practice.",
            frameBg: "linear-gradient(180deg, #FFFFFF 0%, #F5F3FF 100%)",
          },
        ],
      },
      {
        id: "screens",
        label: "Multi-Screen",
        heading: "Designing across tablet, mobile, and web.",
        blocks: [
          {
            t: "p",
            html: "Learn Fun isn't locked to a single device. The responsive architecture ensures a consistent, tactile experience whether at home on a tablet or on a parent's phone in a grocery line:",
          },
          {
            t: "cards",
            items: [
              [
                "Tablet",
                "Primary learning experience",
                "Generous touch targets and spacious activity layouts optimized for two-handed toddler exploration.",
              ],
              [
                "Mobile",
                "Compact on-the-go exploration",
                "The same interaction patterns tightened for quick distraction-free use on parent phones.",
              ],
              [
                "Web",
                "Zero-install universal access",
                "Accessible directly in any browser for immediate play without store barrier requirements.",
              ],
            ],
          },
        ],
      },
      {
        id: "offline",
        label: "Offline by Design",
        heading: "Learning shouldn't stop because the internet does.",
        blocks: [
          {
            t: "p",
            html: "One of the product's most important constraints was complete offline accessibility. Young children often use apps during car rides, flights, and low-connectivity environments where spotty network connections disrupt traditional web experiences.",
          },
          {
            t: "cards",
            items: [
              [
                "01",
                "Offline PWA Launch",
                "App assets, sounds, and graphics are fully cached locally, launching instantly with zero network wait.",
              ],
              [
                "02",
                "Zero Buffering",
                "Preloaded audio phonemes ensure instantaneous voice feedback upon tapping, avoiding toddler frustration.",
              ],
              [
                "03",
                "No Sign-In Walls",
                "Zero onboarding friction, zero tracking, and zero account requirements before a child can play.",
              ],
              [
                "04",
                "Google Play Packaged",
                "Wrapped as an Android bundle ready for offline device storage without recurring server dependencies.",
              ],
            ],
          },
        ],
      },
      {
        id: "googleplay",
        label: "Google Play",
        heading: "From design prototype to live on Google Play.",
        blocks: [
          {
            t: "p",
            html: "Learn Fun moved beyond a design prototype into a distributable, production-tested product on Android. Built as an offline-first PWA packaged via Trusted Web Activity (TWA) architecture, it achieved full Google Play compliance for families with zero trackers, full COPPA compatibility, and instantaneous offline lesson loading.",
          },
        ],
      },
      {
        id: "takeaway",
        label: "Retrospective",
        heading: "Designing for children made simplicity harder — and more important.",
        blocks: [
          {
            t: "takes",
            items: [
              [
                "01",
                "Simplicity determines comprehension",
                "For adult products, removing complexity often improves usability. For early learners, removing complexity can determine whether the child understands the interaction at all.",
              ],
              [
                "02",
                "Feedback transforms original assumptions",
                "Phonics and icon pruning were direct results of testing with real users, proving that listening beats defending design files.",
              ],
              [
                "03",
                "Every interaction must earn its place",
                "Good product design isn't about creating more screens. It is about understanding people, making thoughtful decisions, and building experiences that solve real problems.",
              ],
            ],
          },
        ],
      },
    ],
  },

  /* ---------------- TELEHEALTH ---------------- */
  telehealth: {
    slug: "telehealth",
    title: "AI Telehealth Platform",
    nav: "Telehealth",
    tags: [
      ["Under NDA", "nda"],
      ["0→1", "shipped"],
    ],
    sub: "An AI that knows the one thing it's never allowed to fake: certainty.",
    meta: [
      ["My Role", "Lead Product Designer, brought in under contract and NDA, end to end"],
      ["Team", "Confidential"],
      ["Timeline & Status", "2025 to 2026, pre-launch, confidential"],
    ],
    next: "climapt",
    sections: [
      {
        id: "overview",
        label: "Overview",
        heading: "I was brought in to design a system that could admit when it didn't know.",
        blocks: [
          {
            t: "p",
            html: "A client came to me with a 0 to 1 telehealth platform: patients, physicians, donors, and administrators, all sharing one product, all connected around subsidized care. They needed multi-role architecture across web and mobile, agentic AI experiences, payment and payout flows, and multilingual, WCAG-compliant UX in four languages. I led the design end to end.",
          },
          {
            t: "nda",
            html: "This work stays confidential. What you're seeing is a limited, authorized set of patient-facing screens and demo clips, enough to show the real product without the client's identity or business specifics.",
          },
          { t: "fig", kind: "vid", ratio: "r169", captionHtml: "Fig 0.1 · Product walkthrough, patient flow.", video: "/images/telehealth/demo-insurance.mp4" },
          { t: "fig", kind: "img", ratio: "r43", captionHtml: "Fig 0.2 · Patient home, quick actions and AI-assisted symptom check.", screen: { src: "/images/telehealth/home.png", alt: "Telehealth patient home screen with quick actions and AI symptom check entry point" } },
        ],
      },
      {
        id: "problem",
        label: "The Problem",
        heading: "What happens when the wrong answer isn't a bad review, but a bad outcome?",
        blocks: [
          {
            t: "p",
            html: "Most AI products can afford to be confidently wrong sometimes. This one couldn't. A guess dressed up as an answer isn't a UX flaw here, it's a safety risk, and that changed how I had to think about every screen.",
          },
          {
            t: "cards",
            items: [
              ["01", "Four roles, four risk profiles", "Patients, physicians, donors, and admins carry genuinely different mental models, and different consequences when the interface lets them down."],
              ["02", "Agentic AI with real stakes", "The system had to know the edge of its own competence and hand off cleanly the moment it reached it."],
              ["03", "Money inside a compliance frame", "Provider payouts in a regulated healthcare context. The money had to stay legible and auditable, no exceptions."],
              ["04", "Four languages, one standard", "Multilingual and WCAG compliant from the architecture up, not bolted on at the end."],
            ],
          },
          {
            t: "thesis",
            html: "Design a system that knows the edge of its own competence, and hands off to a human cleanly the moment it gets there.",
          },
          {
            t: "principles",
            items: [
              ["01", "Trust before capability", "Every AI surface has to earn belief before it gets to show off."],
              ["02", 'The AI says "I don\'t know"', "Low confidence gets surfaced, never smoothed over."],
              ["03", "Every role sees only its world", "Isolation as clarity, and as a security posture."],
            ],
          },
        ],
      },
      {
        id: "architecture",
        label: "Architecture",
        heading: "One app, or four? The answer changed everything downstream.",
        blocks: [
          {
            t: "p",
            html: "Here was the fork in the road: build one application with permission-gated views, or give each role its own isolated entry point. I treated this as an architecture decision, not a preference, and worked through both directions honestly.",
          },
          {
            t: "alt",
            a: {
              heading: "Option A: single app, permission gates",
              items: [
                ["pro", "Shared components, lower build overhead"],
                ["pro", "One codebase, one deploy"],
                ["con", "IA compromises for every role, nobody's mental model actually wins"],
                ["con", "Permission complexity grows with every feature, and the error surface widens with it"],
              ],
            },
            b: {
              heading: "Option B: subdomain-based role separation",
              items: [
                ["pro", "Clean IA per role, each experience shaped to its user's world"],
                ["pro", "A security posture that suits a health context: isolation by default"],
                ["con", "Shared-component overhead across surfaces"],
              ],
            },
            verdictHtml:
              "I chose Option B, role-isolated entry points. In a product that mixes health and money, <em>clarity per role and isolation by default beat build convenience.</em> The overhead was a real price, and I paid it knowingly.",
          },
          { t: "fig", kind: "img", ratio: "r43", captionHtml: "Fig 2.0 · Booking a physician from inside the patient app.", screen: { src: "/images/telehealth/appointment.png", alt: "Telehealth appointment screen showing a physician profile with credentials and availability" } },
          { t: "fig", kind: "vid", ratio: "r169", captionHtml: "Fig 2.1 · The booking flow, end to end.", video: "/images/telehealth/demo-booking.mp4" },
        ],
      },
      {
        id: "aistates",
        label: "AI States",
        heading: "Most AI products design for the happy answer. I designed for the other four.",
        blocks: [
          {
            t: "p",
            html: "The real design system was never the AI's best response. It was what happens at the edges: low confidence, no answer, the wrong context, a person who actually needs a human. I built those states as <b>the product</b>, not as the exception path nobody budgets time for.",
          },
          {
            t: "states",
            items: [
              ["ai", "AI uncertainty", "When confidence drops, the interface says so, out loud, and offers a way to escalate. <b>Never a confident guess in a clinical setting.</b>"],
              ["load", "Agent working", "Bounded, explained waiting. A clinical user should never sit staring at an ambiguous spinner wondering if anything is happening."],
              ["error", "Escalation to human", "The designed exit for when the AI, or the system, can't safely go further. A first-class flow, not a failure screen."],
              ["ok", "Resolved", "A clear confirmation, delivered across a multilingual, WCAG-compliant surface."],
            ],
          },
          { t: "fig", kind: "img", ratio: "r43", captionHtml: "Fig 3.0 · The AI assistant, mid conversation, with a disclaimer that never lets it forget it isn't a doctor.", screen: { src: "/images/telehealth/symptom-check.png", alt: "Telehealth AI symptom-check chat with a visible disclaimer that it does not replace a doctor's opinion" } },
          {
            t: "decision",
            key: true,
            kicker: "Key decision",
            badges: ["01", "02"],
            title: "I designed the failure states before I polished the happy path",
            bodyHtml:
              "The uncertainty, fallback, and escalation-to-human states got designed <em>first</em>, before the happy path was even pretty. In a clinical product, how the system behaves when it doesn't know something is the real trust surface. Everything else is decoration on top of that.",
          },
        ],
      },
      {
        id: "payments",
        label: "Payments",
        heading: "Nobody donates to a black box.",
        blocks: [
          {
            t: "p",
            html: "Provider payouts run through Stripe Connect inside a zero-commission model, and I designed the whole flow to stay legible and auditable from end to end. In a product that mixes health and money, <b>trust is the entire conversion story.</b> Every payment state, every receipt, every ledger view had to explain itself.",
          },
          {
            t: "figrow",
            items: [
              { kind: "img", ratio: "r43", captionHtml: "Fig 4.0 · Insurance verification, step one of three.", screen: { src: "/images/telehealth/insurance.png", alt: "Telehealth insurance verification form, patient information step" } },
              { kind: "img", ratio: "r43", captionHtml: "Fig 4.1 · The donor side of the pool, one tap to give.", screen: { src: "/images/telehealth/donation.png", alt: "Telehealth donor screen for contributing to the care pool, one-time or monthly" } },
            ],
          },
          { t: "fig", kind: "img", ratio: "r169", captionHtml: "Fig 4.2 · A donor-funded balance, made visible to the patient.", screen: { src: "/images/telehealth/funding-widget.png", alt: "Out-of-pocket balance widget showing funds available from donor support" }, raw: true },
          { t: "fig", kind: "vid", ratio: "r169", captionHtml: "Fig 4.3 · The insurance and claims flow.", video: "/images/telehealth/demo-insurance.mp4" },
        ],
      },
      {
        id: "retro",
        label: "Retrospective",
        heading: "What a confidential build still taught me about trust.",
        blocks: [
          {
            t: "banner",
            html: "A complete 0 to 1 design system for a four-role, multi-agent, multilingual platform, confidential until launch, shown here in a limited, authorized preview.",
          },
          {
            t: "takes",
            items: [
              ["01", "Design the exits first", "In high-stakes AI, the escalation path is the feature. Everything else is just polish on top of it."],
              ["02", "Isolation can be kindness", "Separating the roles wasn't only about security. It let each person's world stay simple."],
              ["03", "Compliance is a design material", "The HIPAA-aware and WCAG constraints shaped better decisions than a free hand ever would have."],
            ],
          },
        ],
      },
    ],
  },

  /* ---------------- CLIMAPT ---------------- */
  climapt: {
    slug: "climapt",
    title: "Climapt",
    nav: "Climapt",
    tags: [
      ["Concept · Figma", "concept"],
      ["Behance case study", "nda"],
    ],
    sub: "A forecast means nothing until it tells a farmer what to do on Monday.",
    meta: [
      ["My Role", "Solo, concept from zero to one: problem framing, IA, hi-fi screens"],
      ["Team", "Independent"],
      ["Timeline & Status", "Concept, presented on Behance"],
    ],
    next: "earthquake",
    sections: [
      {
        id: "overview",
        label: "Overview",
        heading: "The rain stopped in the middle of the season, and nobody saw it coming.",
        blocks: [
          {
            t: "p",
            html: "In August and September of 2024, rainfall across Nigeria's farm belt stopped, abruptly, mid season. Farmers were left facing crop failure and water scarcity they never saw coming, because the data that could have warned them existed somewhere, just not in front of the person who needed it.",
          },
          {
            t: "p",
            html: "That gap is what <b>Climapt</b> is built to close. It's a concept for an AI climate-resilience platform that turns predictive risk into decisions a farmer can actually act on, proactive instead of reactive.",
          },
          {
            t: "p",
            html: "I'm presenting this as exactly what it is: <b>a concept, with design decisions and a validation plan, not invented impact metrics.</b> I'd rather show you honest thinking than a number I made up.",
          },
          { t: "fig", kind: "img", ratio: "r43", captionHtml: "Fig 0.1 · Home: today's risk, a recommendation, and what to plant next.", screen: { src: "/images/climapt/home.png", alt: "Climapt home screen with weather card, a fertilizer recommendation, and planting predictions for corn and tomato" } },
        ],
      },
      {
        id: "problem",
        label: "The Problem",
        heading: "How do you design certainty out of a number that isn't certain?",
        blocks: [
          {
            t: "p",
            html: "A forecast is a likelihood, not a fact, and a farmer acting on it as fact is a design failure with real consequences. That single tension shaped almost every decision in this concept.",
          },
          {
            t: "cards",
            items: [
              ["01", "Probability versus certainty", "A forecast is a likelihood. Treating it as fact is a design failure with real consequences attached."],
              ["02", "Low digital literacy", "The interface has to be legible at a glance, every time. Hierarchy over density, no exceptions."],
              ["03", "Low bandwidth", "Rural connectivity is a first-order constraint here, not something you optimize for later."],
              ["04", "Trusting a machine's forecast", "Why would a farmer believe this screen over their own eyes and years of experience? Trust has to be designed, never assumed."],
            ],
          },
          {
            t: "thesis",
            html: "Turn a probability into an action a farmer takes this week, without ever pretending the forecast is certain.",
          },
          {
            t: "principles",
            items: [
              ["01", "Likelihood, never false certainty", "Confidence stays visible, always."],
              ["02", "Every forecast resolves to an action", "Awareness with no next step changes nothing."],
              ["03", "The constraint is the brief", "Bandwidth and literacy shape the design itself, not just a disclaimer at the bottom."],
            ],
          },
        ],
      },
      {
        id: "risk",
        label: "Risk UX",
        heading: "A number would have lied to them.",
        blocks: [
          {
            t: "p",
            html: "Here was the real interaction problem: how does a farmer read risk at a glance, across literacy levels, on a low-end device in direct sunlight? I landed on a <b>severity-first color language, red for danger, yellow for warning, green for ok</b>, paired with plain-language guidance, and I kept the forecast's confidence visible so likelihood never gets to masquerade as certainty.",
          },
          {
            t: "alt",
            a: {
              heading: "Rejected: numeric scores and probability bands",
              items: [
                ["pro", "Precise, carries the model's actual output"],
                ["pro", "Familiar to data-literate users"],
                ["con", "Demands a statistical literacy the constraint explicitly rules out"],
                ["con", 'A number invites false precision. "73% risk" reads as certainty to anyone without a stats background'],
              ],
            },
            b: {
              heading: "Chosen: traffic-light severity language",
              items: [
                ["pro", "Legible in one glance. Red, yellow, green is a signal system people already know"],
                ["pro", "Works across literacy levels and languages, and survives a cheap screen in direct sunlight"],
                ["con", "Coarser than the model. Three levels compress a whole probability distribution"],
              ],
            },
            verdictHtml:
              "I went with traffic-light severity, because in this context <em>a coarse signal that gets understood beats a precise one that gets misread.</em> The compression cost is real and I accepted it. Confidence stays visible right alongside it, so the coarseness never quietly becomes a lie.",
          },
          {
            t: "figrow",
            items: [
              { kind: "img", ratio: "r43", captionHtml: "Fig 2.0 · Risk made visible on a map, severity first.", screen: { src: "/images/climapt/risk-map.png", alt: "Climapt temperature risk map across a region, color-coded by severity with a time slider" } },
              { kind: "img", ratio: "r43", captionHtml: "Fig 2.1 · The AI assistant turns the forecast into an action.", screen: { src: "/images/climapt/ai-chat.png", alt: "Climapt AI assistant chat recommending it is time to apply fertilizer, with a farmer asking why" } },
            ],
          },
          {
            t: "decision",
            key: true,
            kicker: "Key decision",
            badges: ["02"],
            title: "Forecast, then recommendation, then action",
            bodyHtml:
              "A risk score by itself changes nothing. I made every prediction resolve into <em>a concrete recommended action, something to do this week</em>, so the product drives behavior instead of just awareness.",
          },
        ],
      },
      {
        id: "states",
        label: "States",
        heading: "In farming, old data doesn't just go stale. It goes dangerous.",
        blocks: [
          {
            t: "states",
            items: [
              ["ai", "Forecast confidence", "The model's certainty is right there, visible, so a farmer can weight the recommendation appropriately instead of taking it as gospel."],
              ["load", "Fetching prediction", "Predictions aren't instant. I made the wait bounded and explained instead of a silent spinner."],
              ["empty", "New region, no data", "A cold start I actually designed for, not a broken screen someone stumbles into."],
              ["error", "Stale or unavailable data", "Flagged loudly, on purpose. Acting on outdated climate data is genuinely dangerous, so this state interrupts you."],
            ],
          },
          { t: "fig", kind: "img", ratio: "r43", captionHtml: "Fig 3.0 · The AI assistant, introduced honestly as a guide, not an oracle.", screen: { src: "/images/climapt/ai-intro.png", alt: "Climapt AI assistant introduction screen, framed as a guide for the farmer's planting journey" } },
        ],
      },
      {
        id: "retro",
        label: "Retrospective",
        heading: "A concept is only honest if you admit it's still a concept.",
        blocks: [
          {
            t: "banner",
            html: "A complete concept for predictive, trust-aware UX in a high-stakes, low-resource context, presented as decisions and a validation plan, not a launch.",
          },
          {
            t: "takes",
            items: [
              ["01", "Uncertainty is a UI element", "Hiding the model's confidence would have been the easy choice, and the dishonest one."],
              ["02", "Action is the unit of value", "The design only succeeds if a forecast turns into a Monday decision. Nothing less counts."],
              ["03", "Next: real farmers", "The validation plan starts with field research. This concept's assumptions have earned a hard conversation with reality."],
            ],
          },
        ],
      },
    ],
  },

  /* ---------------- EARTHQUAKE ---------------- */
  earthquake: {
    slug: "earthquake",
    title: "Earthquake Crisis Response",
    nav: "Earthquake",
    tags: [
      ["Shipped · $20K raised", "shipped"],
      ["Medixbot", "nda"],
    ],
    sub: "In a crisis, every second of friction is money that never arrives. Trust is what gets someone to click donate.",
    meta: [
      ["My Role", "Designer, donor experience end to end, with the team at Medixbot"],
      ["Team", "Medixbot"],
      ["Timeline & Status", "Designed and shipped in one week, while the crisis was still unfolding. $20,000 raised"],
    ],
    next: "learn-fun",
    sections: [
      {
        id: "overview",
        label: "Overview",
        heading: "What do you design when the deadline is the news cycle?",
        blocks: [
          {
            t: "p",
            html: "When the Turkey and Syria earthquake hit, the team at Medixbot needed a fundraising site that could turn donor intent into a completed donation, fast. I designed the donor experience end to end: the trust architecture, the donation flow, and the responsive build. <b>We designed and shipped it in one week</b>, while the crisis was still unfolding.",
          },
          {
            t: "p",
            html: "There's one number in my portfolio I never have to dress up: <b>the site helped raise $20,000 in humanitarian funding.</b>",
          },
          { t: "fig", kind: "img", ratio: "r169", captionHtml: "Fig 0.1 · Site hero — trust signals above the ask.", screen: { src: "/images/earthquake/home.png", alt: "Earthquake fundraising site homepage with hero, trust badges, and live donation stats" }, device: "web" },
        ],
      },
      {
        id: "problem",
        label: "The Problem",
        heading: "Why do two small problems add up to zero donations?",
        blocks: [
          {
            t: "p",
            html: "People don't give to a site that looks unverified. And in a crisis, every extra field or extra tap is money that never lands. Neither problem is solvable on its own. The design had to earn trust and get out of the donor's way, at the same time, with almost no time to do it in.",
          },
          {
            t: "cards",
            items: [
              ["01", "Trust starts at zero", "An unfamiliar fundraising site has no built in credibility. Legitimacy is what actually converts."],
              ["02", "Friction has a price tag", "Every extra step on the donor path costs real donations, not just seconds."],
              ["03", "The scariest moment is payment", "Handing over card details is the highest anxiety point in the whole flow."],
              ["04", "Built during, not after", "This launched while the crisis was still active. The news cycle was the deadline."],
            ],
          },
          {
            t: "thesis",
            html: "Earn a donor's trust in seconds, then get out of the way of the payment.",
          },
          {
            t: "principles",
            items: [
              ["01", "Trust comes before the ask", "Credibility signals sit up front, before any donation prompt shows up."],
              ["02", "Friction is lost money", "The donor path is stripped down to land, donate, confirm. Nothing else."],
              ["03", "Cut on purpose", "Protect the trust and the money path above everything cosmetic."],
            ],
          },
        ],
      },
      {
        id: "trust",
        label: "Trust & Flow",
        heading: "What has to happen before someone will actually hand over their card?",
        blocks: [
          {
            t: "p",
            html: 'The page puts <b>three trust signals</b> in front of the ask: <b>fund transparency</b> (where every donation goes), a <b>donor leaderboard</b>, and <b>contribution badges</b>. Transparency answers "can I trust this?" The leaderboard and badges answer "are other people actually giving?" That\'s social proof doing work that copy alone can\'t do. Only after that does the flow narrow down to the payment path, stripped to the minimum, because when speed matters this much, <b>completion rate wins over collecting extra donor data.</b>',
          },
          {
            t: "figrow",
            items: [
              { kind: "img", ratio: "r169", captionHtml: "Fig 2.0 · Trust stack — transparency, leaderboard, badges.", screen: { src: "/images/earthquake/trust.png", alt: "Earthquake fundraising site donor leaderboard with rank, amount, and region" }, device: "web" },
              { kind: "img", ratio: "r43", captionHtml: "Fig 2.1 · Donation flow — land → donate → confirm.", screen: { src: "/images/earthquake/donate.png", alt: "Earthquake fundraising site donation form with amount picker and payment method" }, device: "web" },
            ],
          },
          {
            t: "decision",
            kicker: "Key decision",
            badges: ["01"],
            title: "Turning recognition into a conversion tool",
            bodyHtml:
              "The leaderboard and badges gamify generosity, which is a call I made carefully, because it sits on a thin ethical line. In crisis fundraising, social proof should pull people in, never pressure them. So recognition stays <em>celebratory</em> (visible momentum, what others gave) instead of coercive. Every completed gift quietly recruits the next one.",
          },
          {
            t: "decision",
            key: true,
            kicker: "Key decision",
            badges: ["03"],
            title: "Choosing what not to build",
            bodyHtml:
              "Shipping during an active crisis meant deciding, out loud, what we wouldn't build. We protected the trust signals and the payment path, and let everything cosmetic wait. Owning that trade off openly is what separates shipping fast from shipping carelessly.",
          },
        ],
      },
      {
        id: "states",
        label: "States",
        heading: "What happens the moment a donation fails?",
        blocks: [
          {
            t: "p",
            html: "A dropped donation during a crisis isn't a bug report. It's money that never arrives. So none of these states were allowed to be a dead end.",
          },
          {
            t: "states",
            items: [
              ["load", "Payment processing", "The most anxious moment in the whole flow, designed to reassure, because any ambiguity here kills the donation."],
              ["error", "Failed or declined donation", "A clear way to recover, never a dead end. The gift is one retry away, not gone."],
              ["ok", "Confirmation", "A receipt, a sense of impact, and a share loop. Each completed gift quietly recruits the next."],
              ["empty", "Goal at zero", "The early state was designed to build momentum instead of looking abandoned."],
            ],
          },
          { t: "fig", kind: "img", ratio: "r43", captionHtml: "Fig 3.0 · Donation states, annotated.", screen: { src: "/images/earthquake/donate-confirm.png", alt: "Earthquake fundraising site donation confirmation state, thank-you message over the payment form" }, device: "web" },
        ],
      },
      {
        id: "retro",
        label: "Retrospective",
        heading: "Why is this the one number I don't try to dress up?",
        blocks: [
          {
            t: "banner",
            html: "The site helped raise $20,000 in humanitarian funding, a real outcome from outside the design files that backs up the trust and friction decisions. I say it once, plainly, because restraint is what makes it believable.",
          },
          {
            t: "takes",
            items: [
              ["01", "Trust is the real funnel", "Almost every conversion problem upstream of payment turned out to be a credibility problem in disguise."],
              ["02", "Constraints force clarity", "The crisis deadline made us prioritize in a way calm projects usually avoid."],
              ["03", "One real number beats five decorated ones", "That's true on this project, and it's true everywhere else I've worked since."],
            ],
          },
        ],
      },
    ],
  },
};
