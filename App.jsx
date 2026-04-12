import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  GraduationCap,
  Send,
  Lock,
  CheckCheck,
  X,
  Trash2,
  Eye,
  EyeOff,
  LogOut,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import logo from "./assets/logo.png";
import certificate from "./assets/certificate.jpg";

// ─── ADMIN PASSWORD ────────────────────────────────────────────────────────────
// Change this to your desired admin password
const ADMIN_PASSWORD = "shruti2025";

const BUSINESS = {
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
  institute: "Shree Maharshi College of Vedic Astrology",
  grade: "A+",
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

// ─── STORAGE HELPERS ───────────────────────────────────────────────────────────
const STORAGE_KEY = "va_feedback_v1";

async function loadFeedback() {
  try {
    const result = await window.storage.get(STORAGE_KEY);
    return result ? JSON.parse(result.value) : [];
  } catch {
    return [];
  }
}

async function saveFeedback(list) {
  try {
    await window.storage.set(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Storage save failed", e);
  }
}

// ─── COMPONENTS ────────────────────────────────────────────────────────────────

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

// ─── FEEDBACK FORM ─────────────────────────────────────────────────────────────
function FeedbackForm({ onSubmitted }) {
  const [form, setForm] = useState({ name: "", rating: 5, text: "", service: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async () => {
    if (!form.name.trim() || !form.text.trim()) {
      alert("Please enter your name and feedback.");
      return;
    }
    setLoading(true);
    const entry = {
      id: Date.now().toString(),
      name: form.name.trim(),
      rating: form.rating,
      text: form.text.trim(),
      service: form.service.trim(),
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      approved: false,
    };
    const existing = await loadFeedback();
    await saveFeedback([...existing, entry]);
    setLoading(false);
    setSubmitted(true);
    onSubmitted?.();
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card" style={{ textAlign: "center", padding: "40px 28px" }}>
        <CheckCheck size={44} style={{ color: "var(--gold)", margin: "0 auto 16px" }} />
        <h3 style={{ margin: "0 0 10px" }}>Thank you for your feedback!</h3>
        <p style={{ color: "var(--muted)" }}>Your review has been submitted and will appear on the site once reviewed.</p>
      </motion.div>
    );
  }

  return (
    <Card>
      <h3 style={{ marginTop: 0 }}>Share Your Experience</h3>
      <p className="form-text" style={{ color: "var(--muted)", marginBottom: 20 }}>Had a consultation? We'd love to hear from you.</p>
      <div style={{ display: "grid", gap: 14 }}>
        <input
          value={form.name}
          onChange={(e) => handle("name", e.target.value)}
          placeholder="Your name / आपका नाम"
          style={inputStyle}
        />
        <input
          value={form.service}
          onChange={(e) => handle("service", e.target.value)}
          placeholder="Service type (optional) / सेवा का प्रकार"
          style={inputStyle}
        />
        {/* Star rating */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "var(--muted)", fontSize: ".9rem" }}>Rating:</span>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => handle("rating", n)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: n <= form.rating ? "var(--gold)" : "rgba(255,255,255,.2)" }}
            >
              <Star size={22} fill={n <= form.rating ? "currentColor" : "none"} />
            </button>
          ))}
        </div>
        <textarea
          value={form.text}
          onChange={(e) => handle("text", e.target.value)}
          placeholder="Your feedback / अपना अनुभव लिखें"
          rows={4}
          style={{ ...inputStyle, resize: "vertical" }}
        />
        <button onClick={submit} disabled={loading} className="btn btn-primary" style={{ alignSelf: "flex-start", gap: 8 }}>
          <Send size={16} /> {loading ? "Submitting…" : "Submit Feedback"}
        </button>
      </div>
    </Card>
  );
}

const inputStyle = {
  width: "100%",
  borderRadius: 18,
  border: "1px solid var(--border)",
  background: "rgba(255,255,255,.05)",
  color: "white",
  padding: "14px 16px",
  outline: "none",
  fontFamily: "inherit",
  fontSize: "1rem",
  boxSizing: "border-box",
};

