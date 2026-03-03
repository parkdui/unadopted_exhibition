import Head from "next/head";
import Link from "next/link";

export default function Project5Page() {
  return (
    <>
      <Head>
        <title>Project 5 • The Unadopted</title>
        <meta name="description" content="Project 5" />
      </Head>
      <main style={{ minHeight: "100vh", padding: 32, background: "#fff", color: "#000" }}>
        <Link href="/">← Home</Link>
        <h1 style={{ marginTop: 18, fontFamily: "Syne, ui-sans-serif, system-ui", fontWeight: 400 }}>
          Project 5
        </h1>
      </main>
    </>
  );
}

