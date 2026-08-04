import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, Section, Card } from "@/components/SiteLayout";
import devices from "@/assets/gallery-devices.jpg";
import campus from "@/assets/gallery-campus.jpg";
import seedling from "@/assets/gallery-seedling.jpg";
import recycle from "@/assets/gallery-recycle.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery · E-Waste Activities & Moments" },
      {
        name: "description",
        content:
          "A visual gallery of e-waste activities: old devices, campus collection boxes, recycling and green campus moments.",
      },
      { property: "og:title", content: "Gallery · E-Waste Portfolio" },
      {
        property: "og:description",
        content: "Photos from my e-waste and sustainability learning journey.",
      },
    ],
  }),
  component: GalleryPage,
});

const ITEMS = [
  {
    src: devices,
    title: "📱 Give gadgets a second life",
    caption: "Old phones, chargers and keyboards waiting for a responsible goodbye.",
  },
  {
    src: campus,
    title: "♻️ Smart collection on campus",
    caption: "My dream: drop-off boxes in every college, rewarding green habits.",
  },
  {
    src: seedling,
    title: "🌱 Green today. Better tomorrow.",
    caption: "Technology and nature can grow together when we choose carefully.",
  },
  {
    src: recycle,
    title: "🔬 Recovering what matters",
    caption: "Copper, silver and gold recovered instead of mined all over again.",
  },
];

function GalleryPage() {
  return (
    <SiteLayout>
      <div className="hero-bg">
        <Section eyebrow="🖼️ Gallery" title="Moments from my e-waste journey">
          <div className="grid gap-6 sm:grid-cols-2">
            {ITEMS.map((item) => (
              <Card key={item.title} className="overflow-hidden p-0">
                <img
                  src={item.src}
                  alt={item.caption}
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="h-60 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.caption}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      </div>

      <Section>
        <Card className="bg-secondary/50 text-center">
          <p className="font-display text-xl font-semibold sm:text-2xl">
            🌼 Recycle. Recharge. Repeat.
          </p>
        </Card>
      </Section>
    </SiteLayout>
  );
}
