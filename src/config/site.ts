export const siteConfig = {
  name: "Jungho Lee",
  headline: "PM for Streaming, CTV & AI Products",
  heroHeadline: "I build things. This site is one of them.",
  pitch: "9 platforms. 50% ad-revenue lift. AI agents in production. 12 years running my own business. I ship products that work, and I built this site to prove it.",
  email: "kezameske@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/jungholeee/",
    github: "https://github.com/kezameske",
    resume: "https://drive.google.com/file/d/1vROhiGjglC4brdZeXuiaMCgkUL3l0WML/view?usp=sharing",
  },
  n8nWebhookUrl: "https://n8n.hanin.store/webhook/b8803833-acd7-400b-b40c-9940983118c6/chat",
  askHeadline: "This AI assistant knows my full career history. Ask it anything, no screening call needed.",

  about: {
    summary: "I've spent my career building things people actually use. 9 platforms. 50% ad-revenue lift. AI agents in production. Today I own mobile and CTV product at ODK Media, drive ad-revenue strategy, and ship AI tools on the side. Before product, I ran my own business for 12 years and worked my way up through IT systems. Bilingual in English and Korean, based in Orange County.",
    location: "Orange County, CA",
    phone: "",
    languages: [
      { name: "English", level: "Native" },
      { name: "Korean", level: "Native" },
    ],
  },

  education: {
    degree: "B.S. Recording Industry",
    school: "Middle Tennessee State University",
    date: "",
  },

  experience: [
    {
      company: "ODK Media",
      title: "Product Manager",
      period: "June 2021 – Present",
      highlights: [
        "Only PM owning mobile and CTV product across 9 platforms (iOS, Android, Android TV, Fire TV, tvOS, Roku, Tizen, webOS, Vizio)",
        "Uncovered hardcoded CTV ad bug → 50% increase in ad impressions and measurable revenue lift",
        "Built ad performance dashboards (SSP reporting + Google BigQuery) used daily by Engineering and Ops",
        "Managed platform partner relationships with Roku, Samsung, LG, Vizio, Apple, Google, and Amazon",
        "Owned end-to-end release management cadence across mobile and CTV",
      ],
    },
    {
      company: "ODK Media",
      title: "IT Systems Lead",
      period: "March 2019 – June 2021",
      highlights: [
        "Migrated entire company from legacy tools to Google Workspace, consolidated 30+ SaaS apps",
        "Restructured Jira/Confluence from scratch for Engineering, Sales, and Operations",
        "60% increase in active tool usage; 15% reduction in licensing costs",
        "Championed early AI adoption, designed training programs and AI-assisted workflows",
      ],
    },
    {
      company: "Hyundai America Technical Center",
      title: "System Administrator / Project Manager",
      period: "Jan 2016 – Feb 2019",
      highlights: [
        "Managed virtualized server environments (VMware) for 200+ engineers across 4 offices",
        "Owned $400K+ annual budget for software/hardware procurement",
        "Maintained 99%+ uptime for mission-critical R&D systems",
      ],
    },
    {
      company: "Self-Employed",
      title: "Cyber Cafe, Owner / Operator",
      period: "12 years (started at age 20)",
      highlights: [
        "Founded and operated a cyber cafe while enrolled as a full-time college student",
        "Managed all aspects: buildout, equipment, staffing, daily operations",
        "Sustained the business for over a decade alongside other full-time roles",
      ],
    },
  ],

  projects: [
    {
      title: "Ask Jungho",
      description: "The chatbot on this page is a RAG agent I built from scratch. It retrieves answers from vectorized resume data using Supabase pgvector, orchestrates the pipeline through n8n, and generates grounded responses with Gemini Pro. Try it above.",
      tech: ["Supabase", "pgvector", "Airtable", "n8n", "Gemini Pro", "Next.js"],
      url: "https://ask.jungholee.com",
    },
    {
      title: "Paramount+ Streaming Analysis",
      description: "Architectural teardown of Paramount+'s video delivery infrastructure. Documents the end-to-end content pipeline, CDN strategy, and core components that power high-availability streaming at scale.",
      tech: ["Streaming Architecture", "Video Delivery", "Infrastructure Analysis"],
      url: "https://pp.jungholee.com",
    },
  ],

  skills: {
    "Product & Strategy": [
      "Cross-platform PM (mobile + CTV + web)",
      "Release management (9 platforms)",
      "CTV/OTT strategy",
      "Agile/Scrum",
      "Stakeholder management",
    ],
    "AI & Automation": [
      "RAG architecture",
      "Prompt engineering",
      "n8n workflows",
      "Supabase / pgvector",
      "Claude Code CLI",
      "Playwright automation",
    ],
    "Streaming & Ad Tech": [
      "MUX Analytics",
      "CSAI / SSAI",
      "CTV monetization",
      "Multi-platform certification",
      "Subscription (Recurly, IAP)",
      "Playback health monitoring",
    ],
    "Technical Fluency": [
      "Next.js / React / TypeScript",
      "Python / FastAPI / Streamlit",
      "Tailwind CSS",
      "Airtable & Google Sheets APIs",
    ],
    "Infrastructure": [
      "AWS / GCP",
      "PostgreSQL / Supabase",
      "VMware",
      "Vercel / Railway",
      "SaaS administration",
    ],
  },

  funFacts: [
    "Started a cybercafe business at 20 while in college full-time. Ran it for 12 years.",
    "Built track cars and raced HPDE events at Buttonwillow Raceway. That passion became the Track Junkies app.",
    "Holds a B.S. in Recording Industry from Middle Tennessee State University.",
    "Korean-American, bilingual in English and Korean.",
    "Shipped 6+ side projects: a RAG agent, a lap-time estimator, a restaurant crawler, and more.",
    "Only PM at ODK Media owning mobile and CTV. Ships across 9 platforms solo.",
    "Built an Instagram restaurant discovery pipeline that auto-crawls food influencer posts with Playwright.",
    "Collaborates daily with engineering teams in Korea and Vietnam across time zones.",
    "Career started in desktop support in 2013. Went from helpdesk to PM by building, not waiting.",
    "Built a resume tailoring app with Claude Opus that analyzes job fit and generates interview prep.",
  ],

  starterChips: [
    "Give me a 30-second summary of Jungho.",
    "How has Jungho driven revenue or business impact?",
    "What's Jungho's experience with streaming and ad tech?",
    "What kind of PM role is Jungho best suited for?",
    "What has Jungho built with AI?",
  ],

  footerCta: {
    headline: "Interested? Let's talk.",
    subtext: "Reach out on LinkedIn or send an email. I'd love to hear about the role.",
  },
};
