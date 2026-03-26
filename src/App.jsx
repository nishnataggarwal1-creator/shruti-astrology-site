
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Mail,
  MapPin,
  MessageCircle,
  CalendarDays,
  Sparkles,
  Clock3,
  CheckCircle2,
  ChevronRight,
  Award,
  Globe,
  ShieldCheck,
  BookOpen,
} from "lucide-react";

const BUSINESS = {
  name: "Shruti Aggarwal Astrology",
  tagline:
    "Professional astrology consultations in Hindi and English for relationship, marriage, career, and life guidance.",
  city: "New Delhi",
  region: "Delhi",
  country: "India",
  whatsapp: "919873154009",
  email: "shrutiaggarwal691@gmail.com",
  address: "New Delhi • Online consultations available",
  hours: "Mon–Sat, 10:00 AM – 7:00 PM",
  languages: "Hindi & English",
  credential: "Master in Astrology",
  institute: "Shree Maharshi College of Vedic Astrology",
};

const SERVICES = [
  {
    title: "Personal Astrology Consultation",
    hindi: "व्यक्तिगत ज्योतिष परामर्श",
    description:
      "Guidance for personal concerns, major decisions, and general astrological insight through one-to-one consultation.",
    price: "Price discussed after contact",
  },
  {
    title: "Marriage & Relationship Guidance",
    hindi: "विवाह और संबंध परामर्श",
    description:
      "Consultation for compatibility, relationship concerns, marriage-related questions, and emotional clarity.",
    price: "Price discussed after contact",
  },
  {
    title: "Career & Work Guidance",
    hindi: "करियर और कार्य मार्गदर्शन",
    description:
      "Astrology-based guidance for career direction, work decisions, growth, and professional planning.",
    price: "Price discussed after contact",
  },
  {
    title: "Online Consultation",
    hindi: "ऑनलाइन परामर्श",
    description:
      "Convenient consultation through WhatsApp and email for clients in New Delhi and beyond.",
    price: "Price discussed after contact",
  },
];

const HIGHLIGHTS = [
  {
    icon: Globe,
    title: "Hindi & English",
    text: "Consultations available in both Hindi and English.",
  },
  {
    icon: ShieldCheck,
    title: "Professional Approach",
    text: "Clear, respectful, and thoughtfully structured consultation experience.",
  },
  {
    icon: BookOpen,
    title: "Easy Booking",
    text: "Appointment requests can be sent instantly through WhatsApp or email.",
  },
];

const REVIEWS = [
  {
    name: "Client Review",
    text: "A thoughtful and reassuring consultation experience. The guidance was clear and easy to understand.",
  },
  {
    name: "Consultation Feedback",
    text: "Professional communication, smooth booking process, and practical guidance for important life questions.",
  },
  {
    name: "Online Client",
    text: "Convenient and well-organised consultation. WhatsApp contact made the appointment process very simple.",
  },
];

