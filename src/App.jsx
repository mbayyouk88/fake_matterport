import React, { useState, useEffect, useRef } from 'react';


const MATTERPORT_URL = "https://my.matterport.com/show/?m=UDw2UanapEg&play=1&qs=1&brand=0";

const initialSite = {
  zoning: "", floodZone: "", environmental: "", siteArea: "", lotShape: "",
  topography: "", utilities: "", amenities: "", adverseSite: ""
};
const initialNeighborhood = {
  location: "", builtUp: "", trend: "", marketTime: "", priceMin: "", priceMax: "",
  landUse: "", boundaries: "", influences: "", notes: ""
};
const initialImprovements = {
  constructionType: "", quality: "", condition: "", yearBuilt: "", stories: "",
  totalRooms: "", bedrooms: "", bathrooms: "", gla: "", foundation: "",
  basementFinish: "", roofMaterial: "", roofCondition: "", exteriorWalls: "",
  hvac: "", interiorFinish: "", adverseConditions: "", description: ""
};

const tabs = ["Site Inspection", "Neighborhood", "Improvements"];

const uadQuality = ["Q1","Q2","Q3","Q4","Q5","Q6"];
const uadCondition = ["C1","C2","C3","C4","C5","C6"];

function Field({ label, value, onChange, type = "text", options, half }) {
  const style = {
    display: "flex", flexDirection: "column", gap: 3,
    flex: half ? "0 0 calc(50% - 4px)" : "1 1 100%"
  };
  return (
    <div style={style}>
      <label style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
      {options ? (
        <select value={value} onChange={e => onChange(e.target.value)}
          style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 6, color: "#f1f5f9", padding: "6px 8px", fontSize: 13 }}>
          <option value="">Select...</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={3}
          style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 6, color: "#f1f5f9", padding: "6px 8px", fontSize: 13, resize: "vertical" }} />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)}
          style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 6, color: "#f1f5f9", padding: "6px 8px", fontSize: 13 }} />
      )}
    </div>
  );
}

function SiteTab({ form, setForm }) {
  const set = k => v => setForm(f => ({ ...f, [k]: v }));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <SectionHeader title="Zoning & Legal" />
      <Row>
        <Field label="Zoning Classification" value={form.zoning} onChange={set("zoning")} half />
        <Field label="Flood Zone" value={form.floodZone} onChange={set("floodZone")} options={["Zone X","Zone AE","Zone A","Zone VE","Zone D","Unknown"]} half />
      </Row>
      <Field label="Environmental Issues" value={form.environmental} onChange={set("environmental")} options={["None Observed","Suspected — Note Below","Confirmed — Note Below"]} />
      <SectionHeader title="Site Characteristics" />
      <Row>
        <Field label="Site Area (sq ft or acres)" value={form.siteArea} onChange={set("siteArea")} half />
        <Field label="Lot Shape" value={form.lotShape} onChange={set("lotShape")} options={["Regular","Irregular","Triangular","Flag Lot"]} half />
      </Row>
      <Field label="Topography" value={form.topography} onChange={set("topography")} options={["Level","Gently Rolling","Sloped","Steeply Sloped"]} />
      <Field label="Utilities" value={form.utilities} onChange={set("utilities")} options={["Public Water & Sewer","Well & Septic","Public Water / Septic","Well / Public Sewer","Mixed"]} />
      <Field label="Site Amenities" value={form.amenities} onChange={set("amenities")} />
      <SectionHeader title="Adverse Site Conditions" />
      <Field label="Describe any adverse site conditions" value={form.adverseSite} onChange={set("adverseSite")} type="textarea" />
    </div>
  );
}

