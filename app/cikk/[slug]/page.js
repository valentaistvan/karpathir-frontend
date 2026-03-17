/* eslint-disable @next/next/no-img-element */
import AdBanner from '../../components/AdBanner'

async function getPost(slug) {
  const res = await fetch(
    `https://karpathir.com/wp-json/wp/v2/posts?_embed&slug=${slug}`,
    { next: { revalidate: 3600 } }
  )
  const posts = await res.json()
  return posts[0]
}

async function getRelated(categoryId, excludeId) {
  const res = await fetch(
    `https://karpathir.com/wp-json/wp/v2/posts?_embed&per_page=4&categories=${categoryId}&exclude=${excludeId}`,
    { next: { revalidate: 3600 } }
  )
  return res.json()
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug)
  if (!post) return <div style={{padding:'40px', textAlign:'center'}}>Cikk nem található.</div>

  const categoryId = post.categories?.[0]
  const related = categoryId ? await getRelated(categoryId, post.id) : []
  const featuredImg = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
  const categories = post._embedded?.['wp:term']?.[0] || []

  return (
    <div style={{minHeight:'100vh', background:'var(--bg)', transition:'background .25s'}}>

      {/* TOP BAR */}
      <div style={{background:'#1B8415', padding:'7px 0'}}>
        <div style={{maxWidth:'1180px', margin:'0 auto', padding:'0 16px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'8px'}}>
          <div style={{display:'flex', gap:'16px', flexWrap:'wrap'}}>
            <span style={{color:'#fff', fontSize:'12px'}}>☀️ Ungvár: <strong>11°C</strong></span>
            <span style={{color:'#fff', fontSize:'12px'}}>USD <strong>44,08</strong></span>
            <span style={{color:'#fff', fontSize:'12px'}}>EUR <strong>50,63</strong></span>
          </div>
        </div>
      </div>

      {/* LOGO */}
      <div style={{background:'var(--surface)', padding:'14px 0', borderBottom:'3px solid #1B8415', transition:'background .25s'}}>
        <div style={{maxWidth:'1180px', margin:'0 auto', padding:'0 16px'}}>
          <a href="/">
            <div style={{fontSize:'34px', fontWeight:'900', color:'var(--logo-color)', fontFamily:'Georgia,serif'}}>KárpátHÍR</div>
            <div style={{fontSize:'11px', color:'var(--text3)', letterSpacing:'.5px'}}>Kárpátalja • Ukrajna • Háború</div>
          </a>
        </div>
      </div>

      {/* NAV */}
      <div style={{background:'var(--surface)', borderBottom:'2px solid #1B8415', transition:'background .25s'}}>
        <div style={{maxWidth:'1180px', margin:'0 auto', padding:'0 16px', display:'flex', overflowX:'auto'}}>
          {[
            {label:'🇷🇺🇺🇦 Háború', href:'https://karpathir.com/orosz-ukran-haboru/'},
            {label:'Friss', href:'https://karpathir.com/osszes-hir/'},
            {label:'Kárpátalja', href:'https://karpathir.com/category/c162-karpatalja/'},
            {label:'Ukrajna', href:'https://karpathir.com/category/ukrajna/'},
            {label:'Világ', href:'https://karpathir.com/category/vilag/'},
          ].map(item => (
            <a key={item.label} href={item.href} style={{color:'var(--text2)', fontSize:'13px', fontWeight:'700', padding:'10px 14px', display:'block', whiteSpace:'nowrap'}}>
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* TARTALOM */}
      <div style={{maxWidth:'1180px', margin:'20px auto 40px', padding:'0 16px', display:'grid', gridTemplateColumns:'1fr 300px', gap:'24px'}}>

        <main>
          {/* KATEGÓRIA */}
          <div style={{display:'flex', gap:'6px', marginBottom:'12px', flexWrap:'wrap'}}>
            {categories.map(cat => (
              <span key={cat.id} style={{background:'#1B8415', color:'#fff', fontSize:'11px', fontWeight:'700', padding:'3px 10px', borderRadius:'4px'}}>
                {cat.name}
              </span>
            ))}
          </div>

          {/* CÍM */}
          <h1 style={{fontSize:'26px', fontWeight:'900', color:'var(--text)', lineHeight:'1.25', marginBottom:'12px', fontFamily:'Georgia,serif'}}
            dangerouslySetInnerHTML={{__html: post.title.rendered}}
          />

          {/* META */}
          <div style={{display:'flex', alignItems:'center', gap:'16px', marginBottom:'16px', paddingBottom:'12px', borderBottom:'2px solid #1B8415', flexWrap:'wrap'}}>
            <span style={{fontSize:'12px', color:'var(--text3)'}}>
              📅 {new Date(post.date).toLocaleDateString('hu-HU', {year:'numeric', month:'long', day:'numeric'})} – {new Date(post.date).toLocaleTimeString('hu-HU', {hour:'2-digit', minute:'2-digit'})}
            </span>
            <div style={{display:'flex', gap:'6px'}}>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://karpathir.com/' + post.slug)}`} target="_blank" rel="noreferrer"
                style={{background:'#1877f2', color:'#fff', border:'none', borderRadius:'4px', padding:'4px 12px', fontSize:'11px', fontWeight:'700', cursor:'pointer'}}>
                f Megosztás
              </a>
            </div>
          </div>

          {/* KÉP */}
          {featuredImg && (
            <img src={featuredImg} alt="" style={{width:'100%', borderRadius:'6px', marginBottom:'16px', display:'block', maxHeight:'450px', objectFit:'cover'}}/>
          )}

          {/* HIRDETÉS cikk előtt */}
          <AdBanner slot="8647987681" />

          {/* CIKK SZÖVEG */}
          <div
            style={{fontSize:'16px', lineHeight:'1.8', color:'var(--text)', marginTop:'16px'}}
            dangerouslySetInnerHTML={{__html: post.content.rendered}}
          />

          {/* HIRDETÉS cikk után */}
          <AdBanner slot="8472476605" />

          {/* ELŐZŐ / KÖVETKEZŐ */}
          <div style={{display:'flex', justifyContent:'space-between', gap:'12px', margin:'24px 0', padding:'16px 0', borderTop:'1px solid var(--border)'}}>
            <a href="/" style={{fontSize:'13px', color:'#1B8415', fontWeight:'700'}}>← Vissza a főoldalra</a>
          </div>

          {/* KAPCSOLÓDÓ */}
          {related.length > 0 && (
            <>
              <div style={{fontSize:'13px', fontWeight:'800', color:'var(--text)', textTransform:'uppercase', letterSpacing:'.5px', borderBottom:'2px solid #1B8415', paddingBottom:'8px', marginBottom:'12px'}}>
                Kapcsolódó hírek
              </div>
              {related.map(r => (
                <a key={r.id} href={`/cikk/${r.slug}`} style={{display:'grid', gridTemplateColumns:'80px 1fr', gap:'10px', padding:'10px 0', borderBottom:'1px solid var(--border)', alignItems:'start'}}>
                  {r._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                    <img src={r._embedded['wp:featuredmedia'][0].source_url} alt="" style={{width:'80px', height:'54px', objectFit:'cover', borderRadius:'4px'}}/>
                  ) : (
                    <div style={{width:'80px', height:'54px', background:'var(--surface2)', borderRadius:'4px'}}/>
                  )}
                  <div style={{fontSize:'13px', fontWeight:'700', color:'var(--text)', lineHeight:'1.35'}}
                    dangerouslySetInnerHTML={{__html: r.title.rendered}}
                  />
                </a>
              ))}
            </>
          )}
        </main>

        {/* SIDEBAR */}
        <aside style={{display:'flex', flexDirection:'column', gap:'16px'}}>
          <div style={{background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'6px', overflow:'hidden'}}>
            <div style={{background:'#111', padding:'8px 12px'}}>
              <h3 style={{fontSize:'12px', fontWeight:'700', color:'#fff', textTransform:'uppercase', letterSpacing:'1px'}}>Friss hírek</h3>
            </div>
            <div style={{padding:'10px 12px'}}>
              <a href="/" style={{fontSize:'12px', color:'#1B8415', fontWeight:'700'}}>→ Összes friss hír</a>
            </div>
          </div>
          <AdBanner slot="8647987681" />
        </aside>
      </div>

      {/* FOOTER */}
      <div style={{background:'#111', padding:'20px 0'}}>
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
