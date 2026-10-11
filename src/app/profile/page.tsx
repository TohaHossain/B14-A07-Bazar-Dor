"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import styles from "../auth.module.css";

export default function ProfilePage() {
  const router = useRouter();
  const { user, ready, signOut } = useAuth();
  useEffect(() => { if (ready && !user) router.replace("/signin"); }, [ready, user, router]);
  if (!ready || !user) return <main className={styles.profilePage}><div className={styles.loading} /></main>;
  return <main className={styles.profilePage}>
    <p className={styles.kicker}>আমার অ্যাকাউন্ট</p><h1 className={styles.title}>প্রোফাইল</h1>
    <section className={styles.profileCard}>
      <div className={styles.profileHead}><div className={styles.avatar}>{user.name.slice(0, 1)}</div><div><h2 className={styles.profileName}>{user.name}</h2><p className={styles.email}>{user.email}</p></div></div>
      <div className={styles.actions}><Link href="/profile/edit" className={styles.primaryButton}>তথ্য আপডেট করুন</Link><button onClick={() => { signOut(); router.push("/"); }} className={styles.secondaryButton}>সাইন আউট</button></div>
    </section>
  </main>;
}
