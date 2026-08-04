import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Leaf,
  Menu,
  X,
  Home,
  User,
  BookOpen,
  FileText,
  Mail,
} from "lucide-react";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About", icon: User },
  { to: "/subject-overview", label: "Subject Overview", icon: BookOpen },
  { to: "/assignments", label: "Assignments", icon: FileText },
  { to: "/gallery", label: "Gallery", icon: ImageIcon },
  { to: "/contact", label: "Contact", icon: Mail },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground">
              <Leaf className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-bold">Vaishnavi</span>
              <span className="block text-xs text-muted-foreground">E-Waste Portfolio</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/70 p-1 lg:flex">
            {NAV.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact: to === "/" }}
                className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "bg-primary text-primary-foreground hover:text-primary-foreground" }}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            className="grid size-10 place-items-center rounded-2xl border border-border bg-card lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {open && (
          <nav className="border-t border-border/60 bg-card px-5 py-3 lg:hidden">
            {NAV.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact: to === "/" }}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted-foreground"
                activeProps={{ className: "bg-secondary text-secondary-foreground" }}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main>{children}</main>

      <footer className="mt-24 border-t border-border/60 bg-secondary/40">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-10 text-center">
          <span className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <Leaf className="size-5" />
          </span>
          <p className="font-display text-lg font-semibold">
            🌱 Green today. Better tomorrow.
          </p>
          <p className="max-w-md text-sm text-muted-foreground">
            E-Waste &amp; Environmental Management E-Portfolio · Vaishnavi ·
            B.Tech Information Technology
          </p>
          <a
            href="mailto:vaishnavi.bagade@vit.edu.in"
            className="text-sm font-medium text-primary hover:underline"
          >
            vaishnavi.bagade@vit.edu.in
          </a>
        </div>
      </footer>
    </div>
  );
}

export function Section({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-6xl px-5 py-14 ${className}`}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
      )}
      <div className={eyebrow || title ? "mt-8" : ""}>{children}</div>
    </section>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-border/70 bg-card p-6 shadow-soft ${className}`}
    >
      {children}
    </div>
  );
}
