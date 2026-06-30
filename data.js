/* ============================================================
   DATA LAYER
   Kept separate from rendering logic (app.js) so this file alone
   is what you'd edit to update content — and it doubles as the
   knowledge base for the AzliGPT chatbot, so the bot only ever
   answers from facts that exist here (no hallucinated claims).
   ============================================================ */

const PROJECTS = [
  {
    title: "Employee Attrition Intelligence System",
    tag: "HR Analytics · End-to-end",
    metrics: [ {value:"88%", label:"accuracy"}, {value:"0.84", label:"F1 score"} ],
    problem: "HR teams react to attrition after it happens. The goal was to predict who is at risk of leaving early enough for retention action, and explain why — not just produce a black-box score.",
    dataset: "IBM HR Analytics dataset (Kaggle) — employee demographics, compensation, satisfaction surveys, and performance history.",
    workflow: [
      "Cleaned and profiled raw HR data, handled class imbalance in the attrition label",
      "Engineered features from tenure, satisfaction, and compensation bands",
      "Trained and tuned a Random Forest classifier against baseline logistic regression",
      "Pushed model outputs into a SQL layer for reporting",
      "Built an interactive Power BI dashboard for HR stakeholders"
    ],
    architecture: ["Raw HR data","SQL staging","Python feature engineering","Random Forest model","Power BI dashboard"],
    stack: ["Python","SQL","Pandas","Scikit-learn","Power BI"],
    impact: "Surfaces the top attrition drivers (compensation gap, low satisfaction, overtime) so HR can prioritize retention conversations instead of guessing.",
    lessons: "Model accuracy alone doesn't convince a stakeholder — pairing the model with a dashboard that explains *why* a prediction was made is what makes it usable.",
    github: "https://github.com/Azli45/Employee-Attrition-Intelligence-System",
    demo: null
  },
  {
    title: "SQL Data Warehouse Project",
    tag: "Data Engineering · Medallion architecture",
    metrics: [ {value:"5+", label:"source datasets"}, {value:"60%", label:"less manual effort"} ],
    problem: "Reporting was scattered across disconnected source files with no single source of truth, making BI reporting slow and error-prone.",
    dataset: "5+ raw operational datasets, integrated into a unified analytical layer.",
    workflow: [
      "Designed a Bronze (raw) → Silver (cleaned) → Gold (modeled) medallion architecture",
      "Built automated ETL pipelines for ingestion, cleaning, and transformation",
      "Modeled a star schema in the Gold layer for fast analytical queries",
      "Used CTEs, window functions, and stored procedures throughout"
    ],
    architecture: ["Bronze (raw)","Silver (cleaned)","Gold (star schema)","BI reporting layer"],
    stack: ["SQL","CTEs","Window Functions","Stored Procedures","Data Modeling"],
    impact: "Reduced manual reporting effort by an estimated 60% by replacing ad hoc spreadsheet joins with a single governed warehouse layer.",
    lessons: "Most of the value in a warehouse project is in the modeling decisions at the Silver/Gold boundary, not the ETL code itself.",
    github: "https://github.com/Azli45",
    demo: null
  },
  {
    title: "Healthcare — Patient Readmission Analysis",
    tag: "Statistical Analysis",
    metrics: [ {value:"10k+", label:"patient records"} ],
    problem: "Hospitals lose money and patient outcomes worsen with avoidable readmissions. The task was to find which clinical and demographic factors actually predict readmission.",
    dataset: "10,000+ patient records spanning admission type, diagnosis, length of stay, and demographic fields.",
    workflow: [
      "Performed exploratory data analysis to identify candidate readmission drivers",
      "Engineered clinical features (length-of-stay buckets, comorbidity counts)",
      "Ran hypothesis tests to validate which drivers were statistically significant",
      "Visualized high-risk patient segments with Seaborn and Matplotlib"
    ],
    architecture: ["Raw patient records","EDA + cleaning","Feature engineering","Hypothesis testing","Segment visualization"],
    stack: ["Python","Pandas","Seaborn","Matplotlib","Statistical Analysis"],
    impact: "Identified high-risk patient segments that hospitals could flag at discharge for follow-up care, directly targeting the costliest readmission cases.",
    lessons: "Statistical significance and clinical significance aren't the same thing — learned to size effects, not just p-values, before calling something a 'driver'.",
    github: "https://github.com/Azli45",
    demo: null
  },
  {
    title: "SQL Data Analytics Project",
    tag: "Business Intelligence",
    metrics: [ {value:"50k+", label:"records"}, {value:"35%", label:"faster queries"} ],
    problem: "Business stakeholders needed customer, sales, and churn insight from a large transactional dataset, but existing queries were too slow to support exploration.",
    dataset: "50,000+ transactional records across customers, sales, and churn events.",
    workflow: [
      "Wrote advanced SQL using CTEs, window functions, and multi-table joins",
      "Profiled slow queries and added targeted indexes",
      "Tuned query plans to cut execution time",
      "Packaged findings into business intelligence reports with recommendations"
    ],
    architecture: ["Transactional tables","Indexed views","CTE-based analysis queries","BI report output"],
    stack: ["SQL","Query Optimization","Data Analysis","BI Reporting"],
    impact: "Cut query execution time by 35% through indexing and tuning, making exploratory analysis fast enough for stakeholders to self-serve.",
    lessons: "Optimization work is invisible until you measure it — learned to benchmark before and after every tuning change instead of assuming it helped.",
    github: "https://github.com/Azli45",
    demo: null
  },
  {
    title: "30 Mini SQL Projects",
    tag: "SQL Proficiency Portfolio",
    metrics: [ {value:"30", label:"projects"} ],
    problem: "Build broad, repeatable fluency across the SQL operations that show up in real data engineering work, instead of only deep expertise in one narrow area.",
    dataset: "Varied small datasets per exercise, covering cleaning, aggregation, joins, and optimization scenarios.",
    workflow: [
      "Worked through 30 structured exercises covering data cleaning, aggregation, joins, and window functions",
      "Practiced query optimization patterns on each"
    ],
    architecture: ["Exercise dataset","SQL transformation","Validated output"],
    stack: ["SQL","Data Cleaning","Joins","Aggregation","Optimization"],
    impact: "Built the reflexive SQL fluency that the warehouse and analytics projects above rely on.",
    lessons: "Repetition across many small, varied problems built pattern recognition that no single big project could.",
    github: "https://github.com/Azli45",
    demo: null
  }
];

