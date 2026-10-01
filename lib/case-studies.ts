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

export const caseStudyOrder = ["learn-fun", "recall", "earthquake"];

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
    next: "earthquake",
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



  /* ---------------- HUMAN REPUBLIC (EARTHQUAKE) ---------------- */
  earthquake: {
    slug: "earthquake",
    title: "Human Republic",
    nav: "Human Republic",
    tags: [
      ["Shipped · $20K raised", "shipped"],
      ["Turkey–Syria Earthquake Response", "nda"],
      ["Medixbot", "live"],
    ],
    sub: "When a crisis moves fast, trust can't move slowly.",
    meta: [
      ["My Role", "Product Designer — donor experience, UX architecture, interaction design, UI, prototyping"],
      ["Team", "Medixbot"],
      ["Timeline", "1 week"],
      ["Outcome", "$20,000 raised"],
    ],
    next: "learn-fun",
    sections: [
      {
        id: "situation",
        label: "01 · Situation",
        heading: "When a crisis moves fast, trust can't move slowly.",
        blocks: [
          {
            t: "p",
            html: "The Turkey–Syria earthquake created an immediate need for humanitarian support. People wanted to help. But wanting to donate and feeling confident enough to donate are two different things.",
          },
          {
            t: "p",
            html: "In a crisis, donors need to answer simple questions quickly:",
          },
          {
            t: "cards",
            items: [
              [
                "01",
                "Who am I giving to?",
                "Clear organisation identity and official credentials.",
              ],
              [
                "02",
                "Where is the money going?",
                "Transparent fund allocation and direct impact delivery.",
              ],
              [
                "03",
                "Can I trust this campaign?",
                "Visible proof that the platform is legitimate and active.",
              ],
              [
                "04",
                "How quickly can I contribute?",
                "A friction-free donation path without unnecessary steps.",
              ],
            ],
          },
          {
            t: "thesis",
            html: "Human Republic was designed as a clearer path from <b>concern → trust → action</b>.",
          },
          {
            t: "fig",
            kind: "img",
            ratio: "r169",
            captionHtml: "Fig 0.1 · <b>Human Republic Homepage</b> — establishing trust up front before asking for contributions.",
            screen: {
              src: "/images/earthquake/home.png",
              alt: "Human Republic fundraising homepage hero with trust badges and live stats",
            },
            device: "web",
          },
        ],
      },
      {
        id: "product-idea",
        label: "02 · Product Idea",
        heading: "Trust before the ask.",
        blocks: [
          {
            t: "p",
            html: "The experience was built around a simple principle:",
          },
          {
            t: "decision",
            key: true,
            kicker: "The Core Principle",
            title: "Give donors a reason to trust before asking for money",
            bodyHtml:
              "Before asking someone for money, give them enough reason to trust where it is going. That shaped both the information architecture and the donation flow. Instead of pushing the donation CTA immediately, the experience gave donors useful signals first: <b>Understand the cause → build confidence → contribute</b>.",
          },
        ],
      },
      {
        id: "making-trust-visible",
        label: "03 · Trust UX",
        heading: "Trust cannot live only in copy. It needs to appear in the interface.",
        blocks: [
          {
            t: "p",
            html: "I explored several signals that could help donors understand the campaign before contributing:",
          },
          {
            t: "cards",
            items: [
              [
                "01",
                "Funding transparency",
                "Make the campaign's financial progress visible rather than making donors guess where the campaign stands.",
              ],
              [
                "02",
                "Donor activity",
                "Show that other people are participating, creating a sense of visible momentum without hiding campaign information.",
              ],
              [
                "03",
                "Contribution recognition",
                "Badges and contribution milestones gave donors a lightweight way to see their participation as part of a larger collective effort.",
              ],
            ],
          },
          {
            t: "p",
            html: "The goal wasn't to pressure people into donating. It was to make the campaign feel <b>legible, transparent, and active.</b>",
          },
          {
            t: "fig",
            kind: "img",
            ratio: "r169",
            captionHtml: "Fig 2.0 · <b>Trust Stack</b> — live donor leaderboard, transparency breakdown, and active badges.",
            screen: {
              src: "/images/earthquake/trust.png",
              alt: "Human Republic donor leaderboard with transparent fund breakdown",
            },
            device: "web",
          },
        ],
      },
      {
        id: "reducing-path",
        label: "04 · Journey",
        heading: "Reducing the path to donation.",
        blocks: [
          {
            t: "p",
            html: "Once a donor decided to contribute, the interface needed to get out of the way. I reduced the core journey to: <b>Land → Understand → Donate → Confirm</b>.",
          },
          {
            t: "p",
            html: "Every additional decision was questioned: <em>Do donors need this information now? Does this step increase confidence? Does it help them complete the donation?</em> If not, it didn't belong in the critical path.",
          },
          {
            t: "fig",
            kind: "img",
            ratio: "r43",
            captionHtml: "Fig 2.1 · <b>Streamlined Donation Flow</b> — clean amount picker and payment execution.",
            screen: {
              src: "/images/earthquake/donate.png",
              alt: "Human Republic streamlined donation form with amount selection",
            },
            device: "web",
          },
        ],
      },
      {
        id: "urgency",
        label: "05 · Balance",
        heading: "Designing for urgency without creating panic.",
        blocks: [
          {
            t: "p",
            html: "A humanitarian product has a difficult balance to maintain. The situation is urgent, but the interface shouldn't feel chaotic. I used the product hierarchy to separate <b>urgency from friction</b>.",
          },
          {
            t: "decision",
            key: true,
            kicker: "Hierarchy Strategy",
            title: "Urgency should encourage action, not create friction",
            bodyHtml:
              "Important information needed to be immediately visible and the donation action obvious. But the interface still needed to feel calm enough for someone to make a financial decision. <b>Urgency should encourage action. It shouldn't make the experience harder to understand.</b>",
          },
        ],
      },
      {
        id: "states",
        label: "06 · System States",
        heading: "The states mattered too.",
        blocks: [
          {
            t: "p",
            html: "A donation experience isn't complete when someone presses <b>Donate</b>. Something can go wrong. So I designed around the moments after the decision:",
          },
          {
            t: "states",
            items: [
              [
                "ok",
                "Ready",
                "The donor can confidently begin.",
              ],
              [
                "load",
                "Processing",
                "The payment is being handled without leaving the donor wondering what happened.",
              ],
              [
                "error",
                "Failed",
                "The problem is explained clearly, with a path forward.",
              ],
              [
                "ai",
                "Confirmed",
                "The donor receives clear confirmation that the contribution was completed.",
              ],
              [
                "empty",
                "Goal reached",
                "The campaign communicates what happens when its target is achieved.",
              ],
            ],
          },
          {
            t: "fig",
            kind: "img",
            ratio: "r43",
            captionHtml: "Fig 3.0 · <b>Confirmation & Post-Donation State</b> — reassurance and share loop upon completion.",
            screen: {
              src: "/images/earthquake/donate-confirm.png",
              alt: "Human Republic donation confirmation screen with receipt",
            },
            device: "web",
          },
        ],
      },
      {
        id: "one-week",
        label: "07 · Execution",
        heading: "One week changed the way I prioritised.",
        blocks: [
          {
            t: "p",
            html: "Human Republic was designed within a <b>one-week constraint</b>. That meant there wasn't time to design everything — only what mattered most:",
          },
          {
            t: "cards",
            items: [
              [
                "01",
                "Can people understand the cause?",
                "The experience needed enough context to establish confidence quickly.",
              ],
              [
                "02",
                "Can people trust the campaign?",
                "Transparency and visible activity had to support the decision.",
              ],
              [
                "03",
                "Can people complete the donation easily?",
                "The actual contribution flow needed to remain simple.",
              ],
            ],
          },
          {
            t: "p",
            html: "This kept the project focused on the donor's decision rather than the number of screens we could produce.",
          },
        ],
      },
      {
        id: "outcome",
        label: "08 · Outcome",
        heading: "Human Republic was designed and delivered in one week.",
        blocks: [
          {
            t: "banner",
            html: "The campaign went on to raise <b>$20,000</b>. The number mattered, but the key product lesson was: <b>Trust is part of conversion.</b> People don't simply need a button that says <em>Donate</em>; they need enough clarity to feel comfortable pressing it.",
          },
          {
            t: "takes",
            items: [
              [
                "01",
                "Trust is an interface problem",
                "Transparency, hierarchy, social proof, and feedback all influence whether someone feels confident enough to act.",
              ],
              [
                "02",
                "Friction matters more when stakes are high",
                "A small unnecessary step can become a meaningful barrier when someone is already uncertain.",
              ],
              [
                "03",
                "States are part of the experience",
                "The success state gets attention, but failure, processing, and confirmation are equally important when money is involved.",
              ],
              [
                "04",
                "Constraints sharpen product decisions",
                "One week forced me to focus on the moments that mattered most instead of designing around everything the product could eventually become.",
              ],
            ],
          },
        ],
      },
    ],
  },
};
