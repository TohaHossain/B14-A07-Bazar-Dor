import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = { title: "বাজার দর | আজকের বাজারদর", description: "নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="bn"><body><AuthProvider><SiteHeader /><main>{children}</main><Footer /></AuthProvider></body></html>;
}
