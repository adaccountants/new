/**
 * TEMP in-memory store — replace each function body with a Supabase query against a `page_content`
 * table keyed by `key`. Keep these exact function signatures.
 *
 * Supabase mapping
 * ----------------
 * Table: `page_content`
 * Columns:
 *   key    text primary key  -- dot notation, e.g. 'home.hero.heading'
 *   page   text              -- 'home' | 'about' | 'services' | 'careers' | 'contact' | 'blog' | 'knowledge'
 *   label  text              -- human-readable admin label
 *   value  text
 *   type   text              -- 'text' | 'richtext'
 *
 * RLS:
 *   Public-read: SELECT on all rows (copy is shown on the marketing site).
 *   Admin-only:  INSERT / UPDATE / DELETE. Authenticated admin role.
 */

import accountant from "@/assets/accountant.webp";
import accountantMobile from "@/assets/accountant-mobile.webp";
import bridge from "@/assets/acc-bridge.jpg";

import { emitCmsChange } from "@/lib/cms-sync";

export type ContentPage = "home" | "about" | "services" | "careers" | "contact" | "blog" | "knowledge";

export type ContentBlock = {
  key: string;
  page: ContentPage;
  label: string;
  value: string;
  type: "text" | "richtext";
};

export const CONTENT_PAGES: { id: ContentPage; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "careers", label: "Careers" },
  { id: "contact", label: "Contact" },
  { id: "blog", label: "Blog" },
  { id: "knowledge", label: "Knowledge" },
];

function block(
  key: string,
  page: ContentPage,
  label: string,
  value: string,
  type: ContentBlock["type"] = "text",
): ContentBlock {
  return { key, page, label, value, type };
}

