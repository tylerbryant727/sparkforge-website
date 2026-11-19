"use client";
import {useEffect,useRef,useState} from "react";

const DRAFT_KEY="sparkforge-project-enquiry-draft-v1";
const divisions=["AI Development & Intelligent Systems","Business Automation & Integration","Web, Software & SaaS","eCommerce & Digital Commerce","CRM, Communication & Infrastructure","Specialized Digital Solutions","Interactive Applications & Game Development"];
const budgets=["Under $500","$500–$1,500","$1,500–$5,000","$5,000–$10,000","$10,000+","To be discussed","Custom"];
const timelines=["As soon as possible","Within 2–4 weeks","Within 1–3 months","Flexible","Custom"];
type Draft=Record<string,string>;
const emptyDraft:Draft={name:"",organization:"",email:"",country:"",service:"",budget:"",budgetCustom:"",timeline:"",timelineCustom:"",description:"",reference:"","privacy-consent":""};

export function ContactForm(){
  const formRef=useRef<HTMLFormElement>(null);
  const [draft,setDraft]=useState<Draft>(emptyDraft);
  const [hydrated,setHydrated]=useState(false);
  const [savedAt,setSavedAt]=useState("");
  const [submitting,setSubmitting]=useState(false);
  const [submitted,setSubmitted]=useState(false);
  const [error,setError]=useState("");
  const [showDraftNotice,setShowDraftNotice]=useState(false);

  useEffect(()=>{
    try{
      const raw=localStorage.getItem(DRAFT_KEY);
      if(raw){
        const parsed=JSON.parse(raw) as Draft;
        const next={...emptyDraft,...parsed};
        setDraft(next);
        setShowDraftNotice(Object.values(next).some(Boolean));
        setSavedAt("Previously saved on this device");
      }
    }catch{localStorage.removeItem(DRAFT_KEY)}
    setHydrated(true);
  },[]);

  useEffect(()=>{
    if(!hydrated||submitted)return;
    const hasContent=Object.entries(draft).some(([key,value])=>key!=="privacy-consent"&&Boolean(value));
    if(!hasContent){localStorage.removeItem(DRAFT_KEY);setSavedAt("");return}
    const timeout=window.setTimeout(()=>{
      try{localStorage.setItem(DRAFT_KEY,JSON.stringify(draft));setSavedAt("Draft saved on this device")}
      catch{setSavedAt("Draft could not be saved in this browser")}
    },350);
    return ()=>window.clearTimeout(timeout);
  },[draft,hydrated,submitted]);

  function update(event:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>){
    const {name,value,type}=event.currentTarget;
    const checked=type==="checkbox"?(event.currentTarget as HTMLInputElement).checked:false;
    setDraft(previous=>({...previous,[name]:type==="checkbox"?(checked?"accepted":""):value}));
  }
  function clearDraft(){
    setDraft(emptyDraft);
    setShowDraftNotice(false);
    setSavedAt("");
    localStorage.removeItem(DRAFT_KEY);
    formRef.current?.reset();
  }
  async function handleSubmit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    setSubmitting(true);setError("");
    const formElement=event.currentTarget;
    const formData=new FormData(formElement);
    const encoded=new URLSearchParams(Array.from(formData.entries()).map(([key,value])=>[key,String(value)] as [string,string]));
    encoded.set("form-name","project-enquiry");
    try{
      const response=await fetch("/__forms.html",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:encoded.toString()});
      if(!response.ok)throw new Error("The enquiry could not be submitted.");
      localStorage.removeItem(DRAFT_KEY);
      setDraft(emptyDraft);setSavedAt("");setShowDraftNotice(false);setSubmitted(true);formElement.reset();
    }catch{
      setError("We could not confirm your enquiry was sent. Your draft is still saved on this device. Please try again or contact us by email or WhatsApp.");
    }finally{setSubmitting(false)}
  }
  if(submitted)return <div className="card contact-form thanks-panel" role="status"><span className="eyebrow">Enquiry received</span><h2>Thank you for reaching out.</h2><p>Your project enquiry has been submitted. Our team will review the details and follow up using the contact information you provided.</p><button className="btn btn-outline" type="button" onClick={()=>{setSubmitted(false);setDraft(emptyDraft)}}>Send another enquiry</button></div>;
  const common={onChange:update};
  return <form ref={formRef} className="card contact-form" name="project-enquiry" method="POST" onSubmit={handleSubmit}>
    <div className="draft-heading"><div><span className="eyebrow">Project brief</span><h2>Tell us about your project</h2><p className="muted">Your progress is saved privately in this browser as you type, so you can return and continue later on this device.</p></div><span className="draft-status" aria-live="polite">{savedAt|| (hydrated?"Draft not saved yet":"Preparing draft…")}</span></div>
    {showDraftNotice&&<div className="draft-resume" role="status"><div><strong>Welcome back — we found your saved enquiry.</strong><span>Your previous details have been restored. You can edit them or continue where you left off.</span></div><button type="button" className="text-action" onClick={clearDraft}>Clear saved draft</button></div>}
    <input type="hidden" name="form-name" value="project-enquiry"/>
    <p className="hidden-field" aria-hidden="true"><label>Leave this field empty: <input name="bot-field" tabIndex={-1} autoComplete="off"/></label></p>
    <div className="form-grid">
      <div className="field"><label htmlFor="name">Your name *</label><input id="name" name="name" value={draft.name} required autoComplete="name" placeholder="Full name" {...common}/></div>
      <div className="field"><label htmlFor="organization">Business / organization</label><input id="organization" name="organization" value={draft.organization} autoComplete="organization" placeholder="Company name (optional)" {...common}/></div>
      <div className="field"><label htmlFor="email">Email address *</label><input id="email" name="email" type="email" value={draft.email} required autoComplete="email" placeholder="you@company.com" {...common}/></div>
      <div className="field"><label htmlFor="country">Country</label><input id="country" name="country" value={draft.country} autoComplete="country-name" placeholder="Your country" {...common}/></div>
      <div className="field"><label htmlFor="service">Service area</label><select id="service" name="service" value={draft.service} {...common}><option value="">Select a division</option>{divisions.map(x=><option key={x} value={x}>{x}</option>)}</select></div>
      <div className="field"><label htmlFor="budget">Estimated budget</label><select id="budget" name="budget" value={draft.budget} {...common}><option value="">Select a range</option>{budgets.map(x=><option key={x} value={x}>{x==="Custom"?"Custom amount / range":x}</option>)}</select></div>
      {draft.budget==="Custom"&&<div className="field full custom-answer"><label htmlFor="budgetCustom">Your budget range</label><input id="budgetCustom" name="budgetCustom" value={draft.budgetCustom} placeholder="e.g. $2,000–$3,500, or share your preferred currency" {...common}/></div>}
      <div className="field"><label htmlFor="timeline">Expected timeline</label><select id="timeline" name="timeline" value={draft.timeline} {...common}><option value="">Select a timeline</option>{timelines.map(x=><option key={x} value={x}>{x==="Custom"?"Custom timeline":x}</option>)}</select></div>
      {draft.timeline==="Custom"&&<div className="field full custom-answer"><label htmlFor="timelineCustom">Your preferred timeline</label><input id="timelineCustom" name="timelineCustom" value={draft.timelineCustom} placeholder="e.g. Discovery this month, launch by March 2027" {...common}/></div>}
      <div className="field full"><label htmlFor="description">Project description *</label><textarea id="description" name="description" value={draft.description} required minLength={20} placeholder="What are you trying to build, connect or improve? Include relevant platforms, requirements and constraints." {...common}/></div>
      <div className="field full"><label htmlFor="reference">Reference link (optional)</label><input id="reference" name="reference" type="url" value={draft.reference} placeholder="https://" {...common}/></div>
    </div>
    <label className="privacy-consent"><input type="checkbox" name="privacy-consent" value="accepted" checked={draft["privacy-consent"]==="accepted"} required onChange={update}/> <span>I understand that the details I provide will be used to respond to my project enquiry. <a href="/privacy">Read the privacy notice.</a></span></label>
    <p className="muted form-note">Draft details are stored locally in this browser on this device until you submit or clear them. They are not sent to Sparkforge until you submit the form. Do not include passwords, API keys, payment details or sensitive personal information.</p>
    {error&&<p className="form-error" role="alert">{error}</p>}
    <div className="form-actions"><button className="btn btn-primary" type="submit" disabled={submitting}>{submitting?"Sending enquiry…":"Send project enquiry ↗"}</button><span className="draft-footnote">You can leave and come back — your draft stays on this device.</span></div>
  </form>;
}
