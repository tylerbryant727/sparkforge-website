"use client";
import {useState} from "react";

export function ContactForm(){
  const [submitting,setSubmitting]=useState(false);
  const [submitted,setSubmitted]=useState(false);
  const [error,setError]=useState("");
  async function handleSubmit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const formData=new FormData(event.currentTarget);
    const encoded=new URLSearchParams(Array.from(formData.entries()).map(([key,value])=>[key,String(value)] as [string,string]));
    encoded.set("form-name","project-enquiry");
    try{
      const response=await fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:encoded.toString()});
      if(!response.ok) throw new Error("The enquiry could not be submitted. Please try again or contact us directly.");
      setSubmitted(true);
      event.currentTarget.reset();
    }catch{
      setError("We could not send your enquiry just now. Please try again or contact us directly by email or WhatsApp.");
    }finally{
      setSubmitting(false);
    }
  }
  if(submitted)return <div className="card contact-form" role="status"><span className="eyebrow">Enquiry received</span><h2>Thank you for reaching out.</h2><p>Your project enquiry has been submitted. Our team will review the details and follow up using the contact information you provided.</p><button className="btn btn-outline" type="button" onClick={()=>setSubmitted(false)}>Send another enquiry</button></div>;
  return <form className="card contact-form" name="project-enquiry" method="POST" onSubmit={handleSubmit}><input type="hidden" name="form-name" value="project-enquiry"/><p className="hidden-field" aria-hidden="true"><label>Leave this field empty: <input name="bot-field" tabIndex={-1} autoComplete="off"/></label></p><div className="form-grid"><div className="field"><label htmlFor="name">Your name *</label><input id="name" name="name" required autoComplete="name" placeholder="Full name"/></div><div className="field"><label htmlFor="organization">Business / organization</label><input id="organization" name="organization" autoComplete="organization" placeholder="Company name (optional)"/></div><div className="field"><label htmlFor="email">Email address *</label><input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com"/></div><div className="field"><label htmlFor="country">Country</label><input id="country" name="country" autoComplete="country-name" placeholder="Your country"/></div><div className="field"><label htmlFor="service">Service area</label><select id="service" name="service"><option value="">Select a division</option>{divisions.map(x=><option key={x} value={x}>{x}</option>)}</select></div><div className="field"><label htmlFor="budget">Estimated budget</label><select id="budget" name="budget"><option value="">Select a range</option>{budgets.map(x=><option key={x} value={x}>{x}</option>)}</select></div><div className="field"><label htmlFor="timeline">Expected timeline</label><select id="timeline" name="timeline"><option value="">Select a timeline</option>{timelines.map(x=><option key={x} value={x}>{x}</option>)}</select></div><div className="field full"><label htmlFor="description">Project description *</label><textarea id="description" name="description" required minLength={20} placeholder="What are you trying to build, connect or improve? Include relevant platforms, requirements and constraints."/></div><div className="field full"><label htmlFor="reference">Reference link (optional)</label><input id="reference" name="reference" type="url" placeholder="https://"/></div></div><label className="privacy-consent"><input type="checkbox" name="privacy-consent" value="accepted" required/> <span>I understand that the details I provide will be used to respond to my project enquiry. <a href="/privacy">Read the privacy notice.</a></span></label><p className="muted form-note">Your enquiry is submitted through Netlify Forms and may be retained in the website hosting account. Do not include passwords, API keys, payment details or sensitive personal information.</p>{error&&<p className="form-error" role="alert">{error}</p>}<button className="btn btn-primary" type="submit" disabled={submitting}>{submitting?"Sending enquiry…":"Send project enquiry ↗"}</button></form>;
}

const divisions=["AI Development & Intelligent Systems","Business Automation & Integration","Web, Software & SaaS","eCommerce & Digital Commerce","CRM, Communication & Infrastructure","Specialized Digital Solutions","Interactive Applications & Game Development"];
const budgets=["Under $500","$500–$1,500","$1,500–$5,000","$5,000–$10,000","$10,000+","To be discussed"];
const timelines=["As soon as possible","Within 2–4 weeks","Within 1–3 months","Flexible"];
