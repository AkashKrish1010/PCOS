import { useState } from 'react';
import { hormones, alerts, riskFactors, lhTrend, insulinTrend, trendLabels } from '../data/patientData';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

function RiskRing({ score, animated }) {
  const r = 52, cx = 70, cy = 70;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (animated ? score / 100 : 0) * circumference;
  const color = score > 70 ? '#E8455A' : score > 50 ? '#E8943A' : '#0E9B8A';
  return (
    <svg viewBox="0 0 140 140" style={{ width: 140, height: 140 }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F2F0ED" strokeWidth="10" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="10"
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round" transform="rotate(-90 70 70)"
        style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)' }} />
    </svg>
  );
}

const lhChartData = trendLabels.map((m, i) => ({ month: m, value: lhTrend[i] }));
const insulinChartData = trendLabels.map((m, i) => ({ month: m, value: insulinTrend[i] }));

export default function Dashboard() {
  const [animated, setAnimated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // trigger animation on mount
  useState(() => { setTimeout(() => setAnimated(true), 150); });

  const stats = [
    { label: 'Risk Score', value: '74', suffix: '/100', change: '↑ +6 vs last cycle', dir: 'down', cls: 'rose' },
    { label: 'Variants Found', value: '6', suffix: ' SNPs', change: '3 high-impact', dir: 'neutral', cls: 'indigo' },
    { label: 'Dysreg. Metabolites', value: '23', suffix: '', change: '↑ +4 this cycle', dir: 'down', cls: 'amber' },
    { label: 'LH:FSH Ratio', value: '4.4', suffix: ':1', change: 'Threshold >2.0', dir: 'down', cls: 'teal' },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Patient Overview</h1>
        <p className="page-sub">Patient ID: PCOS-2847 · Updated March 5, 2026 · Report cycle #4</p>
      </div>

      {/* Stats */}
      <div className="stat-grid">
        {stats.map((s, i) => (
          <div key={i} className={`stat-card ${s.cls}`}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}<span className="stat-suffix">{s.suffix}</span></div>
            <div className={`stat-change ${s.dir}`}>{s.change}</div>
          </div>
        ))}
      </div>

      {/* Hormones + Risk */}
      <div className="grid-2-1">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Hormone Biomarker Panel</div>
              <div className="card-sub">vs. reference range midpoint</div>
            </div>
            <span className="card-badge badge-rose">ABNORMAL × 4</span>
          </div>
          <div className="card-body">
            <div className="hormone-bars">
              {hormones.map((h, i) => (
                <div key={i} className="hormone-row">
                  <span className="hormone-name">{h.name}</span>
                  <div className="hormone-track">
                    <div className="hormone-fill"
                      style={{ width: animated ? `${h.pct}%` : '0%', background: h.color }} />
                    <div className="hormone-ref" />
                  </div>
                  <span className="hormone-val">{h.value} {h.unit}</span>
                  <span className={`hormone-status status-${h.status.toLowerCase()}`}>{h.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">AI Risk Score</div>
              <div className="card-sub">Composite bioinformatics index</div>
            </div>
            <span className="card-badge badge-rose">HIGH</span>
          </div>
          <div className="card-body">
            <div className="risk-display">
              <div className="risk-ring-wrap">
                <RiskRing score={74} animated={animated} />
                <div className="risk-ring-label">
                  <div className="risk-score-num">74</div>
                  <div className="risk-score-sub">out of 100</div>
                </div>
              </div>
              <div className="risk-tier" style={{ color: '#E8455A' }}>⬤ High Risk</div>
              <div className="risk-factors">
                {riskFactors.map((rf, i) => (
                  <div key={i} className="risk-factor-row">
                    <span className="risk-factor-label">{rf.label}</span>
                    <span className="risk-factor-pct">{Math.round(rf.value * 100)}%</span>
                    <div className="risk-factor-track">
                      <div className="risk-factor-fill"
                        style={{ width: animated ? `${rf.value * 100}%` : '0%', background: rf.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts + Timeline Charts */}
      <div className="grid-equal">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Clinical Alerts</div>
            <span className="card-badge badge-rose">3 ACTIVE</span>
          </div>
          <div className="card-body">
            <div className="alerts">
              {alerts.map((a, i) => (
                <div key={i} className={`alert-item ${a.type}`}>
                  <span className="alert-icon">{a.icon}</span>
                  <div>
                    <div className="alert-title">{a.title}</div>
                    <div className="alert-body">{a.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">LH Trend (6-month)</div>
                <div className="card-sub">Luteinizing hormone mIU/mL</div>
              </div>
              <span className="card-badge badge-rose">↑ RISING</span>
            </div>
            <div className="card-body" style={{ paddingBottom: 8 }}>
              <ResponsiveContainer width="100%" height={90}>
                <AreaChart data={lhChartData} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                  <defs>
                    <linearGradient id="lhGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E8455A" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#E8455A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F2F0ED" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#6B6480' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#6B6480' }} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E4E0DC', fontSize: 12 }} />
                  <Area type="monotone" dataKey="value" stroke="#E8455A" strokeWidth={2}
                    fill="url(#lhGrad)" dot={{ r: 3, fill: '#E8455A' }} name="LH (mIU/mL)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Insulin Trend (6-month)</div>
                <div className="card-sub">Fasting insulin μIU/mL</div>
              </div>
              <span className="card-badge badge-amber">↑ ELEVATED</span>
            </div>
            <div className="card-body" style={{ paddingBottom: 8 }}>
              <ResponsiveContainer width="100%" height={90}>
                <AreaChart data={insulinChartData} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                  <defs>
                    <linearGradient id="insGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4871F" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#D4871F" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F2F0ED" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#6B6480' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#6B6480' }} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E4E0DC', fontSize: 12 }} />
                  <Area type="monotone" dataKey="value" stroke="#D4871F" strokeWidth={2}
                    fill="url(#insGrad)" dot={{ r: 3, fill: '#D4871F' }} name="Insulin (μIU/mL)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
