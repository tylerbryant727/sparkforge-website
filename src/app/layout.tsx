import type {Metadata} from "next";
import "./globals.css";
import {SiteHeader} from "@/components/site-header";
import {SiteFooter} from "@/components/site-footer";
const siteUrl="https://teal-axolotl-8a5cfd.netlify.app";
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:"Sparkforge Technologies | Intelligent Systems & Digital Engineering",template:"%s | Sparkforge Technologies"},description:"Sparkforge Technologies engineers AI systems, business automation, custom software and connected digital solutions for businesses in Nigeria, Africa and beyond.",openGraph:{type:"website",siteName:"Sparkforge Technologies",title:"Sparkforge Technologies",description:"Building Intelligent Systems. Engineering What's Next.",url:siteUrl,images:[{url:"/sparkforge-logo.svg",alt:"Sparkforge Technologies brand identity"}]},twitter:{card:"summary_large_image",title:"Sparkforge Technologies",description:"Building Intelligent Systems. Engineering What's Next."},icons:{icon:"/icon.svg"},robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><SiteHeader/>{children}<SiteFooter/></body></html>}