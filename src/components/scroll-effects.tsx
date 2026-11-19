"use client";
import {useEffect,useState} from "react";
export function ScrollEffects(){
 const[progress,setProgress]=useState(0);
 useEffect(()=>{
  const update=()=>{const root=document.documentElement;const max=root.scrollHeight-window.innerHeight;setProgress(max>0?Math.min(100,(window.scrollY/max)*100):0)};
  update();window.addEventListener("scroll",update,{passive:true});window.addEventListener("resize",update);
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(!reduce&&"IntersectionObserver"in window){
   const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:"0px 0px -45px 0px"});
   const observe=()=>document.querySelectorAll<HTMLElement>("main > section:not(.hero), main .card, main .technology-panel, main .case-visual").forEach((el,index)=>{if(!el.classList.contains("scroll-reveal")){el.classList.add("scroll-reveal");el.style.setProperty("--reveal-delay",(Math.min(index%6,5)*65)+"ms");observer.observe(el)}});
   observe();const mutation=new MutationObserver(observe);mutation.observe(document.body,{childList:true,subtree:true});
   return()=>{window.removeEventListener("scroll",update);window.removeEventListener("resize",update);observer.disconnect();mutation.disconnect()};
  }
  return()=>{window.removeEventListener("scroll",update);window.removeEventListener("resize",update)};
 },[]);
 return <div className="scroll-progress" aria-hidden="true"><span style={{transform:"scaleX("+(progress/100)+")"}}/></div>;
}
