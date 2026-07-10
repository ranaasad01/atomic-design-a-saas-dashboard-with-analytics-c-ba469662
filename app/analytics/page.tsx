"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts";
import { TrendingUp, TrendingDown, Users, ArrowUpRight, ArrowDownRight, Activity, BarChart2, Eye, EyeOff, Calendar, Download } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const monthlyData = [
  { date: "Jan", signups: 320, leads: 210, revenue: 18400, mrr: 18400 },
  { date: "Feb", signups: 410, leads: 280, revenue: 21200, mrr: 21200 },
  { date: "Mar", signups: 390, leads: 260, revenue: 22800, mrr: 22800 },
  { date: "Apr", signups: 520, leads: 340, revenue: 26500, mrr: 26500 },
  { date: "May", signups: 610, leads: 420, revenue: 31200, mrr: 31200 },
  { date: "Jun", signups: 580, leads: 390, revenue: 29800, mrr: 29800 },
  { date: "Jul", signups: 720, leads: 510, revenue: 36400, mrr: 36400 },
  { date: "Aug", signups: 810, leads: 590, revenue: 41200, mrr: 41200 },
  { date: "Sep", signups: 760, leads: 540, revenue: 39600, mrr: 39600 },
  { date: "Oct", signups: 920, leads: 680, revenue: 47800, mrr: 47800 },
  { date: "Nov", signups: 1050, leads: 780, revenue: 54200, mrr: 54200 },
  { date: "Dec", signups: 1180, leads: 890, revenue: 61500, mrr: 61500 },
];

const weeklyQualityData = [
  { week: "W1", hot: 42, warm: 68, cold: 95, unqualified: 31 },
  { week: "W2", hot: 55, warm: 74, cold: 88, unqualified: 27 },
  { week: "W3", hot: 38, warm: 61, cold: 102, unqualified: 35 },
  { week: "W4", hot: 67, warm: 82, cold: 79, unqualified: 22 },
  { week: "W5", hot: 71, warm: 90, cold: 85, unqualified: 18 },
  { week: "W6", hot: 59, warm: 77, cold: 91, unqualified: 29 },
  { week: "W7", hot: 83, warm: 95, cold: 72, unqualified: 15 },
  { week: "W8", hot: 92, warm: 108, cold: 68, unqualified: 12 },
];

const metricsComparison = [
  {
    metric: "Total Signups",
    current: 8270,
    previous: 6140,
    change: 34.7,
    sparkline: [320, 410, 390, 520, 610, 580, 720, 810, 760, 920, 1050, 1180],
    positive: true,
  },
  {
    metric: "Qualified Leads",
    current: 5460,
    previous: 4210,
    change: 29.7,
    sparkline: [210, 280, 260, 340, 420, 390, 510, 590, 540, 680, 780, 890],
    positive: true,
  },
  {
    metric: "Conversion Rate",
    current: 66.0,
    previous: 68.6,
    change: -2.6,
    sparkline: [65.6, 68.3, 66.7, 65.4, 68.9, 67.2, 70.8, 72.8, 71.1, 73.9, 74.3, 75.4],
    positive: false,
    suffix: "%",
  },
  {
    metric: "Avg. Lead Value",
    current: 842,
    previous: 718,
    change: 17.3,
    sparkline: [680, 710, 695, 730, 760, 748, 790, 815, 808, 830, 838, 842],
    positive: true,
    prefix: "$",
  },
  {
    metric: "MRR",
    current: 61500,
    previous: 47800,
    change: 28.7,
    sparkline: [18400, 21200, 22800, 26500, 31200, 29800, 36400, 41200, 39600, 47800, 54200, 61500],
    positive: true,
    prefix: "$",
  },
  {
    metric: "Churn Rate",
    current: 2.1,
    previous: 3.4,
    change: -38.2,
    sparkline: [4.2, 3.9, 3.7, 3.5, 3.2, 3.4, 3.1, 2.8, 2.6, 2.4, 2.2, 2.1],
    positive: true,
    suffix: "%",
  },
];

