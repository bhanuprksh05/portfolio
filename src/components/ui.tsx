import Image from "next/image";
import Link from "next/link";
import type { Screenshot } from "@/content";
import { site } from "@/content";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-semibold tracking-tight">
          {site.name}
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-text">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/#contact"
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-text hover:opacity-90"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {site.name}</p>
        <div className="flex gap-6">
          <a href={site.github} className="hover:text-text">
            GitHub
          </a>
          {site.linkedin && (
            <a href={site.linkedin} className="hover:text-text">
              LinkedIn
            </a>
          )}
          <a href={site.resume} className="hover:text-text">
            Résumé
          </a>
        </div>
      </div>
    </footer>
  );
}

export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted">
      {children}
    </span>
  );
}

export function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-text transition hover:opacity-90"
    >
      {children}
    </a>
  );
}

export function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium transition hover:border-accent"
    >
      {children}
    </a>
  );
}

// Grid of screenshots: with more than one, the first spans the full width.
export function Screenshots({ images }: { images: Screenshot[] }) {
  return (
    <div className={`grid gap-4 ${images.length > 1 ? "sm:grid-cols-2" : ""}`}>
      {images.map((img, j) => (
        <a
          key={img.src}
          href={img.src}
          target="_blank"
          rel="noopener"
          className={`group block ${j === 0 && images.length > 1 ? "sm:col-span-2" : ""}`}
        >
          <div className="overflow-hidden rounded-xl border border-border bg-surface-2">
            <Image
              src={img.src}
              alt={img.alt}
              width={1440}
              height={900}
              sizes="(min-width: 1152px) 1088px, 100vw"
              className={`w-full object-cover object-top transition duration-300 group-hover:scale-[1.02] ${
                j === 0 ? "aspect-[16/9]" : "aspect-[16/10]"
              }`}
            />
          </div>
          <p className="mt-2 text-xs text-muted">{img.caption}</p>
        </a>
      ))}
    </div>
  );
}
