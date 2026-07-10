"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Cookie, Shield, Settings, Eye, ToggleLeft, ToggleRight, Info, ChevronDown, ChevronRight, Check } from 'lucide-react';
import { useState } from "react";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

const cookieCategories = [
  {
    id: "essential",
    icon: Shield,
    title: "Essential Cookies",
    description: "These cookies are required for the platform to function correctly. They enable core features like authentication, session management, and security. You cannot disable these.",
    required: true,
    examples: [
      { name: "session_id", purpose: "Maintains your login session across page loads", duration: "Session", type: "HTTP" },
      { name: "csrf_token", purpose: "Protects against cross-site request forgery attacks", duration: "Session", type: "HTTP" },
      { name: "auth_token", purpose: "Stores your encrypted authentication credentials", duration: "30 days", type: "HTTP" },
      { name: "locale_pref", purpose: "Remembers your language and region preference", duration: "1 year", type: "HTTP" },
    ],
  },
  {
    id: "analytics",
    icon: Eye,
    title: "Analytics Cookies",
    description: "These cookies help us understand how visitors interact with Easy Work. We use this data to improve performance, identify popular features, and fix issues faster.",
    required: false,
    examples: [
      { name: "_ew_analytics", purpose: "Tracks page views and user journeys within the dashboard", duration: "90 days", type: "HTTP" },
      { name: "_ew_session", purpose: "Groups actions into a single session for analysis", duration: "30 minutes", type: "HTTP" },
      { name: "feature_usage", purpose: "Records which features are used most frequently", duration: "60 days", type: "LocalStorage" },
      { name: "perf_metrics", purpose: "Captures page load times and rendering performance", duration: "7 days", type: "HTTP" },
    ],
  },
  {
    id: "preferences",
    icon: Settings,
    title: "Preference Cookies",
    description: "These cookies remember your personal settings and customizations so you get a consistent experience every time you return to Easy Work.",
    required: false,
    examples: [
      { name: "theme_mode", purpose: "Stores your light or dark mode preference", duration: "1 year", type: "LocalStorage" },
      { name: "sidebar_state", purpose: "Remembers whether the sidebar is expanded or collapsed", duration: "1 year", type: "LocalStorage" },
      { name: "dashboard_layout", purpose: "Saves your custom dashboard widget arrangement", duration: "1 year", type: "HTTP" },
      { name: "table_density", purpose: "Remembers your preferred table row density setting", duration: "1 year", type: "LocalStorage" },
    ],
  },
  {
    id: "marketing",
    icon: Cookie,
    title: "Marketing Cookies",
    description: "These cookies are used to deliver relevant content and measure the effectiveness of our communications. They help us show you information that matches your interests.",
    required: false,
    examples: [
      { name: "_ew_campaign", purpose: "Tracks which marketing campaign brought you to Easy Work", duration: "90 days", type: "HTTP" },
      { name: "referral_source", purpose: "Records the referring website or partner link", duration: "30 days", type: "HTTP" },
      { name: "email_open", purpose: "Measures whether product update emails were opened", duration: "14 days", type: "HTTP" },
      { name: "feature_interest", purpose: "Notes which feature announcements you engaged with", duration: "60 days", type: "HTTP" },
    ],
  },
];

const faqItems = [
  {
    question: "What exactly is a cookie?",
    answer: "A cookie is a small text file stored on your device by your web browser. Cookies allow websites to remember information about your visit, such as your login status, preferences, and how you interact with the site. They are not programs and cannot carry viruses or install malware.",
  },
  {
    question: "How long do cookies last?",
    answer: "Cookie lifetimes vary by purpose. Session cookies expire when you close your browser. Persistent cookies remain for a set period, ranging from minutes to years, depending on their function. You can see the specific duration for each cookie in the tables above.",
  },
  {
    question: "Can I delete cookies after accepting them?",
    answer: "Yes. You can clear cookies at any time through your browser settings. Note that deleting essential cookies will log you out and may reset your preferences. Most browsers also allow you to block cookies from specific sites or all sites.",
  },
  {
    question: "Do you share cookie data with third parties?",
    answer: "We do not sell cookie data. Analytics data is processed by our internal systems only. If we use any third-party analytics tools, they are bound by strict data processing agreements and are not permitted to use your data for their own purposes.",
  },
  {
    question: "How do I change my cookie preferences?",
    answer: "You can update your preferences at any time using the toggles in the Manage Your Preferences section above. Changes take effect immediately. You can also use your browser's built-in cookie controls for more granular management.",
  },
  {
    question: "What happens if I disable analytics cookies?",
    answer: "Easy Work will continue to function normally. You will simply not contribute to the aggregated usage data we use to improve the product. Your personal data and dashboard content are not affected by this choice.",
  },
];

