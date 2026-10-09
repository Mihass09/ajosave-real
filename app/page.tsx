"use client";
import { useState } from "react";

type Group = { id: string; name: string; amount: number; members: number; cycle: string; nextPayout: string; youPaid: boolean; }

export default function AjoSaveApp() {
  const [page, setPage] = useState<"landing" | "dashboard">("landing");
  const [groups, setGroups] = useState<Group[]>([
    { id: "1", name: "Lagos Hustlers", amount: 50000, members: 10, cycle: "Weekly", nextPayout: "You in 3 weeks", youPaid: false },
    { id: "2", name: "Abuja Tech Savers", amount: 20000, members: 5, cycle: "Monthly", nextPayout: "You next!", youPaid: true },
  ]);
  const [showCreate, setShowCreate] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: "", amount: "", members: "" });

  const createGroup = () => {
    if(!newGroup.name || !newGroup.amount) return;
    setGroups([{ id: Date.now().toString(), name: newGroup.name, amount: Number(newGroup.amount), members: Number(newGroup.members)||5, cycle: "Monthly", nextPayout: "You in 2 weeks", youPaid: false }, ...groups]);
    setNewGroup({ name: "", amount: "", members: "" }); setShowCreate(false); setPage("dashboard");
  };

  const s = {
    page: { minHeight: "100vh", fontFamily: "system-ui, sans-serif", background: "#f0fdf4" } as any,
    nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" } as any,
    logo: { fontWeight: 900, fontSize: 24, color: "#065f46" } as any,
    btn: { background: "#059669", color: "white", border: "none", padding: "12px 24px", borderRadius: 999, fontWeight: 700, cursor: "pointer" } as any,
    hero: { textAlign: "center" as const, padding: "60px 20px", maxWidth: 800, margin: "0 auto" },
    h1: { fontSize: 48, fontWeight: 900, lineHeight: 1.1, color: "#111" } as any,
    card: { background: "white", padding: 20, borderRadius: 16, boxShadow: "0 2px 10px rgba(0,0,0,0.05)", marginBottom: 16 } as any,
  };

  if(page === "landing"){
    return (
      <div style={s.page}>
        <div style={s.nav}><div style={s.logo}>AjoSave 🇳🇬</div><button style={s.btn} onClick={()=>setPage("dashboard")}>Launch App</button></div>
        <div style={s.hero}>
          <div style={{display:"inline-block", background:"white", padding:"6px 14px", borderRadius:999, fontSize:13, fontWeight:600, color:"#059669", marginBottom:20}}>Trusted by 2,000+ Nigerians 🇳🇬</div>
          <h1 style={s.h1}>Save Together,<br/><span style={{color:"#059669"}}>Grow Together</span></h1>
          <p style={{fontSize:18, color:"#4b5563", marginTop:20}}>Digitize your Ajo, Esusu, Adashe. Create groups, collect automatically, never miss payout.</p>
          <div style={{display:"flex", gap:12, justifyContent:"center", marginTop:30}}><button style={{...s.btn, padding:"16px 32px", fontSize:18}} onClick={()=>setPage("dashboard")}>Start Saving Free</button></div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16, marginTop:60, textAlign:"left" as const}}>
            {[{t:"Create Group", d:"Set amount, members, cycle in 30s"}, {t:"Auto Collect", d:"Members pay via transfer, we track"}, {t:"Fair Payout", d:"Rotational payout, transparent"}].map(c=><div key={c.t} style={s.card}><b>{c.t}</b><p style={{color:"#6b7280", marginTop:8, fontSize:14}}>{c.d}</p></div>)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight:"100vh", background:"#f9fafb", fontFamily:"system-ui"}}>
      <div style={s.nav}><div style={s.logo} onClick={()=>setPage("landing")}>AjoSave</div><button style={s.btn} onClick={()=>setShowCreate(true)}>+ New Group</button></div>
      <div style={{maxWidth:900, margin:"0 auto", padding:20}}>
        <h2 style={{fontSize:28, fontWeight:900}}>Good evening, Hassan 👋</h2><p style={{color:"#6b7280"}}>You have ₦{groups.reduce((a,g)=>a+g.amount,0).toLocaleString()} in active savings</p>
        <div style={{marginTop:24}}>
          {groups.map(g=>(
            <div key={g.id} style={s.card}>
              <div style={{display:"flex", justifyContent:"space-between"}}><b style={{fontSize:18}}>{g.name}</b><span style={{background:g.youPaid?"#dcfce7":"#ffedd5", color:g.youPaid?"#166534":"#9a3412", padding:"4px 12px", borderRadius:999, fontSize:11, fontWeight:700}}>{g.youPaid?"PAID":"PAY NOW"}</span></div>
              <div style={{display:"flex", gap:20, marginTop:16, fontSize:14}}><div><div style={{color:"#6b7280"}}>Amount</div><b>₦{g.amount.toLocaleString()}</b></div><div><div style={{color:"#6b7280"}}>Members</div><b>{g.members}</b></div><div><div style={{color:"#6b7280"}}>Cycle</div><b>{g.cycle}</b></div></div>
              <div style={{marginTop:12, background:"#ecfdf5", padding:10, borderRadius:10, fontSize:13}}><span>Next payout: </span><b style={{color:"#059669"}}>{g.nextPayout}</b></div>
              {!g.youPaid && <button onClick={()=>setGroups(groups.map(x=>x.id===g.id?{...x, youPaid:true}:x))} style={{width:"100%", marginTop:12, background:"#111", color:"white", padding:12, borderRadius:10, fontWeight:700, border:"none"}}>Mark as Paid ₦{g.amount.toLocaleString()}</button>}
            </div>
          ))}
        </div>
      </div>
      {showCreate && (
        <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", padding:20}}><div style={{background:"white", width:"100%", maxWidth:400, borderRadius:20, padding:24}}>
          <h3 style={{fontSize:20, fontWeight:900}}>Create Ajo Group</h3>
          <input value={newGroup.name} onChange={e=>setNewGroup({...newGroup, name:e.target.value})} placeholder="Group Name e.g. Abuja Savers" style={{width:"100%", marginTop:16, border:"1px solid #ddd", padding:12, borderRadius:10}}/>
          <input value={newGroup.amount} onChange={e=>setNewGroup({...newGroup, amount:e.target.value})} placeholder="Amount e.g. 20000" type="number" style={{width:"100%", marginTop:10, border:"1px solid #ddd", padding:12, borderRadius:10}}/>
          <input value={newGroup.members} onChange={e=>setNewGroup({...newGroup, members:e.target.value})} placeholder="Members e.g. 10" type="number" style={{width:"100%", marginTop:10, border:"1px solid #ddd", padding:12, borderRadius:10}}/>
          <div style={{display:"flex", gap:10, marginTop:20}}><button onClick={()=>setShowCreate(false)} style={{flex:1, background:"#f3f4f6", padding:12, borderRadius:10, border:"none", fontWeight:700}}>Cancel</button><button onClick={createGroup} style={{flex:1, background:"#059669", color:"white", padding:12, borderRadius:10, border:"none", fontWeight:700}}>Create</button></div>
        </div></div>
      )}
    </div>
  )
}
