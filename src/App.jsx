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
      "One-to-one guidance for important life questions, emotional clarity, personal direction, and general astrological insight.",
  },
  {
    title: "Marriage & Relationship Guidance",
    subtitle: "विवाह और संबंध मार्गदर्शन",
    description:
      "Consultation for compatibility, relationship concerns, marriage-related questions, and practical guidance through Vedic astrology.",
  },
  {
    title: "Career & Work Guidance",
    subtitle: "करियर और कार्य परामर्श",
    description:
      "Astrology-based guidance for job decisions, work challenges, career planning, and future professional direction.",
  },
  {
    title: "Online Astrology Consultation",
    subtitle: "ऑनलाइन ज्योतिष परामर्श",
    description:
      "Convenient consultation through WhatsApp and email for clients in New Delhi, across India, and internationally.",
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
    text: "The consultation was calm, clear, and very helpful. The guidance was easy to understand and felt practical.",
  },
  {
    name: "Online Consultation",
    text: "Professional communication and a smooth appointment process. The consultation gave useful clarity on important personal questions.",
  },
  {
    name: "Relationship Guidance",
    text: "A respectful and thoughtful experience. The online consultation was convenient and well organised.",
  },
];

const FAQS = [
  {
    q: "How can I book an appointment?",
    a: "Appointments can be requested through the website form, WhatsApp, or email.",
  },
  {
    q: "Is online consultation available?",
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
    "Hello, I would like to know more about Vedic Astrology consultation."
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
    description: `${BUSINESS.fullName} offers professional consultation in Hindi and English for relationship, marriage, career, and personal life guidance in New Delhi and online.`,
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
                <p className="brand-name">{BUSINESS.fullName}</p>
                <p className="brand-sub">New Delhi & Online Consultation</p>
              </div>
            </a>

            <nav className="desktop-nav">
              <a href="#services">Services</a>
              <a href="#about">About</a>
              <a href="#reviews">Testimonials</a>
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

                <h1>Vedic astrology guidance for life’s important decisions.</h1>

                <p className="hero-lead">
                  Vedic Astrology by Shruti Aggarwal offers professional consultation in Hindi and English for relationship, marriage, career, and personal life guidance in New Delhi and online.
                </p>

                <p className="hero-sub">
                  हिंदी और English में Vedic Astrology consultation उपलब्ध है। अपॉइंटमेंट और consultation details के लिए WhatsApp या email के माध्यम से संपर्क करें।
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
                    Professional Vedic astrology consultation for relationship, marriage, career, and personal guidance. Designed to make it easy for clients to connect, ask questions, and request appointments with confidence.
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
              <SectionTitle
                label="Services"
                title="Astrology Consultation Services"
                text="Consultations are available for key areas of life including marriage, relationships, career, and personal guidance. Service details can be expanded further as the practice grows."
              />
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
                <SectionTitle
                  label="About"
                  title="About Shruti Aggarwal"
                  text="Shruti Aggarwal offers Vedic astrology consultation with a professional, respectful, and client-focused approach."
                />
                <div className="content-stack">
                  <p>
                    Consultations are designed to help individuals seek clarity on important matters related to marriage, relationships, career, and personal life decisions.
                  </p>
                  <p>
                    With consultation available in both Hindi and English, the practice is positioned to serve clients in New Delhi as well as those seeking online guidance from other locations.
                  </p>
                </div>
              </Card>

              <Card id="contact" className="content-card">
                <h3>Professional Credentials</h3>
                <div className="contact-list">
                  <div className="contact-item">
                    <Award size={18} />
                    <div>
                      <p className="contact-label">Qualification</p>
                      <p>Master in Astrology</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <Globe size={18} />
                    <div>
                      <p className="contact-label">Languages</p>
                      <p>Hindi & English Consultation</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <MapPin size={18} />
                    <div>
                      <p className="contact-label">Location</p>
                      <p>New Delhi Based</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <CalendarDays size={18} />
                    <div>
                      <p className="contact-label">Availability</p>
                      <p>Online Consultation Available</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section id="reviews" className="section">
            <div className="container">
              <SectionTitle
                label="Testimonials"
                title="Client Testimonials"
                text="These can be replaced with real client reviews as the practice grows."
              />
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
                <SectionTitle
                  label="Book"
                  title="Request a Consultation"
                  text="To request an appointment, fill in the form and continue on WhatsApp, or send your details by email. Consultation timing and fee are discussed after initial contact."
                />
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
              <SectionTitle
                label="FAQ"
                title="Frequently Asked Questions"
                text="Clear answers help first-time visitors feel comfortable contacting you."
              />
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
            <p>Vedic Astrology by Shruti Aggarwal provides professional astrology consultation in New Delhi and online for marriage, relationship, career, and personal guidance.</p>
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
