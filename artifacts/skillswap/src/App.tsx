import { type ReactNode, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Clock3,
  FileCheck2,
  Heart,
  IndianRupee,
  Menu,
  MessageCircle,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  X,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  type Category = 'All' | 'Video' | 'Design' | 'Tutoring' | 'Music';
  type Creator = {
    id: string;
    name: string;
    initials: string;
    city: string;
    category: Exclude<Category, 'All'>;
    skill: string;
    description: string;
    rating: string;
    reviews: number;
    price: string;
    accent: string;
    poster: string;
    available: string;
  };

  const creators: Creator[] = [
    { id: 'aanya', name: 'Aanya Sharma', initials: 'AS', city: 'Mumbai, MH', category: 'Video', skill: 'Short-form video editing', description: 'Punchy reels and edits that make people stop scrolling.', rating: '4.9', reviews: 37, price: '1,200', accent: '#ff735c', poster: 'REEL / 01', available: 'Replies in 2h' },
    { id: 'kabir', name: 'Kabir Nair', initials: 'KN', city: 'Bengaluru, KA', category: 'Design', skill: 'Brand identity & logo design', description: 'Distinct visual identities for student-led ideas and brands.', rating: '5.0', reviews: 22, price: '2,500', accent: '#f8bf4f', poster: 'K / STUDIO', available: 'Available this week' },
    { id: 'meera', name: 'Meera Iyer', initials: 'MI', city: 'Chennai, TN', category: 'Tutoring', skill: 'Maths, made less scary', description: 'Patient 1:1 sessions for the exam you keep putting off.', rating: '4.8', reviews: 48, price: '450', accent: '#54c2ad', poster: 'MATH / 101', available: 'Replies in 4h' },
    { id: 'ishaan', name: 'Ishaan Verma', initials: 'IV', city: 'Delhi, DL', category: 'Music', skill: 'Indie music production', description: 'From rough voice note to a track you want on repeat.', rating: '4.9', reviews: 19, price: '1,800', accent: '#a77bfa', poster: 'SIDE A', available: 'Available tomorrow' },
    { id: 'zoya', name: 'Zoya Khan', initials: 'ZK', city: 'Pune, MH', category: 'Design', skill: 'Illustration & social kits', description: 'Warm, weird and wonderfully on-brand illustration systems.', rating: '4.9', reviews: 31, price: '900', accent: '#e789bd', poster: 'Z / 24', available: 'Replies in 1h' },
    { id: 'arjun', name: 'Arjun Thomas', initials: 'AT', city: 'Kochi, KL', category: 'Video', skill: 'YouTube storytelling', description: 'Clean cuts, clever pacing and a story worth staying for.', rating: '4.7', reviews: 16, price: '1,500', accent: '#67a8e8', poster: 'CUT / CUT', available: 'Available this week' },
  ];

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('All');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [booked, setBooked] = useState<string | null>(null);
  const [creatorIntent, setCreatorIntent] = useState(false);
  const [liked, setLiked] = useState<string[]>([]);

  const filteredCreators = useMemo(() => creators.filter((creator) => {
    const searchable = `${creator.name} ${creator.skill} ${creator.city} ${creator.category}`.toLowerCase();
    return (category === 'All' || creator.category === category) && searchable.includes(query.toLowerCase().trim());
  }), [category, query]);

  const handleBook = (creator: Creator) => setSelectedCreator(creator);
  const confirmBooking = () => {
    if (selectedCreator) {
      setBooked(selectedCreator.id);
      setSelectedCreator(null);
    }
  };
  const toggleLike = (id: string) => setLiked((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  return (
    <div className="grain min-h-[100dvh] overflow-x-hidden bg-[#fff8ea] text-[#302044]">
      <header className="absolute inset-x-0 top-0 z-30">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8" aria-label="Main navigation">
          <a href="#top" className="flex items-center gap-2" data-testid="link-logo">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#ff735c] text-lg font-extrabold text-[#302044]">S</span>
            <span className="font-display text-xl font-bold tracking-[-.04em] text-[#fff8ea]">skillswap<span className="text-[#f8bf4f]">.</span></span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-semibold text-[#eee5dc]/80 md:flex">
            <a href="#discover" className="transition-colors hover:text-[#f8bf4f]" data-testid="link-discover">Discover talent</a>
            <a href="#how-it-works" className="transition-colors hover:text-[#f8bf4f]" data-testid="link-how-it-works">How it works</a>
            <a href="#trust" className="transition-colors hover:text-[#f8bf4f]" data-testid="link-trust">Why SkillSwap</a>
          </div>
          <button className="hidden rounded-full border border-[#f4e9de]/25 px-4 py-2 text-sm font-bold text-[#fff8ea] transition-colors hover:border-[#f8bf4f] hover:text-[#f8bf4f] md:block" onClick={() => setCreatorIntent(true)} data-testid="button-nav-become-creator">Become a creator <ArrowRight className="ml-1 inline h-4 w-4" /></button>
          <button className="rounded-full p-2 text-[#fff8ea] md:hidden" onClick={() => setMobileOpen((open) => !open)} aria-label="Toggle menu" data-testid="button-mobile-menu">{mobileOpen ? <X /> : <Menu />}</button>
        </nav>
        {mobileOpen && <div className="mx-5 rounded-2xl border border-white/10 bg-[#3a2650] p-4 shadow-xl md:hidden">
          <a href="#discover" onClick={() => setMobileOpen(false)} className="block border-b border-white/10 px-3 py-3 text-sm font-semibold text-[#fff8ea]" data-testid="link-mobile-discover">Discover talent</a>
          <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="block border-b border-white/10 px-3 py-3 text-sm font-semibold text-[#fff8ea]" data-testid="link-mobile-how">How it works</a>
          <button onClick={() => { setCreatorIntent(true); setMobileOpen(false); }} className="w-full px-3 py-3 text-left text-sm font-semibold text-[#f8bf4f]" data-testid="button-mobile-creator">Become a creator <ArrowRight className="ml-1 inline h-4 w-4" /></button>
        </div>}
      </header>

      <main id="top">
        <section className="hero-grid relative min-h-[720px] overflow-hidden bg-[#302044] text-[#fff8ea]">
          <div className="absolute -right-20 top-24 h-72 w-72 rounded-full bg-[#ff735c]/20 blur-3xl" />
          <div className="absolute bottom-[-180px] left-[42%] h-96 w-96 rounded-full bg-[#f8bf4f]/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-40 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pt-44">
            <div className="relative z-10 max-w-3xl">
              <div className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-[#f4e9de]/15 bg-white/[.06] px-3 py-2 font-mono-ui text-[10px] uppercase tracking-[.18em] text-[#f8bf4f]"><span className="h-1.5 w-1.5 rounded-full bg-[#54c2ad]" /> Built for the next generation</div>
              <h1 className="reveal reveal-delay-1 font-display text-[clamp(3.2rem,7.5vw,7.25rem)] font-bold leading-[.93] tracking-[-.07em] text-balance">Your skills deserve a <span className="text-[#ff735c]">stage</span> — and a <span className="relative inline-block text-[#f8bf4f]">payday.<span className="absolute -bottom-2 left-1 h-1.5 w-16 -rotate-2 rounded-full bg-[#ff735c]" /></span></h1>
              <p className="reveal reveal-delay-2 mt-8 max-w-lg text-lg leading-8 text-[#eee5dc]/75">SkillSwap connects young creators with real paid opportunities.</p>
              <div className="reveal reveal-delay-3 mt-9 flex flex-wrap gap-3">
                <a href="#discover" className="group inline-flex items-center gap-2 rounded-full bg-[#ff735c] px-5 py-3.5 text-sm font-extrabold text-[#302044] transition-transform hover:-translate-y-1" data-testid="link-explore-talent">Explore talent <ArrowDownRight className="h-4 w-4 transition-transform group-hover:rotate-[-45deg]" /></a>
                <button onClick={() => setCreatorIntent(true)} className="inline-flex items-center gap-2 rounded-full border border-[#f4e9de]/25 px-5 py-3.5 text-sm font-extrabold text-[#fff8ea] transition-colors hover:border-[#f8bf4f] hover:text-[#f8bf4f]" data-testid="button-become-creator">Become a creator <ArrowRight className="h-4 w-4" /></button>
              </div>
              <div className="reveal reveal-delay-4 mt-12 flex items-center gap-3 text-sm text-[#eee5dc]/65">
                <div className="flex -space-x-2">{['AS', 'KN', 'MI', 'IV'].map((initial, index) => <span key={initial} className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#302044] text-[10px] font-bold text-[#302044]" style={{ backgroundColor: ['#ff735c', '#f8bf4f', '#54c2ad', '#a77bfa'][index] }}>{initial}</span>)}</div>
                <span><strong className="text-[#fff8ea]">2,400+</strong> student creators already building</span>
              </div>
            </div>
            <div className="relative hidden min-h-[400px] lg:block">
              <div className="float-slow absolute right-5 top-8 w-72 rotate-[-5deg] rounded-[2rem] bg-[#f8bf4f] p-3 text-[#302044] shadow-2xl shadow-black/20">
                <div className="flex aspect-[1.08] items-end rounded-[1.35rem] bg-[#dd7257] p-5"><div><span className="font-mono-ui text-[10px] uppercase tracking-widest opacity-60">new project</span><p className="mt-1 font-display text-3xl font-bold leading-none">make it<br />memorable.</p></div></div>
                <div className="flex items-center justify-between px-2 pb-1 pt-4 text-xs font-bold"><span>Aanya / video</span><span className="font-mono-ui text-[10px]">₹1,200+</span></div>
              </div>
              <div className="absolute bottom-7 left-2 w-60 rotate-[7deg] rounded-[1.75rem] bg-[#fff8ea] p-4 text-[#302044] shadow-2xl shadow-black/20">
                <div className="mb-5 flex items-center justify-between"><div className="grid h-10 w-10 place-items-center rounded-full bg-[#54c2ad] text-xs font-bold">MI</div><span className="rounded-full bg-[#eaf5ef] px-2 py-1 font-mono-ui text-[9px] text-[#287b69]">VERIFIED</span></div>
                <p className="font-display text-xl font-bold">Maths,<br />made less scary.</p>
                <div className="mt-6 flex items-center gap-1 text-xs font-bold"><Star className="h-3.5 w-3.5 fill-[#f8bf4f] text-[#f8bf4f]" /> 4.8 <span className="ml-auto font-mono-ui text-[10px] font-normal opacity-60">₹450 / session</span></div>
              </div>
              <div className="absolute right-0 top-[-8px] grid h-20 w-20 place-items-center rounded-full border border-[#ff735c]/60 bg-[#ff735c] text-center text-[10px] font-extrabold uppercase leading-3 tracking-wider text-[#302044]">your<br />next<br />move <ArrowDownRight className="mx-auto mt-1 h-4 w-4" /></div>
            </div>
          </div>
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#fff8ea] to-transparent" />
        </section>

        <section id="discover" className="scroll-mt-10 px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <div className="mb-4 flex items-center gap-2 font-mono-ui text-[10px] font-medium uppercase tracking-[.22em] text-[#e35d48]"><span className="h-px w-8 bg-[#e35d48]" /> Fresh on SkillSwap</div>
                <h2 className="font-display text-4xl font-bold tracking-[-.05em] md:text-6xl">Find your <span className="text-[#e35d48]">person.</span></h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-[#6b5d6c]">The right collaborator can turn a maybe into a launch. Browse the people making good work from hostels, bedrooms and coffee shops across India.</p>
              </div>
              <div className="font-mono-ui text-xs text-[#6b5d6c]"><span className="text-2xl font-bold text-[#302044]">{filteredCreators.length}</span> creators in your orbit</div>
            </div>
            <div className="mb-8 flex flex-col gap-4">
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8e7c83]" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Try “video”, “logo”, “music”..." className="h-13 w-full rounded-2xl border border-[#e2d5c9] bg-[#fffdf7] py-3 pl-11 pr-4 text-sm outline-none transition-shadow placeholder:text-[#9b8f90] focus:border-[#ff735c] focus:ring-4 focus:ring-[#ff735c]/10" data-testid="input-search-creators" />
              </div>
              <div className="flex flex-wrap gap-2">
                {(['All', 'Video', 'Design', 'Tutoring', 'Music'] as Category[]).map((item) => <button key={item} onClick={() => setCategory(item)} className={`rounded-full border px-4 py-2 text-xs font-bold transition-colors ${category === item ? 'border-[#302044] bg-[#302044] text-[#fff8ea]' : 'border-[#e2d5c9] bg-[#fffdf7] text-[#6b5d6c] hover:border-[#ff735c] hover:text-[#e35d48]'}`} data-testid={`button-filter-${item.toLowerCase()}`}>{item === 'All' ? 'Everything' : item}</button>)}
              </div>
            </div>
            {filteredCreators.length > 0 ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filteredCreators.map((creator, index) => <article key={creator.id} className="group relative overflow-hidden rounded-[1.5rem] border border-[#e2d5c9] bg-[#fffdf7] transition-all duration-300 hover:-translate-y-1 hover:border-[#ff735c]/50 hover:shadow-xl hover:shadow-[#6c3450]/10" style={{ animationDelay: `${index * 70}ms` }} data-testid={`card-creator-${creator.id}`}>
              <div className="relative h-48 overflow-hidden p-5" style={{ backgroundColor: creator.accent }}>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#302044 1px, transparent 1px)', backgroundSize: '13px 13px' }} />
                <div className="relative flex items-start justify-between"><span className="rounded-full bg-[#302044]/90 px-2.5 py-1 font-mono-ui text-[9px] font-medium tracking-wider text-[#fff8ea]">{creator.category.toUpperCase()}</span><button onClick={() => toggleLike(creator.id)} className={`grid h-9 w-9 place-items-center rounded-full bg-[#fff8ea]/75 transition-colors hover:bg-[#fff8ea] ${liked.includes(creator.id) ? 'text-[#e35d48]' : 'text-[#302044]'}`} aria-label={`Save ${creator.name}`} data-testid={`button-like-${creator.id}`}><Heart className={`h-4 w-4 ${liked.includes(creator.id) ? 'fill-current' : ''}`} /></button></div>
                <div className="absolute bottom-5 left-5 font-display text-4xl font-bold tracking-[-.06em] text-[#302044]">{creator.poster}</div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3"><div><h3 className="font-display text-xl font-bold tracking-[-.035em]" data-testid={`text-creator-name-${creator.id}`}>{creator.name}</h3><p className="mt-1 text-xs text-[#7e7074]">{creator.city}</p></div><span className="flex items-center gap-1 rounded-full bg-[#fff1c8] px-2 py-1 font-mono-ui text-[10px] font-medium text-[#755b1d]"><Star className="h-3 w-3 fill-current" /> {creator.rating} <span className="opacity-60">({creator.reviews})</span></span></div>
                <p className="mt-4 font-semibold text-[#e35d48]" data-testid={`text-skill-${creator.id}`}>{creator.skill}</p><p className="mt-1 text-sm leading-6 text-[#6b5d6c]">{creator.description}</p>
                <div className="mt-5 flex items-end justify-between border-t border-[#eaded2] pt-4"><div><p className="font-mono-ui text-[9px] uppercase tracking-wider text-[#9b8f90]">Starting at</p><p className="mt-1 flex items-center font-mono-ui text-sm font-bold"><IndianRupee className="h-3.5 w-3.5" />{creator.price}</p></div><button onClick={() => handleBook(creator)} className={`rounded-full px-4 py-2.5 text-xs font-extrabold transition-transform hover:-translate-y-0.5 ${booked === creator.id ? 'bg-[#54c2ad] text-[#173d36]' : 'bg-[#302044] text-[#fff8ea] hover:bg-[#e35d48]'}`} data-testid={`button-book-${creator.id}`}>{booked === creator.id ? <><Check className="mr-1 inline h-3.5 w-3.5" /> Request sent</> : 'Book'}</button></div>
                <p className="mt-3 flex items-center gap-1.5 text-[11px] text-[#7e7074]"><Clock3 className="h-3 w-3" /> {creator.available}</p>
              </div>
            </article>)}</div> : <div className="rounded-3xl border border-dashed border-[#ddcbbd] bg-[#fffdf7] px-5 py-16 text-center"><Search className="mx-auto h-7 w-7 text-[#e35d48]" /><h3 className="mt-4 font-display text-2xl font-bold">No one by that name yet.</h3><p className="mt-2 text-sm text-[#7e7074]">Try another skill or clear your search.</p><button onClick={() => { setQuery(''); setCategory('All'); }} className="mt-5 rounded-full bg-[#302044] px-4 py-2 text-xs font-bold text-[#fff8ea]" data-testid="button-clear-search">Show everyone</button></div>}
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-10 bg-[#f3e9d7] px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
              <div><div className="mb-4 flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[.22em] text-[#287b69]"><span className="h-px w-8 bg-[#287b69]" /> No awkward cold DMs</div><h2 className="font-display text-4xl font-bold leading-[.98] tracking-[-.05em] md:text-6xl">From “I could”<br />to <span className="text-[#287b69]">“it’s live.”</span></h2><p className="mt-6 max-w-sm text-base leading-7 text-[#6b5d6c]">A little structure makes brave work feel possible. SkillSwap keeps the humans in charge and the friction out of the way.</p></div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[{ no: '01', icon: Search, title: 'Find your fit', text: 'Search by skill, style or city. Stalk the portfolio, not the algorithm.' }, { no: '02', icon: MessageCircle, title: 'Start the brief', text: 'Share what you need, agree on a scope and make the first move.' }, { no: '03', icon: TrendingUp, title: 'Make it happen', text: 'Track the milestone, leave a review and come back for round two.' }].map((step) => <div key={step.no} className="rounded-3xl border border-[#dacdbb] bg-[#fff8ea] p-5 sm:p-6"><span className="font-mono-ui text-xs text-[#e35d48]">{step.no}</span><step.icon className="mt-12 h-6 w-6 text-[#287b69]" /><h3 className="mt-5 font-display text-xl font-bold leading-tight">{step.title}</h3><p className="mt-3 text-sm leading-6 text-[#6b5d6c]">{step.text}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="trust" className="scroll-mt-10 bg-[#fff8ea] px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-2xl"><div className="mb-4 flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[.22em] text-[#e35d48]"><span className="h-px w-8 bg-[#e35d48]" /> More than a marketplace</div><h2 className="font-display text-4xl font-bold tracking-[-.05em] md:text-6xl">Good work needs<br /><span className="text-[#e35d48]">good ground.</span></h2></div>
            <div className="grid gap-4 md:grid-cols-4">{[{ icon: BriefcaseBusiness, title: 'Portfolio first', text: 'See the work before you send the brief. No mystery meat profiles.' }, { icon: BadgeCheck, title: 'Verified profiles', text: 'Real students, real skills and a little green tick you can trust.' }, { icon: Star, title: 'Reviews that matter', text: 'Honest feedback from people who have actually worked together.' }, { icon: ShieldCheck, title: 'Milestone payments', text: 'Your money moves when the work does. Simple, safe, fair.' }].map(({ icon: Icon, title, text }) => <div key={title} className="rounded-[1.5rem] bg-[#302044] p-6 text-[#fff8ea] transition-transform hover:-translate-y-1"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#f8bf4f] text-[#302044]"><Icon className="h-5 w-5" /></div><h3 className="mt-8 font-display text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#eee5dc]/70">{text}</p></div>)}</div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-5 rounded-3xl border border-[#dfcfbd] bg-[#f7eddd] px-6 py-5"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#54c2ad] text-[#173d36]"><FileCheck2 className="h-5 w-5" /></div><div><p className="text-sm font-bold">Built for the first paid gig</p><p className="text-xs text-[#7e7074]">Clear briefs. Fair rates. No gatekeeping.</p></div></div><span className="font-mono-ui text-xs text-[#287b69]">SAFE BY DESIGN / 01</span></div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#e35d48] px-5 py-24 text-[#302044] lg:px-8 lg:py-32">
          <div className="absolute -right-10 top-8 h-64 w-64 rounded-full border-[35px] border-[#f8bf4f]/40" /><div className="absolute bottom-[-100px] left-[-60px] h-72 w-72 rounded-full bg-[#f8bf4f]/25" />
          <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-12 lg:flex-row lg:items-end"><div className="max-w-3xl"><span className="font-mono-ui text-[10px] font-medium uppercase tracking-[.2em] text-[#302044]/65">The SkillSwap thesis</span><h2 className="mt-5 font-display text-5xl font-bold leading-[.93] tracking-[-.07em] md:text-8xl">Talent is everywhere.<br /><span className="text-[#fff8ea]">Opportunity isn’t.</span></h2></div><div className="max-w-xs"><p className="text-lg font-semibold leading-7">So we’re making the bridge shorter.</p><p className="mt-3 text-sm leading-6 text-[#302044]/70">For the student who has the skill but not the network. For the scrappy team with a deadline and a small budget. This is your starting line.</p><button onClick={() => setCreatorIntent(true)} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#302044] px-5 py-3 text-sm font-bold text-[#fff8ea] transition-transform hover:-translate-y-1" data-testid="button-pitch-join">Get in the room <ArrowRight className="h-4 w-4" /></button></div></div>
        </section>

        <section className="bg-[#302044] px-5 py-16 text-[#fff8ea] lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_.6fr_.6fr]"><div><a href="#top" className="flex items-center gap-2" data-testid="link-footer-logo"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#ff735c] text-sm font-extrabold text-[#302044]">S</span><span className="font-display text-xl font-bold tracking-[-.04em]">skillswap<span className="text-[#f8bf4f]">.</span></span></a><p className="mt-5 max-w-xs text-sm leading-6 text-[#eee5dc]/60">Turn what you know into where you’re going.</p></div><div><p className="font-mono-ui text-[10px] uppercase tracking-wider text-[#f8bf4f]">Explore</p><div className="mt-4 flex flex-col gap-3 text-sm text-[#eee5dc]/70"><a href="#discover" className="hover:text-[#fff8ea]" data-testid="link-footer-discover">Find a creator</a><a href="#how-it-works" className="hover:text-[#fff8ea]" data-testid="link-footer-how">How it works</a></div></div><div><p className="font-mono-ui text-[10px] uppercase tracking-wider text-[#f8bf4f]">The pitch</p><p className="mt-4 text-sm leading-6 text-[#eee5dc]/70">Made for the next 2,400 people with a skill to share.</p></div></div>
          <div className="mx-auto mt-14 flex max-w-7xl flex-col justify-between gap-3 border-t border-[#f4e9de]/10 pt-5 font-mono-ui text-[10px] text-[#eee5dc]/40 sm:flex-row"><span>© 2024 SKILLSWAP / INDIA</span><span>DESIGNED FOR MOMENTUM</span></div>
        </section>
      </main>

      {(selectedCreator || creatorIntent) && <div className="fixed inset-0 z-50 grid place-items-center bg-[#302044]/75 px-5 py-8 backdrop-blur-sm" role="dialog" aria-modal="true" onClick={() => { setSelectedCreator(null); setCreatorIntent(false); }}>
        <div className="modal-in relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[1.75rem] bg-[#fff8ea] p-6 text-[#302044] shadow-2xl sm:p-8" onClick={(event) => event.stopPropagation()}>
          <button onClick={() => { setSelectedCreator(null); setCreatorIntent(false); }} className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-[#f1e4d6] text-[#6b5d6c] hover:bg-[#ead8c7]" aria-label="Close dialog" data-testid="button-close-modal"><X className="h-4 w-4" /></button>
          {creatorIntent ? <><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#f8bf4f]"><Sparkles className="h-6 w-6" /></div><h2 className="mt-6 font-display text-3xl font-bold tracking-[-.05em]">Your skill has a<br /><span className="text-[#e35d48]">place here.</span></h2><p className="mt-3 text-sm leading-6 text-[#6b5d6c]">We’re opening the next wave of creator profiles soon. Leave your details and we’ll save you a front-row spot.</p><label className="mt-6 block text-xs font-bold">Your email<input type="email" placeholder="you@campus.in" className="mt-2 h-12 w-full rounded-xl border border-[#dfcfbd] bg-[#fffdf7] px-4 text-sm outline-none focus:border-[#ff735c]" data-testid="input-creator-email" /></label><button onClick={() => { setCreatorIntent(false); setBooked('creator'); }} className="mt-5 w-full rounded-full bg-[#302044] py-3.5 text-sm font-bold text-[#fff8ea] hover:bg-[#e35d48]" data-testid="button-creator-submit">Save my spot <ArrowRight className="ml-1 inline h-4 w-4" /></button></> : selectedCreator && <><div className="flex items-center gap-3"><div className="grid h-14 w-14 place-items-center rounded-2xl text-sm font-bold text-[#302044]" style={{ backgroundColor: selectedCreator.accent }}>{selectedCreator.initials}</div><div><p className="font-mono-ui text-[10px] uppercase tracking-wider text-[#e35d48]">Book a creator</p><h2 className="font-display text-2xl font-bold">{selectedCreator.name}</h2></div></div><div className="mt-7 rounded-2xl bg-[#f3e9d7] p-4"><p className="font-semibold">{selectedCreator.skill}</p><p className="mt-2 text-sm leading-6 text-[#6b5d6c]">{selectedCreator.description}</p><div className="mt-4 flex items-center justify-between border-t border-[#dacdbb] pt-3 text-xs"><span>Starting price</span><strong className="flex items-center font-mono-ui"><IndianRupee className="h-3 w-3" />{selectedCreator.price}</strong></div></div><label className="mt-6 block text-xs font-bold">What are you working on?<textarea rows={3} placeholder="Tell them the one thing you want to make..." className="mt-2 w-full resize-none rounded-xl border border-[#dfcfbd] bg-[#fffdf7] p-3 text-sm outline-none focus:border-[#ff735c]" data-testid="input-booking-brief" /></label><div className="mt-5 flex items-start gap-2 text-xs leading-5 text-[#6b5d6c]"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#287b69]" /> Your request is free to send. Payment only moves when you approve the milestone.</div><button onClick={confirmBooking} className="mt-6 w-full rounded-full bg-[#ff735c] py-3.5 text-sm font-extrabold text-[#302044] hover:bg-[#f8bf4f]" data-testid="button-confirm-booking">Send booking request <ArrowRight className="ml-1 inline h-4 w-4" /></button></>}
        </div>
      </div>}
      {booked === 'creator' && <div className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 rounded-full bg-[#54c2ad] px-5 py-3 text-sm font-bold text-[#173d36] shadow-xl" role="status" data-testid="status-creator-saved"><Check className="mr-1 inline h-4 w-4" /> You’re on the list. See you in the room.</div>}
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
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
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
