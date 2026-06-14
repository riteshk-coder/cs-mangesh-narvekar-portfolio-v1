import { Qualification, ServiceCategory, StatItem, Testimonial, ValueItem } from '../types';

export const QUALIFICATIONS: Qualification[] = [
  {
    id: 'fcs',
    abbreviation: 'FCS',
    fullName: 'Fellow Company Secretary',
    description: 'FCS designation represents the highest class of membership of the Institute of Company Secretaries of India (ICSI). It marks superior expertise in corporate law, corporate governance, board procedures, secretarial audit, and structural compliance.',
    iconName: 'Award',
    color: 'from-[#C19A5B] to-[#E5C185]'
  },
  {
    id: 'mba',
    abbreviation: 'MBA',
    fullName: 'Master of Business Administration',
    description: 'Postgraduate degree in Business Administration, equipping the consultancy with strategic financial management, corporate restructuring models, business analysis, operations leadership, and a multi-dimensional perspective to solving complex enterprise challenges.',
    iconName: 'Briefcase',
    color: 'from-[#183B6B] to-[#2C62A9]'
  },
  {
    id: 'llb',
    abbreviation: 'LLB',
    fullName: 'Bachelor of Laws',
    description: 'Professional law degree delivering absolute mastery over corporate, civil, taxation, labor, and economic laws. Enables representation before regulatory tribunals and direct translation of legal requirements into operational business compliance.',
    iconName: 'Scale',
    color: 'from-[#0F2747] to-[#1E4375]'
  }
];

export const STATS: StatItem[] = [
  {
    id: 'experience',
    label: 'Years of Experience',
    value: 15,
    suffix: '+',
    description: 'Decades of proven leadership in legal, secretarial, and regulatory advisory fields.'
  },
  {
    id: 'clients',
    label: 'Corporate Clients',
    value: 500,
    suffix: '+',
    description: 'Startups, MSMEs, partnership firms, and public listed companies serviced nationwide.'
  },
  {
    id: 'consultations',
    label: 'Consultation Sessions',
    value: 2000,
    suffix: '+',
    description: 'Providing sharp direction across complex taxation, structuring, and governance hurdles.'
  },
  {
    id: 'projects',
    label: 'Incorporate & Compliance Projects',
    value: 1200,
    suffix: '+',
    description: 'Successful business filings, board resolutions, secretarial audits, and structural filings.'
  }
];

