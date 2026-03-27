import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock3,
  Globe,
  Star,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Award,
  CalendarDays,
  BadgeCheck,
} from "lucide-react";
import logo from "./assets/logo.png";

const BUSINESS = {
  brand: "Vedic Astrology",
  practitioner: "Shruti Aggarwal",
  fullName: "Vedic Astrology by Shruti Aggarwal",
  tagline:
    "Professional Vedic astrology consultations in Hindi and English for relationship, marriage, career, and life guidance.",
  city: "New Delhi",
  region: "Delhi",
  country: "India",
  whatsapp: "919873154009",
  email: "shrutiaggarwal691@gmail.com",
  address: "New Delhi • Online consultations available",
  hours: "Mon–Sat, 10:00 AM – 7:00 PM",
  languages: "Hindi & English",
  credential: "Master in Astrology",
};

const SERVICES = [
  {
    title: "Personal Consultation",
    subtitle: "व्यक्तिगत ज्योतिष परामर्श",
    description:
      "One-to-one guidance for important life questions, personal clarity, emotional concerns, and future direction.",
  },
  {
    title: "Marriage & Relationship Guidance",
    subtitle: "विवाह और संबंध मार्गदर्शन",
    description:
      "Consultation for marriage, compatibility, relationship concerns, and practical guidance rooted in Vedic astrology.",
  },
  {
    title: "Career & Work Guidance",
    subtitle: "करियर और कार्य परामर्श",
    description:
      "Direction for job changes, career planning, work-related uncertainty, and professional growth decisions.",
  },
  {
    title: "Online Astrology Consultation",
    subtitle: "ऑनलाइन ज्योतिष परामर्श",
    description:
      "Convenient consultation through WhatsApp and email for clients in New Delhi, across India, and beyond.",
  },
];

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Professional and respectful",
    text: "Clear communication and a calm, structured consultation experience.",
  },
  {
    icon: Globe,
    title: "Hindi and English",
    text: "Consultations available comfortably in both Hindi and English.",
  },
  {
    icon: BadgeCheck,
    title: "Trust-oriented brand",
    text: "Positioned around Vedic astrology, credibility, and direct inquiry conversion.",
  },
];

const REVIEWS = [
  {
    name: "Client Testimonial",
    text: "The consultation felt thoughtful, calm, and genuinely helpful. The guidance was clear and practical.",
  },
  {
    name: "Online Consultation",
    text: "Very smooth experience through WhatsApp. Communication was professional and easy from start to finish.",
  },
  {
    name: "Relationship Guidance",
    text: "Helpful consultation with balanced insight and a very respectful approach to personal concerns.",
  },
];

const FAQS = [
  {
    q: "How can I book an appointment?",
    a: "You can request an appointment through the website form, WhatsApp, or email.",
  },
  {
    q: "Is consultation available online?",
    a: "Yes. Online consultation is available for clients in New Delhi, across India, and internationally.",
  },
  {
    q: "क्या परामर्श हिंदी में उपलब्ध है?",
    a: "हाँ, परामर्श हिंदी और English दोनों में उपलब्ध है.",
  },
  {
    q: "What is the consultation fee?",
    a: "The consultation fee is discussed after initial contact, depending on the nature of the consultation required.",
  },
];

function SectionTitle({ label, title, text }) {
  return (
    <div className="section-title">
      <p className="section-label">{label}</p>
      <h2>{title}</h2>
      {text ? <p className="section-text">{text}</p> : null}
    </div>
  );
}

function Card({ className = "", children }) {
  return <div className={`card ${className}`.trim()}>{children}</div>;
}

