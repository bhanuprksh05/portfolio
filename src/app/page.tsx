import {
  availability,
  education,
  experience,
  hero,
  projects,
  site,
  skills,
} from "@/content";
import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/case-studies";
import type { Project } from "@/content";
import {
  Chip,
  PrimaryButton,
  Screenshots,
  SecondaryButton,
  SiteFooter,
  SiteHeader,
} from "@/components/ui";

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <div className="mt-12">{children}</div>
    </section>
  );
}

const workProjects = projects.filter((p) => p.kind === "work");
const personalProjects = projects.filter((p) => p.kind === "personal");

function ProjectLinks({ project }: { project: Project }) {
  const hasCaseStudy = project.slug in caseStudies;
  if (!hasCaseStudy && !project.link) return null;
  return (
    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
      {hasCaseStudy && (
        <Link href={`/work/${project.slug}`} className="text-accent hover:underline">
          Read case study →
        </Link>
      )}
      {project.link && (
        <a href={project.link.href} className="text-muted hover:text-text">
          {project.link.label} ↗
        </a>
      )}
    </div>
  );
}

function CompactProjectCard({ project: p }: { project: Project }) {
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-surface p-6 transition hover:border-accent sm:p-8">
      <p className="font-mono text-xs text-muted">{p.tag}</p>
      <h4 className="mt-2 text-xl font-semibold tracking-tight">{p.title}</h4>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{p.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {p.stack.slice(0, 5).map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
      <ProjectLinks project={p} />
    </article>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article className="grid gap-8 rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <p className="font-mono text-xs text-muted">{p.tag}</p>
        <h4 className="mt-2 text-2xl font-semibold tracking-tight">{p.title}</h4>
        <p className="mt-3 leading-relaxed text-muted">{p.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.stack.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
        <ProjectLinks project={p} />
      </div>
      <div className="rounded-xl bg-surface-2 p-5 sm:p-6">
        <p className="text-sm font-medium">The problem</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{p.problem}</p>
        <p className="mt-5 text-sm font-medium">What I built</p>
        <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              {h}
            </li>
          ))}
        </ul>
      </div>
      {p.images && (
        <details className="group/shots lg:col-span-2">
          <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-2 text-sm font-medium transition hover:border-accent">
            <svg
              className="h-4 w-4 text-accent transition-transform group-open/shots:rotate-180"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
            <span className="group-open/shots:hidden">View screenshots ({p.images.length})</span>
            <span className="hidden group-open/shots:inline">Hide screenshots</span>
          </summary>
          <div className="mt-5">
            <Screenshots images={p.images} />
          </div>
        </details>
      )}
    </article>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="mx-auto w-full max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
          <div className="flex flex-col gap-10 lg:flex-row-reverse lg:items-center lg:justify-between">
            <div className="relative w-28 shrink-0 sm:w-36 lg:mr-3 lg:w-80">
              <div className="absolute -inset-3 -z-10 hidden rounded-[2rem] bg-accent-soft lg:block" aria-hidden />
              <Image
                src="/portrait.jpg"
                alt={`Portrait of ${site.name}`}
                width={720}
                height={900}
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 320px, 144px"
                className="aspect-square rounded-full border border-border object-cover object-top lg:aspect-[4/5] lg:rounded-3xl"
              />
            </div>
            <div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
                {hero.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{hero.subtitle}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <PrimaryButton href="#work">See my work</PrimaryButton>
                <SecondaryButton href={site.resume}>Download résumé</SecondaryButton>
              </div>
            </div>
          </div>
        </section>

        {/* Work */}
        <Section id="work" eyebrow="Selected work" title="Products I've built, at work and on my own.">
          <h3 className="text-sm font-medium text-muted">Professional work · Dhwani RIS</h3>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {workProjects.map((p) => (
              <CompactProjectCard key={p.slug} project={p} />
            ))}
          </div>

          <h3 className="mt-16 text-sm font-medium text-muted">Personal projects</h3>
          <div className="mt-5 space-y-6">
            {personalProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Section>

        {/* Experience + skills */}
        <div className="border-y border-border bg-surface">
          <Section id="experience" eyebrow="Experience" title="Two years shipping production software.">
            <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
              <ol className="space-y-10 border-l border-border pl-6">
                {experience.map((job) => (
                  <li key={job.period} className="relative">
                    <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
                    <p className="font-mono text-xs text-muted">{job.period}</p>
                    <h3 className="mt-1 text-lg font-semibold">
                      {job.role} · {job.company}
                    </h3>
                    <div className="mt-4 space-y-4">
                      {job.items.map((item) => (
                        <div key={item.name}>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
                <li className="relative">
                  <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border border-accent bg-bg" aria-hidden />
                  <p className="text-sm text-muted">{education}</p>
                </li>
              </ol>

              <div className="space-y-8">
                {skills.map((s) => (
                  <div key={s.group}>
                    <p className="text-sm font-medium">{s.group}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {s.items.map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                    </div>
                  </div>
                ))}
                <a href={site.resume} className="inline-block text-sm font-medium text-accent hover:underline">
                  Download résumé (PDF) →
                </a>
              </div>
            </div>
          </Section>
        </div>

        {/* Open to work + contact */}
        <Section id="contact" eyebrow="Open to work" title="Hiring, or have a project in mind?">
          <div className="grid gap-5 md:grid-cols-2">
            {availability.map((a) => (
              <article key={a.title} className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
                <h3 className="flex items-center gap-2 text-xl font-semibold">
                  <span className="h-2 w-2 rounded-full bg-good" aria-hidden />
                  {a.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{a.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {a.points.map((pt) => (
                    <Chip key={pt}>{pt}</Chip>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-6 rounded-2xl bg-accent-soft p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
            <p className="max-w-xl leading-relaxed">
              The fastest way to reach me is email. I usually reply within a day.
            </p>
            <div className="flex flex-wrap gap-3">
              <PrimaryButton href={`mailto:${site.email}`}>{site.email}</PrimaryButton>
              <SecondaryButton href={site.resume}>Résumé (PDF)</SecondaryButton>
            </div>
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
