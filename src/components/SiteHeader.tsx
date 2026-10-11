"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategories, type Category } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";

export default function SiteHeader() {
  const { user, ready, signOut } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => { getCategories().then(setCategories); }, []);
  const date = new Intl.DateTimeFormat("bn-BD", { weekday: "long", day: "numeric", month: "long" }).format(new Date());
  return <header className="site-header"><div className="header-inner">
    <div className="brand-row"><Link className="brand" href="/"><span>🛒</span><span>বাজার দর<small>{date}</small></span></Link>
      <nav className="auth-links">{ready && user ? <><Link href="/profile">{user.name}</Link><button className="header-signout" onClick={signOut}>সাইন আউট</button></> : <><Link href="/signin">সাইন ইন</Link><Link className="button small" href="/signup">সাইন আপ</Link></>}</nav>
    </div>
    <nav className="category-nav" aria-label="পণ্যের ধরন"><Link href="/">সব পণ্য</Link>{categories.slice(0, 7).map(c => <Link href={`/category/${c.slug}`} key={c.slug}>{c.icon} {c.name}</Link>)}</nav>
  </div><div className="ticker" aria-label="দামের চলমান খবর"><div>🍚 মিনিকেট চাল — ৭৮ টাকা/কেজি <b>▲ ২.১%</b>　 🧅 পেঁয়াজ — ৭২ টাকা/কেজি <em>▼ ৩.১%</em>　 🐟 রুই মাছ — ৩৮০ টাকা/কেজি <em>▼ ২.৯%</em>　 🥚 ডিম — ১৫৫ টাকা/ডজন <b>▲ ২.২%</b></div></div></header>;
}
