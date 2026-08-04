import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, Section, Card } from "@/components/SiteLayout";

export const Route = createFileRoute("/subject-overview")({
  head: () => ({
    meta: [
      { title: "Subject Overview · E-Waste & Environmental Management" },
      {
        name: "description",
        content:
          "Why e-waste matters and my week-by-week learning journey through the E-Waste & Environmental Management course.",
      },
      { property: "og:title", content: "Subject Overview · E-Waste Portfolio" },
      {
        property: "og:description",
        content: "Why e-waste matters and my week-by-week learning journey.",
      },
    ],
  }),
  component: SubjectPage,
});

const WEEKS = [
  ["Week 1 🌱", "Understanding what e-waste really is."],
  ["Week 2 ♻️", "Learning how improper disposal affects nature."],
  ["Week 3 🔬", "Exploring recycling methods and recovery of precious metals."],
  ["Week 4 📚", "Understanding India's E-Waste Management Rules and EPR."],
  ["Week 5 💡", "Thinking about innovative solutions for a sustainable future."],
];

function SubjectPage() {
  return (
    <SiteLayout>
      <div className="hero-bg">
        <Section eyebrow="🌍 Why E-Waste Matters" title="Every device tells a story">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2 space-y-4 text-muted-foreground">
              <p>
                Every phone, laptop, charger, or battery we throw away tells a
                story.
              </p>
              <p>
                Inside these devices are valuable materials like gold, silver, and
                copper—but also harmful substances that can damage our soil,
                water, and air if disposed of carelessly.
              </p>
              <p>
                Learning about e-waste has shown me that technology and
                sustainability should grow together.
              </p>
            </Card>
            <Card className="bg-secondary/50">
              <h3 className="text-lg font-bold">Subject at a glance</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>📘 E-Waste &amp; Environmental Management</li>
                <li>🎓 B.Tech Information Technology</li>
                <li>♻️ Focus: circular economy &amp; safe disposal</li>
                <li>📜 India&apos;s E-Waste Rules &amp; EPR</li>
              </ul>
            </Card>
          </div>
        </Section>
      </div>

      <Section eyebrow="📱 My Learning Journey" title="Five weeks, five shifts in thinking">
        <div className="space-y-4">
          {WEEKS.map(([w, d]) => (
            <Card key={w} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
              <p className="min-w-32 font-display text-lg font-bold text-primary">
                {w}
              </p>
              <p className="text-muted-foreground">{d}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <Card className="bg-secondary/50 text-center">
          <p className="font-display text-xl font-semibold sm:text-2xl">
            ♻️ Technology with responsibility.
          </p>
        </Card>
      </Section>
    </SiteLayout>
  );
}