function NeighborhoodTab({ form, setForm }) {
  const set = k => v => setForm(f => ({ ...f, [k]: v }));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <SectionHeader title="Market Area" />
      <Row>
        <Field label="Location Type" value={form.location} onChange={set("location")} options={["Urban","Suburban","Rural"]} half />
        <Field label="Built-Up %" value={form.builtUp} onChange={set("builtUp")} options={["Over 75%","25-75%","Under 25%"]} half />
      </Row>
      <Row>
        <Field label="Market Trend" value={form.trend} onChange={set("trend")} options={["Increasing","Stable","Declining"]} half />
        <Field label="Marketing Time" value={form.marketTime} onChange={set("marketTime")} options={["Under 3 Months","3-6 Months","Over 6 Months"]} half />
      </Row>
      <Row>
        <Field label="Price Range — Min ($)" value={form.priceMin} onChange={set("priceMin")} type="number" half />
        <Field label="Price Range — Max ($)" value={form.priceMax} onChange={set("priceMax")} type="number" half />
      </Row>
      <SectionHeader title="Land Use & Influences" />
      <Field label="Predominant Land Use" value={form.landUse} onChange={set("landUse")} options={["Single Family","2-4 Family","Multi-Family","Commercial","Mixed Use"]} />
      <Field label="Neighborhood Boundaries" value={form.boundaries} onChange={set("boundaries")} />
      <Field label="External Influences" value={form.influences} onChange={set("influences")} options={["None Noted","Highway/Traffic","Industrial","Commercial Encroachment","Other"]} />
      <Field label="Additional Notes" value={form.notes} onChange={set("notes")} type="textarea" />
    </div>
  );
}

function ImprovementsTab({ form, setForm }) {
  const set = k => v => setForm(f => ({ ...f, [k]: v }));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <SectionHeader title="Construction & Design" />
      <Row>
        <Field label="Construction Type" value={form.constructionType} onChange={set("constructionType")} options={["Site Built","Manufactured","Modular","Log"]} half />
        <Field label="Year Built" value={form.yearBuilt} onChange={set("yearBuilt")} type="number" half />
      </Row>
      <Row>
        <Field label="UAD Quality Rating" value={form.quality} onChange={set("quality")} options={uadQuality} half />
        <Field label="UAD Condition Rating" value={form.condition} onChange={set("condition")} options={uadCondition} half />
      </Row>
      <Row>
        <Field label="Stories" value={form.stories} onChange={set("stories")} options={["1","1.5","2","2.5","3","Split Level","Bi-Level"]} half />
        <Field label="Foundation" value={form.foundation} onChange={set("foundation")} options={["Slab","Crawl Space","Full Basement","Partial Basement","Pier & Beam"]} half />
      </Row>
      <SectionHeader title="Room Count & GLA" />
      <Row>
        <Field label="Total Rooms" value={form.totalRooms} onChange={set("totalRooms")} type="number" half />
        <Field label="Bedrooms" value={form.bedrooms} onChange={set("bedrooms")} type="number" half />
      </Row>
      <Row>
        <Field label="Bathrooms" value={form.bathrooms} onChange={set("bathrooms")} half />
        <Field label="Above-Grade GLA (sq ft)" value={form.gla} onChange={set("gla")} type="number" half />
      </Row>
      <Field label="Basement Finish %" value={form.basementFinish} onChange={set("basementFinish")} options={["N/A","0%","25%","50%","75%","100%"]} />
      <SectionHeader title="Exterior & Systems" />
      <Row>
        <Field label="Roof Material" value={form.roofMaterial} onChange={set("roofMaterial")} options={["Asphalt Shingle","Metal","Tile","Flat/Built-Up","Wood Shake","Slate"]} half />
        <Field label="Roof Condition" value={form.roofCondition} onChange={set("roofCondition")} options={["Good","Average","Fair","Poor"]} half />
      </Row>
      <Row>
        <Field label="Exterior Walls" value={form.exteriorWalls} onChange={set("exteriorWalls")} options={["Vinyl Siding","Brick","Stucco","Wood","Fiber Cement","Stone","Aluminum"]} half />
        <Field label="HVAC" value={form.hvac} onChange={set("hvac")} options={["Central A/C + Forced Air","Heat Pump","Radiant","Mini-Split","Window Units","None"]} half />
      </Row>
      <Field label="Interior Finish Level" value={form.interiorFinish} onChange={set("interiorFinish")} options={["Basic / Economy","Standard","Updated / Upgraded","High-End / Custom"]} />
      <SectionHeader title="Adverse Conditions" />
      <Field label="Observed Adverse Conditions" value={form.adverseConditions} onChange={set("adverseConditions")} options={["None Observed","Deferred Maintenance","Water Damage","Foundation Issues","Mold / Moisture","Structural Concerns","Multiple Issues"]} />
      <Field label="Overall Improvement Description" value={form.description} onChange={set("description")} type="textarea" />
    </div>
  );
}

