export const APP_NAME = "Easy Work";
export const APP_TAGLINE = "Analytics that move your business forward.";
export const APP_ACCENT = "#6366F1";

export interface NavLink {
  label: string;
  href: string;
  type: "route" | "anchor";
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", type: "route" },
  { label: "Dashboard", href: "/dashboard", type: "route" },
  { label: "Analytics", href: "/analytics", type: "route" },
  { label: "Leads", href: "/leads", type: "route" },
  { label: "Settings", href: "/settings", type: "route" },
];

export interface KpiCard {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  prefix?: string;
  suffix?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  source: string;
  status: "new" | "contacted" | "qualified" | "converted" | "lost";
  date: string;
  value: number;
}

export type ChartDataPoint = {
  date: string;
  signups: number;
  leads: number;
  revenue: number;
};

export type LeadSource = {
  source: string;
  count: number;
  color: string;
};