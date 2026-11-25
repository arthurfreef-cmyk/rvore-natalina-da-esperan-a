import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, LockKeyhole, MapPin, PackageCheck, ShieldCheck, Truck, Wallet } from "lucide-react";
import { ProductPhoto } from "@/components/landing/ui";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Finalizar pedido — Árvore Natalina da Esperança" },
      { name: "description", content: "Finalize seu pedido com segurança. Frete grátis para todo o Brasil." },
    ],
  }),
  component: CheckoutPage,
});

type Address = {
  cep: string; street: string; number: string; complement: string;
  neighborhood: string; city: string; state: string;
};
type Customer = { name: string; email: string; cpf: string; phone: string };

const inputClass = "mt-2 w-full rounded-xl border border-border bg-background/70 px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/20";
const labelClass = "block text-sm font-semibold text-foreground";

function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState<Customer>({ name: "", email: "", cpf: "", phone: "" });
  const [address, setAddress] = useState<Address>({ cep: "", street: "", number: "", complement: "", neighborhood: "", city: "", state: "" });
  const [loadingCep, setLoadingCep] = useState(false);
  const [cepMessage, setCepMessage] = useState("");
  const [payment, setPayment] = useState("pix");

  const updateCustomer = (field: keyof Customer, value: string) => setCustomer((current) => ({ ...current, [field]: value }));
  const updateAddress = (field: keyof Address, value: string) => setAddress((current) => ({ ...current, [field]: value }));

  async function lookupCep() {
    const cep = address.cep.replace(/\D/g, "");
    if (cep.length !== 8) {
      setCepMessage(cep.length ? "Digite um CEP válido com 8 números." : "");
      return;
    }
    setLoadingCep(true);
    setCepMessage("");
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) throw new Error("Falha ao consultar CEP");
      const data = await response.json();
      if (data.erro) {
        setCepMessage("CEP não encontrado. Confira os números ou preencha o endereço manualmente.");
      } else {
        setAddress((current) => ({
          ...current,
          street: data.logradouro || current.street,
          neighborhood: data.bairro || current.neighborhood,
          city: data.localidade || current.city,
          state: data.uf || current.state,
        }));
        setCepMessage("Endereço localizado. Confira e complete o número.");
      }
    } catch {
      setCepMessage("Não foi possível consultar agora. Você pode preencher o endereço manualmente.");
    } finally {
      setLoadingCep(false);
    }
  }

  function handleNext(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStep((current) => Math.min(3, current + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-hero px-4 py-6 text-foreground sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between gap-4">
          <Link to="/" className="font-display text-lg font-bold sm:text-xl">Árvore Natalina <span className="text-accent">da Esperança</span></Link>
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground sm:text-sm"><LockKeyhole className="size-4 text-accent" /> Ambiente de checkout</span>
        </header>

        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">Quase lá!</p>
          <h1 className="mt-2 font-display text-3xl font-black sm:text-4xl">Finalize seu pedido</h1>
          <p className="mt-2 text-sm text-muted-foreground">Preencha seus dados em poucos passos.</p>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-2 sm:mx-auto sm:max-w-2xl sm:gap-4">
          {[
            { n: 1, title: "Informações", icon: CheckCircle2 },
            { n: 2, title: "Entrega", icon: MapPin },
            { n: 3, title: "Pagamento", icon: Wallet },
          ].map((item) => (
            <div key={item.n} className={`flex items-center gap-2 border-b-2 px-1 pb-3 sm:gap-3 sm:px-3 ${step >= item.n ? "border-accent text-foreground" : "border-border text-muted-foreground"}`}>
              <span className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold ${step >= item.n ? "bg-accent text-accent-foreground" : "bg-card text-muted-foreground"}`}>
                {step > item.n ? <Check className="size-4" /> : item.n}
              </span>
              <span className="text-xs font-bold sm:text-sm">{item.title}</span>
            </div>
          ))}
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="rounded-3xl border border-border bg-card/80 p-5 shadow-2xl backdrop-blur sm:p-8">
            {step === 1 && (
              <form onSubmit={handleNext}>
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-accent">Etapa 1 de 3</p>
                  <h2 className="mt-2 font-display text-2xl font-bold">Suas informações</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Informe os dados de quem receberá o pedido.</p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className={`${labelClass} sm:col-span-2`}>Nome completo
                    <input className={inputClass} autoComplete="name" required value={customer.name} onChange={(e) => updateCustomer("name", e.target.value)} placeholder="Como está no seu documento" />
                  </label>
                  <label className={labelClass}>E-mail
                    <input className={inputClass} type="email" autoComplete="email" required value={customer.email} onChange={(e) => updateCustomer("email", e.target.value)} placeholder="voce@email.com" />
                  </label>
                  <label className={labelClass}>CPF
                    <input className={inputClass} inputMode="numeric" autoComplete="off" required value={customer.cpf} onChange={(e) => updateCustomer("cpf", e.target.value)} placeholder="000.000.000-00" />
                  </label>
                  <label className={`${labelClass} sm:col-span-2`}>Celular / WhatsApp
                    <input className={inputClass} type="tel" autoComplete="tel" required value={customer.phone} onChange={(e) => updateCustomer("phone", e.target.value)} placeholder="(00) 00000-0000" />
                  </label>
                </div>
                <button type="submit" className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-bold text-primary-foreground shadow-lg transition hover:brightness-110">Continuar para entrega <ArrowRight className="size-5" /></button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleNext}>
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-accent">Etapa 2 de 3</p>
                  <h2 className="mt-2 font-display text-2xl font-bold">Endereço de entrega</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Digite seu CEP para preencher o endereço automaticamente.</p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className={`${labelClass} sm:col-span-2`}>CEP
                    <div className="flex gap-2">
                      <input className={inputClass} inputMode="numeric" autoComplete="postal-code" required maxLength={9} value={address.cep} onChange={(e) => updateAddress("cep", e.target.value.replace(/[^0-9-]/g, ""))} onBlur={lookupCep} placeholder="00000-000" />
                      <button type="button" onClick={lookupCep} disabled={loadingCep} className="mt-2 shrink-0 rounded-xl border border-accent/50 px-4 text-sm font-bold text-accent transition hover:bg-accent/10 disabled:opacity-50">{loadingCep ? "Buscando…" : "Buscar"}</button>
                    </div>
                    {cepMessage && <span className="mt-2 block text-xs text-muted-foreground" role="status">{cepMessage}</span>}
                  </label>
                  <label className={`${labelClass} sm:col-span-2`}>Rua / Avenida
                    <input className={inputClass} autoComplete="address-line1" required value={address.street} onChange={(e) => updateAddress("street", e.target.value)} placeholder="Nome da rua" />
                  </label>
                  <label className={labelClass}>Número
                    <input className={inputClass} required autoComplete="address-line2" value={address.number} onChange={(e) => updateAddress("number", e.target.value)} placeholder="Nº" />
                  </label>
                  <label className={labelClass}>Complemento <span className="font-normal text-muted-foreground">(opcional)</span>
                    <input className={inputClass} value={address.complement} onChange={(e) => updateAddress("complement", e.target.value)} placeholder="Apto, bloco, casa..." />
                  </label>
                  <label className={labelClass}>Bairro
                    <input className={inputClass} required autoComplete="address-level3" value={address.neighborhood} onChange={(e) => updateAddress("neighborhood", e.target.value)} placeholder="Seu bairro" />
                  </label>
                  <label className={labelClass}>Cidade
                    <input className={inputClass} required autoComplete="address-level2" value={address.city} onChange={(e) => updateAddress("city", e.target.value)} placeholder="Sua cidade" />
                  </label>
                  <label className={labelClass}>Estado (UF)
                    <input className={inputClass} required maxLength={2} autoComplete="address-level1" value={address.state} onChange={(e) => updateAddress("state", e.target.value.toUpperCase())} placeholder="UF" />
                  </label>
                </div>
                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">
                  <button type="button" onClick={() => setStep(1)} className="flex items-center justify-center gap-2 rounded-full border border-border px-6 py-4 font-bold transition hover:bg-secondary"><ArrowLeft className="size-4" /> Voltar</button>
                  <button type="submit" className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-bold text-primary-foreground shadow-lg transition hover:brightness-110">Continuar para pagamento <ArrowRight className="size-5" /></button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-accent">Etapa 3 de 3</p>
                <h2 className="mt-2 font-display text-2xl font-bold">Forma de pagamento</h2>
                <p className="mt-1 text-sm text-muted-foreground">Escolha como deseja pagar seu pedido.</p>
                <button type="button" onClick={() => setPayment("pix")} className={`mt-6 flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition ${payment === "pix" ? "border-accent bg-accent/10" : "border-border bg-background/40"}`}>
                  <span className="grid size-12 place-items-center rounded-xl bg-accent/15 text-accent"><Wallet className="size-6" /></span>
                  <span className="flex-1"><strong className="block">PIX</strong><span className="mt-1 block text-sm text-muted-foreground">Pagamento instantâneo</span></span>
                  <span className={`size-5 rounded-full border-2 ${payment === "pix" ? "border-accent bg-accent ring-4 ring-accent/15" : "border-muted-foreground"}`} />
                </button>
                <div className="mt-5 rounded-2xl border border-accent/30 bg-accent/5 p-4 text-sm">
                  <div className="flex gap-3"><ShieldCheck className="size-5 shrink-0 text-accent" /><p><strong>Pagamento protegido</strong><br /><span className="text-muted-foreground">A geração do QR Code e do código PIX será habilitada após conectar o provedor de pagamento à API do site. Nenhum pagamento será simulado nesta etapa.</span></p></div>
                </div>
                <div className="mt-6 rounded-2xl bg-background/50 p-4 text-sm">
                  <p className="font-bold">Dados do pedido</p>
                  <p className="mt-2 text-muted-foreground">{customer.name} · {customer.email}</p>
                  <p className="text-muted-foreground">{address.street}, {address.number}{address.complement ? ` · ${address.complement}` : ""} — {address.neighborhood}, {address.city}/{address.state}, CEP {address.cep}</p>
                </div>
                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">
                  <button type="button" onClick={() => setStep(2)} className="flex items-center justify-center gap-2 rounded-full border border-border px-6 py-4 font-bold transition hover:bg-secondary"><ArrowLeft className="size-4" /> Voltar</button>
                  <button type="button" disabled className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-full bg-primary/50 px-6 py-4 font-bold text-primary-foreground opacity-70" title="Conecte uma API PIX para habilitar">PIX em configuração <LockKeyhole className="size-4" /></button>
                </div>
                <p className="mt-3 text-center text-xs text-muted-foreground">Para ativar a cobrança real, conecte as credenciais do seu provedor PIX no servidor.</p>
              </div>
            )}
          </section>

          <aside className="rounded-3xl border border-border bg-card/80 p-5 shadow-xl backdrop-blur sm:p-6 lg:sticky lg:top-6">
            <h2 className="font-display text-xl font-bold">Resumo do pedido</h2>
            <div className="mt-5 flex items-center gap-4">
              <div className="grid size-24 shrink-0 place-items-center overflow-hidden rounded-2xl bg-background/60 p-2"><ProductPhoto className="h-full w-auto object-contain" /></div>
              <div className="min-w-0"><p className="font-bold leading-snug">Árvore Natalina da Esperança</p><p className="mt-1 text-xs text-muted-foreground">Edição especial · 1 unidade</p><p className="mt-2 text-sm text-muted-foreground line-through">R$ 197,00</p><p className="font-display text-2xl font-black text-gold">R$ 97,00</p></div>
            </div>
            <div className="my-5 space-y-3 border-y border-border py-4 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>R$ 97,00</span></div>
              <div className="flex justify-between"><span className="inline-flex items-center gap-2 text-muted-foreground"><Truck className="size-4" /> Frete</span><span className="font-bold text-accent">Grátis</span></div>
            </div>
            <div className="flex items-center justify-between"><span className="font-bold">Total</span><strong className="font-display text-3xl text-gold">R$ 97,00</strong></div>
            <div className="mt-5 space-y-3 text-xs text-muted-foreground">
              <p className="flex items-center gap-2"><PackageCheck className="size-4 text-accent" /> Frete grátis para todo o Brasil</p>
              <p className="flex items-center gap-2"><LockKeyhole className="size-4 text-accent" /> Seus dados são usados para processar o pedido</p>
              <p className="flex items-center gap-2"><ShieldCheck className="size-4 text-accent" /> Pagamento PIX após integração da API</p>
            </div>
            <Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"><ArrowLeft className="size-4" /> Voltar à página do produto</Link>
          </aside>
        </div>
        <footer className="mt-8 text-center text-xs text-muted-foreground">© 2026 Árvore Natalina da Esperança · Compra segura</footer>
      </div>
    </div>
  );
}
