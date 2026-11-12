import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/case-studies";
import { ScrollToTop } from "@/components/scroll-to-top";
import { projects, site } from "@/content";
import {
  Chip,
  PrimaryButton,
  Screenshots,
  SecondaryButton,
  SiteFooter,
  SiteHeader,
} from "@/components/ui";

// Only projects that have a case study get a page, in the same order as the home page.
const studies = projects.filter((p) => p.slug in caseStudies);

export function generateStaticParams() {
  return studies.map((p) => ({ slug: p.slug }));
}

function find(slug: string) {
  const project = studies.find((p) => p.slug === slug);
  return project && { project, study: caseStudies[slug] };
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = find(slug);
  if (!found) return {};
  return {
    title: `${found.project.title} — case study · ${site.name}`,
    description: found.project.summary,
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border py-10 first:border-t-0 sm:py-12">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-5 space-y-4 leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const found = find(slug);
  if (!found) notFound();
  const { project, study } = found;

  const index = studies.indexOf(project);
  const next = studies[(index + 1) % studies.length];

  return (
    <>
      <ScrollToTop trigger={slug} />
      <SiteHeader />

      <main className="flex-1">
        <article className="mx-auto w-full max-w-3xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
          <Link href="/#work" className="text-sm text-muted hover:text-text">
            ← All work
          </Link>

          <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Case study · {project.tag}
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{project.summary}</p>

          <dl className="mt-10 grid gap-6 rounded-2xl border border-border bg-surface p-6 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">Role</dt>
              <dd className="mt-1 text-sm">{study.role}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">Timeline</dt>
              <dd className="mt-1 text-sm">{study.period}</dd>
            </div>
            {study.context && (
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted">Client</dt>
                <dd className="mt-1 text-sm">{study.context}</dd>
              </div>
            )}
            {project.link && (
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted">Live</dt>
                <dd className="mt-1 text-sm">
                  <a href={project.link.href} className="text-accent hover:underline">
                    {project.link.label} ↗
                  </a>
                </dd>
              </div>
            )}
            <div className="sm:col-span-2">
              <dt className="text-xs uppercase tracking-wider text-muted">Stack</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </dd>
            </div>
          </dl>

          {project.images && (
            <div className="mt-10">
              <Screenshots images={project.images.slice(0, 1)} />
            </div>
          )}

          <div className="mt-6">
            <Block title="Overview">
              {study.overview.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </Block>

            <Block title="The challenge">
              {study.challenge.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </Block>

            {study.sections.map((section) => (
              <Block key={section.heading} title={section.heading}>
                {section.body.map((t) => (
                  <p key={t}>{t}</p>
                ))}
                {section.bullets && <Bullets items={section.bullets} />}
              </Block>
            ))}

            {project.images && project.images.length > 1 && (
              <Block title="Screenshots">
                <Screenshots images={project.images.slice(1)} />
              </Block>
            )}

            <section className="mt-4 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl bg-accent-soft p-6">
                <h2 className="text-lg font-semibold">Results</h2>
                <div className="mt-4 text-sm leading-relaxed text-muted">
                  <Bullets items={study.outcomes} />
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h2 className="text-lg font-semibold">What I learned</h2>
                <div className="mt-4 text-sm leading-relaxed text-muted">
                  <Bullets items={study.learnings} />
                </div>
              </div>
            </section>
          </div>

          <div className="mt-16 flex flex-col gap-6 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
            <Link href={`/work/${next.slug}`} className="group">
              <span className="text-xs uppercase tracking-wider text-muted">Next case study</span>
              <span className="mt-1 block text-xl font-semibold group-hover:text-accent">
                {next.title} →
              </span>
            </Link>
            <div className="flex flex-wrap gap-3">
              <PrimaryButton href={`mailto:${site.email}`}>Get in touch</PrimaryButton>
              <SecondaryButton href={site.resume}>Résumé</SecondaryButton>
            </div>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
