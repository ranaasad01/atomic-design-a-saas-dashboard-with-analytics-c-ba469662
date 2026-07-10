"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Users, TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, Activity, Target, Star, Clock, CheckCircle, AlertCircle, Eye, Mail, Phone } from 'lucide-react';
import { useTranslations } from "next-intl";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

const signupData = [
  { date: "Jan 1", signups: 42, leads: 68, revenue: 3200 },
  { date: "Jan 8", signups: 58, leads: 74, revenue: 4100 },
  { date: "Jan 15", signups: 47, leads: 61, revenue: 3600 },
  { date: "Jan 22", signups: 73, leads: 89, revenue: 5200 },
  { date: "Jan 29", signups: 65, leads: 82, revenue: 4800 },
  { date: "Feb 5", signups: 91, leads: 110, revenue: 6700 },
  { date: "Feb 12", signups: 84, leads: 98, revenue: 6100 },
  { date: "Feb 19", signups: 102, leads: 124, revenue: 7400 },
  { date: "Feb 26", signups: 118, leads: 139, revenue: 8600 },
  { date: "Mar 5", signups: 97, leads: 115, revenue: 7100 },
  { date: "Mar 12", signups: 134, leads: 158, revenue: 9800 },
  { date: "Mar 19", signups: 149, leads: 172, revenue: 10900 },
];

const weeklyBarData = [
  { day: "Mon", signups: 24, leads: 38 },
  { day: "Tue", signups: 31, leads: 45 },
  { day: "Wed", signups: 28, leads: 41 },
  { day: "Thu", signups: 42, leads: 57 },
  { day: "Fri", signups: 38, leads: 52 },
  { day: "Sat", signups: 19, leads: 27 },
  { day: "Sun", signups: 14, leads: 21 },
];

const sourceData = [
  { source: "Organic Search", count: 412, color: "#6366F1" },
  { source: "Social Media", count: 287, color: "#8B5CF6" },
  { source: "Referral", count: 198, color: "#A78BFA" },
  { source: "Email Campaign", count: 156, color: "#C4B5FD" },
  { source: "Paid Ads", count: 134, color: "#DDD6FE" },
];

const recentLeads = [
  {
    id: "1",
    name: "Sarah Mitchell",
    email: "sarah.m@techcorp.io",
    source: "Organic",
    status: "qualified",
    date: "2024-03-19",
    value: 2400,
  },
  {
    id: "2",
    name: "James Okafor",
    email: "j.okafor@ventures.co",
    source: "Referral",
    status: "new",
    date: "2024-03-19",
    value: 1800,
  },
  {
    id: "3",
    name: "Priya Sharma",
    email: "priya@designstudio.com",
    source: "Social",
    status: "contacted",
    date: "2024-03-18",
    value: 3200,
  },
  {
    id: "4",
    name: "Lucas Fernandez",
    email: "lucas.f@growthlab.io",
    source: "Email",
    status: "converted",
    date: "2024-03-18",
    value: 5600,
  },
  {
    id: "5",
    name: "Aisha Nkosi",
    email: "aisha@cloudbase.dev",
    source: "Paid Ads",
    status: "new",
    date: "2024-03-17",
    value: 1200,
  },
  {
    id: "6",
    name: "Tom Bergmann",
    email: "t.bergmann@scalex.eu",
    source: "Organic",
    status: "lost",
    date: "2024-03-17",
    value: 900,
  },
];

const kpiCards = [
  {
    label: "Total Signups",
    value: "1,284",
    change: 18.4,
    icon: Users,
    prefix: "",
    suffix: "",
    color: "indigo",
    bg: "from-indigo-500 to-violet-600",
  },
  {
    label: "New Leads",
    value: "3,471",
    change: 12.7,
    icon: Target,
    prefix: "",
    suffix: "",
    color: "violet",
    bg: "from-violet-500 to-purple-600",
  },
  {
    label: "Monthly Revenue",
    value: "48,200",
    change: 9.2,
    icon: DollarSign,
    prefix: "$",
    suffix: "",
    color: "emerald",
    bg: "from-emerald-500 to-teal-600",
  },
  {
    label: "Conversion Rate",
    value: "6.8",
    change: -1.3,
    icon: Activity,
    prefix: "",
    suffix: "%",
    color: "amber",
    bg: "from-amber-500 to-orange-500",
  },
];

