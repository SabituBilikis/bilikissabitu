import type { StateKey, Screen } from "@/lib/projects";

export type FigBlock = {
  kind: "img" | "vid";
  ratio: "r169" | "r219" | "r43" | "r45" | "r920";
  captionHtml: string;
  /** Real exported screen — when present, renders as a device-framed image instead of a placeholder. */
  screen?: Screen;
  /** Multiple real exported screens — when present, renders all devices inside a single shared frame container */
  screens?: Screen[];
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
      ["Google Play Ready", "live"],
    ],
    sub: "Save Everything Important. Find It Instantly.",
    githubUrl: "https://github.com/SabituBilikis/Recall",
    meta: [
      ["Role", "Product Designer: Strategy, UX Architecture, Figma, Prototyping & Build"],
      ["Workflow", "AI-assisted workflow moving rapidly between product decisions, Figma, prototyping, and production build"],
      ["Status", "Production-ready · 7 weeks · 2026"],
    ],
    heroBlock: {
      t: "fig",
      kind: "vid",
      ratio: "r169",
      captionHtml: "<b>Recall</b> — Full product walkthrough demonstrating instant one-tap capture, search, and retrieval without manual filing.",
      video: "/images/recall/demo-landscape.mp4",
      screen: { src: R("home"), alt: "Recall personal knowledge app preview" },
    },
    next: "telehealth",
    sections: [
      {
        id: "problem",
        label: "01 · Problem",
        heading: "We save everything. Then struggle to find anything.",
        blocks: [
          {
            t: "p",
            html: "Recall is a personal knowledge app designed to help people save and retrieve the information they want to keep. Capture <b>screenshots, links, notes, files, and ideas</b> without scattering them across different apps. Then organize saved items into personalized collections and find them later through search.",
          },
          {
            t: "p",
            html: "Useful information gets saved everywhere. A screenshot might live in the camera roll. A useful link might be buried in a WhatsApp chat. A note might be sitting in another app. A file might be somewhere in a downloads folder. Each app solves one part of the problem. <b>But together, they create a fragmented personal library.</b>",
          },
          {
            t: "p",
            html: "The challenge for Recall wasn't simply: <em>“How do we help people save things?”</em> Saving is already easy. The harder problem was:",
          },
          {
            t: "thesis",
            html: "How do we turn scattered saved information into something people can actually find and use later?",
          },
        ],
      },
      {
        id: "product-idea",
        label: "02 · The Idea",
        heading: "One place for the things you don't want to lose.",
        blocks: [
          {
            t: "p",
            html: "Recall brings different types of saved information into one space. Instead of remembering which app something was saved in, users can return to Recall:",
          },
          {
            t: "cards",
            items: [
              [
                "01",
                "Screenshots",
                "Visual references, receipts, conversations, inspiration.",
              ],
              [
                "02",
                "Links",
                "Articles, websites, resources, and things to revisit.",
              ],
              [
                "03",
                "Notes",
                "Thoughts, reminders, ideas, and information worth keeping.",
              ],
              [
                "04",
                "Files",
                "Documents and other useful files.",
              ],
            ],
          },
          {
            t: "fig",
            kind: "img",
            ratio: "r43",
            captionHtml: "Fig 1.1 · <b>Recall home and capture feed</b> — Uncluttered central space for all your saved knowledge.",
            screen: { src: R("home"), alt: "Recall home and capture feed" },
          },
        ],
      },
      {
        id: "core-experience",
        label: "03 · Core Experience",
        heading: "Designing the core experience: Save → Organize → Find.",
        blocks: [
          {
            t: "p",
            html: "I structured the experience around three connected behaviors:",
          },
          {
            t: "cards",
            items: [
              [
                "01",
                "Capture",
                "Save information without unnecessary friction.",
              ],
              [
                "02",
                "Organize",
                "Group saved items into collections that make sense to you.",
              ],
              [
                "03",
                "Find",
                "Search across your saved information using details you remember.",
              ],
            ],
          },
          {
            t: "decision",
            key: true,
            kicker: "The Mental Model",
            title: "Save → Organize → Find",
            bodyHtml:
              "The product doesn't require users to perfectly organize everything upfront. They can save first and structure their library as it grows.",
          },
          {
            t: "fig",
            kind: "img",
            ratio: "r169",
            captionHtml: "Fig 2.0 · <b>The Core Experience</b> — 01 Capture (intake selection), 02 Organize (searchable collections), and 03 Find (multi-attribute search).",
            screens: [
              { src: R("core-capture"), alt: "01 Capture — Choose what you want to save" },
              { src: R("core-organize"), alt: "02 Organize — Calm, searchable collections" },
              { src: R("core-find"), alt: "03 Find — Multi-attribute search" },
            ],
          },
        ],
      },
      {
        id: "collections",
        label: "04 · Collections",
        heading: "Give saved information a place to belong.",
        blocks: [
          {
            t: "p",
            html: "As the library grows, users need more than a long list of saved items. Recall introduces customizable collections that let users create their own structure. When creating a collection, users can define four visual attributes:",
          },
          {
            t: "cards",
            items: [
              [
                "01",
                "Name",
                "Give the collection a recognizable identity.",
              ],
              [
                "02",
                "Description",
                "Explain what the collection is for.",
              ],
              [
                "03",
                "Icon",
                "Choose a visual identifier.",
              ],
              [
                "04",
                "Colour",
                "Give the collection a distinct visual appearance.",
              ],
            ],
          },
          {
            t: "p",
            html: "This allows users to create spaces that reflect their own mental models rather than forcing everyone into the same predefined structure. Examples include: <b>Design Inspiration</b> <em>(UI references and product ideas)</em>, <b>Work Resources</b> <em>(Documents and links I use regularly)</em>, and <b>Travel</b> <em>(Places, plans, and information for future trips)</em>. The collection becomes a visual anchor for everything related to that topic.",
          },
          {
            t: "fig",
            kind: "img",
            ratio: "r169",
            captionHtml: "Fig 3.1 · <b>Personalized Collections & Detail</b> — 01 Custom collections with visual identifiers and 02 Saved references organized within a dedicated space.",
            screens: [
              { src: R("collections"), alt: "Recall personalized collections screen" },
              { src: R("collection-detail"), alt: "Recall collection detail view" },
            ],
          },
        ],
      },
      {
        id: "finding-information",
        label: "05 · Search",
        heading: "Search should work with what people remember.",
        blocks: [
          {
            t: "p",
            html: "People don't always remember the exact title of something they saved. They might remember what it was called, which collection it belongs to, the file name, or what type of content it was. So Recall's search experience is designed around multiple ways of identifying saved information:",
          },
          {
            t: "cards",
            items: [
              [
                "01",
                "Title",
                "Instant search query matching item headers and notes.",
              ],
              [
                "02",
                "Collection",
                "Filter by personal folder or category space.",
              ],
              [
                "03",
                "File name",
                "Locate documents, images, and attachments directly.",
              ],
              [
                "04",
                "Saved type",
                "Filter across screenshots, links, notes, or uploaded files.",
              ],
            ],
          },
          {
            t: "p",
            html: "This means users don't have to remember exactly where something lives before they can retrieve it.",
          },
          {
            t: "fig",
            kind: "img",
            ratio: "r43",
            captionHtml: "Fig 4.1 · <b>Multi-attribute search</b>: Instant query results across titles, collections, file names, and content types.",
            screen: { src: R("search"), alt: "Recall search screen" },
          },
        ],
      },
      {
        id: "information-architecture",
        label: "06 · Architecture",
        heading: "The information architecture: keeping saved knowledge close to the surface.",
        blocks: [
          {
            t: "p",
            html: "The challenge was balancing a growing library with a simple interface. I focused the information architecture around the things users actually need to do, avoiding deep hierarchies:",
          },
          {
            t: "cards",
            items: [
              [
                "01",
                "Home",
                "See and access saved information immediately upon opening the app.",
              ],
              [
                "02",
                "Collections",
                "Browse information based on how it has been structured.",
              ],
              [
                "03",
                "Search",
                "Find information based on what the user remembers.",
              ],
              [
                "04",
                "Saved items",
                "View and interact with individual pieces of content in full detail.",
              ],
            ],
          },
        ],
      },
      {
        id: "scope-cut",
        label: "07 · Scope Cut",
        heading: "What I chose not to build: AI retrieval didn't make the first version.",
        blocks: [
          {
            t: "p",
            html: "AI-powered retrieval was an early direction for Recall. It could have made the product more intelligent. But adding AI would also introduce another layer of complexity before the fundamentals were proven.",
          },
          {
            t: "decision",
            key: true,
            kicker: "The Scope Decision",
            title: "The fundamentals must be proven first",
            bodyHtml:
              "The core experience already had a clear value proposition: <b>Capture different types of information · Organize it into collections · Search and retrieve it later</b>. So I chose to keep AI retrieval out of the first version. The decision wasn't about whether AI was interesting. It was about whether AI was necessary for the product to solve its core problem. For v1, it wasn't.",
          },
        ],
      },
      {
        id: "outcome",
        label: "08 · Outcome",
        heading: "Built in seven weeks: save everything important, find it instantly.",
        blocks: [
          {
            t: "banner",
            html: "Recall went from concept to a working mobile product in <b>seven weeks</b>. The final product is centered around one straightforward promise: <b>Save everything important. Find it instantly.</b> Instead of asking users to remember which app they used to save something, Recall gives them one place to return to.",
          },
          {
            t: "takes",
            items: [
              [
                "01",
                "Capture and organization don't need to happen together",
                "Separating the two lets saving remain fast while giving users control over their library.",
              ],
              [
                "02",
                "Organization should adapt to the user",
                "Custom collection names, descriptions, icons, and colours allow people to create a structure that makes sense to them.",
              ],
              [
                "03",
                "Search should account for imperfect memory",
                "People don't always remember titles. Designing around multiple searchable attributes gives them more ways to recover what they saved.",
              ],
              [
                "04",
                "The best feature isn't always the next feature",
                "Cutting AI retrieval kept the first version focused on the fundamental experience instead of adding complexity before it was needed.",
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
