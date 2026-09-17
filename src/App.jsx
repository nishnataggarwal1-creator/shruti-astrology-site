import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Globe,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Award,
  CalendarDays,
  BadgeCheck,
  GraduationCap,
  BriefcaseBusiness,
  Heart,
  Users,
  Landmark,
  Activity,
  Home,
  ScrollText,
  Quote,
} from "lucide-react";
import logo from "./assets/logo.png";
import certificate from "./assets/certificate-clean.jpg";

const BUSINESS = {
  fullName: "Vedic Astrology by Shruti",
  practitioner: "Shruti Aggarwal",
  city: "New Delhi",
  whatsapp: "919873154009",
  languages: "Hindi & English",
  credential: "Master in Astrology",
  institute: "Shree Maharshi College of Vedic Astrology",
  grade: "A+",
};

const SERVICES = [
  {
    title: "Kundli & Life Guidance",
    icon: ScrollText,
    description:
      "Personalized birth-chart guidance for important life themes, timing, strengths, challenges, and major decisions.",
  },
  {
    title: "Career, Profession & Business",
    icon: BriefcaseBusiness,
    description:
      "Guidance for career direction, professional challenges, work decisions, business concerns, and growth-related matters.",
  },
  {
    title: "Marriage & Relationships",
    icon: Heart,
    description:
      "Guidance for relationship concerns, marriage-related questions, compatibility, delays, and family harmony.",
  },
  {
    title: "Children & Family",
    icon: Users,
    description:
      "Guidance for child-related concerns, family matters, progeny questions, and children’s career direction.",
  },
  {
    title: "Finance & Stuck Matters",
    icon: Landmark,
    description:
      "Guidance around debt, stuck money, financial obstacles, and difficult matters requiring clearer direction.",
  },
  {
    title: "Health-Related Guidance",
    icon: Activity,
    description:
      "Astrological guidance around health-related patterns and periods as part of a wider life consultation.",
  },
  {
    title: "Vastu",
    icon: Home,
    description:
      "Guidance for homes, workplaces, property concerns, and creating greater balance in your environment.",
  },
  {
    title: "Personalized Remedies",
    icon: Sparkles,
    description:
      "Practical, personalized remedies suggested according to the individual chart and consultation context.",
  },
];

const WHY_SHRUTI = [
  {
    icon: GraduationCap,
    title: "Formal Qualification",
    text: "Master in Astrology, Shree Maharshi College of Vedic Astrology, Grade A+.",
  },
  {
    icon: BadgeCheck,
    title: "Personalized Guidance",
    text: "Guidance shaped around your chart, current concerns, and priorities.",
  },
  {
    icon: Sparkles,
    title: "Practical Remedies",
    text: "Personalized remedies may be suggested where relevant.",
  },
  {
    icon: Globe,
    title: "Online Consultation",
    text: "Consult remotely and coordinate details directly on WhatsApp.",
  },
  {
    icon: MessageCircle,
    title: "Hindi & English",
    text: "Consult comfortably in either Hindi or English.",
  },
];

const FAQS = [
  {
    q: "How do I book a consultation?",
    a: "Use the booking form or contact Shruti on WhatsApp. Your concern and consultation type can be discussed before the appointment is confirmed.",
  },
  {
    q: "Are consultations available online?",
    a: "Yes. Online consultation is the primary option and appointment details are coordinated directly on WhatsApp.",
  },
  {
    q: "What can I seek guidance about?",
    a: "Common areas include Kundli analysis, career, profession, business, marriage, relationships, family, children, finance, Vastu, health-related astrological guidance, and personalized remedies.",
  },
  {
    q: "Are remedies personalized?",
    a: "Yes. Where remedies are relevant, they are recommended according to the individual concern and consultation context rather than as a one-size-fits-all suggestion.",
  },
  {
    q: "Can I consult in Hindi?",
    a: "Yes. Consultations are available in both Hindi and English.",
  },
];

const FORM_SERVICES = [
  "Kundli & Life Guidance",
  "Career & Business",
  "Marriage & Relationships",
  "Family & Children",
  "Finance & Stuck Matters",
  "Health-Related Astrological Guidance",
  "Vastu",
  "Personalized Remedies",
  "Other",
];

