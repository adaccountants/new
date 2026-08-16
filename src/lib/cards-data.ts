/**
 * TEMP in-memory store — replace each function body with a Supabase query against a `cards` table
 * filtered by section, ordered by sort_order, published=true for public reads.
 * Keep these exact function signatures.
 *
 * Supabase mapping
 * ----------------
 * Table: `cards`
 * Columns:
 *   id          uuid primary key
 *   section     text  -- 'services' | 'testimonials' | 'blog' | 'team' | 'careers' | 'knowledge' | 'partnership'
 *   slug        text  -- required for services & blog; unique per (section, slug)
 *   title       text
 *   subtitle    text
 *   body        text
 *   image_url   text  -- maps to imageUrl
 *   file_url    text  -- maps to fileUrl (knowledge downloads only)
 *   file_name   text  -- maps to fileName (original filename for knowledge downloads)
 *   category    text  -- knowledge only: Guides | Checklists & Templates | Deadline Calendars | Industry Insights
 *   sort_order  int   -- maps to sortOrder
 *   published   boolean
 *
 * RLS:
 *   Public-read: SELECT where published = true (and, for public pages, the matching section).
 *   Admin-only:  INSERT / UPDATE / DELETE on all rows (including drafts). Authenticated admin role.
 *
 * In this mock, getCards returns every row in a section (including drafts) so the admin list can
 * show unpublished cards. Public pages must filter `published === true` themselves until the
 * function bodies are swapped for the public-read query above.
 *
 * Homepage service highlights use slugs prefixed with `home-`. The /services grid uses the rest.
 */

import accountancy from "@/assets/acc-accountancy.jpg";
import tax from "@/assets/acc-tax.jpg";
import startup from "@/assets/acc-startup.jpg";
import other from "@/assets/acc-other.jpg";
import bridge from "@/assets/acc-bridge.jpg";
import s1 from "@/assets/s1.jpg";
import s2 from "@/assets/s2.jpg";
import s3 from "@/assets/s3.jpg";
import s4 from "@/assets/s4.jpg";
import s5 from "@/assets/s5.jpg";
import s6 from "@/assets/s6.jpg";
import s7 from "@/assets/s7.jpg";
import s8 from "@/assets/s8.jpg";
import s9 from "@/assets/s9.jpg";
import s10 from "@/assets/s10.jpg";
import blogMeeting from "@/assets/blog-meeting.jpg";
import blogSwitching from "@/assets/blog-switching.jpg";
import blogAi from "@/assets/blog-ai.jpg";
import blogLandlord from "@/assets/blog-landlord.jpg";
import blogLimitedCompany from "@/assets/blog-limited-company.jpg";
import blogRnd from "@/assets/blog-rnd.jpg";

import { emitCmsChange } from "@/lib/cms-sync";

export type CardSection =
  | "services"
  | "testimonials"
  | "blog"
  | "team"
  | "careers"
  | "knowledge"
  | "partnership";

export type KnowledgeCategory =
  | "Guides"
  | "Checklists & Templates"
  | "Deadline Calendars"
  | "Industry Insights";

export const KNOWLEDGE_CATEGORIES: KnowledgeCategory[] = [
  "Guides",
  "Checklists & Templates",
  "Deadline Calendars",
  "Industry Insights",
];

export type Card = {
  id: string;
  section: CardSection;
  slug?: string;
  title: string;
  subtitle?: string;
  body?: string;
  imageUrl: string;
  fileUrl?: string;
  fileName?: string;
  category?: string;
  sortOrder: number;
  published: boolean;
};

export const CARD_SECTIONS: CardSection[] = [
  "services",
  "testimonials",
  "blog",
  "knowledge",
  "partnership",
  "team",
  "careers",
];

export const HOME_SERVICE_SLUG_PREFIX = "home-";

export function isCardSection(value: string): value is CardSection {
  return (CARD_SECTIONS as string[]).includes(value);
}

export function isHomeServiceCard(card: Card): boolean {
  return card.section === "services" && (card.slug?.startsWith(HOME_SERVICE_SLUG_PREFIX) ?? false);
}

