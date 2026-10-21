import { useState, type ReactNode } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X, Sprout, Sun, Recycle, UsersRound, MapPin, Mail, Phone } from 'lucide-react';
import './_group.css';

const navItems = [
  { label: 'About us', href: '/about-us' },
  { label: 'Programmes', href: '/programmes' },
  { label: 'Our people', href: '/board-leadership' },
  { label: 'SDG impact', href: '/sdgs-impact' },
  { label: 'Partners', href: '/partners' },
  { label: 'News & stories', href: '/news-updates' },
];

function Brand({ light = false }: { light?: boolean }) {
  return <a href="/" className={`flex items-center gap-3 ${light ? 'text-[#f5f0e5]' : 'text-[#183c2c]'}`} aria-label="Nova Green Economy Foundation home" data-testid="link-home">
    <span className={`grid h-10 w-10 place-items-center rounded-full ${light ? 'bg-[#f5f0e5] text-[#214b37]' : 'bg-[#214b37] text-[#f6f1e6]'}`}><span className="font-editorial text-[1.6rem] leading-none">N</span></span>
    <span className="leading-[1.05]"><span className="block text-[.68rem] font-bold tracking-[.13em]">NOVA</span><span className="mt-1 block text-[.53rem] font-semibold tracking-[.13em]">GREEN ECONOMY<br/>FOUNDATION</span></span>
  </a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const path = '/';
  return <header className="relative z-40 border-b border-[#d9d4c7] bg-[#f5f2e9]">
    <div className="mx-auto flex min-h-[82px] max-w-[1440px] items-center justify-between px-5 md:px-10 xl:px-[4.5rem]">
      <Brand />
      <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
        {navItems.map(item => <a key={item.href} href={item.href} aria-current={path === item.href ? 'page' : undefined} className="nav-link text-[.78rem] font-medium text-[#3b5146] transition-colors hover:text-[#c0784d]" data-testid={`link-nav-${item.href.slice(1)}`}>{item.label}</a>)}
      </nav>
      <a href="/contact-us" className="hidden items-center gap-2 rounded-full bg-[#214b37] px-5 py-3 text-[.75rem] font-semibold text-[#f8f3e9] transition hover:bg-[#315f48] md:flex" data-testid="link-header-contact">Let’s talk <ArrowUpRight size={15}/></a>
      <button className="grid h-11 w-11 place-items-center rounded-full border border-[#d9d4c7] text-[#214b37] lg:hidden" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)} data-testid="button-mobile-menu">{open ? <X/> : <Menu/>}</button>
    </div>
    {open && <nav className="absolute left-0 right-0 top-full border-b border-[#d9d4c7] bg-[#f5f2e9] px-6 pb-6 pt-2 shadow-lg lg:hidden" aria-label="Mobile navigation">{navItems.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex border-t border-[#ded9cc] py-4 text-sm text-[#214b37]">{item.label}<ArrowUpRight className="ml-auto" size={17}/></a>)}<a href="/contact-us" onClick={() => setOpen(false)} className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#214b37] px-5 py-3 text-sm text-[#f8f3e9]">Contact us <ArrowRight size={15}/></a></nav>}
  </header>;
}

function Footer() {
  return <footer className="bg-[#183c2c] text-[#f5f0e5]">
    <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 md:grid-cols-[1.2fr_.8fr_1fr] md:px-10 xl:px-[4.5rem]">
      <div><Brand light/><p className="mt-6 max-w-sm text-sm leading-7 text-[#d1d8cd]">A fair green economy starts with the people who know their communities best.</p><p className="mt-7 eyebrow text-[#d9aa74]">Rooted in Uganda. Connected to possibility.</p></div>
      <div><p className="eyebrow text-[#d9aa74]">Explore</p><div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 text-sm text-[#e2e4da]">{navItems.map(item => <a key={item.href} href={item.href} className="transition hover:text-[#e8bd8d]">{item.label}</a>)}</div></div>
      <div><p className="eyebrow text-[#d9aa74]">Find us</p><div className="mt-5 space-y-4 text-sm text-[#e2e4da]"><p className="flex gap-3"><MapPin size={17} className="shrink-0 text-[#d9aa74]"/> Kampala, Uganda</p><p className="flex gap-3"><Mail size={17} className="shrink-0 text-[#d9aa74]"/> hello@novagreenfoundation.org</p><p className="flex gap-3"><Phone size={17} className="shrink-0 text-[#d9aa74]"/> +256 (0) 200 000 000</p></div></div>
    </div>
    <div className="border-t border-white/15"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-3 px-6 py-5 text-[.68rem] text-[#c3cec4] sm:flex-row md:px-10 xl:px-[4.5rem]"><span>© {new Date().getFullYear()} Nova Green Economy Foundation</span><span>Demo website · Impact figures and contact details are placeholders</span></div></div>
  </footer>;
}

function ButtonLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return <a href={href} className={`group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold transition ${light ? 'bg-[#f4f0e5] text-[#214b37] hover:bg-white' : 'bg-[#214b37] text-[#f8f3e9] hover:bg-[#315f48]'}`}>{children}<ArrowRight className="transition-transform group-hover:translate-x-1" size={16}/></a>;
}

function ImageBand({ title, label }: { title: string; label: string }) {
  return <section className="relative mx-5 overflow-hidden rounded-[1.5rem] bg-[#214b37] md:mx-10">
    <div className="hero-image absolute inset-0 bg-cover bg-center opacity-75"/>
    <div className="relative mx-auto flex min-h-[350px] max-w-[1440px] flex-col justify-center px-7 py-16 md:min-h-[410px] md:px-16">
      <p className="eyebrow text-[#e8bd8d]">{label}</p><h2 className="font-editorial mt-5 max-w-3xl text-4xl leading-[1.08] text-[#fffaf0] md:text-6xl">{title}</h2>
    </div>
  </section>;
}

function Metric({ value, label }: { value: string; label: string }) {
  return <div data-scroll-reveal className="border-l border-[#d8d2c4] pl-5"><p className="font-editorial text-4xl text-[#214b37] md:text-5xl">{value}</p><p className="mt-3 max-w-[12rem] text-sm leading-6 text-[#5f6d60]">{label}</p></div>;
}

function Home() {
  return <main className="page-enter">
    <section className="hero-image relative mx-4 mt-4 min-h-[610px] overflow-hidden rounded-[1.5rem] bg-cover bg-[center_46%] sm:mx-6 md:mx-10 md:min-h-[690px]">
      <div className="absolute inset-0 bg-gradient-to-t from-[#132c22]/45 via-transparent to-transparent"/>
      <div className="relative mx-auto flex min-h-[610px] max-w-[1440px] flex-col justify-end px-7 pb-12 pt-24 md:min-h-[690px] md:px-16 md:pb-16">
        <div className="max-w-[780px] reveal">
          <p className="eyebrow mb-6 text-[#e8bd8d]">A Uganda-rooted foundation</p>
          <h1 className="font-editorial text-[3.65rem] leading-[.96] tracking-[-.035em] text-[#fffaf0] sm:text-6xl md:text-[5.9rem]">A greener future.<br/><em className="font-normal">Built together.</em></h1>
          <p className="mt-7 max-w-[570px] text-base leading-7 text-[#f2f1e8] md:text-lg md:leading-8">We work alongside communities to grow livelihoods, unlock clean energy and make climate action fair for all.</p>
          <div className="mt-9 flex flex-wrap items-center gap-4"><ButtonLink href="/programmes" light>Explore our work</ButtonLink><a href="/about-us" className="group inline-flex items-center gap-2 rounded-full border border-white/50 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/10">Meet Nova <ArrowUpRight size={15}/></a></div>
        </div>
        <div className="mt-14 flex items-end justify-between border-t border-white/30 pt-5 text-xs text-white/85"><span>COMMUNITY FIRST · CLIMATE READY</span><a href="#intro" className="flex items-center gap-2 hover:text-white">Scroll to explore <ArrowDown size={14}/></a></div>
      </div>
      <div className="glass-panel absolute right-8 top-8 hidden max-w-[220px] rounded-2xl p-5 text-[#214b37] shadow-xl md:block"><Sprout size={20}/><p className="font-editorial mt-3 text-xl leading-tight">The green economy belongs to everyone.</p></div>
    </section>
    <section id="intro" className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 md:grid-cols-[.9fr_1.1fr] md:px-10 md:py-28 xl:px-[4.5rem]">
      <div><p className="eyebrow text-[#b46f49]">Our point of view</p><h2 className="font-editorial mt-5 text-4xl leading-[1.06] text-[#214b37] md:text-6xl">Opportunity should grow where people are.</h2></div>
      <div className="pt-1 md:pt-10"><p className="max-w-2xl text-lg leading-8 text-[#526257]">Across Uganda, people are already building solutions for a changing climate. We bring resources, practical skills and trusted partnerships closer to that work—so local ideas can become lasting opportunity.</p><a href="/about-us" className="mt-7 inline-flex items-center gap-3 border-b border-[#c0784d] pb-2 text-sm font-semibold text-[#214b37]">How we work <ArrowUpRight size={16}/></a></div>
    </section>
    <section className="bg-[#e9e5d9] py-16 md:py-20"><div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-[4.5rem]"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow text-[#b46f49]">Where we focus</p><h2 className="font-editorial mt-4 text-4xl text-[#214b37] md:text-5xl">Four connected pathways</h2></div><p className="max-w-md text-sm leading-6 text-[#637065]">We invest in the everyday systems that help families thrive and communities adapt.</p></div>
      <div className="mt-11 grid gap-px overflow-hidden rounded-2xl bg-[#c9c8b9] md:grid-cols-2 xl:grid-cols-4">
        {[{icon:Sprout,n:'01',title:'Resilient livelihoods',copy:'Practical training, climate-smart agriculture and stronger local value chains.'},{icon:Recycle,n:'02',title:'Circular enterprise',copy:'Turning local materials and ingenuity into meaningful work and less waste.'},{icon:Sun,n:'03',title:'Clean energy',copy:'Making reliable, affordable energy part of everyday opportunity.'},{icon:UsersRound,n:'04',title:'Inclusive climate action',copy:'Putting women, young people and local voices in the decisions that shape change.'}].map(item=><article key={item.n} className="group bg-[#f5f2e9] p-7 transition-colors hover:bg-[#f8f6ef] md:p-8"><div className="flex items-center justify-between"><item.icon size={23} strokeWidth={1.5} className="text-[#b46f49]"/><span className="font-mono text-xs text-[#899287]">{item.n}</span></div><h3 className="font-editorial mt-12 text-2xl text-[#214b37]">{item.title}</h3><p className="mt-3 min-h-[72px] text-sm leading-6 text-[#627064]">{item.copy}</p><a href="/programmes" aria-label={`Explore ${item.title}`} className="mt-6 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#c9c8b9] text-[#214b37] transition group-hover:bg-[#214b37] group-hover:text-white"><ArrowUpRight size={16}/></a></article>)}
      </div></div></section>
    <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-20 md:grid-cols-2 md:px-10 md:py-28 xl:px-[4.5rem]">
      <div className="relative min-h-[390px] overflow-hidden rounded-[1.25rem] bg-[#d6d5c4]"><div className="hero-image absolute inset-0 bg-cover bg-center"/><div className="image-tint absolute inset-0"/><div className="absolute bottom-6 left-6 max-w-xs text-sm leading-6 text-white">Community knowledge is not a starting point. It is the foundation.</div></div>
      <div className="md:pl-8"><p className="eyebrow text-[#b46f49]">The work, in perspective</p><h2 className="font-editorial mt-5 text-4xl leading-tight text-[#214b37] md:text-5xl">Small shifts can change the shape of a future.</h2><p className="mt-5 max-w-xl leading-7 text-[#5e6b60]">Our programmes are designed with communities, not simply delivered to them. The figures below are illustrative placeholders for the foundation’s first public impact report.</p><div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-9"><Metric value="1,240+" label="people reached through skills and enterprise support"/><Metric value="18" label="community groups shaping local climate action"/><Metric value="62%" label="of programme participants are women and girls"/><Metric value="7" label="districts with active community partnerships"/></div><a href="/sdgs-impact" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-[#214b37]">See our impact approach <ArrowRight size={16}/></a></div>
    </section>
    <ImageBand label="The way forward" title="A fairer economy is possible. Let’s build it together."/>
    <section className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-7 px-6 py-16 md:flex-row md:items-center md:px-10 md:py-20 xl:px-[4.5rem]"><div><p className="eyebrow text-[#b46f49]">Partnership makes progress possible</p><h2 className="font-editorial mt-3 text-3xl text-[#214b37] md:text-4xl">Have an idea for a greener Uganda?</h2></div><ButtonLink href="/contact-us">Start a conversation</ButtonLink></section>
  </main>;
}

export function CurrentHomeFooter() {
  return <div className="min-h-screen"><Header/><Home/><Footer/></div>;
}
