import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, caseStudyOrder } from "@/lib/case-studies";
import CaseStudyNav from "@/components/CaseStudyNav";
import CaseStudyTOC from "@/components/CaseStudyTOC";
import CaseStudyScroll from "@/components/CaseStudyScroll";
import Block from "@/components/CaseStudyBlocks";

export function generateStaticParams() {
  return caseStudyOrder.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies[slug];
  if (!cs) return {};
  return {
    title: `${cs.title} — Bilikis Sabitu`,
    description: cs.sub,
    openGraph: {
      title: `${cs.title} — Bilikis Sabitu`,
      description: cs.sub,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = caseStudies[slug];
  if (!cs) notFound();

  const next = caseStudies[cs.next];

  return (
    <>
      <CaseStudyNav current={slug} />
      <div className="cs-shell">
        <aside className="cs-rail">
          <CaseStudyTOC sections={cs.sections.map((s) => ({ id: s.id, label: s.label }))} />
        </aside>
        <article className="cs-article">
          <div className="cs-kicker">
            {cs.tags.map(([label, cls]) => (
              <span key={label} className={`tag ${cls}`}>
                {label}
              </span>
            ))}
            {cs.githubUrl && (
              <a href={cs.githubUrl} target="_blank" rel="noopener" className="cs-cta-tag">
                {cs.githubUrl.includes("github.com") ? "View on GitHub" : "Visit Web App"} <span className="arw">→</span>
              </a>
            )}
            {cs.playStoreUrl && (
              <a href={cs.playStoreUrl} target="_blank" rel="noopener" className="cs-cta-tag cs-cta-tag--playstore">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginRight: 2 }}>
                  <path d="M3.609 1.814L13.793 12 3.61 22.186A2.43 2.43 0 0 1 3 20.47V3.53c0-.66.23-1.26.609-1.716zm11.605 11.607l2.25 2.25-12.06 6.89 9.81-9.14zm0-2.842l-9.81-9.14 12.06 6.89-2.25 2.25zm1.42 1.421l3.66 2.09c1.07.61 1.07 1.61 0 2.22l-3.66 2.09-2.03-2.03 2.03-2.37z" />
                </svg>
                Google Play <span className="arw">→</span>
              </a>
            )}
          </div>
          <h1>{cs.title}</h1>
          <p className="cs-sub">{cs.sub}</p>
          <div className="cs-meta">
            {cs.meta.map(([label, value]) => (
              <div key={label}>
                <span className="mono">{label}</span>
                <p>{value}</p>
              </div>
            ))}
          </div>

          {cs.heroBlock && (
            <div className="cs-hero-block">
              <Block block={cs.heroBlock} />
            </div>
          )}

          {cs.sections.map((section) => (
            <section className="cs-section" id={section.id} key={section.id}>
              <span className="mono sec-label">{section.label}</span>
              <h2>{section.heading}</h2>
              <div className="prose">
                {section.blocks.map((block, i) => (
                  <Block block={block} key={i} />
                ))}
              </div>
            </section>
          ))}

          <div className="cs-next">
            <Link href={`/work/${cs.next}`}>
              <span className="mono">Next case study</span>
              <h3>{next.title} →</h3>
            </Link>
          </div>
        </article>
      </div>
      <CaseStudyScroll />
    </>
  );
}
