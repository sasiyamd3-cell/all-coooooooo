"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Asterisk, Bell, Bookmark,
  Check, ChevronDown, Code2, Command, Copy, Cpu, ExternalLink, Eye,
  FileCode2, Fingerprint, Globe2, Heart, Image as ImageIcon, Layers3,
  LockKeyhole, Menu, MessageCircle, Moon, MoreHorizontal, Search, Send,
  Settings2, ShieldCheck, Sparkles, Star, Sun, Terminal, WandSparkles,
  X, Zap, QrCode, Braces, KeyRound, Radio, Activity, Clock3, Github
} from "lucide-react";

const TOOLS = [
  { id:"chat", name:"AI Chat", category:"AI Studio", description:"A thoughtful AI companion for ideas, questions, and everyday problem-solving.", icon:"spark", tag:"POPULAR", color:"violet" },
  { id:"writer", name:"Text Studio", category:"AI Studio", description:"Turn rough notes into clear, confident, beautifully structured writing.", icon:"write", tag:"CREATIVE", color:"blue" },
  { id:"image", name:"Image Studio", category:"AI Studio", description:"Shape visual concepts and build expressive image-generation prompts.", icon:"image", tag:"VISUAL", color:"pink" },
  { id:"code", name:"Code Assistant", category:"AI Studio", description:"Understand code, explore solutions, and move from bug to breakthrough.", icon:"code", tag:"BUILD", color:"cyan" },
  { id:"qr", name:"QR Generator", category:"Developer", description:"Create crisp QR codes from links, contact details, or plain text.", icon:"qr", tag:"UTILITY", color:"green" },
  { id:"json", name:"JSON Studio", category:"Developer", description:"Format, validate, and minify structured data with ease.", icon:"braces", tag:"UTILITY", color:"orange" },
  { id:"base64", name:"Base64 Lab", category:"Developer", description:"Encode and decode UTF-8 strings directly in your browser.", icon:"terminal", tag:"UTILITY", color:"blue" },
  { id:"password", name:"Password Lab", category:"Developer", description:"Generate secure random passwords with adjustable complexity.", icon:"key", tag:"SECURITY", color:"violet" },
  { id:"api", name:"API Playground", category:"Developer", description:"Send HTTP requests and inspect responses in a clean workspace.", icon:"globe", tag:"TESTING", color:"cyan" },
  { id:"ip", name:"IP Lookup", category:"Developer", description:"Inspect public IP and network information using a lookup service.", icon:"radio", tag:"NETWORK", color:"green" },
  { id:"notes", name:"Quick Notes", category:"Productivity", description:"Keep small thoughts and useful snippets close at hand.", icon:"write", tag:"FOCUS", color:"pink" },
  { id:"timer", name:"Focus Timer", category:"Productivity", description:"Make space for deep work with a simple focus session.", icon:"clock", tag:"FOCUS", color:"orange" }
];

const ICONS = {
  spark: Sparkles, write: WandSparkles, image: ImageIcon, code: Code2,
  qr: QrCode, braces: Braces, terminal: Terminal, key: KeyRound,
  globe: Globe2, radio: Radio, clock: Clock3
};

const DEFAULT_REVIEWS = [
  { id:"seed-1", name:"Avery Chen", handle:"@averybuilds", avatar:"A", rating:5, date:"Featured", title:"A beautifully focused workspace", body:"The visual direction feels calm without losing personality. I love having the small utilities together in one place.", helpful:18, featured:true },
  { id:"seed-2", name:"Noah Williams", handle:"@noah.codes", avatar:"N", rating:5, date:"Featured", title:"Clean, quick, and genuinely useful", body:"The developer tools are easy to reach and the interface stays out of the way. A lovely starting point for a daily toolkit.", helpful:12, featured:true },
  { id:"seed-3", name:"Mia Laurent", handle:"@mialaurent", avatar:"M", rating:4, date:"Featured", title:"A fresh take on a digital toolbox", body:"Minimal, polished, and simple to understand. Looking forward to seeing the ecosystem grow.", helpful:9, featured:true }
];

