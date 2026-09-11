export type StateKey = "empty" | "load" | "error" | "ai" | "ok";
export type Device = "mobile" | "web" | "tablet";
export type Screen = { src: string; alt: string };

/** Card-summary data for the homepage Work grid. Full narrative content lives in lib/case-studies.ts. */
export interface Project {
  id: string;
  title: string;
  domain: string;
  line: string;
  /** Real screens for the work-card thumbnail, framed in a matching device. */
  thumb?: { device: Device; screens: Screen[] };
}

export const projects: Project[] = [
  {
    id: "recall",
    title: "Recall",
    domain: "Consumer · Knowledge",
    line: "A personal knowledge app that unifies the screenshots, links, notes, and files people scatter everywhere.",
    thumb: {
      device: "mobile",
      screens: [
        { src: "/images/recall/collection-detail.png", alt: "Recall collection detail — saved items in a collection, with bottom navigation" },
        { src: "/images/recall/collections.png", alt: "Recall collections — organise saved items into searchable groups, with bottom navigation" },
        { src: "/images/recall/home-empty.png", alt: "Recall first-run empty state — save your first item, with bottom navigation" },
      ],
    },
  },
  {
    id: "learn-fun",
    title: "Learn Fun",
    domain: "EdTech · Tablet-First · Ages 1–5",
    line: "An offline-first early learning app designed for toddlers and preschoolers (ages 1–5), from concept through Google Play release preparation.",
    thumb: {
      device: "tablet",
      screens: [
        { src: "/images/learn-fun/tablet-home.png", alt: "Learn Fun tablet home screen with foundational learning categories" },
      ],
    },
  },
  {
    id: "telehealth",
    title: "AI Telehealth Platform",
    domain: "Healthtech · 0→1 · Confidential",
    line: "A 0→1 AI-native telehealth platform serving four user roles across web and mobile.",
    thumb: {
      device: "mobile",
      screens: [
        { src: "/images/telehealth/home.png", alt: "Telehealth patient home screen" },
        { src: "/images/telehealth/symptom-check.png", alt: "Telehealth AI symptom-check chat" },
        { src: "/images/telehealth/appointment.png", alt: "Telehealth appointment booking screen" },
      ],
    },
  },
  {
    id: "climapt",
    title: "Climapt",
    domain: "Climate · Agritech",
    line: "An AI climate-resilience platform that helps farmers see climate risk before it happens.",
    thumb: {
      device: "mobile",
      screens: [
        { src: "/images/climapt/home.png", alt: "Climapt home screen" },
        { src: "/images/climapt/risk-map.png", alt: "Climapt climate risk map" },
        { src: "/images/climapt/ai-chat.png", alt: "Climapt AI assistant chat" },
      ],
    },
  },
  {
    id: "earthquake",
    title: "Earthquake Crisis Response",
    domain: "Crisis · Fundraising · Real client",
    line: "A crisis-response fundraising site built during the Turkish–Syrian earthquake.",
    thumb: {
      device: "web",
      screens: [{ src: "/images/earthquake/home.png", alt: "Earthquake fundraising site homepage" }],
    },
  },
];