let blocks: ContentBlock[] = [
  // —— Home: header / nav / footer chrome (site-wide, edited under Home) ——
  block("home.header.brandPrefix", "home", "Header logo prefix", "Alpha"),
  block("home.header.brandAccent", "home", "Header logo accent", "Digi"),
  block("home.header.brandSuffix", "home", "Header logo suffix", "AI"),
  block("home.nav.home", "home", "Nav: Home", "Home"),
  block("home.nav.about", "home", "Nav: About Us", "About Us"),
  block("home.nav.services", "home", "Nav: Services", "Services"),
  block("home.nav.blog", "home", "Nav: Blog", "Blog"),
  block("home.nav.knowledge", "home", "Nav: Knowledge", "Knowledge"),
  block("home.nav.careers", "home", "Nav: Careers", "Careers"),
  block("home.nav.contact", "home", "Nav: Contact", "Contact"),
  block("home.header.contactCta", "home", "Header contact button", "Contact"),

  // —— Home: Hero ——
  block("home.hero.eyebrow", "home", "Hero eyebrow", "Chartered Accountants · London"),
  block("home.hero.headingBrand", "home", "Hero heading (highlighted)", "Chartered Accountants"),
  block(
    "home.hero.headingRest",
    "home",
    "Hero heading (rest)",
    "for Individuals and Business Owners.",
  ),
  block(
    "home.hero.intro",
    "home",
    "Hero intro paragraph",
    "Welcome to Alpha Digi AI Accountants — combining chartered expertise with AI-driven insight so you can make smarter financial decisions every day.",
    "richtext",
  ),
  block("home.hero.ctaPrimary", "home", "Hero primary button", "See Our Services"),
  block("home.hero.ctaSecondary", "home", "Hero secondary button", "Contact Us"),
  block("home.hero.imageDesktop", "home", "Hero image (desktop)", accountant),
  block("home.hero.imageMobile", "home", "Hero image (mobile)", accountantMobile),
  block(
    "home.hero.imageAlt",
    "home",
    "Hero image alt text",
    "Smiling chartered accountant in a navy suit pointing upwards",
  ),

  // —— Home: About ——
  block("home.about.eyebrow", "home", "About section eyebrow", "We are Alpha Digi AI"),
  block(
    "home.about.headingPrefix",
    "home",
    "About heading prefix",
    "A new firm led by a Big 4 experienced ",
  ),
  block("home.about.headingBrand", "home", "About heading (highlighted)", "ICAEW member"),
  block("home.about.headingSuffix", "home", "About heading suffix", "."),
  block(
    "home.about.p1",
    "home",
    "About intro paragraph",
    "Looking for a reliable, forward-thinking accountant? With 12 years of experience handling listed, non-listed and charity clients, we proudly support new businesses, charity trusts and individuals through ongoing change. Whether you're launching a new venture or managing an established company, our team guides you every step of the way.",
    "richtext",
  ),
  block(
    "home.about.p2",
    "home",
    "About second paragraph",
    "It's not just about numbers — it's about knowing your business inside out and helping it grow.",
    "richtext",
  ),
  block("home.about.ctaPrimary", "home", "About primary button", "More about us"),
  block("home.about.ctaSecondary", "home", "About secondary button", "Make an appointment"),
  block("home.about.imageUrl", "home", "About section image", bridge),
  block(
    "home.about.imageAlt",
    "home",
    "About section image alt",
    "Tower Bridge over the River Thames at dusk",
  ),
  block("home.about.yearsValue", "home", "About years badge number", "12"),
  block("home.about.yearsLabel", "home", "About years badge label", "Years of expertise"),

  // —— Home: Services ——
  block("home.services.eyebrow", "home", "Services section eyebrow", "Our Services"),
  block("home.services.headingPrefix", "home", "Services heading prefix", "Everything you need to run "),
  block("home.services.headingBrand", "home", "Services heading (highlighted)", "smarter finances"),
  block("home.services.headingSuffix", "home", "Services heading suffix", "."),
  block(
    "home.services.intro",
    "home",
    "Services intro paragraph",
    "From annual accounts and tax planning to payroll bureau, auto-enrolment, VAT, cloud bookkeeping and specialist work such as R&D tax — we cover every stage of your financial year.",
    "richtext",
  ),
  block("home.services.cta", "home", "Services view-all button", "View all services"),

  // —— Home: Why choose ——
  block("home.why.eyebrow", "home", "Why-choose eyebrow", "What Makes Us Different?"),
  block("home.why.headingPrefix", "home", "Why-choose heading prefix", "Expertise you can trust, "),
  block("home.why.headingBrand", "home", "Why-choose heading (highlighted)", "technology"),
  block("home.why.headingSuffix", "home", "Why-choose heading suffix", " you'll love."),
  block(
    "home.why.intro",
    "home",
    "Why-choose intro paragraph",
    "We take pride in building strong relationships with every client — understanding your business and goals so we can offer tailored, proactive advice.",
    "richtext",
  ),
  block("home.why.feature1.title", "home", "Why-choose feature 1 title", "Bringing The Numbers To Life"),
  block(
    "home.why.feature1.body",
    "home",
    "Why-choose feature 1 body",
    "Every annual account tells a story of your business. We explain your business journey and help you plan the next steps to achieve your goals.",
    "richtext",
  ),
  block("home.why.feature2.title", "home", "Why-choose feature 2 title", "Expertise"),
  block(
    "home.why.feature2.body",
    "home",
    "Why-choose feature 2 body",
    "Decades of experience, knowledge and expertise across the UK — a well-established, trusted chartered accountancy firm you can rely on.",
    "richtext",
  ),
  block("home.why.feature3.title", "home", "Why-choose feature 3 title", "Personable Service"),
  block(
    "home.why.feature3.body",
    "home",
    "Why-choose feature 3 body",
    "Friendly, dedicated advisors who take the time to know your business — nurturing client relationships is at the heart of how we work.",
    "richtext",
  ),
  block("home.why.cta", "home", "Why-choose primary button", "Speak to our team today"),
  block("home.why.callPrefix", "home", "Why-choose call-us prefix", "Call us now on"),

  // —— Home: Testimonials ——
  block("home.testimonials.eyebrow", "home", "Testimonials section eyebrow", "Testimonials"),
  block("home.testimonials.headingPrefix", "home", "Testimonials heading prefix", "What our "),
  block("home.testimonials.headingBrand", "home", "Testimonials heading (highlighted)", "clients say"),
  block("home.testimonials.headingSuffix", "home", "Testimonials heading suffix", "."),
  block(
    "home.testimonials.icaewNote",
    "home",
    "Testimonials ICAEW note",
    "We are ICAEW members — giving us access to world-leading resources, technical guidance and advisory services.",
    "richtext",
  ),
  block("home.testimonials.cta", "home", "Testimonials CTA button", "Get a free consultation"),

  // —— Home: Contact CTA + footer ——
  block("home.cta.heading", "home", "Contact CTA heading", "Any questions? Speak to our team today."),
  block("home.cta.contactButton", "home", "Contact CTA button", "Contact Us"),
  block(
    "home.footer.headingPrefix",
    "home",
    "Footer heading prefix",
    "Looking to help your business ",
  ),
  block("home.footer.headingBrand", "home", "Footer heading (highlighted)", "grow"),
  block("home.footer.headingSuffix", "home", "Footer heading suffix", "?"),
  block(
    "home.footer.intro",
    "home",
    "Footer intro paragraph",
    "Get a free consultation today. Call {phone} or email {email} — {hours}.",
    "richtext",
  ),
  block("home.footer.cta", "home", "Footer CTA button", "Contact Us"),

  // —— About page ——
  block("about.eyebrow", "about", "About page eyebrow", "About Us"),
  block("about.headingPrefix", "about", "About page heading prefix", "Modern accountancy, "),
  block("about.headingBrand", "about", "About page heading (highlighted)", "human at heart."),
  block("about.tagline", "about", "About page tagline", "Chartered accountants for over 12 years."),
  block(
    "about.p1",
    "about",
    "About intro paragraph 1",
    "As experienced chartered accountants, we've been proudly supporting businesses for over 12 years. Whether you're launching a new venture or managing an established company, our expert team is here to guide you every step of the way.",
    "richtext",
  ),
  block(
    "about.p2",
    "about",
    "About intro paragraph 2",
    "We take pride in building strong relationships with every client. By truly understanding your business and goals, we offer tailored support and proactive advice that helps you succeed. It's not just about numbers — it's about knowing your business inside out and helping it grow.",
    "richtext",
  ),
  block(
    "about.p3",
    "about",
    "About intro paragraph 3",
    "New firm with 12 years of Big 4 experience; ICAEW members with experience handling listed, non-listed and charity clients.",
    "richtext",
  ),
  block("about.badge.1", "about", "About badge 1", "ICAEW registered Firm"),
  block("about.badge.2", "about", "About badge 2", "HMRC registered agent"),
  block("about.badge.3", "about", "About badge 3", "AI driven solution"),
  block("about.badge.4", "about", "About badge 4", "Payroll and HMRC support"),
  block("about.badge.5", "about", "About badge 5", "Service with Care"),
  block("about.badge.6", "about", "About badge 6", "VAT and HMRC support"),
  block("about.numbers.heading", "about", "Numbers section heading", "Bringing The Numbers To Life"),
  block(
    "about.numbers.body",
    "about",
    "Numbers section paragraph",
    "From accountancy to start-up, our dedicated team helps you navigate financial and business processes with ease. Every annual account tells a story of your business, and we take pleasure in explaining that journey.",
    "richtext",
  ),
  block("about.numbers.expertise.title", "about", "Expertise block title", "Expertise"),
  block(
    "about.numbers.expertise.body",
    "about",
    "Expertise block paragraph",
    "The team's vast wealth of experience, knowledge and expertise has helped many businesses. Our clients span the country — from West Yorkshire, across the North of England, up to Scotland and down to London.",
    "richtext",
  ),
  block("about.numbers.personable.title", "about", "Personable block title", "Personable Service"),
  block(
    "about.numbers.personable.body",
    "about",
    "Personable block paragraph",
    "Our friendly team is on hand to guide you through a range of accounting services. Nurturing client relationships and getting to know you is an integral part of how we work.",
    "richtext",
  ),
  block("about.different.eyebrow", "about", "Differences section eyebrow", "What Makes Us Different?"),
  block(
    "about.different.heading",
    "about",
    "Differences section heading",
    "Expertise you can trust, technology you'll love.",
  ),
  block("about.different.1.title", "about", "Difference 1 title", "Bringing The Numbers To Life"),
  block(
    "about.different.1.body",
    "about",
    "Difference 1 body",
    "Every annual account tells a story of your business. We explain your business journey and help you plan the next steps to achieve your goals.",
    "richtext",
  ),
  block("about.different.2.title", "about", "Difference 2 title", "Expertise"),
  block(
    "about.different.2.body",
    "about",
    "Difference 2 body",
    "Decades of experience, knowledge and expertise across the UK — a well-established, trusted chartered accountancy firm you can rely on.",
    "richtext",
  ),
  block("about.different.3.title", "about", "Difference 3 title", "Personable Service"),
  block(
    "about.different.3.body",
    "about",
    "Difference 3 body",
    "Friendly, dedicated advisors who take the time to know your business — nurturing client relationships is at the heart of how we work.",
    "richtext",
  ),
  block("about.testimonials.eyebrow", "about", "About testimonials eyebrow", "Testimonials"),
  block("about.testimonials.heading", "about", "About testimonials heading", "What our clients say."),
  block(
    "about.testimonials.icaewNote",
    "about",
    "About testimonials ICAEW note",
    "We are ICAEW members, which means we have access to world-leading information resources, technical guidance, advisory services and local member networks.",
    "richtext",
  ),

  // —— Services page ——
  block("services.eyebrow", "services", "Services page eyebrow", "Our Services"),
  block("services.headingPrefix", "services", "Services page heading line 1", "Digital-First Cloud"),
  block(
    "services.headingBrand",
    "services",
    "Services page heading (highlighted)",
    "Accounting & Bookkeeping",
  ),
  block(
    "services.intro",
    "services",
    "Services page intro paragraph",
    "We help businesses, charities and individuals simplify accounting through cloud-based bookkeeping, taxation, payroll, governance and advisory services.",
    "richtext",
  ),
  block("services.ctaPrimary", "services", "Services page primary button", "Get in Touch"),
  block("services.ctaSecondary", "services", "Services page secondary button", "Explore 10 Core Services"),
  block(
    "services.list.heading",
    "services",
    "Services list heading",
    "Everything your finances need, in one place",
  ),
  block(
    "services.list.intro",
    "services",
    "Services list intro",
    "Cloud accounting and bookkeeping services designed for businesses, charities, trusts and individuals.",
    "richtext",
  ),
  block("services.list.cta", "services", "Services list button", "View all services"),
  block(
    "services.highlight.1",
    "services",
    "Services highlight 1",
    "Listed and Non-Listed Company: Setup, Accounting & Governance",
  ),
  block("services.highlight.2", "services", "Services highlight 2", "Payroll & Payments"),
  block(
    "services.highlight.3",
    "services",
    "Services highlight 3",
    "Tax Return for Company and Individual",
  ),
  block("services.highlight.4", "services", "Services highlight 4", "VAT Return Filing"),
  block(
    "services.highlight.5",
    "services",
    "Services highlight 5",
    "Corporate Secretarial and Governance",
  ),
  block("services.highlight.6", "services", "Services highlight 6", "Non-Statutory Audit"),
  block("services.highlight.7", "services", "Services highlight 7", "Management Accounts"),
  block(
    "services.highlight.8",
    "services",
    "Services highlight 8",
    "Independent Examination of Charity Accounts",
  ),
  block(
    "services.highlight.9",
    "services",
    "Services highlight 9",
    "Trust / Charity Account: Setup, Accounting and Governance",
  ),
  block(
    "services.highlight.10",
    "services",
    "Services highlight 10",
    "Outsourcing Accounts and Bookkeeping to India",
  ),
  block("services.core.eyebrow", "services", "Core services eyebrow", "Our Services"),
  block("services.core.headingPrefix", "services", "Core services heading prefix", "10 Core "),
  block("services.core.headingBrand", "services", "Core services heading (highlighted)", "Services"),
  block(
    "services.core.intro",
    "services",
    "Core services intro",
    "Cloud accounting and bookkeeping designed for businesses, charities, trusts and individuals.",
    "richtext",
  ),
  block("services.card.cta", "services", "Service card button", "Learn More"),
  block("services.partners.eyebrow", "services", "Partners eyebrow", "Integrations"),
  block(
    "services.partners.heading",
    "services",
    "Partners heading",
    "Accounting Technology Partners",
  ),
  block(
    "services.partners.intro",
    "services",
    "Partners intro",
    "We work with trusted cloud accounting and compliance platforms to deliver secure, efficient, and digital-first accounting services for businesses, charities, and individuals.",
    "richtext",
  ),

  // —— Blog page ——
  block("blog.eyebrow", "blog", "Blog page eyebrow", "Blog"),
  block("blog.headingPrefix", "blog", "Blog heading prefix", "Insights, guides and "),
  block("blog.headingBrand", "blog", "Blog heading (highlighted)", "updates"),
  block("blog.headingSuffix", "blog", "Blog heading suffix", "."),
  block(
    "blog.intro",
    "blog",
    "Blog intro paragraph",
    "Practical advice from our chartered accountants — on tax, growth, and the changing face of digital accountancy.",
    "richtext",
  ),
  block("blog.card.cta", "blog", "Blog card button", "Read more"),

  // —— Careers page ——
  block("careers.eyebrow", "careers", "Careers page eyebrow", "Join Our Team"),
  block("careers.headingPrefix", "careers", "Careers heading prefix", "Careers at "),
  block("careers.headingBrand", "careers", "Careers heading (highlighted)", "Alpha Digi"),
  block(
    "careers.intro",
    "careers",
    "Careers intro paragraph",
    "Work at the intersection of chartered accountancy and AI. Help us shape the future of financial services for businesses across the UK.",
    "richtext",
  ),
  block("careers.culture.eyebrow", "careers", "Culture section eyebrow", "Our Culture"),
  block("careers.culture.heading", "careers", "Culture section heading", "Life at Alpha Digi AI Accountants"),
  block(
    "careers.culture.intro",
    "careers",
    "Culture intro paragraph",
    "We believe in a culture of continuous learning, technology empowerment, and deep client support. At Alpha Digi, you won't just grind through spreadsheets — you will work with intelligent workflows that automate repetitive tasks, allowing you to focus on strategic client advisory and financial analysis.",
    "richtext",
  ),
  block("careers.culture.1.title", "careers", "Culture card 1 title", "Flexible Working"),
  block(
    "careers.culture.1.body",
    "careers",
    "Culture card 1 body",
    "Hybrid and remote-first setup that supports a healthy work-life balance.",
    "richtext",
  ),
  block("careers.culture.2.title", "careers", "Culture card 2 title", "Modern Tools"),
  block(
    "careers.culture.2.body",
    "careers",
    "Culture card 2 body",
    "Work with advanced cloud platforms, automated workflows, and AI assistants.",
    "richtext",
  ),
  block("careers.culture.3.title", "careers", "Culture card 3 title", "Growth Path"),
  block(
    "careers.culture.3.body",
    "careers",
    "Culture card 3 body",
    "Defined professional growth plans, funded training, and ICAEW pathways.",
    "richtext",
  ),
  block("careers.culture.4.title", "careers", "Culture card 4 title", "Inclusive Value"),
  block(
    "careers.culture.4.body",
    "careers",
    "Culture card 4 body",
    "A warm, diverse team environment where every voice is heard and valued.",
    "richtext",
  ),
  block("careers.values.heading", "careers", "Values heading", "Our Values"),
  block(
    "careers.values.intro",
    "careers",
    "Values intro paragraph",
    "We are building an accounting firm where people thrive. By combining chartered rigour with digital speed, we ensure accuracy, clarity, and success.",
    "richtext",
  ),
  block("careers.values.1", "careers", "Value 1", "Trust & Confidentiality at the core."),
  block("careers.values.2", "careers", "Value 2", "AI-assisted efficiency, human-centric advisory."),
  block("careers.values.3", "careers", "Value 3", "Commitment to continuous training and compliance."),
  block("careers.values.4", "careers", "Value 4", "Responsive, direct client communication."),
  block("careers.digital.heading", "careers", "Digital WE heading", "Digital “WE” Philosophy"),
  block(
    "careers.digital.body",
    "careers",
    "Digital WE paragraph",
    "At Alpha Digi AI Accountants, we define Digital “WE” as the harmonious integration of human capability and digital intelligence. We do not use technology to replace human insight; instead, we use AI to enhance your output, streamline decision-making, and reduce repetitive administrative tasks. This allows our professionals to spend more time building meaningful client relationships and offering top-tier chartered advice.",
    "richtext",
  ),
  block("careers.pathways.eyebrow", "careers", "Career pathways eyebrow", "Career Pathways"),
  block("careers.pathways.heading", "careers", "Career pathways heading", "Find Your Place in Our Firm"),
  block("careers.role.idealLabel", "careers", "Role “ideal for” label", "Ideal for:"),
  block("careers.role.cta", "careers", "Role apply button", "Apply"),

  // —— Contact page ——
  block("contact.eyebrow", "contact", "Contact page eyebrow", "Contact"),
  block("contact.headingPrefix", "contact", "Contact heading prefix", "Speak to our "),
  block("contact.headingBrand", "contact", "Contact heading (highlighted)", "team today."),
  block(
    "contact.intro",
    "contact",
    "Contact intro paragraph",
    "Tell us a little about your business and we'll get back to you with tailored, practical advice.",
    "richtext",
  ),
  block("contact.detail.phoneLabel", "contact", "Contact phone label", "Phone"),
  block("contact.detail.emailLabel", "contact", "Contact email label", "Email"),
  block("contact.detail.officeLabel", "contact", "Contact office label", "Office"),
  block("contact.detail.hoursLabel", "contact", "Contact hours label", "Hours"),
  block("contact.form.heading", "contact", "Contact form heading", "Send us a message"),
  block("contact.form.nameLabel", "contact", "Contact form name label", "Name"),
  block("contact.form.emailLabel", "contact", "Contact form email label", "Email"),
  block("contact.form.phoneLabel", "contact", "Contact form phone label", "Phone"),
  block("contact.form.messageLabel", "contact", "Contact form message label", "How can we help?"),
  block("contact.form.submit", "contact", "Contact form submit button", "Send message"),
  block(
    "contact.form.thanks",
    "contact",
    "Contact form thanks message",
    "Thanks — we've received your details and will be in touch shortly.",
  ),

  // —— Knowledge page ——
  block("knowledge.eyebrow", "knowledge", "Knowledge page eyebrow", "Knowledge"),
  block("knowledge.headingPrefix", "knowledge", "Knowledge heading prefix", "Guides, checklists and "),
  block("knowledge.headingBrand", "knowledge", "Knowledge heading (highlighted)", "resources"),
  block("knowledge.headingSuffix", "knowledge", "Knowledge heading suffix", "."),
  block(
    "knowledge.intro",
    "knowledge",
    "Knowledge intro paragraph",
    "Firm-authored guides, checklists, templates and deadline calendars to help you stay organised through the tax year.",
    "richtext",
  ),
  block("knowledge.card.cta", "knowledge", "Knowledge download button", "Download PDF"),
];

export function getContentByPage(page: string): ContentBlock[] {
  return blocks.filter((item) => item.page === page);
}

export function getAllContentBlocks(): ContentBlock[] {
  return blocks.slice();
}

export function getContentValue(key: string): string {
  return blocks.find((item) => item.key === key)?.value ?? "";
}

export function updateContent(key: string, value: string): void {
  blocks = blocks.map((item) => (item.key === key ? { ...item, value } : item));
  emitCmsChange();
}
