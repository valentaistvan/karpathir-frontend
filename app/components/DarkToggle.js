'use client'
import { useState, useEffect } from 'react'

export default function DarkToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved === 'true') { setDark(true); document.body.classList.add('dark') }
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.body.classList.toggle('dark', next)
    localStorage.setItem('darkMode', next)
  }

  return (
    <button onClick={toggle} style={{
      background:'none', border:'1px solid rgba(255,255,255,.4)',
      color:'#fff', fontSize:'11px', padding:'3px 10px',
      borderRadius:'12px', cursor:'pointer', fontFamily:'inherit'
    }}>
      {dark ? '☀️ Világos' : '🌙 Sötét mód'}
    </button>
  )
}
