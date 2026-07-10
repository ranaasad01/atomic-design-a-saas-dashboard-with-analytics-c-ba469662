"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, UserCheck, Globe, Mail, ChevronRight } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

const sections = [
  {
    id: "information-we-collect",
    icon: Database,
    title: "Information We Collect",
    content: [
      {
        subtitle: "Account Information",
        text: "When you create an Easy Work account, we collect your name, email address, password (stored as a secure hash), and optional profile details such as your company name and job title.",
      },
      {
        subtitle: "Usage Data",
        text: "We automatically collect information about how you interact with our platform, including pages visited, features used, time spent, click patterns, and dashboard configurations. This helps us improve the product experience.",
      },
      {
        subtitle: "Device and Technical Data",
        text: "We collect your IP address, browser type and version, operating system, device identifiers, and referral URLs to ensure compatibility and detect abuse.",
      },
      {
        subtitle: "Payment Information",
        text: "Billing details are processed by our PCI-DSS-compliant payment partner, Stripe. Easy Work never stores raw card numbers on our servers.",
      },
    ],
  },
  {
    id: "how-we-use",
    icon: Eye,
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "Service Delivery",
        text: "We use your data to operate, maintain, and improve Easy Work, including generating analytics reports, processing signups and leads, and personalizing your dashboard experience.",
      },
      {
        subtitle: "Communications",
        text: "We send transactional emails (password resets, billing receipts, security alerts) and, with your consent, product updates and feature announcements. You can opt out of marketing emails at any time.",
      },
      {
        subtitle: "Analytics and Research",
        text: "Aggregated, anonymized usage data helps us understand product trends, prioritize features, and measure the effectiveness of our platform improvements.",
      },
      {
        subtitle: "Legal Compliance",
        text: "We may process your data to comply with applicable laws, respond to lawful requests from authorities, and enforce our Terms of Service.",
      },
    ],
  },
  {
    id: "data-sharing",
    icon: Globe,
    title: "Data Sharing and Disclosure",
    content: [
      {
        subtitle: "Service Providers",
        text: "We share data with trusted third-party vendors who help us operate Easy Work, including cloud hosting (AWS), analytics (Mixpanel), customer support (Intercom), and payment processing (Stripe). All vendors are contractually bound to protect your data.",
      },
      {
        subtitle: "Business Transfers",
        text: "If Easy Work is acquired, merged, or undergoes a change of control, your data may be transferred as part of that transaction. We will notify you via email and a prominent notice on our site before any such transfer.",
      },
      {
        subtitle: "Legal Requirements",
        text: "We may disclose your information if required by law, subpoena, or other legal process, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.",
      },
      {
        subtitle: "No Sale of Data",
        text: "Easy Work does not sell, rent, or trade your personal information to third parties for their marketing purposes. Period.",
      },
    ],
  },
  {
    id: "data-security",
    icon: Lock,
    title: "Data Security",
    content: [
      {
        subtitle: "Encryption",
        text: "All data transmitted between your browser and our servers is encrypted using TLS 1.3. Data at rest is encrypted using AES-256. Passwords are hashed with bcrypt and never stored in plaintext.",
      },
      {
        subtitle: "Access Controls",
        text: "Access to production systems is restricted to authorized personnel using multi-factor authentication and role-based permissions. We conduct regular access reviews and revoke credentials promptly when employees leave.",
      },
      {
        subtitle: "Security Audits",
        text: "We perform annual third-party penetration tests and continuous automated vulnerability scanning. Our security team monitors for threats around the clock.",
      },
      {
        subtitle: "Incident Response",
        text: "In the event of a data breach affecting your personal information, we will notify you within 72 hours of discovery, in accordance with GDPR and applicable regulations.",
      },
    ],
  },
  {
    id: "your-rights",
    icon: UserCheck,
    title: "Your Rights and Choices",
    content: [
      {
        subtitle: "Access and Portability",
        text: "You can request a copy of all personal data we hold about you at any time. We will provide it in a machine-readable format (JSON or CSV) within 30 days.",
      },
      {
        subtitle: "Correction",
        text: "If any information we hold is inaccurate or incomplete, you can update it directly in your account settings or contact our support team.",
      },
      {
        subtitle: "Deletion",
        text: "You may request deletion of your account and associated personal data. We will fulfill the request within 30 days, subject to legal retention obligations (e.g., billing records required for tax compliance).",
      },
      {
        subtitle: "Opt-Out",
        text: "You can opt out of marketing communications via the unsubscribe link in any email, or through your notification preferences in Settings. You may also opt out of analytics tracking by enabling Do Not Track in your browser.",
      },
    ],
  },
  {
    id: "cookies",
    icon: Shield,
    title: "Cookies and Tracking",
    content: [
      {
        subtitle: "Essential Cookies",
        text: "We use strictly necessary cookies to maintain your session, remember your preferences, and keep you logged in. These cannot be disabled without breaking core functionality.",
      },
      {
        subtitle: "Analytics Cookies",
        text: "With your consent, we use analytics cookies to understand how users navigate Easy Work. This data is aggregated and does not identify you personally.",
      },
      {
        subtitle: "Managing Cookies",
        text: "You can control cookie preferences through our cookie consent banner or your browser settings. Note that disabling certain cookies may affect the functionality of the dashboard.",
      },
    ],
  },
];

