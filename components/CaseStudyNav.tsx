import Image from "next/image";
import Link from "next/link";
import { caseStudyOrder, caseStudies } from "@/lib/case-studies";

export default function CaseStudyNav({ current }: { current: string }) {
  return (
    <nav className="cs-nav">
      <div className="cs-nav-in">
        <Link className="brand" href="/" aria-label="Bilikis Sabitu, home">
          <Image src="/images/brand/profile.png" alt="Bilikis Sabitu" width={36} height={36} className="brand-avatar" />
          <span className="cs-nav-sep">/ case studies</span>
        </Link>
        <div className="cs-proj-nav">
          {caseStudyOrder.map((slug) => (
            <Link
              key={slug}
              href={`/work/${slug}`}
              className={slug === current ? "on" : ""}
              aria-current={slug === current ? "page" : undefined}
            >
              {caseStudies[slug].nav}
            </Link>
          ))}
        </div>
        <Link className="cs-back" href="/">
          ← Portfolio
        </Link>
      </div>
    </nav>
  );
}
