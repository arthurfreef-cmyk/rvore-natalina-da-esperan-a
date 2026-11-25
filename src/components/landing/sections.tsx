import { Check, ChevronDown, Gift, Home, Lock, Star, Truck, Users } from "lucide-react";
import { Cta, NAV, Price, ProductPhoto, SectionHead } from "./ui";

export function TopBar() {
  return (
    <div className="bg-gold px-4 py-2 text-center text-xs font-bold uppercase tracking-widest text-accent-foreground sm:text-sm">
      <Truck aria-hidden className="mr-2 inline size-4 align-[-3px]" />
      Frete grátis para todo o Brasil · Black Friday de R$ 197 por R$ 97
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <a href="#inicio" className="font-display text-lg font-bold focus-visible:outline-2 focus-visible:outline-ring">
          Árvore Natalina <span className="text-accent">da Esperança</span>
        </a>
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex gap-7 text-sm text-muted-foreground">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Cta size="sm">Comprar</Cta>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section id="inicio" className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 pb-16 pt-10 text-center md:pb-24 md:pt-14">
      <div className="mx-auto max-w-3xl">
        <p className="inline-block rounded-full border border-border bg-card/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          Edição Natal 2026 · Black Friday
        </p>
        <h1 className="mt-6 font-display text-4xl font-black leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
          O Natal de quem <span className="italic text-gold">fez o L</span> merece uma árvore à altura
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          A Árvore Natalina da Esperança, para quem votou no Lula celebrar as festas com esperança, união e orgulho.
        </p>
        <div className="mt-7 flex justify-center"><Price /></div>
      </div>
      <figure className="relative">
        <div aria-hidden className="absolute inset-0 -z-10 scale-125 rounded-full bg-accent/20 blur-3xl" />
        <div className="rounded-[2rem] border border-border bg-card/50 p-5 backdrop-blur sm:p-6">
          <ProductPhoto className="w-56 sm:w-64 md:w-72" />
        </div>
        <figcaption className="mt-4 text-xs font-semibold uppercase tracking-widest text-accent">
          Demonstração real da árvore
        </figcaption>
      </figure>
      <div>
        <div className="flex justify-center">
          <Cta>Quero minha árvore</Cta>
        </div>
        <p className="mt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Truck aria-hidden className="size-4 text-accent" /> Frete grátis para todo o Brasil
        </p>
      </div>
    </section>
  );
}

const TRUST = [
  { icon: Truck, t: "Frete grátis", d: "Para todo o Brasil" },
  { icon: Lock, t: "Compra segura", d: "Pedido direto pela página oficial" },
  { icon: Gift, t: "Black Friday", d: "De R$ 197 por R$ 97" },
] as const;

