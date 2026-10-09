"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [groups, setGroups] = useState([{ id: "1", name: "Market Women", amount: "5000", members: "12", paid: false }]);
  const [showCreate, setShowCreate] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: "", amount: "", members: "" });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const createGroup = () => {
    if (!newGroup.name || !newGroup.amount) return alert("Fill fields");
    setGroups([...groups, { id: Date.now().toString(), name: newGroup.name, amount: newGroup.amount, members: newGroup.members || "1", paid: false }]);
    setNewGroup({ name: "", amount: "", members: "" });
    setShowCreate(false);
  };

  const handlePayment = (g: any) => {
    // @ts-ignore
    if (typeof window === "undefined" || !window.PaystackPop) return alert("Wait 2 secs, Paystack loading");
    // @ts-ignore
    const handler = window.PaystackPop.setup({
      key: 'pk_test_1a179d5141c428857ca205c3f61b164cb6df938b',
      email: 'user@ajosave.com',
      amount: parseInt(g.amount) * 100,
      currency: 'NGN',
      ref: 'AJO_' + Date.now(),
      callback: function (res: any) {
        alert('Success! ' + res.reference);
        setGroups(groups.map((x: any) => x.id === g.id ? { ...x, paid: true } : x));
      },
      onClose: function () { alert('Closed'); }
    });
    handler.openIframe();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>AjoSave - Save Together</h1>
      <button onClick={() => setShowCreate(!showCreate)} style={{ padding: 10, background: 'green', color: 'white' }}>Create Group</button>
      {showCreate && (
        <div style={{ marginTop: 20 }}>
          <input placeholder="Name" value={newGroup.name} onChange={e => setNewGroup({ ...newGroup, name: e.target.value })} /><br/><br/>
          <input placeholder="Amount" value={newGroup.amount} onChange={e => setNewGroup({ ...newGroup, amount: e.target.value })} /><br/><br/>
          <input placeholder="Members" value={newGroup.members} onChange={e => setNewGroup({ ...newGroup, members: e.target.value })} /><br/><br/>
          <button onClick={createGroup}>Save</button>
        </div>
      )}
      <div style={{ marginTop: 20 }}>
        {groups.map((g: any) => (
          <div key={g.id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
            {g.name} - ₦{g.amount} {g.paid ? "✅" : ""} <button onClick={() => handlePayment(g)}>{g.paid ? "Paid" : "Pay"}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
