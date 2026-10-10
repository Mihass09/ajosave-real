"use client";
import { useState, useEffect } from "react";

type M = { name: string; paid: boolean; a: string };
type G = { id: number; n: string; amt: number; m: M[]; d: number };

export default function Home() {
  const [tl, setTl] = useState({ d: 2, h: 14, m: 35, s: 22 });
  const [gs, setGs] = useState<G[]>([
    { id: 1, n: "Market Women Elite", amt: 5000, d: 12, m: [
      { name: "You", paid: false, a: "Y" },
      { name: "Mama Nkechi", paid: true, a: "M" },
      { name: "Aisha Bello", paid: true, a: "A" }
    ]},
    { id: 2, n: "Lagos Hustlers", amt: 10000, d: 10, m: [
      { name: "You", paid: true, a: "Y" },
      { name: "Tunde Ojo", paid: true, a: "T" },
      { name: "Chioma", paid: false, a: "C" },
      { name: "Emeka", paid: true, a: "E" }
    ]},
    { id: 3, n: "Abuja Sisters", amt: 20000, d: 8, m: [
      { name: "You", paid: true, a: "Y" },
      { name: "Fatima", paid: true, a: "F" }
    ]}
  ]);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setTl(p => {
        let { d, h, m, s } = p;
        if (s > 0) s--;
        else { s = 59; if (m > 0) m--; else { m = 59; if (h > 0) h--; else { h = 23; if (d > 0) d--; } } }
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const pay = (id: number) => {
    setGs(v => v.map(g => g.id === id ? { ...g, m: g.m.map(x => x.name === "You" ? { ...x, paid: !x.paid } : x) } : g));
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  const total = gs.reduce((s, g) => s + g.m.filter(x => x.paid).length * g.amt, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#f6f8fb", fontFamily: "sans-serif", paddingBottom: 80 }}>
      <div style={{ background: "#fff", padding: "14px 18px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 5 }}>
        <b style={{ fontSize: 20 }}>AjoSave 💰</b>
        <div style={{ width: 34, height: 34, borderRadius: 50, background: "#00C853", color: "#fff", display: "grid", placeItems: "center", fontWeight: 700 }}>Y</div>
      </div>
      <div style={{ padding: 18, maxWidth: 500, margin: "0 auto" }}>
        <div style={{ background: "linear-gradient(135deg,#00C853,#00a344)", borderRadius: 22, padding: 18, color: "#fff", marginBottom: 18 }}>
          <div style={{ opacity: 0.9, fontSize: 12 }}>Total Saved</div>
          <div style={{ fontSize: 30, fontWeight: 800, margin: "4px 0 10px" }}>₦{total.toLocaleString()}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ background: "rgba(255,255,255,0.22)", padding: "5px 10px", borderRadius: 20, fontSize: 11 }}>+ ₦15k this week 🔥</span>
            <span style={{ background: "#fff", color: "#00C853", padding: "7px 10px", borderRadius: 10, fontWeight: 700, fontSize: 11 }}>{tl.d}d {tl.h}h {tl.m}m {tl.s}s</span>
          </div>
        </div>
        <div style={{ fontWeight: 700, marginBottom: 10 }}>Your Ajo Groups ({gs.length})</div>
        {gs.map(g => {
          const pc = g.m.filter(x => x.paid).length;
          const yp = g.m.find(x => x.name === "You")?.paid;
          const pr = (pc / g.m.length) * 100;
          return (
            <div key={g.id} style={{ background: "#fff", borderRadius: 18, padding: 14, marginBottom: 14, border: "1px solid #eef2f7" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{g.n}</div>
                  <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>₦{g.amt.toLocaleString()} • {pc}/{g.m.length} paid</div>
                </div>
                <span style={{ background: yp ? "#dcfce7" : "#fef3c7", color: yp ? "#15803d" : "#b45309", padding: "3px 9px", borderRadius: 20, fontSize: 10, fontWeight: 700 }}>{yp ? "Paid ✅" : "Due"}</span>
              </div>
              <div style={{ height: 6, background: "#eef2f7", borderRadius: 10, margin: "12px 0" }}>
                <div style={{ height: "100%", width: `${pr}%`, background: "#00C853", borderRadius: 10 }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex" }}>
                  {g.m.map((x, i) => (
                    <div key={i} style={{ width: 30, height: 30, borderRadius: 50, background: x.paid ? "#00C853" : "#e5e7eb", color: x.paid ? "#fff" : "#6b7280", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700, marginLeft: i ? -7 : 0, border: x.name === "You" ? "2px solid #111" : "2px solid #fff" }}>{x.a}</div>
                  ))}
                </div>
                <button onClick={() => pay(g.id)} style={{ background: yp ? "#f3f4f6" : "#00C853", color: yp ? "#111" : "#fff", border: "none", padding: "9px 16px", borderRadius: 20, fontWeight: 700, fontSize: 12 }}>{yp ? "Undo" : "Pay Now"}</button>
              </div>
            </div>
          );
        })}
      </div>
      {toast && <div style={{ position: "fixed", bottom: 18, left: "50%", transform: "translateX(-50%)", background: "#111", color: "#fff", padding: "10px 18px", borderRadius: 30, fontSize: 12, fontWeight: 600 }}>Payment recorded! ✅</div>}
    </div>
  );
}
