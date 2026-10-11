"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import styles from "../../auth.module.css";

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, signInWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setLoading(true);
    const result = signUp(String(form.get("name") || ""), String(form.get("email") || ""), String(form.get("password") || ""));
    setLoading(false);
    if (!result.ok) return setError(result.error || "অ্যাকাউন্ট তৈরি করা যায়নি।");
    router.push("/signin");
  };
  const google = () => { signInWithGoogle(); router.replace("/"); };
  return <main className={styles.authPage}><section className={styles.authCard}>
      <p className={styles.kicker}>বাজার দর পরিবারে যোগ দিন</p><h1 className={styles.title}>অ্যাকাউন্ট তৈরি করুন</h1><form className={styles.form} onSubmit={submit} noValidate>
        <label className={styles.label}>নাম<input name="name" autoComplete="name" placeholder="আপনার নাম" className={styles.input} /></label><label className={styles.label}>ইমেইল<input name="email" type="email" autoComplete="email" placeholder="you@example.com" className={styles.input} /></label><label className={styles.label}>পাসওয়ার্ড<input name="password" type="password" autoComplete="new-password" placeholder="অন্তত ৬ অক্ষর" className={styles.input} /></label>
        {error && <p className={styles.error} role="alert">{error}</p>}<button disabled={loading} className={styles.primaryButton}>{loading ? "তৈরি হচ্ছে..." : "রেজিস্ট্রেশন করুন"}</button>
      </form>
      <div className={styles.divider}>অথবা</div><button onClick={google} className={styles.googleButton}>G দিয়ে চালিয়ে যান</button><p className={styles.footerText}>ইতোমধ্যে অ্যাকাউন্ট আছে? <Link href="/signin">সাইন ইন করুন</Link></p>
    </section>
  </main>;
}
