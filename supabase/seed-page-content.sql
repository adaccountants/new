-- Full marketing copy for page_content. Safe to re-run (upserts by key).
insert into public.page_content (key, page, label, value, type) values
  (E'home.header.brandPrefix', E'home', E'Header logo prefix', E'Alpha', E'text'),
  (E'home.header.brandAccent', E'home', E'Header logo accent', E'Digi', E'text'),
  (E'home.header.brandSuffix', E'home', E'Header logo suffix', E'AI', E'text'),
  (E'home.header.logoUrl', E'home', E'Header logo image', E'/cms/adai-logo.jpeg', E'text'),
  (E'home.header.logoAlt', E'home', E'Header logo alt text', E'ADAi Chartered Accountants', E'text'),
  (E'home.nav.home', E'home', E'Nav: Home', E'Home', E'text'),
  (E'home.nav.about', E'home', E'Nav: About Us', E'About Us', E'text'),
  (E'home.nav.services', E'home', E'Nav: Services', E'Services', E'text'),
  (E'home.nav.blog', E'home', E'Nav: Blog', E'Blog', E'text'),
  (E'home.nav.knowledge', E'home', E'Nav: Knowledge', E'Knowledge', E'text'),
  (E'home.nav.careers', E'home', E'Nav: Careers', E'Careers', E'text'),
  (E'home.nav.contact', E'home', E'Nav: Contact', E'Contact', E'text'),
  (E'home.header.contactCta', E'home', E'Header contact button', E'Contact', E'text'),
  (E'home.hero.eyebrow', E'home', E'Hero eyebrow', E'Alpha Digi AI Accountants LTD, CHARTERED ACCOUNTANTS, London', E'text'),
  (E'home.hero.headingBrand', E'home', E'Hero heading (highlighted)', E'Chartered Accountants', E'text'),
  (E'home.hero.headingRest', E'home', E'Hero heading (rest)', E'for Companies, Charities and Sole Businesses.', E'text'),
  (E'home.hero.intro', E'home', E'Hero intro paragraph', E'Welcome to Alpha Digi AI Accountants — combining chartered expertise with AI-driven insight so you can make smarter financial decisions every day.', E'richtext'),
  (E'home.hero.ctaPrimary', E'home', E'Hero primary button', E'See Our Services', E'text'),
  (E'home.hero.ctaSecondary', E'home', E'Hero secondary button', E'Contact Us', E'text'),
  (E'home.hero.videoUrl', E'home', E'Hero video URL', E'/hero-video.mp4', E'text'),
  (E'home.hero.imageDesktop', E'home', E'Hero image (desktop)', E'/cms/accountant.webp', E'text'),
  (E'home.hero.imageMobile', E'home', E'Hero image (mobile)', E'/cms/accountant-mobile.webp', E'text'),
  (E'home.hero.imageAlt', E'home', E'Hero image alt text', E'Smiling chartered accountant in a navy suit pointing upwards', E'text'),
  (E'home.about.eyebrow', E'home', E'About section eyebrow', E'We are Alpha Digi AI', E'text'),
  (E'home.about.headingPrefix', E'home', E'About heading prefix', E'A new firm led by a Big 4 experienced ', E'text'),
  (E'home.about.headingBrand', E'home', E'About heading (highlighted)', E'ICAEW member', E'text'),
  (E'home.about.headingSuffix', E'home', E'About heading suffix', E'.', E'text'),
  (E'home.about.p1', E'home', E'About intro paragraph', E'Looking for a reliable, forward-thinking accountant? With 12 years of experience handling listed, non-listed and charity clients, we proudly support new businesses, charity trusts and individuals through ongoing change. Whether you''re launching a new venture or managing an established company, our team guides you every step of the way.', E'richtext'),
  (E'home.about.p2', E'home', E'About second paragraph', E'It''s not just about numbers — it''s about knowing your business inside out and helping it grow.', E'richtext'),
  (E'home.about.ctaPrimary', E'home', E'About primary button', E'More about us', E'text'),
  (E'home.about.ctaSecondary', E'home', E'About secondary button', E'Make an appointment', E'text'),
  (E'home.about.imageUrl', E'home', E'About section image', E'/cms/acc-bridge.jpg', E'text'),
  (E'home.about.imageAlt', E'home', E'About section image alt', E'Tower Bridge over the River Thames at dusk', E'text'),
  (E'home.about.yearsValue', E'home', E'About years badge number', E'12', E'text'),
  (E'home.about.yearsLabel', E'home', E'About years badge label', E'Years of expertise', E'text'),
  (E'home.services.eyebrow', E'home', E'Services section eyebrow', E'Our Services', E'text'),
  (E'home.services.headingPrefix', E'home', E'Services heading prefix', E'Everything you need to run ', E'text'),
  (E'home.services.headingBrand', E'home', E'Services heading (highlighted)', E'smarter finances', E'text'),
  (E'home.services.headingSuffix', E'home', E'Services heading suffix', E'.', E'text'),
  (E'home.services.intro', E'home', E'Services intro paragraph', E'From annual accounts and tax planning to payroll bureau, auto-enrolment, VAT, cloud bookkeeping and specialist work such as R&D tax — we cover every stage of your financial year.', E'richtext'),
  (E'home.services.cta', E'home', E'Services view-all button', E'View all services', E'text'),
  (E'home.why.eyebrow', E'home', E'Why-choose eyebrow', E'What Makes Us Different?', E'text'),
  (E'home.why.headingPrefix', E'home', E'Why-choose heading prefix', E'Expertise you can trust, ', E'text'),
  (E'home.why.headingBrand', E'home', E'Why-choose heading (highlighted)', E'technology', E'text'),
  (E'home.why.headingSuffix', E'home', E'Why-choose heading suffix', E' you''ll love.', E'text'),
  (E'home.why.intro', E'home', E'Why-choose intro paragraph', E'We take pride in building strong relationships with every client — understanding your business and goals so we can offer tailored, proactive advice.', E'richtext'),
  (E'home.why.feature1.title', E'home', E'Why-choose feature 1 title', E'Bringing The Numbers To Life', E'text'),
  (E'home.why.feature1.body', E'home', E'Why-choose feature 1 body', E'Every annual account tells a story of your business. We explain your business journey and help you plan the next steps to achieve your goals.', E'richtext'),
  (E'home.why.feature2.title', E'home', E'Why-choose feature 2 title', E'Expertise', E'text'),
  (E'home.why.feature2.body', E'home', E'Why-choose feature 2 body', E'Decades of experience, knowledge and expertise across the UK — a well-established, trusted chartered accountancy firm you can rely on.', E'richtext'),
  (E'home.why.feature3.title', E'home', E'Why-choose feature 3 title', E'Personable Service', E'text'),
  (E'home.why.feature3.body', E'home', E'Why-choose feature 3 body', E'Friendly, dedicated advisors who take the time to know your business — nurturing client relationships is at the heart of how we work.', E'richtext'),
  (E'home.why.cta', E'home', E'Why-choose primary button', E'Speak to our team today', E'text'),
  (E'home.why.callPrefix', E'home', E'Why-choose call-us prefix', E'Call us now on', E'text'),
  (E'home.testimonials.eyebrow', E'home', E'Testimonials section eyebrow', E'Testimonials', E'text'),
  (E'home.testimonials.headingPrefix', E'home', E'Testimonials heading prefix', E'What our ', E'text'),
  (E'home.testimonials.headingBrand', E'home', E'Testimonials heading (highlighted)', E'clients say', E'text'),
  (E'home.testimonials.headingSuffix', E'home', E'Testimonials heading suffix', E'.', E'text'),
  (E'home.testimonials.icaewNote', E'home', E'Testimonials ICAEW note', E'We are ICAEW members — giving us access to world-leading resources, technical guidance and advisory services.', E'richtext'),
  (E'home.testimonials.cta', E'home', E'Testimonials CTA button', E'Get a free consultation', E'text'),
  (E'home.cta.heading', E'home', E'Contact CTA heading', E'Any questions? Speak to our team today.', E'text'),
  (E'home.cta.contactButton', E'home', E'Contact CTA button', E'Contact Us', E'text'),
  (E'home.footer.headingPrefix', E'home', E'Footer heading prefix', E'Looking to help your business ', E'text'),
  (E'home.footer.headingBrand', E'home', E'Footer heading (highlighted)', E'grow', E'text'),
  (E'home.footer.headingSuffix', E'home', E'Footer heading suffix', E'?', E'text'),
  (E'home.footer.intro', E'home', E'Footer intro paragraph', E'Get a free consultation today. Call {phone} or email {email} — {hours}.', E'richtext'),
  (E'home.footer.cta', E'home', E'Footer CTA button', E'Contact Us', E'text'),
  (E'home.footer.icaewImageUrl', E'home', E'Footer ICAEW logo image', E'/cms/finalicaewlogo.jpeg', E'text'),
  (E'home.footer.icaewImageAlt', E'home', E'Footer ICAEW logo alt text', E'ICAEW Chartered Accountant', E'text'),
  (E'home.footer.icaewHref', E'home', E'Footer ICAEW logo link', E'https://www.icaew.com', E'text'),
  (E'home.footer.icaewNote', E'home', E'Footer ICAEW membership note', E'We are ICAEW members — giving us access to world-leading resources, technical guidance and advisory services.', E'richtext'),
  (E'home.seo.title', E'home', E'Home SEO title', E'Alpha Digi AI — Chartered Accountants in London', E'text'),
  (E'home.seo.description', E'home', E'Home SEO description', E'ICAEW chartered accountants for individuals and business owners: annual accounts, tax planning, business start up, payroll, VAT and cloud bookkeeping.', E'richtext'),
  (E'home.seo.ogTitle', E'home', E'Home Open Graph title', E'Alpha Digi AI — Chartered Accountants in London', E'text'),
  (E'home.seo.ogDescription', E'home', E'Home Open Graph description', E'ICAEW chartered accountants for individuals and business owners: annual accounts, tax planning, business start up, payroll, VAT and cloud bookkeeping.', E'richtext'),
  (E'home.seo.image', E'home', E'Default social share image', E'/favicon.jpeg', E'text'),
  (E'home.seo.imageAlt', E'home', E'Default social share image alt', E'ADAi Chartered Accountants logo', E'text'),
  (E'about.seo.title', E'about', E'About SEO title', E'About Us | Alpha Digi AI Accountants', E'text'),
  (E'about.seo.description', E'about', E'About SEO description', E'Chartered accountants for over 12 years — ICAEW registered, HMRC agent, AI-driven solutions and personable service for listed, non-listed and charity clients.', E'richtext'),
  (E'about.seo.ogTitle', E'about', E'About Open Graph title', E'About Alpha Digi AI Accountants', E'text'),
  (E'about.seo.ogDescription', E'about', E'About Open Graph description', E'Modern accountancy, human at heart. Big 4 experienced ICAEW members supporting UK businesses, charities and trusts.', E'richtext'),
  (E'about.eyebrow', E'about', E'About page eyebrow', E'About Us', E'text'),
  (E'about.headingPrefix', E'about', E'About page heading prefix', E'Modern accountancy, ', E'text'),
  (E'about.headingBrand', E'about', E'About page heading (highlighted)', E'human at heart.', E'text'),
  (E'about.tagline', E'about', E'About page tagline', E'Chartered accountants for over 12 years.', E'text'),
  (E'about.p1', E'about', E'About intro paragraph 1', E'As experienced chartered accountants, we''ve been proudly supporting businesses for over 12 years. Whether you''re launching a new venture or managing an established company, our expert team is here to guide you every step of the way.', E'richtext'),
  (E'about.p2', E'about', E'About intro paragraph 2', E'We take pride in building strong relationships with every client. By truly understanding your business and goals, we offer tailored support and proactive advice that helps you succeed. It''s not just about numbers — it''s about knowing your business inside out and helping it grow.', E'richtext'),
  (E'about.p3', E'about', E'About intro paragraph 3', E'New firm with 12 years of Big 4 experience; ICAEW members with experience handling listed, non-listed and charity clients.', E'richtext'),
  (E'about.badge.1', E'about', E'About badge 1', E'ICAEW registered Firm', E'text'),
  (E'about.badge.2', E'about', E'About badge 2', E'HMRC registered agent', E'text'),
  (E'about.badge.3', E'about', E'About badge 3', E'AI driven solution', E'text'),
  (E'about.badge.4', E'about', E'About badge 4', E'Payroll and HMRC support', E'text'),
  (E'about.badge.5', E'about', E'About badge 5', E'Service with Care', E'text'),
  (E'about.badge.6', E'about', E'About badge 6', E'VAT and HMRC support', E'text'),
  (E'about.numbers.heading', E'about', E'Numbers section heading', E'Bringing The Numbers To Life', E'text'),
  (E'about.numbers.body', E'about', E'Numbers section paragraph', E'From accountancy to start-up, our dedicated team helps you navigate financial and business processes with ease. Every annual account tells a story of your business, and we take pleasure in explaining that journey.', E'richtext'),
  (E'about.numbers.expertise.title', E'about', E'Expertise block title', E'Expertise', E'text'),
  (E'about.numbers.expertise.body', E'about', E'Expertise block paragraph', E'The team''s vast wealth of experience, knowledge and expertise has helped many businesses. Our clients span the country — from West Yorkshire, across the North of England, up to Scotland and down to London.', E'richtext'),
  (E'about.numbers.personable.title', E'about', E'Personable block title', E'Personable Service', E'text'),
  (E'about.numbers.personable.body', E'about', E'Personable block paragraph', E'Our friendly team is on hand to guide you through a range of accounting services. Nurturing client relationships and getting to know you is an integral part of how we work.', E'richtext'),
  (E'about.different.eyebrow', E'about', E'Differences section eyebrow', E'What Makes Us Different?', E'text'),
  (E'about.different.heading', E'about', E'Differences section heading', E'Expertise you can trust, technology you''ll love.', E'text'),
  (E'about.different.1.title', E'about', E'Difference 1 title', E'Bringing The Numbers To Life', E'text'),
  (E'about.different.1.body', E'about', E'Difference 1 body', E'Every annual account tells a story of your business. We explain your business journey and help you plan the next steps to achieve your goals.', E'richtext'),
  (E'about.different.2.title', E'about', E'Difference 2 title', E'Expertise', E'text'),
  (E'about.different.2.body', E'about', E'Difference 2 body', E'Decades of experience, knowledge and expertise across the UK — a well-established, trusted chartered accountancy firm you can rely on.', E'richtext'),
  (E'about.different.3.title', E'about', E'Difference 3 title', E'Personable Service', E'text'),
  (E'about.different.3.body', E'about', E'Difference 3 body', E'Friendly, dedicated advisors who take the time to know your business — nurturing client relationships is at the heart of how we work.', E'richtext'),
  (E'about.testimonials.eyebrow', E'about', E'About testimonials eyebrow', E'Testimonials', E'text'),
  (E'about.testimonials.heading', E'about', E'About testimonials heading', E'What our clients say.', E'text'),
  (E'about.testimonials.icaewNote', E'about', E'About testimonials ICAEW note', E'We are ICAEW members, which means we have access to world-leading information resources, technical guidance, advisory services and local member networks.', E'richtext'),
  (E'services.seo.title', E'services', E'Services SEO title', E'Accounting & Compliance Services | Alpha Digi', E'text'),
  (E'services.seo.description', E'services', E'Services SEO description', E'Company formation, payroll, tax and VAT returns, audit, management accounts, charity and trust accounting, plus outsourced bookkeeping to India.', E'richtext'),
  (E'services.seo.ogTitle', E'services', E'Services Open Graph title', E'Accounting & Compliance Services', E'text'),
  (E'services.seo.ogDescription', E'services', E'Services Open Graph description', E'Ten core cloud accounting services for businesses, charities, trusts and individuals.', E'richtext'),
  (E'services.eyebrow', E'services', E'Services page eyebrow', E'Our Services', E'text'),
  (E'services.headingPrefix', E'services', E'Services page heading line 1', E'Digital-First Cloud', E'text'),
  (E'services.headingBrand', E'services', E'Services page heading (highlighted)', E'Accounting & Bookkeeping', E'text'),
  (E'services.intro', E'services', E'Services page intro paragraph', E'We help businesses, charities and individuals simplify accounting through cloud-based bookkeeping, taxation, payroll, governance and advisory services.', E'richtext'),
  (E'services.ctaPrimary', E'services', E'Services page primary button', E'Get in Touch', E'text'),
  (E'services.ctaSecondary', E'services', E'Services page secondary button', E'Explore 10 Core Services', E'text'),
  (E'services.list.heading', E'services', E'Services list heading', E'Everything your finances need, in one place', E'text'),
  (E'services.list.intro', E'services', E'Services list intro', E'Cloud accounting and bookkeeping services designed for businesses, charities, trusts and individuals.', E'richtext'),
  (E'services.list.cta', E'services', E'Services list button', E'View all services', E'text'),
  (E'services.highlight.1', E'services', E'Services highlight 1', E'Listed and Non-Listed Company: Setup, Accounting & Governance', E'text'),
  (E'services.highlight.2', E'services', E'Services highlight 2', E'Payroll & Payments', E'text'),
  (E'services.highlight.3', E'services', E'Services highlight 3', E'Tax Return for Company and Individual', E'text'),
  (E'services.highlight.4', E'services', E'Services highlight 4', E'VAT Return Filing', E'text'),
  (E'services.highlight.5', E'services', E'Services highlight 5', E'Corporate Secretarial and Governance', E'text'),
  (E'services.highlight.6', E'services', E'Services highlight 6', E'Non-Statutory Audit', E'text'),
  (E'services.highlight.7', E'services', E'Services highlight 7', E'Management Accounts', E'text'),
  (E'services.highlight.8', E'services', E'Services highlight 8', E'Independent Examination of Charity Accounts', E'text'),
  (E'services.highlight.9', E'services', E'Services highlight 9', E'Trust / Charity Account: Setup, Accounting and Governance', E'text'),
  (E'services.highlight.10', E'services', E'Services highlight 10', E'Outsourcing Accounts and Bookkeeping to India', E'text'),
  (E'services.core.eyebrow', E'services', E'Core services eyebrow', E'Our Services', E'text'),
  (E'services.core.headingPrefix', E'services', E'Core services heading prefix', E'10 Core ', E'text'),
  (E'services.core.headingBrand', E'services', E'Core services heading (highlighted)', E'Services', E'text'),
  (E'services.core.intro', E'services', E'Core services intro', E'Cloud accounting and bookkeeping designed for businesses, charities, trusts and individuals.', E'richtext'),
  (E'services.card.cta', E'services', E'Service card button', E'Learn More', E'text'),
  (E'services.partners.eyebrow', E'services', E'Partners eyebrow', E'Integrations', E'text'),
  (E'services.partners.heading', E'services', E'Partners heading', E'Accounting Technology Partners', E'text'),
  (E'services.partners.intro', E'services', E'Partners intro', E'We work with trusted cloud accounting and compliance platforms to deliver secure, efficient, and digital-first accounting services for businesses, charities, and individuals.', E'richtext'),
  (E'blog.seo.title', E'blog', E'Blog SEO title', E'Blog | Alpha Digi AI Accountants', E'text'),
  (E'blog.seo.description', E'blog', E'Blog SEO description', E'Insights, guides and updates from Alpha Digi — practical advice from chartered accountants on tax, growth and digital accountancy.', E'richtext'),
  (E'blog.seo.ogTitle', E'blog', E'Blog Open Graph title', E'Blog | Alpha Digi AI Accountants', E'text'),
  (E'blog.seo.ogDescription', E'blog', E'Blog Open Graph description', E'Insights, guides and updates from Alpha Digi — practical advice from chartered accountants on tax, growth and digital accountancy.', E'richtext'),
  (E'blog.eyebrow', E'blog', E'Blog page eyebrow', E'Blog', E'text'),
  (E'blog.headingPrefix', E'blog', E'Blog heading prefix', E'Insights, guides and ', E'text'),
  (E'blog.headingBrand', E'blog', E'Blog heading (highlighted)', E'updates', E'text'),
  (E'blog.headingSuffix', E'blog', E'Blog heading suffix', E'.', E'text'),
  (E'blog.intro', E'blog', E'Blog intro paragraph', E'Practical advice from our chartered accountants — on tax, growth, and the changing face of digital accountancy.', E'richtext'),
  (E'blog.card.cta', E'blog', E'Blog card button', E'Read more', E'text'),
  (E'careers.seo.title', E'careers', E'Careers SEO title', E'Careers at Alpha Digi AI Accountants', E'text'),
  (E'careers.seo.description', E'careers', E'Careers SEO description', E'Join a chartered accountancy firm built on AI-assisted workflows. Roles for experienced ACA/ACCA/CTA professionals, graduates and apprentices across the UK.', E'richtext'),
  (E'careers.seo.ogTitle', E'careers', E'Careers Open Graph title', E'Join Our Team | Alpha Digi Careers', E'text'),
  (E'careers.seo.ogDescription', E'careers', E'Careers Open Graph description', E'Work at the intersection of chartered accountancy and AI — flexible working, modern tools and funded ICAEW pathways.', E'richtext'),
  (E'careers.eyebrow', E'careers', E'Careers page eyebrow', E'Join Our Team', E'text'),
  (E'careers.headingPrefix', E'careers', E'Careers heading prefix', E'Careers at ', E'text'),
  (E'careers.headingBrand', E'careers', E'Careers heading (highlighted)', E'Alpha Digi', E'text'),
  (E'careers.intro', E'careers', E'Careers intro paragraph', E'Work at the intersection of chartered accountancy and AI. Help us shape the future of financial services for businesses across the UK.', E'richtext'),
  (E'careers.culture.eyebrow', E'careers', E'Culture section eyebrow', E'Our Culture', E'text'),
  (E'careers.culture.heading', E'careers', E'Culture section heading', E'Life at Alpha Digi AI Accountants', E'text'),
  (E'careers.culture.intro', E'careers', E'Culture intro paragraph', E'We believe in a culture of continuous learning, technology empowerment, and deep client support. At Alpha Digi, you won''t just grind through spreadsheets — you will work with intelligent workflows that automate repetitive tasks, allowing you to focus on strategic client advisory and financial analysis.', E'richtext'),
  (E'careers.culture.1.title', E'careers', E'Culture card 1 title', E'Flexible Working', E'text'),
  (E'careers.culture.1.body', E'careers', E'Culture card 1 body', E'Hybrid and remote-first setup that supports a healthy work-life balance.', E'richtext'),
  (E'careers.culture.2.title', E'careers', E'Culture card 2 title', E'Modern Tools', E'text'),
  (E'careers.culture.2.body', E'careers', E'Culture card 2 body', E'Work with advanced cloud platforms, automated workflows, and AI assistants.', E'richtext'),
  (E'careers.culture.3.title', E'careers', E'Culture card 3 title', E'Growth Path', E'text'),
  (E'careers.culture.3.body', E'careers', E'Culture card 3 body', E'Defined professional growth plans, funded training, and ICAEW pathways.', E'richtext'),
  (E'careers.culture.4.title', E'careers', E'Culture card 4 title', E'Inclusive Value', E'text'),
  (E'careers.culture.4.body', E'careers', E'Culture card 4 body', E'A warm, diverse team environment where every voice is heard and valued.', E'richtext'),
  (E'careers.values.heading', E'careers', E'Values heading', E'Our Values', E'text'),
  (E'careers.values.intro', E'careers', E'Values intro paragraph', E'We are building an accounting firm where people thrive. By combining chartered rigour with digital speed, we ensure accuracy, clarity, and success.', E'richtext'),
  (E'careers.values.1', E'careers', E'Value 1', E'Trust & Confidentiality at the core.', E'text'),
  (E'careers.values.2', E'careers', E'Value 2', E'AI-assisted efficiency, human-centric advisory.', E'text'),
  (E'careers.values.3', E'careers', E'Value 3', E'Commitment to continuous training and compliance.', E'text'),
  (E'careers.values.4', E'careers', E'Value 4', E'Responsive, direct client communication.', E'text'),
  (E'careers.digital.heading', E'careers', E'Digital WE heading', E'Digital “WE” Philosophy', E'text'),
  (E'careers.digital.body', E'careers', E'Digital WE paragraph', E'At Alpha Digi AI Accountants, we define Digital “WE” as the harmonious integration of human capability and digital intelligence. We do not use technology to replace human insight; instead, we use AI to enhance your output, streamline decision-making, and reduce repetitive administrative tasks. This allows our professionals to spend more time building meaningful client relationships and offering top-tier chartered advice.', E'richtext'),
  (E'careers.pathways.eyebrow', E'careers', E'Career pathways eyebrow', E'Career Pathways', E'text'),
  (E'careers.pathways.heading', E'careers', E'Career pathways heading', E'Find Your Place in Our Firm', E'text'),
  (E'careers.role.idealLabel', E'careers', E'Role “ideal for” label', E'Ideal for:', E'text'),
  (E'careers.role.cta', E'careers', E'Role apply button', E'Apply', E'text'),
  (E'contact.seo.title', E'contact', E'Contact SEO title', E'Contact Alpha Digi AI Accountants', E'text'),
  (E'contact.seo.description', E'contact', E'Contact SEO description', E'Speak to our chartered accountants on {phone} or send us a message about accounting, payroll, tax, VAT and charity services.', E'richtext'),
  (E'contact.seo.ogTitle', E'contact', E'Contact Open Graph title', E'Contact Alpha Digi AI Accountants', E'text'),
  (E'contact.seo.ogDescription', E'contact', E'Contact Open Graph description', E'Get in touch with our UK chartered accountancy team today.', E'richtext'),
  (E'contact.eyebrow', E'contact', E'Contact page eyebrow', E'Contact', E'text'),
  (E'contact.headingPrefix', E'contact', E'Contact heading prefix', E'Speak to our ', E'text'),
  (E'contact.headingBrand', E'contact', E'Contact heading (highlighted)', E'team today.', E'text'),
  (E'contact.intro', E'contact', E'Contact intro paragraph', E'Tell us a little about your business and we''ll get back to you with tailored, practical advice.', E'richtext'),
  (E'contact.detail.phoneLabel', E'contact', E'Contact phone label', E'Phone', E'text'),
  (E'contact.detail.emailLabel', E'contact', E'Contact email label', E'Email', E'text'),
  (E'contact.detail.officeLabel', E'contact', E'Contact office label', E'Office', E'text'),
  (E'contact.detail.hoursLabel', E'contact', E'Contact hours label', E'Hours', E'text'),
  (E'contact.form.heading', E'contact', E'Contact form heading', E'Send us a message', E'text'),
  (E'contact.form.nameLabel', E'contact', E'Contact form name label', E'Name', E'text'),
  (E'contact.form.emailLabel', E'contact', E'Contact form email label', E'Email', E'text'),
  (E'contact.form.phoneLabel', E'contact', E'Contact form phone label', E'Phone', E'text'),
  (E'contact.form.messageLabel', E'contact', E'Contact form message label', E'How can we help?', E'text'),
  (E'contact.form.submit', E'contact', E'Contact form submit button', E'Send message', E'text'),
  (E'contact.form.sending', E'contact', E'Contact form sending label', E'Sending…', E'text'),
  (E'contact.form.thanks', E'contact', E'Contact form thanks message', E'Thanks — we''ve received your details and will be in touch shortly.', E'text'),
  (E'contact.form.error', E'contact', E'Contact form error message', E'We couldn''t send your message. Please try again or email us directly.', E'text'),
  (E'knowledge.seo.title', E'knowledge', E'Knowledge SEO title', E'Knowledge | Alpha Digi AI Accountants', E'text'),
  (E'knowledge.seo.description', E'knowledge', E'Knowledge SEO description', E'Download firm-authored tax guides, checklists, templates and deadline calendars from Alpha Digi AI Accountants.', E'richtext'),
  (E'knowledge.seo.ogTitle', E'knowledge', E'Knowledge Open Graph title', E'Knowledge | Alpha Digi AI Accountants', E'text'),
  (E'knowledge.seo.ogDescription', E'knowledge', E'Knowledge Open Graph description', E'Download firm-authored tax guides, checklists, templates and deadline calendars from Alpha Digi AI Accountants.', E'richtext'),
  (E'knowledge.eyebrow', E'knowledge', E'Knowledge page eyebrow', E'Knowledge', E'text'),
  (E'knowledge.headingPrefix', E'knowledge', E'Knowledge heading prefix', E'Guides, checklists and ', E'text'),
  (E'knowledge.headingBrand', E'knowledge', E'Knowledge heading (highlighted)', E'resources', E'text'),
  (E'knowledge.headingSuffix', E'knowledge', E'Knowledge heading suffix', E'.', E'text'),
  (E'knowledge.intro', E'knowledge', E'Knowledge intro paragraph', E'Firm-authored guides, checklists, templates and deadline calendars to help you stay organised through the tax year.', E'richtext'),
  (E'knowledge.card.cta', E'knowledge', E'Knowledge download button', E'Download PDF', E'text')
