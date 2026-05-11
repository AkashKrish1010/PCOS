export const patient = {
  id: "PCOS-2847",
  name: "Sachin P.",
  updatedAt: "March 5, 2026",
  cycle: 4,
};

export const hormones = [
  { name: "LH", value: 18.4, unit: "mIU/mL", refMax: 100, refVal: "2–15", status: "High", pct: 73, color: "#E8455A" },
  { name: "FSH", value: 4.2, unit: "mIU/mL", refMax: 100, refVal: "3–10", status: "Normal", pct: 42, color: "#0E9B8A" },
  { name: "Testosterone", value: 92, unit: "ng/dL", refMax: 100, refVal: "15–70", status: "High", pct: 88, color: "#E8455A" },
  { name: "Estradiol", value: 38, unit: "pg/mL", refMax: 100, refVal: "30–120", status: "Normal", pct: 55, color: "#0E9B8A" },
  { name: "DHEA-S", value: 310, unit: "μg/dL", refMax: 100, refVal: "65–380", status: "Normal", pct: 80, color: "#0E9B8A" },
  { name: "Insulin", value: 22, unit: "μIU/mL", refMax: 100, refVal: "<10", status: "High", pct: 92, color: "#E8455A" },
  { name: "AMH", value: 8.7, unit: "ng/mL", refMax: 100, refVal: "1–3.5", status: "High", pct: 95, color: "#E8455A" },
];

export const genes = [
  { name: "FSHR", chromosome: "2p21-p16", variant: "rs6166", foldChange: 2.8, pval: "4.2e-8", phenotype: "LH Signaling", association: "Strong" },
  { name: "INSR", chromosome: "19p13.2", variant: "rs2059806", foldChange: -1.9, pval: "1.1e-6", phenotype: "Insulin Resist.", association: "Moderate" },
  { name: "CYP11A1", chromosome: "15q24.1", variant: "rs4077582", foldChange: 3.4, pval: "8.7e-9", phenotype: "Androgen Synth.", association: "Strong" },
  { name: "LHCGR", chromosome: "2p21", variant: "rs13405728", foldChange: 2.1, pval: "3.3e-7", phenotype: "LH Receptor", association: "Strong" },
  { name: "FTO", chromosome: "16q12.2", variant: "rs9939609", foldChange: -1.4, pval: "6.8e-5", phenotype: "Obesity Risk", association: "Moderate" },
  { name: "AMH", chromosome: "19p13.3", variant: "rs10407022", foldChange: 4.1, pval: "2.1e-10", phenotype: "Ovarian Reserve", association: "Strong" },
];

export const pathways = [
  { name: "PI3K / Akt / mTOR Signaling", genes: 14, score: 0.89, color: "#E8455A" },
  { name: "Androgen Biosynthesis", genes: 9, score: 0.84, color: "#E8943A" },
  { name: "GnRH Signaling Pathway", genes: 11, score: 0.79, color: "#4A5BE8" },
  { name: "Insulin Signaling Pathway", genes: 18, score: 0.76, color: "#0E9B8A" },
  { name: "Fatty Acid Metabolism", genes: 8, score: 0.61, color: "#9B6A0E" },
];

export const metabolites = [
  { name: "Glucose", value: "112", unit: "mg/dL", delta: "+14%", up: true },
  { name: "Insulin", value: "22.1", unit: "μIU/mL", delta: "+120%", up: true },
  { name: "Testosterone", value: "92", unit: "ng/dL", delta: "+31%", up: true },
  { name: "SHBG", value: "18", unit: "nmol/L", delta: "-44%", up: false },
  { name: "Cortisol", value: "19.4", unit: "μg/dL", delta: "+8%", up: true },
  { name: "Adiponectin", value: "5.2", unit: "μg/mL", delta: "-38%", up: false },
];

export const alerts = [
  { type: "critical", icon: "🚨", title: "Hyperandrogenism Detected", body: "Testosterone 31% above reference range. Confirm with free testosterone assay." },
  { type: "warning", icon: "⚠️", title: "Insulin Resistance Pattern", body: "HOMA-IR score of 6.1 suggests moderate insulin resistance. Metabolic panel recommended." },
  { type: "info", icon: "🧬", title: "3 Novel Variants Identified", body: "CYP11A1 variant rs4077582 shows strong PCOS association in latest GWAS data." },
];

export const riskFactors = [
  { label: "Hormonal Dysregulation", value: 0.82, color: "#E8455A" },
  { label: "Insulin Resistance", value: 0.71, color: "#E8943A" },
  { label: "Genetic Susceptibility", value: 0.65, color: "#4A5BE8" },
  { label: "Metabolic Disruption", value: 0.58, color: "#0E9B8A" },
];

export const timelineEvents = [
  { date: "Mar 2026", event: "Genomic Analysis Complete", detail: "WGS report — 6 significant PCOS-associated variants", color: "#E8455A" },
  { date: "Feb 2026", event: "Metabolomics Panel", detail: "Serum metabolomics — 23 dysregulated metabolites identified", color: "#E8943A" },
  { date: "Jan 2026", event: "Hormone Baseline", detail: "Full endocrine panel — LH:FSH ratio 4.4:1", color: "#4A5BE8" },
  { date: "Dec 2025", event: "Initial Assessment", detail: "Ultrasound confirmed polycystic morphology ≥12 follicles", color: "#0E9B8A" },
];

export const lhTrend = [4.2, 6.1, 8.3, 11.2, 14.8, 16.1, 18.4];
export const insulinTrend = [8, 10, 12, 15, 17, 20, 22];
export const trendLabels = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];

export const insulinResistanceMarkers = [
  { label: "HOMA-IR", value: 6.1, max: 10, threshold: 2.5, unit: "" },
  { label: "Fasting Glucose", value: 112, max: 200, threshold: 100, unit: "mg/dL" },
  { label: "TG:HDL Ratio", value: 3.8, max: 6, threshold: 3.5, unit: "" },
  { label: "Adiponectin", value: 5.2, max: 15, threshold: 10, unit: "μg/mL" },
];

export const metabolitePathways = [
  { name: "Steroid Hormone Biosynthesis", metabolites: 8, score: 0.91, color: "#E8455A" },
  { name: "Glycolysis / Gluconeogenesis", metabolites: 12, score: 0.83, color: "#E8943A" },
  { name: "Sphingolipid Metabolism", metabolites: 6, score: 0.71, color: "#4A5BE8" },
  { name: "Amino Acid Catabolism", metabolites: 9, score: 0.65, color: "#0E9B8A" },
];
