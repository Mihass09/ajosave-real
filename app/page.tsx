"use client";
import { useState } from "react";
export default function Home(){
const [paid,setPaid]=useState(false);
return(
<div style={{padding:20,fontFamily:'sans-serif',background:'#f6f8fb',minHeight:'100vh'}}>
<h1>AjoSave 💰</h1>
<div style={{background:'white',padding:16,borderRadius:16}}>
<p>Market Women - ₦5000 {paid&&'✅'}</p>
<button onClick={()=>setPaid(true)} style={{background:'#00C853',color:'white',border:'none',padding:'10px 20px',borderRadius:20,fontWeight:700}}>
{paid?'Paid':'Pay Now'}
</button>
</div>
</div>
)
}