export function TrustBar() {
  return (
    <section aria-label="Vantagens da compra" className="border-y border-border bg-card/60">
      <ul className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:grid-cols-3">
        {TRUST.map(({ icon: Icon, t, d }) => (
          <li key={t} className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-secondary text-accent">
              <Icon aria-hidden className="size-5" />
            </span>
            <div>
              <p className="font-bold">{t}</p>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

const HIGHLIGHTS = [
  "Estrela vermelha com a sigla PT no topo",
  "Foto do presidente Lula no centro",
  "Placas “Lula Presidente”, “Democracia Sempre” e “Por um Brasil Melhor”",
  "Laços vermelhos, bolas vermelhas e douradas, pinhas e luzes",
];

export function Demo() {
  return (
    <section id="demonstracao" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <SectionHead eyebrow="Demonstração real da árvore" title="Veja como ela fica" text="Imagem de demonstração do produto, com a decoração que acompanha a árvore." />
      <div className="mt-12 grid items-center gap-10 rounded-[2rem] border border-border bg-wine p-6 sm:p-10 md:grid-cols-2">
        <figure className="mx-auto">
          <ProductPhoto className="w-60 rounded-2xl sm:w-72" />
          <figcaption className="mt-3 text-center text-xs uppercase tracking-widest text-accent">
            Demonstração real da árvore
          </figcaption>
        </figure>
        <ul className="space-y-4">
          {HIGHLIGHTS.map((h) => (
            <li key={h} className="flex gap-3 text-base sm:text-lg">
              <Check aria-hidden className="mt-1 size-5 shrink-0 text-accent" /> {h}
            </li>
          ))}
          <li className="pt-4"><Cta>Quero essa árvore</Cta></li>
        </ul>
      </div>
    </section>
  );
}

const DETAILS = [
  { t: "Estrela PT", d: "Estrela vermelha de cinco pontas com a sigla PT coroando a árvore." },
  { t: "Três placas", d: "“Lula Presidente”, “Democracia Sempre” e “Por um Brasil Melhor”." },
  { t: "Enfeites clássicos", d: "Laços vermelhos, bolas vermelhas e douradas, pinhas e pisca-pisca." },
];

export function Details() {
  return (
    <section id="detalhes" className="mx-auto max-w-6xl px-5 pb-20 md:pb-28">
      <SectionHead eyebrow="Detalhes" title="Cada enfeite com significado" />
      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {DETAILS.map((d) => (
          <li key={d.t} className="rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:border-accent/60">
            <Star aria-hidden className="size-6 text-primary" />
            <h3 className="mt-4 font-display text-2xl font-bold">{d.t}</h3>
            <p className="mt-2 text-muted-foreground">{d.d}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const OCCASIONS = [
  { icon: Home, t: "Na sua casa", d: "Para ser o centro da decoração de Natal da família." },
  { icon: Users, t: "Na ceia", d: "Um tema de conversa para reunir quem compartilha a mesma esperança." },
  { icon: Gift, t: "Para presentear", d: "Uma ideia de presente para amigos e familiares que fizeram o L." },
];

export function Occasions() {
  return (
    <section className="bg-card/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead eyebrow="Ocasiões" title="Feita para celebrar junto" />
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {OCCASIONS.map(({ icon: Icon, t, d }) => (
            <li key={t} className="text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary text-primary-foreground"><Icon aria-hidden className="size-6" /></span>
              <h3 className="mt-5 font-display text-xl font-bold">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const STEPS = [
  { t: "Faça seu pedido", d: "Toque em comprar e garanta o preço de Black Friday." },
  { t: "Receba com frete grátis", d: "Entrega para todo o Brasil sem custo de frete." },
  { t: "Monte e decore", d: "Posicione a estrela, as placas e os enfeites como na demonstração." },
];

export function Assembly() {
  return (
    <section id="montagem" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <SectionHead eyebrow="Como funciona" title="Do pedido à sua sala" text="Use a demonstração como referência para posicionar os enfeites." />
      <ol className="mt-12 grid gap-5 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <li key={s.t} className="relative rounded-2xl border border-border bg-card p-7">
            <span className="font-display text-5xl font-black text-gold">{i + 1}</span>
            <h3 className="mt-3 text-lg font-bold">{s.t}</h3>
            <p className="mt-2 text-muted-foreground">{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Offer() {
  return (
    <section id="comprar" className="mx-auto max-w-4xl px-5 pb-20 md:pb-28">
      <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] border border-accent/50 bg-wine p-8 shadow-glow sm:p-12 md:grid-cols-[auto_1fr]">
        <ProductPhoto className="mx-auto w-40 sm:w-48" />
        <div className="text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Oferta de Black Friday</p>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">Árvore Natalina da Esperança</h2>
          <div className="mt-5 flex justify-center md:justify-start"><Price big /></div>
          <ul className="mt-5 space-y-2 text-sm">
            {["Frete grátis para todo o Brasil", "Estrela, placas e enfeites como na demonstração", "Compra segura pela página oficial"].map((b) => (
              <li key={b} className="flex items-center justify-center gap-2 md:justify-start"><Check aria-hidden className="size-4 text-accent" />{b}</li>
            ))}
          </ul>
          <Cta className="mt-7 w-full sm:w-auto">Garantir por R$ 97</Cta>
        </div>
      </div>
    </section>
  );
}

const FAQ = [
  { q: "O que vem com a árvore?", a: "A árvore com a decoração mostrada na demonstração: estrela com a sigla PT, foto do presidente Lula, as três placas e os enfeites." },
  { q: "O frete é grátis mesmo?", a: "Sim. Nesta promoção, o frete é grátis para todo o Brasil." },
  { q: "Qual é o preço?", a: "Na Black Friday, a árvore sai de R$ 197 por R$ 97." },
  { q: "Qual o prazo de entrega?", a: "O prazo depende da sua região e é informado no momento do pedido." },
  { q: "Como faço para comprar?", a: "Toque em qualquer botão de compra da página para ir até a oferta e seguir com o pedido." },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 pb-20 md:pb-28">
      <SectionHead eyebrow="Dúvidas frequentes" title="Perguntas e respostas" />
      <div className="mt-10 space-y-3">
        {FAQ.map((f) => (
          <details key={f.q} className="group rounded-2xl border border-border bg-card px-6 py-5 open:border-accent/50">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold focus-visible:outline-2 focus-visible:outline-ring">
              {f.q}
              <ChevronDown aria-hidden className="size-5 shrink-0 text-accent transition group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="border-t border-border bg-card/60 px-5 py-20 text-center">
      <h2 className="mx-auto max-w-2xl font-display text-3xl font-black sm:text-5xl">
        Leve a esperança para o seu <span className="italic text-gold">Natal</span>
      </h2>
      <p className="mt-4 text-muted-foreground">De R$ 197 por R$ 97 · Frete grátis para todo o Brasil</p>
      <Cta className="mt-8">Quero minha árvore</Cta>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-sm text-muted-foreground md:flex-row">
        <p className="font-display text-base text-foreground">Árvore Natalina <span className="text-accent">da Esperança</span></p>
        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap justify-center gap-5">
            {NAV.map((n) => (<li key={n.href}><a href={n.href} className="hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring">{n.label}</a></li>))}
            <li><a href="#comprar" className="hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring">Comprar</a></li>
          </ul>
        </nav>
        <p>© 2026 · Feliz Natal!</p>
      </div>
    </footer>
  );
}
