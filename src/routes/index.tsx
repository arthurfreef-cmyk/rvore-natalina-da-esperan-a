import { createFileRoute } from "@tanstack/react-router";
import {
  Assembly, Demo, Details, Faq, FinalCta, Footer, Header, Hero, Occasions, Offer, TopBar, TrustBar,
} from "@/components/landing/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Árvore Natalina da Esperança — Black Friday R$ 97" },
      { name: "description", content: "A árvore de Natal para quem votou no Lula. De R$ 197 por R$ 97 na Black Friday, com frete grátis para todo o Brasil." },
      { property: "og:title", content: "Árvore Natalina da Esperança — R$ 97 com frete grátis" },
      { property: "og:description", content: "Black Friday: de R$ 197 por R$ 97 e frete grátis para todo o Brasil." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const FLAKES = Array.from({ length: 18 }, (_, i) => ({
  id: `f${i}`, left: (i * 37) % 100, dur: 10 + ((i * 7) % 10), delay: -((i * 3) % 12), size: 3 + (i % 3) * 2,
}));

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-hero font-sans text-foreground">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {FLAKES.map((f) => (
          <span key={f.id} className="absolute top-0 rounded-full bg-foreground/40 animate-snow"
            style={{ left: `${f.left}%`, width: f.size, height: f.size, animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s` }} />
        ))}
      </div>
      <TopBar />
      <Header />
      <main className="relative">
        <Hero /><TrustBar /><Demo /><Details /><Occasions /><Assembly /><Offer /><Faq /><FinalCta />
      </main>
      <Footer />
    </div>
  );
}
