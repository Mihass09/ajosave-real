"use client";
import { useState } from "react";

type Group = { id: string; name: string; amount: number; members: number; cycle: string; nextPayout: string; youPaid: boolean; }

export default function AjoSaveApp() {
  const [page, setPage] = useState<"landing" | "dashboard" | "groups">("landing");
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

  if(page === "landing"){
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
        <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto"><div className="font-black text-2xl text-emerald-800">AjoSave</div><button onClick={()=>setPage("dashboard")} className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-bold">Launch App</button></nav>
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <div className="inline-block bg-white px-4 py-1 rounded-full text-emerald-700 font-semibold text-sm mb-6 shadow">Trusted by 2,000+ Nigerians 🇳🇬</div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">Save Together,<br/><span className="text-emerald-600">Grow Together</span></h1>
          <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">Digitize your Ajo, Esusu, Adashe. Create groups, collect automatically, never miss payout.</p>
          <div className="flex gap-4 justify-center mt-10"><button onClick={()=>setPage("dashboard")} className="bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg">Start Saving Free</button><button onClick={()=>setPage("groups")} className="bg-white px-8 py-4 rounded-full font-bold text-lg shadow">How it works</button></div>
          <div className="grid md:grid-cols-3 gap-6 mt-20 text-left">
            {[{t:"Create Group", d:"Set amount, members, cycle in 30s"}, {t:"Auto Collect", d:"Members pay via transfer, we track"}, {t:"Fair Payout", d:"Rotational payout, transparent queue"}].map(c=><div key={c.t} className="bg-white p-6 rounded-2xl shadow-sm"><h3 className="font-bold text-lg">{c.t}</h3><p className="text-gray-600 mt-2">{c.d}</p></div>)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b sticky top-0 z-10"><div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center"><div className="font-black text-xl text-emerald-700 cursor-pointer" onClick={()=>setPage("landing")}>AjoSave</div><div className="flex gap-3"><button onClick={()=>setShowCreate(true)} className="bg-emerald-600 text-white px-5 py-2 rounded-full font-bold">+ New Group</button></div></div></nav>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-black">Good evening, Hassan 👋</h2><p className="text-gray-600 mt-1">You have ₦{(groups.reduce((a,g)=>a+g.amount,0)).toLocaleString()} in active savings</p>
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {groups.map(g=>(
            <div key={g.id} className="bg-white p-6 rounded-2xl shadow-sm border">
              <div className="flex justify-between"><h3 className="font-bold text-lg">{g.name}</h3><span className={`px-3 py-1 rounded-full text-xs font-bold ${g.youPaid?"bg-green-100 text-green-700":"bg-orange-100 text-orange-700"}`}>{g.youPaid?"PAID":"PAY NOW"}</span></div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-sm"><div><p className="text-gray-500">Amount</p><p className="font-bold">₦{g.amount.toLocaleString()}</p></div><div><p className="text-gray-500">Members</p><p className="font-bold">{g.members}</p></div><div><p className="text-gray-500">Cycle</p><p className="font-bold">{g.cycle}</p></div></div>
              <div className="mt-4 bg-emerald-50 p-3 rounded-xl text-sm"><span className="text-gray-600">Next payout: </span><span className="font-bold text-emerald-700">{g.nextPayout}</span></div>
              {!g.youPaid && <button onClick={()=>setGroups(groups.map(x=>x.id===g.id?{...x, youPaid:true}:x))} className="w-full mt-4 bg-gray-900 text-white py-3 rounded-xl font-bold">Mark as Paid ₦{g.amount.toLocaleString()}</button>}
            </div>
          ))}
        </div>
      </div>
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-4"><div className="bg-white w-full max-w-md rounded-t-3xl md:rounded-2xl p-6"><h3 className="text-xl font-black">Create Ajo Group</h3>
          <input value={newGroup.name} onChange={e=>setNewGroup({...newGroup, name:e.target.value})} placeholder="Group Name e.g. Abuja Savers" className="w-full mt-4 border p-3 rounded-xl"/>
          <input value={newGroup.amount} onChange={e=>setNewGroup({...newGroup, amount:e.target.value})} placeholder="Amount per cycle e.g. 20000" type="number" className="w-full mt-3 border p-3 rounded-xl"/>
          <input value={newGroup.members} onChange={e=>setNewGroup({...newGroup, members:e.target.value})} placeholder="Number of members e.g. 10" type="number" className="w-full mt-3 border p-3 rounded-xl"/>
          <div className="flex gap-3 mt-6"><button onClick={()=>setShowCreate(false)} className="flex-1 bg-gray-100 py-3 rounded-xl font-bold">Cancel</button><button onClick={createGroup} className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold">Create Group</button></div>
        </div></div>
      )}
    </div>
  )
}
