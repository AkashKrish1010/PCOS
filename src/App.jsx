import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Genomics from './pages/Genomics';
import Metabolomics from './pages/Metabolomics';
import AIAnalysis from './pages/AIAnalysis';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Overview', icon: '◉' },
  { id: 'genomics', label: 'Genomics', icon: '🧬' },
  { id: 'metabolomics', label: 'Metabolomics', icon: '⚗️' },
  { id: 'ai', label: 'AI Analysis', icon: '✦', badge: 'NEW' },
];

const PATIENT_NAV = [
  { id: 'profile', label: 'Profile', icon: '👤' },
  { id: 'history', label: 'History', icon: '📋' },
  { id: 'reports', label: 'Reports', icon: '📄' },
];

function ExportModal({ onClose }) {
  const [exported, setExported] = useState(null);

  const handleExport = (type) => {
    setExported(type);
    setTimeout(() => { setExported(null); onClose(); }, 1200);
  };

  const options = [
    { id: 'pdf', icon: '📄', title: 'PDF Clinical Report', sub: 'Full patient summary with all biomarkers and genomics' },
    { id: 'csv', icon: '📊', title: 'CSV Data Export', sub: 'Raw data for all hormone values, variants, and metabolites' },
    { id: 'json', icon: '{ }', title: 'JSON API Export', sub: 'Machine-readable format for EHR integration' },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-title">Export Report</div>
        <div className="modal-sub">Patient PCOS-2847 · Updated March 5, 2026</div>
        <div className="modal-options">
          {options.map(o => (
            <div key={o.id} className="modal-option" onClick={() => handleExport(o.id)}>
              <div className="modal-option-icon">{exported === o.id ? '✅' : o.icon}</div>
              <div>
                <div className="modal-option-title">{exported === o.id ? 'Exported!' : o.title}</div>
                <div className="modal-option-sub">{o.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="modal-close" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [showExport, setShowExport] = useState(false);

  const pages = {
    dashboard: <Dashboard />,
    genomics: <Genomics />,
    metabolomics: <Metabolomics />,
    ai: <AIAnalysis />,
  };

  return (
    <>
      <div className="app">
        {/* Header */}
        <header className="header">
          <a className="header-logo" href="#" onClick={e => { e.preventDefault(); setPage('dashboard'); }}>
            <div className="logo-icon">⬡</div>
            <span className="logo-text">PCOSight</span>
            <span className="logo-badge">BIOINFORMATICS</span>
          </a>

          <nav className="header-nav">
            {NAV_ITEMS.map(n => (
              <button
                key={n.id}
                className={`header-nav-btn ${page === n.id ? 'active' : ''}`}
                onClick={() => setPage(n.id)}
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="header-actions">
            <button className="btn-export" onClick={() => setShowExport(true)}>
              ↓ Export Report
            </button>
            <div className="avatar" title="Patient: PCOS-2847">SP</div>
          </div>
        </header>

        {/* Body */}
        <div className="layout">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-label">Navigation</div>
            {NAV_ITEMS.map(n => (
              <button
                key={n.id}
                className={`nav-item ${page === n.id ? 'active' : ''}`}
                onClick={() => setPage(n.id)}
              >
                <span className="nav-icon">{n.icon}</span>
                {n.label}
                {n.badge && <span className="nav-badge">{n.badge}</span>}
              </button>
            ))}

            <div className="sidebar-label">Patient</div>
            {PATIENT_NAV.map(n => (
              <button key={n.id} className="nav-item" onClick={() => {}}>
                <span className="nav-icon">{n.icon}</span>
                {n.label}
              </button>
            ))}

            <div className="sidebar-label">Settings</div>
            <button className="nav-item">
              <span className="nav-icon">⚙️</span>
              Preferences
            </button>

            {/* Patient card */}
            <div style={{
              marginTop: 'auto', padding: '12px', background: 'var(--surface)',
              borderRadius: 10, border: '1px solid var(--border)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0E9B8A, #4A5BE8)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: 12, fontWeight: 700,
                }}>SP</div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink)' }}>Sachin P.</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-light)' }}>PCOS-2847</div>
                </div>
              </div>
              <div style={{
                marginTop: 10, display: 'flex', alignItems: 'center', gap: 6,
                padding: '5px 8px', background: 'var(--rose-pale)', borderRadius: 7,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--rose)' }} />
                <span style={{ fontSize: 11, color: 'var(--rose)', fontWeight: 600 }}>High Risk · 74/100</span>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="main-content">
            {pages[page]}
          </main>
        </div>
      </div>

      {showExport && <ExportModal onClose={() => setShowExport(false)} />}
    </>
  );
}
