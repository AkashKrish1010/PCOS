import { useState } from 'react';
import {
  metabolites, metabolitePathways, insulinResistanceMarkers
} from '../data/patientData';
import {
  ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Tooltip
} from 'recharts';

const radarData = [
  { subject: 'Glucose', value: 78 },
  { subject: 'Insulin', value: 95 },
  { subject: 'Testosterone', value: 88 },
  { subject: 'Cortisol', value: 62 },
  { subject: 'SHBG', value: 30 },
  { subject: 'Adiponectin', value: 35 },
];

export default function Metabolomics() {
  const [selected, setSelected] = useState(null);

  const summaryCards = [
    { title: 'Total Metabolites Assayed', value: '312', badge: 'badge-indigo', badgeText: 'FULL PANEL' },
    { title: 'Significantly Dysregulated', value: '23', badge: 'badge-rose', badgeText: 'p < 0.05' },
    { title: 'Upregulated', value: '16', badge: 'badge-amber', badgeText: '↑ HIGH' },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Metabolomics & Pathway Mapping</h1>
        <p className="page-sub">LC-MS/MS serum metabolomics · 23 dysregulated metabolites detected</p>
      </div>

      {/* Summary */}
      <div className="grid-3">
        {summaryCards.map((s, i) => (
          <div key={i} className="card">
            <div className="card-body" style={{ textAlign: 'center', padding: '24px 20px' }}>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, color: 'var(--ink)', lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-mid)', margin: '8px 0 10px' }}>{s.title}</div>
              <span className={`card-badge ${s.badge}`}>{s.badgeText}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2-1">
        {/* Metabolite Tiles */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Key Dysregulated Metabolites</div>
              <div className="card-sub">Relative to healthy PCOS-negative reference cohort (n=120)</div>
            </div>
            <span className="card-badge badge-teal">LC-MS/MS</span>
          </div>
          <div className="card-body">
            <div className="metabolite-grid">
              {metabolites.map((m, i) => (
                <div
                  key={i}
                  className="metabolite-tile"
                  style={selected === i ? { borderColor: 'var(--indigo)', background: 'var(--indigo-pale)' } : {}}
                  onClick={() => setSelected(selected === i ? null : i)}
                >
                  <div className="metabolite-compound">{m.name}</div>
                  <div className="metabolite-value">
                    {m.value}<span className="metabolite-unit">{m.unit}</span>
                  </div>
                  <div className={`metabolite-delta ${m.up ? 'delta-up' : 'delta-down'}`}>
                    {m.delta} vs reference
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Metabolite Profile Radar</div>
            <div className="card-sub">% of pathological threshold</div>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={230}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#E4E0DC" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#6B6480' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Patient" dataKey="value" stroke="#E8455A" fill="#E8455A" fillOpacity={0.18}
                  strokeWidth={2} dot={{ r: 3, fill: '#E8455A' }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E4E0DC', fontSize: 12 }}
                  formatter={(v) => [`${v}%`, 'Level']} />
              </RadarChart>
            </ResponsiveContainer>
            <div style={{ fontSize: 11.5, color: 'var(--ink-light)', textAlign: 'center', marginTop: 8 }}>
              Higher values indicate greater deviation from healthy reference
            </div>
          </div>
        </div>
      </div>

      <div className="grid-equal">
        {/* Pathway Enrichment */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Top Dysregulated Pathways</div>
              <div className="card-sub">Metabolite Set Enrichment Analysis</div>
            </div>
            <span className="card-badge badge-rose">MSEA</span>
          </div>
          <div className="card-body">
            <div className="pathway-list">
              {metabolitePathways.map((p, i) => (
                <div key={i} className="pathway-item">
                  <div className="pathway-dot" style={{ background: p.color }} />
                  <div style={{ flex: 1 }}>
                    <div className="pathway-name">{p.name}</div>
                    <div className="pathway-genes">{p.metabolites} metabolites enriched</div>
                  </div>
                  <div className="pathway-score" style={{ color: p.color }}>{p.score.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* IR Markers */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Insulin Resistance Markers</div>
              <div className="card-sub">HOMA-IR and related indices</div>
            </div>
            <span className="card-badge badge-rose">HOMA-IR 6.1</span>
          </div>
          <div className="card-body">
            <div className="ir-list">
              {insulinResistanceMarkers.map((m, i) => {
                const pct = (m.value / m.max) * 100;
                const danger = m.value > m.threshold;
                return (
                  <div key={i} className="ir-item">
                    <span className="ir-label">{m.label}</span>
                    <div className="ir-track">
                      <div className="ir-fill"
                        style={{ width: `${pct}%`, background: danger ? '#E8455A' : '#0E9B8A' }} />
                    </div>
                    <span className={`ir-val ${danger ? 'ir-danger' : 'ir-ok'}`}>
                      {m.value}{m.unit ? ` ${m.unit}` : ''}
                    </span>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 16, padding: '10px 12px', background: 'var(--rose-pale)', borderRadius: 8, fontSize: 12, color: 'var(--ink-mid)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--rose)' }}>⚠ Moderate-Severe IR</strong> · HOMA-IR ≥6.1 indicates significant insulin resistance. Combined with INSR variant (rs2059806), targeted glycemic management is strongly recommended.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
