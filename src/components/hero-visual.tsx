"use client";
import {useRef} from "react";

export function HeroVisual(){
 const ref=useRef<HTMLDivElement>(null);
 const move=(event:React.PointerEvent<HTMLDivElement>)=>{
  if(event.pointerType!=="mouse"||!ref.current)return;
  const r=ref.current.getBoundingClientRect();
  const x=(event.clientX-r.left)/r.width-.5;
  const y=(event.clientY-r.top)/r.height-.5;
  ref.current.style.setProperty("--pointer-x",String(x));
  ref.current.style.setProperty("--pointer-y",String(y));
 };
 const reset=()=>{if(ref.current){ref.current.style.setProperty("--pointer-x","0");ref.current.style.setProperty("--pointer-y","0")}};
 return <div ref={ref} className="hero-visual" onPointerMove={move} onPointerLeave={reset}>
  <div className="hero-visual-orbit hero-visual-orbit-one"/>
  <div className="hero-visual-orbit hero-visual-orbit-two"/>
  <div className="hero-visual-glow"/>
  <img src="/sparkforge-hero.svg" alt="Abstract three-dimensional navy, orange and gold engineering sculpture representing connected technology systems"/>
  <span className="hero-float hero-float-ai">AI / INTELLIGENCE</span>
  <span className="hero-float hero-float-flow">AUTOMATION / FLOW</span>
  <span className="hero-float hero-float-build">SOFTWARE / ENGINEERING</span>
  <span className="hero-visual-caption"><i/> SYSTEMS IN MOTION</span>
 </div>;
}