const STORAGE = {
  reviews:"miyora_reviews_v1", comments:"miyora_comments_v1",
  favorites:"miyora_favorites_v1", theme:"miyora_theme_v1",
  profile:"miyora_profile_v1", notes:"miyora_notes_v1"
};

function readStore(key, fallback) {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; }
  catch { return fallback; }
}
function saveStore(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch { return false; }
}
function Stars({ value=5, size=13 }) {
  return <span className="stars" aria-label={`${value} out of 5 stars`}>{[1,2,3,4,5].map(n=><Star key={n} size={size} fill={n<=value?"currentColor":"none"} strokeWidth={1.7} />)}</span>;
}
function IconFor({ name, size=20 }) {
  const Icon = ICONS[name] || Sparkles;
  return <Icon size={size} strokeWidth={1.65}/>;
}
function Avatar({ name="M", small=false }) {
  return <span className={`avatar ${small?"avatar-small":""}`}>{(name||"M").trim().charAt(0).toUpperCase()}</span>;
}
function SectionLabel({ children, right }) {
  return <div className="section-label"><span>{children}</span>{right}</div>;
}
function ToolCard({ tool, onOpen, favorite, onFavorite }) {
  return <article className="tool-card">
    <div className="tool-card-top">
      <div className={`tool-icon ${tool.color}`}><IconFor name={tool.icon} size={21}/></div>
      <button className={`icon-quiet ${favorite?"is-favorite":""}`} onClick={()=>onFavorite(tool.id)} aria-label="Toggle favourite"><Bookmark size={16} fill={favorite?"currentColor":"none"}/></button>
    </div>
    <div className="tool-tag">{tool.tag}</div>
    <h3>{tool.name}</h3>
    <p>{tool.description}</p>
    <button className="card-link" onClick={()=>onOpen(tool)}>{tool.category==="AI Studio"?"Explore tool":"Open utility"} <ArrowUpRight size={14}/></button>
  </article>;
}

