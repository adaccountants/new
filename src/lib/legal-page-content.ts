import type { ContentBlock, ContentPage, SeoMeta } from "@/lib/page-content-data";

export const LEGAL_PAGES = ["privacy-policy", "terms", "cookie-policy"] as const;
export type LegalPage = (typeof LEGAL_PAGES)[number];

export const PRIVACY_POLICY_BODY = `# Privacy Policy
Last updated: 18 August 2026

{firmName} ("we", "us", "our") is committed to protecting your privacy. This policy explains what personal information we collect through this website, how we use it, and your rights.

## Who we are
{firmName} is a Chartered Accountancy firm regulated by the Institute of Chartered Accountants in England and Wales (ICAEW).
Registered office: {address}
Contact: {email} | {phone}

## What information we collect
The personal information we collect through this website is what you provide when you submit our contact form: your name, email address, phone number (if provided), and your message. When you submit the contact form, we also briefly log your IP address, solely to prevent spam and abuse of the form. This IP address is not linked to your identity, is not used for tracking or marketing, and is automatically deleted after a short period. We do not use analytics, tracking, or advertising cookies on this website.

## How we use your information
We use the information you submit through the contact form solely to respond to your enquiry and communicate with you about the services you've asked about. We do not use your information for marketing without your separate, explicit consent, and we do not sell or share your information with third parties for their own marketing purposes.

## Who we share it with
When you submit the contact form, your information is sent to Resend (email delivery service), to deliver your enquiry to our team by email, and Supabase (database hosting), to securely store a copy of your enquiry. Both providers act as data processors on our behalf and are contractually required to protect your information.

## How long we keep your information
We retain contact form submissions until you ask us to delete them, or until they are no longer needed for the purpose they were collected for. To request deletion of your information, email {email} and we will remove it within 30 days.

## Your rights
Under UK data protection law, you have the right to ask what personal information we hold about you, ask us to correct inaccurate information, ask us to delete your information, ask us to restrict how we use your information, and object to how we use your information. To exercise any of these rights, email {email} and we will respond within 30 days. You also have the right to complain to the Information Commissioner's Office (ICO) at ico.org.uk if you believe we have not handled your information properly.

## Cookies
This website uses only strictly necessary cookies required for the website and admin system to function. See our Cookie Policy for full details.

## Changes to this policy
We may update this policy from time to time. Any changes will be posted on this page with an updated "Last updated" date.

## Contact us
If you have any questions about this policy or how we handle your information, contact us at {email} or {phone}.`;

export const TERMS_BODY = `# Terms of Website Use
Last updated: 17 August 2026

These terms govern your use of this website, operated by {firmName} ("we", "us", "our"). By using this website, you agree to these terms.

## About this website
This website provides general information about {firmName} and our accounting services. It is intended for general informational purposes only.

## No professional advice
Nothing on this website constitutes professional accounting, tax, or financial advice. Content on this site, including our Knowledge resources, guides, and blog posts, is provided for general information only and should not be relied upon as a substitute for personalised professional advice specific to your circumstances. Please contact us directly to discuss your specific situation.

## Intellectual property
All content on this website — including text, graphics, logos, and images — is owned by {firmName} or used with permission, and is protected by copyright. You may view and download content for personal, non-commercial use only. You may not reproduce, distribute, or use our content for commercial purposes without our written permission.

## Third-party marks
The ICAEW logo is used on this site in accordance with ICAEW's member firm usage guidelines. Other trademarks and logos displayed on this site (including technology partner logos) belong to their respective owners.

## Accuracy of information
We make reasonable efforts to keep the information on this website accurate and up to date, but we make no guarantees or warranties about its completeness or accuracy. Tax and accounting regulations change regularly — always confirm current requirements with us directly before acting on information found on this site.

## Limitation of liability
We are not liable for any loss or damage arising from your use of this website or reliance on its content, to the fullest extent permitted by law. This does not affect our liability for matters which cannot be excluded under applicable law, including death or personal injury caused by negligence.

## Links to other websites
This website may contain links to third-party websites. We are not responsible for the content or privacy practices of those sites.

## Changes to these terms
We may update these terms from time to time. Continued use of the website after changes are posted constitutes acceptance of the updated terms.

## Governing law
These terms are governed by the laws of England and Wales.

## Contact us
Questions about these terms can be sent to {email}.`;