export default function App() {
  const [service, setService] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    birthDetails: "",
    message: "",
  });

  const quickWhatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
    "Hello, I would like to know more about Vedic astrology consultation."
  )}`;

  const whatsappUrl = useMemo(() => {
    const parts = [
      "Hello, I would like to request an appointment.",
      "",
      `Name: ${form.name || ""}`,
      `Phone: ${form.phone || ""}`,
      `Email: ${form.email || ""}`,
      `Service: ${service || ""}`,
      `Preferred Date: ${form.date || ""}`,
      `Birth Details: ${form.birthDetails || ""}`,
      `Message: ${form.message || ""}`,
    ];
    return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(parts.join("\\n"))}`;
  }, [form, service]);

  const mailtoUrl = useMemo(() => {
    const subject = encodeURIComponent(`Appointment Request - ${BUSINESS.fullName}`);
    const body = encodeURIComponent(
      `Hello, I would like to request an appointment.\\n\\nName: ${form.name}\\nPhone: ${form.phone}\\nEmail: ${form.email}\\nService: ${service}\\nPreferred Date: ${form.date}\\nBirth Details: ${form.birthDetails}\\nMessage: ${form.message}`
    );
    return `mailto:${BUSINESS.email}?subject=${subject}&body=${body}`;
  }, [form, service]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !service) {
      alert("Please enter your name, phone number, and select a service.");
      return;
    }
    window.open(whatsappUrl, "_blank");
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS.fullName,
    description: BUSINESS.tagline,
    areaServed: ["New Delhi", "India"],
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      addressCountry: BUSINESS.country,
    },
    email: BUSINESS.email,
    priceRange: "Price discussed after contact",
    availableLanguage: ["Hindi", "English"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="page-bg" />
      <div className="site">
        <header className="site-header">
          <div className="container header-inner">
            <a href="#top" className="brand">
              <img src={logo} alt="Vedic Astrology logo" className="brand-logo" />
              <div>
                <p className="brand-name">{BUSINESS.brand}</p>
                <p className="brand-sub">{BUSINESS.practitioner} • New Delhi</p>
              </div>
            </a>

            <nav className="desktop-nav">
              <a href="#services">Services</a>
              <a href="#about">About</a>
              <a href="#reviews">Reviews</a>
              <a href="#faq">FAQ</a>
              <a href="#contact">Contact</a>
            </nav>

            <div className="header-actions">
              <a href={quickWhatsappUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a href="#appointment" className="btn btn-primary">Request Appointment</a>
            </div>
          </div>
        </header>

        <main id="top">
          <section className="hero">
            <div className="container hero-grid">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="hero-pill">
                  <Award size={16} /> {BUSINESS.credential} • Vedic Astrology • {BUSINESS.city}
                </div>

                <h1>Vedic astrology guidance for life’s key areas.</h1>

                <p className="hero-lead">
                  {BUSINESS.fullName} offers professional consultation for relationship, marriage, career, and personal life guidance in New Delhi and online.
                </p>

                <p className="hero-sub">
                  हिंदी और English में Vedic astrology consultation उपलब्ध। अपॉइंटमेंट के लिए WhatsApp या email के माध्यम से संपर्क करें।
                </p>

                <div className="hero-actions">
                  <a href="#appointment" className="btn btn-primary btn-lg">
                    <CalendarDays size={18} /> Book Consultation
                  </a>
                  <a href={quickWhatsappUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-lg">
                    <MessageCircle size={18} /> Contact on WhatsApp
                  </a>
                </div>

                <div className="hero-points">
                  <div><CheckCircle2 size={16} /> Hindi & English</div>
                  <div><CheckCircle2 size={16} /> New Delhi & Online</div>
                  <div><CheckCircle2 size={16} /> Price discussed after contact</div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <Card className="hero-card">
                  <div className="hero-logo-wrap">
                    <img src={logo} alt="Vedic Astrology logo" className="hero-logo" />
                  </div>
                  <h3>{BUSINESS.fullName}</h3>
                  <p>
                    A premium consultation-focused website designed to build trust, encourage direct inquiries, and convert visitors into appointment requests.
                  </p>
                  <div className="mini-stats">
                    <div><MapPin size={16} /><span>{BUSINESS.city}</span></div>
                    <div><Globe size={16} /><span>{BUSINESS.languages}</span></div>
                    <div><Clock3 size={16} /><span>{BUSINESS.hours}</span></div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </section>

          <section className="section">
            <div className="container benefit-grid">
              {BENEFITS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.06 }}>
                    <Card className="benefit-card">
                      <div className="icon-box"><Icon size={20} /></div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <section id="services" className="section">
            <div className="container">
              <SectionTitle label="Services" title="Astrology consultation services" text="The site is ready to market consultations immediately, and the exact service details can be refined later as the business grows." />
              <div className="service-grid">
                {SERVICES.map((item, index) => (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.06 }}>
                    <Card className="service-card">
                      <div className="icon-box"><Sparkles size={20} /></div>
                      <h3>{item.title}</h3>
                      <p className="service-subtitle">{item.subtitle}</p>
                      <p>{item.description}</p>
                      <div className="service-footer">
                        <span>Price discussed after contact</span>
                        <a href="#appointment" className="inline-link">Request <ChevronRight size={16} /></a>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="about" className="section">
            <div className="container about-grid">
              <Card className="content-card">
                <SectionTitle label="About" title="Shruti Aggarwal" text="Master in Astrology offering professional Vedic astrology consultation in Hindi and English for clients in New Delhi and online." />
                <div className="content-stack">
                  <p>
                    This website is positioned to present a strong and trustworthy professional identity around Vedic astrology, with clear emphasis on consultation, ease of contact, and confidence-building content.
                  </p>
                  <p>
                    The current version focuses on visibility, trust, and conversion. It can later be expanded with more detailed services, credentials, testimonials, blog content, and search-focused pages.
                  </p>
                </div>
              </Card>

              <Card id="contact" className="content-card">
                <h3>Contact</h3>
                <div className="contact-list">
                  <div className="contact-item">
                    <MessageCircle size={18} />
                    <div>
                      <p className="contact-label">WhatsApp</p>
                      <a href={quickWhatsappUrl} target="_blank" rel="noreferrer">Contact on WhatsApp</a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <Mail size={18} />
                    <div>
                      <p className="contact-label">Email</p>
                      <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <MapPin size={18} />
                    <div>
                      <p className="contact-label">Location</p>
                      <p>{BUSINESS.address}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section id="reviews" className="section">
            <div className="container">
              <SectionTitle label="Testimonials" title="Client trust and social proof" text="These placeholders can be replaced with real testimonials and Google reviews." />
              <div className="review-grid">
                {REVIEWS.map((review, index) => (
                  <motion.div key={review.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.06 }}>
                    <Card className="review-card">
                      <div className="stars">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                      </div>
                      <p>{review.text}</p>
                      <strong>{review.name}</strong>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="appointment" className="section">
            <div className="container appointment-grid">
              <Card className="content-card accent-card">
                <SectionTitle label="Book" title="Request a consultation" text="The main purpose of this website is to convert visitors into WhatsApp and email inquiries quickly." />
                <div className="steps">
                  {[
                    "Fill in the form with your details and preferred consultation type.",
                    "Continue instantly on WhatsApp or send the request by email.",
                    "Consultation timing and fee are discussed after contact.",
                  ].map((step) => (
                    <div key={step} className="step-item">
                      <CheckCircle2 size={18} />
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="form-card">
                <h3>Appointment Request</h3>
                <p className="form-text">Complete the form below to continue directly on WhatsApp.</p>
                <form onSubmit={handleSubmit} className="appointment-form">
                  <div className="two-col">
                    <input value={form.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Full name / पूरा नाम" />
                    <input value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="Phone number / फ़ोन नंबर" />
                  </div>
                  <div className="two-col">
                    <input value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="Email address / ईमेल" />
                    <input type="date" value={form.date} onChange={(e) => handleChange("date", e.target.value)} />
                  </div>
                  <select value={service} onChange={(e) => setService(e.target.value)}>
                    <option value="">Select service / सेवा चुनें</option>
                    {SERVICES.map((item) => (
                      <option key={item.title} value={item.title}>{item.title}</option>
                    ))}
                  </select>
                  <input value={form.birthDetails} onChange={(e) => handleChange("birthDetails", e.target.value)} placeholder="Birth details (Date, Time, Place) / जन्म विवरण" />
                  <textarea rows={5} value={form.message} onChange={(e) => handleChange("message", e.target.value)} placeholder="Message / अपनी आवश्यकता लिखें" />
                  <div className="two-col">
                    <button type="submit" className="btn btn-primary wide-btn"><MessageCircle size={16} /> Continue on WhatsApp</button>
                    <a href={mailtoUrl} className="btn btn-secondary wide-btn"><Mail size={16} /> Send by Email</a>
                  </div>
                </form>
              </Card>
            </div>
          </section>

          <section id="faq" className="section">
            <div className="container">
              <SectionTitle label="FAQ" title="Frequently asked questions" text="Clear answers help first-time visitors feel comfortable contacting you." />
              <div className="faq-grid">
                {FAQS.map((item) => (
                  <Card key={item.q} className="faq-card">
                    <h3>{item.q}</h3>
                    <p>{item.a}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>

        <div className="floating-cta">
          <a href={quickWhatsappUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>

        <footer className="site-footer">
          <div className="container footer-inner">
            <p>© 2026 {BUSINESS.fullName}. All rights reserved.</p>
            <div className="footer-links">
              <a href={`mailto:${BUSINESS.email}`}>Email</a>
              <a href={quickWhatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
