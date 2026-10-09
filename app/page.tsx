"use client";
import { useState, useEffect } from "react";
type Group = { id: string; name: string; amount: number; members: number; cycle: string; nextPayout: string; youPaid: boolean; }

export default function AjoSaveApp() {
  const [page, setPage] = useState<"landing" | "dashboard">("landing");
  const [groups, setGroups] = useState<Group[]>([
    { id: "1", name: "Lagos Hustlers", amount: 50000, members: 10, cycle: "Weekly", nextPayout: "You in 3 weeks", youPaid: false },
    { id: "2", name: "Abuja Tech Savers", amount: 20000, members: 5, cycle: "Monthly", nextPayout: "You next!", youPaid: true },
  ]);
  const [showCreate, setShowCreate] = useState(false);
  useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://js.paystack.co/v1/inline.js";
  script.async = true;
  document.body.appendChild(script);
}, []);

  const createGroup = () => {
    if(!newGroup.name || !newGroup.amount) return alert("Enter name & amount");
    setGroups([{ id: Date.now().toString(), name: newGroup.name, amount: Number(newGroup.amount), members: Number(newGroup.members)||5, cycle: "Monthly", nextPayout: "You in 2 weeks", youPaid: false }, ...groups]);
    setNewGroup({ name: "", amount: "", members: "" }); setShowCreate(false); setPage("dashboard");
  };

  const payWithPaystack = (g: Group) => {
    const ref = "AJO_"+Date.now();
    // @ts-ignore
    if(typeof window !== "undefined" && window.PaystackPop){
      // @ts-ignore
      const handler = window.PaystackPop.setup({
        key: 'pk_test_1a179d5141c428857ca205c3f61b164cb6df938b',
        email: 'favourbitrus254@gmail.com',
        amount: g.amount*100,
        ref: ref,
        callback: function(){ setGroups(prev=>prev.map(x=>x.id===g.id?{...x, youPaid:true}:x)); alert("Payment success! ₦"+g.amount.toLocaleString()) },
        onClose: function(){ alert("Payment closed") }
      });
    handler.openIframe();
    } else {
      // Demo mode
      if(confirm(`Pay ₦${g.amount.toLocaleString()} for ${g.name} with Paystack?\n( Demo - click OK to mark paid )`)){
        setGroups(prev=>prev.map(x=>x.id===g.id?{...x, youPaid:true}:x));
      }
    }
  };

  const shareWhatsApp = (g: Group) => {
    const text = `Join my Ajo group "${g.name}"! 💰 Save ₦${g.amount.toLocaleString()} ${g.cycle}. ${groups.length} members. Join here: https://ajosave-real.vercel.app - AjoSave 🇳🇬`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const s: any = {
    page: { minHeight: "100vh", fontFamily: "'Geist', 'Inter', system-ui, sans-serif", background: "#f0fdf4", letterSpacing: "-0.02em" },
    nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)", position: "sticky" as const, top: 0, zIndex: 10, borderBottom: "1px solid #e5e7eb" },
    logo: { fontWeight: 900, fontSize: 22, color: "#065f46", letterSpacing: "-1px" },
    btn: { background: "#059669", color: "white", border: "none", padding: "12px 24px", borderRadius: 999, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 14px rgba(5,150,105,0.3)" },
    btnBlack: { background: "#111827", color: "white", border: "none", padding: "12px 20px", borderRadius: 12, fontWeight: 800, cursor: "pointer", width: "100%" },
    hero: { textAlign: "center" as const, padding: "40px 20px", maxWidth: 800, margin: "0 auto" },
    h1: { fontSize: 44, fontWeight: 900, lineHeight: 0.95, color: "#111827", letterSpacing: "-2px" },
    card: { background: "white", padding: 20, borderRadius: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", marginBottom: 16, border: "1px solid #f3f4f6" },
  };

  if(page === "landing"){
    return (
      <div style={s.page}>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@800;900&display=swap" rel="stylesheet" />
        <script src="https://js.paystack.co/v1/inline.js" async></script>
        <div style={s.nav}><div style={s.logo}>AjoSave 🇳🇬</div><button style={s.btn} onClick={()=>setPage("dashboard")}>Launch App</button></div>
        <div style={s.hero}>
          <div style={{display:"inline-flex", alignItems:"center", gap:6, background:"white", padding:"8px 16px", borderRadius:999, fontSize:12, fontWeight:800, color:"#059669", marginBottom:20, border:"1px solid #d1fae5", boxShadow:"0 1px 2px rgba(0,0,0,0.05)"}}>● Trusted by 2,000+ Nigerians 🇳🇬</div>
          <h1 style={s.h1}>Save Together,<br/><span style={{color:"#059669"}}>Grow Together</span></h1>
          <p style={{fontSize:17, color:"#4b5563", marginTop:18, lineHeight:1.5, fontWeight:500}}>Digitize your Ajo, Esusu, Adashe. Create groups, collect automatically via Paystack, never miss payout.</p>
          <div style={{display:"flex", gap:12, justifyContent:"center", marginTop:28, flexWrap:"wrap" as const}}><button style={{...s.btn, padding:"16px 32px", fontSize:17}} onClick={()=>setPage("dashboard")}>Start Saving Free →</button><button onClick={()=>shareWhatsApp({name:"AjoSave", amount:50000} as any)} style={{background:"white", border:"1px solid #e5e7eb", padding:"16px 24px", borderRadius:999, fontWeight:800, cursor:"pointer"}}>Share on WhatsApp</button></div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginTop:50, textAlign:"left" as const}}>
            {[{t:"Create Group", d:"Set amount, members, cycle in 30s", i:"⚡"}, {t:"Paystack Pay", d:"Pay with card, transfer, USSD", i:"💳"}, {t:"WhatsApp Invite", d:"Invite & remind members easily", i:"💬"}].map(c=><div key={c.t} style={{...s.card, textAlign:"left"}}><div style={{fontSize:24}}>{c.i}</div><b style={{display:"block", marginTop:8, fontSize:15}}>{c.t}</b><p style={{color:"#6b7280", marginTop:6, fontSize:13, lineHeight:1.4}}>{c.d}</p></div>)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight:"100vh", background:"#f9fafb", fontFamily:"Inter, system-ui", letterSpacing:"-0.02em"}}>
      <script src="https://js.paystack.co/v1/inline.js" async></script>
      <div style={s.nav}><div style={{...s.logo, cursor:"pointer"}} onClick={()=>setPage("landing")}>← AjoSave</div><button style={s.btn} onClick={()=>setShowCreate(true)}>+ New Group</button></div>
      <div style={{maxWidth:900, margin:"0 auto", padding:20}}>
        <h2 style={{fontSize:28, fontWeight:900, letterSpacing:"-1px"}}>Good evening, Hassan 👋</h2><p style={{color:"#6b7280", fontWeight:500}}>You have <b style={{color:"#111"}}>₦{groups.reduce((a,g)=>a+g.amount,0).toLocaleString()}</b> in active savings • {groups.filter(g=>g.youPaid).length}/{groups.length} paid</p>
        <div style={{marginTop:24}}>
          {groups.map(g=>(
            <div key={g.id} style={s.card}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}><b style={{fontSize:18, letterSpacing:"-0.5px"}}>{g.name}</b><span style={{background:g.youPaid?"#dcfce7":"#fef3c7", color:g.youPaid?"#166534":"#92400e", padding:"6px 12px", borderRadius:999, fontSize:11, fontWeight:900}}>{g.youPaid?"● PAID":"○ PAY NOW"}</span></div>
              <div style={{display:"flex", gap:20, marginTop:16, fontSize:14}}><div><div style={{color:"#9ca3af", fontSize:11, fontWeight:700, textTransform:"uppercase" as const}}>Amount</div><b style={{fontSize:16}}>₦{g.amount.toLocaleString()}</b></div><div><div style={{color:"#9ca3af", fontSize:11, fontWeight:700, textTransform:"uppercase" as const}}>Members</div><b>{g.members}</b></div><div><div style={{color:"#9ca3af", fontSize:11, fontWeight:700, textTransform:"uppercase" as const}}>Cycle</div><b>{g.cycle}</b></div></div>
              <div style={{marginTop:14, background:"#ecfdf5", padding:12, borderRadius:12, fontSize:13, display:"flex", justifyContent:"space-between", alignItems:"center"}}><span>Next payout: <b style={{color:"#059669"}}>{g.nextPayout}</b></span><button onClick={()=>shareWhatsApp(g)} style={{background:"white", border:"none", padding:"6px 12px", borderRadius:999, fontSize:12, fontWeight:800, cursor:"pointer"}}>Share ↗</button></div>
              {!g.youPaid && <div style={{display:"flex", gap:8, marginTop:14}}><button onClick={()=>payWithPaystack(g)} style={{...s.btnBlack, background:"#059669"}}>Pay ₦{g.amount.toLocaleString()} with Paystack 💳</button></div>}
              {g.youPaid && <div style={{marginTop:12, textAlign:"center", fontSize:13, color:"#059669", fontWeight:700}}>✓ Payment confirmed</div>}
            </div>
          ))}
        </div>
        <div style={{marginTop:30, background:"white", padding:16, borderRadius:16, border:"1px dashed #d1d5db", textAlign:"center" as const}}><p style={{fontSize:13, color:"#6b7280"}}>🔒 Bank-grade security • Paystack secured • Built in Abuja 🇳🇬</p></div>
      </div>
      {showCreate && (
        <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", display:"flex", alignItems:"center", justifyContent:"center", padding:20, zIndex:50, backdropFilter:"blur(4px)"}}><div style={{background:"white", width:"100%", maxWidth:400, borderRadius:24, padding:24, boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}>
          <h3 style={{fontSize:22, fontWeight:900, letterSpacing:"-0.5px"}}>Create Ajo Group</h3><p style={{color:"#6b7280", fontSize:13, marginTop:4}}>Start saving with friends in 30 seconds</p>
          <input value={newGroup.name} onChange={e=>setNewGroup({...newGroup, name:e.target.value})} placeholder="Group Name e.g. Abuja Savers" style={{width:"100%", marginTop:16, border:"2px solid #f3f4f6", padding:14, borderRadius:12, fontWeight:600, outline:"none"}}/>
          <input value={newGroup.amount} onChange={e=>setNewGroup({...newGroup, amount:e.target.value})} placeholder="Amount per person e.g. 20000" type="number" style={{width:"100%", marginTop:10, border:"2px solid #f3f4f6", padding:14, borderRadius:12, fontWeight:600, outline:"none"}}/>
          <input value={newGroup.members} onChange={e=>setNewGroup({...newGroup, members:e.target.value})} placeholder="No. of members e.g. 10" type="number" style={{width:"100%", marginTop:10, border:"2px solid #f3f4f6", padding:14, borderRadius:12, fontWeight:600, outline:"none"}}/>
          <div style={{display:"flex", gap:10, marginTop:20}}><button onClick={()=>setShowCreate(false)} style={{flex:1, background:"#f3f4f6", padding:14, borderRadius:12, border:"none", fontWeight:800, cursor:"pointer"}}>Cancel</button><button onClick={createGroup} style={{flex:1, background:"#111827", color:"white", padding:14, borderRadius:12, border:"none", fontWeight:800, cursor:"pointer"}}>Create Group →</button></div>
        </div></div>
      )}
    </div>
  )
}
