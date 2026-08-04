import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, Recycle, Sparkles, ArrowDown } from "lucide-react";
import { SiteLayout, Section, Card } from "@/components/SiteLayout";
import photo from "@/assets/vaishnavi.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vaishnavi · E-Waste & Environmental Management E-Portfolio" },
      {
        name: "description",
        content:
          "IT student, sustainability learner and earth enthusiast. Explore my e-waste journey, green habits, pledge and coursework.",
      },
      { property: "og:title", content: "Vaishnavi · E-Waste E-Portfolio" },
      {
        property: "og:description",
        content:
          "One recycled gadget may seem small, but millions of small actions create a greener future.",
      },
    ],
  }),
  component: HomePage,
});

const CAPTIONS = [
  "🌱 Green today. Better tomorrow.",
  "💻 Less waste, more future.",
  "📱 Give gadgets a second life.",
  "🌎 Tiny choices. Huge impact.",
  "♻️ Technology with responsibility.",
  "🌼 Recycle. Recharge. Repeat.",
  "💚 Kind to gadgets. Kinder to Earth.",
  "✨ Sustainability never goes out of style.",
  "🌿 Every device deserves a responsible goodbye.",
  "🌸 Think green before you upgrade.",
];

const FUN_FACTS = [
  "📱 Over 5 billion mobile phones are estimated to be unused worldwide.",
  "♻️ Recycling one million laptops can save enough energy to power thousands of homes.",
  "💚 Most electronic devices contain valuable metals that can be recovered instead of mined again.",
  "🌎 Every recycled device helps reduce pollution and conserve natural resources.",
];

function HomePage() {
  return (
    <SiteLayout>
      <div className="hero-bg">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-16 pb-10 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-secondary-foreground">
              <Sparkles className="size-3.5" /> Academic E-Portfolio
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-6xl">
              Hey, I&apos;m <span className="text-gradient-leaf">Vaishnavi</span>{" "}
              👋💚
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              IT Student • Sustainability Learner • Earth Enthusiast
            </p>
            <blockquote className="mt-6 border-l-4 border-primary pl-4 text-base italic text-foreground/90 sm:text-lg">
              &ldquo;One recycled gadget may seem small, but millions of small
              actions create a greener future.&rdquo; 🌎✨
            </blockquote>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Leaf className="size-4" /> Explore Portfolio
              </Link>
              <Link
                to="/assignments"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent"
              >
                <Recycle className="size-4" /> Upload Assignments
              </Link>
            </div>
            <p className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
              <ArrowDown className="size-4 animate-bounce" /> Scroll to explore my
              E-Waste journey ♻️
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-primary/10 blur-2xl" />
            <img
              src={photo}
              alt="Vaishnavi sitting on grass, smiling"
              width={528}
              height={646}
              fetchPriority="high"
              className="relative w-full rounded-[2rem] border border-border/70 object-cover shadow-soft"
            />
            <div className="relative -mt-6 ml-4 inline-flex items-center gap-2 rounded-2xl border border-border/70 bg-card px-4 py-2 text-sm font-medium shadow-soft">
              🌿 Think green before you upgrade
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-5 pb-10">
          <Card className="grid gap-6 sm:grid-cols-4">
            {[
              ["Student Name", "Vaishnavi"],
              ["Department", "B.Tech IT"],
              ["Subject", "E-Waste & Env. Mgmt"],
              ["Academic Year", "2026 - Present"],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-[0.7rem] uppercase tracking-[0.15em] text-muted-foreground">
                  {k}
                </p>
                <p className="mt-1 font-display font-semibold">{v}</p>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <Section eyebrow="🌱 About Me" title="Technology should help the planet, not harm it">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <p className="text-muted-foreground">
              Hi! I&apos;m an Information Technology student who believes
              technology should make our lives better—not harm our planet.
            </p>
            <p className="mt-4 text-muted-foreground">
              This portfolio represents my journey of learning about electronic
              waste, sustainability, and responsible technology use. Through this
              course, I&apos;ve realized that protecting the environment
              isn&apos;t about making huge changes overnight; it&apos;s about
              making smarter choices every day.
            </p>
            <p className="mt-4 text-muted-foreground">
              When I&apos;m not learning about technology, I&apos;m always
              curious about ways innovation can solve real-world environmental
              problems.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-block text-sm font-semibold text-primary hover:underline"
            >
              Read my full story →
            </Link>
          </Card>
          <Card className="bg-secondary/50">
            <h3 className="text-xl font-bold">💚 My Sustainability Promise</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              I promise to think before I upgrade. I will reduce unnecessary
              electronic purchases, repair devices whenever possible, and recycle
              e-waste responsibly.
            </p>
            <p className="mt-3 text-sm font-medium">
              Small habits. Big impact. Green future. 🌿
            </p>
            <p className="mt-4 text-sm italic text-muted-foreground">
              ✍️ Signed with love for our planet.
            </p>
          </Card>
        </div>
      </Section>

      <Section eyebrow="🌸 Fun Facts" title="E-waste in numbers">
        <div className="grid gap-4 sm:grid-cols-2">
          {FUN_FACTS.map((f) => (
            <Card key={f} className="text-sm text-muted-foreground">
              {f}
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="🌸 Cute Captions" title="Little reminders I live by">
        <div className="flex flex-wrap gap-3">
          {CAPTIONS.map((c) => (
            <span
              key={c}
              className="rounded-full border border-border/70 bg-card px-4 py-2 text-sm shadow-soft"
            >
              {c}
            </span>
          ))}
        </div>
      </Section>

      <Section>
        <Card className="bg-secondary/50 text-center">
          <p className="font-display text-2xl font-semibold sm:text-3xl">
            &ldquo;The Earth is not inherited from our ancestors; it is borrowed
            from our future.&rdquo; 🌎
          </p>
          <p className="mt-3 text-sm text-muted-foreground">🌻 My favorite quote</p>
        </Card>
      </Section>
    </SiteLayout>
  );
}
