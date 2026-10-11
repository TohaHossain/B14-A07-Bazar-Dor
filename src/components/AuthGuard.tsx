"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

/** Client-side gate for routes whose content is only meaningful to signed-in users. */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, ready, showNotice } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (ready && !user) {
      showNotice("পণ্যের বিস্তারিত দেখতে আগে সাইন ইন করুন।", "error");
      router.replace(`/signin?next=${encodeURIComponent(pathname)}`);
    }
  }, [pathname, ready, router, showNotice, user]);
  if (!ready || !user) return <div className="page-center"><p>তথ্য লোড হচ্ছে...</p></div>;
  return <>{children}</>;
}
