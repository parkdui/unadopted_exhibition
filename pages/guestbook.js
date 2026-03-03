import Head from "next/head";
import Link from "next/link";

export default function GuestbookPage() {
  return (
    <>
      <Head>
        <title>Guestbook • The Unadopted</title>
        <meta name="description" content="Guestbook" />
      </Head>
      <main style={{ minHeight: "100vh", padding: 32, background: "#fff", color: "#000" }}>
        <Link href="/">← Home</Link>
        <h1 style={{ marginTop: 18, fontFamily: "Syne, ui-sans-serif, system-ui", fontWeight: 400 }}>
          Guestbook
        </h1>
        <p style={{ marginTop: 10, maxWidth: 720, lineHeight: 1.6 }}>
          (placeholder) 여기에 방명록 UI를 붙일 수 있어.
        </p>
      </main>
    </>
  );
}

