"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Users, BarChart2, Zap, Shield, Star, CheckCircle, Activity, Target, Clock } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useTranslations } from "next-intl";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const signupTrend = [
  { month: "Jan", signups: 420, leads: 310 },
  { month: "Feb", signups: 580, leads: 420 },
  { month: "Mar", signups: 740, leads: 530 },
  { month: "Apr", signups: 690, leads: 490 },
  { month: "May", signups: 890, leads: 640 },
  { month: "Jun", signups: 1120, leads: 810 },
  { month: "Jul", signups: 1340, leads: 970 },
];

const kpis = [
  {
    label: "Total Signups",
    value: "12,847",
    change: "+18.4%",
    positive: true,
    icon: Users,
    color: "from-sky-500 to-violet-600",
    glow: "rgba(99,102,241,0.3)",
  },
  {
    label: "Qualified Leads",
    value: "4,291",
    change: "+23.1%",
    positive: true,
    icon: Target,
    color: "from-sky-500 to-teal-600",
    glow: "rgba(16,185,129,0.3)",
  },
  {
    label: "Conversion Rate",
    value: "33.4%",
    change: "+4.2%",
    positive: true,
    icon: TrendingUp,
    color: "from-violet-500 to-purple-600",
    glow: "rgba(139,92,246,0.3)",
  },
  {
    label: "Avg. Time to Convert",
    value: "6.2 days",
    change: "-1.4 days",
    positive: true,
    icon: Clock,
    color: "from-amber-500 to-orange-500",
    glow: "rgba(245,158,11,0.3)",
  },
];

