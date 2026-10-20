import { createFileRoute } from "@tanstack/react-router";
import { EcoSortGame } from "@/components/EcoSortGame";

export const Route = createFileRoute("/eco-game")({
  head: () => ({
    meta: [
      { title: "EcoSort: E-Waste Challenge · E-Waste Portfolio" },
      {
        name: "description",
        content: "Learn how to sort e-waste responsibly with the EcoSort interactive challenge.",
      },
    ],
  }),
  component: EcoGamePage,
});

function EcoGamePage() {
  return <EcoSortGame />;
}
