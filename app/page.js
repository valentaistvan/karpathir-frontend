async function getNews() {
  const res = await fetch(
    'https://karpathir.com/wp-json/wp/v2/posts?_embed&per_page=10',
    { next: { revalidate: 60 } }
  )
  return res.json()
}

export default async function HomePage() {
  const posts = await getNews()

  return (
    <div>
      {/* TOP BAR */}
      <div style={{background:'#1B8415', padding:'8px 16px', display:'flex', gap:'20px', alignItems:'center', flexWrap:'wrap'}}>
        <span style={{color:'#fff', fontSize:'12px'}}>☀️ Ungvár: <strong>11°C</strong></span>
        <span style={{color:'#fff', fontSize:'12px'}}>USD <strong>44,08</strong> ▼</span>
        <span style={{color:'#fff', fontSize:'12px'}}>EUR <strong>50,63</strong> ▲</span>
        <span style={{color:'#fff', fontSize:'12px'}}>1000 HUF <strong>129,70</strong> ▲</span>
        <span style={{color:'rgba(255,255,255,0.8)', fontSize:'11px', marginLeft:'auto'}}>Névnap: Gertrúd, Patrik</span>
      </div>

      {/* LOGO */}
      <div style={{background:'#fff', padding:'14px 16px', borderBottom:'3px solid #1B8415'}}>
        <div style={{maxWidth:'1180px', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div>
            <div style={{fontSize:'36px', fontWeight:'900', color:'#dd3333', fontFamily:'Georgia,serif'}}>KárpátHÍR</div>
            <div style={{fontSize:'11px', color:'#888', letterSpacing:'.5px'}}>Kárpátalja • Ukrajna • Háború</div>
          </div>
          <div style={{fontSize:'12px', color:'#666'}}>2026. március 17., kedd</div>
        </div>
      </div>

      {/* NAVIGÁCIÓ */}
      <div style={{background:'#fff', borderBottom:'2px solid #1B8415'}}>
        <div style={{maxWidth:'1180px', margin:'0 auto', padding:'0 16px', display:'flex', gap:'0', overflowX:'auto'}}>
          {['🇷🇺🇺🇦 Háború','Friss','Kárpátalja','Ukrajna','Világ','Kapcsolat'].map(item => (
            <a key={item} href="#" style={{color:'#444', fontSize:'13px', fontWeight:'700', padding:'10px 14px', display:'block', whiteSpace:'nowrap'}}>
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* TARTALOM */}
      <div style={{maxWidth:'1180px', margin:'20px auto', padding:'0 16px', display:'grid', gridTemplateColumns:'1fr 300px', gap:'24px'}}>
        
        {/* FŐHÍREK */}
        <main>
          {/* HERO - első hír nagy */}
          {posts[0] && (
            <a href={posts[0].link} style={{display:'block', position:'relative', borderRadius:'6px', overflow:'hidden', marginBottom:'16px'}}>
              {posts[0]._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                <img
                  src={posts[0]._embedded['wp:featuredmedia'][0].source_url}
                  alt=""
                  style={{width:'100%', aspectRatio:'16/8', objectFit:'cover', display:'block'}}
                />
              )}
              <div style={{position:'absolute', bottom:0, left:0, right:0, background:'linear-gradient(transparent,rgba(0,0,0,0.85))', padding:'32px 16px 16px'}}>
                <div style={{background:'#c41c1c', color:'#fff', fontSize:'10px', fontWeight:'700', padding:'2px 8px', borderRadius:'3px', display:'inline-block', marginBottom:'8px'}}>KIEMELT</div>
                <div style={{fontSize:'20px', fontWeight:'800', color:'#fff', lineHeight:'1.3'}}
                  dangerouslySetInnerHTML={{__html: posts[0].title.rendered}}
                />
              </div>
            </a>
          )}

          {/* HÍREK RÁCS */}
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'20px'}}>
            {posts.slice(1, 5).map(post => (
              <a key={post.id} href={post.link} style={{background:'#fff', borderRadius:'6px', overflow:'hidden', border:'1px solid #ddd', display:'block'}}>
                {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                  <img
                    src={post._embedded['wp:featuredmedia'][0].source_url}
                    alt=""
                    style={{width:'100%', aspectRatio:'16/9', objectFit:'cover', display:'block'}}
                  />
                )}
                <div style={{padding:'10px 12px'}}>
                  <div style={{fontSize:'13px', fontWeight:'700', lineHeight:'1.35', color:'#1a1510'}}
                    dangerouslySetInnerHTML={{__html: post.title.rendered}}
                  />
                  <div style={{fontSize:'11px', color:'#888', marginTop:'5px'}}>
                    {new Date(post.date).toLocaleDateString('hu-HU')}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* LISTA - többi hír */}
          <div style={{fontSize:'11px', fontWeight:'800', color:'#1B8415', textTransform:'uppercase', letterSpacing:'1.5px', borderLeft:'3px solid #1B8415', paddingLeft:'8px', marginBottom:'12px'}}>
            Friss hírek
          </div>
          {posts.slice(5).map((post, i) => (
            <a key={post.id} href={post.link} style={{display:'grid', gridTemplateColumns:'80px 1fr', gap:'10px', padding:'10px 0', borderBottom:'1px solid #ddd', alignItems:'start'}}>
              {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                <img src={post._embedded['wp:featuredmedia'][0].source_url} alt="" style={{width:'80px', height:'54px', objectFit:'cover', borderRadius:'4px'}}/>
              ) : (
                <div style={{width:'80px', height:'54px', background:'#eee', borderRadius:'4px'}}/>
              )}
              <div>
                <div style={{fontSize:'13px', fontWeight:'700', color:'#1a1510', lineHeight:'1.35', marginBottom:'4px'}}
                  dangerouslySetInnerHTML={{__html: post.title.rendered}}
                />
                <div style={{fontSize:'11px', color:'#888'}}>
                  {new Date(post.date).toLocaleDateString('hu-HU')}
                </div>
              </div>
            </a>
          ))}
        </main>

        {/* SIDEBAR */}
        <aside>
          <div style={{background:'#fff', border:'1px solid #ddd', borderRadius:'6px', overflow:'hidden', marginBottom:'16px'}}>
            <div style={{background:'#1B8415', padding:'8px 12px'}}>
              <h3 style={{fontSize:'12px', fontWeight:'700', color:'#fff', textTransform:'uppercase', letterSpacing:'1px'}}>Friss hírek</h3>
            </div>
            {posts.slice(0, 8).map(post => (
              <a key={post.id} href={post.link} style={{display:'block', padding:'10px 12px', borderBottom:'1px solid #eee'}}>
                <div style={{fontSize:'10px', color:'#c41c1c', fontWeight:'700', marginBottom:'3px'}}>
                  {new Date(post.date).toLocaleTimeString('hu-HU', {hour:'2-digit', minute:'2-digit'})}
                </div>
                <div style={{fontSize:'12px', fontWeight:'700', color:'#1a1510', lineHeight:'1.35'}}
                  dangerouslySetInnerHTML={{__html: post.title.rendered}}
                />
              </a>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