// ─── Sparkline Component ──────────────────────────────────────────────────────

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline
        points={pts}
        fill="none"
        stroke={positive ? "#6366f1" : "#f43f5e"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-white dark:bg-gray-900 border border-black/5 dark:border-white/10 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] p-3 text-xs">
      <p className="font-semibold text-gray-700 dark:text-gray-200 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: entry.color }}
          />
          <span className="text-gray-500 dark:text-gray-400 capitalize">{entry.name}:</span>
          <span className="font-medium text-gray-800 dark:text-gray-100">
            {typeof entry.value === "number" && entry.value > 999
              ? `$${(entry.value / 1000).toFixed(1)}k`
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const t = useTranslations();

  const [showSignups, setShowSignups] = useState(true);
  const [showLeads, setShowLeads] = useState(true);
  const [period, setPeriod] = useState<"12m" | "6m" | "3m">("12m");

  const filteredMonthly =
    period === "3m"
      ? monthlyData.slice(-3)
      : period === "6m"
      ? monthlyData.slice(-6)
      : monthlyData;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Page Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                {t("analytics.title")}
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {t("analytics.subtitle")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Period selector */}
              <div className="flex items-center gap-1 bg-white dark:bg-gray-900 border border-black/5 dark:border-white/10 rounded-xl p-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                {(["3m", "6m", "12m"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                      period === p
                        ? "bg-sky-500 text-white shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 border border-black/5 dark:border-white/10 rounded-xl hover:text-sky-600 dark:hover:text-sky-400 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <Download className="w-3.5 h-3.5" />
                {t("analytics.export")}
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Section 1: Signups vs Leads Line Chart ── */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-8"
        >
          <motion.div
            variants={slideInLeft}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-6"
          >
            {/* Chart header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                  {t("analytics.signupsLeadsTitle")}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {t("analytics.signupsLeadsSubtitle")}
                </p>
              </div>
              {/* Legend toggles */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowSignups((v) => !v)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                    showSignups
                      ? "bg-sky-50 dark:bg-sky-500/10 border-sky-200 dark:border-sky-500/30 text-sky-700 dark:text-sky-300"
                      : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {showSignups ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  {t("analytics.signups")}
                </button>
                <button
                  onClick={() => setShowLeads((v) => !v)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                    showLeads
                      ? "bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/30 text-violet-700 dark:text-violet-300"
                      : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {showLeads ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  {t("analytics.leads")}
                </button>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={filteredMonthly} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradSignups" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                {showSignups && (
                  <Area
                    type="monotone"
                    dataKey="signups"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fill="url(#gradSignups)"
                    dot={false}
                    activeDot={{ r: 4, fill: "#6366f1" }}
                  />
                )}
                {showLeads && (
                  <Area
                    type="monotone"
                    dataKey="leads"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    fill="url(#gradLeads)"
                    dot={false}
                    activeDot={{ r: 4, fill: "#8b5cf6" }}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>

            {/* Summary pills */}
            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-black/5 dark:border-white/5">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 flex-shrink-0" />
                {t("analytics.totalSignups")}:
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {filteredMonthly.reduce((s, d) => s + d.signups, 0).toLocaleString("en-US")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-500 flex-shrink-0" />
                {t("analytics.totalLeads")}:
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {filteredMonthly.reduce((s, d) => s + d.leads, 0).toLocaleString("en-US")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Activity className="w-3 h-3 text-sky-400" />
                {t("analytics.avgConversion")}:
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {(
                    (filteredMonthly.reduce((s, d) => s + d.leads, 0) /
                      filteredMonthly.reduce((s, d) => s + d.signups, 0)) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ── Section 2: Weekly Lead Quality Stacked Bar ── */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-8"
        >
          <motion.div
            variants={slideInRight}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
              <div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                  {t("analytics.leadQualityTitle")}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {t("analytics.leadQualitySubtitle")}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { label: t("analytics.hot"), color: "#f43f5e" },
                  { label: t("analytics.warm"), color: "#f97316" },
                  { label: t("analytics.cold"), color: "#6366f1" },
                  { label: t("analytics.unqualified"), color: "#9ca3af" },
                ].map((item) => (
                  <span key={item.label} className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: item.color }} />
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={weeklyQualityData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="hot" stackId="a" fill="#f43f5e" radius={[0, 0, 0, 0]} />
                <Bar dataKey="warm" stackId="a" fill="#f97316" />
                <Bar dataKey="cold" stackId="a" fill="#6366f1" />
                <Bar dataKey="unqualified" stackId="a" fill="#d1d5db" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            {/* Quality summary row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-black/5 dark:border-white/5">
              {[
                { label: t("analytics.hot"), value: weeklyQualityData.reduce((s, d) => s + d.hot, 0), color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
                { label: t("analytics.warm"), value: weeklyQualityData.reduce((s, d) => s + d.warm, 0), color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-500/10" },
                { label: t("analytics.cold"), value: weeklyQualityData.reduce((s, d) => s + d.cold, 0), color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-500/10" },
                { label: t("analytics.unqualified"), value: weeklyQualityData.reduce((s, d) => s + d.unqualified, 0), color: "text-gray-400", bg: "bg-gray-50 dark:bg-gray-800" },
              ].map((item) => (
                <div key={item.label} className={`${item.bg} rounded-xl px-3 py-2.5`}>
                  <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ── Section 3: Revenue + MRR Composed Chart ── */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-8"
        >
          <motion.div
            variants={fadeInUp}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
              <div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                  {t("analytics.revenueTitle")}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {t("analytics.revenueSubtitle")}
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-sky-200 dark:bg-sky-500/40 flex-shrink-0" />
                  {t("analytics.revenue")}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-6 h-0.5 bg-violet-500 flex-shrink-0" />
                  {t("analytics.mrr")}
                </span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={filteredMonthly} margin={{ top: 4, right: 4, left: -8, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenue" fill="url(#gradRevenue)" stroke="#6366f1" strokeWidth={1} radius={[4, 4, 0, 0]} />
                <Line
                  type="monotone"
                  dataKey="mrr"
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 4, fill: "#8b5cf6" }}
                />
              </ComposedChart>
            </ResponsiveContainer>

            {/* Revenue KPIs */}
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-black/5 dark:border-white/5">
              {[
                {
                  label: t("analytics.totalRevenue"),
                  value: `$${(filteredMonthly.reduce((s, d) => s + d.revenue, 0) / 1000).toFixed(1)}k`,
                  icon: TrendingUp,
                  color: "text-sky-500",
                },
                {
                  label: t("analytics.currentMrr"),
                  value: `$${((filteredMonthly[filteredMonthly.length - 1]?.mrr ?? 0) / 1000).toFixed(1)}k`,
                  icon: BarChart2,
                  color: "text-violet-500",
                },
                {
                  label: t("analytics.mrrGrowth"),
                  value: `+${(
                    (((filteredMonthly[filteredMonthly.length - 1]?.mrr ?? 0) -
                      (filteredMonthly[0]?.mrr ?? 1)) /
                      (filteredMonthly[0]?.mrr ?? 1)) *
                    100
                  ).toFixed(1)}%`,
                  icon: ArrowUpRight,
                  color: "text-sky-500",
                },
              ].map((kpi) => (
                <div key={kpi.label} className="text-center">
                  <kpi.icon className={`w-4 h-4 ${kpi.color} mx-auto mb-1`} />
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{kpi.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{kpi.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ── Section 4: Metrics Comparison Table with Sparklines ── */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              {t("analytics.metricsTableTitle")}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {t("analytics.metricsTableSubtitle")}
            </p>
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] overflow-hidden"
          >
            {/* Table header */}
            <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-6 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-black/5 dark:border-white/5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              <span>{t("analytics.colMetric")}</span>
              <span className="text-right">{t("analytics.colCurrent")}</span>
              <span className="text-right hidden sm:block">{t("analytics.colPrevious")}</span>
              <span className="text-right">{t("analytics.colChange")}</span>
              <span className="text-right hidden md:block">{t("analytics.colTrend")}</span>
            </div>

            {/* Table rows */}
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {metricsComparison.map((row, i) => (
                <motion.div
                  key={row.metric}
                  variants={fadeInUp}
                  className={`grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-6 py-4 items-center transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-white/[0.02] ${
                    i < metricsComparison.length - 1
                      ? "border-b border-black/5 dark:border-white/5"
                      : ""
                  }`}
                >
                  {/* Metric name */}
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        row.positive
                          ? "bg-sky-50 dark:bg-sky-500/10"
                          : "bg-rose-50 dark:bg-rose-500/10"
                      }`}
                    >
                      {row.positive ? (
                        <TrendingUp className="w-3.5 h-3.5 text-sky-500" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {row.metric}
                    </span>
                  </div>

                  {/* Current value */}
                  <span className="text-sm font-semibold text-gray-900 dark:text-white text-right tabular-nums">
                    {row.prefix ?? ""}
                    {row.current > 999
                      ? row.current.toLocaleString("en-US")
                      : row.current}
                    {row.suffix ?? ""}
                  </span>

                  {/* Previous value */}
                  <span className="text-sm text-gray-400 dark:text-gray-500 text-right tabular-nums hidden sm:block">
                    {row.prefix ?? ""}
                    {row.previous > 999
                      ? row.previous.toLocaleString("en-US")
                      : row.previous}
                    {row.suffix ?? ""}
                  </span>

                  {/* Change badge */}
                  <div className="flex justify-end">
                    <span
                      className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold ${
                        row.change > 0
                          ? "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400"
                          : "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {row.change > 0 ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {Math.abs(row.change).toFixed(1)}%
                    </span>
                  </div>

                  {/* Sparkline */}
                  <div className="hidden md:flex justify-end">
                    <Sparkline data={row.sparkline} positive={row.positive} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}