export const EXPERTISE_LIST = [
  { title: 'Corporate Compliance', desc: 'Expert handling of complex corporate regulatory requirements under the Companies Act, 2013 and SEBI.', icon: 'CheckSquare' },
  { title: 'Company Law Advisory', desc: 'Strategic advisory on board structures, meetings, corporate governance, and statutory filings.', icon: 'FileText' },
  { title: 'Secretarial Audit', desc: 'Thorough physical and procedural secretarial audits for complete structural legal peace of mind.', icon: 'ShieldAlert' },
  { title: 'GST Consultancy', desc: 'Complete GST management from returns or regular registration to legal audit defense and appeals.', icon: 'Percent' },
  { title: 'Income Tax Advisory', desc: 'Personalized tax filing, active audit representations, corporate tax planning, and TDS filing.', icon: 'CreditCard' },
  { title: 'FEMA Compliance', desc: 'Adherence to foreign inward and outward investment rules, filing FC-GPR, and regulatory filings.', icon: 'Globe' },
  { title: 'Startup Registration', desc: 'End-to-end framework advisory, private company, LLP, OPC incorporation, and DPIIT recognition.', icon: 'Zap' },
  { title: 'Corporate Governance', desc: 'Instilling ethical policies, board review mechanisms, CSR frameworks, and shareholder equity rights.', icon: 'Users' },
  { title: 'Due Diligence', desc: 'Rigorous legal and corporate compliance due diligence audits for investors, mergers, or buyouts.', icon: 'Search' },
  { title: 'Business Structuring', desc: 'Structuring corporate assets, joint ventures, partnerships, and conversions between entity forms.', icon: 'TrendingUp' }
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'company-law',
    name: 'Company Law & Secretarial',
    iconName: 'Building',
    description: 'End-to-end corporate law advisory, statutory compliance, board procedures, and certified secretarial auditing.',
    details: [
      {
        id: 'inc',
        title: 'Company & LLP Incorporation',
        description: 'Comprehensive setup services for Private Limited Companies, One Person Companies (OPC), Limited Liability Partnerships (LLP), and Section 8 (Charitable) Companies.',
        items: [
          'Name availability checking & reserve requests (RUN/SPICe+)',
          'Drafting Memorandum (MoA) and Articles of Association (AoA)',
          'Obtaining DIN (Director Identification Number) & DSC (Digital Signatures)',
          'DPIIT Startup Recognition assistance',
          'PAN, TAN, and bank account setup support'
        ]
      },
      {
        id: 'roc',
        title: 'ROC & Annual Filing Compliances',
        description: 'Fulfilling periodic filing mandates with the Registrar of Companies to prevent heavy penalties and active default listings.',
        items: [
          'Filing Annual Returns (Form MGT-7) and Financial Statements (Form AOC-4)',
          'Filing Director KYC (DIR-3 KYC) & Active Company Tagging (INC-22A)',
          'Preparing, maintaining, and drafting Board Minutes and General Meeting Books',
          'Reporting modifications in Directors, Share Capital, or Registered Address',
          'Filing resolutions (MGT-14) for crucial board transactions'
        ]
      },
      {
        id: 'aud',
        title: 'Secretarial Audit & Board Support',
        description: 'Comprehensive audits verifying absolute compliance with the Companies Act and relevant industry regulations.',
        items: [
          'Conducting independent Secretarial Audits for listed & large public companies',
          'Issuing compliance certificates & Form MR-3 reports',
          'Drafting notices, agendas, or explanatory statements for board & shareholder meetings',
          'Advising on corporate restructuring, buybacks, and employee shares (ESOPs)',
          'Winding up of obsolete LLPs or companies under Section 248'
        ]
      }
    ]
  },
  {
    id: 'gst-services',
    name: 'GST Services',
    iconName: 'Percent',
    description: 'Expert planning, registration, file management, and representation under India’s goods and services tax system.',
    details: [
      {
        id: 'gst-ret',
        title: 'GST Returns & Compliance Filing',
        description: 'Automated, accurate internal tracking and monthly or quarterly return filing to maintain smooth business continuity.',
        items: [
          'Filing of monthly outward supplies (GSTR-1)',
          'Filing of summarized monthly tax return (GSTR-3B)',
          'Quarterly filing for composition scheme dealers (CMP-08)',
          'Active reconciliation of input tax credits with GSTR-2B / GSTR-2A',
          'Filing of Annual Returns (GSTR-9) & reconciliation statement (GSTR-9C)'
        ]
      },
      {
        id: 'gst-add',
        title: 'GST Registration & Structuring',
        description: 'Establishing standard or specialized GST registrations, state-level setups, or specific export permissions.',
        items: [
          'New registration for Proprietorships, Partnerships, Corporates, & LLPs',
          'Registration for Casual Taxable Persons or Non-Resident Taxable Persons',
          'Amendments in Core & Non-Core fields of existing GST profiles',
          'Applying for LUT (Letter of Undertaking) for zero-rated export supplies',
          'Revocation of cancelled or suspended GST registrations'
        ]
      },
      {
        id: 'gst-adv',
        title: 'GST Advisory, Audit & Litigations',
        description: 'Proactive support during department audits, show-cause notices, or administrative challenges.',
        items: [
          'Drafting detailed replies to Show Cause Notices (SCN) & Demand Orders',
          'Preparing files for GST department audits under Section 65',
          'E-Way Bill consultancy, implementation, and generation protocols',
          'Advocacy on block credit clauses and input tax credit optimizations',
          'Filing appeals before the Appellate Authorities'
        ]
      }
    ]
  },
  {
    id: 'taxation',
    name: 'Income Tax Services',
    iconName: 'Scale',
    description: 'Strategic tax preparation, compliance checking, TDS filing, and representation before the Income Tax Department.',
    details: [
      {
        id: 'itr',
        title: 'Income Tax Return Filing',
        description: 'Securing correct, optimized annual filings for individuals, business professionals, LLPs, and corporations.',
        items: [
          'ITR filing for salaried individuals & high-net-worth investors (ITR-1, ITR-2)',
          'ITR filing for business owners, professionals, & consultants (ITR-3, ITR-4 Presumptive Tax)',
          'ITR filing for partnership firms, LLPs, and private companies (ITR-5, ITR-6)',
          'Foreign Asset reporting & Double Taxation Avoidance Agreement (DTAA) filings',
          'Filing of updated/belated returns for past financial years'
        ]
      },
      {
        id: 'tds',
        title: 'TDS & TCS Compliance',
        description: 'Ensuring systematic quarterly withholding tax obligations are fulfilled to safeguard audit compliance.',
        items: [
          'Quarterly return filing under Form 24Q (Salary) & Form 26Q (Non-Salary payments)',
          'Quarterly TCS return filing under Form 27EQ',
          'Computation of withholding tax on real estate purchases (Form 26QB)',
          'Issuing Form 16 & Form 16A certificates digitally',
          'Rectifications of TRACES defaults and late-fee demands'
        ]
      },
      {
        id: 'tax-rep',
        title: 'Tax Advisory & Appeals Support',
        description: 'Defending positions and resolving legacy tax notices from the assessment office.',
        items: [
          'Preparing details for tax scrubbing and assessments under Section 143(3)',
          'Drafting replies to high-value notices on unexplained deposits or assets',
          'Designing personal and corporate tax optimization structures legally',
          'Filing appeals before Commissioner of Income Tax (CIT Appeals)',
          'Processing pending tax refunds & ledger alignments'
        ]
      }
    ]
  },
  {
    id: 'legal-fema',
    name: 'Legal & FEMA Compliance',
    iconName: 'Shield',
    description: 'FEMA advisory, joint venture licensing, due diligence auditing, and comprehensive corporate governance counsel.',
    details: [
      {
        id: 'fema',
        title: 'FEMA & Foreign Cross-Border Advisory',
        description: 'Managing inward remittances, outbound investment files, and overseas operating entity disclosures.',
        items: [
          'Advising on Foreign Direct Investment (FDI) guidelines & sectoral caps',
          'Compliance filings on RBI ECF portal and single master form (SMF)',
          'Filing of FC-GPR for share allocations to foreign shareholders',
          'Overseas Direct Investment (ODI) declarations and structure advice',
          'Filing Annual Return of Foreign Liabilities and Assets (FLA)'
        ]
      },
      {
        id: 'due-dil',
        title: 'Corporate Due Diligence',
        description: 'Comprehensive independent inspection prior to business acquisition, bank underwriting, or equity investment.',
        items: [
          'Conducting legal due diligence of assets, titles, and structural liabilities',
          'Auditing statutory registers and MCA filings compliance history',
          'Evaluating GST, Income Tax, and labor registrations status',
          'Drafting legal due diligence reports with actionable mitigation boards',
          'Advising on corporate conversions (Proprietorship/Partnership to Private Limited)'
        ]
      },
      {
        id: 'gov',
        title: 'Corporate Governance & Policy Drafting',
        description: 'Helping boards of directors structure elegant, law-compliant rules of conduct.',
        items: [
          'Structuring audit committees, nomination metrics, & stakeholder boards',
          'Drafting specialized Whistleblower Policies, POSH, and Codes of Conduct',
          'Framing CSR (Corporate Social Responsibility) allocations & implementation audits',
          'Drafting shareholder agreements, agency contracts, and operating bylaws',
          'Resolving shareholder management conflicts neutrally within the statutory framework'
        ]
      }
    ]
  }
];

