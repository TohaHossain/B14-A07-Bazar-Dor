"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import styles from "../../auth.module.css";

export default function SignInPage() {
  const router = useRouter();
  const { signIn, signInWithGoogle, notice } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    setLoading(true);
    const result = signIn(email, password);
    setLoading(false);
    if (!result.ok) return setError(result.error || "সাইন ইন করা যায়নি।");
    router.replace("/");
  };

  const google = () => { signInWithGoogle(); router.replace("/"); };

  return <main className={styles.authPage}><section className={styles.authCard}>
      <p className={styles.kicker}>বাজার দর-এ স্বাগতম</p><h1 className={styles.title}>সাইন ইন করুন</h1><p className={styles.copy}>দৈনিক বাজারদর দেখতে আপনার অ্যাকাউন্টে প্রবেশ করুন।</p>
      <form className={styles.form} onSubmit={submit} noValidate>
        <label className={styles.label}>ইমেইল<input name="email" type="email" autoComplete="email" placeholder="you@example.com" className={styles.input} /></label>
        <label className={styles.label}>পাসওয়ার্ড<input name="password" type="password" autoComplete="current-password" placeholder="আপনার পাসওয়ার্ড" className={styles.input} /></label>
        {error && <p className={styles.error} role="alert">{error}</p>}<button disabled={loading} className={styles.primaryButton}>{loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}</button>
      </form>
      <div className={styles.divider}>অথবা</div><button onClick={google} className={styles.googleButton}>G দিয়ে চালিয়ে যান</button>
      <p className={styles.footerText}>নতুন এখানে? <Link href="/signup">অ্যাকাউন্ট তৈরি করুন</Link></p>{!notice && <p className={styles.demo}>ডেমো: demo@bazardor.com / 123456</p>}
    </section>
  </main>;
}
