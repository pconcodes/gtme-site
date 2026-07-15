import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border-soft">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="font-mono text-[10px] uppercase tracking-widest text-text-faint">
          <span>Portfolio — GTM systems</span>
        </div>

        <div className="mt-4 flex items-center gap-2.5">
          <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true">
            <line x1="10" y1="0" x2="10" y2="20" stroke="var(--color-accent)" strokeWidth="1" />
            <line x1="0" y1="10" x2="20" y2="10" stroke="var(--color-accent)" strokeWidth="1" />
            <circle cx="10" cy="10" r="6" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
          </svg>
          <span className="font-medium text-text">Peter Conley — GTM Engineer</span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6 border-t border-border-soft pt-6 sm:grid-cols-3">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-text-faint">Sheets</p>
            <div className="mt-2 flex flex-col gap-1.5 text-sm text-text-muted">
              <Link href="/case-studies" className="transition-colors hover:text-text">
                Case study
              </Link>
              <Link href="/contact" className="transition-colors hover:text-text">
                Contact
              </Link>
            </div>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-text-faint">Socials</p>
            <div className="mt-2 flex flex-col gap-1.5 text-sm text-text-muted">
              <a
                href="https://www.linkedin.com/in/peter-conley/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-text"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/pconcodes"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-text"
              >
                GitHub
              </a>
            </div>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-text-faint">Built with</p>
            <div className="mt-2 text-sm text-text-muted">
              <p className="text-text-faint">Next.js · Vercel</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
