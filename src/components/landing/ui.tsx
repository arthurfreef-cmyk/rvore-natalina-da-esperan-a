import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import productPhoto from "@/assets/arvore-natal-lula.webp.asset.json";

export const BUY = "/checkout";

export const NAV = [
  { href: "#demonstracao", label: "Demonstração" },
  { href: "#detalhes", label: "Detalhes" },
  { href: "#montagem", label: "Montagem" },
  { href: "#faq", label: "Dúvidas" },
] as const;

interface CtaProps extends ComponentProps<"a"> {
  size?: "sm" | "lg";
}

/** Botão de compra padrão: direciona para o checkout dedicado. */
export function Cta({ size = "lg", className, children, ...rest }: CtaProps) {
  return (
    <a
      href={BUY}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-primary font-bold text-primary-foreground shadow-lg transition duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        size === "lg" ? "px-8 py-4 text-base sm:text-lg" : "px-5 py-2.5 text-sm",
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}

export function ProductPhoto({ className }: { className?: string }) {
  return (
    <img
      src={productPhoto.url}
      alt="Árvore de Natal decorada com estrela vermelha com a sigla PT no topo, foto do presidente Lula no centro e três placas vermelhas com as frases Lula Presidente, Democracia Sempre e Por um Brasil Melhor"
      width={256}
      height={384}
      decoding="async"
      className={className}
    />
  );
}

interface SectionHeadProps {
  eyebrow: string;
  title: ReactNode;
  text?: string;
}

export function SectionHead({ eyebrow, title, text }: SectionHeadProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {text && <p className="mt-4 text-base text-muted-foreground sm:text-lg">{text}</p>}
    </div>
  );
}

export function Price({ big = false }: { big?: boolean }) {
  return (
    <div className="flex flex-wrap items-end justify-center gap-x-3 whitespace-nowrap">
      <span className="pb-1 text-lg text-muted-foreground">
        de <s>R$ 197</s> por
      </span>
      <span className={cn("font-display font-black text-gold", big ? "text-6xl sm:text-7xl" : "text-6xl")}>
        R$ 97
      </span>
    </div>
  );
}