// ─── ADMIN PANEL ───────────────────────────────────────────────────────────────
function AdminPanel({ onClose }) {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // all | pending | approved

  const login = () => {
    if (password === ADMIN_PASSWORD) setAuthed(true);
    else alert("Incorrect password.");
  };

  useEffect(() => {
    if (authed) {
      setLoading(true);
      loadFeedback().then((data) => { setFeedback(data); setLoading(false); });
    }
  }, [authed]);

  const toggle = async (id) => {
    const updated = feedback.map((f) => f.id === id ? { ...f, approved: !f.approved } : f);
    setFeedback(updated);
    await saveFeedback(updated);
  };

  const remove = async (id) => {
    const updated = feedback.filter((f) => f.id !== id);
    setFeedback(updated);
    await saveFeedback(updated);
  };

  const shown = feedback.filter((f) =>
    filter === "all" ? true : filter === "pending" ? !f.approved : f.approved
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(7,9,15,.97)", overflowY: "auto", padding: "32px 16px" }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <h2 style={{ margin: 0, color: "var(--gold)" }}>⚙ Admin — Feedback Manager</h2>
          <button onClick={onClose} className="btn btn-secondary" style={{ gap: 8 }}><LogOut size={16} /> Close</button>
        </div>

        {!authed ? (
          <Card>
            <h3 style={{ marginTop: 0 }}><Lock size={18} style={{ verticalAlign: "middle", marginRight: 8 }} />Enter Admin Password</h3>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 16 }}>
              <div style={{ position: "relative", flex: 1 }}>
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && login()}
                  placeholder="Password"
                  style={{ ...inputStyle, paddingRight: 44 }}
                />
                <button onClick={() => setShowPw((p) => !p)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--muted)", cursor: "pointer" }}>
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <button onClick={login} className="btn btn-primary"><Lock size={16} /> Login</button>
            </div>
          </Card>
        ) : (
          <>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
              {[
                { label: "Total", count: feedback.length, col: "rgba(255,255,255,.1)" },
                { label: "Pending", count: feedback.filter((f) => !f.approved).length, col: "rgba(215,171,82,.15)" },
                { label: "Approved", count: feedback.filter((f) => f.approved).length, col: "rgba(34,197,94,.12)" },
              ].map(({ label, count, col }) => (
                <div key={label} style={{ background: col, border: "1px solid var(--border)", borderRadius: 18, padding: "18px 22px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.9rem", fontWeight: 700 }}>{count}</div>
                  <div style={{ color: "var(--muted)", fontSize: ".88rem" }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Filter tabs */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              {["all", "pending", "approved"].map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`btn ${filter === f ? "btn-primary" : "btn-secondary"}`} style={{ textTransform: "capitalize", padding: "8px 18px" }}>{f}</button>
              ))}
            </div>

            {loading ? (
              <p style={{ color: "var(--muted)" }}>Loading…</p>
            ) : shown.length === 0 ? (
              <Card><p style={{ color: "var(--muted)", textAlign: "center" }}>No feedback entries here yet.</p></Card>
            ) : (
              <div style={{ display: "grid", gap: 14 }}>
                {shown.map((f) => (
                  <motion.div key={f.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <Card style={{ borderColor: f.approved ? "rgba(34,197,94,.3)" : "var(--border)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                        <div style={{ flex: 1, minWidth: 200 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                            <strong>{f.name}</strong>
                            {f.service && <span style={{ color: "var(--gold)", fontSize: ".85rem" }}>— {f.service}</span>}
                            <span style={{ marginLeft: "auto", color: "var(--muted)", fontSize: ".8rem" }}>{f.date}</span>
                          </div>
                          <div style={{ display: "flex", gap: 3, marginBottom: 8 }}>
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} size={14} fill={i < f.rating ? "var(--gold)" : "none"} color={i < f.rating ? "var(--gold)" : "rgba(255,255,255,.2)"} />
                            ))}
                          </div>
                          <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.7 }}>{f.text}</p>
                        </div>
                        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                          <button
                            onClick={() => toggle(f.id)}
                            className={`btn ${f.approved ? "btn-secondary" : "btn-primary"}`}
                            style={{ padding: "8px 14px", gap: 6, fontSize: ".88rem" }}
                            title={f.approved ? "Remove from site" : "Approve for site"}
                          >
                            {f.approved ? <><ThumbsDown size={15} /> Hide</> : <><ThumbsUp size={15} /> Approve</>}
                          </button>
                          <button
                            onClick={() => { if (window.confirm("Delete this review permanently?")) remove(f.id); }}
                            className="btn btn-secondary"
                            style={{ padding: "8px 12px", color: "#f87171" }}
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                      {f.approved && (
                        <div style={{ marginTop: 10, fontSize: ".8rem", color: "rgba(34,197,94,.8)", display: "flex", alignItems: "center", gap: 6 }}>
                          <CheckCheck size={13} /> Showing on site
                        </div>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [service, setService] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", birthDetails: "", message: "" });
  const [approvedReviews, setApprovedReviews] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);

  // Load approved reviews on mount and after feedback submission
  const refreshReviews = async () => {
    const all = await loadFeedback();
    setApprovedReviews(all.filter((f) => f.approved));
  };

  useEffect(() => { refreshReviews(); }, []);

  // Secret admin access: triple-click on footer copyright
  const [clickCount, setClickCount] = useState(0);
  const handleSecretClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 5) { setShowAdmin(true); setClickCount(0); }
    setTimeout(() => setClickCount(0), 2000);
  };

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
    return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(parts.join("\n"))}`;
  }, [form, service]);

  const mailtoUrl = useMemo(() => {
    const subject = encodeURIComponent(`Appointment Request - ${BUSINESS.fullName}`);
    const body = encodeURIComponent(
      `Hello, I would like to request an appointment.\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nService: ${service}\nPreferred Date: ${form.date}\nBirth Details: ${form.birthDetails}\nMessage: ${form.message}`
    );
    return `mailto:${BUSINESS.email}?subject=${subject}&body=${body}`;
  }, [form, service]);

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

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

      <AnimatePresence>
        {showAdmin && <AdminPanel onClose={() => { setShowAdmin(false); refreshReviews(); }} />}
      </AnimatePresence>

      <div className="site">
        {/* ── HEADER ── */}
        <header className="site-header">
          <div className="container header-inner">
            <div className="brand">
              <img src={logo} alt="Vedic Astrology by Shruti Aggarwal logo" className="brand-logo" />
              <div>
                <p className="brand-name">Vedic Astrology</p>
                <p className="brand-sub">by Shruti Aggarwal</p>
              </div>
            </div>
            <nav className="desktop-nav">
              <a href="#services">Services</a>
              <a href="#about">About</a>
              <a href="#reviews">Reviews</a>
              <a href="#appointment">Book</a>
            </nav>
            <div className="header-actions">
              <a href={quickWhatsappUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </header>

        <main>
          {/* ── HERO ── */}
          <section className="hero">
            <div className="container hero-grid">
              <div>
                <div className="hero-pill"><Sparkles size={15} /> Vedic Astrology Consultation</div>
                <h1>Clarity through the stars</h1>
                <p className="hero-lead">
                  Professional Vedic astrology consultations in Hindi and English for marriage, relationships, career, and life guidance. Available in New Delhi and online worldwide.
                </p>
                <p className="hero-sub">Guidance for important personal decisions • Thoughtful, structured approach</p>
                <div className="hero-actions">
                  <a href="#appointment" className="btn btn-primary btn-lg">
                    <CalendarDays size={16} /> Book Consultation
                  </a>
                  <a href={quickWhatsappUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-lg">
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                </div>
                <div className="hero-points">
                  <div><CheckCircle2 size={16} style={{ color: "var(--gold)" }} /> Hindi & English</div>
                  <div><CheckCircle2 size={16} style={{ color: "var(--gold)" }} /> Online available</div>
                  <div><CheckCircle2 size={16} style={{ color: "var(--gold)" }} /> Master in Astrology</div>
                </div>
              </div>
              <Card className="hero-card">
                <div className="hero-logo-wrap">
                  <img src={logo} alt="Shruti Aggarwal Vedic Astrology" className="hero-logo" />
                </div>
                <h3>Vedic Astrology by Shruti Aggarwal</h3>
                <p style={{ color: "var(--muted)" }}>Professional guidance for life's important questions through authentic Vedic astrology.</p>
                <div className="mini-stats">
                  <div><MapPin size={16} style={{ color: "var(--gold)", flexShrink: 0 }} /><span>New Delhi • Online worldwide</span></div>
                  <div><Clock3 size={16} style={{ color: "var(--gold)", flexShrink: 0 }} /><span>{BUSINESS.hours}</span></div>
                  <div><Globe size={16} style={{ color: "var(--gold)", flexShrink: 0 }} /><span>{BUSINESS.languages}</span></div>
                </div>
              </Card>
            </div>
          </section>

          {/* ── BENEFITS ── */}
          <section className="section">
            <div className="container">
              <SectionTitle label="Why Choose" title="A professional and caring approach" />
              <div className="benefit-grid" style={{ marginTop: 32 }}>
                {BENEFITS.map((b, i) => (
                  <motion.div key={b.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}>
                    <Card className="benefit-card">
                      <div className="icon-box"><b.icon size={22} /></div>
                      <h3>{b.title}</h3>
                      <p>{b.text}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SERVICES ── */}
          <section id="services" className="section">
            <div className="container">
              <SectionTitle label="Services" title="Consultation areas" text="Each service is focused on providing clear, actionable guidance through Vedic astrology." />
              <div className="service-grid">
                {SERVICES.map((svc, i) => (
                  <motion.div key={svc.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.06 }}>
                    <Card className="service-card">
                      <div className="icon-box"><Sparkles size={22} /></div>
                      <h3>{svc.title}</h3>
                      <p className="service-subtitle">{svc.subtitle}</p>
                      <p>{svc.description}</p>
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

          {/* ── ABOUT ── */}
          <section id="about" className="section">
            <div className="container about-grid">
              <Card className="content-card">
                <SectionTitle
                  label="About"
                  title="About Shruti Aggarwal"
                  text="Shruti Aggarwal offers Vedic astrology consultation with a professional, respectful, and client-focused approach."
                />
                <div className="content-stack">
                  <p>Consultations are designed to help individuals seek clarity on important matters related to marriage, relationships, career, and personal life decisions.</p>
                  <p>With consultation available in both Hindi and English, the practice is positioned to serve clients in New Delhi as well as those seeking online guidance from other locations.</p>
                </div>
              </Card>
              <Card id="contact" className="content-card">
                <h3>Professional Credentials</h3>
                <div className="contact-list">
                  <div className="contact-item"><GraduationCap size={18} /><div><p className="contact-label">Qualification</p><p>{BUSINESS.credential}</p></div></div>
                  <div className="contact-item"><Globe size={18} /><div><p className="contact-label">Languages</p><p>Hindi & English Consultation</p></div></div>
                  <div className="contact-item"><MapPin size={18} /><div><p className="contact-label">Location</p><p>New Delhi Based</p></div></div>
                  <div className="contact-item"><CalendarDays size={18} /><div><p className="contact-label">Availability</p><p>Online Consultation Available</p></div></div>
                </div>
              </Card>
            </div>
          </section>

          {/* ── CREDENTIALS ── */}
          <section id="credentials" className="section">
            <div className="container credentials-grid">
              <Card className="certificate-card">
                <img src={certificate} alt="Certificate for Shruti Aggarwal Master in Astrology" className="certificate-image" />
              </Card>
              <Card className="content-card">
                <SectionTitle
                  label="Credentials"
                  title="Verified professional qualification"
                  text="A strong professional presence is built on visible trust signals. This qualification communicates credibility and seriousness to new visitors."
                />
                <div className="content-stack">
                  <p><strong>Qualification:</strong> {BUSINESS.credential}</p>
                  <p><strong>Institution:</strong> {BUSINESS.institute}</p>
                  <p><strong>Grade:</strong> {BUSINESS.grade}</p>
                </div>
              </Card>
            </div>
          </section>

          {/* ── REVIEWS ── */}
          <section id="reviews" className="section">
            <div className="container">
              <SectionTitle
                label="Testimonials"
                title="Client Testimonials"
                text={approvedReviews.length > 0 ? "Real feedback from clients who have experienced a consultation." : "Be the first to share your experience!"}
              />

              {approvedReviews.length > 0 ? (
                <div className="review-grid">
                  {approvedReviews.map((review, index) => (
                    <motion.div key={review.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.06 }}>
                      <Card className="review-card">
                        <div className="stars">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} />
                          ))}
                        </div>
                        <p>{review.text}</p>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                          <strong>{review.name}</strong>
                          {review.service && <span style={{ color: "var(--muted)", fontSize: ".85rem" }}>{review.service}</span>}
                        </div>
                        {review.date && <p style={{ color: "var(--muted)", fontSize: ".8rem", margin: "4px 0 0" }}>{review.date}</p>}
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Card style={{ textAlign: "center", padding: "40px 28px", marginTop: 32 }}>
                  <Star size={32} style={{ color: "var(--gold)", margin: "0 auto 14px", display: "block" }} />
                  <p style={{ color: "var(--muted)" }}>No reviews yet. Share your experience below!</p>
                </Card>
              )}

              {/* Feedback submission form */}
              <div style={{ marginTop: 40, maxWidth: 560 }}>
                <FeedbackForm onSubmitted={refreshReviews} />
              </div>
            </div>
          </section>

          {/* ── APPOINTMENT ── */}
          <section id="appointment" className="section">
            <div className="container appointment-grid">
              <Card className="content-card accent-card">
                <SectionTitle
                  label="Book"
                  title="Request a Consultation"
                  text="Fill in the form and continue on WhatsApp, or send your details by email."
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

          {/* ── FAQ ── */}
          <section id="faq" className="section">
            <div className="container">
              <SectionTitle label="FAQ" title="Frequently Asked Questions" text="Clear answers help first-time visitors feel comfortable contacting you." />
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
            <p
              onClick={handleSecretClick}
              style={{ cursor: "default", userSelect: "none" }}
              title=""
            >
              Vedic Astrology by Shruti Aggarwal • New Delhi & Online
            </p>
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