function ToolModal({ tool, onClose, notify }) {
  const [input,setInput]=useState("");
  const [output,setOutput]=useState("");
  const [method,setMethod]=useState("GET");
  const [length,setLength]=useState(20);
  const [symbols,setSymbols]=useState(true);
  const [numbers,setNumbers]=useState(true);
  const [busy,setBusy]=useState(false);
  if (!tool) return null;
  const setResult=(value)=>setOutput(value);
  const copy=async()=>{if(!output)return;try{await navigator.clipboard.writeText(output);notify("Copied to clipboard");}catch{notify("Clipboard access is unavailable");}};
  const run=async()=>{
    const raw=input.trim();
    if(tool.id==="json"){
      try{const parsed=JSON.parse(raw);setResult(JSON.stringify(parsed,null,2));}
      catch(e){setResult(`Invalid JSON\n${e.message}`);}
    } else if(tool.id==="base64"){
      try{setResult(btoa(unescape(encodeURIComponent(raw))));}catch{setResult("Unable to encode this text.");}
    } else if(tool.id==="password"){
      let chars="abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
      if(numbers)chars+="23456789"; if(symbols)chars+="!@#$%^&*()-_=+[]{}?";
      const bytes=new Uint32Array(length); crypto.getRandomValues(bytes);
      setResult(Array.from(bytes,n=>chars[n%chars.length]).join(""));
    } else if(tool.id==="qr"){
      if(!raw){notify("Enter a URL or text first");return;}
      setResult("QR_READY:"+raw);
    } else if(tool.id==="image"){
      if(!raw){notify("Describe your image idea first");return;}
      setResult(`Create a premium, high-quality image based on: ${raw}\n\nComposition: intentional framing, elegant lighting, rich details, refined colour harmony. Avoid watermarks and distorted text.`);
    } else if(tool.id==="writer" || tool.id==="chat" || tool.id==="code"){
      setResult("This workspace UI is ready. Connect a server-side AI provider to enable live AI responses. Never place provider API keys in browser code.");
    } else if(tool.id==="ip"){
      setBusy(true);
      try{const r=await fetch("https://ipapi.co/json/");const data=await r.json();setResult(JSON.stringify(data,null,2));}
      catch{setResult("IP lookup failed. Check your connection or try again.");}
      finally{setBusy(false);}
    } else if(tool.id==="api"){
      if(!/^https?:\/\//i.test(raw)){notify("Enter a valid http(s) URL");return;}
      setBusy(true);
      try{const response=await fetch(raw,{method});const body=await response.text();setResult(`HTTP ${response.status} ${response.statusText}\n\n${body.slice(0,10000)}`);}
      catch(e){setResult(`Request failed: ${e.message}\nThe target may block browser CORS requests.`);}
      finally{setBusy(false);}
    } else if(tool.id==="timer"){
      setResult("Focus session ready. Set a timer on your device or use your preferred focus timer.");
    } else if(tool.id==="notes"){
      setResult(raw || "Write a note in the input above.");
    }
  };
  const decode=()=>{
    try{setResult(decodeURIComponent(escape(atob(input.trim()))));}
    catch{setResult("Invalid Base64 input.");}
  };
  return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}>
    <section className="tool-modal">
      <div className="modal-head"><div className={`tool-icon ${tool.color}`}><IconFor name={tool.icon}/></div><button className="icon-quiet" onClick={onClose}><X size={19}/></button></div>
      <div className="tool-tag">{tool.category} / MIYORA TOOLKIT</div><h2>{tool.name}</h2><p className="modal-description">{tool.description}</p>
      {tool.id==="password" ? <div className="modal-controls">
        <label className="field-label">PASSWORD LENGTH <b>{length}</b></label><input type="range" min="8" max="64" value={length} onChange={e=>setLength(+e.target.value)}/>
        <div className="check-row"><label><input type="checkbox" checked={numbers} onChange={e=>setNumbers(e.target.checked)}/> Numbers</label><label><input type="checkbox" checked={symbols} onChange={e=>setSymbols(e.target.checked)}/> Symbols</label></div>
      </div> : tool.id==="api" ? <div className="field-inline"><select value={method} onChange={e=>setMethod(e.target.value)}><option>GET</option><option>POST</option><option>PUT</option><option>PATCH</option><option>DELETE</option></select><input value={input} onChange={e=>setInput(e.target.value)} placeholder="https://api.example.com/endpoint"/></div> :
      <textarea className="modal-input" value={input} onChange={e=>setInput(e.target.value)} rows={tool.id==="json"?8:5} placeholder={tool.id==="json"?'{"hello":"world"}':tool.id==="base64"?"Enter text or Base64 content...":tool.id==="qr"?"https://miyora.example":tool.id==="image"?"A cinematic glass building at twilight...":"Describe what you want to work on..."}/>}
      <div className="modal-actions">
        <button className="button-primary" onClick={tool.id==="base64"?decode:run} disabled={busy}>{busy?"Working…":tool.id==="password"?"Generate password":tool.id==="api"?"Send request":tool.id==="base64"?"Decode Base64":"Run tool"} <ArrowRight size={15}/></button>
        {output && <button className="button-secondary" onClick={copy}><Copy size={14}/> Copy</button>}
      </div>
      {output && <div className="tool-output">
        {output.startsWith("QR_READY:") ? <div className="qr-preview"><img alt="Generated QR code" src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(output.slice(9))}`}/><a href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(output.slice(9))}`} download="miyora-qr.png" target="_blank" rel="noreferrer">Open / download QR <ArrowUpRight size={13}/></a></div> : <pre>{output}</pre>}
      </div>}
      <p className="modal-footnote">Runs in your browser unless a clearly identified external service is used. Some services may have their own privacy and CORS restrictions.</p>
    </section>
  </div>;
}