const features = [
  {
    icon: Activity,
    title: "Real-Time Signup Tracking",
    description:
      "Watch new signups land the moment they happen. Live counters, source attribution, and instant alerts keep your team ahead of every wave.",
  },
  {
    icon: Target,
    title: "Lead Scoring Engine",
    description:
      "Automatically rank every lead by fit and intent. Focus your sales team on the prospects most likely to convert, not the noise.",
  },
  {
    icon: BarChart2,
    title: "Funnel Analytics",
    description:
      "Visualize every step from first touch to closed deal. Spot drop-off points and fix them before they cost you revenue.",
  },
  {
    icon: Zap,
    title: "Instant Integrations",
    description:
      "Connect your CRM, email platform, and ad channels in minutes. Easy Work syncs data so you never chase a spreadsheet again.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description:
      "SOC 2 Type II certified, GDPR compliant, and encrypted at rest and in transit. Your customer data stays yours.",
  },
  {
    icon: TrendingUp,
    title: "Predictive Forecasting",
    description:
      "AI-powered models project next month's signups and revenue based on your historical patterns and current pipeline.",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Head of Growth, Luma Health",
    avatar: "https://www.investopedia.com/thmb/l5OhfOZdZM1iT9S_WTVs-Tw0Q6Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/predictive-analytics.asp-final-fc908743618a4f9093dfdd1fa6e9815a.png",
    quote:
      "Easy Work cut our reporting time by 70%. We went from weekly spreadsheets to a live dashboard our whole team trusts.",
    stars: 5,
  },
  {
    name: "Marcus Rivera",
    role: "Co-founder, Stackline",
    avatar: "http://tinabangel.com/wp-content/uploads/2015/04/MARCUS-RIVERA.png",
    quote:
      "The lead scoring alone paid for the subscription in the first month. We stopped wasting calls on cold prospects.",
    stars: 5,
  },
  {
    name: "Priya Nair",
    role: "VP Sales, Orbit SaaS",
    avatar: "https://img.etimg.com/thumb/width-1200,height-1200,imgsize-1309092,resizemode-75,msid-122368466/industry/cons-products/fmcg/priya-nairs-playbook-how-hindustan-unilevers-new-ceo-built-global-brands-with-indian-roots.jpg",
    quote:
      "Finally, a dashboard that shows signups and pipeline in one place. Our Monday standups are 15 minutes shorter.",
    stars: 5,
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$29",
    period: "/mo",
    description: "Perfect for early-stage teams tracking their first signups.",
    features: [
      "Up to 1,000 signups/mo",
      "3 team seats",
      "7-day data history",
      "Email alerts",
      "CSV export",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$89",
    period: "/mo",
    description: "For scaling teams that need deeper lead intelligence.",
    features: [
      "Up to 20,000 signups/mo",
      "15 team seats",
      "12-month data history",
      "Lead scoring engine",
      "CRM integrations",
      "Predictive forecasting",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Dedicated infrastructure and white-glove onboarding.",
    features: [
      "Unlimited signups",
      "Unlimited seats",
      "Full data history",
      "SSO & SAML",
      "SLA guarantee",
      "Dedicated CSM",
    ],
    cta: "Talk to sales",
    highlighted: false,
  },
];

// ─── Reusable animated section wrapper ───────────────────────────────────────

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

// ─── Page component ───────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();
  const shouldReduceMotion = useReducedMotion();

  const motionProps = (variants: Variants) =>
    shouldReduceMotion
      ? {}
      : {
          variants,
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: { once: true, margin: "-80px" },
        };

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Background glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-sky-500/10 dark:bg-sky-500/8 blur-[120px]" />
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-violet-500/8 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: copy */}
            <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="flex flex-col gap-6">
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-semibold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t("hero.badge")}
                </span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight text-balance leading-[1.1]">
                {t("hero.title.line1")}{" "}
                <span className="bg-gradient-to-r from-sky-500 to-violet-600 bg-clip-text text-transparent">
                  {t("hero.title.accent")}
                </span>{" "}
                {t("hero.title.line2")}
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg text-pretty">
                {t("hero.subtitle")}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 pt-2">
                <Link href="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm shadow-[0_2px_8px_rgba(99,102,241,0.4)] hover:shadow-[0_4px_20px_rgba(99,102,241,0.5)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2">
                  {t("hero.cta.primary")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/analytics" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2">
                  {t("hero.cta.secondary")}
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-center gap-6 pt-2">
                {[
                  { label: t("hero.stat1.label"), value: t("hero.stat1.value") },
                  { label: t("hero.stat2.label"), value: t("hero.stat2.value") },
                  { label: t("hero.stat3.label"), value: t("hero.stat3.value") },
                ].map((stat) => (<div key={stat.label} className="flex flex-col">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </span>
                </div>))}
              </motion.div>
            </motion.div>

            {/* Right: mini dashboard preview */}
            <motion.div variants={scaleIn} initial="hidden" animate="visible" className="relative">
              <div className="relative rounded-2xl bg-white dark:bg-gray-900 border border-black/5 dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] p-5 overflow-hidden">
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {t("hero.chart.title")}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                      12,847
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-semibold">
                    <TrendingUp className="w-3 h-3" />
                    +18.4%
                  </span>
                </div>

                {/* Chart */}
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={signupTrend}
                      margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="signupGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366F1" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="currentColor"
                        className="text-gray-100 dark:text-gray-800"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 11, fill: "currentColor" }}
                        className="text-gray-400"
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "currentColor" }}
                        className="text-gray-400"
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "var(--tooltip-bg, #fff)",
                          border: "1px solid rgba(0,0,0,0.06)",
                          borderRadius: "10px",
                          fontSize: "12px",
                          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="signups"
                        stroke="#6366F1"
                        strokeWidth={2}
                        fill="url(#signupGrad)"
                        name="Signups"
                      />
                      <Area
                        type="monotone"
                        dataKey="leads"
                        stroke="#10B981"
                        strokeWidth={2}
                        fill="url(#leadGrad)"
                        name="Leads"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 mt-3">
                  <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                    {t("hero.chart.legend.signups")}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                    {t("hero.chart.legend.leads")}
                  </span>
                </div>
              </div>

              {/* Floating KPI badge */}
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-900 border border-black/5 dark:border-white/10 rounded-xl px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-teal-600 flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t("hero.badge2.label")}
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    +142 {t("hero.badge2.suffix")}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* ── KPI STRIP ────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={sectionVariants} {...motionProps(sectionVariants)} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <motion.div key={kpi.label} variants={fadeInUp} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="relative bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)] overflow-hidden group cursor-default">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center shadow-[0_2px_8px_var(--glow)]`} style={{ "--glow": kpi.glow } as React.CSSProperties}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        kpi.positive
                          ? "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400"
                          : "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400"
                      }`}>
                      {kpi.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    {kpi.value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {kpi.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} {...motionProps(fadeInUp)} className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-semibold tracking-wide mb-4">
              {t("features.eyebrow")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight text-balance">
              {t("features.title")}
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed text-pretty">
              {t("features.subtitle")}
            </p>
          </motion.div>

          {/* Bento-style asymmetric grid */}
          <motion.div variants={sectionVariants} {...motionProps(sectionVariants)} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Large feature card */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="md:col-span-2 bg-gradient-to-br from-sky-500 to-violet-600 rounded-2xl p-8 text-white shadow-[0_4px_24px_rgba(99,102,241,0.3)] relative overflow-hidden"
              style={{
                color: "#84cc16"
              }}>
              <div aria-hidden className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-5">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{
                  fontSize: "64px"
                }}>
                {t("features.card1.title")}
              </h3>
              <p className="text-sky-100 leading-relaxed text-sm max-w-md">
                {t("features.card1.description")}
              </p>
              <div className="mt-6 h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={signupTrend.slice(-5)}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <Bar
                      dataKey="signups"
                      fill="rgba(255,255,255,0.4)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Tall single card */}
            <motion.div variants={fadeInUp} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)]">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-teal-600 flex items-center justify-center mb-5 shadow-[0_2px_8px_rgba(16,185,129,0.3)]">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                {t("features.card2.title")}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("features.card2.description")}
              </p>
              <div className="mt-5 space-y-2">
                {[90, 65, 45].map((pct, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-sky-500 to-teal-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-gray-400 w-8 text-right">
                      {pct}%
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Three smaller cards */}
            {features.slice(2).map((feat) => {
              const Icon = feat.icon;
              return (
                <motion.div key={feat.title} variants={fadeInUp} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)]">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feat.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
      {/* ── SOCIAL PROOF ─────────────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} {...motionProps(fadeInUp)} className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-semibold tracking-wide mb-4">
              {t("testimonials.eyebrow")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight text-balance">
              {t("testimonials.title")}
            </h2>
          </motion.div>

          <motion.div variants={sectionVariants} {...motionProps(sectionVariants)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t_item, idx) => (
              <motion.div
                key={t_item.name}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)] flex flex-col gap-4 ${
                  idx === 1 ? "md:-mt-4 md:mb-4" : ""
                }`}>
                <div className="flex items-center gap-1">
                  {Array.from({ length: t_item.stars }).map((_, s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                  &ldquo;{t_item.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-black/5 dark:border-white/5">
                  <img
                    src={t_item.avatar}
                    alt={t_item.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-sky-100 dark:ring-sky-500/20"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(t_item.name)}&background=6366F1&color=fff&size=64`;
                    }} />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {t_item.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t_item.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} {...motionProps(fadeInUp)} className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-semibold tracking-wide mb-4">
              {t("pricing.eyebrow")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight text-balance">
              {t("pricing.title")}
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
              {t("pricing.subtitle")}
            </p>
          </motion.div>

          <motion.div variants={sectionVariants} {...motionProps(sectionVariants)} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {pricingPlans.map((plan) => (<motion.div
              key={plan.name}
              variants={scaleIn}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative rounded-2xl p-7 flex flex-col gap-5 ${
                plan.highlighted
                  ? "bg-gradient-to-br from-sky-600 to-violet-700 text-white shadow-[0_8px_32px_rgba(99,102,241,0.35)] border border-sky-400/30"
                  : "bg-white dark:bg-gray-900 border border-black/5 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)]"
              }`}>
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-amber-400 text-amber-900 text-xs font-bold tracking-wide shadow-sm">
                  {t("pricing.popular")}
                </span>
              )}
              <div>
                <p
                  className={`text-sm font-semibold mb-1 ${
                    plan.highlighted
                      ? "text-sky-200"
                      : "text-gray-500 dark:text-gray-400"
                  }`}>
                  {plan.name}
                </p>
                <div className="flex items-end gap-1">
                  <span
                    className={`text-4xl font-bold tracking-tight ${
                      plan.highlighted
                        ? "text-white"
                        : "text-gray-900 dark:text-white"
                    }`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      className={`text-sm mb-1 ${
                        plan.highlighted
                          ? "text-sky-200"
                          : "text-gray-500 dark:text-gray-400"
                      }`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p
                  className={`text-xs mt-2 leading-relaxed ${
                    plan.highlighted
                      ? "text-sky-200"
                      : "text-gray-500 dark:text-gray-400"
                  }`}>
                  {plan.description}
                </p>
              </div>
              <ul className="space-y-2.5 flex-1">
                {plan.features.map((feat) => (<li key={feat} className="flex items-start gap-2.5">
                  <CheckCircle
                    className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      plan.highlighted
                        ? "text-sky-200"
                        : "text-sky-500 dark:text-sky-400"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      plan.highlighted
                        ? "text-sky-100"
                        : "text-gray-700 dark:text-gray-300"
                    }`}>
                    {feat}
                  </span>
                </li>))}
              </ul>
              <Link
                href="/dashboard"
                className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  plan.highlighted
                    ? "bg-white text-sky-700 hover:bg-sky-50 focus-visible:ring-white shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                    : "bg-sky-600 hover:bg-sky-700 text-white focus-visible:ring-sky-500 shadow-[0_2px_8px_rgba(99,102,241,0.3)]"
                }`}>
                {plan.cta}
              </Link>
            </motion.div>))}
          </motion.div>
        </div>
      </section>
      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={scaleIn} {...motionProps(scaleIn)} className="relative rounded-3xl bg-gradient-to-br from-sky-600 via-sky-600 to-violet-700 p-10 md:p-14 text-center overflow-hidden shadow-[0_8px_40px_rgba(99,102,241,0.35)]">
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/5" />
            </div>

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-white text-xs font-semibold tracking-wide mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                {t("cta.badge")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight text-balance mb-4">
                {t("cta.title")}
              </h2>
              <p className="text-sky-200 leading-relaxed max-w-lg mx-auto mb-8 text-pretty">
                {t("cta.subtitle")}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/dashboard" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-sky-700 font-bold text-sm hover:bg-sky-50 transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-sky-600">
                  {t("cta.primary")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/analytics" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                  {t("cta.secondary")}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}