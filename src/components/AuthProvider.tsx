"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import styles from "@/app/auth.module.css";

export type User = { name: string; email: string };
type StoredAccount = User & { password: string };
type Notice = { message: string; type: "success" | "error" } | null;

type AuthContextValue = {
  user: User | null;
  ready: boolean;
  notice: Notice;
  dismissNotice: () => void;
  showNotice: (message: string, type: "success" | "error") => void;
  signIn: (email: string, password: string) => { ok: boolean; error?: string };
  signUp: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  signInWithGoogle: () => void;
  signOut: () => void;
  updateName: (name: string) => { ok: boolean; error?: string };
};

const AuthContext = createContext<AuthContextValue | null>(null);
const ACCOUNTS_KEY = "bazardor:accounts";
const SESSION_KEY = "bazardor:session";

const demoAccount: StoredAccount = {
  name: "বাজারদর ব্যবহারকারী",
  email: "demo@bazardor.com",
  password: "123456",
};

function readAccounts(): StoredAccount[] {
  try {
    const saved = localStorage.getItem(ACCOUNTS_KEY);
    return saved ? JSON.parse(saved) : [demoAccount];
  } catch {
    return [demoAccount];
  }
}

function validEmail(email: string) {
  return /^\S+@\S+\.\S+$/.test(email);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const announce = useCallback((message: string, type: "success" | "error") => {
    setNotice({ message, type });
    window.setTimeout(() => setNotice(null), 3600);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      if (saved) setUser(JSON.parse(saved));
    } catch {
      localStorage.removeItem(SESSION_KEY);
    } finally {
      setReady(true);
    }
  }, []);

  const signUp = (rawName: string, rawEmail: string, password: string) => {
    const name = rawName.trim();
    const email = rawEmail.trim().toLowerCase();
    if (name.length < 2) return { ok: false, error: "অনুগ্রহ করে আপনার নাম লিখুন।" };
    if (!validEmail(email)) return { ok: false, error: "সঠিক ইমেইল ঠিকানা লিখুন।" };
    if (password.length < 6) return { ok: false, error: "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।" };
    const accounts = readAccounts();
    if (accounts.some((account) => account.email === email)) {
      return { ok: false, error: "এই ইমেইল দিয়ে ইতোমধ্যে একটি অ্যাকাউন্ট আছে।" };
    }
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, { name, email, password }]));
    announce("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।", "success");
    return { ok: true };
  };

  const signIn = (rawEmail: string, password: string) => {
    const email = rawEmail.trim().toLowerCase();
    if (!validEmail(email) || !password) return { ok: false, error: "ইমেইল ও পাসওয়ার্ড দিন।" };
    const account = readAccounts().find((candidate) => candidate.email === email && candidate.password === password);
    if (!account) return { ok: false, error: "ইমেইল বা পাসওয়ার্ড সঠিক নয়।" };
    const session = { name: account.name, email: account.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    announce("সফলভাবে সাইন ইন করা হয়েছে।", "success");
    return { ok: true };
  };

  const signInWithGoogle = () => {
    const session = { name: "Google ব্যবহারকারী", email: "google.user@bazardor.app" };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    announce("Google দিয়ে সাইন ইন করা হয়েছে।", "success");
  };

  const signOut = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    announce("আপনি সাইন আউট করেছেন।", "success");
  };

  const updateName = (rawName: string) => {
    const name = rawName.trim();
    if (name.length < 2) return { ok: false, error: "নাম অন্তত ২ অক্ষরের হতে হবে।" };
    if (!user) return { ok: false, error: "তথ্য পরিবর্তনের আগে সাইন ইন করুন।" };
    const next = { ...user, name };
    localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    const accounts = readAccounts().map((account) => account.email === user.email ? { ...account, name } : account);
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    setUser(next);
    announce("আপনার তথ্য আপডেট করা হয়েছে।", "success");
    return { ok: true };
  };

  return (
    <AuthContext.Provider value={{ user, ready, notice, dismissNotice: () => setNotice(null), showNotice: announce, signIn, signUp, signInWithGoogle, signOut, updateName }}>
      {children}
      {notice && (
        <div className={`${styles.toast} ${notice.type === "success" ? styles.toastSuccess : styles.toastError}`} role="status">
          <button onClick={() => setNotice(null)} className={styles.toastClose} aria-label="বার্তা বন্ধ করুন">×</button>
          {notice.message}
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
