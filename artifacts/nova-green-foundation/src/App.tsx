import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { demoStories, fetchSanityStories, sanityIsConfigured, type Story } from '@/lib/sanity';
import NotFound from '@/pages/not-found';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X, Sprout, Sun, Recycle, UsersRound, MapPin, Mail, Phone, CheckCircle2 } from 'lucide-react';
import {
  Route,
  Switch,
  Link,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

const navItems = [
  { label: 'About us', href: '/about-us' },
  { label: 'Programmes', href: '/programmes' },
  { label: 'Our people', href: '/board-leadership' },
  { label: 'SDG impact', href: '/sdgs-impact' },
  { label: 'Partners', href: '/partners' },
  { label: 'News & stories', href: '/news-updates' },
];
const pageData: Record<string, { title: string; description: string; kicker: string; lead: string }> = {
  '/about-us': { title: 'Change that begins with people.', description: 'Learn about Nova Green Economy Foundation and our community-led approach to a fair, climate-resilient future in Uganda.', kicker: 'Who we are', lead: 'We are a Uganda-rooted nonprofit working alongside communities to make the green economy work for everyone.' },
  '/programmes': { title: 'Practical pathways to a greener future.', description: 'Explore Nova Green Economy Foundation programmes in resilient livelihoods, circular enterprise, clean energy and inclusive climate action.', kicker: 'What we do', lead: 'We connect local knowledge, practical skills and long-term opportunity—so communities can shape the transition on their terms.' },
  '/board-leadership': { title: 'Leadership rooted in service.', description: 'Meet the board and leadership team guiding Nova Green Economy Foundation with accountability and community partnership.', kicker: 'Our people', lead: 'Good work takes shared leadership. Our board and team bring experience across community development, enterprise and climate action.' },
  '/sdgs-impact': { title: 'Local action. Shared progress.', description: 'See how our community-led work contributes to the Sustainable Development Goals and a fair green economy in Uganda.', kicker: 'Our impact', lead: 'Progress is more than a number. We track the change communities value and the contribution it makes to a wider global agenda.' },
  '/partners': { title: 'A transition built together.', description: 'Discover how Nova Green Economy Foundation collaborates with local organisations, public institutions and communities.', kicker: 'Work with us', lead: 'A fair transition is a collective effort. We build partnerships that share resources, knowledge and decision-making.' },
  '/news-updates': { title: 'Stories from the transition.', description: 'Read news, field notes and stories from Nova Green Economy Foundation communities and programmes in Uganda.', kicker: 'News & updates', lead: 'Ideas and progress from the people putting a fair green economy into practice. Stories are currently illustrative while our CMS is prepared.' },
  '/contact-us': { title: 'Let’s make progress together.', description: 'Contact Nova Green Economy Foundation to explore partnerships, programme enquiries and community engagement in Uganda.', kicker: 'Get in touch', lead: 'Have a question, an idea or a partnership in mind? We would be glad to hear from you.' },
};

function updatePageMetadata(title: string, description: string) {
  document.title = title;
  const updateTag = (selector: string, attribute: string, key: string, value: string) => {
    let tag = document.querySelector<HTMLMetaElement>(selector);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attribute, key);
      document.head.appendChild(tag);
    }
    tag.content = value;
  };
  updateTag('meta[name="description"]', 'name', 'description', description);
  updateTag('meta[property="og:title"]', 'property', 'og:title', title);
  updateTag('meta[property="og:description"]', 'property', 'og:description', description);
  updateTag('meta[property="og:type"]', 'property', 'og:type', 'website');
  updateTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
  updateTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
}

