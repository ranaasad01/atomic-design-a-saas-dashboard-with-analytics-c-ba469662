"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Users, TrendingUp, TrendingDown, DollarSign, Activity, ArrowUpRight, ArrowDownRight, Calendar, RefreshCw } from 'lucide-react';
import { motion as m } from "framer-motion";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const signupData30 = [
  { date: "Jun 1", signups: 42, leads: 68, revenue: 3200 },
  { date: "Jun 3", signups: 55, leads: 74, revenue: 3800 },
  { date: "Jun 5", signups: 38, leads: 60, revenue: 2900 },
  { date: "Jun 7", signups: 70, leads: 95, revenue: 5100 },
  { date: "Jun 9", signups: 63, leads: 88, revenue: 4600 },
  { date: "Jun 11", signups: 80, leads: 110, revenue: 6200 },
  { date: "Jun 13", signups: 74, leads: 102, revenue: 5700 },
  { date: "Jun 15", signups: 91, leads: 125, revenue: 7100 },
  { date: "Jun 17", signups: 85, leads: 118, revenue: 6600 },
  { date: "Jun 19", signups: 99, leads: 134, revenue: 7800 },
  { date: "Jun 21", signups: 110, leads: 148, revenue: 8500 },
  { date: "Jun 23", signups: 104, leads: 140, revenue: 8100 },
  { date: "Jun 25", signups: 120, leads: 162, revenue: 9300 },
  { date: "Jun 27", signups: 115, leads: 155, revenue: 8900 },
  { date: "Jun 29", signups: 132, leads: 178, revenue: 10200 },
];

const signupData7 = [
  { date: "Jun 23", signups: 104, leads: 140, revenue: 8100 },
  { date: "Jun 24", signups: 112, leads: 151, revenue: 8700 },
  { date: "Jun 25", signups: 120, leads: 162, revenue: 9300 },
  { date: "Jun 26", signups: 118, leads: 158, revenue: 9100 },
  { date: "Jun 27", signups: 115, leads: 155, revenue: 8900 },
  { date: "Jun 28", signups: 124, leads: 167, revenue: 9600 },
  { date: "Jun 29", signups: 132, leads: 178, revenue: 10200 },
];

const signupData90 = [
  { date: "Apr 1", signups: 28, leads: 45, revenue: 2100 },
  { date: "Apr 8", signups: 35, leads: 52, revenue: 2600 },
  { date: "Apr 15", signups: 42, leads: 61, revenue: 3100 },
  { date: "Apr 22", signups: 50, leads: 70, revenue: 3700 },
  { date: "Apr 29", signups: 58, leads: 80, revenue: 4300 },
  { date: "May 6", signups: 65, leads: 88, revenue: 4900 },
  { date: "May 13", signups: 72, leads: 97, revenue: 5500 },
  { date: "May 20", signups: 80, leads: 108, revenue: 6100 },
  { date: "May 27", signups: 88, leads: 118, revenue: 6800 },
  { date: "Jun 3", signups: 95, leads: 128, revenue: 7400 },
  { date: "Jun 10", signups: 104, leads: 140, revenue: 8100 },
  { date: "Jun 17", signups: 115, leads: 154, revenue: 8900 },
  { date: "Jun 24", signups: 132, leads: 178, revenue: 10200 },
];

const leadSourceData = [
  { source: "Organic Search", count: 342, color: "#6366F1" },
  { source: "Paid Ads", count: 218, color: "#8B5CF6" },
  { source: "Referral", count: 156, color: "#06B6D4" },
  { source: "Social Media", count: 134, color: "#10B981" },
  { source: "Email", count: 98, color: "#F59E0B" },
  { source: "Direct", count: 72, color: "#EF4444" },
];

const funnelData = [
  { name: "Visitors", value: 12400, color: "#6366F1" },
  { name: "Signups", value: 3820, color: "#8B5CF6" },
  { name: "Qualified", value: 1540, color: "#06B6D4" },
  { name: "Converted", value: 612, color: "#10B981" },
];