function SectionHeader({ title }) {
  return (
    <div style={{ borderBottom: "1px solid #334155", paddingBottom: 4, marginTop: 6 }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.08em" }}>{title}</span>
    </div>
  );
}

function Row({ children }) {
  return <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{children}</div>;
}

function ExportModal({ onClose, site, neighborhood, improvements }) {
  const lines = [
    "=== SITE INSPECTION ===",
    ...Object.entries(site).map(([k,v]) => `${k}: ${v || "—"}`),
    "",
    "=== NEIGHBORHOOD ===",
    ...Object.entries(neighborhood).map(([k,v]) => `${k}: ${v || "—"}`),
    "",
    "=== IMPROVEMENTS ===",
    ...Object.entries(improvements).map(([k,v]) => `${k}: ${v || "—"}`),
  ].join("\n");

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ background:"#1e293b", borderRadius:12, padding:24, width:"min(600px,90vw)", maxHeight:"80vh", display:"flex", flexDirection:"column", gap:12 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ color:"#f1f5f9", fontWeight:700, fontSize:16 }}>Inspection Summary Export</span>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#94a3b8", fontSize:20, cursor:"pointer" }}>✕</button>
        </div>
        <textarea readOnly value={lines} style={{ flex:1, background:"#0f172a", border:"1px solid #334155", borderRadius:8, color:"#94a3b8", fontFamily:"monospace", fontSize:12, padding:12, resize:"none", minHeight:320 }} />
        <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
          <button onClick={() => { navigator.clipboard.writeText(lines); }} style={{ background:"#0284c7", border:"none", borderRadius:8, color:"#fff", padding:"8px 18px", cursor:"pointer", fontWeight:600 }}>Copy to Clipboard</button>
          <button onClick={onClose} style={{ background:"#334155", border:"none", borderRadius:8, color:"#f1f5f9", padding:"8px 18px", cursor:"pointer" }}>Close</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [site, setSite] = useState(initialSite);
  const [neighborhood, setNeighborhood] = useState(initialNeighborhood);
  const [improvements, setImprovements] = useState(initialImprovements);
  const [showExport, setShowExport] = useState(false);

  const completionCount = (obj) => Object.values(obj).filter(v => v !== "").length;
  const totalFields = Object.keys(initialSite).length + Object.keys(initialNeighborhood).length + Object.keys(initialImprovements).length;
  const filledFields = completionCount(site) + completionCount(neighborhood) + completionCount(improvements);
  const pct = Math.round((filledFields / totalFields) * 100);

  const tabData = [
    { label: "Site Inspection", filled: completionCount(site), total: Object.keys(initialSite).length },
    { label: "Neighborhood", filled: completionCount(neighborhood), total: Object.keys(initialNeighborhood).length },
    { label: "Improvements", filled: completionCount(improvements), total: Object.keys(initialImprovements).length },
  ];

  return (
    <div style={{ display:"flex", height:"100vh", background:"#0f172a", fontFamily:"'Segoe UI', system-ui, sans-serif", overflow:"hidden" }}>

      {/* LEFT — Matterport Embed */}
      <div style={{ flex:"0 0 62%", position:"relative", background:"#000" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:44, background:"rgba(15,23,42,0.92)", display:"flex", alignItems:"center", paddingLeft:16, gap:10, zIndex:10, borderBottom:"1px solid #1e293b" }}>
          <div style={{ width:28, height:28, background:"linear-gradient(135deg,#0ea5e9,#6366f1)", borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ color:"#fff", fontWeight:900, fontSize:13 }}>V</span>
          </div>
          <span style={{ color:"#f1f5f9", fontWeight:700, fontSize:15, letterSpacing:"0.05em" }}>VISTA</span>
          <span style={{ color:"#475569", fontSize:12, marginLeft:4 }}>Virtual Inspection & Site Tour Application</span>
        </div>
        <iframe
          src={MATTERPORT_URL}
          style={{ position:"absolute", top:44, left:0, right:0, bottom:0, width:"100%", height:"calc(100% - 44px)", border:"none" }}
          allow="xr-spatial-tracking; fullscreen"
          allowFullScreen
          title="Matterport Virtual Tour"
        />
      </div>

      {/* RIGHT — Inspection Panel */}
      <div style={{ flex:"0 0 38%", display:"flex", flexDirection:"column", background:"#0f172a", borderLeft:"1px solid #1e293b", overflow:"hidden" }}>

        {/* Progress bar */}
        <div style={{ padding:"10px 16px 0", borderBottom:"1px solid #1e293b" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
            <span style={{ color:"#94a3b8", fontSize:11, fontWeight:600 }}>INSPECTION PROGRESS</span>
            <span style={{ color: pct === 100 ? "#4ade80" : "#38bdf8", fontWeight:700, fontSize:12 }}>{pct}%</span>
          </div>
          <div style={{ height:4, background:"#1e293b", borderRadius:99, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${pct}%`, background: pct===100 ? "#4ade80" : "linear-gradient(90deg,#0ea5e9,#6366f1)", borderRadius:99, transition:"width 0.4s" }} />
          </div>

          {/* Tabs */}
          <div style={{ display:"flex", gap:4, marginTop:10, marginBottom:0 }}>
            {tabData.map((t, i) => (
              <button key={i} onClick={() => setActiveTab(i)}
                style={{
                  flex:1, padding:"7px 4px", border:"none", borderRadius:"6px 6px 0 0",
                  background: activeTab===i ? "#1e293b" : "transparent",
                  color: activeTab===i ? "#f1f5f9" : "#64748b",
                  fontWeight: activeTab===i ? 700 : 500,
                  fontSize:11, cursor:"pointer", transition:"all 0.2s",
                  borderBottom: activeTab===i ? "2px solid #0ea5e9" : "2px solid transparent",
                  position:"relative"
                }}>
                {t.label}
                <span style={{ display:"block", fontSize:10, color: t.filled===t.total ? "#4ade80" : "#64748b", marginTop:1 }}>
                  {t.filled}/{t.total}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div style={{ flex:1, overflowY:"auto", padding:16 }}>
          {activeTab===0 && <SiteTab form={site} setForm={setSite} />}
          {activeTab===1 && <NeighborhoodTab form={neighborhood} setForm={setNeighborhood} />}
          {activeTab===2 && <ImprovementsTab form={improvements} setForm={setImprovements} />}
        </div>

        {/* Footer */}
        <div style={{ padding:"10px 16px", borderTop:"1px solid #1e293b", display:"flex", gap:8 }}>
          <button onClick={() => { setSite(initialSite); setNeighborhood(initialNeighborhood); setImprovements(initialImprovements); }}
            style={{ flex:1, padding:"8px 0", background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#94a3b8", fontSize:12, cursor:"pointer", fontWeight:600 }}>
            Clear All
          </button>
          <button onClick={() => setShowExport(true)}
            style={{ flex:2, padding:"8px 0", background:"linear-gradient(135deg,#0ea5e9,#6366f1)", border:"none", borderRadius:8, color:"#fff", fontSize:13, cursor:"pointer", fontWeight:700 }}>
            Export Summary
          </button>
        </div>
      </div>

      {showExport && <ExportModal onClose={() => setShowExport(false)} site={site} neighborhood={neighborhood} improvements={improvements} />}
    </div>
  );
}

export default App;
