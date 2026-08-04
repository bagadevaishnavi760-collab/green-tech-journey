import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, GraduationCap, Leaf } from "lucide-react";
import { SiteLayout, Section, Card } from "@/components/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Vaishnavi · E-Waste Portfolio" },
      {
        name: "description",
        content:
          "Get in touch with Vaishnavi about e-waste, sustainability and responsible technology at vaishnavi.bagade@vit.edu.in.",
      },
      { property: "og:title", content: "Contact Vaishnavi · E-Waste Portfolio" },
      {
        property: "og:description",
        content: "Let's talk about e-waste, recycling and greener campuses.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <div className="hero-bg">
        <Section eyebrow="✉️ Contact" title="Let's talk green tech 💚">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <p className="text-muted-foreground">
                Have an idea about recycling, a campus green initiative, or just
                want to swap sustainability tips? I&apos;d love to hear from you.
              </p>
              <a
                href="mailto:vaishnavi.bagade@vit.edu.in"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Mail className="size-4" /> vaishnavi.bagade@vit.edu.in
              </a>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <GraduationCap className="mt-0.5 size-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">Course</p>
                    <p className="text-sm text-muted-foreground">
                      B.Tech Information Technology
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">Subject</p>
                    <p className="text-sm text-muted-foreground">
                      E-Waste &amp; Environmental Management
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-secondary/50">
              <Leaf className="size-6 text-primary" />
              <p className="mt-4 font-display text-lg font-semibold">
                🌿 Every device deserves a responsible goodbye.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Reduce. Reuse. Repair. Recycle. Respect.
              </p>
            </Card>
          </div>
        </Section>
      </div>
    </SiteLayout>
  );
}