export default function CookiesPage() {
  const t = useTranslations();

  const [preferences, setPreferences] = useState<Record<string, boolean>>({
    essential: true,
    analytics: true,
    preferences: true,
    marketing: false,
  });

  const [expandedCategory, setExpandedCategory] = useState<string | null>("essential");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const handleToggle = (id: string) => {
    if (id === "essential") return;
    setPreferences((prev) => ({ ...prev, [id]: !prev[id] }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAcceptAll = () => {
    setPreferences({ essential: true, analytics: true, preferences: true, marketing: true });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleRejectOptional = () => {
    setPreferences({ essential: true, analytics: false, preferences: false, marketing: false });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-14"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-violet-600 flex items-center justify-center shadow-[0_2px_12px_rgba(99,102,241,0.4)]">
              <Cookie className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-red-600 dark:text-red-400 tracking-wide uppercase">
              Cookie Policy
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight text-balance mb-4"
          >
            How We Use Cookies
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl text-pretty"
          >
            Easy Work uses cookies to keep you signed in, remember your preferences, and help us understand how the product is used. This page explains exactly what we store and gives you full control over your choices.
          </motion.p>

          <motion.p variants={fadeInUp} className="text-sm text-gray-400 dark:text-gray-500 mt-3">
            Last updated: January 15, 2025
          </motion.p>
        </motion.div>

        {/* Quick Actions Banner */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Your current preferences are saved to your account.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                You can update them at any time using the controls below.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleRejectOptional}
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              Essential only
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-200 shadow-[0_2px_8px_rgba(99,102,241,0.35)] hover:shadow-[0_4px_16px_rgba(99,102,241,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              Accept all
            </button>
          </div>
        </motion.div>

        {/* Manage Preferences */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-10"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-2"
          >
            Manage Your Preferences
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-sm text-gray-500 dark:text-gray-400 mb-6"
          >
            Toggle each category on or off. Essential cookies cannot be disabled as they are required for the platform to operate.
          </motion.p>

          <div className="space-y-3">
            {cookieCategories.map((cat) => {
              const Icon = cat.icon;
              const isExpanded = expandedCategory === cat.id;
              const isEnabled = preferences[cat.id] ?? false;

              return (
                <motion.div
                  key={cat.id}
                  variants={fadeInUp}
                  className="bg-white dark:bg-gray-900 border border-black/5 dark:border-white/8 rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.06)]"
                >
                  {/* Category Header */}
                  <div className="p-5 flex items-center gap-4">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isEnabled ? "bg-red-50 dark:bg-red-500/15" : "bg-gray-100 dark:bg-white/5"}`}>
                      <Icon className={`w-4.5 h-4.5 ${isEnabled ? "text-red-600 dark:text-red-400" : "text-gray-400 dark:text-gray-500"}`} style={{ width: "18px", height: "18px" }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                          {cat.title}
                        </h3>
                        {cat.required && (
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/15 px-2 py-0.5 rounded-full">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                        {cat.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => handleToggle(cat.id)}
                        disabled={cat.required}
                        aria-label={`${isEnabled ? "Disable" : "Enable"} ${cat.title}`}
                        className={`relative w-11 h-6 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 ${
                          cat.required ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                        } ${isEnabled ? "bg-red-600" : "bg-gray-200 dark:bg-gray-700"}`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${
                            isEnabled ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>

                      <button
                        onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                        aria-label={isExpanded ? "Collapse" : "Expand"}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-200"
                      >
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </button>
                    </div>
                  </div>

                  {/* Expanded Cookie Table */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="border-t border-black/5 dark:border-white/8"
                    >
                      <div className="p-5 pt-4">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                          {cat.description}
                        </p>
                        <div className="overflow-x-auto rounded-xl border border-black/5 dark:border-white/8">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="bg-gray-50 dark:bg-white/3">
                                <th className="text-left px-4 py-2.5 font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-[10px]">Name</th>
                                <th className="text-left px-4 py-2.5 font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-[10px]">Purpose</th>
                                <th className="text-left px-4 py-2.5 font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-[10px]">Duration</th>
                                <th className="text-left px-4 py-2.5 font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-[10px]">Type</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-black/5 dark:divide-white/5">
                              {(cat.examples ?? []).map((ex, i) => (
                                <tr key={i} className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors duration-150">
                                  <td className="px-4 py-3 font-mono text-red-600 dark:text-red-400 font-medium whitespace-nowrap">{ex.name}</td>
                                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400 leading-relaxed">{ex.purpose}</td>
                                  <td className="px-4 py-3 text-gray-500 dark:text-gray-500 whitespace-nowrap">{ex.duration}</td>
                                  <td className="px-4 py-3">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/8 text-gray-600 dark:text-gray-400 font-medium text-[10px] uppercase tracking-wide">
                                      {ex.type}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Save Button */}
          <motion.div
            variants={fadeInUp}
            className="mt-6 flex items-center justify-between"
          >
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Changes apply immediately and are saved to your account.
            </p>
            <motion.button
              onClick={handleSave}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                saved
                  ? "bg-green-500 text-white shadow-[0_2px_8px_rgba(34,197,94,0.35)]"
                  : "bg-red-600 hover:bg-red-700 text-white shadow-[0_2px_8px_rgba(99,102,241,0.35)] hover:shadow-[0_4px_16px_rgba(99,102,241,0.45)]"
              }`}
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4" />
                  Saved
                </>
              ) : (
                "Save preferences"
              )}
            </motion.button>
          </motion.div>
        </motion.section>

        {/* Browser Controls */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-10"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-2"
          >
            Browser-Level Controls
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed"
          >
            In addition to the controls above, every major browser lets you manage cookies directly. Here is how to access those settings.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {[
              { browser: "Google Chrome", steps: "Settings > Privacy and security > Cookies and other site data", color: "from-blue-500 to-cyan-500" },
              { browser: "Mozilla Firefox", steps: "Settings > Privacy & Security > Cookies and Site Data", color: "from-orange-500 to-red-500" },
              { browser: "Apple Safari", steps: "Preferences > Privacy > Manage Website Data", color: "from-blue-400 to-red-500" },
              { browser: "Microsoft Edge", steps: "Settings > Cookies and site permissions > Cookies and site data", color: "from-teal-500 to-blue-500" },
            ].map((item) => (
              <motion.div
                key={item.browser}
                variants={fadeInUp}
                whileHover={{ y: -2 }}
                className="bg-white dark:bg-gray-900 border border-black/5 dark:border-white/8 rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.1)] transition-all duration-300"
              >
                <div className={`w-8 h-1.5 rounded-full bg-gradient-to-r ${item.color} mb-3`} />
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1.5">
                  {item.browser}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-mono">
                  {item.steps}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-10"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-2"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-sm text-gray-500 dark:text-gray-400 mb-6"
          >
            Common questions about how Easy Work uses cookies.
          </motion.p>

          <div className="space-y-2">
            {faqItems.map((item, i) => {
              const isOpen = expandedFaq === i;
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="bg-white dark:bg-gray-900 border border-black/5 dark:border-white/8 rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-inset"
                  >
                    <span className="text-sm font-semibold text-gray-900 dark:text-white pr-4">
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 text-gray-400"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="px-5 pb-4 border-t border-black/5 dark:border-white/8 pt-3"
                    >
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Contact / Policy Updates */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div
            variants={scaleIn}
            className="bg-gradient-to-br from-red-50 to-violet-50 dark:from-red-500/10 dark:to-violet-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl p-8 text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-violet-600 flex items-center justify-center mx-auto mb-4 shadow-[0_4px_16px_rgba(99,102,241,0.4)]">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
              Policy Updates and Contact
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg mx-auto mb-6">
              We may update this Cookie Policy when we introduce new features or when regulations change. We will notify you of significant changes via email or an in-app notice. If you have questions, our privacy team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="mailto:privacy@easywork.io"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-200 shadow-[0_2px_8px_rgba(99,102,241,0.35)] hover:shadow-[0_4px_16px_rgba(99,102,241,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                Contact Privacy Team
              </a>
              <a
                href="/privacy"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                Privacy Policy
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </motion.section>

      </div>
    </main>
  );
}