export const WHY_CHOOSE_ME: ValueItem[] = [
  {
    id: 'multidisciplinary',
    title: 'Multidisciplinary Expertise',
    description: 'Having a unique blend of qualifications—FCS (Governance), MBA (Strategy), and LLB (Law)—CS Mangesh Narvekar processes business decisions with thorough corporate, financial, and legal coverage.',
    iconName: 'GraduationCap'
  },
  {
    id: 'personalized',
    title: 'Personalized Consultation',
    description: 'Direct partner accessibility without long chains of intermediates. Get precise, strategic legal counsel tailored specifically to your business size, budget, and expansion phase.',
    iconName: 'UserCheck'
  },
  {
    id: 'timely',
    title: 'Timely Compliance',
    description: 'Advanced automated reminders, trackbooks, and highly skilled support ensure all taxation, MCA, and ROC returns are compiled and filed perfectly ahead of statutory deadlines.',
    iconName: 'Clock'
  },
  {
    id: 'strategic',
    title: 'Strategic Advisory',
    description: 'Compliance is not just paperwork; it is a catalyst for business trust. We structure transactions, boards, and entities to maximize funding capability and investor confidence.',
    iconName: 'Compass'
  },
  {
    id: 'client-centric',
    title: 'Client-Centric Approach',
    description: 'With over 500+ happy clients in Kolhapur, Pune, Mumbai, and beyond, we prioritize clear communication, transparent pricing guides, and absolute responsiveness.',
    iconName: 'HeartHandshake'
  },
  {
    id: 'integrity',
    title: 'Professional Integrity',
    description: 'Operating strictly under the ethical rules of the Institute of Company Secretaries of India (ICSI), prioritizing confidentiality, clarity, and flawless legal standards.',
    iconName: 'Shield'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Rajen Shinde',
    position: 'Managing Director',
    company: 'Shinde Tech Solutions Private Limited',
    content: 'Mangesh and his office handled our company incorporation and subsequent FDI filings flawlessly. His background as a Lawyer (LLB) and FCS meant we received combined compliance and legal counsel under a single roof. Incredibly professional team.',
    rating: 5
  },
  {
    id: 't2',
    name: 'Advait Ghodawat',
    position: 'Chief Executive Officer',
    company: 'Kolhapur Agro Foods LLP',
    content: 'We migrated our complete tax filings, ROC compliances, and secretarial requirements to CS Mangesh. The transition was completely smooth. His attention to detail, automated upcoming deadline warnings, and thoroughness are outstanding.',
    rating: 5
  },
  {
    id: 't3',
    name: 'Suhas Kulkarni',
    position: 'Founder',
    company: 'Apex Industrial Castings',
    content: 'Mangesh assisted us during deep corporate restructuring, share valuations, and a complicated GST Audit. His calm approach, deep expertise in state laws, and corporate structuring (thanks to his MBA background) saved us from severe stress.',
    rating: 5
  },
  {
    id: 't4',
    name: 'Meera Patil',
    position: 'Director of Finance',
    company: 'Sahyadri Engineering Ventures Ltd',
    content: 'CS Mangesh Narvekar acted as our external Secretarial Auditor. He delivered a highly systematic MR-3 report, spotting minor regulatory risks early on that saved our board significant exposure. Highly recommended for compliance management!',
    rating: 5
  }
];
