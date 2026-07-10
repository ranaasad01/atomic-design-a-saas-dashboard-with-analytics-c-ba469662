"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { User, Bell, Settings, Puzzle, Camera, Save, Check, X, Hash as Slack, Code2 as Github, Mail, AlertCircle, Eye, EyeOff, ChevronRight, Circle, Square, Layout } from 'lucide-react';
import { useTranslations } from "next-intl";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Types ───────────────────────────────────────────────────────────────────

type Tab = "profile" | "notifications" | "appearance" | "integrations";

interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  bio: string;
  company: string;
  website: string;
}

interface NotificationSettings {
  emailNewLead: boolean;
  emailWeeklyReport: boolean;
  emailProductUpdates: boolean;
  emailBilling: boolean;
  inAppNewLead: boolean;
  inAppGoalReached: boolean;
  inAppTeamActivity: boolean;
  inAppSystemAlerts: boolean;
}

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  connected: boolean;
  connectedAs?: string;
  category: string;
}

type ThemeOption = "light" | "dark" | "system";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const INITIAL_PROFILE: ProfileForm = {
  firstName: "Alex",
  lastName: "Rivera",
  email: "alex.rivera@easywork.io",
  role: "Product Manager",
  bio: "Building better workflows for distributed teams. Passionate about data-driven decisions.",
  company: "Easy Work Inc.",
  website: "https://easywork.io",
};

const INITIAL_NOTIFICATIONS: NotificationSettings = {
  emailNewLead: true,
  emailWeeklyReport: true,
  emailProductUpdates: false,
  emailBilling: true,
  inAppNewLead: true,
  inAppGoalReached: true,
  inAppTeamActivity: false,
  inAppSystemAlerts: true,
};

const INITIAL_INTEGRATIONS: Integration[] = [
  {
    id: "slack",
    name: "Slack",
    description: "Send lead alerts and weekly summaries to your Slack channels.",
    icon: "S",
    connected: true,
    connectedAs: "#growth-alerts",
    category: "Communication",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Sync leads and contacts automatically with your CRM.",
    icon: "H",
    connected: true,
    connectedAs: "alex@easywork.io",
    category: "CRM",
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Track revenue events and payment conversions in real time.",
    icon: "St",
    connected: false,
    category: "Payments",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Link commits and releases to your product analytics.",
    icon: "G",
    connected: false,
    category: "Development",
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Trigger email campaigns when leads hit key milestones.",
    icon: "M",
    connected: true,
    connectedAs: "growth@easywork.io",
    category: "Email Marketing",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect Easy Work to 5,000+ apps with no-code automations.",
    icon: "Z",
    connected: false,
    category: "Automation",
  },
];

// ─── Tab Config ───────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Layout },
  { id: "integrations", label: "Integrations", icon: Puzzle },
];

// ─── Reusable sub-components (inline) ────────────────────────────────────────

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">
        {title}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>
    </div>
  );
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
    >
      {children}
    </label>
  );
}

function TextInput({
  id,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
    />
  );
}