const statusConfig: Record<
  string,
  { label: string; bg: string; text: string; dot: string }
> = {
  new: {
    label: "New",
    bg: "bg-blue-50 dark:bg-blue-500/10",
    text: "text-blue-700 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  contacted: {
    label: "Contacted",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  qualified: {
    label: "Qualified",
    bg: "bg-violet-50 dark:bg-violet-500/10",
    text: "text-violet-700 dark:text-violet-400",
    dot: "bg-violet-500",
  },
  converted: {
    label: "Converted",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  lost: {
    label: "Lost",
    bg: "bg-red-50 dark:bg-red-500/10",
    text: "text-red-700 dark:text-red-400",
    dot: "bg-red-500",
  },
};

const activityFeed = [
  {
    id: "a1",
    icon: Users,
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
    text: "12 new signups in the last hour",
    time: "2 min ago",
  },
  {
    id: "a2",
    icon: CheckCircle,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    text: "Lucas Fernandez converted to paying customer",
    time: "18 min ago",
  },
  {
    id: "a3",
    icon: Mail,
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-500/10",
    text: "Email campaign sent to 2,400 leads",
    time: "1 hr ago",
  },
  {
    id: "a4",
    icon: AlertCircle,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    text: "Conversion rate dipped below 7% threshold",
    time: "3 hr ago",
  },
  {
    id: "a5",
    icon: Star,
    color: "text-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-500/10",
    text: "Organic search hit a new weekly record",
    time: "5 hr ago",
  },
];

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
    <div className="bg-white dark:bg-gray-900 border border-black/5 dark:border-white/10 rounded-xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.12)] p-3 text-sm">
      <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-500 dark:text-gray-400 capitalize">
            {entry.name}:
          </span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {(entry.value ?? 0).toLocaleString("en-US")}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function DashboardOverviewPage() {
  const t = useTranslations();
  const [activeChart, setActiveChart] = useState<"signups" | "leads" | "revenue">("signups");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartColorMap = {
    signups: "#6366F1",
    leads: "#8B5CF6",
    revenue: "#10B981",
  };

  const chartLabelMap = {
    signups: t("dashboard.signups"),
    leads: t("dashboard.leads"),
    revenue: t("dashboard.revenue"),
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                {t("dashboard.title")}
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {t("dashboard.subtitle")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-medium border border-emerald-200 dark:border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {t("dashboard.live")}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {t("dashboard.updated")}
              </span>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            const isPositive = card.change >= 0;
            return (
              <motion.div
                key={card.label}
                variants={scaleIn}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-5 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {card.label}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.bg} flex items-center justify-center shadow-[0_2px_8px_rgba(99,102,241,0.3)]`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    {card.prefix}
                    {card.value}
                    {card.suffix}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {isPositive ? (
                      <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        isPositive
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {card.change}%
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {t("dashboard.vsLastMonth")}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Chart + Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Area Chart */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                  {t("dashboard.growthTrend")}
                </h2>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {t("dashboard.last12Weeks")}
                </p>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                {(["signups", "leads", "revenue"] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveChart(key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 capitalize ${
                      activeChart === key
                        ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
            {mounted && (
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart
                  data={signupData}
                  margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="chartGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={chartColorMap[activeChart]}
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor={chartColorMap[activeChart]}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="currentColor"
                    className="text-gray-100 dark:text-gray-800"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: "currentColor" }}
                    className="text-gray-400 dark:text-gray-500"
                    axisLine={false}
                    tickLine={false}
                    interval={2}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "currentColor" }}
                    className="text-gray-400 dark:text-gray-500"
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey={activeChart}
                    stroke={chartColorMap[activeChart]}
                    strokeWidth={2.5}
                    fill="url(#chartGradient)"
                    dot={false}
                    activeDot={{
                      r: 5,
                      fill: chartColorMap[activeChart],
                      strokeWidth: 2,
                      stroke: "#fff",
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </motion.div>

          {/* Activity Feed */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-6 flex flex-col"
          >
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
              {t("dashboard.recentActivity")}
            </h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">
              {t("dashboard.liveUpdates")}
            </p>
            <div className="flex flex-col gap-4 flex-1">
              {activityFeed.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ x: 3, transition: { duration: 0.15 } }}
                    className="flex items-start gap-3"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}
                    >
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
                        {item.text}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bar Chart + Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Weekly Bar Chart */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-6"
          >
            <div className="mb-5">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                {t("dashboard.weeklyBreakdown")}
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {t("dashboard.signupsVsLeads")}
              </p>
            </div>
            {mounted && (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={weeklyBarData}
                  margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                  barGap={4}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="currentColor"
                    className="text-gray-100 dark:text-gray-800"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 11, fill: "currentColor" }}
                    className="text-gray-400 dark:text-gray-500"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "currentColor" }}
                    className="text-gray-400 dark:text-gray-500"
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="signups"
                    fill="#6366F1"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={24}
                  />
                  <Bar
                    dataKey="leads"
                    fill="#C4B5FD"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={24}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-indigo-500" />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {t("dashboard.signups")}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-violet-300" />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {t("dashboard.leads")}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Lead Sources Pie */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-6"
          >
            <div className="mb-5">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                {t("dashboard.leadSources")}
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {t("dashboard.byChannel")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {mounted && (
                <ResponsiveContainer width={180} height={180}>
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={52}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="count"
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [
                        value.toLocaleString("en-US"),
                        "Leads",
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
              <div className="flex flex-col gap-2 flex-1 w-full">
                {sourceData.map((item) => {
                  const total = sourceData.reduce((s, d) => s + d.count, 0);
                  const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
                  return (
                    <div key={item.source} className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs text-gray-600 dark:text-gray-400 flex-1 truncate">
                        {item.source}
                      </span>
                      <span className="text-xs font-semibold text-gray-900 dark:text-white">
                        {pct}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Leads Table */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-6 border-b border-black/5 dark:border-white/10">
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                {t("dashboard.recentLeads")}
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {t("dashboard.latestInbound")}
              </p>
            </div>
            <button className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-medium hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all duration-200 border border-indigo-200 dark:border-indigo-500/20">
              <Eye className="w-3.5 h-3.5" />
              {t("dashboard.viewAll")}
            </button>
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/5 dark:border-white/10">
                  <th className="text-left text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider px-6 py-3">
                    {t("dashboard.colName")}
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider px-6 py-3">
                    {t("dashboard.colSource")}
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider px-6 py-3">
                    {t("dashboard.colStatus")}
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider px-6 py-3">
                    {t("dashboard.colDate")}
                  </th>
                  <th className="text-right text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider px-6 py-3">
                    {t("dashboard.colValue")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {recentLeads.map((lead) => {
                  const sc = statusConfig[lead.status] ?? statusConfig["new"];
                  return (
                    <motion.tr
                      key={lead.id}
                      whileHover={{
                        backgroundColor: "rgba(99,102,241,0.03)",
                        transition: { duration: 0.15 },
                      }}
                      className="group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                            {(lead.name ?? "?").charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white text-sm">
                              {lead.name}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                              {lead.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {lead.source}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${sc.bg} ${sc.text}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          {sc.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {lead.date}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          ${(lead.value ?? 0).toLocaleString("en-US")}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden divide-y divide-black/5 dark:divide-white/10">
            {recentLeads.map((lead) => {
              const sc = statusConfig[lead.status] ?? statusConfig["new"];
              return (
                <div key={lead.id} className="p-4 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                    {(lead.name ?? "?").charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                        {lead.name}
                      </p>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white flex-shrink-0">
                        ${(lead.value ?? 0).toLocaleString("en-US")}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5">
                      {lead.email}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${sc.bg} ${sc.text}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                        {sc.label}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {lead.source}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}