let cards: Card[] = [
  {
    id: "svc-home-accountancy",
    section: "services",
    slug: "home-chartered-accountancy",
    title: "Chartered Accountancy",
    subtitle: "Annual accounts that tell your story",
    imageUrl: accountancy,
    sortOrder: 1,
    published: true,
  },
  {
    id: "svc-home-tax",
    section: "services",
    slug: "home-taxation-services",
    title: "Taxation Services",
    subtitle: "Minimise tax, stay compliant",
    imageUrl: tax,
    sortOrder: 2,
    published: true,
  },
  {
    id: "svc-home-startup",
    section: "services",
    slug: "home-business-start-up",
    title: "Business Start Up",
    subtitle: "The right structure from day one",
    imageUrl: startup,
    sortOrder: 3,
    published: true,
  },
  {
    id: "svc-home-other",
    section: "services",
    slug: "home-other-services",
    title: "Other Services",
    subtitle: "Payroll, VAT & cloud bookkeeping",
    imageUrl: other,
    sortOrder: 4,
    published: true,
  },
  {
    id: "svc-home-advisory",
    section: "services",
    slug: "home-business-advisory",
    title: "Business Advisory",
    subtitle: "Personal & corporate tax planning",
    imageUrl: bridge,
    sortOrder: 5,
    published: true,
  },
  {
    id: "svc-listed-non-listed",
    section: "services",
    slug: "listed-non-listed-companies",
    title: "Listed & Non-Listed Companies",
    body: "Company formation, bookkeeping, accounting, compliance and governance services.",
    imageUrl: s1,
    sortOrder: 10,
    published: true,
  },
  {
    id: "svc-payroll",
    section: "services",
    slug: "payroll-payments",
    title: "Payroll & Payments",
    body: "Payroll processing, employee payments, pension management and payroll compliance.",
    imageUrl: s2,
    sortOrder: 11,
    published: true,
  },
  {
    id: "svc-tax-returns",
    section: "services",
    slug: "tax-returns",
    title: "Tax Returns",
    body: "Preparation and submission of company and personal tax returns.",
    imageUrl: s3,
    sortOrder: 12,
    published: true,
  },
  {
    id: "svc-vat",
    section: "services",
    slug: "vat-return-filing",
    title: "VAT Return Filing",
    body: "Preparation, review and submission of VAT returns with full compliance.",
    imageUrl: s4,
    sortOrder: 13,
    published: true,
  },
  {
    id: "svc-secretarial",
    section: "services",
    slug: "corporate-secretarial-governance",
    title: "Corporate Secretarial & Governance",
    body: "Companies House filings, statutory records, governance and compliance support.",
    imageUrl: s5,
    sortOrder: 14,
    published: true,
  },
  {
    id: "svc-non-statutory-audit",
    section: "services",
    slug: "non-statutory-audit",
    title: "Non-Statutory Audit",
    body: "Independent financial review and reporting for organizations requiring non-statutory audits.",
    imageUrl: s6,
    sortOrder: 15,
    published: true,
  },
  {
    id: "svc-management-accounts",
    section: "services",
    slug: "management-accounts",
    title: "Management Accounts",
    body: "Monthly and quarterly financial reporting to support informed business decisions.",
    imageUrl: s7,
    sortOrder: 16,
    published: true,
  },
  {
    id: "svc-charity-exam",
    section: "services",
    slug: "independent-examination-charity-accounts",
    title: "Independent Examination of Charity Accounts",
    body: "Professional examination and reporting of charity accounts in line with regulations.",
    imageUrl: s8,
    sortOrder: 17,
    published: true,
  },
  {
    id: "svc-trust-charity",
    section: "services",
    slug: "trust-charity-accounting",
    title: "Trust & Charity Accounting",
    body: "Accounting, bookkeeping and governance support for trusts and charitable organizations.",
    imageUrl: s9,
    sortOrder: 18,
    published: true,
  },
  {
    id: "svc-outsourcing",
    section: "services",
    slug: "outsourcing-accounts-bookkeeping-india",
    title: "Outsourcing Accounts & Bookkeeping to India",
    body: "Secure, cloud-based accounting outsourcing that reduces costs while maintaining quality and compliance.",
    imageUrl: s10,
    sortOrder: 19,
    published: true,
  },
  {
    id: "ptr-xero",
    section: "partnership",
    title: "Xero",
    body: "Cloud accounting software that simplifies bookkeeping, invoicing, bank reconciliation, reporting, and financial management.",
    imageUrl: "/partners/xero.svg",
    sortOrder: 1,
    published: true,
  },
  {
    id: "ptr-smartsearch",
    section: "partnership",
    title: "SmartSearch",
    body: "Digital identity verification, AML compliance, and Know Your Customer (KYC) solutions for secure client onboarding.",
    imageUrl: "/partners/smartsearch.svg",
    sortOrder: 2,
    published: true,
  },
  {
    id: "ptr-accountsiq",
    section: "partnership",
    title: "AccountsIQ",
    body: "Advanced cloud financial management software providing automation, reporting, consolidation, and business insights.",
    imageUrl: "/partners/accountsiq.svg",
    sortOrder: 3,
    published: true,
  },
  {
    id: "ptr-sage",
    section: "partnership",
    title: "Sage",
    body: "Business accounting, payroll, and financial management software designed for growing businesses.",
    imageUrl: "/partners/sage.svg",
    sortOrder: 4,
    published: true,
  },
  {
    id: "t1",
    section: "testimonials",
    title: "Anjali Kochar",
    body: "The team are brilliant. So welcoming and helpful, and they really took the time to understand what I needed. Everything was explained clearly.",
    imageUrl: "",
    sortOrder: 1,
    published: true,
  },
  {
    id: "t2",
    section: "testimonials",
    title: "Hemant Tripathi",
    body: "Their knowledge around arts and construction based industries has been an asset — along with brilliant tax and VAT advice.",
    imageUrl: "",
    sortOrder: 2,
    published: true,
  },
  {
    id: "t3",
    section: "testimonials",
    title: "Nijam Ali",

    body: "A safe pair of hands for all my statutory needs. Professional with a personal touch that makes them a pleasure to deal with.",
    imageUrl: "",
    sortOrder: 3,
    published: true,
  },
  {
    id: "blog-meet-accountant",
    section: "blog",
    slug: "how-often-should-you-meet-with-your-accountant",
    title: "How often should you meet with your accountant?",
    subtitle: "March 12, 2026",
    body: "We recommend meeting quarterly for general reviews and at least annually for tax planning and financial reporting. Here's why cadence matters.",
    imageUrl: blogMeeting,
    sortOrder: 1,
    published: true,
  },
  {
    id: "blog-switching",
    section: "blog",
    slug: "switching-accountants-what-to-expect",
    title: "Switching accountants — what to expect",
    subtitle: "February 24, 2026",
    body: "Switching is straightforward. We guide you through the whole process, liaising directly with your previous accountant for a seamless transition.",
    imageUrl: blogSwitching,
    sortOrder: 2,
    published: true,
  },
  {
    id: "blog-ai",
    section: "blog",
    slug: "ai-in-accountancy-what-it-actually-changes",
    title: "AI in accountancy: what it actually changes",
    subtitle: "January 30, 2026",
    body: "From anomaly detection in your ledger to real-time cash-flow forecasting — how AI-powered tools are reshaping practical accountancy.",
    imageUrl: blogAi,
    sortOrder: 3,
    published: true,
  },
  {
    id: "blog-landlord",
    section: "blog",
    slug: "landlord-tax-advice-minimising-tax-on-rental-income",
    title: "Landlord tax advice: minimising tax on rental income",
    subtitle: "January 8, 2026",
    body: "Practical planning steps for property investors, from allowable expenses to structuring a portfolio for the long term.",
    imageUrl: blogLandlord,
    sortOrder: 4,
    published: true,
  },
  {
    id: "blog-limited-company",
    section: "blog",
    slug: "starting-a-limited-company-the-right-way",
    title: "Starting a limited company — the right way",
    subtitle: "December 12, 2025",
    body: "A step-by-step guide to incorporation, the tax basics, and the decisions to make in your first 90 days of trading.",
    imageUrl: blogLimitedCompany,
    sortOrder: 5,
    published: true,
  },
  {
    id: "blog-rnd",
    section: "blog",
    slug: "rd-tax-relief-for-software-developers",
    title: "R&D tax relief for software developers",
    subtitle: "November 20, 2025",
    body: "What qualifies as R&D, how much you can claim, and the documentation you'll need before filing.",
    imageUrl: blogRnd,
    sortOrder: 6,
    published: true,
  },
  {
    id: "career-experienced",
    section: "careers",
    slug: "experienced-professionals",
    title: "Experienced Professionals",
    subtitle: "UK / Hybrid · Full-time",
    body: "Are you a qualified Chartered Accountant, Tax Advisor, or Client Manager looking for a modern firm? Bring your expertise to Alpha Digi.\n\nYou will lead client portfolios, architect AI integrations for custom ledgers, and provide high-value financial advisory services with absolute autonomy.\n---\nACA / ACCA / CTA qualified professionals\nSenior Tax & VAT specialists\nCharity & Trust audit leaders",
    imageUrl: "",
    sortOrder: 1,
    published: true,
  },
  {
    id: "career-graduates",
    section: "careers",
    slug: "early-entry-graduates",
    title: "Early Entry & Graduates",
    subtitle: "UK / Hybrid · Full-time / Apprenticeship",
    body: "Kickstart your accounting career in a digital-first environment. If you are an apprentice, student, or recent graduate, we offer practical experience combined with support for your ACA/ACCA credentials.\n\nLearn modern cloud accounting methods alongside Big 4-trained mentors.\n---\nGraduates & apprentices\nAAT students / early trainees\nAspiring fintech & tax specialists",
    imageUrl: "",
    sortOrder: 2,
    published: true,
  },
  {
    id: "know-sa-calendar",
    section: "knowledge",
    slug: "self-assessment-deadline-calendar-2026-27",
    title: "Self-Assessment Deadline Calendar 2026/27",
    subtitle: "Deadline Calendars",
    body: "Key Self Assessment dates for the 2026/27 tax year, including paper and online filing, payments on account, and our recommended prep window.",
    imageUrl: blogLandlord,
    fileUrl: "/knowledge-files/self-assessment-deadline-calendar-2026-27.pdf",
    fileName: "self-assessment-deadline-calendar-2026-27.pdf",
    category: "Deadline Calendars",
    sortOrder: 1,
    published: true,
  },
  {
    id: "know-ct-calendar",
    section: "knowledge",
    slug: "corporation-tax-filing-calendar-2026-27",
    title: "Corporation Tax Filing Calendar 2026/27",
    subtitle: "Deadline Calendars",
    body: "A year-round calendar of Companies House accounts, Corporation Tax returns, and payment dates for limited companies.",
    imageUrl: blogLimitedCompany,
    fileUrl: "/knowledge-files/corporation-tax-filing-calendar-2026-27.pdf",
    fileName: "corporation-tax-filing-calendar-2026-27.pdf",
    category: "Deadline Calendars",
    sortOrder: 2,
    published: true,
  },
  {
    id: "know-new-business",
    section: "knowledge",
    slug: "new-business-setup-checklist",
    title: "New Business Setup Checklist",
    subtitle: "Checklists & Templates",
    body: "A practical checklist for launching a UK business: structure, HMRC registrations, record-keeping, and the first 90 days of trading.",
    imageUrl: startup,
    fileUrl: "/knowledge-files/new-business-setup-checklist.pdf",
    fileName: "new-business-setup-checklist.pdf",
    category: "Checklists & Templates",
    sortOrder: 3,
    published: true,
  },
  {
    id: "know-year-end",
    section: "knowledge",
    slug: "year-end-bookkeeping-checklist",
    title: "Year-End Bookkeeping Checklist",
    subtitle: "Checklists & Templates",
    body: "What to gather before we close your books — bank recs, invoices, stock, directors’ loans, and year-end adjustments.",
    imageUrl: accountancy,
    fileUrl: "/knowledge-files/year-end-bookkeeping-checklist.pdf",
    fileName: "year-end-bookkeeping-checklist.pdf",
    category: "Checklists & Templates",
    sortOrder: 4,
    published: true,
  },
  {
    id: "know-mileage",
    section: "knowledge",
    slug: "mileage-log-template",
    title: "Mileage Log Template",
    subtitle: "Checklists & Templates",
    body: "A simple mileage log for claiming approved mileage allowance — date, journey, business purpose, and miles.",
    imageUrl: other,
    fileUrl: "/knowledge-files/mileage-log-template.pdf",
    fileName: "mileage-log-template.pdf",
    category: "Checklists & Templates",
    sortOrder: 5,
    published: true,
  },
  {
    id: "know-vat-thresholds",
    section: "knowledge",
    slug: "understanding-vat-registration-thresholds",
    title: "Understanding VAT Registration Thresholds",
    subtitle: "Guides",
    body: "When VAT registration becomes compulsory, how the rolling 12-month test works, and what voluntary registration can mean for your cash flow.",
    imageUrl: tax,
    fileUrl: "/knowledge-files/understanding-vat-registration-thresholds.pdf",
    fileName: "understanding-vat-registration-thresholds.pdf",
    category: "Guides",
    sortOrder: 6,
    published: true,
  },
  {
    id: "know-mtd",
    section: "knowledge",
    slug: "making-tax-digital-what-it-means-for-you",
    title: "Making Tax Digital: What It Means For You",
    subtitle: "Guides",
    body: "A plain-English briefing on Making Tax Digital for VAT and Income Tax, digital records, and how we help you stay compliant.",
    imageUrl: blogAi,
    fileUrl: "/knowledge-files/making-tax-digital-what-it-means-for-you.pdf",
    fileName: "making-tax-digital-what-it-means-for-you.pdf",
    category: "Guides",
    sortOrder: 7,
    published: true,
  },
  {
    id: "know-payroll-teams",
    section: "knowledge",
    slug: "payroll-for-growing-teams",
    title: "Payroll for Growing Teams",
    subtitle: "Industry Insights",
    body: "What changes as you hire: PAYE, auto-enrolment, benefits, and the records HMRC expects from a growing employer.",
    imageUrl: blogMeeting,
    fileUrl: "/knowledge-files/payroll-for-growing-teams.pdf",
    fileName: "payroll-for-growing-teams.pdf",
    category: "Industry Insights",
    sortOrder: 8,
    published: true,
  },
];