const SKILLS = [
  { category:"Programming languages", icon:"ri-code-s-slash-line", items:[
    {name:"Python",level:90},{name:"SQL",level:90},{name:"C++",level:60}
  ]},
  { category:"SQL & databases", icon:"ri-database-2-line", items:[
    {name:"CTEs",level:88},{name:"Window functions",level:85},{name:"Query tuning",level:78},{name:"Data modeling",level:80}
  ]},
  { category:"Data analytics", icon:"ri-bar-chart-grouped-line", items:[
    {name:"EDA",level:88},{name:"Hypothesis testing",level:75},{name:"Pandas / NumPy",level:90}
  ]},
  { category:"Machine learning", icon:"ri-brain-line", items:[
    {name:"Classification",level:82},{name:"Feature engineering",level:80},{name:"Model evaluation",level:78},{name:"Deep learning",level:55}
  ]},
  { category:"Data engineering", icon:"ri-stack-line", items:[
    {name:"ETL design",level:78},{name:"Medallion warehousing",level:80},{name:"Data modeling",level:78}
  ]},
  { category:"Visualization & BI", icon:"ri-pie-chart-2-line", items:[
    {name:"Power BI",level:85},{name:"Tableau",level:70},{name:"Excel",level:80}
  ]},
  { category:"Developer tools", icon:"ri-terminal-box-line", items:[
    {name:"Git / GitHub",level:80},{name:"VS Code",level:85},{name:"Jupyter / Colab",level:88}
  ]},
  { category:"Soft skills", icon:"ri-team-line", items:[
    {name:"Communication",level:85},{name:"Presentation",level:82},{name:"Leadership",level:80}
  ]}
];

