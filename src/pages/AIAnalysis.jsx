import { useState, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const PATIENT_CONTEXT = `PCOS Patient Profile (PCOS-2847):
- LH: 18.4 mIU/mL (HIGH, ref 2–15) | FSH: 4.2 mIU/mL (normal) | LH:FSH ratio 4.4:1
- Testosterone: 92 ng/dL (HIGH, ref 15–70) — +31% above reference
- AMH: 8.7 ng/mL (HIGH, ref 1–3.5) — severe hyperovarian reserve
- Insulin: 22 μIU/mL (HIGH) | HOMA-IR: 6.1 (moderate-severe resistance)
- DHEA-S: 310 μg/dL (normal) | Estradiol: 38 pg/mL (normal)
- Genomic variants: CYP11A1 rs4077582 (strong, FC+3.4x), FSHR rs6166 (strong, FC+2.8x),
  LHCGR rs13405728 (strong, FC+2.1x), INSR rs2059806 (moderate, FC-1.9x),
  AMH rs10407022 (strong, FC+4.1x), FTO rs9939609 (moderate, FC-1.4x)
- Dysregulated pathways: PI3K/Akt/mTOR (NES 0.89), Androgen Biosynthesis (0.84),
  GnRH Signaling (0.79), Insulin Signaling (0.76), Fatty Acid Metabolism (0.61)
- Metabolomics: 23 dysregulated metabolites — Steroid Hormone Biosynthesis (MSEA 0.91),
  Glycolysis/Gluconeogenesis (0.83) most enriched
- Clinical alerts: Hyperandrogenism detected, Insulin Resistance Pattern, 3 novel variants`;

const PROMPTS = {
  treatment: `Based on this PCOS patient's complete bioinformatics profile:\n\n${PATIENT_CONTEXT}\n\nProvide a structured treatment recommendation including:\n1) First-line pharmacological options with mechanism of action\n2) Targeted interventions based on the specific genetic variants (CYP11A1, INSR, FSHR)\n3) Lifestyle modifications supported by the metabolomics data\n4) Monitoring biomarkers and follow-up timeline\n\nFormat as a clear, clinically actionable summary.`,
  interpretation: `Interpret these PCOS bioinformatics findings:\n\n${PATIENT_CONTEXT}\n\nProvide:\n1) Clinical interpretation of overall severity\n2) Most likely PCOS phenotype based on Rotterdam criteria\n3) Key molecular mechanisms driving this patient's specific presentation\n4) Prognosis and fertility implications\n\nBe specific and reference the genomic and metabolomic data.`,
  fertility: `For this PCOS patient:\n\n${PATIENT_CONTEXT}\n\nProvide a fertility-focused analysis:\n1) How the specific variants (AMH rs10407022, FSHR rs6166, LHCGR rs13405728) affect fertility\n2) Ovarian reserve interpretation given AMH 8.7 ng/mL and PCOS context\n3) Recommended fertility treatment pathways given this genomic profile\n4) Lifestyle interventions most likely to improve ovarian function for this specific genetic makeup`,
};

const TABS = [
  { id: 'treatment', label: '💊 Treatment Plan' },
  { id: 'interpretation', label: '🔬 Clinical Interpretation' },
  { id: 'fertility', label: '🌸 Fertility Analysis' },
  { id: 'custom', label: '✦ Custom Query' },
];

const QUICK_QUESTIONS = [
  'What does CYP11A1 mean for my testosterone levels?',
  'How does my INSR variant affect diet choices?',
  'What is my PCOS phenotype?',
  'How does AMH 8.7 ng/mL relate to my PCOS?',
];

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export default function AIAnalysis() {
  const [activeTab, setActiveTab] = useState('treatment');
  const [customQuery, setCustomQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const outputRef = useRef(null);

  const keyMissing = !API_KEY || API_KEY === 'your_gemini_api_key_here';

  const getPrompt = () =>
    activeTab === 'custom'
      ? `${customQuery}\n\nPatient context:\n${PATIENT_CONTEXT}`
      : PROMPTS[activeTab];

  const runAnalysis = async () => {
    if (activeTab === 'custom' && !customQuery.trim()) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const response = await model.generateContent(getPrompt());
      setResult(response.response.text());
      setTimeout(() => outputRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const contextChips = [
    { label: 'LH: 18.4 mIU/mL ↑', cls: 'badge-rose' },
    { label: 'Testosterone: 92 ng/dL ↑', cls: 'badge-rose' },
    { label: 'HOMA-IR: 6.1 ↑', cls: 'badge-amber' },
    { label: 'CYP11A1 variant', cls: 'badge-indigo' },
    { label: 'AMH: 8.7 ↑', cls: 'badge-rose' },
    { label: 'FSHR rs6166', cls: 'badge-indigo' },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">AI-Powered Analysis</h1>
        <p className="page-sub">Gemini Flash · Clinical interpretation of your complete bioinformatics profile</p>
      </div>

      {/* Gemini badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: 'linear-gradient(135deg, #4A5BE8, #0E9B8A)',
        color: 'white', borderRadius: 100, padding: '5px 14px',
        fontSize: 12, fontWeight: 600, marginBottom: 20,
        boxShadow: '0 2px 10px rgba(74,91,232,0.25)',
      }}>
        ✦ Powered by Gemini 2.0 Flash
      </div>

      {/* Missing key warning */}
      {keyMissing && (
        <div style={{
          background: 'var(--amber-pale)', border: '1px solid var(--amber)',
          borderRadius: 12, padding: '14px 18px', marginBottom: 20,
          fontSize: 13, color: 'var(--ink-mid)', lineHeight: 1.6,
        }}>
          <strong style={{ color: 'var(--amber)' }}>🔑 API key not set</strong> · Open{' '}
          <code style={{ background: 'rgba(0,0,0,0.06)', padding: '1px 6px', borderRadius: 4 }}>.env</code>{' '}
          and replace <code style={{ background: 'rgba(0,0,0,0.06)', padding: '1px 6px', borderRadius: 4 }}>your_gemini_api_key_here</code>{' '}
          with your key from{' '}
          <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer"
            style={{ color: 'var(--indigo)', fontWeight: 600 }}>
            aistudio.google.com
          </a>
          , then restart <code>npm run dev</code>.
        </div>
      )}

      <div className="grid-2-1">
        {/* Left: Query Builder */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="card">
            <div className="card-header">
              <div className="card-title">Analysis Type</div>
            </div>
            <div className="card-body">
              <div className="analysis-tabs">
                {TABS.map(t => (
                  <button
                    key={t.id}
                    className={`analysis-tab ${activeTab === t.id ? 'active' : ''}`}
                    onClick={() => { setActiveTab(t.id); setResult(null); setError(null); }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {activeTab === 'custom' ? (
                <div>
                  <div style={{ border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px', marginBottom: 12 }}>
                    <textarea
                      className="query-input"
                      value={customQuery}
                      onChange={e => setCustomQuery(e.target.value)}
                      placeholder="e.g. What does the CYP11A1 variant mean for this patient's androgen levels?"
                    />
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-light)', marginBottom: 10 }}>Quick questions:</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 16 }}>
                    {QUICK_QUESTIONS.map((q, i) => (
                      <button key={i} onClick={() => setCustomQuery(q)} style={{
                        border: '1px solid var(--border)', background: 'var(--surface)',
                        borderRadius: 20, padding: '5px 12px', fontSize: 12, cursor: 'pointer',
                        color: 'var(--ink-mid)', fontFamily: "'Instrument Sans', sans-serif",
                        transition: 'all 0.12s',
                      }}>
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 10, padding: '12px 14px', marginBottom: 16,
                  fontFamily: "'DM Mono', monospace", fontSize: 11.5, color: 'var(--ink-light)',
                  lineHeight: 1.7, maxHeight: 110, overflow: 'hidden',
                }}>
                  {PROMPTS[activeTab]?.slice(0, 260)}...
                </div>
              )}

              <button
                className="btn-primary btn-full"
                onClick={runAnalysis}
                disabled={loading || keyMissing || (activeTab === 'custom' && !customQuery.trim())}
              >
                {loading
                  ? <><span className="spinner">⟳</span> Gemini is analyzing...</>
                  : <>✦ Run AI Analysis</>}
              </button>
            </div>
          </div>

          {/* Context Chips */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Patient Context Included</div>
              <span className="card-badge badge-teal">AUTO</span>
            </div>
            <div className="card-body">
              <div className="context-chips">
                {contextChips.map((c, i) => (
                  <span key={i} className={`card-badge ${c.cls}`}>{c.label}</span>
                ))}
              </div>
              <p style={{ fontSize: 12, color: 'var(--ink-light)', marginTop: 8 }}>
                All hormone values, genomic variants, metabolomics data, and pathway scores are automatically included.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Output */}
        <div className="card" ref={outputRef}>
          <div className="card-header">
            <div>
              <div className="card-title">Analysis Output</div>
              <div className="card-sub">Gemini 2.0 Flash</div>
            </div>
            {result && <span className="card-badge badge-teal">COMPLETE</span>}
            {error && <span className="card-badge badge-rose">ERROR</span>}
          </div>
          <div className="card-body">
            {!result && !loading && !error && (
              <div className="ai-empty">
                <div className="ai-empty-icon">✦</div>
                <div className="ai-empty-title">Select an analysis type and run</div>
                <div className="ai-empty-sub">Gemini will interpret your patient's complete bioinformatics profile</div>
              </div>
            )}
            {loading && (
              <div className="ai-empty">
                <div className="ai-empty-icon"><span className="spinner" style={{ fontSize: 32 }}>⟳</span></div>
                <div className="ai-empty-title">Gemini is analyzing...</div>
                <div className="ai-empty-sub">Correlating biomarkers, variants, and pathway enrichment data</div>
              </div>
            )}
            {error && (
              <div style={{ padding: 16, background: 'var(--rose-pale)', borderRadius: 8 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--rose)', marginBottom: 6 }}>Analysis Error</div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-mid)', lineHeight: 1.6 }}>{error}</div>
              </div>
            )}
            {result && <div className="ai-output">{result}</div>}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{
        marginTop: 8, padding: '12px 16px', background: 'var(--amber-pale)',
        borderRadius: 10, border: '1px solid var(--amber)',
        fontSize: 12, color: 'var(--ink-mid)', lineHeight: 1.6,
      }}>
        <strong style={{ color: 'var(--amber)' }}>⚠ Medical Disclaimer</strong> · For research and informational purposes only. Not a substitute for professional medical advice.
      </div>
    </div>
  );
}
