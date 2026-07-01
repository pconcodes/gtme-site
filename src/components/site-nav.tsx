import Link from "next/link";

const navLinks = [
  { href: "/#experience", label: "Experience" },
  { href: "/#build", label: "What I build" },
  { href: "/#skills", label: "Skills" },
  { href: "/case-studies", label: "Case study" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-[#08080a]/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-white"
        >
          <span className="inline-block h-4 w-4 rounded-full bg-red-500" />
          Peter Conley
        </Link>
        <ul className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition-colors hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500"
        >
          Get in touch
        </Link>
      </nav>
    </header>
  );
}
