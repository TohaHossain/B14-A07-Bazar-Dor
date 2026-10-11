import Link from "next/link";

export default function NotFound() {
  return <main className="container empty-state" aria-labelledby="not-found-title">
    <span className="empty-icon" aria-hidden="true">🧺</span>
    <p className="eyebrow">৪০৪</p>
    <h1 id="not-found-title">পৃষ্ঠা খুঁজে পাওয়া যায়নি</h1>
    <p>ঠিকানাটি আবার যাচাই করুন, অথবা হোম পেজ থেকে প্রয়োজনীয় পণ্যটি খুঁজে নিন।</p>
    <Link className="button button-primary" href="/">হোম পেজে ফিরে যান</Link>
  </main>;
}
