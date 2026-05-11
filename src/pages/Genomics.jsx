import { genes, pathways, timelineEvents } from '../data/patientData';

export default function Genomics() {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Genomic & Variant Analysis</h1>
        <p className="page-sub">Whole genome sequencing · GWAS-matched · 6 significant variants identified</p>
      </div>

      {/* Gene Table */}
      <div className="card mb-18">
        <div className="card-header">
          <div>
            <div className="card-title">PCOS-Associated Gene Variants</div>
            <div className="card-sub">SNP analysis against curated PCOS GWAS database</div>
          </div>
          <span className="card-badge badge-indigo">WGS DATA</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="gene-table">
            <thead>
              <tr>
                <th>Gene</th>
                <th>Chromosome</th>
                <th>Variant (rsID)</th>
                <th>Fold Change</th>
                <th>p-value</th>
                <th>Phenotype</th>
                <th>Association</th>
              </tr>
            </thead>
            <tbody>
              {genes.map((g, i) => (
                <tr key={i}>
                  <td><span className="gene-name">{g.name}</span></td>
                  <td>{g.chromosome}</td>
                  <td><span className="pval">{g.variant}</span></td>
                  <td>
                    <span className={g.foldChange > 0 ? 'fold-up' : 'fold-down'}>
                      {g.foldChange > 0 ? '+' : ''}{g.foldChange}x
                    </span>
                  </td>
                  <td><span className="pval">{g.pval}</span></td>
                  <td>{g.phenotype}</td>
                  <td>
                    <span className={g.association === 'Strong' ? 'assoc-strong' : 'assoc-moderate'}>
                      {g.association}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid-equal">
        {/* Pathway Enrichment */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Enriched Pathways</div>
              <div className="card-sub">Gene set enrichment score (NES)</div>
            </div>
            <span className="card-badge badge-indigo">TOP 5</span>
          </div>
          <div className="card-body">
            <div className="pathway-list">
              {pathways.map((p, i) => (
                <div key={i} className="pathway-item">
                  <div className="pathway-dot" style={{ background: p.color }} />
                  <div style={{ flex: 1 }}>
                    <div className="pathway-name">{p.name}</div>
                    <div className="pathway-genes">{p.genes} genes enriched</div>
                  </div>
                  <div className="pathway-score" style={{ color: p.color }}>{p.score.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Analysis Timeline</div>
              <div className="card-sub">Diagnostic history</div>
            </div>
          </div>
          <div className="card-body">
            <div className="timeline">
              {timelineEvents.map((ev, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot-col">
                    <div className="timeline-dot" style={{ background: ev.color }} />
                    <div className="timeline-line" />
                  </div>
                  <div>
                    <div className="timeline-date">{ev.date}</div>
                    <div className="timeline-event">{ev.event}</div>
                    <div className="timeline-detail">{ev.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* GWAS Insight Cards */}
      <div className="grid-3">
        {[
          { gene: 'CYP11A1', title: 'Androgen Synthesis', desc: 'rs4077582 variant is the strongest PCOS signal found. This gene controls how androgens (male hormones) are produced in the ovaries. Your variant leads to overproduction — directly linked to elevated testosterone.', color: '#E8455A', badge: 'badge-rose' },
          { gene: 'INSR', title: 'Insulin Signaling', desc: 'rs2059806 variant impairs how your cells respond to insulin. This explains your HOMA-IR of 6.1 and elevated fasting insulin. Dietary interventions targeting glycemic load have outsized impact for this variant.', color: '#D4871F', badge: 'badge-amber' },
          { gene: 'FSHR', title: 'LH/FSH Sensitivity', desc: 'rs6166 variant alters the FSH receptor, contributing to the high LH:FSH ratio of 4.4:1. This dysregulation disrupts normal follicle development and is a core driver of your anovulatory pattern.', color: '#4A5BE8', badge: 'badge-indigo' },
        ].map((c, i) => (
          <div key={i} className="card">
            <div className="card-header">
              <div>
                <div className="card-title">🧬 {c.gene}</div>
                <div className="card-sub">{c.title}</div>
              </div>
              <span className={`card-badge ${c.badge}`}>VARIANT</span>
            </div>
            <div className="card-body">
              <p style={{ fontSize: 12.5, color: 'var(--ink-mid)', lineHeight: 1.7 }}>{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
