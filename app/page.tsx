'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Home() {
  const [user,setUser]=useState<any>(null)
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [loading,setLoading]=useState(false)
  const [msg,setMsg]=useState('')

  useEffect(()=>{
    supabase.auth.getUser().then(({data})=>setUser(data.user))
    const {data:listener}=supabase.auth.onAuthStateChange((_,session)=>setUser(session?.user||null))
    return ()=>listener.subscription.unsubscribe()
  },[])

  async function signUp(){
    setLoading(true); setMsg('')
    const {error}=await supabase.auth.signUp({email,password})
    if(error) setMsg(error.message); else setMsg('Check email to confirm! Then Login.')
    setLoading(false)
  }
  async function signIn(){
    setLoading(true); setMsg('')
    const {error}=await supabase.auth.signInWithPassword({email,password})
    if(error) setMsg(error.message)
    setLoading(false)
  }
  async function signOut(){ await supabase.auth.signOut() }

  if(!user){
    return (
      <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f0fdf4',padding:20}}>
        <div style={{background:'white',padding:30,borderRadius:16,width:'100%',maxWidth:400,boxShadow:'0 10px 30px rgba(0,0,0,0.1)'}}>
          <h1 style={{fontSize:28,fontWeight:800,color:'#15803d'}}>AjoSave 💰</h1>
          <p>Real Login - Secure</p>
          <input style={{width:'100%',padding:12,margin:'10px 0',borderRadius:8,border:'1px solid #ccc'}} placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
          <input style={{width:'100%',padding:12,margin:'10px 0',borderRadius:8,border:'1px solid #ccc'}} type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
          {msg && <p style={{color:'red',fontSize:14}}>{msg}</p>}
          <button onClick={signUp} disabled={loading} style={{width:'100%',padding:12,background:'#16a34a',color:'white',borderRadius:8,marginTop:10,border:'none',fontWeight:700}}>Sign Up</button>
          <button onClick={signIn} disabled={loading} style={{width:'100%',padding:12,background:'black',color:'white',borderRadius:8,marginTop:10,border:'none',fontWeight:700}}>Login</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight:'100vh',background:'#f0fdf4',padding:20}}>
      <div style={{maxWidth:600,margin:'0 auto',background:'white',padding:24,borderRadius:16}}>
        <h1 style={{fontSize:24,fontWeight:800}}>Welcome {user.email} 🎉</h1>
        <p>Your AjoSave REAL account is working!</p>
        <p style={{marginTop:10}}>Balance: ₦0 (Ajo groups coming next)</p>
        <button onClick={signOut} style={{marginTop:20,padding:12,background:'red',color:'white',borderRadius:8,border:'none',width:'100%'}}>Logout</button>
      </div>
    </div>
  )
}
