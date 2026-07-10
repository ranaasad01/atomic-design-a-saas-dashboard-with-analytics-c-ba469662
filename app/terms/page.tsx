"use client";

import { motion } from "framer-motion";
import { FileText, Shield, AlertCircle, CheckCircle, Mail, Calendar, ChevronRight } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { APP_NAME } from "@/lib/data";
import { useTranslations } from "next-intl";

const lastUpdated = "January 15, 2025";

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    icon: CheckCircle,
    content: [
      "By accessing or using Easy Work, you confirm that you are at least 18 years old and have the legal authority to enter into these Terms on behalf of yourself or your organization.",
      "If you are using Easy Work on behalf of a company or other legal entity, you represent that you have the authority to bind that entity to these Terms. If you do not have such authority, you must not accept these Terms or use the service.",
      "Your continued use of Easy Work after any changes to these Terms constitutes your acceptance of the revised Terms. We recommend reviewing this page periodically.",
    ],
  },
  {
    id: "services",
    title: "Description of Services",
    icon: FileText,
    content: [
      "Easy Work provides a SaaS analytics and lead management platform designed to help businesses track signups, manage leads, and gain actionable insights from their data.",
      "Our services include, but are not limited to: real-time analytics dashboards, lead tracking and management, customizable reporting, team collaboration tools, and API integrations with third-party platforms.",
      "We reserve the right to modify, suspend, or discontinue any part of the service at any time with reasonable notice. We will not be liable to you or any third party for any modification, suspension, or discontinuation of services.",
    ],
  },
  {
    id: "accounts",
    title: "User Accounts and Responsibilities",
    icon: Shield,
    content: [
      "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.",
      "You must provide accurate, current, and complete information during registration and keep your account information updated. Providing false information may result in immediate termination of your account.",
      "You may not share your account credentials with others or allow multiple users to access the service through a single account unless you have subscribed to a plan that explicitly permits this.",
    ],
  },
  {
    id: "prohibited",
    title: "Prohibited Uses",
    icon: AlertCircle,
    content: [
      "You agree not to use Easy Work for any unlawful purpose or in any way that could damage, disable, overburden, or impair our servers or networks.",
      "Prohibited activities include: attempting to gain unauthorized access to any part of the service, using automated tools to scrape or extract data without permission, transmitting malware or harmful code, and engaging in any activity that violates applicable laws or regulations.",
      "We reserve the right to investigate and take appropriate legal action against anyone who, in our sole discretion, violates these provisions, including removing offending content and terminating or suspending accounts.",
    ],
  },
  {
    id: "data",
    title: "Data and Privacy",
    icon: Shield,
    content: [
      "Your use of Easy Work is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using Easy Work, you consent to the collection and use of your data as described in our Privacy Policy.",
      "You retain ownership of all data you upload or create within Easy Work. By using our service, you grant us a limited license to process and store your data solely for the purpose of providing the service to you.",
      "We implement industry-standard security measures to protect your data, including encryption at rest and in transit, regular security audits, and strict access controls. However, no method of transmission over the internet is 100% secure.",
    ],
  },
  {
    id: "billing",
    title: "Billing and Payments",
    icon: FileText,
    content: [
      "Easy Work offers subscription-based pricing plans. By subscribing, you authorize us to charge your payment method on a recurring basis at the rate specified for your chosen plan.",
      "All fees are exclusive of applicable taxes. You are responsible for paying any taxes associated with your use of Easy Work. Prices are subject to change with 30 days advance notice.",
      "Refunds are provided at our discretion. If you believe you have been charged in error, please contact our support team within 30 days of the charge. Annual subscriptions may be eligible for a prorated refund within the first 14 days.",
    ],
  },
  {
    id: "termination",
    title: "Termination",
    icon: AlertCircle,
    content: [
      "You may cancel your account at any time through your account settings or by contacting our support team. Upon cancellation, your access to the service will continue until the end of your current billing period.",
      "We may suspend or terminate your account immediately if you violate these Terms, engage in fraudulent activity, or if we are required to do so by law. We will make reasonable efforts to notify you before termination.",
      "Upon termination, your right to use Easy Work ceases immediately. You may request an export of your data within 30 days of termination, after which your data may be permanently deleted.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    icon: Shield,
    content: [
      "To the maximum extent permitted by applicable law, Easy Work and its affiliates, officers, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service.",
      "Our total liability to you for any claims arising from these Terms or your use of Easy Work shall not exceed the amount you paid us in the 12 months preceding the claim.",
      "Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability, so some of the above limitations may not apply to you.",
    ],
  },
];

const highlights = [
  { label: "Last Updated", value: lastUpdated, icon: Calendar },
  { label: "Effective Date", value: "January 15, 2025", icon: CheckCircle },
  { label: "Contact", value: "legal@easywork.io", icon: Mail },
];

export default function TermsPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-20">
      {/* Hero */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden bg-white dark:bg-gray-900 border-b border-black/5 dark:border-white/10"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-500/5 dark:bg-red-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <FileText className="w-3.5 h-3.5" />
            Legal
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight text-balance mb-4"
          >
            Terms of Service
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto text-pretty"
          >
            Please read these terms carefully before using {APP_NAME}. By accessing our platform, you agree to be bound by the conditions outlined below.
          </motion.p>

          {/* Highlights */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  variants={scaleIn}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                >
                  <Icon className="w-4 h-4 text-red-500" />
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{item.label}:</span>
                  <span className="text-xs text-gray-800 dark:text-gray-200 font-semibold">{item.value}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar TOC */}
          <motion.aside
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-5">
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                Contents
              </p>
              <nav className="space-y-1">
                {sections.map((section, i) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200 group"
                  >
                    <span className="w-5 h-5 flex items-center justify-center rounded-md bg-gray-100 dark:bg-white/5 text-[10px] font-bold text-gray-400 dark:text-gray-500 group-hover:bg-red-100 dark:group-hover:bg-red-500/20 group-hover:text-red-600 dark:group-hover:text-red-400 transition-all duration-200 flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="leading-tight">{section.title}</span>
                    <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                  </a>
                ))}
              </nav>
            </div>
          </motion.aside>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-8">
            {sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <motion.section
                  key={section.id}
                  id={section.id}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-7 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-8px_rgba(0,0,0,0.12)] transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-red-500 dark:text-red-400 uppercase tracking-widest">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                        {section.title}
                      </h2>
                    </div>
                  </div>
                  <div className="space-y-4 pl-14">
                    {(section.content ?? []).map((paragraph, j) => (
                      <p
                        key={j}
                        className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.section>
              );
            })}

            {/* Contact CTA */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 to-violet-600 p-8 text-white shadow-[0_4px_24px_rgba(99,102,241,0.35)]"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              </div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-5 h-5 text-red-200" />
                  <h3 className="text-lg font-bold tracking-tight">Questions about these terms?</h3>
                </div>
                <p className="text-sm text-red-100 leading-relaxed mb-5 max-w-lg">
                  Our legal team is happy to clarify any part of these Terms of Service. Reach out and we will respond within one business day.
                </p>
                <a
                  href="mailto:legal@easywork.io"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Mail className="w-4 h-4" />
                  legal@easywork.io
                </a>
              </div>
            </motion.div>

            {/* Footer note */}
            <motion.p
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="text-xs text-gray-400 dark:text-gray-500 text-center leading-relaxed"
            >
              These Terms of Service were last updated on {lastUpdated}. Previous versions are available upon request. By continuing to use {APP_NAME} after updates are posted, you accept the revised terms.
            </motion.p>
          </div>
        </div>
      </div>
    </main>
  );
}