function ToggleSwitch({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  id: string;
}) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
        checked ? "bg-indigo-500" : "bg-gray-200 dark:bg-gray-700"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function SaveButton({ saved, onClick }: { saved: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
        saved
          ? "bg-emerald-500 text-white"
          : "bg-indigo-500 hover:bg-indigo-600 text-white shadow-[0_2px_8px_rgba(99,102,241,0.35)] hover:shadow-[0_4px_16px_rgba(99,102,241,0.45)]"
      }`}
    >
      {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
      {saved ? "Saved!" : "Save changes"}
    </motion.button>
  );
}

// ─── Tab Panels ───────────────────────────────────────────────────────────────

function ProfileTab() {
  const [form, setForm] = useState<ProfileForm>(INITIAL_PROFILE);
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const set = (key: keyof ProfileForm) => (v: string) =>
    setForm((prev) => ({ ...prev, [key]: v }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      {/* Avatar */}
      <motion.div variants={fadeInUp}>
        <SectionHeading title="Profile Information" subtitle="Update your personal details and public profile." />
        <div className="flex items-center gap-5 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-600 flex items-center justify-center text-white text-2xl font-bold shadow-[0_4px_16px_rgba(99,102,241,0.35)]">
              {(form.firstName?.[0] ?? "A")}{(form.lastName?.[0] ?? "R")}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white dark:bg-gray-800 border border-black/10 dark:border-white/10 flex items-center justify-center shadow-sm hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
              <Camera className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {form.firstName} {form.lastName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{form.role}</p>
            <button className="mt-2 text-xs text-indigo-600 dark:text-indigo-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded">
              Upload new photo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel htmlFor="firstName">First name</FieldLabel>
            <TextInput id="firstName" value={form.firstName} onChange={set("firstName")} placeholder="First name" />
          </div>
          <div>
            <FieldLabel htmlFor="lastName">Last name</FieldLabel>
            <TextInput id="lastName" value={form.lastName} onChange={set("lastName")} placeholder="Last name" />
          </div>
          <div>
            <FieldLabel htmlFor="email">Email address</FieldLabel>
            <TextInput id="email" value={form.email} onChange={set("email")} placeholder="you@example.com" type="email" />
          </div>
          <div>
            <FieldLabel htmlFor="role">Job title</FieldLabel>
            <TextInput id="role" value={form.role} onChange={set("role")} placeholder="e.g. Product Manager" />
          </div>
          <div>
            <FieldLabel htmlFor="company">Company</FieldLabel>
            <TextInput id="company" value={form.company} onChange={set("company")} placeholder="Company name" />
          </div>
          <div>
            <FieldLabel htmlFor="website">Website</FieldLabel>
            <TextInput id="website" value={form.website} onChange={set("website")} placeholder="https://yoursite.com" />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="bio">Bio</FieldLabel>
            <textarea
              id="bio"
              value={form.bio}
              onChange={(e) => set("bio")(e.target.value)}
              rows={3}
              placeholder="Tell your team a little about yourself..."
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 resize-none"
            />
          </div>
        </div>
      </motion.div>

      {/* Password */}
      <motion.div variants={fadeInUp} className="pt-6 border-t border-black/5 dark:border-white/10">
        <SectionHeading title="Change Password" subtitle="Use a strong password you don't use elsewhere." />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="currentPassword">Current password</FieldLabel>
            <div className="relative">
              <input
                id="currentPassword"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 pr-10 text-sm rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus-visible:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="flex justify-end pt-2">
        <SaveButton saved={saved} onClick={handleSave} />
      </motion.div>
    </motion.div>
  );
}

function NotificationsTab() {
  const [settings, setSettings] = useState<NotificationSettings>(INITIAL_NOTIFICATIONS);
  const [saved, setSaved] = useState(false);

  const toggle = (key: keyof NotificationSettings) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const emailRows: { key: keyof NotificationSettings; label: string; desc: string }[] = [
    { key: "emailNewLead", label: "New lead captured", desc: "Get notified when a new lead enters your pipeline." },
    { key: "emailWeeklyReport", label: "Weekly analytics report", desc: "A summary of signups, revenue, and top sources every Monday." },
    { key: "emailProductUpdates", label: "Product updates", desc: "Feature releases and changelog highlights from Easy Work." },
    { key: "emailBilling", label: "Billing and invoices", desc: "Receipts, plan changes, and payment failures." },
  ];

  const inAppRows: { key: keyof NotificationSettings; label: string; desc: string }[] = [
    { key: "inAppNewLead", label: "New lead alert", desc: "In-app banner when a lead is added in real time." },
    { key: "inAppGoalReached", label: "Goal milestone reached", desc: "Celebrate when your signup or revenue goal is hit." },
    { key: "inAppTeamActivity", label: "Team activity", desc: "See when teammates update leads or change settings." },
    { key: "inAppSystemAlerts", label: "System alerts", desc: "Integration errors, sync failures, and important notices." },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={fadeInUp}>
        <SectionHeading title="Email Notifications" subtitle="Choose which emails Easy Work sends to your inbox." />
        <div className="space-y-1">
          {emailRows.map((row) => (
            <div
              key={row.key}
              className="flex items-center justify-between py-4 border-b border-black/5 dark:border-white/5 last:border-0"
            >
              <div className="pr-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{row.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{row.desc}</p>
              </div>
              <ToggleSwitch
                id={row.key}
                checked={settings[row.key]}
                onChange={() => toggle(row.key)}
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="pt-2">
        <SectionHeading title="In-App Notifications" subtitle="Control what appears in your notification center." />
        <div className="space-y-1">
          {inAppRows.map((row) => (
            <div
              key={row.key}
              className="flex items-center justify-between py-4 border-b border-black/5 dark:border-white/5 last:border-0"
            >
              <div className="pr-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{row.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{row.desc}</p>
              </div>
              <ToggleSwitch
                id={row.key}
                checked={settings[row.key]}
                onChange={() => toggle(row.key)}
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="flex justify-end pt-2">
        <SaveButton saved={saved} onClick={handleSave} />
      </motion.div>
    </motion.div>
  );
}

const themePreviewVariant: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

function AppearanceTab() {
  const [theme, setTheme] = useState<ThemeOption>("system");
  const [accentColor, setAccentColor] = useState("#6366F1");
  const [density, setDensity] = useState<"compact" | "default" | "comfortable">("default");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const themes: { id: ThemeOption; label: string; desc: string }[] = [
    { id: "light", label: "Light", desc: "Clean white surfaces for bright environments." },
    { id: "dark", label: "Dark", desc: "Easy on the eyes in low-light conditions." },
    { id: "system", label: "System", desc: "Follows your OS preference automatically." },
  ];

  const accents = [
    { color: "#6366F1", label: "Indigo" },
    { color: "#8B5CF6", label: "Violet" },
    { color: "#EC4899", label: "Pink" },
    { color: "#10B981", label: "Emerald" },
    { color: "#F59E0B", label: "Amber" },
    { color: "#3B82F6", label: "Blue" },
  ];

  const densities: { id: "compact" | "default" | "comfortable"; label: string; desc: string }[] = [
    { id: "compact", label: "Compact", desc: "More data, less spacing." },
    { id: "default", label: "Default", desc: "Balanced for most screens." },
    { id: "comfortable", label: "Comfortable", desc: "Generous spacing, easier to scan." },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      {/* Theme selector */}
      <motion.div variants={fadeInUp}>
        <SectionHeading title="Theme" subtitle="Select how Easy Work looks for you. Changes apply immediately." />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`relative rounded-2xl border-2 p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                theme === t.id
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10"
                  : "border-black/10 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-700"
              }`}
            >
              {/* Preview swatch */}
              <div className="mb-3 rounded-xl overflow-hidden border border-black/5 dark:border-white/5 shadow-sm">
                {t.id === "light" && (
                  <div className="bg-white p-3 space-y-1.5">
                    <div className="h-2 w-16 rounded bg-gray-200" />
                    <div className="h-2 w-10 rounded bg-indigo-200" />
                    <div className="flex gap-1.5 mt-2">
                      <div className="h-6 w-6 rounded bg-indigo-100" />
                      <div className="h-6 flex-1 rounded bg-gray-100" />
                    </div>
                  </div>
                )}
                {t.id === "dark" && (
                  <div className="bg-gray-950 p-3 space-y-1.5">
                    <div className="h-2 w-16 rounded bg-gray-700" />
                    <div className="h-2 w-10 rounded bg-indigo-700" />
                    <div className="flex gap-1.5 mt-2">
                      <div className="h-6 w-6 rounded bg-indigo-900" />
                      <div className="h-6 flex-1 rounded bg-gray-800" />
                    </div>
                  </div>
                )}
                {t.id === "system" && (
                  <div className="flex">
                    <div className="bg-white flex-1 p-3 space-y-1.5">
                      <div className="h-2 w-8 rounded bg-gray-200" />
                      <div className="h-2 w-5 rounded bg-indigo-200" />
                    </div>
                    <div className="bg-gray-950 flex-1 p-3 space-y-1.5">
                      <div className="h-2 w-8 rounded bg-gray-700" />
                      <div className="h-2 w-5 rounded bg-indigo-700" />
                    </div>
                  </div>
                )}
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t.desc}</p>
              {theme === t.id && (
                <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Accent color */}
      <motion.div variants={fadeInUp} className="pt-2">
        <SectionHeading title="Accent Color" subtitle="Used for buttons, highlights, and active states." />
        <div className="flex flex-wrap gap-3">
          {accents.map((a) => (
            <button
              key={a.color}
              onClick={() => setAccentColor(a.color)}
              title={a.label}
              className="relative w-9 h-9 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 transition-transform duration-150 hover:scale-110"
              style={{ backgroundColor: a.color }}
            >
              {accentColor === a.color && (
                <Check className="w-4 h-4 text-white absolute inset-0 m-auto" />
              )}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          Selected: <span className="font-medium" style={{ color: accentColor }}>{accents.find((a) => a.color === accentColor)?.label ?? accentColor}</span>
        </p>
      </motion.div>

      {/* Density */}
      <motion.div variants={fadeInUp} className="pt-2">
        <SectionHeading title="Display Density" subtitle="Adjust how much information is shown per screen." />
        <div className="flex flex-col sm:flex-row gap-3">
          {densities.map((d) => (
            <button
              key={d.id}
              onClick={() => setDensity(d.id)}
              className={`flex-1 rounded-xl border-2 px-4 py-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                density === d.id
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10"
                  : "border-black/10 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-700"
              }`}
            >
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{d.label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{d.desc}</p>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="flex justify-end pt-2">
        <SaveButton saved={saved} onClick={handleSave} />
      </motion.div>
    </motion.div>
  );
}

function IntegrationsTab() {
  const [integrations, setIntegrations] = useState<Integration[]>(INITIAL_INTEGRATIONS);
  const [connecting, setConnecting] = useState<string | null>(null);

  const toggle = (id: string) => {
    const integration = integrations.find((i) => i.id === id);
    if (!integration) return;

    if (integration.connected) {
      setIntegrations((prev) =>
        prev.map((i) => (i.id === id ? { ...i, connected: false, connectedAs: undefined } : i))
      );
    } else {
      setConnecting(id);
      setTimeout(() => {
        setIntegrations((prev) =>
          prev.map((i) =>
            i.id === id ? { ...i, connected: true, connectedAs: "demo@easywork.io" } : i
          )
        );
        setConnecting(null);
      }, 1400);
    }
  };

  const iconColors: Record<string, string> = {
    slack: "bg-[#4A154B] text-white",
    hubspot: "bg-[#FF7A59] text-white",
    stripe: "bg-[#635BFF] text-white",
    github: "bg-gray-900 text-white",
    mailchimp: "bg-[#FFE01B] text-gray-900",
    zapier: "bg-[#FF4A00] text-white",
  };

  const categories = Array.from(new Set(integrations.map((i) => i.category)));

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={fadeInUp}>
        <SectionHeading
          title="Connected Integrations"
          subtitle="Link Easy Work to your existing tools and automate your workflow."
        />
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 mb-6">
          <AlertCircle className="w-4 h-4 text-indigo-500 shrink-0" />
          <p className="text-xs text-indigo-700 dark:text-indigo-300">
            Connecting an integration grants Easy Work read access to sync data. You can disconnect at any time.
          </p>
        </div>
      </motion.div>

      {categories.map((category) => (
        <motion.div key={category} variants={fadeInUp}>
          <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
            {category}
          </h3>
          <div className="space-y-3">
            {integrations
              .filter((i) => i.category === category)
              .map((integration) => (
                <motion.div
                  key={integration.id}
                  layout
                  className="flex items-center gap-4 p-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-gray-900 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] transition-all duration-200"
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                      iconColors[integration.id] ?? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {integration.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {integration.name}
                      </p>
                      {integration.connected && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Connected
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                      {integration.connected && integration.connectedAs
                        ? `Connected as ${integration.connectedAs}`
                        : integration.description}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => toggle(integration.id)}
                    disabled={connecting === integration.id}
                    className={`shrink-0 px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-60 ${
                      integration.connected
                        ? "border border-black/10 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-500/30"
                        : "bg-indigo-500 hover:bg-indigo-600 text-white shadow-[0_2px_8px_rgba(99,102,241,0.3)]"
                    }`}
                  >
                    {connecting === integration.id
                      ? "Connecting..."
                      : integration.connected
                      ? "Disconnect"
                      : "Connect"}
                  </motion.button>
                </motion.div>
              ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const panelVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Settings
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Manage your account, notifications, appearance, and integrations.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar tabs */}
          <motion.aside
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="lg:w-56 shrink-0"
          >
            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ x: isActive ? 0 : 2 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 w-full text-left ${
                      isActive
                        ? "bg-indigo-500 text-white shadow-[0_2px_8px_rgba(99,102,241,0.35)]"
                        : "text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {tab.label}
                    {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
                  </motion.button>
                );
              })}
            </nav>
          </motion.aside>

          {/* Panel */}
          <div className="flex-1 min-w-0">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                >
                  {activeTab === "profile" && <ProfileTab />}
                  {activeTab === "notifications" && <NotificationsTab />}
                  {activeTab === "appearance" && <AppearanceTab />}
                  {activeTab === "integrations" && <IntegrationsTab />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}