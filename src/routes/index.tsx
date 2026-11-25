import { createFileRoute } from "@tanstack/react-router";

import productPhoto from "@/assets/arvore-natal-lula.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Árvore de Natal do Lula — Black Friday R$ 97" },
      {
        name: "description",
        content:
          "A árvore de Natal para quem votou no Lula. De R$ 197 por apenas R$ 97 na Black Friday.",
      },
      { property: "og:title", content: "Árvore de Natal do Lula — R$ 97" },
      {
        property: "og:description",
        content: "Black Friday: de R$ 197 por R$ 97. Enfeite seu Natal com orgulho.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const FLAKES = Array.from({ length: 30 }, (_, i) => ({
  id: `f${i}`,
  left: (i * 37) % 100,
  dur: 8 + ((i * 7) % 10),
  delay: -((i * 3) % 12),
  size: 4 + (i % 4) * 2,
}));

const BENEFITS = [
  {
    t: "Estrela no topo",
    d: "Estrela vermelha de cinco pontas com a sigla PT, do jeito que você reconhece.",
  },
  {
    t: "Três placas inclusas",
    d: '"Lula Presidente", "Democracia Sempre" e "Por um Brasil Melhor" já vêm na árvore.',
  },
  {
    t: "Enfeitada e pronta",
    d: "Laços vermelhos, bolas vermelhas e douradas, pinhas e pisca-pisca. É só montar.",
  },
];

const BUY = "#comprar";

function ProductPhoto({ className = "" }: { className?: string }) {
  return (
    <img
      src={productPhoto.url}
      alt="Árvore de Natal decorada com estrela vermelha com a sigla PT no topo, foto do presidente Lula no centro e três placas vermelhas com as frases Lula Presidente, Democracia Sempre e Por um Brasil Melhor"
      width={256}
      height={384}
      loading="eager"
      decoding="async"
      className={className}
    />
  );
}

function HeroPhoto() {
  return (
    <div className="relative mx-auto w-fit">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 scale-125 rounded-full bg-accent/20 blur-3xl"
      />
      <ProductPhoto className="w-64 drop-shadow-[0_25px_45px_rgba(0,0,0,0.55)] sm:w-72 md:w-80" />
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-border bg-card/90 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-accent backdrop-blur">
        Foto real do produto
      </span>
    </div>
  );
}

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-hero font-sans text-foreground">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {FLAKES.map((f) => (
          <span
            key={f.id}
            className="absolute top-0 rounded-full bg-foreground/70 animate-snow"
            style={{
              left: `${f.left}%`,
              width: f.size,
              height: f.size,
              animationDuration: `${f.dur}s`,
              animationDelay: `${f.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative bg-gold py-2 text-center text-sm font-bold uppercase tracking-widest text-accent-foreground">
        Black Friday · 50% OFF · Estoque limitado
      </div>

      <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        <div className="text-center md:text-left">
          <p className="mb-4 font-medium uppercase tracking-[0.3em] text-accent">Natal 2026</p>
          <h1 className="font-display text-5xl font-black leading-tight md:text-7xl">
            A Árvore de Natal de quem <span className="italic text-gold">fez o L</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Para quem votou no Lula e quer celebrar o Natal com esperança, união e muito orgulho.
          </p>
          <div className="mt-8 flex items-end justify-center gap-4 md:justify-start">
            <span className="text-xl text-muted-foreground line-through">R$ 197</span>
            <span className="font-display text-6xl font-black text-gold">R$ 97</span>
          </div>
          <a
            href={BUY}
            className="mt-8 inline-block rounded-full bg-primary px-10 py-4 text-lg font-bold text-primary-foreground shadow-glow transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-ring"
          >
            Quero minha árvore
          </a>
        </div>
        <HeroPhoto />
      </section>

      <section className="relative mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-3">
        {BENEFITS.map((b) => (
          <div key={b.t} className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur">
            <h2 className="font-display text-2xl font-bold text-accent">{b.t}</h2>
            <p className="mt-2 text-muted-foreground">{b.d}</p>
          </div>
        ))}
      </section>

      <section id="comprar" className="relative mx-auto max-w-3xl px-6 pb-24 text-center">
        <div className="rounded-3xl border border-border bg-card p-10 shadow-glow">
          <h2 className="font-display text-4xl font-black">Oferta de Black Friday</h2>
          <p className="mt-3 text-muted-foreground">
            De <s>R$ 197</s> por apenas
          </p>
          <p className="font-display text-7xl font-black text-gold">R$ 97</p>
          <ProductPhoto className="mx-auto mt-8 w-40 drop-shadow-[0_18px_30px_rgba(0,0,0,0.5)]" />
          <a
            href={BUY}
            className="mt-8 inline-block rounded-full bg-primary px-10 py-4 text-lg font-bold text-primary-foreground transition hover:scale-105"
          >
            Garantir com 50% OFF
          </a>
        </div>
      </section>

      <footer className="relative pb-8 text-center text-sm text-muted-foreground">
        © 2026 Árvore do L · Feliz Natal!
      </footer>
    </main>
  );
}