export const COOKIE_POLICY_BODY = `# Cookie Policy
Last updated: 17 August 2026

This page explains how {firmName} uses cookies on this website.

## What are cookies
Cookies are small text files stored on your device when you visit a website. They help websites function properly and remember information about your visit.

## Cookies we use
We keep our use of cookies to a minimum. This website does not use any advertising, marketing, or analytics cookies, and we do not track your browsing activity. The only cookie-related storage used on this site is: Staff login session — when a member of our team logs into the website's content management system, a session token is stored in their browser to keep them logged in. This is strictly necessary for our staff to manage website content and is not set for, or accessible to, website visitors. We do not set any cookies when you browse the public pages of this website or submit our contact form.

## Changes to our cookie use
If we introduce analytics or other tracking in future, this policy will be updated first, and where required by law, we will ask for your consent before any such cookies are set.

## Contact us
Questions about our use of cookies can be sent to {email}.`;

export const LEGAL_SEO_FALLBACK: Record<LegalPage, SeoMeta> = {
  "privacy-policy": {
    title: "Privacy Policy | Alpha Digi AI Accountants",
    description:
      "How {firmName} collects, uses and stores personal information submitted through this website, including your rights under UK data protection law.",
    ogTitle: "Privacy Policy | Alpha Digi AI Accountants",
    ogDescription:
      "How we collect, use and store personal information submitted through this website.",
  },
  terms: {
    title: "Terms of Website Use | Alpha Digi AI Accountants",
    description:
      "Terms governing use of the {firmName} website, including that site content is general information and not professional advice.",
    ogTitle: "Terms of Website Use | Alpha Digi AI Accountants",
    ogDescription: "Terms governing use of this website, operated by {firmName}.",
  },
  "cookie-policy": {
    title: "Cookie Policy | Alpha Digi AI Accountants",
    description:
      "How {firmName} uses cookies on this website. We use only strictly necessary cookies and do not use analytics or advertising cookies.",
    ogTitle: "Cookie Policy | Alpha Digi AI Accountants",
    ogDescription: "This website uses only strictly necessary cookies. We do not use analytics or advertising cookies.",
  },
};

const LEGAL_BODY: Record<LegalPage, string> = {
  "privacy-policy": PRIVACY_POLICY_BODY,
  terms: TERMS_BODY,
  "cookie-policy": COOKIE_POLICY_BODY,
};

const LEGAL_LABELS: Record<LegalPage, { seo: string; body: string }> = {
  "privacy-policy": { seo: "Privacy", body: "Privacy policy body" },
  terms: { seo: "Terms", body: "Terms of website use body" },
  "cookie-policy": { seo: "Cookie policy", body: "Cookie policy body" },
};

export function legalFallbackBody(page: LegalPage): string {
  return LEGAL_BODY[page];
}

/** CMS blocks for the three legal pages — seeded into page_content and used as fallbacks. */
export const LEGAL_CONTENT_BLOCKS: ContentBlock[] = LEGAL_PAGES.flatMap((page) => {
  const seo = LEGAL_SEO_FALLBACK[page];
  const labels = LEGAL_LABELS[page];
  return [
    {
      key: `${page}.seo.title`,
      page: page as ContentPage,
      label: `${labels.seo} SEO title`,
      value: seo.title,
      type: "text" as const,
    },
    {
      key: `${page}.seo.description`,
      page: page as ContentPage,
      label: `${labels.seo} SEO description`,
      value: seo.description,
      type: "richtext" as const,
    },
    {
      key: `${page}.seo.ogTitle`,
      page: page as ContentPage,
      label: `${labels.seo} Open Graph title`,
      value: seo.ogTitle,
      type: "text" as const,
    },
    {
      key: `${page}.seo.ogDescription`,
      page: page as ContentPage,
      label: `${labels.seo} Open Graph description`,
      value: seo.ogDescription,
      type: "richtext" as const,
    },
    {
      key: `${page}.body`,
      page: page as ContentPage,
      label: labels.body,
      value: LEGAL_BODY[page],
      type: "richtext" as const,
    },
  ];
});
