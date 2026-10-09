import { createFileRoute } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import { ArrowUpRight, ArrowRight, ArrowDown, Menu, X, Heart, BriefcaseBusiness, Sparkles, Wine, CalendarDays, Download, Flower2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import hall from '@/assets/chida-hall.jpg';
import details from '@/assets/chida-details.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Chida Event Centre | A setting for unforgettable moments' },
    { name: 'description', content: 'Discover Chida Event Centre. Explore a beautiful setting for weddings, corporate gatherings and special celebrations, and plan your next event.' },
    { property: 'og:title', content: 'Chida Event Centre | Unforgettable celebrations' },
    { property: 'og:description', content: 'A beautiful setting for weddings, corporate gatherings and life’s special celebrations.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

function Brand() {
  return <a href="#home" className="brand" aria-label="Chida Event Centre home">
    <svg className="brand-emblem" viewBox="0 0 44 52" fill="none" aria-hidden="true"><path d="M22 2 41 12v27L22 50 3 39V12L22 2Z" stroke="currentColor" strokeWidth="1"/><path d="M22 7 36 15v21l-14 9-14-9V15l14-8Z" stroke="currentColor" strokeWidth=".6"/><path d="M29 19c-2-4-12-4-15 3-5 11 7 18 15 10M22 11v30" stroke="currentColor" strokeWidth="1.2"/><path d="m17 12 5-5 5 5M17 41l5 4 5-4" stroke="currentColor"/></svg>
    <span><span className="brand-name">CHIDA</span><span className="brand-sub">Event Centre</span></span>
  </a>;
}

const links = [['Home', '#home'], ['About us', '#about'], ['Our events', '#events'], ['Gallery', '#gallery'], ['Contact', '#contact']];
const eventTypes = [
  { icon: Heart, name: 'Weddings', description: 'From the first entrance to the last dance. A beautiful backdrop for the beginning of your forever.' },
  { icon: BriefcaseBusiness, name: 'Corporate events', description: 'Bring people and ideas together. Set the scene for conferences, launches and meaningful connections.' },
  { icon: Sparkles, name: 'Special celebrations', description: 'Milestone birthdays, anniversaries and everything worth celebrating. Make the occasion truly yours.' },
];

function Index() {
  const [menu, setMenu] = useState(false);
  const [booking, setBooking] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState(false);
  function prepareEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = `CHIDA EVENT CENTRE — EVENT ENQUIRY\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nEvent: ${data.get('event')}\nPreferred date: ${data.get('date')}\nGuests: ${data.get('guests')}\n\nThis is an enquiry draft, not a confirmed booking. Contact the venue to discuss availability.`;
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
    const a = document.createElement('a'); a.href = url; a.download = 'chida-event-enquiry.txt'; a.click(); URL.revokeObjectURL(url); setDownloaded(true);
  }
  const openBooking = () => { setDownloaded(false); setBooking(true); setMenu(false); };
  return <>
    <header className="site-header" id="home">
      <Brand />
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([name, href], i) => <a key={name} href={href} className={`nav-link ${i === 0 ? 'active' : ''}`}>{name}</a>)}
        <Button variant="venue" onClick={openBooking}>Plan your event <ArrowUpRight /></Button>
      </nav>
      <Button variant="ghost" size="icon" className="mobile-menu" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</Button>
      {menu && <nav className="mobile-nav" aria-label="Mobile navigation">{links.map(([name, href]) => <a key={name} href={href} onClick={() => setMenu(false)}>{name}</a>)}<Button variant="venue" onClick={openBooking}>Plan your event <ArrowUpRight /></Button></nav>}
    </header>
    <main>
      <section className="hero" aria-label="Chida Event Centre">
        <img className="hero-image" src={hall} alt="Illustrative chandelier-lit event hall with elegant wedding table settings" width={1920} height={1088} fetchPriority="high" />
        <div className="hero-content">
          <div className="eyebrow">A place for beautiful beginnings</div>
          <h1>Chida Event Centre.<br /><em>Moments to remember.</em></h1>
          <p className="hero-copy">A beautiful setting. A personal touch.<br />Celebrate life’s most meaningful occasions<br className="hidden sm:block" /> in a place as special as your story.</p>
          <div className="hero-actions"><Button variant="invitation" onClick={openBooking}>Plan your event <ArrowUpRight /></Button><Button variant="glass" asChild><a href="#gallery">Explore the venue <ArrowRight /></a></Button></div>
        </div>
        <div className="hero-bottom"><span><Flower2 size={14} /> Celebrations, beautifully brought together</span><span className="photo-note">Illustrative venue imagery</span><a className="scroll-label" href="#about" aria-label="Discover Chida">Discover more &nbsp; <ArrowDown size={13} className="inline" /></a></div>
      </section>
      <div className="occasion-strip">{[[Heart, 'Weddings & receptions'], [BriefcaseBusiness, 'Corporate gatherings'], [Wine, 'Private celebrations'], [Sparkles, 'Unforgettable moments']].map(([Icon, title]) => { const Symbol = Icon as typeof Heart; return <span key={String(title)}><Symbol strokeWidth={1.3} />{String(title)}</span>; })}</div>
      <section className="section introduction" id="about">
        <div><div className="eyebrow text-muted-foreground">Welcome to Chida</div><h2>More than a venue.<br /><em>A part of your story.</em></h2><p>Some moments deserve an extraordinary setting. At Chida Event Centre, your occasion takes centre stage — from intimate gatherings to grand celebrations.</p><p>Gather your favourite people, bring your vision, and imagine a celebration that feels entirely your own.</p><Button variant="link" className="px-0 mt-3" asChild><a href="#events">Find your occasion <ArrowUpRight /></a></Button></div>
        <div className="intro-photo-wrap"><img className="intro-photo" src={details} width={1024} height={1024} loading="lazy" alt="Illustrative elegant floral table setting with crystal glassware and green linens" /></div>
      </section>
      <section id="events" className="bg-secondary"><div className="section"><div className="section-heading"><div><div className="eyebrow text-muted-foreground">Every occasion, thoughtfully celebrated</div><h2>Your occasion. <em>Your way.</em></h2></div><p>A setting for the moments that matter.</p></div><div className="events-grid">{eventTypes.map(({ icon: Icon, name, description }) => <article className="event-item" key={name}><Icon strokeWidth={1.2} /><h3>{name}</h3><p>{description}</p><Button variant="link" className="px-0 mt-2" onClick={openBooking}>Let’s plan it <ArrowUpRight /></Button></article>)}</div></div></section>
      <section className="section" id="gallery"><div className="section-heading"><div><div className="eyebrow text-muted-foreground">A little inspiration</div><h2>Picture your <em>perfect day.</em></h2></div><span className="text-xs text-muted-foreground">Illustrative imagery · Select to view</span></div><div className="gallery-grid"><Button variant="ghost" className="gallery-trigger" aria-label="View event hall image" onClick={() => setSelectedPhoto(hall)}><img src={hall} width={1920} height={1088} loading="lazy" alt="Illustrative grand event hall" /></Button><Button variant="ghost" className="gallery-trigger" aria-label="View table setting image" onClick={() => setSelectedPhoto(details)}><img src={details} width={1024} height={1024} loading="lazy" alt="Illustrative reception table details" /></Button></div></section>
      <section className="contact-band" id="contact"><div className="eyebrow">Let’s make it memorable</div><h2>A special occasion starts<br />with <em>a conversation.</em></h2><p>Your vision. Your people. Your moment.</p><Button variant="invitation" onClick={openBooking}>Plan your event <CalendarDays /></Button></section>
    </main>
    <footer className="footer"><Brand /><span>© {new Date().getFullYear()} Chida Event Centre. All rights reserved.</span><a href="#home" className="flex items-center gap-2">Back to top <ArrowUpRight size={13} /></a></footer>
    <Dialog open={booking} onOpenChange={setBooking}><DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md max-h-[90dvh] overflow-y-auto"><DialogTitle className="font-display text-3xl font-normal">Your next beautiful occasion</DialogTitle><DialogDescription>Prepare your event details. Enquiries are not sent online yet; save a copy to share with the venue.</DialogDescription><form className="enquiry-form" onSubmit={prepareEnquiry}><label>Your name<input name="name" autoComplete="name" required placeholder="Full name" /></label><label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label><label>Occasion<select name="event"><option>Wedding or reception</option><option>Corporate event</option><option>Birthday or anniversary</option><option>Other celebration</option></select></label><div className="form-row"><label>Preferred date<input name="date" type="date" required /></label><label>Number of guests<input name="guests" type="number" min="1" required placeholder="Guests" /></label></div><Button variant="venue" type="submit"><Download /> Save enquiry details</Button>{downloaded && <p role="status" className="text-sm text-primary">Your enquiry draft has been downloaded. A booking has not been made.</p>}</form></DialogContent></Dialog>
    <Dialog open={selectedPhoto !== null} onOpenChange={open => { if (!open) setSelectedPhoto(null); }}><DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-5xl"><DialogTitle>Celebration inspiration</DialogTitle><DialogDescription>Illustrative imagery, not photographs of the actual venue.</DialogDescription>{selectedPhoto && <img src={selectedPhoto} alt="Event venue inspiration, enlarged" className="w-full max-h-[70dvh] object-contain" />}</DialogContent></Dialog>
  </>;
}
