"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import styles from "../../auth.module.css";

export default function EditProfilePage() {
  const router = useRouter();
  const { user, ready, updateName } = useAuth();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  useEffect(() => { if (ready && !user) router.replace("/signin"); if (user) setName(user.name); }, [ready, user, router]);
  const submit = (event: FormEvent) => { event.preventDefault(); const result = updateName(name); if (!result.ok) return setError(result.error || "তথ্য পরিবর্তন করা যায়নি।"); router.push("/profile"); };
  if (!ready || !user) return <main className={styles.profilePage}><div className={styles.loading} /></main>;
  return <main className={styles.profilePage}><section className={styles.profileCard}><p className={styles.kicker}>প্রোফাইল</p><h1 className={styles.title}>তথ্য আপডেট করুন</h1><form onSubmit={submit} className={styles.form}><label className={styles.label}>নাম<input value={name} onChange={(event) => setName(event.target.value)} className={styles.input} /></label>{error && <p role="alert" className={styles.error}>{error}</p>}<button className={styles.primaryButton}>তথ্য আপডেট করুন</button></form></section></main>;
}
