/* eslint-disable @next/next/no-img-element */
import DarkToggle from './components/DarkToggle'
import AdBanner from './components/AdBanner'

async function getNews() {
  const res = await fetch(
    'https://karpathir.com/wp-json/wp/v2/posts?_embed&per_page=12',
    { next: { revalidate: 60 } }
  )
  return res.json()
}

export default async function HomePage() {
  const posts = await getNews()

  return (
    <div style={{minHeight:'100vh', background:'var(--bg)', transition:'background .25s'}}>

      {/* TOP BAR */}
      <div style={{background:'#1B8415', padding:'7px 0'}}>
        <div style={{maxWidth:'1180px', margin:'0 auto', padding:'0 16px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'8px'}}>
          <div style={{display:'flex', gap:'16px', alignItems:'center', flexWrap:'wrap'}}>
            <span style={{color:'#fff', fontSize:'12px'}}>☀️ Ungvár: <strong>11°C</strong></span>
            <span style={{color:'#fff', fontSize:'12px'}}>USD <strong>44,08</strong> <span style={{color:'#f87171'}}>▼</span></span>
            <span style={{color:'#fff', fontSize:'12px'}}>EUR <strong>50,63</strong> <span style={{color:'#4ade80'}}>▲</span></span>
            <span style={{color:'#fff', fontSize:'12px'}}>1000 HUF <strong>129,70</strong> <span style={{color:'#4ade80'}}>▲</span></span>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
            <span style={{color:'rgba(255,255,255,.75)', fontSize:'11px'}}>Névnap: Gertrúd, Patrik</span>
            <DarkToggle />
          </div>
        </div>
      </div>

      {/* LOGO */}
      <div style={{background:'var(--surface)', padding:'14px 0', borderBottom:'3px solid #1B8415', transition:'background .25s'}}>
        <div style={{maxWidth:'1180px', margin:'0 auto', padding:'0 16px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <a href="/">
            <div style={{fontSize:'34px', fontWeight:'900', color:'var(--logo-color)', fontFamily:'Georgia,serif', letterSpacing:'-1px'}}>KárpátHÍR</div>
            <div style={{fontSize:'11px', color:'var(--text3)', letterSpacing:'.5px'}}>Kárpátalja • Ukrajna • Háború</div>
          </a>
          <div style={{fontSize:'12px', color:'var(--text3)'}}>
            {new Date().toLocaleDateString('hu-HU', {year:'numeric', month:'long', day:'numeric', weekday:'long'})}
          </div>
        </div>
      </div>

      {/* NAVIGÁCIÓ */}
      <div style={{background:'var(--surface)', borderBottom:'2px solid #1B8415', transition:'background .25s'}}>
        <div style={{maxWidth:'1180px', margin:'0 auto', padding:'0 16px', display:'flex', overflowX:'auto'}}>
          {[
            {label:'🇷🇺🇺🇦 Háború', href:'https://karpathir.com/orosz-ukran-haboru/'},
            {label:'Friss', href:'https://karpathir.com/osszes-hir/'},
            {label:'Kárpátalja', href:'https://karpathir.com/category/c162-karpatalja/'},
            {label:'Ukrajna', href:'https://karpathir.com/category/ukrajna/'},
            {label:'Világ', href:'https://karpathir.com/category/vilag/'},
            {label:'Kapcsolat', href:'https://karpathir.com/kapcsolat/'},
          ].map(item => (
            <a key={item.label} href={item.href} style={{
              color:'var(--text2)', fontSize:'13px', fontWeight:'700',
              padding:'10px 14px', display:'block', whiteSpace:'nowrap',
              borderBottom:'3px solid transparent', marginBottom:'-2px'
            }}>
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* HIRDETÉS - felső */}
      <div style={{maxWidth:'1180px', margin:'12px auto 0', padding:'0 16px'}}>
        <AdBanner slot="8647987681" />
      </div>

      {/* FŐ TARTALOM */}
      <div style={{maxWidth:'1180px', margin:'16px auto 40px', padding:'0 16px', display:'grid', gridTemplateColumns:'1fr 300px', gap:'24px'}}>

        <main>
          {/* HERO */}
          {posts[0] && (
            <a href={`/cikk/${posts[0].slug}`} style={{display:'block', position:'relative', borderRadius:'6px', overflow:'hidden', marginBottom:'16px'}}>
              {posts[0]._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                <img
                  src={posts[0]._embedded['wp:featuredmedia'][0].source_url}
                  alt=""
                  style={{width:'100%', aspectRatio:'16/8', objectFit:'cover', display:'block'}}
                />
              )}
              <div style={{position:'absolute', bottom:0, left:0, right:0, background:'linear-gradient(transparent,rgba(0,0,0,.85))', padding:'32px 16px 16px'}}>
                <div style={{background:'#c41c1c', color:'#fff', fontSize:'10px', fontWeight:'700', padding:'2px 8px', borderRadius:'3px', display:'inline-block', marginBottom:'8px'}}>KIEMELT</div>
                <div style={{fontSize:'20px', fontWeight:'800', color:'#fff', lineHeight:'1.3'}}
                  dangerouslySetInnerHTML={{__html: posts[0].title.rendered}}
                />
                <div style={{fontSize:'11px', color:'rgba(255,255,255,.7)', marginTop:'6px'}}>
                  {new Date(posts[0].date).toLocaleDateString('hu-HU')} – {new Date(posts[0].date).toLocaleTimeString('hu-HU', {hour:'2-digit', minute:'2-digit'})}
                </div>
              </div>
            </a>
          )}

          {/* HÍREK RÁCS 2x2 */}
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'20px'}}>
            {posts.slice(1, 5).map(post => (
              <a key={post.id} href={`/cikk/${post.slug}`} style={{background:'var(--surface)', borderRadius:'6px', overflow:'hidden', border:'1px solid var(--border)', display:'block', transition:'background .25s'}}>
                {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                  <img src={post._embedded['wp:featuredmedia'][0].source_url} alt="" style={{width:'100%', aspectRatio:'16/9', objectFit:'cover', display:'block'}}/>
                )}
                <div style={{padding:'10px 12px'}}>
                  <div style={{fontSize:'13px', fontWeight:'700', lineHeight:'1.35', color:'var(--text)'}}
                    dangerouslySetInnerHTML={{__html: post.title.rendered}}
                  />
                  <div style={{fontSize:'11px', color:'var(--text3)', marginTop:'5px'}}>
                    {new Date(post.date).toLocaleTimeString('hu-HU', {hour:'2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* HIRDETÉS - középső */}
          <AdBanner slot="8472476605" />

          {/* LISTA */}
          <div style={{fontSize:'11px', fontWeight:'800', color:'#1B8415', textTransform:'uppercase', letterSpacing:'1.5px', borderLeft:'3px solid #1B8415', paddingLeft:'8px', margin:'16px 0 12px'}}>
            Friss hírek
          </div>
          {posts.slice(5).map(post => (
            <a key={post.id} href={`/cikk/${post.slug}`} style={{display:'grid', gridTemplateColumns:'80px 1fr', gap:'10px', padding:'10px 0', borderBottom:'1px solid var(--border)', alignItems:'start'}}>
              {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                <img src={post._embedded['wp:featuredmedia'][0].source_url} alt="" style={{width:'80px', height:'54px', objectFit:'cover', borderRadius:'4px'}}/>
              ) : (
                <div style={{width:'80px', height:'54px', background:'var(--surface2)', borderRadius:'4px'}}/>
              )}
              <div>
                <div style={{fontSize:'13px', fontWeight:'700', color:'var(--text)', lineHeight:'1.35', marginBottom:'4px'}}
                  dangerouslySetInnerHTML={{__html: post.title.rendered}}
                />
                <div style={{fontSize:'11px', color:'var(--text3)'}}>
                  {new Date(post.date).toLocaleTimeString('hu-HU', {hour:'2-digit', minute:'2-digit'})}
                </div>
              </div>
            </a>
          ))}
        </main>

        {/* SIDEBAR */}
        <aside style={{display:'flex', flexDirection:'column', gap:'16px'}}>

          {/* ÁRFOLYAM */}
          <div style={{background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'6px', overflow:'hidden', transition:'background .25s'}}>
            <div style={{background:'#1B8415', padding:'8px 12px'}}>
              <h3 style={{fontSize:'12px', fontWeight:'700', color:'#fff', textTransform:'uppercase', letterSpacing:'1px'}}>Árfolyam</h3>
            </div>
            {[
              {code:'USD', val:'44,08', chg:'▼', up:false},
              {code:'EUR', val:'50,63', chg:'▲', up:true},
              {code:'1000 HUF', val:'129,70', chg:'▲', up:true},
            ].map(c => (
              <div key={c.code} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 12px', borderBottom:'1px solid var(--border)'}}>
                <span style={{fontSize:'12px', fontWeight:'700', color:'var(--text2)'}}>{c.code}</span>
                <span style={{fontSize:'14px', fontWeight:'800', color:'var(--text)'}}>{c.val}</span>
                <span style={{fontSize:'12px', color: c.up ? '#16a34a' : '#dc2626'}}>{c.chg}</span>
              </div>
            ))}
          </div>

          {/* FRISS HÍREK SIDEBAR */}
          <div style={{background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'6px', overflow:'hidden', transition:'background .25s'}}>
            <div style={{background:'#111', padding:'8px 12px'}}>
              <h3 style={{fontSize:'12px', fontWeight:'700', color:'#fff', textTransform:'uppercase', letterSpacing:'1px'}}>Friss hírek</h3>
            </div>
            {posts.slice(0, 8).map(post => (
              <a key={post.id} href={`/cikk/${post.slug}`} style={{display:'block', padding:'10px 12px', borderBottom:'1px solid var(--border)'}}>
                <div style={{fontSize:'10px', color:'#c41c1c', fontWeight:'700', marginBottom:'3px'}}>
                  {new Date(post.date).toLocaleTimeString('hu-HU', {hour:'2-digit', minute:'2-digit'})}
                  {(new Date() - new Date(post.date)) < 3600000 && (
                    <span style={{background:'#ef4444', color:'#fff', fontSize:'9px', fontWeight:'700', padding:'1px 4px', borderRadius:'2px', marginLeft:'4px'}}>ÚJ</span>
                  )}
                </div>
                <div style={{fontSize:'12px', fontWeight:'700', color:'var(--text)', lineHeight:'1.35'}}
                  dangerouslySetInnerHTML={{__html: post.title.rendered}}
                />
              </a>
            ))}
          </div>

          {/* SIDEBAR HIRDETÉS */}
          <AdBanner slot="8647987681" />

        </aside>
      </div>

      {/* FOOTER */}
      <div style={{background:'#111', padding:'20px 0', marginTop:'20px'}}>
        <div style={{maxWidth:'1180px', margin:'0 auto', padding:'0 16px', display:'flex', gap:'20px', flexWrap:'wrap', justifyContent:'center'}}>
          {['Impresszum','Hirdetőknek','Adatkezelés','Támogatás'].map(item => (
            <a key={item} href="#" style={{color:'#888', fontSize:'12px'}}>{item}</a>
          ))}
        </div>
        <div style={{textAlign:'center', color:'#555', fontSize:'11px', marginTop:'10px'}}>© 2026 KárpátHÍR</div>
      </div>

    </div>
  )
}
