import Head from "next/head";
import Link from "next/link";

export default function Project4Page() {
  return (
    <>
      <Head>
        <title>Project 4 • The Unadopted</title>
        <meta name="description" content="Project 4" />
      </Head>
      <main style={{ minHeight: "100vh", padding: 32, background: "#fff", color: "#000" }}>
        <Link href="/">← Home</Link>
        <h1 style={{ marginTop: 18, fontFamily: "Syne, ui-sans-serif, system-ui", fontWeight: 400 }}>
          Project 4
        </h1>
      </main>
    </>
  );
}

