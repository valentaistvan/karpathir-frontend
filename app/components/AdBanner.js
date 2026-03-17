'use client'
import { useEffect } from 'react'

export default function AdBanner({ slot }) {
  useEffect(() => {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}) } catch(e) {}
  }, [])

  return (
    <div style={{textAlign:'center', margin:'12px 0', minHeight:'90px', background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <ins
        className="adsbygoogle"
        style={{display:'block'}}
        data-ad-client="ca-pub-8470405318565311"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
