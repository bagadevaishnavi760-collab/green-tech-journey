import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, Section, Card } from "@/components/SiteLayout";
import photo from "@/assets/vaishnavi.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Vaishnavi · E-Waste Portfolio" },
      {
        name: "description",
        content:
          "An IT student's story of learning sustainability, green habits, mission and a personal e-waste pledge.",
      },
      { property: "og:title", content: "About Vaishnavi · E-Waste Portfolio" },
      {
        property: "og:description",
        content: "Green habits, my mission and my sustainability promise.",
      },
    ],
  }),
  component: AboutPage,
});

const HABITS = [
  "I keep using my electronics until they truly need replacement.",
  "I avoid unnecessary upgrades.",
  "I store old chargers and batteries safely.",
  "I support responsible recycling.",
  "I encourage friends and family to recycle electronics.",
];

const MISSION = [
  "Reduce waste.",
  "Reuse wisely.",
  "Repair first.",
  "Recycle responsibly.",
  "Respect our planet.",
];

function AboutPage() {
  return (
    <SiteLayout>
      <div className="hero-bg">
        <Section eyebrow="🌱 About Me" title="Hi, I'm Vaishnavi 💚">
          <div className="grid items-start gap-8 lg:grid-cols-[.8fr_1.2fr]">
            <img
              src={photo}
              alt="Vaishnavi, IT student and sustainability learner"
              className="w-full rounded-[2rem] border border-border/70 object-cover shadow-soft"
            />
            <div className="space-y-4 text-muted-foreground">
              <p>
                Hi! I&apos;m an Information Technology student who believes
                technology should make our lives better—not harm our planet.
              </p>
              <p>
                This portfolio represents my journey of learning about electronic
                waste, sustainability, and responsible technology use. Through
                this course, I&apos;ve realized that protecting the environment
                isn&apos;t about making huge changes overnight; it&apos;s about
                making smarter choices every day.
              </p>
              <p>
                When I&apos;m not learning about technology, I&apos;m always
                curious about ways innovation can solve real-world environmental
                problems.
              </p>
              <Card className="bg-secondary/50 text-foreground">
                <h3 className="text-lg font-bold">💚 My Sustainability Promise</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  I promise to think before I upgrade. I will reduce unnecessary
                  electronic purchases, repair devices whenever possible, and
                  recycle e-waste responsibly. I believe every gadget has a
                  lifecycle, and it&apos;s my responsibility to ensure it ends in
                  the right place—not in a landfill.
                </p>
                <p className="mt-3 text-sm font-medium">
                  Small habits. Big impact. Green future. 🌿
                </p>
                <p className="mt-2 text-sm italic text-muted-foreground">
                  ✍️ Signed with love for our planet.
                </p>
              </Card>
            </div>
          </div>
        </Section>
      </div>

      <Section eyebrow="🌼 My Green Habits" title="Everyday choices that add up">
        <div className="grid gap-4 sm:grid-cols-2">
          {HABITS.map((h) => (
            <Card key={h} className="flex gap-3 text-sm text-muted-foreground">
              <span>✔️</span>
              <span>{h}</span>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="🎯 My Mission" title="Five words I keep coming back to">
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {MISSION.map((m, i) => (
            <Card key={m} className="text-center">
              <p className="font-display text-3xl font-bold text-primary/70">
                0{i + 1}
              </p>
              <p className="mt-2 font-medium">{m}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="💡 If I Could Change One Thing..." title="Smart E-Waste Collection Boxes on campus">
        <Card className="bg-secondary/50">
          <p className="text-muted-foreground">
            I would install Smart E-Waste Collection Boxes in every college.
            Students could drop old chargers, earphones, keyboards, batteries, and
            phones anytime. In return, they could earn reward points or
            certificates for contributing to a greener campus.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {["Simple.", "Accessible.", "Impactful."].map((t) => (
              <span
                key={t}
                className="rounded-full bg-card px-5 py-2 font-display font-semibold shadow-soft"
              >
                {t}
              </span>
            ))}
          </div>
        </Card>
      </Section>

      <Section eyebrow="🌈 What This Course Taught Me" title="From bins to a lifestyle">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="text-sm text-muted-foreground">
            Before this course, I thought recycling meant throwing waste into
            different bins.
          </Card>
          <Card className="text-sm text-muted-foreground">
            Now I understand that electronic waste requires proper handling,
            responsible recycling, and informed choices.
          </Card>
          <Card className="text-sm text-muted-foreground">
            I&apos;ve learned that sustainability isn&apos;t just a concept—it&apos;s
            a lifestyle that starts with everyday decisions.
          </Card>
        </div>
      </Section>
    </SiteLayout>
  );
}
