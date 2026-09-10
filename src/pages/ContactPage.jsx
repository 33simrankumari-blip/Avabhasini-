import React, { useState, useEffect } from "react";
import { setPageMeta } from "../siteMeta.js";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Phone } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  useEffect(() => {
    setPageMeta({
      title: "Contact & Support · AYURDISHA · WAC 2026",
      description: "Contact the AYURDISHA Meet the Mentors desk for 11th World Ayurveda Congress inquiries.",
      path: "/contact",
    });
  }, []);

  function validate() {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Please enter your full name.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim()) errs.subject = "Please enter a subject.";
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = "Please enter a message of at least 10 characters.";
    }
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  }

  return (
    <div className="aym-page aym-py-12">
      <div className="aym-container aym-max-w-4xl">
        <Breadcrumbs items={[{ name: "Contact & Support" }]} />

        <header className="aym-page-header">
          <p className="aym-eyebrow">WORLD AYURVEDA CONGRESS DESK</p>
          <h1 className="aym-display">Contact AYURDISHA Support</h1>
          <p className="aym-lead">
            Have questions about registration, Ask Desk tickets, or the Meet the Mentors hall in Bhubaneswar? Get in touch with our team.
          </p>
        </header>

        <div className="aym-grid-2 aym-gap-8">
          {/* CONTACT INFO CARD */}
          <div className="aym-card aym-p-6">
            <h2 className="aym-h3 aym-mb-4">Congress Hall Information</h2>
            <div className="aym-contact-info-list">
              <div className="aym-flex-align-center aym-gap-3 aym-mb-4">
                <MapPin size={20} className="aym-text-maroon" />
                <div>
                  <strong>Event Venue</strong>
                  <p className="aym-text-sm">11th World Ayurveda Congress,<br />Bhubaneswar, Odisha, India</p>
                </div>
              </div>
              <div className="aym-flex-align-center aym-gap-3 aym-mb-4">
                <Mail size={20} className="aym-text-maroon" />
                <div>
                  <strong>World Ayurveda Foundation</strong>
                  <p className="aym-text-sm">Official Meet the Mentors Platform</p>
                </div>
              </div>
            </div>

            <div className="aym-callout-box aym-mt-6">
              <h4>Asking a Career Question?</h4>
              <p className="aym-text-sm">
                If you wish to ask a mentor about PG, clinical practice, or research, please use the official Ask Desk on the home page.
              </p>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="aym-card aym-p-6">
            <h2 className="aym-h3 aym-mb-4">Send a Message</h2>

            {status === "success" ? (
              <div className="aym-success-banner" role="status">
                <CheckCircle2 size={24} className="aym-text-green" />
                <div>
                  <h3>Thank you for reaching out!</h3>
                  <p>Your message has been received by the AYURDISHA support desk.</p>
                  <button type="button" className="aym-btn aym-btn-outline aym-btn-sm aym-mt-3" onClick={() => setStatus("idle")}>
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                <div className="aym-form-group">
                  <label htmlFor="contact-name" className="aym-label">
                    Full Name <span className="aym-required">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className={`aym-input ${errors.name ? "aym-input-error" : ""}`}
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    aria-describedby={errors.name ? "err-name" : undefined}
                    aria-required="true"
                  />
                  {errors.name && <p id="err-name" className="aym-field-error">{errors.name}</p>}
                </div>

                <div className="aym-form-group">
                  <label htmlFor="contact-email" className="aym-label">
                    Email Address <span className="aym-required">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className={`aym-input ${errors.email ? "aym-input-error" : ""}`}
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    aria-describedby={errors.email ? "err-email" : undefined}
                    aria-required="true"
                  />
                  {errors.email && <p id="err-email" className="aym-field-error">{errors.email}</p>}
                </div>

                <div className="aym-form-group">
                  <label htmlFor="contact-subject" className="aym-label">
                    Subject <span className="aym-required">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    className={`aym-input ${errors.subject ? "aym-input-error" : ""}`}
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    aria-describedby={errors.subject ? "err-subject" : undefined}
                    aria-required="true"
                  />
                  {errors.subject && <p id="err-subject" className="aym-field-error">{errors.subject}</p>}
                </div>

                <div className="aym-form-group">
                  <label htmlFor="contact-message" className="aym-label">
                    Message <span className="aym-required">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    className={`aym-textarea ${errors.message ? "aym-input-error" : ""}`}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    aria-describedby={errors.message ? "err-message" : undefined}
                    aria-required="true"
                  />
                  {errors.message && <p id="err-message" className="aym-field-error">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="aym-btn aym-btn-primary aym-w-full"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending..." : "Send Message"} <Send size={16} aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
