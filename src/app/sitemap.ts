import type {MetadataRoute} from "next";
import {services,projects} from "@/data/site";
const base="https://teal-axolotl-8a5cfd.netlify.app";
export default function sitemap():MetadataRoute.Sitemap{return ["","/about","/services","/projects","/technologies","/contact","/privacy","/terms",...services.map(s=>"/services/"+s.slug),...projects.map(p=>"/projects/"+p.slug)].map(path=>({url:base+path,lastModified:new Date(),changeFrequency:"monthly",priority:path===""?1:.7}))}