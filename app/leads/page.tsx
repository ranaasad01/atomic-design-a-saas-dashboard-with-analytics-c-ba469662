"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Search, ArrowUpDown, ArrowUp, ArrowDown, Users, Star, Activity, ChevronDown, Mail, Calendar, Circle } from 'lucide-react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useTranslations } from "next-intl";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Types ───────────────────────────────────────────────────────────────────

type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "lost";

interface LeadRow {
  id: string;
  name: string;
  email: string;
  source: string;
  status: LeadStatus;
  date: string;
  value: number;
}

type SortKey = keyof LeadRow;
type SortDir = "asc" | "desc";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_LEADS: LeadRow[] = [
  { id: "1", name: "Sophia Hartwell", email: "sophia@hartwell.io", source: "Organic", status: "qualified", date: "2024-06-01", value: 4200 },
  { id: "2", name: "Marcus Chen", email: "m.chen@techbridge.com", source: "Paid Ads", status: "converted", date: "2024-06-03", value: 8750 },
  { id: "3", name: "Priya Nair", email: "priya.nair@nexaflow.co", source: "Referral", status: "new", date: "2024-06-05", value: 1500 },
  { id: "4", name: "James Okafor", email: "james@okafor.dev", source: "LinkedIn", status: "contacted", date: "2024-06-07", value: 3300 },
  { id: "5", name: "Elena Vasquez", email: "elena.v@brightloop.io", source: "Organic", status: "qualified", date: "2024-06-09", value: 5600 },
  { id: "6", name: "Liam Thornton", email: "liam.t@thornton.co", source: "Email", status: "lost", date: "2024-06-10", value: 900 },
  { id: "7", name: "Aisha Kamara", email: "aisha@kamaratech.com", source: "Paid Ads", status: "converted", date: "2024-06-12", value: 12400 },
  { id: "8", name: "Noah Bergström", email: "noah.b@bergstrom.se", source: "Referral", status: "new", date: "2024-06-13", value: 2100 },
  { id: "9", name: "Chloe Dupont", email: "chloe.d@dupont.fr", source: "LinkedIn", status: "qualified", date: "2024-06-14", value: 6800 },
  { id: "10", name: "Ravi Patel", email: "ravi@patelsolutions.in", source: "Organic", status: "contacted", date: "2024-06-15", value: 3750 },
  { id: "11", name: "Ingrid Solberg", email: "ingrid@solberg.no", source: "Email", status: "new", date: "2024-06-16", value: 1200 },
  { id: "12", name: "Diego Morales", email: "diego.m@morales.mx", source: "Paid Ads", status: "qualified", date: "2024-06-17", value: 7100 },
  { id: "13", name: "Fatima Al-Rashid", email: "fatima@alrashid.ae", source: "Referral", status: "converted", date: "2024-06-18", value: 9900 },
  { id: "14", name: "Oliver Müller", email: "oliver.m@muller.de", source: "LinkedIn", status: "lost", date: "2024-06-19", value: 600 },
  { id: "15", name: "Yuki Tanaka", email: "yuki.t@tanaka.jp", source: "Organic", status: "contacted", date: "2024-06-20", value: 4400 },
];