const TIMELINE = [
  { when:"Ongoing", title:"Google Student Ambassador", body:"Promoting AI literacy, Google Cloud, and Gemini tools across a 500+ student community; conducted 5+ AI/ML workshops with faculty collaboration." },
  { when:"08/2023 — Present", title:"B.Tech in Artificial Intelligence & Machine Learning", body:"Baderia Global Institute of Engineering & Management, Jabalpur · CGPA 8.79/10." },
  { when:"Issued 2026-06-30", title:"Data Analytics Job Simulation — Deloitte (Forage)", body:"Cert ID: kNHTD2JDLNgXbjttE" },
  { when:"Issued 2026-05-30", title:"Python Essentials 1 — Cisco Networking Academy & Python Institute", body:"Cert ID: 7357ee6b-b920-4372-8c60-44a7d6ded064" }
];

const PINNED_REPOS = [
  { name:"Employee-Attrition-Intelligence-System", desc:"End-to-end HR analytics pipeline: SQL, Python, Random Forest, Power BI.", lang:"Python" },
  { name:"sql-data-warehouse-project", desc:"Medallion architecture (Bronze/Silver/Gold) warehouse with automated ETL.", lang:"SQL" },
  { name:"30-mini-sql-projects", desc:"30 structured SQL exercises across cleaning, joins, and optimization.", lang:"SQL" },
  { name:"healthcare-readmission-analysis", desc:"Statistical analysis of 10k+ patient records to flag readmission risk.", lang:"Python" }
];

/* knowledge base the chatbot answers from — nothing outside this exists for the bot */
const CHAT_KB = {
  projects: () => "Azli has shipped 5 end-to-end projects: an Employee Attrition Intelligence System (88% accuracy, Power BI dashboard), a medallion-architecture SQL Data Warehouse, a Healthcare Readmission analysis on 10k+ patient records, a SQL analytics project on 50k+ records with 35% faster queries, and a portfolio of 30 mini SQL projects. Want details on any one?",
  warehouse: () => "The warehouse follows a Bronze → Silver → Gold medallion architecture: Bronze holds raw ingested data, Silver cleans and standardizes it, and Gold models it into a star schema for fast BI queries. It integrates 5+ source datasets and cut manual reporting effort by an estimated 60%.",
  hire: () => "Three reasons: she ships full pipelines, not just notebooks — raw data to warehouse to model to dashboard. Her SQL and Python fundamentals are production-grade (CTEs, window functions, query tuning, scikit-learn). And she already communicates findings to non-technical stakeholders through Power BI, which most students her year haven't had to do yet.",
  certifications: () => "Two so far: the Deloitte Data Analytics Job Simulation (Forage) and Python Essentials 1 from Cisco Networking Academy & the Python Institute. She's also currently leveling up in Spark, Docker, Airflow, dbt, Azure, and Snowflake.",
  skills: () => "Core strengths are Python and SQL (both self-rated 90%), Power BI for visualization, and the data engineering fundamentals — ETL design, medallion warehousing, and query optimization. Deep learning and Tableau are earlier-stage, by her own honest rating.",
  experience: () => "She's a Google Student Ambassador, reaching 500+ students and running 5+ AI/ML workshops with faculty. On the technical side: 5 end-to-end data projects spanning analytics, ML, and warehousing.",
  resume: () => "You can grab it from the 'Download résumé' button in the hero or contact section — same file either way.",
  contact: () => "Best ways to reach her: azlikhan453@gmail.com or +91 93006 97909. LinkedIn and GitHub links are in the footer and contact section too.",
  cgpa: () => "8.79 out of 10.",
  default: () => "I can answer questions about Azli's projects, skills, certifications, experience, or how to contact her — try one of the quick options below, or ask directly."
};
