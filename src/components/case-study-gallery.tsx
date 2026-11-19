"use client";
import {useState} from "react";
type Evidence={src:string;alt:string;caption:string};
export function CaseStudyGallery({items,title}:{items:readonly Evidence[];title:string}){
 const [active,setActive]=useState(0);
 if(!items.length)return null;
 const current=items[active];
 return <section className="evidence-gallery" aria-label={title}>
  <div className="evidence-heading"><div><span className="eyebrow">Implementation evidence</span><h2>{title}</h2></div><span className="evidence-count">{String(active+1).padStart(2,"0")} / {String(items.length).padStart(2,"0")}</span></div>
  <div className="evidence-frame"><img src={current.src} alt={current.alt}/><div className="evidence-caption">{current.caption}</div></div>
  {items.length>1&&<div className="evidence-controls"><button type="button" onClick={()=>setActive((active-1+items.length)%items.length)} aria-label="Previous screenshot">←</button><div className="evidence-dots">{items.map((item,i)=><button key={item.src} type="button" onClick={()=>setActive(i)} className={i===active?"active":""} aria-label={"Show screenshot "+(i+1)} aria-pressed={i===active}/>)}</div><button type="button" onClick={()=>setActive((active+1)%items.length)} aria-label="Next screenshot">→</button></div>}
  <p className="evidence-note">Project implementation screenshot. Sensitive operational details are excluded or masked.</p>
 </section>;
}