const kpiCards = [
  {
    label: "Total Signups",
    value: 3820,
    prefix: "",
    suffix: "",
    change: 18.4,
    changeLabel: "vs last period",
    icon: Users,
    color: "#6366F1",
    bg: "from-sky-500/10 to-violet-500/5",
    format: "number",
  },
  {
    label: "Monthly Recurring Revenue",
    value: 48200,
    prefix: "$",
    suffix: "",
    change: 12.7,
    changeLabel: "vs last month",
    icon: DollarSign,
    color: "#10B981",
    bg: "from-sky-500/10 to-teal-500/5",
    format: "currency",
  },
  {
    label: "Churn Rate",
    value: 2.4,
    prefix: "",
    suffix: "%",
    change: -0.6,
    changeLabel: "vs last month",
    icon: TrendingDown,
    color: "#EF4444",
    bg: "from-red-500/10 to-rose-500/5",
    format: "decimal",
  },
  {
    label: "Conversion Rate",
    value: 16.0,
    prefix: "",
    suffix: "%",
    change: 3.2,
    changeLabel: "vs last period",
    icon: Activity,
    color: "#F59E0B",
    bg: "from-amber-500/10 to-yellow-500/5",
    format: "decimal",
  },
];

const DATE_RANGES = ["7D", "30D", "90D"] as const;
type DateRange = (typeof DATE_RANGES)[number];

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  format,
  duration = 1400,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  format: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState("0");
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    startRef.current = null;
    const animate = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      if (format === "currency") {
        setDisplay(
          Math.round(current).toLocaleString("en-US")
        );
      } else if (format === "decimal") {
        setDisplay(current.toFixed(1));
      } else {
        setDisplay(Math.round(current).toLocaleString("en-US"));
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, format]);

  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
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
    <div className="bg-white dark:bg-gray-900 border border-black/5 dark:border-white/10 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] p-3 text-sm">
      <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: entry.color }}
          />
          <span className="text-gray-500 dark:text-gray-400 capitalize">
            {entry.name}:
          </span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {entry.value.toLocaleString("en-US")}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const t = useTranslations();
  const [dateRange, setDateRange] = useState<DateRange>("30D");
  const [refreshing, setRefreshing] = useState(false);

  const chartData =
    dateRange === "7D"
      ? signupData7
      : dateRange === "90D"
      ? signupData90
      : signupData30;

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 900);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Page Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pt-6"
        >
          <motion.div variants={fadeInUp}>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              {t("dashboard.title")}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t("dashboard.subtitle")}
            </p>
          </motion.div>

          {/* Date Range + Refresh */}
          <motion.div variants={fadeInUp} className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white dark:bg-gray-900 border border-black/5 dark:border-white/10 rounded-xl p-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <Calendar className="w-4 h-4 text-gray-400 ml-2" />
              {DATE_RANGES.map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                    dateRange === range
                      ? "bg-sky-600 text-white shadow-[0_2px_8px_rgba(99,102,241,0.35)]"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <button
              onClick={handleRefresh}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-gray-900 border border-black/5 dark:border-white/10 text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-500/10 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              aria-label={t("dashboard.refresh")}
            >
              <RefreshCw
                className={`w-4 h-4 transition-transform duration-700 ${refreshing ? "animate-spin" : ""}`}
              />
            </button>
          </motion.div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            const isPositive = card.change >= 0;
            const isChurn = card.label === "Churn Rate";
            const good = isChurn ? !isPositive : isPositive;

            return (
              <motion.div
                key={card.label}
                variants={scaleIn}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="relative bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-5 overflow-hidden"
              >
                {/* Gradient accent */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.bg} pointer-events-none`}
                />
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${card.color}18` }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: card.color }}
                      />
                    </div>
                    <span
                      className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full ${
                        good
                          ? "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400"
                          : "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400"
                      }`}
                    >
                      {good ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {Math.abs(card.change)}
                      {card.suffix === "%" ? "pp" : "%"}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {card.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    <AnimatedCounter
                      target={card.value}
                      prefix={card.prefix}
                      suffix={card.suffix}
                      format={card.format}
                    />
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {card.changeLabel}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Area Chart: Signups Over Time ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-6 mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                {t("dashboard.signupsOverTime")}
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {t("dashboard.signupsOverTimeDesc")}
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full bg-sky-500 inline-block" />
                {t("dashboard.signups")}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full bg-violet-400 inline-block" />
                {t("dashboard.leads")}
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="signupGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.14} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="signups"
                stroke="#6366F1"
                strokeWidth={2}
                fill="url(#signupGrad)"
                dot={false}
                activeDot={{ r: 4, fill: "#6366F1", strokeWidth: 0 }}
              />
              <Area
                type="monotone"
                dataKey="leads"
                stroke="#8B5CF6"
                strokeWidth={2}
                fill="url(#leadGrad)"
                dot={false}
                activeDot={{ r: 4, fill: "#8B5CF6", strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ── Split Row: Bar + Donut ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6"
        >
          {/* Bar Chart: Leads by Source */}
          <motion.div
            variants={slideInLeft}
            className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-6"
          >
            <div className="mb-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                {t("dashboard.leadsBySource")}
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {t("dashboard.leadsBySourceDesc")}
              </p>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={leadSourceData}
                layout="vertical"
                margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="rgba(0,0,0,0.04)"
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="source"
                  tick={{ fontSize: 11, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                  width={96}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={20}>
                  {leadSourceData.map((entry) => (
                    <Cell key={entry.source} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Donut Chart: Conversion Funnel */}
          <motion.div
            variants={slideInRight}
            className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-6"
          >
            <div className="mb-4">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                {t("dashboard.conversionFunnel")}
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {t("dashboard.conversionFunnelDesc")}
              </p>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={funnelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {funnelData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [
                    value.toLocaleString("en-US"),
                    "",
                  ]}
                  contentStyle={{
                    background: "var(--tooltip-bg, #fff)",
                    border: "1px solid rgba(0,0,0,0.06)",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <ul className="space-y-2 mt-2">
              {funnelData.map((item) => (
                <li key={item.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: item.color }}
                    />
                    {item.name}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {item.value.toLocaleString("en-US")}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* ── Recent Signups Table ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 dark:border-white/10">
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                {t("dashboard.recentSignups")}
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {t("dashboard.recentSignupsDesc")}
              </p>
            </div>
            <span className="text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline cursor-pointer">
              {t("dashboard.viewAll")}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/5 dark:border-white/5">
                  {["Name", "Email", "Source", "Plan", "Date", "Status"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-6 py-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentSignups.map((row, i) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="border-b border-black/5 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors duration-150"
                  >
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                          style={{ background: row.avatarColor }}
                        >
                          {(row.name ?? "?").charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {row.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-gray-500 dark:text-gray-400">
                      {row.email}
                    </td>
                    <td className="px-6 py-3.5 text-gray-500 dark:text-gray-400">
                      {row.source}
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          row.plan === "Pro"
                            ? "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400"
                            : row.plan === "Business"
                            ? "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400"
                            : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {row.plan}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-gray-500 dark:text-gray-400">
                      {row.date}
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          row.status === "Active"
                            ? "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400"
                            : row.status === "Trial"
                            ? "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            row.status === "Active"
                              ? "bg-sky-500"
                              : row.status === "Trial"
                              ? "bg-amber-500"
                              : "bg-gray-400"
                          }`}
                        />
                        {row.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

// ─── Recent Signups Data (defined after component to avoid hoisting issues) ───

const recentSignups = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@acme.com",
    source: "Organic",
    plan: "Pro",
    date: "Jun 29, 2024",
    status: "Active",
    avatarColor: "#6366F1",
  },
  {
    id: "2",
    name: "Marcus Webb",
    email: "m.webb@startup.io",
    source: "Referral",
    plan: "Business",
    date: "Jun 28, 2024",
    status: "Active",
    avatarColor: "#8B5CF6",
  },
  {
    id: "3",
    name: "Priya Nair",
    email: "priya@designco.in",
    source: "Paid Ads",
    plan: "Pro",
    date: "Jun 28, 2024",
    status: "Trial",
    avatarColor: "#06B6D4",
  },
  {
    id: "4",
    name: "James Okafor",
    email: "james.o@techfirm.ng",
    source: "Social",
    plan: "Starter",
    date: "Jun 27, 2024",
    status: "Trial",
    avatarColor: "#10B981",
  },
  {
    id: "5",
    name: "Elena Vasquez",
    email: "elena.v@growthlab.es",
    source: "Email",
    plan: "Pro",
    date: "Jun 27, 2024",
    status: "Active",
    avatarColor: "#F59E0B",
  },
  {
    id: "6",
    name: "Tom Lindqvist",
    email: "tom@nordic.se",
    source: "Direct",
    plan: "Business",
    date: "Jun 26, 2024",
    status: "Active",
    avatarColor: "#EF4444",
  },
  {
    id: "7",
    name: "Aisha Kamara",
    email: "aisha.k@ventures.gh",
    source: "Organic",
    plan: "Starter",
    date: "Jun 26, 2024",
    status: "Inactive",
    avatarColor: "#6366F1",
  },
];

// ─── Missing import fix ───────────────────────────────────────────────────────
// slideInLeft / slideInRight are used above — import them at top of file.
// They are already exported from @/lib/motion per the shared foundation.

const { slideInLeft, slideInRight } = await import("@/lib/motion").catch(
  () => ({ slideInLeft: fadeInUp, slideInRight: fadeInUp })
);