function ReviewCard({ review, onHelpful, helpful }) {
  return <article className="review-card">
    <div className="review-user"><Avatar name={review.avatar || review.name}/><div><strong>{review.name}</strong><span>{review.handle || "MIYORA member"} · {review.date}</span></div><button className={`helpful ${helpful?"selected":""}`} onClick={()=>onHelpful(review.id)}><Heart size={14} fill={helpful?"currentColor":"none"}/>{review.helpful || 0}</button></div>
    <Stars value={review.rating}/>
    <h3>{review.title}</h3><p>{review.body}</p>
    <div className="review-card-bottom"><span>{review.featured?"COMMUNITY SPOTLIGHT":"COMMUNITY REVIEW"}</span><MessageCircle size={14}/></div>
  </article>;
}

export default function MiyoraApp() {
  const [theme,setTheme]=useState("dark");
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState("All tools");
  const [activeTool,setActiveTool]=useState(null);
  const [reviews,setReviews]=useState(DEFAULT_REVIEWS);
  const [favorites,setFavorites]=useState([]);
  const [helpful,setHelpful]=useState([]);
  const [profile,setProfile]=useState({name:"Miyora Guest",handle:"@guest"});
  const [reviewForm,setReviewForm]=useState({name:"",rating:5,title:"",body:""});
  const [comment,setComment]=useState("");
  const [comments,setComments]=useState([]);
  const [notice,setNotice]=useState("");
  const [mobileNav,setMobileNav]=useState(false);
  const [showAllReviews,setShowAllReviews]=useState(false);
  const [activeNav,setActiveNav]=useState("Home");
  const [newsletter,setNewsletter]=useState("");
  const [newsletterDone,setNewsletterDone]=useState(false);

  useEffect(()=>{
    setReviews(readStore(STORAGE.reviews,DEFAULT_REVIEWS));
    setComments(readStore(STORAGE.comments,[]));
    setFavorites(readStore(STORAGE.favorites,[]));
    setTheme(readStore(STORAGE.theme,"dark"));
    setProfile(readStore(STORAGE.profile,{name:"Miyora Guest",handle:"@guest"}));
  },[]);
  useEffect(()=>{document.documentElement.dataset.theme=theme;},[theme]);
  useEffect(()=>{if(!notice)return;const t=setTimeout(()=>setNotice(""),2600);return()=>clearTimeout(t);},[notice]);
  const notify=(message)=>setNotice(message);
  const filteredTools=useMemo(()=>TOOLS.filter(t=>(category==="All tools"||t.category===category) && `${t.name} ${t.description} ${t.category}`.toLowerCase().includes(query.toLowerCase())),[category,query]);
  const userReviews=reviews.filter(r=>!r.featured);
  const average=reviews.length?reviews.reduce((sum,r)=>sum+r.rating,0)/reviews.length:0;
  const toggleFavorite=(id)=>{const next=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];setFavorites(next);saveStore(STORAGE.favorites,next);notify(next.includes(id)?"Added to favourites":"Removed from favourites");};
  const addReview=(e)=>{
    e.preventDefault();
    if(!reviewForm.name.trim()||!reviewForm.title.trim()||!reviewForm.body.trim()){notify("Please complete every review field");return;}
    if(reviewForm.body.length>700){notify("Review must be under 700 characters");return;}
    const item={id:`review-${Date.now()}`,name:reviewForm.name.trim(),handle:"Community member",avatar:reviewForm.name.trim()[0],rating:Number(reviewForm.rating),date:new Date().toLocaleDateString(),title:reviewForm.title.trim(),body:reviewForm.body.trim(),helpful:0,featured:false};
    const next=[item,...reviews];setReviews(next);saveStore(STORAGE.reviews,next);
    setReviewForm({name:"",rating:5,title:"",body:""});notify("Your review was saved on this device");
  };
  const addComment=(e)=>{
    e.preventDefault();if(!comment.trim())return;
    const next=[{id:Date.now(),name:profile.name,body:comment.trim(),date:new Date().toLocaleString()},...comments];
    setComments(next);saveStore(STORAGE.comments,next);setComment("");notify("Comment saved locally");
  };
  const markHelpful=(id)=>{const next=helpful.includes(id)?helpful.filter(x=>x!==id):[...helpful,id];setHelpful(next);};
  const changeProfile=(e)=>{e.preventDefault();const name=e.target.profileName.value.trim();if(!name)return;const next={name,handle:"@"+name.toLowerCase().replace(/[^a-z0-9]+/g,"")};setProfile(next);saveStore(STORAGE.profile,next);notify("Profile updated on this device");};
  const scrollTo=(id,label)=>{setActiveNav(label);setMobileNav(false);document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"});};
  const navItems=[["Home","home"],["Explore","explore"],["Community","community"],["About","about"]];
  const visibleReviews=showAllReviews?reviews:reviews.slice(0,3);

  return <main className="site-root">
    <div className="announcement"><span className="announcement-dot"></span> A NEW SPACE FOR YOUR DIGITAL LIFE <span className="announcement-sep">·</span> MEET MIYORA <ArrowUpRight size={12}/></div>
    <header className="site-header">
      <a className="wordmark" href="#home" onClick={()=>setActiveNav("Home")}><span className="wordmark-symbol">m</span><span>miyora<span className="wordmark-period">.</span></span></a>
      <nav className={`desktop-nav ${mobileNav?"nav-open":""}`}>
        {navItems.map(([label,id])=><button key={label} className={activeNav===label?"nav-active":""} onClick={()=>scrollTo(id,label)}>{label}</button>)}
      </nav>
      <div className="header-actions">
        <button className="theme-toggle" aria-label="Toggle colour theme" onClick={()=>{const next=theme==="dark"?"light":"dark";setTheme(next);saveStore(STORAGE.theme,next);}}>{theme==="dark"?<Sun size={16}/>:<Moon size={16}/>}</button>
        <button className="button-primary header-cta" onClick={()=>scrollTo("explore","Explore")}>Explore workspace <ArrowUpRight size={14}/></button>
        <button className="mobile-menu-button" onClick={()=>setMobileNav(!mobileNav)} aria-label="Toggle navigation">{mobileNav?<X/>:<Menu/>}</button>
      </div>
    </header>

    <section className="hero-section" id="home">
      <div className="hero-grid-lines"></div><div className="hero-orb orb-one"></div><div className="hero-orb orb-two"></div>
      <div className="hero-content">
        <div className="eyebrow-pill"><span className="eyebrow-spark"><Sparkles size={12}/></span> THE DIGITAL WORKSPACE, REIMAGINED <span className="pill-live">01 / 04</span></div>
        <h1>Make space for<br/><span className="gradient-text">what’s possible.</span></h1>
        <p className="hero-description">A considered collection of AI experiences, developer utilities, and creative tools — designed to make your next idea feel a little closer.</p>
        <div className="hero-actions"><button className="button-primary button-large" onClick={()=>scrollTo("explore","Explore")}>Explore MIYORA <ArrowUpRight size={16}/></button><button className="button-text" onClick={()=>scrollTo("about","About")}>Discover the vision <ArrowDownRight size={15}/></button></div>
        <div className="hero-proof"><div className="proof-avatars"><Avatar name="A"/><Avatar name="N"/><Avatar name="M"/><span className="proof-plus">+</span></div><div><strong>Made for curious minds</strong><span>One home for your everyday workflow</span></div><div className="proof-divider"></div><div className="proof-rating"><Stars value={5} size={11}/><strong>4.9 / 5</strong><span>Community sentiment</span></div></div>
      </div>
      <div className="hero-visual" aria-label="Abstract MIYORA workspace preview">
        <div className="visual-glow"></div>
        <div className="orbit orbit-a"></div><div className="orbit orbit-b"></div>
        <div className="floating-chip chip-top"><span className="chip-icon"><Sparkles size={14}/></span><span><b>AI Studio</b><small>Ideas in motion</small></span><span className="chip-status"></span></div>
        <div className="dashboard-preview">
          <div className="preview-top"><div className="preview-brand"><span className="mini-mark">m</span><b>miyora<span>.</span></b></div><div className="preview-dots"><i></i><i></i><i></i></div></div>
          <div className="preview-body"><div className="preview-kicker">YOUR WORKSPACE / 01</div><h3>Good things<br/>start here<span>.</span></h3><div className="preview-line"></div>
            <div className="preview-metrics"><div><span>TOOLS</span><b>12</b></div><div><span>COLLECTIONS</span><b>04</b></div><div><span>YOUR FLOW</span><b>∞</b></div></div>
            <div className="preview-tools"><div><span className="preview-tool-icon purple"><Sparkles size={14}/></span><span><b>AI Assistant</b><small>Ready to explore</small></span><ArrowUpRight size={13}/></div><div><span className="preview-tool-icon blue"><Code2 size={14}/></span><span><b>Developer kit</b><small>Build with clarity</small></span><ArrowUpRight size={13}/></div></div>
          </div>
        </div>
        <div className="floating-chip chip-bottom"><span className="mini-check"><Check size={12}/></span><span><b>In your flow</b><small>Less friction, more focus</small></span></div>
        <div className="visual-caption"><span>FIG. 01</span> A workspace with intention</div>
      </div>
      <div className="hero-bottom-note"><span>SCROLL TO EXPLORE</span><div className="scroll-line"></div><span>01 — 04</span></div>
    </section>

    <section className="trust-strip">
      <span>BUILT AROUND THE WAY YOU CREATE</span><div className="trust-items"><span><Sparkles size={14}/> AI EXPERIENCES</span><span><Code2 size={14}/> DEVELOPER UTILITIES</span><span><Layers3 size={14}/> PRODUCTIVITY</span><span><ShieldCheck size={14}/> PRIVACY MINDED</span></div>
    </section>

    <section className="intro-section section-wrap" id="about">
      <div className="intro-left"><SectionLabel>01 / THE MIYORA IDEA</SectionLabel><h2>Less noise.<br/><span className="muted-heading">More meaningful</span><br/>momentum.</h2></div>
      <div className="intro-right"><p className="intro-lead">Your best work rarely happens when you’re hunting for the right tool.</p><p>MIYORA brings useful digital experiences into one carefully designed space. From a quick developer utility to a fresh creative spark, everything is built around one simple thought: technology should feel empowering, not overwhelming.</p><button className="underlined-link" onClick={()=>scrollTo("explore","Explore")}>Find your next favourite tool <ArrowUpRight size={15}/></button></div>
      <div className="intro-index">M / 01</div>
    </section>

    <section className="explore-section section-wrap" id="explore">
      <div className="section-heading-row"><div><SectionLabel>02 / YOUR TOOLKIT</SectionLabel><h2>Small tools.<br/><span className="muted-heading">Big possibilities.</span></h2></div><p className="section-heading-copy">A growing collection of thoughtful tools for building, creating, and getting things done. Pick a starting point.</p></div>
      <div className="tool-filter-bar"><div className="category-tabs">{["All tools","AI Studio","Developer","Productivity"].map(c=><button key={c} className={category===c?"selected":""} onClick={()=>setCategory(c)}>{c}</button>)}</div><label className="tool-search"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a tool..."/><kbd>⌘ K</kbd></label></div>
      <div className="tool-grid">{filteredTools.map(tool=><ToolCard key={tool.id} tool={tool} onOpen={setActiveTool} favorite={favorites.includes(tool.id)} onFavorite={toggleFavorite}/>)}</div>
      {filteredTools.length===0&&<div className="empty-tools"><Search size={22}/><b>No tools found</b><span>Try another search or category.</span></div>}
      <div className="tool-grid-footer"><span>SHOWING {filteredTools.length.toString().padStart(2,"0")} OF {TOOLS.length.toString().padStart(2,"0")} EXPERIENCES</span><span>MORE TO COME <Asterisk size={13}/></span></div>
    </section>

    <section className="feature-band">
      <div className="feature-band-inner"><div className="feature-art"><div className="feature-ring ring-one"></div><div className="feature-ring ring-two"></div><div className="feature-core"><Command size={34}/></div><span className="art-label art-label-one">THINK</span><span className="art-label art-label-two">CREATE</span><span className="art-label art-label-three">BUILD</span></div>
        <div className="feature-copy"><SectionLabel>03 / A BETTER KIND OF TOOLBOX</SectionLabel><h2>Designed to<br/>keep you <span className="gradient-text">in flow.</span></h2><p>Every detail has a job. Clear navigation, quick actions, thoughtful feedback, and a responsive interface that feels at home on every screen.</p><div className="feature-points"><div><span><Zap size={15}/></span><b>Quick by design</b><small>Reach useful tools without the clutter.</small></div><div><span><Fingerprint size={15}/></span><b>Your browser, your space</b><small>Local preferences and community content stay on this device.</small></div><div><span><Layers3 size={15}/></span><b>One connected feel</b><small>A consistent experience from idea to execution.</small></div></div></div>
      </div>
    </section>

    <section className="community-section section-wrap" id="community">
      <div className="section-heading-row community-heading"><div><SectionLabel>04 / THE COMMUNITY</SectionLabel><h2>Good things are<br/><span className="muted-heading">better shared.</span></h2></div><div className="community-summary"><div className="summary-score">{average.toFixed(1)}<span>/5</span></div><Stars value={Math.round(average)} size={14}/><small>{reviews.length} reviews saved in this browser</small></div></div>
      <div className="reviews-layout">
        <div className="reviews-list">
          {visibleReviews.map(review=><ReviewCard key={review.id} review={review} onHelpful={markHelpful} helpful={helpful.includes(review.id)}/>)}
          {reviews.length>3&&<button className="button-secondary view-reviews" onClick={()=>setShowAllReviews(!showAllReviews)}>{showAllReviews?"Show less":"View all reviews"} <ArrowDownRight size={14}/></button>}
          <div className="community-note"><ShieldCheck size={16}/><span>Reviews are stored locally in this browser. They are not published to other visitors.</span></div>
        </div>
        <aside className="review-form-card"><div className="form-card-top"><div className="form-icon"><MessageCircle size={18}/></div><span>YOUR VOICE MATTERS</span></div><h3>Leave a little<br/>feedback.</h3><p>Tell us what you think about MIYORA. Your review is saved on this device.</p>
          <form onSubmit={addReview}>
            <label className="field-label">YOUR NAME</label><input className="form-field" value={reviewForm.name} onChange={e=>setReviewForm({...reviewForm,name:e.target.value})} placeholder="How should we call you?"/>
            <label className="field-label">YOUR RATING</label><div className="rating-picker">{[1,2,3,4,5].map(n=><button type="button" key={n} className={n<=reviewForm.rating?"rating-on":""} onClick={()=>setReviewForm({...reviewForm,rating:n})} aria-label={`${n} stars`}><Star size={20} fill={n<=reviewForm.rating?"currentColor":"none"}/></button>)}</div>
            <label className="field-label">REVIEW TITLE</label><input className="form-field" value={reviewForm.title} onChange={e=>setReviewForm({...reviewForm,title:e.target.value})} placeholder="Sum it up in a line"/>
            <label className="field-label">YOUR THOUGHTS</label><textarea className="form-field" rows="4" maxLength="700" value={reviewForm.body} onChange={e=>setReviewForm({...reviewForm,body:e.target.value})} placeholder="What did you enjoy? What could be better?"/>
            <button className="button-primary submit-review" type="submit">Post review locally <ArrowUpRight size={15}/></button>
          </form>
        </aside>
      </div>
      <div className="comments-area"><div className="comments-heading"><div><SectionLabel>COMMUNITY WALL</SectionLabel><h3>A thought to add?</h3></div><span>{comments.length} local comments</span></div>
        <form className="comment-composer" onSubmit={addComment}><Avatar name={profile.name}/><input value={comment} onChange={e=>setComment(e.target.value)} placeholder="Share a thought with your local community wall..." maxLength="400"/><button type="submit" aria-label="Post comment"><Send size={16}/></button></form>
        <div className="comment-list">{comments.length===0?<div className="no-comments">No comments yet. Start the conversation on this device.</div>:comments.map(c=><article className="comment-item" key={c.id}><Avatar name={c.name}/><div><div className="comment-meta"><b>{c.name}</b><span>{c.date}</span></div><p>{c.body}</p></div></article>)}</div>
        <form className="profile-edit" onSubmit={changeProfile}><label>POSTING AS</label><input name="profileName" defaultValue={profile.name}/><button type="submit">Update local profile</button></form>
      </div>
    </section>

    <section className="manifesto-section"><div className="manifesto-mark">“</div><p>Technology is at its best when it gives your attention back to the things that matter.</p><span>THE MIYORA PRINCIPLE</span><div className="manifesto-decoration"></div></section>

    <section className="newsletter-section section-wrap"><div><SectionLabel>05 / STAY IN THE LOOP</SectionLabel><h2>A little more <span className="gradient-text">inspiration.</span></h2><p>Get occasional notes about new tools, thoughtful updates, and things worth exploring.</p></div><form className="newsletter-form" onSubmit={e=>{e.preventDefault();if(newsletter.includes("@")){setNewsletterDone(true);notify("Thanks — this demo does not send or store emails.");}else notify("Enter a valid email address");}}><input type="email" required value={newsletter} onChange={e=>setNewsletter(e.target.value)} placeholder="Your email address"/><button type="submit">{newsletterDone?"You're on the list":"Keep me posted"} <ArrowUpRight size={15}/></button><small>This is a frontend demo. No email is sent or collected.</small></form></section>

    <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><a className="wordmark" href="#home"><span className="wordmark-symbol">m</span><span>miyora<span className="wordmark-period">.</span></span></a><p>Your digital world, thoughtfully gathered.</p><div className="footer-social"><a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16}/></a><a href="#community" aria-label="Community"><MessageCircle size={16}/></a><a href="#explore" aria-label="Explore"><Globe2 size={16}/></a></div></div><div className="footer-links"><div><b>EXPLORE</b><a href="#explore">All tools</a><a href="#community">Community</a><a href="#about">Our vision</a></div><div><b>WORKSPACE</b><a href="#explore">AI Studio</a><a href="#explore">Developer kit</a><a href="#explore">Productivity</a></div><div><b>THE DETAILS</b><a href="#community">Reviews</a><a href="#about">About MIYORA</a><a href="#home">Back to top ↑</a></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} MIYORA. MADE FOR WHAT’S NEXT.</span><span>DESIGNED BY <b>SASIYA MIYORA TEAM</b></span><span>LOCAL-FIRST DEMO · V1.0</span></div></footer>
    {activeTool&&<ToolModal tool={activeTool} onClose={()=>setActiveTool(null)} notify={notify}/>}
    {notice&&<div className="toast"><Check size={15}/>{notice}</div>}
  </main>;
}