function SectionTitle({ label, title, text, align = "left" }) {
  return (
    <div className={`section-title ${align === "center" ? "center" : ""}`}>
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
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const quickWhatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
    "Hello, I would like to book a consultation with Shruti."
  )}`;

  const reviewWhatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
    "Hello, I would like to share feedback about my consultation."
  )}`;

  const whatsappUrl = useMemo(() => {
    const parts = [
      "Hello, I would like to request a consultation.",
      "",
      `Name: ${form.name || ""}`,
      `WhatsApp Number: ${form.phone || ""}`,
      `Service: ${service || ""}`,
      `Message: ${form.message || ""}`,
    ];
    return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(parts.join("\n"))}`;
  }, [form, service]);

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !service) {
      alert("Please enter your name, WhatsApp number, and select a service.");
      return;
    }
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: BUSINESS.fullName,
    description:
      "Vedic Astrology by Shruti offers personalized online consultations for Kundli, career, business, marriage, relationships, family, finance, Vastu, and remedies.",
    areaServed: ["New Delhi", "India"],
    availableLanguage: ["Hindi", "English"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="page-bg" />
      <div className="site">
        <header className="site-header">
          <div className="container header-inner">
            <a href="#top" className="brand" aria-label="Vedic Astrology by Shruti home">
              <img src={logo} alt="Vedic Astrology logo" className="brand-logo" />
              <span className="brand-title">Vedic Astrology by Shruti</span>
            </a>

            <nav className="desktop-nav" aria-label="Primary navigation">
              <a href="#top">Home</a>
              <a href="#services">Services</a>
              <a href="#about">About</a>
              <a href="#reviews">Reviews</a>
              <a href="#faq">FAQ</a>
            </nav>

            <a href="#appointment" className="btn btn-primary header-book"><span className="book-full">Book Consultation</span><span className="book-short">Book</span></a>
          </div>
        </header>

        <main id="top">
          <section className="hero">
            <div className="container hero-grid">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                <div className="hero-pill">
                  <Award size={16} /> {BUSINESS.credential} • {BUSINESS.institute}
                </div>
                <p className="eyebrow">Guidance • Clarity • Balance</p>
                <h1>Personal Vedic Astrology guidance for life’s important decisions.</h1>
                <p className="hero-lead">
                  Personalized consultation with Shruti Aggarwal for Kundli, career, business, relationships, family, finance, Vastu, and important life concerns — with practical guidance and remedies where relevant.
                </p>

                <div className="hero-actions">
                  <a href={quickWhatsappUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-lg">
                    <MessageCircle size={18} /> Book Consultation
                  </a>
                  <a href="#appointment" className="btn btn-secondary btn-lg">
                    <CalendarDays size={18} /> Send Enquiry
                  </a>
                </div>

                <div className="hero-points">
                  <div><CheckCircle2 size={16} /> Online Consultations</div>
                  <div><CheckCircle2 size={16} /> Hindi & English</div>
                  <div><CheckCircle2 size={16} /> Personalized Guidance</div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}>
                <Card className="hero-card">
                  <div className="hero-logo-wrap">
                    <img src={logo} alt="Vedic Astrology by Shruti" className="hero-logo" />
                  </div>
                  <div className="hero-quote">
                    <Quote size={24} />
                    <p>Bringing positive change to people’s lives through thoughtful astrological guidance.</p>
                  </div>
                  <div className="credential-strip">
                    <strong>{BUSINESS.credential}</strong>
                    <span>{BUSINESS.institute}</span>
                    <span>Grade {BUSINESS.grade}</span>
                  </div>
                </Card>
              </motion.div>
            </div>
          </section>

          <section id="services" className="section section-light">
            <div className="container">
              <SectionTitle
                label="Areas of Guidance"
                title="Guidance for the areas of life that matter most"
                text="Each consultation is shaped around your concern and individual circumstances rather than a generic reading."
                align="center"
              />
              <div className="service-grid">
                {SERVICES.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.4, delay: index * 0.04 }}>
                      <Card className="service-card">
                        <div className="icon-box"><Icon size={21} /></div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="section why-section">
            <div className="container">
              <SectionTitle
                label="Why Consult Shruti"
                title="A thoughtful, personalized approach"
                text="Formal study, individual attention, and practical guidance come together in a consultation designed around your questions."
                align="center"
              />
              <div className="why-grid">
                {WHY_SHRUTI.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.04 }}>
                      <div className="why-item">
                        <div className="why-icon"><Icon size={22} /></div>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="section remedies-section">
            <div className="container remedies-grid">
              <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="remedies-mark"><Sparkles size={28} /></div>
                <SectionTitle
                  label="Personalized Remedies"
                  title="Guidance that continues beyond the consultation"
                  text="Where appropriate, Shruti may recommend personalized and practical remedies based on the individual chart, the concern being discussed, and the wider consultation context."
                />
              </motion.div>
              <Card className="remedies-card">
                <h3>Who may find a consultation useful?</h3>
                <div className="concern-list">
                  {["Career or business uncertainty", "Marriage or relationship concerns", "Family or child-related questions", "Debt or stuck financial matters", "Major life decisions", "Vastu-related concerns"].map((item) => (
                    <div key={item}><CheckCircle2 size={17} /><span>{item}</span></div>
                  ))}
                </div>
              </Card>
            </div>
          </section>

          <section id="about" className="section section-light">
            <div className="container about-grid">
              <div>
                <SectionTitle
                  label="About Shruti"
                  title="Traditional Vedic Astrology with a practical, personal approach"
                  text="Shruti Aggarwal offers Vedic Astrology consultations focused on helping people understand important life patterns, questions, and decisions through the framework of Jyotish and the Kundli."
                />
                <div className="content-stack">
                  <p>
                    A Kundli is a personalized birth chart based on the positions of celestial bodies at the time and place of birth. Shruti uses this framework to explore areas such as career, relationships, family, finance, and significant periods in life.
                  </p>
                  <blockquote>
                    “My aim is to bring positive change to someone’s life through astrological guidance.”
                  </blockquote>
                  <p className="small-note">Consultations are available in Hindi and English.</p>
                </div>
              </div>

              <div className="credentials-panel">
                <Card className="certificate-card">
                  <img src={certificate} alt="Shruti Aggarwal Master in Astrology certificate" className="certificate-image" />
                </Card>
                <div className="credential-copy">
                  <p className="section-label">Qualification</p>
                  <h3>{BUSINESS.credential}</h3>
                  <p>{BUSINESS.institute}</p>
                  <strong>Grade {BUSINESS.grade}</strong>
                </div>
              </div>
            </div>
          </section>

          <section id="reviews" className="section reviews-section">
            <div className="container reviews-layout">
              <div>
                <SectionTitle
                  label="Client Experiences"
                  title="Real feedback, shared privately"
                  text="Client names are not displayed. Genuine testimonials will be added here only with permission and may identify the consultation category without revealing personal details."
                />
              </div>
              <Card className="review-invite">
                <Quote size={28} />
                <h3>Have you consulted with Shruti?</h3>
                <p>You can share your experience privately on WhatsApp. Feedback is never published without approval.</p>
                <a href={reviewWhatsappUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">
                  <MessageCircle size={17} /> Share Your Experience
                </a>
              </Card>
            </div>
          </section>

          <section id="faq" className="section section-light">
            <div className="container">
              <SectionTitle label="FAQ" title="Before you get in touch" align="center" />
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

          <section id="appointment" className="section booking-section">
            <div className="container appointment-grid">
              <div className="booking-copy">
                <SectionTitle
                  label="Book a Consultation"
                  title="Start with a simple conversation"
                  text="Share the area you would like guidance on. Consultation details and timing are then coordinated directly with Shruti."
                />
                <div className="steps">
                  {[
                    "Contact Shruti on WhatsApp or use the enquiry form.",
                    "Briefly share the area you would like guidance on.",
                    "Confirm the consultation timing and details directly with Shruti.",
                    "Attend your personalized consultation.",
                  ].map((step, index) => (
                    <div key={step} className="step-item">
                      <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="form-card">
                <h3>Consultation Enquiry</h3>
                <p className="form-text">Complete the details below, then continue on WhatsApp.</p>
                <form onSubmit={handleSubmit} className="appointment-form">
                  <div className="two-col">
                    <input value={form.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Name" aria-label="Name" />
                    <input value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="WhatsApp number" aria-label="WhatsApp number" />
                  </div>
                  <select value={service} onChange={(e) => setService(e.target.value)} aria-label="Service interested in">
                    <option value="">Service interested in</option>
                    {FORM_SERVICES.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                  <textarea rows={5} value={form.message} onChange={(e) => handleChange("message", e.target.value)} placeholder="How can Shruti help you?" aria-label="Message" />
                  <button type="submit" className="btn btn-primary wide-btn"><MessageCircle size={17} /> Continue on WhatsApp</button>
                </form>
              </Card>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <div className="container footer-inner">
            <img src={logo} alt="Vedic Astrology by Shruti" className="footer-logo" />
            <p>Vedic Astrology by Shruti</p>
            <a href={quickWhatsappUrl} target="_blank" rel="noreferrer" className="footer-whatsapp">WhatsApp</a>
          </div>
        </footer>
      </div>
    </>
  );
}
