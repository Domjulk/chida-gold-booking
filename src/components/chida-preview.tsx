import { useState, type FormEvent } from 'react';
import { ArrowDown, ArrowRight, CalendarDays, Check, Clock3, MapPin, Phone, Sparkles, Users } from 'lucide-react';
import hallPhoto from '@/assets/chida-hall.jpg';
import detailsPhoto from '@/assets/chida-details.jpg';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const guestReviews = [
  {
    name: 'Omenogo The4th',
    quote:
      "It's a big and well designed event center, I love the chandeliers and all the lighting there, the setup too isn't bad and the environment is also very clean, I can categorically recommend that this is definitely one of the best event centers in Abuja. I haven't visited the hotel yet, but at least I can still vouch for this.",
  },
  { name: 'Abu Ugbede', quote: 'We had a great time there.' },
  {
    name: 'Afolayan Sunday',
    quote: 'The event center is a good place to be, facilities perfect for successful execution of any conference',
  },
];

function CallLink({ className = '' }: { className?: string }) {
  return (
    <Button asChild variant="invitation" className={className}>
      <a href="tel:08100718883"><Phone aria-hidden="true" />Call 0810 071 8883</a>
    </Button>
  );
}

function EnquiryDialog() {
  const [downloaded, setDownloaded] = useState(false);

  function downloadDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const draft = [
      'Chida Event Centre — event enquiry draft',
      '',
      `Name: ${fields.get('name') || 'Not provided'}`,
      `Event: ${fields.get('event') || 'Not provided'}`,
      `Preferred date: ${fields.get('date') || 'Not provided'}`,
      `Approximate guests: ${fields.get('guests') || 'Not provided'}`,
      `Contact number: ${fields.get('contact') || 'Not provided'}`,
      '',
      'Please call 0810 071 8883 to discuss this enquiry.',
    ].join('\n');
    const url = URL.createObjectURL(new Blob([draft], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'chida-event-enquiry.txt';
    link.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="glass" className="enquiry-trigger">Plan your event <ArrowRight aria-hidden="true" /></Button>
      </DialogTrigger>
      <DialogContent className="enquiry-dialog">
        <DialogHeader>
          <span className="eyebrow">Start a conversation</span>
          <DialogTitle className="dialog-title">Tell us about your event</DialogTitle>
          <DialogDescription>Your details stay on this device. Download an enquiry draft, then call Chida Event Centre to discuss it.</DialogDescription>
        </DialogHeader>
        <form className="enquiry-form" onSubmit={downloadDraft}>
          <label>Name <input name="name" autoComplete="name" placeholder="Your name" /></label>
          <label>Occasion
            <select name="event" defaultValue="">
              <option value="" disabled>Select an occasion</option>
              <option>Wedding or reception</option>
              <option>Conference or meeting</option>
              <option>Private celebration</option>
            </select>
          </label>
          <div className="form-row">
            <label>Preferred date <input name="date" type="date" /></label>
            <label>Approx. guests <input name="guests" inputMode="numeric" placeholder="e.g. 150" /></label>
          </div>
          <label>Contact number <input name="contact" type="tel" autoComplete="tel" placeholder="Your phone number" /></label>
          <Button type="submit" variant="venue" className="download-button"><ArrowDown aria-hidden="true" />Download enquiry draft</Button>
          {downloaded && <p className="download-confirmation" role="status"><Check aria-hidden="true" />Draft downloaded. Call 0810 071 8883 to follow up.</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
}

function GalleryImage({ src, alt, label, className }: { src: string; alt: string; label: string; className: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className={`gallery-trigger ${className}`} aria-label={`Enlarge image: ${label}`}>
          <img src={src} alt={alt} loading="lazy" />
          <span className="gallery-caption">{label}<ArrowRight aria-hidden="true" /></span>
        </Button>
      </DialogTrigger>
      <DialogContent className="lightbox-dialog">
        <DialogTitle className="sr-only">{label}</DialogTitle>
        <img src={src} alt={alt} />
      </DialogContent>
    </Dialog>
  );
}

export function ChidaPreview() {
  return (
    <div className="chida-site">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Chida Event Centre home">
          <span className="brand-emblem" aria-hidden="true">C</span>
          <span><span className="brand-name">CHIDA</span><span className="brand-sub">Event Centre · Abuja</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a className="nav-link" href="#occasions">Occasions</a>
          <a className="nav-link" href="#about">About</a>
          <a className="nav-link" href="#reviews">Reviews</a>
          <a className="nav-link" href="#visit">Visit</a>
          <CallLink className="header-call" />
        </nav>
        <CallLink className="mobile-header-call" />
      </header>

      <main>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <img className="hero-image" src={hallPhoto} alt="Illustrative photograph of an elegant event hall" fetchPriority="high" />
          <div className="hero-content">
            <span className="eyebrow">A place for life’s special moments</span>
            <h1 id="hero-title">Moments<br />to <em>remember.</em></h1>
            <p className="hero-copy">A welcoming setting for weddings, conferences and celebrations in Abuja.</p>
            <div className="hero-actions">
              <CallLink className="hero-call" />
              <a className="text-link" href="#occasions">Discover Chida <ArrowRight aria-hidden="true" /></a>
              <EnquiryDialog />
            </div>
          </div>
          <div className="hero-bottom"><span><MapPin aria-hidden="true" />Abuja, Nigeria</span><span className="photo-note">Illustrative venue photography</span></div>
        </section>

        <section className="occasion-strip" id="occasions" aria-label="Occasions">
          <span><Sparkles aria-hidden="true" />Weddings & receptions</span>
          <span><Users aria-hidden="true" />Conferences & meetings</span>
          <span><CalendarDays aria-hidden="true" />Private celebrations</span>
        </section>

        <section className="section introduction" id="about">
          <div className="intro-copy">
            <span className="eyebrow">The Chida experience</span>
            <h2>A memorable setting<br />for every occasion.</h2>
            <p>From joyful wedding receptions to focused conferences and intimate celebrations, Chida Event Centre offers a place to bring people together in Abuja.</p>
            <a className="inline-link" href="#visit">Find out more <ArrowRight aria-hidden="true" /></a>
          </div>
          <div className="intro-photo-wrap">
            <img className="intro-photo" src={detailsPhoto} alt="Illustrative detail of an event venue" loading="lazy" />
            <span className="photo-label">Illustrative venue photography</span>
          </div>
        </section>

        <section className="section events-section" aria-labelledby="services-title">
          <div className="section-heading">
            <div><span className="eyebrow">Gather beautifully</span><h2 id="services-title">Made for your moments.</h2></div>
            <p>Every occasion deserves a thoughtful setting.</p>
          </div>
          <div className="events-grid">
            <article className="event-item"><span className="event-number">01</span><Sparkles aria-hidden="true" /><h3>Weddings & receptions</h3><p>Celebrate your special day with family and friends in Abuja.</p></article>
            <article className="event-item"><span className="event-number">02</span><Users aria-hidden="true" /><h3>Conferences & meetings</h3><p>Bring your colleagues and guests together for a shared purpose.</p></article>
            <article className="event-item"><span className="event-number">03</span><CalendarDays aria-hidden="true" /><h3>Private celebrations</h3><p>Mark birthdays, anniversaries and the moments in between.</p></article>
          </div>
        </section>

        <section className="gallery-section" aria-labelledby="gallery-title">
          <div className="section gallery-inner">
            <div className="section-heading"><div><span className="eyebrow">A glimpse of the setting</span><h2 id="gallery-title">Consider every detail.</h2></div><span className="gallery-note">Illustrative venue photography</span></div>
            <div className="gallery-grid">
              <GalleryImage src={hallPhoto} alt="Illustrative photograph of an elegant event hall" label="The event hall" className="gallery-wide" />
              <GalleryImage src={detailsPhoto} alt="Illustrative details from an event venue" label="Venue details" className="gallery-narrow" />
            </div>
          </div>
        </section>

        <section className="reviews-band" id="reviews">
          <div className="section reviews-inner">
            <div className="section-heading review-heading">
              <div><span className="eyebrow">Kind words from guests</span><h2>Good memories, shared.</h2></div>
              <div className="rating-block"><span className="rating-score">4.5</span><span><span className="rating-stars" aria-label="Reported overall rating: 4.5 out of 5">★★★★★</span><span className="rating-caption">Reported rating · 2,130 reviews</span></span></div>
            </div>
            <div className="reviews-grid">
              {guestReviews.map((review) => (
                <figure className="review-card" key={review.name}>
                  <span className="review-stars" aria-label={`${review.name}: 4 out of 5 stars`}><span aria-hidden="true">★★★★</span><span className="empty-star" aria-hidden="true">★</span></span>
                  <blockquote>“{review.quote}”</blockquote>
                  <figcaption>{review.name}<span>Guest review</span></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section visit-section" id="visit">
          <div className="visit-intro"><span className="eyebrow">Come together in Abuja</span><h2>We’d love to hear<br />about your occasion.</h2><p>Get in touch directly to ask about your event and visit Chida Event Centre.</p><CallLink className="visit-call" /></div>
          <div className="visit-details">
            <div className="visit-detail"><span className="detail-icon"><MapPin aria-hidden="true" /></span><div><h3>Location</h3><p className="location-name">Plot 224, 226 P.O.W. Mafemi Crescent</p><p>Utako, Abuja</p></div><ArrowRight aria-hidden="true" className="detail-arrow" /></div>
            <div className="visit-detail"><span className="detail-icon"><Clock3 aria-hidden="true" /></span><div><h3>Opening hours</h3><p className="location-name">Open 24 hours</p><p>Every day, all year round</p></div><ArrowRight aria-hidden="true" className="detail-arrow" /></div>
            <div className="visit-detail"><span className="detail-icon"><Phone aria-hidden="true" /></span><div><h3>Call Chida</h3><a href="tel:08100718883">0810 071 8883</a></div><ArrowRight aria-hidden="true" className="detail-arrow" /></div>
          </div>
        </section>

        <section className="contact-band">
          <span className="eyebrow">Your next occasion starts here</span>
          <h2>Let’s make it memorable.</h2>
          <p>Speak with Chida Event Centre about your plans.</p>
          <CallLink className="contact-call" />
        </section>
      </main>

      <footer className="footer">
        <a className="footer-brand" href="#home"><span className="brand-emblem" aria-hidden="true">C</span><span><span className="brand-name">CHIDA</span><span className="brand-sub">Event Centre · Abuja</span></span></a>
        <span className="footer-note">A setting for life’s celebrations · Plot 224, 226 P.O.W. Mafemi Cres, Utako, Abuja</span>
        <a className="footer-phone" href="tel:08100718883"><Phone aria-hidden="true" />0810 071 8883</a>
        <a className="back-to-top" href="#home" aria-label="Back to top">↑</a>
      </footer>
    </div>
  );
}

export const chidaHead = () => ({ meta: [
  { title: 'Chida Event Centre | Weddings & Conferences in Abuja' },
  { name: 'description', content: 'Discover Chida Event Centre at Plot 224, 226 P.O.W. Mafemi Cres, Utako, Abuja — a setting for weddings, conferences and celebrations, open 24 hours. Call 0810 071 8883.' },
  { property: 'og:title', content: 'Chida Event Centre | Abuja' },
  { property: 'og:description', content: 'A memorable setting for weddings, conferences and celebrations in Abuja. Call 0810 071 8883.' },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
] });