const highlights = [
  { label: "Data Encrypted", value: "AES-256" },
  { label: "Breach Notification", value: "72 hrs" },
  { label: "Data Deletion", value: "30 days" },
  { label: "Compliance", value: "GDPR" },
];

export default function PrivacyPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-24">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div variants={scaleIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 mb-6">
            <Shield className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span className="text-xs font-semibold text-red-600 dark:text-red-400 tracking-wide uppercase">Privacy Policy</span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight text-balance mb-4"
          >
            Your Privacy Matters to Us
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed text-pretty max-w-2xl mx-auto mb-8"
          >
            Easy Work is built on a foundation of trust. This policy explains exactly what data we collect, why we collect it, and how you stay in control.
          </motion.p>

          <motion.p variants={fadeIn} className="text-sm text-gray-400 dark:text-gray-500">
            Last updated: January 15, 2025
          </motion.p>
        </motion.div>
      </section>

      {/* Highlight stats */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {highlights.map((h) => (
            <motion.div
              key={h.label}
              variants={scaleIn}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-5 text-center"
            >
              <p className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">{h.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{h.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Table of contents */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-6"
        >
          <h2 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Table of Contents</h2>
          <ul className="space-y-2">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="flex items-center gap-3 group text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 py-1"
                >
                  <span className="w-5 h-5 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-[10px] font-bold text-red-600 dark:text-red-400 flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="group-hover:underline underline-offset-2">{s.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* Main content sections */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {sections.map((section, sIdx) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.id}
              id={section.id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] overflow-hidden"
            >
              {/* Section header */}
              <div className="flex items-center gap-4 px-6 py-5 border-b border-black/5 dark:border-white/10 bg-gray-50/50 dark:bg-white/[0.02]">
                <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4.5 h-4.5 text-red-600 dark:text-red-400" style={{ width: 18, height: 18 }} />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Section {sIdx + 1}</span>
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white leading-tight">{section.title}</h2>
                </div>
              </div>

              {/* Section body */}
              <div className="divide-y divide-black/5 dark:divide-white/5">
                {section.content.map((item) => (
                  <div key={item.subtitle} className="px-6 py-5">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5">{item.subtitle}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Contact section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 to-violet-600 p-8 text-center shadow-[0_4px_32px_rgba(99,102,241,0.3)]"
        >
          {/* Background texture */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Questions About Your Privacy?</h2>
            <p className="text-red-100 text-sm leading-relaxed mb-6 max-w-md mx-auto">
              Our Data Protection Officer is here to help. Reach out and we will respond within two business days.
            </p>
            <a
              href="mailto:privacy@easywork.io"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-red-600 font-semibold text-sm hover:bg-red-50 transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Mail className="w-4 h-4" />
              privacy@easywork.io
            </a>
            <p className="text-red-200 text-xs mt-4">
              Easy Work, Inc. 340 Pine Street, Suite 800, San Francisco, CA 94104
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}