export function parseCareerBody(body = ""): { paragraphs: string[]; ideals: string[] } {
  const [main = "", idealPart] = body.split("\n---\n");
  const paragraphs = main.split("\n\n").filter(Boolean);
  const ideals = idealPart ? idealPart.split("\n").filter(Boolean) : [];
  return { paragraphs, ideals };
}

export function getCards(section: string): Card[] {
  return cards
    .filter((card) => card.section === section)
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder || a.id.localeCompare(b.id));
}

export function getCardBySlug(section: string, slug: string): Card | undefined {
  return cards.find((card) => card.section === section && card.slug === slug);
}

export function getCardById(id: string): Card | undefined {
  return cards.find((card) => card.id === id);
}

export function addCard(card: Omit<Card, "id">): Card {
  const created: Card = { ...card, id: crypto.randomUUID() };
  cards = [...cards, created];
  emitCmsChange();
  return created;
}

export function updateCard(id: string, patch: Partial<Card>): Card {
  const current = cards.find((card) => card.id === id);
  if (!current) {
    throw new Error(`Card not found: ${id}`);
  }
  const updated: Card = {
    id: current.id,
    section: patch.section ?? current.section,
    title: patch.title ?? current.title,
    imageUrl: patch.imageUrl ?? current.imageUrl,
    sortOrder: patch.sortOrder ?? current.sortOrder,
    published: patch.published ?? current.published,
  };
  const slug = "slug" in patch ? patch.slug : current.slug;
  const subtitle = "subtitle" in patch ? patch.subtitle : current.subtitle;
  const body = "body" in patch ? patch.body : current.body;
  const fileUrl = "fileUrl" in patch ? patch.fileUrl : current.fileUrl;
  const fileName = "fileName" in patch ? patch.fileName : current.fileName;
  const category = "category" in patch ? patch.category : current.category;
  if (slug) updated.slug = slug;
  if (subtitle) updated.subtitle = subtitle;
  if (body) updated.body = body;
  if (fileUrl) updated.fileUrl = fileUrl;
  if (fileName) updated.fileName = fileName;
  if (category) updated.category = category;
  cards = cards.map((card) => (card.id === id ? updated : card));
  emitCmsChange();
  return updated;
}

export function deleteCard(id: string): void {
  cards = cards.filter((card) => card.id !== id);
  emitCmsChange();
}

export function reorderCards(section: string, orderedIds: string[]): void {
  const order = new Map(orderedIds.map((id, index) => [id, index]));
  cards = cards.map((card) => {
    if (card.section !== section || !order.has(card.id)) return card;
    return { ...card, sortOrder: order.get(card.id)! };
  });
  emitCmsChange();
}