on conflict (key) do update set page = excluded.page, label = excluded.label, value = excluded.value, type = excluded.type;

-- Legal pages (also in supabase/seed-legal-pages.sql for a standalone run)
insert into public.page_content (key, page, label, value, type) values
  ('privacy-policy.seo.title', 'privacy-policy', 'Privacy SEO title', 'Privacy Policy | Alpha Digi AI Accountants', 'text'),
  ('privacy-policy.seo.description', 'privacy-policy', 'Privacy SEO description', 'How {firmName} collects, uses and stores personal information submitted through this website, including your rights under UK data protection law.', 'richtext'),
  ('privacy-policy.seo.ogTitle', 'privacy-policy', 'Privacy Open Graph title', 'Privacy Policy | Alpha Digi AI Accountants', 'text'),
  ('privacy-policy.seo.ogDescription', 'privacy-policy', 'Privacy Open Graph description', 'How we collect, use and store personal information submitted through this website.', 'richtext'),
  ('privacy-policy.body', 'privacy-policy', 'Privacy policy body', $privacy_body$# Privacy Policy
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
If you have any questions about this policy or how we handle your information, contact us at {email} or {phone}.
$privacy_body$, 'richtext'),
  ('terms.seo.title', 'terms', 'Terms SEO title', 'Terms of Website Use | Alpha Digi AI Accountants', 'text'),
  ('terms.seo.description', 'terms', 'Terms SEO description', 'Terms governing use of the {firmName} website, including that site content is general information and not professional advice.', 'richtext'),
  ('terms.seo.ogTitle', 'terms', 'Terms Open Graph title', 'Terms of Website Use | Alpha Digi AI Accountants', 'text'),
  ('terms.seo.ogDescription', 'terms', 'Terms Open Graph description', 'Terms governing use of this website, operated by {firmName}.', 'richtext'),
  ('terms.body', 'terms', 'Terms of website use body', $terms_body$# Terms of Website Use
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
Questions about these terms can be sent to {email}.
$terms_body$, 'richtext'),
  ('cookie-policy.seo.title', 'cookie-policy', 'Cookie policy SEO title', 'Cookie Policy | Alpha Digi AI Accountants', 'text'),
  ('cookie-policy.seo.description', 'cookie-policy', 'Cookie policy SEO description', 'How {firmName} uses cookies on this website. We use only strictly necessary cookies and do not use analytics or advertising cookies.', 'richtext'),
  ('cookie-policy.seo.ogTitle', 'cookie-policy', 'Cookie policy Open Graph title', 'Cookie Policy | Alpha Digi AI Accountants', 'text'),
  ('cookie-policy.seo.ogDescription', 'cookie-policy', 'Cookie policy Open Graph description', 'This website uses only strictly necessary cookies. We do not use analytics or advertising cookies.', 'richtext'),
  ('cookie-policy.body', 'cookie-policy', 'Cookie policy body', $cookie_body$# Cookie Policy
Last updated: 17 August 2026

This page explains how {firmName} uses cookies on this website.

## What are cookies
Cookies are small text files stored on your device when you visit a website. They help websites function properly and remember information about your visit.

## Cookies we use
We keep our use of cookies to a minimum. This website does not use any advertising, marketing, or analytics cookies, and we do not track your browsing activity. The only cookie-related storage used on this site is: Staff login session — when a member of our team logs into the website's content management system, a session token is stored in their browser to keep them logged in. This is strictly necessary for our staff to manage website content and is not set for, or accessible to, website visitors. We do not set any cookies when you browse the public pages of this website or submit our contact form.

## Changes to our cookie use
If we introduce analytics or other tracking in future, this policy will be updated first, and where required by law, we will ask for your consent before any such cookies are set.

## Contact us
Questions about our use of cookies can be sent to {email}.
$cookie_body$, 'richtext')
on conflict (key) do update set page = excluded.page, label = excluded.label, value = excluded.value, type = excluded.type;