const RADAR_DATA = [
  { channel: "Organic", quality: 82, volume: 68 },
  { channel: "Paid Ads", quality: 74, volume: 90 },
  { channel: "Referral", quality: 91, volume: 55 },
  { channel: "LinkedIn", quality: 78, volume: 62 },
  { channel: "Email", quality: 65, volume: 48 },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; bg: string }> = {
  new: { label: "New", color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10" },
  contacted: { label: "Contacted", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10" },
  qualified: { label: "Qualified", color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10" },
  converted: { label: "Converted", color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10" },
  lost: { label: "Lost", color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-500/10" },
};

const SOURCE_OPTIONS = ["All", "Organic", "Paid Ads", "Referral", "LinkedIn", "Email"];
const STATUS_OPTIONS: ("all" | LeadStatus)[] = ["all", "new", "contacted", "qualified", "converted", "lost"];

// ─── Row animation variant ────────────────────────────────────────────────────

const rowVariant: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const tableContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatBadge({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <motion.div
      variants={scaleIn}
      className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-black/5 dark:border-white/10 rounded-xl px-5 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] flex-1 min-w-[160px]"
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accent}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</p>
        <p className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{value}</p>
      </div>
    </motion.div>
  );
}

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />;
  return sortDir === "asc"
    ? <ArrowUp className="w-3.5 h-3.5 text-red-500" />
    : <ArrowDown className="w-3.5 h-3.5 text-red-500" />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LeadsPage() {
  const t = useTranslations();

  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<"all" | LeadStatus>("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const filtered = useMemo(() => {
    let rows = [...MOCK_LEADS];

    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.source.toLowerCase().includes(q)
      );
    }

    if (sourceFilter !== "All") {
      rows = rows.filter((r) => r.source === sourceFilter);
    }

    if (statusFilter !== "all") {
      rows = rows.filter((r) => r.status === statusFilter);
    }

    rows.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number") {
        return sortDir === "asc" ? av - bv : bv - av;
      }
      const as = String(av ?? "");
      const bs = String(bv ?? "");
      return sortDir === "asc" ? as.localeCompare(bs) : bs.localeCompare(as);
    });

    return rows;
  }, [search, sourceFilter, statusFilter, sortKey, sortDir]);

  const totalLeads = MOCK_LEADS.length;
  const qualifiedLeads = MOCK_LEADS.filter((l) => l.status === "qualified" || l.status === "converted").length;
  const avgDeal = totalLeads > 0
    ? Math.round(MOCK_LEADS.reduce((s, l) => s + (l.value ?? 0), 0) / totalLeads)
    : 0;

  const columns: { key: SortKey; label: string }[] = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "source", label: "Source" },
    { key: "status", label: "Status" },
    { key: "date", label: "Date" },
    { key: "value", label: "Value" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Page Header ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight text-balance">
            {t("leads.title")}
          </h1>
          <p className="mt-1.5 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            {t("leads.subtitle")}
          </p>
        </motion.div>

        {/* ── Summary Strip ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-3 mb-8"
        >
          <StatBadge
            icon={Users}
            label={t("leads.stat.total")}
            value={String(totalLeads)}
            accent="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400"
          />
          <StatBadge
            icon={Star}
            label={t("leads.stat.qualified")}
            value={String(qualifiedLeads)}
            accent="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400"
          />
          <StatBadge
            icon={Activity}
            label={t("leads.stat.avgDeal")}
            value={`$${avgDeal.toLocaleString("en-US")}`}
            accent="bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400"
          />
        </motion.div>

        {/* ── Two-column: Radar + Filters ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Radar Chart */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-1 bg-white dark:bg-gray-900 border border-black/5 dark:border-white/10 rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]"
          >
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              {t("leads.radar.title")}
            </h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
              {t("leads.radar.subtitle")}
            </p>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={RADAR_DATA} margin={{ top: 8, right: 16, bottom: 8, left: 16 }}>
                <PolarGrid stroke="rgba(99,102,241,0.15)" />
                <PolarAngleAxis
                  dataKey="channel"
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fontSize: 9, fill: "#9ca3af" }}
                  tickCount={4}
                />
                <Radar
                  name="Quality"
                  dataKey="quality"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
                <Radar
                  name="Volume"
                  dataKey="volume"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(17,24,39,0.92)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "10px",
                    fontSize: "12px",
                    color: "#f9fafb",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 mt-2 justify-center">
              <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <span className="w-3 h-0.5 bg-red-500 rounded-full inline-block" />
                Quality
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <span className="w-3 h-0.5 bg-violet-500 rounded-full inline-block" />
                Volume
              </span>
            </div>
          </motion.div>

          {/* Filters Panel */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-2 bg-white dark:bg-gray-900 border border-black/5 dark:border-white/10 rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] flex flex-col gap-5"
          >
            <div>
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                {t("leads.filter.title")}
              </h2>
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t("leads.filter.searchPlaceholder")}
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-black/5 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Source filter */}
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                {t("leads.filter.source")}
              </p>
              <div className="flex flex-wrap gap-2">
                {SOURCE_OPTIONS.map((src) => (
                  <button
                    key={src}
                    onClick={() => setSourceFilter(src)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                      sourceFilter === src
                        ? "bg-red-600 text-white shadow-[0_2px_8px_rgba(99,102,241,0.35)]"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {src}
                  </button>
                ))}
              </div>
            </div>

            {/* Status filter */}
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                {t("leads.filter.status")}
              </p>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((s) => {
                  const cfg = s === "all" ? null : STATUS_CONFIG[s];
                  const isActive = statusFilter === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                        isActive
                          ? "bg-red-600 text-white shadow-[0_2px_8px_rgba(99,102,241,0.35)]"
                          : cfg
                          ? `${cfg.bg} ${cfg.color} hover:opacity-80`
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {s === "all" ? "All Statuses" : STATUS_CONFIG[s].label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Result count */}
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-auto">
              {t("leads.filter.showing", { count: filtered.length, total: MOCK_LEADS.length })}
            </p>
          </motion.div>
        </div>

        {/* ── Leads Table ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-white dark:bg-gray-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {t("leads.table.title")}
            </h2>
            <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
              {filtered.length} {filtered.length === 1 ? "lead" : "leads"}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/5 dark:border-white/10 bg-gray-50/60 dark:bg-gray-800/40">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      <button
                        onClick={() => handleSort(col.key)}
                        className="flex items-center gap-1.5 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                      >
                        {col.label}
                        <SortIcon col={col.key} sortKey={sortKey} sortDir={sortDir} />
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <AnimatePresence mode="wait">
                <motion.tbody
                  key={`${search}-${sourceFilter}-${statusFilter}-${sortKey}-${sortDir}`}
                  variants={tableContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {filtered.length === 0 ? (
                    <motion.tr variants={rowVariant}>
                      <td colSpan={6} className="px-5 py-12 text-center text-gray-400 dark:text-gray-500 text-sm">
                        No leads match your filters.
                      </td>
                    </motion.tr>
                  ) : (
                    filtered.map((lead) => {
                      const cfg = STATUS_CONFIG[lead.status];
                      return (
                        <motion.tr
                          key={lead.id}
                          variants={rowVariant}
                          className="border-b border-black/5 dark:border-white/5 last:border-0 hover:bg-red-50/40 dark:hover:bg-red-500/5 transition-colors duration-150 group"
                          whileHover={{ x: 2 }}
                          transition={{ duration: 0.15 }}
                        >
                          {/* Name */}
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-violet-500 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 shadow-[0_2px_6px_rgba(99,102,241,0.3)]">
                                {(lead.name ?? "?").charAt(0)}
                              </div>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {lead.name}
                              </span>
                            </div>
                          </td>
                          {/* Email */}
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                              <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                              {lead.email}
                            </span>
                          </td>
                          {/* Source */}
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                              {lead.source}
                            </span>
                          </td>
                          {/* Status */}
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.color}`}
                            >
                              <Circle className="w-1.5 h-1.5 fill-current" />
                              {cfg.label}
                            </span>
                          </td>
                          {/* Date */}
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                              <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                              {lead.date}
                            </span>
                          </td>
                          {/* Value */}
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              ${(lead.value ?? 0).toLocaleString("en-US")}
                            </span>
                          </td>
                        </motion.tr>
                      );
                    })
                  )}
                </motion.tbody>
              </AnimatePresence>
            </table>
          </div>
        </motion.div>
      </div>
    </main>
  );
}