function Brand({ light = false }: { light?: boolean }) {
  return <Link href="/" className={`flex items-center gap-3 ${light ? 'text-[#f5f0e5]' : 'text-[#183c2c]'}`} aria-label="Nova Green Economy Foundation home" data-testid="link-home">
    <span className={`grid h-10 w-10 place-items-center rounded-full ${light ? 'bg-[#f5f0e5] text-[#214b37]' : 'bg-[#214b37] text-[#f6f1e6]'}`}><span className="font-editorial text-[1.6rem] leading-none">N</span></span>
    <span className="leading-[1.05]"><span className="block text-[.68rem] font-bold tracking-[.13em]">NOVA</span><span className="mt-1 block text-[.53rem] font-semibold tracking-[.13em]">GREEN ECONOMY<br/>FOUNDATION</span></span>
  </Link>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [path] = useLocation();
  return <header className="relative z-40 border-b border-[#d9d4c7] bg-[#f5f2e9]">
    <div className="mx-auto flex min-h-[82px] max-w-[1440px] items-center justify-between px-5 md:px-10 xl:px-[4.5rem]">
      <Brand />
      <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
        {navItems.map(item => <Link key={item.href} href={item.href} aria-current={path === item.href ? 'page' : undefined} className="nav-link text-[.78rem] font-medium text-[#3b5146] transition-colors hover:text-[#c0784d]" data-testid={`link-nav-${item.href.slice(1)}`}>{item.label}</Link>)}
      </nav>
      <Link href="/contact-us" className="hidden items-center gap-2 rounded-full bg-[#214b37] px-5 py-3 text-[.75rem] font-semibold text-[#f8f3e9] transition hover:bg-[#315f48] md:flex" data-testid="link-header-contact">Let’s talk <ArrowUpRight size={15}/></Link>
      <button className="grid h-11 w-11 place-items-center rounded-full border border-[#d9d4c7] text-[#214b37] lg:hidden" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)} data-testid="button-mobile-menu">{open ? <X/> : <Menu/>}</button>
    </div>
    {open && <nav className="absolute left-0 right-0 top-full border-b border-[#d9d4c7] bg-[#f5f2e9] px-6 pb-6 pt-2 shadow-lg lg:hidden" aria-label="Mobile navigation">{navItems.map(item => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex border-t border-[#ded9cc] py-4 text-sm text-[#214b37]">{item.label}<ArrowUpRight className="ml-auto" size={17}/></Link>)}<Link href="/contact-us" onClick={() => setOpen(false)} className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#214b37] px-5 py-3 text-sm text-[#f8f3e9]">Contact us <ArrowRight size={15}/></Link></nav>}
  </header>;
}

function Footer() {
  return <footer className="bg-[#183c2c] text-[#f5f0e5]">
    <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 md:grid-cols-[1.2fr_.8fr_1fr] md:px-10 xl:px-[4.5rem]">
      <div><Brand light/><p className="mt-6 max-w-sm text-sm leading-7 text-[#d1d8cd]">A fair green economy starts with the people who know their communities best.</p><p className="mt-7 eyebrow text-[#d9aa74]">Rooted in Uganda. Connected to possibility.</p></div>
      <div><p className="eyebrow text-[#d9aa74]">Explore</p><div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 text-sm text-[#e2e4da]">{navItems.map(item => <Link key={item.href} href={item.href} className="transition hover:text-[#e8bd8d]">{item.label}</Link>)}</div></div>
      <div><p className="eyebrow text-[#d9aa74]">Find us</p><div className="mt-5 space-y-4 text-sm text-[#e2e4da]"><p className="flex gap-3"><MapPin size={17} className="shrink-0 text-[#d9aa74]"/> Kampala, Uganda</p><p className="flex gap-3"><Mail size={17} className="shrink-0 text-[#d9aa74]"/> hello@novagreenfoundation.org</p><p className="flex gap-3"><Phone size={17} className="shrink-0 text-[#d9aa74]"/> +256 (0) 200 000 000</p></div></div>
    </div>
     <div className="border-t border-white/15"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-3 px-6 py-5 text-[.68rem] text-[#c3cec4] sm:flex-row md:px-10 xl:px-[4.5rem]"><span>© {new Date().getFullYear()} Nova Green Economy Foundation</span><span>Demo website · Impact figures and contact details are placeholders</span></div></div>
  </footer>;
}

function ButtonLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return <Link href={href} className={`group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold transition ${light ? 'bg-[#f4f0e5] text-[#214b37] hover:bg-white' : 'bg-[#214b37] text-[#f8f3e9] hover:bg-[#315f48]'}`}>{children}<ArrowRight className="transition-transform group-hover:translate-x-1" size={16}/></Link>;
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
  return <div className="border-l border-[#d8d2c4] pl-5"><p className="font-editorial text-4xl text-[#214b37] md:text-5xl">{value}</p><p className="mt-3 max-w-[12rem] text-sm leading-6 text-[#5f6d60]">{label}</p></div>;
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
          <div className="mt-9 flex flex-wrap items-center gap-4"><ButtonLink href="/programmes" light>Explore our work</ButtonLink><Link href="/about-us" className="group inline-flex items-center gap-2 rounded-full border border-white/50 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/10">Meet Nova <ArrowUpRight size={15}/></Link></div>
        </div>
        <div className="mt-14 flex items-end justify-between border-t border-white/30 pt-5 text-xs text-white/85"><span>COMMUNITY FIRST · CLIMATE READY</span><a href="#intro" className="flex items-center gap-2 hover:text-white">Scroll to explore <ArrowDown size={14}/></a></div>
      </div>
      <div className="glass-panel absolute right-8 top-8 hidden max-w-[220px] rounded-2xl p-5 text-[#214b37] shadow-xl md:block"><Sprout size={20}/><p className="font-editorial mt-3 text-xl leading-tight">The green economy belongs to everyone.</p></div>
    </section>
    <section id="intro" className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 md:grid-cols-[.9fr_1.1fr] md:px-10 md:py-28 xl:px-[4.5rem]">
      <div><p className="eyebrow text-[#b46f49]">Our point of view</p><h2 className="font-editorial mt-5 text-4xl leading-[1.06] text-[#214b37] md:text-6xl">Opportunity should grow where people are.</h2></div>
      <div className="pt-1 md:pt-10"><p className="max-w-2xl text-lg leading-8 text-[#526257]">Across Uganda, people are already building solutions for a changing climate. We bring resources, practical skills and trusted partnerships closer to that work—so local ideas can become lasting opportunity.</p><Link href="/about-us" className="mt-7 inline-flex items-center gap-3 border-b border-[#c0784d] pb-2 text-sm font-semibold text-[#214b37]">How we work <ArrowUpRight size={16}/></Link></div>
    </section>
    <section className="bg-[#e9e5d9] py-16 md:py-20"><div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-[4.5rem]"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow text-[#b46f49]">Where we focus</p><h2 className="font-editorial mt-4 text-4xl text-[#214b37] md:text-5xl">Four connected pathways</h2></div><p className="max-w-md text-sm leading-6 text-[#637065]">We invest in the everyday systems that help families thrive and communities adapt.</p></div>
      <div className="mt-11 grid gap-px overflow-hidden rounded-2xl bg-[#c9c8b9] md:grid-cols-2 xl:grid-cols-4">
        {[{icon:Sprout,n:'01',title:'Resilient livelihoods',copy:'Practical training, climate-smart agriculture and stronger local value chains.'},{icon:Recycle,n:'02',title:'Circular enterprise',copy:'Turning local materials and ingenuity into meaningful work and less waste.'},{icon:Sun,n:'03',title:'Clean energy',copy:'Making reliable, affordable energy part of everyday opportunity.'},{icon:UsersRound,n:'04',title:'Inclusive climate action',copy:'Putting women, young people and local voices in the decisions that shape change.'}].map((item,i)=><article key={item.n} className="group bg-[#f5f2e9] p-7 transition-colors hover:bg-[#f8f6ef] md:p-8"><div className="flex items-center justify-between"><item.icon size={23} strokeWidth={1.5} className="text-[#b46f49]"/><span className="font-mono text-xs text-[#899287]">{item.n}</span></div><h3 className="font-editorial mt-12 text-2xl text-[#214b37]">{item.title}</h3><p className="mt-3 min-h-[72px] text-sm leading-6 text-[#627064]">{item.copy}</p><Link href="/programmes" aria-label={`Explore ${item.title}`} className="mt-6 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#c9c8b9] text-[#214b37] transition group-hover:bg-[#214b37] group-hover:text-white"><ArrowUpRight size={16}/></Link></article>)}
      </div></div></section>
    <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-20 md:grid-cols-2 md:px-10 md:py-28 xl:px-[4.5rem]">
      <div className="relative min-h-[390px] overflow-hidden rounded-[1.25rem] bg-[#d6d5c4]"><div className="hero-image absolute inset-0 bg-cover bg-center"/><div className="image-tint absolute inset-0"/><div className="absolute bottom-6 left-6 max-w-xs text-sm leading-6 text-white">Community knowledge is not a starting point. It is the foundation.</div></div>
      <div className="md:pl-8"><p className="eyebrow text-[#b46f49]">The work, in perspective</p><h2 className="font-editorial mt-5 text-4xl leading-tight text-[#214b37] md:text-5xl">Small shifts can change the shape of a future.</h2><p className="mt-5 max-w-xl leading-7 text-[#5e6b60]">Our programmes are designed with communities, not simply delivered to them. The figures below are illustrative placeholders for the foundation’s first public impact report.</p><div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-9"><Metric value="1,240+" label="people reached through skills and enterprise support"/><Metric value="18" label="community groups shaping local climate action"/><Metric value="62%" label="of programme participants are women and girls"/><Metric value="7" label="districts with active community partnerships"/></div><Link href="/sdgs-impact" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-[#214b37]">See our impact approach <ArrowRight size={16}/></Link></div>
    </section>
    <ImageBand label="The way forward" title="A fairer economy is possible. Let’s build it together."/>
    <section className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-7 px-6 py-16 md:flex-row md:items-center md:px-10 md:py-20 xl:px-[4.5rem]"><div><p className="eyebrow text-[#b46f49]">Partnership makes progress possible</p><h2 className="font-editorial mt-3 text-3xl text-[#214b37] md:text-4xl">Have an idea for a greener Uganda?</h2></div><ButtonLink href="/contact-us">Start a conversation</ButtonLink></section>
  </main>;
}

const programmes = [
  { icon: Sprout, n: '01', title: 'Climate-resilient livelihoods', tag: 'LAND & LIVELIHOODS', body: 'We work with farmers and producer groups to strengthen climate-smart practices, protect soil and water, and connect local harvests to fairer markets.', outcomes: ['Farmer-led learning groups', 'Soil health and water stewardship', 'Inclusive market access'] },
  { icon: Recycle, n: '02', title: 'Circular green enterprise', tag: 'ENTERPRISE & SKILLS', body: 'We support entrepreneurs to build viable businesses that keep resources in use, create dignified work and respond to needs in their own communities.', outcomes: ['Business and technical skills', 'Local value addition', 'Mentoring and market connections'] },
  { icon: Sun, n: '03', title: 'Clean, accessible energy', tag: 'ENERGY & OPPORTUNITY', body: 'We bring communities, innovators and partners together to expand access to practical clean-energy solutions for households and small enterprises.', outcomes: ['Community energy awareness', 'Productive-use opportunities', 'Local capacity for adoption'] },
  { icon: UsersRound, n: '04', title: 'Inclusive climate action', tag: 'VOICE & RESILIENCE', body: 'We back locally led planning and make room for women, young people and underrepresented groups to shape decisions about climate and development.', outcomes: ['Community dialogue and planning', 'Youth and women’s leadership', 'Locally relevant resilience priorities'] },
];

function InnerHero({ path, children }: { path: string; children?: ReactNode }) {
  const data = pageData[path];
  return <section className="relative overflow-hidden bg-[#214b37] text-[#f7f2e7]"><div className="absolute inset-0 opacity-[.32] hero-image bg-cover bg-center"/><div className="absolute inset-0 bg-gradient-to-r from-[#173929] via-[#173929]/80 to-[#173929]/20"/><div className="relative mx-auto max-w-[1440px] px-6 pb-16 pt-14 md:px-10 md:pb-20 md:pt-20 xl:px-[4.5rem]"><p className="eyebrow text-[#e5b887]">{data.kicker}</p><h1 className="font-editorial mt-6 max-w-4xl text-5xl leading-[1.02] md:text-7xl">{data.title}</h1><p className="mt-6 max-w-2xl text-base leading-7 text-[#e0e5d9] md:text-lg md:leading-8">{data.lead}</p>{children}</div></section>;
}

function AboutContent() {
  return <><section className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 md:grid-cols-[.8fr_1.2fr] md:px-10 md:py-24 xl:px-[4.5rem]"><div><p className="eyebrow text-[#b46f49]">Our conviction</p><h2 className="font-editorial mt-4 text-4xl leading-tight text-[#214b37] md:text-5xl">The transition must work for the people living it.</h2></div><div className="space-y-5 text-[#5a685d] leading-7"><p>Nova Green Economy Foundation is a Ugandan nonprofit advancing a fair, climate-resilient green economy. We believe progress lasts when local communities have the power, resources and relationships to shape it.</p><p>We bring together community groups, public institutions, civil society and responsible enterprise. Our role is to listen, connect and make practical action easier to sustain.</p><p>Our work is grounded in respect, accountability and the belief that livelihoods and a healthy environment belong in the same conversation.</p></div></section><ImageBand label="Our approach" title="Listen closely. Work practically. Learn together."/><section className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-24 xl:px-[4.5rem]"><div className="grid gap-10 md:grid-cols-3">{[{n:'01',t:'Start with local knowledge',p:'We make space for communities to set priorities and identify what is already working.'},{n:'02',t:'Build for the long term',p:'We connect skills, relationships and resources around practical, locally owned solutions.'},{n:'03',t:'Stay accountable',p:'We learn openly, share progress and adapt our work with the people it is meant to serve.'}].map(x=><article key={x.n} className="border-t border-[#c9c8b9] pt-5"><p className="font-mono text-xs text-[#b46f49]">{x.n}</p><h3 className="font-editorial mt-8 text-2xl text-[#214b37]">{x.t}</h3><p className="mt-3 leading-7 text-[#637065]">{x.p}</p></article>)}</div></section><CTA/></>;
}

function ProgrammesContent() {
  return <><section className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-20 xl:px-[4.5rem]"><div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="eyebrow text-[#b46f49]">Our programme portfolio</p><h2 className="font-editorial mt-3 text-4xl text-[#214b37] md:text-5xl">Four pathways, one shared purpose.</h2></div><p className="max-w-md leading-7 text-[#637065]">Each programme responds to local priorities and works best when the pathways reinforce one another.</p></div><div className="space-y-4">{programmes.map((p,i)=><article key={p.n} className={`grid gap-7 rounded-2xl p-6 md:grid-cols-[.36fr_1fr_.8fr] md:p-9 ${i%2===0?'bg-[#e9e5d9]':'bg-[#eeece4]'}`}><div className="flex items-start justify-between md:block"><p className="font-mono text-xs text-[#b46f49]">{p.n} / {p.tag}</p><p.icon className="text-[#b46f49] md:mt-10" size={29} strokeWidth={1.4}/></div><div><h3 className="font-editorial text-3xl text-[#214b37] md:text-4xl">{p.title}</h3><p className="mt-4 max-w-xl leading-7 text-[#5f6d60]">{p.body}</p></div><ul className="space-y-3 border-t border-[#d3d0c2] pt-5 text-sm text-[#405649] md:border-l md:border-t-0 md:pl-7 md:pt-0">{p.outcomes.map(o=><li key={o} className="flex gap-3"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#b46f49]"/>{o}</li>)}</ul></article>)}</div></section><CTA/></>;
}

function PeopleContent() {
  const people=[['Amina Nambasa','Board Chair','Community development & governance'],['Dr. Joseph Okello','Board Member','Climate resilience & public policy'],['Ruth Atim','Board Member','Inclusive enterprise & livelihoods'],['Patrick Ssemanda','Executive Director','Partnerships & programme leadership']];
  return <><section className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-20 xl:px-[4.5rem]"><div className="mb-11 max-w-2xl"><p className="eyebrow text-[#b46f49]">Board & leadership</p><h2 className="font-editorial mt-4 text-4xl text-[#214b37] md:text-5xl">Stewardship with communities in view.</h2><p className="mt-5 leading-7 text-[#637065]">Illustrative leadership profiles for the demo site. Names and biographies should be reviewed and replaced with approved information before publication.</p></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{people.map((p,i)=><article key={p[0]} className="group bg-[#e9e5d9]"><div className="editorial-grid relative flex aspect-[.92] items-end overflow-hidden bg-[#d5d4c5] p-6"><div className={`absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04] ${i%2===0?'bg-[#c5cbbb]':'bg-[#d5c8b2]'}`}/><div className="absolute inset-0 bg-gradient-to-t from-[#244637]/65 to-transparent"/><div className="relative grid h-20 w-20 place-items-center rounded-full border border-white/60 bg-white/20 font-editorial text-3xl text-white backdrop-blur-sm">{p[0].split(' ').map(n=>n[0]).slice(0,2).join('')}</div><span className="absolute right-5 top-5 font-mono text-xs text-[#214b37]">0{i+1}</span></div><div className="p-5"><p className="eyebrow text-[#b46f49]">{p[1]}</p><h3 className="font-editorial mt-2 text-2xl text-[#214b37]">{p[0]}</h3><p className="mt-1 text-sm text-[#637065]">{p[2]}</p></div></article>)}</div></section><section className="bg-[#214b37] px-6 py-14 text-[#f4f0e5] md:px-10"><div className="mx-auto flex max-w-[1440px] flex-col gap-5 md:flex-row md:items-center md:justify-between"><h2 className="font-editorial max-w-2xl text-3xl md:text-4xl">Good governance begins with listening.</h2><Link href="/contact-us" className="inline-flex items-center gap-2 text-sm text-[#e9bd8b]">Our accountability commitments <ArrowUpRight size={16}/></Link></div></section><CTA/></>;
}

function ImpactContent() {
 const sdgs=[['01','No poverty','Stronger livelihoods and local opportunity.'],['05','Gender equality','Women’s participation and leadership in climate action.'],['07','Clean energy','Practical access to clean and reliable energy.'],['08','Decent work','Skills and enterprise that support dignified work.'],['12','Responsible production','Circular approaches that reduce waste and create value.'],['13','Climate action','Community-led adaptation and resilience.'],['17','Partnerships','Shared action across communities and institutions.']];
 return <><section className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-20 xl:px-[4.5rem]"><div className="grid gap-12 md:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow text-[#b46f49]">A transparent approach</p><h2 className="font-editorial mt-4 text-4xl leading-tight text-[#214b37] md:text-5xl">Impact is a practice, not a promise.</h2></div><div><p className="leading-7 text-[#5f6d60]">We are building a measurement approach that combines practical indicators with community feedback. The sample metrics below are illustrative for this website demo, not verified organisational results.</p><div className="mt-8 rounded-xl border border-[#d8d2c4] bg-[#efede5] p-5 text-sm leading-6 text-[#5a685d]"><span className="eyebrow text-[#b46f49]">Illustrative snapshot · 2024</span><div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-4"><div><b className="font-editorial text-3xl text-[#214b37]">1,240+</b><p>people reached</p></div><div><b className="font-editorial text-3xl text-[#214b37]">18</b><p>community groups</p></div><div><b className="font-editorial text-3xl text-[#214b37]">7</b><p>districts</p></div><div><b className="font-editorial text-3xl text-[#214b37]">62%</b><p>women and girls</p></div></div></div></div></div></section><section className="bg-[#e9e5d9] py-16 md:py-20"><div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-[4.5rem]"><p className="eyebrow text-[#b46f49]">Our contribution to the SDGs</p><h2 className="font-editorial mt-4 text-4xl text-[#214b37] md:text-5xl">Local work, global goals.</h2><div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{sdgs.map(s=><article key={s[0]} className="flex gap-5 border border-[#d1cdbf] bg-[#f5f2e9] p-5"><span className="font-mono text-sm text-[#b46f49]">SDG<br/><b className="text-3xl">{s[0]}</b></span><div><h3 className="font-editorial text-xl text-[#214b37]">{s[1]}</h3><p className="mt-2 text-sm leading-6 text-[#637065]">{s[2]}</p></div></article>)}</div></div></section><CTA/></>;
}

function PartnersContent() {
 return <><section className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 md:grid-cols-[1fr_1fr] md:px-10 md:py-24 xl:px-[4.5rem]"><div><p className="eyebrow text-[#b46f49]">Partnership in practice</p><h2 className="font-editorial mt-4 text-4xl leading-tight text-[#214b37] md:text-5xl">Different strengths. Shared direction.</h2></div><div><p className="leading-7 text-[#5f6d60]">We collaborate with the people and organisations closest to the work: community associations, local government, civil society, educators and responsible businesses.</p><p className="mt-5 leading-7 text-[#5f6d60]">Our best partnerships are grounded in mutual respect, clear roles and a willingness to learn together. We are open to conversations with organisations whose values align with locally led, inclusive climate action.</p></div></section><section className="bg-[#e9e5d9] py-16"><div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-[4.5rem]"><p className="eyebrow text-[#b46f49]">Partnership principles</p><div className="mt-8 grid gap-8 md:grid-cols-3">{[['Locally grounded','Community priorities guide programme design and delivery.'],['Mutually accountable','We align on outcomes, responsibilities and transparent learning.'],['Built to last','We strengthen local capacity and relationships beyond project cycles.']].map((x,i)=><article className="border-t border-[#c9c8b9] pt-5" key={x[0]}><span className="font-mono text-xs text-[#b46f49]">0{i+1}</span><h3 className="font-editorial mt-7 text-2xl text-[#214b37]">{x[0]}</h3><p className="mt-3 leading-7 text-[#637065]">{x[1]}</p></article>)}</div></div></section><CTA/></>;
}

function NewsContent(){
 const [filter,setFilter]=useState('ALL STORIES');
 const [stories,setStories]=useState<Story[]>(demoStories);
 const [cmsState,setCmsState]=useState<'demo'|'loading'|'live'|'empty'|'error'>(sanityIsConfigured?'loading':'demo');
 const [activeStory,setActiveStory]=useState<Story|null>(null);
 const filters=['ALL STORIES',...Array.from(new Set(stories.map(s=>s.category)))];
 const shown=filter==='ALL STORIES'?stories:stories.filter(s=>s.category===filter);

 useEffect(()=>{
   if(!sanityIsConfigured)return;
   const controller=new AbortController();
   setCmsState('loading');
   fetchSanityStories(controller.signal)
     .then((items)=>{setStories(items);setCmsState(items.length?'live':'empty');})
     .catch(()=>{if(!controller.signal.aborted){setStories(demoStories);setCmsState('error');}});
   return ()=>controller.abort();
 },[]);
 useEffect(()=>{
   if(!activeStory)return;
   const onKeyDown=(event:KeyboardEvent)=>{if(event.key==='Escape')setActiveStory(null);};
   window.addEventListener('keydown',onKeyDown);
   return ()=>window.removeEventListener('keydown',onKeyDown);
 },[activeStory]);

 const statusMessage = {
   demo:'Demo stories shown. Add Sanity project settings to load published CMS content.',
   loading:'Connecting to Sanity. Demo stories remain visible while content loads.',
   live:'Showing the latest published stories from Sanity CMS.',
   empty:'Sanity is connected, but there are no published stories yet.',
   error:'Sanity could not be reached. Showing demo stories instead.',
 }[cmsState];

 return <><section className="mx-auto max-w-[1440px] px-6 py-14 md:px-10 md:py-20 xl:px-[4.5rem]">
   <div className="mb-9 flex flex-wrap gap-2" aria-label="Filter stories">{filters.map(f=><button type="button" key={f} onClick={()=>setFilter(f)} aria-pressed={filter===f} className={`rounded-full border px-4 py-2 text-[.65rem] font-semibold tracking-[.08em] transition ${filter===f?'border-[#214b37] bg-[#214b37] text-[#f7f2e7]':'border-[#d4d0c3] text-[#506154] hover:border-[#214b37]'}`}>{f}</button>)}</div>
   <p className="mb-6 rounded-lg border border-[#d8d2c4] bg-[#ece9df] px-4 py-3 text-xs text-[#5f6d60]" role="status">{statusMessage}</p>
   <div className="grid gap-x-7 gap-y-12 md:grid-cols-2">{shown.map((s)=><article key={s.id} className="group">
     <div className={`relative mb-5 aspect-[1.7] overflow-hidden rounded-xl ${s.imageUrl?'bg-[#d0d2c3]':'editorial-grid bg-[#e2d9c8]'}`}>
       {s.imageUrl?<img src={s.imageUrl} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"/>:<span className="font-editorial absolute bottom-5 left-6 text-6xl text-[#7c8a74]/60">N.</span>}
       <span className="absolute left-4 top-4 rounded-full bg-[#f5f2e9]/90 px-3 py-1.5 text-[.6rem] font-bold tracking-[.12em] text-[#214b37]">{s.category}</span>
     </div>
     <div className="flex gap-3 text-[.67rem] uppercase tracking-[.1em] text-[#a16948]"><span>{s.date}</span><span>·</span><span>4 min read</span></div>
     <h2 className="font-editorial mt-3 max-w-xl text-3xl leading-tight text-[#214b37]">{s.title}</h2>
     <p className="mt-3 max-w-xl leading-7 text-[#637065]">{s.summary}</p>
     <button type="button" onClick={()=>setActiveStory(s)} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#214b37]">Read story <ArrowUpRight size={15}/></button>
   </article>)}</div>
   {shown.length===0&&cmsState!=='empty'&&<p className="py-16 text-center text-[#637065]">No stories in this category yet.</p>}
   {cmsState==='empty'&&<p className="rounded-xl bg-[#ece9df] px-6 py-12 text-center text-[#637065]">Published Sanity stories will appear here as soon as your team adds them.</p>}
 </section>
 {activeStory&&<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#14291f]/70 p-4 backdrop-blur-sm" role="presentation" onClick={(event)=>{if(event.target===event.currentTarget)setActiveStory(null);}}>
   <article role="dialog" aria-modal="true" aria-labelledby="story-title" className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-[#f5f2e9] p-7 shadow-2xl md:p-12">
     <button type="button" onClick={()=>setActiveStory(null)} aria-label="Close story" className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-[#d4d0c3] text-[#214b37] hover:bg-[#e9e5d9]"><X size={18}/></button>
     <p className="eyebrow pr-12 text-[#b46f49]">{activeStory.category} <span className="mx-2">·</span>{activeStory.date}</p>
     <h2 id="story-title" className="font-editorial mt-5 pr-8 text-4xl leading-tight text-[#214b37] md:text-5xl">{activeStory.title}</h2>
     <p className="mt-5 text-lg leading-8 text-[#5f6d60]">{activeStory.summary}</p>
     <div className="mt-7 space-y-5 border-t border-[#d8d2c4] pt-7 leading-7 text-[#435449]">{(activeStory.body.length?activeStory.body:[activeStory.summary]).map((paragraph,index)=><p key={index}>{paragraph}</p>)}</div>
   </article>
 </div>}
 <CTA/></>;
}

function ContactContent() {
 const [sent,setSent]=useState(false);
 const [error,setError]=useState('');
 function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;setError('');setSent(true);form.reset();}
  return <><section className="mx-auto grid max-w-[1440px] gap-12 px-6 py-14 md:grid-cols-[.8fr_1.2fr] md:px-10 md:py-20 xl:px-[4.5rem]"><aside className="rounded-2xl bg-[#214b37] p-7 text-[#f5f0e5] md:p-9"><p className="eyebrow text-[#e5b887]">Talk to our team</p><h2 className="font-editorial mt-5 text-3xl leading-tight md:text-4xl">Good things start with a conversation.</h2><p className="mt-5 leading-7 text-[#d8e0d5]">Tell us what you are working on. We will help you find the right person to speak with.</p><div className="mt-10 space-y-5 text-sm text-[#e5e8df]"><p className="flex gap-3"><Mail size={18} className="mt-0.5 shrink-0 text-[#e5b887]"/> hello@novagreenfoundation.org</p><p className="flex gap-3"><Phone size={18} className="mt-0.5 shrink-0 text-[#e5b887]"/> +256 (0) 200 000 000</p><p className="flex gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-[#e5b887]"/> Kampala, Uganda</p></div><div className="mt-12 border-t border-white/20 pt-5 text-xs leading-6 text-[#c9d4ca]">Contact details are placeholders. The enquiry form is a demo and does not send data to a server.</div></aside><div>{sent?<div role="status" className="rounded-2xl border border-[#cbd6c8] bg-[#e8eee4] p-8 text-[#214b37]"><CheckCircle2 size={28}/><h2 className="font-editorial mt-4 text-3xl">Thank you for reaching out.</h2><p className="mt-3 leading-7">Your message has been recorded in this demo experience. To enable delivery, connect this form to an approved contact service.</p><button type="button" onClick={()=>setSent(false)} className="mt-6 border-b border-[#b46f49] pb-1 text-sm font-semibold">Send another message</button></div>:<form className="space-y-6" onSubmit={submit} noValidate><div className="grid gap-6 sm:grid-cols-2"><label className="block text-sm font-medium text-[#314a3b]">Your name<input required name="name" autoComplete="name" className="mt-2 block w-full rounded-lg border border-[#d4d0c3] bg-[#fbf9f3] px-4 py-3 font-normal outline-none transition focus:border-[#214b37]" placeholder="Name" data-testid="input-contact-name"/></label><label className="block text-sm font-medium text-[#314a3b]">Email address<input required type="email" name="email" autoComplete="email" className="mt-2 block w-full rounded-lg border border-[#d4d0c3] bg-[#fbf9f3] px-4 py-3 font-normal outline-none transition focus:border-[#214b37]" placeholder="you@example.org" data-testid="input-contact-email"/></label></div><label className="block text-sm font-medium text-[#314a3b]">I’m getting in touch about<select required defaultValue="" name="topic" className="mt-2 block w-full rounded-lg border border-[#d4d0c3] bg-[#fbf9f3] px-4 py-3 font-normal text-[#435449]"><option value="" disabled>Select a topic</option><option>Partnership opportunities</option><option>Programme enquiry</option><option>Media and communications</option><option>Community engagement</option><option>Other</option></select></label><label className="block text-sm font-medium text-[#314a3b]">Your message<textarea required name="message" rows={5} className="mt-2 block w-full resize-y rounded-lg border border-[#d4d0c3] bg-[#fbf9f3] px-4 py-3 font-normal outline-none transition focus:border-[#214b37]" placeholder="A few details to help us understand..." data-testid="input-contact-message"/></label>{error&&<p role="alert" className="text-sm text-red-800">{error}</p>}<button type="submit" className="inline-flex items-center gap-3 rounded-full bg-[#214b37] px-6 py-3.5 text-sm font-semibold text-[#f8f3e9] transition hover:bg-[#315f48]" data-testid="button-contact-submit">Send your message <ArrowRight size={16}/></button><p className="text-xs leading-5 text-[#788276]">By submitting, you agree that Nova Green Economy Foundation may use your details to respond to this enquiry.</p></form>}</div></section><section className="editorial-grid border-y border-[#ddd8ca] bg-[#eae7dc] px-6 py-10 text-center"><p className="eyebrow text-[#b46f49]">Based in Uganda</p><p className="font-editorial mt-2 text-2xl text-[#214b37]">Working with communities across the country.</p></section></>;
}

function CTA() { return <section className="bg-[#214b37] px-6 py-14 text-[#f5f0e5] md:px-10 md:py-16"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 md:flex-row md:items-center"><div><p className="eyebrow text-[#e5b887]">Join the conversation</p><h2 className="font-editorial mt-3 max-w-2xl text-3xl md:text-4xl">Let’s find the practical next step, together.</h2></div><ButtonLink href="/contact-us" light>Contact our team</ButtonLink></div></section>; }

function InnerPage({ path }: { path: string }) {
 const data=pageData[path];
  useEffect(()=>{updatePageMetadata(`${data.title} | Nova Green Economy Foundation`,data.description);},[data]);
 let content:ReactNode;
 switch(path){case '/about-us':content=<AboutContent/>;break;case '/programmes':content=<ProgrammesContent/>;break;case '/board-leadership':content=<PeopleContent/>;break;case '/sdgs-impact':content=<ImpactContent/>;break;case '/partners':content=<PartnersContent/>;break;case '/news-updates':content=<NewsContent/>;break;default:content=<ContactContent/>;}
 return <main className="page-enter"><InnerHero path={path}/>{content}</main>;
}

function HomePage() {
  useEffect(()=>{updatePageMetadata('Nova Green Economy Foundation | A greener future, built together','Nova Green Economy Foundation works alongside communities in Uganda to advance a fair, climate-resilient green economy.');},[]);
 return <Home/>;
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={HomePage} />
        {Object.keys(pageData).map(path => <Route key={path} path={path}><InnerPage path={path}/></Route>)}
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Header />
          <Router />
          <Footer />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
