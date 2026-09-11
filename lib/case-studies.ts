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
  /** Original CSS/SVG illustration key — for concept figures with no matching real asset. */
  illustration?: "scattered";
};

export type CSBlock =
  | { t: "p"; html: string }
  | ({ t: "fig" } & FigBlock)
  | { t: "figrow"; items: FigBlock[] }
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
  /** Optional CTA link rendered at the end of the tags row (e.g. a public repo). */
  githubUrl?: string;
  sections: CaseStudySection[];
  next: string;
}

export const caseStudyOrder = ["recall", "learn-fun", "telehealth", "climapt", "earthquake"];

const R = (name: string) => `/images/recall/${name}.png`;

export const caseStudies: Record<string, CaseStudy> = {
  /* ---------------- RECALL ---------------- */
  recall: {
    slug: "recall",
    title: "Recall",
    nav: "Recall",
    tags: [
      ["Built in 7 weeks", "shipped"],
      ["Play Store launch pending", "concept"],
      ["Solo build", "nda"],
    ],
    sub: "A home for everything you almost lost.",
    githubUrl: "https://github.com/SabituBilikis/Recall",
    meta: [
      ["My Role", "Founder and Product Designer: strategy, UX/UI, production build in React Native"],
      ["Team", "Solo. Designed in Figma, built with Claude Code"],
      ["Timeline & Status", "7 weeks · 2026 · Production-ready, Play Store launch pending"],
    ],
    next: "learn-fun",
    sections: [
      {
        id: "overview",
        label: "Overview",
        heading: "My best ideas were hiding in four different apps.",
        blocks: [
          {
            t: "p",
            html: "Everything I saved lived somewhere else. A WhatsApp chat with myself. Three notes apps. Browser bookmarks I never opened again. A camera roll holding 4,000 screenshots. <b>Recall</b> is my answer to that mess: one place that catches anything in a tap and hands it back the moment you need it.",
          },
          {
            t: "p",
            html: "I designed it end to end, then built it to production myself in <b>seven weeks</b>. Figma to React Native, no development team, just an AI-native workflow and a stubborn rule that it had to ship. It's now heading to the Play Store. This is the story of the decisions, the trade-offs, and the one feature I had to kill.",
          },
          { t: "fig", kind: "vid", ratio: "r169", captionHtml: "Fig 0.1 · <b>Demo loop</b>: capture, search, found.", video: "/images/recall/demo-landscape.mp4" },
          {
            t: "figrow",
            items: [
              { kind: "img", ratio: "r43", captionHtml: "Fig 0.2 · The core screens.", screen: { src: R("home"), alt: "Recall home screen with quick capture and recently saved items" } },
              { kind: "img", ratio: "r43", captionHtml: "Fig 0.3 · The capture sheet, all four formats.", screen: { src: R("capture"), alt: "Recall capture sheet for saving a screenshot, link, note, or file" } },
            ],
          },
        ],
      },
      {
        id: "context",
        label: "Context",
        heading: "Saving was never the hard part.",
        blocks: [
          {
            t: "p",
            html: 'Ask anyone where their important stuff lives and you\'ll get a list of four apps and a shrug. Tools for <b>saving</b> are everywhere, and that\'s exactly why finding fails. Nobody remembers a filename or a folder. You remember "that thing about how Linear does onboarding," and no app speaks that language.',
          },
          {
            t: "p",
            html: "The graveyard of personal knowledge apps tells the same story. Products that add another place to save, without fixing the moment of <b>finding</b>, just become one more place to lose things.",
          },
          { t: "fig", kind: "img", ratio: "r169", captionHtml: "Fig 1.0 · The scattered workflow: self-chat, bookmarks, gallery.", illustration: "scattered" },
        ],
      },
      {
        id: "problem",
        label: "The Problem",
        heading: "How do you design for a memory you don't have?",
        blocks: [
          { t: "p", html: "People search with vague, associative memory, not metadata. That was the core problem, and the constraints kept stacking on top of it:" },
          {
            t: "cards",
            items: [
              ["01", "Four formats, one surface", "Screenshots, links, notes, and files all behave differently, but they had to feel like one system."],
              ["02", "The organizing tax", "Any manual filing step gets abandoned within a week. The structure couldn't depend on user discipline, including mine."],
              ["03", "Capture is a reflex", "The save moment happens mid-scroll, mid-task. Anything more than one tap and the item is gone."],
              ["04", "A team of one", "Every design decision was also a build decision. The scope had to survive a production budget of exactly one person."],
            ],
          },
          {
            t: "thesis",
            html: "Make capture instant, make retrieval feel like memory, and ship it alone, without pretending the app has intelligence it doesn't have yet.",
          },
          {
            t: "principles",
            items: [
              ["01", "Zero-friction capture", "One tap, any format, mid-task."],
              ["02", "Search does the organizing", "The user never files anything. The system does the surfacing."],
              ["03", "Never lose a save", "In a save-everything app, one dropped item is a broken promise."],
            ],
          },
        ],
      },
      {
        id: "capture",
        label: "Capture Flow",
        heading: "The rule I refused to break.",
        blocks: [
          {
            t: "p",
            html: "The whole flow hangs on one rule: <b>the moment of capture earns nothing extra.</b> No title field. No tag prompt. No folder picker. The app absorbs the item and gets out of the way, because depth belongs at retrieval, where you actually have attention to spend. The capture flow shipped exactly as designed. The iteration budget went into scope instead, and you'll see where in a moment.",
          },
          {
            t: "fig",
            kind: "img",
            ratio: "r169",
            captionHtml: "Fig 2.0 · The capture flow: tap, saved, gone.",
            screen: { src: R("uploading"), alt: "Recall file upload with a live progress bar, optimistic capture in action" },
          },
          {
            t: "decision",
            key: true,
            kicker: "Key decision",
            badges: ["01", "03"],
            title: "Optimistic capture",
            bodyHtml:
              "Saving shows instant confirmation while the real work continues in the background. The trade-off is honest: <em>the UI claims success before the system has fully finished.</em> That choice turns the failure path into a first-class design problem instead of an afterthought, and it gets its own section in States.",
          },
        ],
      },
      {
        id: "retrieval",
        label: "Retrieval",
        heading: "The fork that decided the whole product.",
        blocks: [
          {
            t: "p",
            html: "Does the user organize, or does the system? Every personal knowledge app answers this question, most of them by accident. I designed both directions far enough to compare them honestly.",
          },
          {
            t: "fig",
            kind: "img",
            ratio: "r169",
            captionHtml: "Fig 3.0 · Retrieval: query, results, found.",
            screen: { src: R("search"), alt: "Recall search results, retrieval under vague memory" },
          },
          {
            t: "alt",
            a: {
              heading: "Option A: folder taxonomy",
              items: [
                ["pro", "A familiar mental model"],
                ["pro", "Browsable without a query"],
                ["con", "A maintenance tax users stop paying, so the library decays with use"],
                ["con", "Filing decisions at capture time break the one-tap rule"],
              ],
            },
            b: {
              heading: "Option B: search first, light surfacing",
              items: [
                ["pro", "Zero organizing burden, stays healthy no matter how messy the input"],
                ["pro", "Matches how memory actually works: associative, not hierarchical"],
                ["con", "A heavier lift on search quality and zero-result design"],
              ],
            },
            verdictHtml:
              "I chose Option B, because Option A's failure mode, the decayed half-filed library, is <em>the exact problem Recall exists to solve.</em> Building the folder model would have rebuilt the disease inside the cure.",
          },
          {
            t: "decision",
            key: true,
            kicker: "The hardest cut",
            badges: ["02"],
            title: "The feature I wanted most was the one I had to cut",
            bodyHtml:
              'An AI retrieval feature sat on the v1 board from day one, and cutting it was the hardest call of the build. It was also the difference between <em>a shipped product and a demo.</em> The AI in Recall v1 lives in how the product was built, not in a claim printed on the product. Version one stands on fast capture and instant search, and smarter retrieval stays the trajectory rather than a promise the app can\'t keep yet. In a market where "AI-powered" has become wallpaper, restraint reads as trust.',
          },
        ],
      },
      {
        id: "states",
        label: "States",
        heading: "What happens when the app can't keep its promise?",
        blocks: [
          {
            t: "p",
            html: "Optimistic capture means the unhappy paths are where the real design work lives. Four states carry the product's promise:",
          },
          {
            t: "states",
            items: [
              ["empty", "Empty", "First run, nothing saved yet. I designed it as an <b>invitation</b>, one visible action instead of a blank void."],
              ["load", "Loading", "Capture in flight. Confirmation lands up front, and the background state only surfaces when it matters."],
              [
                "error",
                "Error",
                "A failed save or sync. The item is <b>never silently lost</b>. The UI holds it and offers a retry, because one dropped save would break the entire promise. This state got a disproportionate share of the design attention, on purpose.",
              ],
              ["ok", "Success", "Found. The retrieval moment the whole product exists for. Fast, unceremonious, done."],
            ],
          },
          {
            t: "figrow",
            items: [
              { kind: "img", ratio: "r43", captionHtml: "Fig 4.0 · Empty: the first-run invitation.", screen: { src: R("home-empty"), alt: "Recall first-run empty state inviting you to save your first item" } },
              { kind: "img", ratio: "r43", captionHtml: "Fig 4.1 · Loading: optimistic capture.", screen: { src: R("uploading"), alt: "Recall file uploading with progress bar" } },
              { kind: "img", ratio: "r43", captionHtml: "Fig 4.2 · Success: saved and ready to find.", screen: { src: R("saved"), alt: "Recall item saved confirmation" } },
            ],
          },
        ],
      },
      {
        id: "final",
        label: "Final Designs",
        heading: "No handoff, because there was no one to hand off to.",
        blocks: [
          {
            t: "p",
            html: "The build is the proof of the workflow. Designed in Figma, coded to production with Claude Code in seven weeks, with data-safety compliance, a privacy policy, and release assets ready for Play Store submission. <b>One person, production-grade output.</b>",
          },
          { t: "fig", kind: "vid", ratio: "r169", captionHtml: "Fig 5.0 · The full flow: capture all four formats, search, find.", video: "/images/recall/demo-landscape.mp4" },
        ],
      },
      {
        id: "retro",
        label: "Retrospective",
        heading: "What seven weeks alone taught me.",
        blocks: [
          {
            t: "banner",
            html: "A native app designed and built to production by one person in seven weeks, now heading to the Play Store.",
          },
          {
            t: "takes",
            items: [
              ["01", "Capture friction compounds", "Every field I removed at save time multiplied what actually got saved."],
              ["02", "Cut the feature, keep the promise", "Shipping a smaller honest product beat demoing a bigger speculative one. It wasn't close."],
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
      ["Offline-First PWA", "shipped"],
      ["Ages 1–5 · Toddler UX", "live"],
      ["Google Play Review", "concept"],
      ["Product Design & Build", "nda"],
    ],
    sub: "Play. Learn. Grow. — Designing an offline-first learning platform for toddlers & preschoolers (Ages 1–5).",
    githubUrl: "https://learnfun-lwfso4eq7-sabitubilikis-projects.vercel.app/",
    meta: [
      ["My Role", "Product Designer & Builder: Strategy, UX Architecture, Design System, Prototyping, Web Speech & Audio"],
      ["Target Users", "Toddlers & Preschoolers (Ages 1–5) and Parents / Educators"],
      ["Platform & Tech", "React 18 · TypeScript · Vite · Tailwind CSS · Web Speech API · Offline PWA & Android TWA"],
    ],
    next: "telehealth",
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
            t: "fig",
            kind: "vid",
            ratio: "r169",
            device: "chrome",
            video: "/images/learn-fun/learn-fun-case-study.mp4",
            screen: { src: "/images/learn-fun/video-frame.jpg", alt: "Learn Fun app walkthrough inside desktop Chrome browser mockup" },
            captionHtml: "Fig 0.1 · <b>Learn Fun application walkthrough</b> — Desktop browser experience showing lesson modules, phonics, and touch-first interactions.",
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
        id: "role",
        label: "My Role",
        heading: "Owned from concept through implementation.",
        blocks: [
          {
            t: "p",
            html: "I owned product design end to end, moving from initial concept through interactive prototypes to production implementation using an <b>AI-assisted workflow</b>.",
          },
          {
            t: "cards",
            items: [
              [
                "Strategy",
                "Product Direction & Architecture",
                "Defined core early learning scope, offline requirements, and developmental milestone targeting for ages 1–5.",
              ],
              [
                "Design",
                "UX, Interaction & Design System",
                "Crafted child-safe visual language, tablet-first layouts, color systems, and tactile audio-visual cues.",
              ],
              [
                "Build",
                "Frontend & Offline Implementation",
                "Shipped responsive web application, offline service worker caching, and Google Play release packaging.",
              ],
            ],
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
          { t: "tablet-canvas" },
        ],
      },
      {
        id: "principles",
        label: "Design Principles",
        heading: "Three rules that shaped every screen.",
        blocks: [
          {
            t: "principles",
            items: [
              [
                "01",
                "Learning should feel like play",
                "Activities needed to encourage exploration rather than feel like traditional lessons. Large visual elements, recognizable illustrations, simple interactions, and predictable patterns make the learning action obvious before any text could be read.",
              ],
              [
                "02",
                "Reduce cognitive load",
                "Young children have fewer mental models to rely on. Avoiding unnecessary choices and visual competition led to a strict rule: <b>One clear action → one clear response.</b> Navigation, activity selection, and learning interactions follow consistent patterns.",
              ],
              [
                "03",
                "Every visual element needs a job",
                "During testing, I discovered that some icons added decoration without improving understanding. If an element doesn't help a child understand, navigate, or learn, it doesn't belong on the screen. Removing decorative clutter proved far more impactful than adding decoration.",
              ],
            ],
          },
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
            t: "feedback-chain",
            feedback: {
              kicker: "User Feedback During Testing",
              quote: "We'd like phonics so our toddlers can hear the sounds the letters make, not just see the letter.",
            },
            decision: {
              kicker: "Product Decision",
              action: "Add letter-sound audio interactions to teach phonemes alongside alphabet recognition.",
            },
            before: {
              label: "Original Approach",
              title: "Visual Letter Recognition Only",
              desc: "Children tapped letters and saw the uppercase/lowercase alphabet, but had no auditory reinforcement.",
              items: [
                "Tap letter A",
                "Letter visual appears on screen",
                "No audio connection or phoneme sound",
              ],
            },
            after: {
              label: "Shipped Iteration",
              title: "Letter + Phonics Audio Association",
              desc: "Children interact with letters while hearing clear pronunciation, letter sounds, and playful word examples.",
              items: [
                "Tap letter A",
                "Hears /æ/ phonics audio",
                "Connects A → /æ/ → Apple",
              ],
            },
          },
          { t: "phonics-interactive" },
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
            t: "feedback-chain",
            feedback: {
              kicker: "Testing Observation",
              quote: "Children repeatedly tapped small decorative stars and border icons expecting an action, creating confusion.",
            },
            decision: {
              kicker: "Design Decision",
              action: "Remove all decorative icons. Every visual element on screen must be functional or educational.",
            },
            before: {
              label: "Before Testing",
              title: "Decorative Icons & Clutter",
              desc: "Interface included decorative background shapes and small accessory icons that added visual noise.",
              items: [
                "Extraneous background stars & icons",
                "Ambiguous clickable boundaries",
                "Competing visual focal points",
              ],
            },
            after: {
              label: "After Simplification",
              title: "Focused Learning Content",
              desc: "Removed decorative chrome. Visual hierarchy directs 100% of the child's focus to the primary learning action.",
              items: [
                "Zero decorative distractions",
                "Spacious 64px+ hit areas",
                "Unambiguous visual intent",
              ],
            },
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
            t: "states",
            items: [
              [
                "ok",
                "Offline PWA Launch",
                "App assets, sounds, and graphics are fully cached locally, launching instantly with zero network wait.",
              ],
              [
                "load",
                "Zero Buffering",
                "Preloaded audio phonemes ensure instantaneous voice feedback upon tapping, avoiding toddler frustration.",
              ],
              [
                "empty",
                "No Sign-In Walls",
                "Zero onboarding friction, zero tracking, and zero account requirements before a child can play.",
              ],
              [
                "ai",
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
        heading: "From design prototype to Google Play production access.",
        blocks: [
          {
            t: "p",
            html: "Learn Fun moved beyond a design prototype into a distributable product. From concept through UX architecture, UI design system, user testing, phonics iteration, and offline web implementation, the app reached full release readiness.",
          },
          {
            t: "banner",
            html: "<b>Production Status</b>: Learn Fun is live as an offline-first web experience at <a href='https://learnfun-lwfso4eq7-sabitubilikis-projects.vercel.app/' target='_blank' rel='noopener' style='color:#FF3B30;font-weight:700;text-decoration:underline'>learnfun-lwfso4eq7-sabitubilikis-projects.vercel.app</a> and is currently in <b>Google Play production-access review</b>.",
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
    next: "recall",
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