const FAQS = [
  {
    q: "How can an appointment be requested?",
    a: "Appointments can be requested through the website form, WhatsApp, or email.",
  },
  {
    q: "क्या परामर्श हिंदी में उपलब्ध है?",
    a: "हाँ, परामर्श हिंदी और English दोनों में उपलब्ध है.",
  },
  {
    q: "Is online consultation available?",
    a: "Yes. Online consultation is available for clients in New Delhi as well as other locations.",
  },
  {
    q: "What is the consultation fee?",
    a: "The consultation fee is discussed after initial contact, depending on the service required.",
  },
  {
    q: "What details should be shared before consultation?",
    a: "It is helpful to share name, preferred date, and birth details such as date, time, and place of birth when available.",
  },
];

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
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
    return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(parts.join("\n"))}`;
  }, [form, service]);

  const quickWhatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
    "Hello, I would like to know more about astrology consultation services."
  )}`;

  const mailtoUrl = useMemo(() => {
    const subject = encodeURIComponent(`Appointment Request - ${BUSINESS.name}`);
    const body = encodeURIComponent(
      `Hello, I would like to request an appointment.\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nService: ${service}\nPreferred Date: ${form.date}\nBirth Details: ${form.birthDetails}\nMessage: ${form.message}`
    );
    return `mailto:${BUSINESS.email}?subject=${subject}&body=${body}`;
  }, [form, service]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !service) {
      alert("Please enter your name, phone number, and service.");
      return;
    }
    window.open(whatsappUrl, "_blank");
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS.name,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <div className="page-bg" />
      <div className="site-shell">
        <header className="site-header">
          <div className="container header-inner">
            <a href="#home" className="brand">
              <div className="brand-badge">
                <Star size={18} />
              </div>
              <div>
                <p className="brand-name">{BUSINESS.name}</p>
                <p className="brand-tag">Astrologer in New Delhi • Hindi & English</p>
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

        <main id="home">
          <section className="hero-section">
            <div className="container hero-grid">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="hero-pill">
                  <Award size={16} /> {BUSINESS.credential} • {BUSINESS.city}
                </div>

                <h1>Professional astrology consultation in New Delhi.</h1>

                <p className="hero-lead">
                  {BUSINESS.tagline} Appointments can be requested through WhatsApp, email, or the online form below.
                </p>

                <p className="hero-sublead">
                  नई दिल्ली में हिंदी और English में professional astrology consultation उपलब्ध। अपॉइंटमेंट के लिए WhatsApp या email के माध्यम से संपर्क करें।
                </p>

                <div className="hero-actions">
                  <a href="#appointment" className="btn btn-primary btn-lg">
                    <CalendarDays size={18} /> Request Appointment
                  </a>
                  <a href={quickWhatsappUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-lg">
                    <MessageCircle size={18} /> Contact on WhatsApp
                  </a>
                </div>

                <div className="stats-grid">
                  <Card>
                    <Clock3 className="stat-icon" size={20} />
                    <p className="muted">Consultation Hours</p>
                    <p className="strong">{BUSINESS.hours}</p>
                  </Card>
                  <Card>
                    <MapPin className="stat-icon" size={20} />
                    <p className="muted">Location</p>
                    <p className="strong">{BUSINESS.city}</p>
                  </Card>
                  <Card>
                    <Globe className="stat-icon" size={20} />
                    <p className="muted">Languages</p>
                    <p className="strong">{BUSINESS.languages}</p>
                  </Card>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="form-card">
                  <div className="form-header">
                    <div className="brand-badge large">
                      <Star size={22} />
                    </div>
                    <div>
                      <h3>Appointment Request | अपॉइंटमेंट अनुरोध</h3>
                      <p>Complete the form to continue on WhatsApp or send the details by email.</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="appointment-form">
                    <div className="field-grid">
                      <input
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Full name / पूरा नाम"
                      />
                      <input
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="Phone number / फ़ोन नंबर"
                      />
                    </div>

                    <div className="field-grid">
                      <input
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="Email address / ईमेल"
                      />
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => handleChange("date", e.target.value)}
                      />
                    </div>

                    <select value={service} onChange={(e) => setService(e.target.value)}>
                      <option value="">Select service / सेवा चुनें</option>
                      {SERVICES.map((item) => (
                        <option key={item.title} value={item.title}>
                          {item.title}
                        </option>
                      ))}
                    </select>

                    <input
                      value={form.birthDetails}
                      onChange={(e) => handleChange("birthDetails", e.target.value)}
                      placeholder="Birth details (Date, Time, Place) / जन्म विवरण"
                    />

                    <textarea
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Message / अपनी आवश्यकता लिखें"
                      rows={5}
                    />

                    <div className="field-grid">
                      <button type="submit" className="btn btn-primary form-btn">
                        <MessageCircle size={16} /> Continue on WhatsApp
                      </button>
                      <a href={mailtoUrl} className="btn btn-secondary form-btn">
                        <Mail size={16} /> Send by Email
                      </a>
                    </div>
                  </form>
                </Card>
              </motion.div>
            </div>
          </section>

          <section className="section">
            <div className="container three-grid">
              {HIGHLIGHTS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                  >
                    <Card className="feature-card">
                      <div className="icon-box">
                        <Icon size={20} />
                      </div>
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
                eyebrow="Services"
                title="Astrology consultation services"
                subtitle="Service details can be expanded and refined later. The current structure is ready for launch and future editing."
              />

              <div className="four-grid">
                {SERVICES.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                  >
                    <Card className="service-card">
                      <div className="icon-box">
                        <Sparkles size={20} />
                      </div>
                      <h3>{item.title}</h3>
                      <p className="service-hindi">{item.hindi}</p>
                      <p className="service-desc">{item.description}</p>
                      <div className="card-row">
                        <span className="price">{item.price}</span>
                        <a href="#appointment" className="inline-link">
                          Request <ChevronRight size={16} />
                        </a>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="about" className="section">
            <div className="container two-grid">
              <Card className="content-card">
                <SectionTitle
                  eyebrow="About"
                  title="Shruti Aggarwal"
                  subtitle="Master in Astrology, offering professional consultation in Hindi and English for clients in New Delhi and online."
                />
                <div className="content-stack">
                  <p>
                    Shruti Aggarwal provides astrology consultation with a calm, respectful, and client-focused approach. The consultation process is designed to help clients discuss important questions related to relationships, marriage, career, and personal direction.
                  </p>
                  <p>
                    Appointment requests are handled professionally through WhatsApp, email, and the website form. Additional service details, credentials, and profile content can be expanded later without changing the site structure.
                  </p>
                </div>
              </Card>

              <Card id="contact" className="content-card">
                <h3>Contact</h3>
                <div className="contact-stack">
                  <div className="contact-item">
                    <MessageCircle className="contact-icon" size={18} />
                    <div>
                      <p className="muted">WhatsApp</p>
                      <a href={quickWhatsappUrl} target="_blank" rel="noreferrer">Contact on WhatsApp</a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <Mail className="contact-icon" size={18} />
                    <div>
                      <p className="muted">Email</p>
                      <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <MapPin className="contact-icon" size={18} />
                    <div>
                      <p className="muted">Location</p>
                      <p className="strong">{BUSINESS.address}</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <Clock3 className="contact-icon" size={18} />
                    <div>
                      <p className="muted">Hours</p>
                      <p className="strong">{BUSINESS.hours}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section id="reviews" className="section">
            <div className="container">
              <SectionTitle
                eyebrow="Reviews"
                title="Client feedback"
                subtitle="Placeholder testimonials are included for layout and can be replaced with verified client reviews later."
              />
              <div className="three-grid">
                {REVIEWS.map((review, index) => (
                  <motion.div
                    key={review.name}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                  >
                    <Card className="review-card">
                      <div className="stars">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                      </div>
                      <p className="review-text">“{review.text}”</p>
                      <p className="strong review-name">{review.name}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="appointment" className="section">
            <div className="container two-grid alt">
              <Card className="content-card content-highlight">
                <SectionTitle
                  eyebrow="Appointment"
                  title="How the process works"
                  subtitle="A clear and professional booking flow that can be edited later as the business grows."
                />
                <div className="steps">
                  {[
                    "Submit the appointment request form or send a WhatsApp message.",
                    "The request is reviewed and a suitable consultation slot is discussed.",
                    "Consultation details and pricing are confirmed after initial contact.",
                  ].map((step) => (
                    <div key={step} className="step-item">
                      <CheckCircle2 size={18} />
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="content-card">
                <h3>Quick contact options</h3>
                <p className="section-subtitle">
                  WhatsApp is the fastest way to send an inquiry. Email is also available for appointment requests and service questions.
                </p>
                <div className="field-grid top-gap">
                  <a href={quickWhatsappUrl} target="_blank" rel="noreferrer" className="btn btn-primary form-btn">
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                  <a href={`mailto:${BUSINESS.email}`} className="btn btn-secondary form-btn">
                    <Mail size={16} /> Email
                  </a>
                </div>
              </Card>
            </div>
          </section>

          <section id="faq" className="section">
            <div className="container">
              <SectionTitle
                eyebrow="FAQ"
                title="Frequently asked questions"
                subtitle="Useful answers for first-time visitors and appointment inquiries."
              />
              <div className="faq-grid">
                {FAQS.map((faq) => (
                  <Card key={faq.q} className="faq-card">
                    <h3>{faq.q}</h3>
                    <p>{faq.a}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>

        <div className="floating-whatsapp">
          <a href={quickWhatsappUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>

        <footer className="site-footer">
          <div className="container footer-inner">
            <p>© 2026 {BUSINESS.name}. All rights reserved.</p>
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
