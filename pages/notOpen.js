import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

const PROJECT_COUNT = 6;
const NOT_OPENED_PROJECTS = new Set([4, 6]);
const PROJECT_COLORS = {
  1: "#FBF130",
  2: "#FB3D3D",
  3: "#FF9B4E",
  4: "#14F86C",
  5: "#60A0FB",
  6: "#D46FFC",
};

function getProjectDestination(projectId) {
  if (NOT_OPENED_PROJECTS.has(projectId)) {
    return `/notOpen?project=${projectId}`;
  }
  return `/project${projectId}`;
}

export default function NotOpenPage() {
  const router = useRouter();
  const [isEnglish, setIsEnglish] = useState(false);
  const projectParam = Array.isArray(router.query.project)
    ? router.query.project[0]
    : router.query.project;
  const selectedProjectId = Number.parseInt(projectParam ?? "", 10);
  const selectedColor = PROJECT_COLORS[selectedProjectId] ?? null;

  return (
    <>
      <Head>
        <title>Under Construction • The Unadopted</title>
        <meta name="description" content="This project is under construction." />
      </Head>
      <header className={styles.navbar} role="navigation" aria-label="Global">
        <div className={styles.navLeft}>
          <Link className={styles.navItem} href="/">
            Home
          </Link>
          <Link className={styles.navItem} href="/about">
            About
          </Link>
          <Link className={styles.navItem} href="/guestbook">
            Guestbook
          </Link>
          <button
            type="button"
            className={`${styles.navItem} ${styles.navButton}`}
            onClick={() => setIsEnglish((prev) => !prev)}
            aria-pressed={isEnglish}
          >
            {isEnglish ? "KOR" : "EN"}
          </button>
        </div>
      </header>
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "24px",
          textAlign: "center",
          backgroundColor: "#fff",
          color: "#000",
          fontFamily: "Pretendard Variable",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {selectedColor ? (
          <div
            aria-hidden="true"
            style={{
              width: "360px",
              height: "360px",
              borderRadius: "9999px",
              backgroundColor: selectedColor,
              position: "absolute",
              left: "50%",
              top: "58%",
              transform: "translate(-50%, -50%)",
              zIndex: 0,
            }}
          />
        ) : null}

        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "40px", lineHeight: 1.3, margin: 0, fontFamily: "Syne", marginBottom: "24px"}}>
              Oops! Under Construction.
          </h1>
          <p style={{ fontSize: "20px", lineHeight: 1.6, margin: 0 }}>
            지금 이 프로젝트는 공사 중입니다.
            <br />
            3/27일 이후에 꼭 다시 만나러 와주세요.
          </p>
          <Link
            href="/"
            style={{
              marginTop: "24px",
              textDecoration: "underline",
              color: "#000",
              fontSize: "16px",
              display: "inline-block",
            }}
          >
            Home으로 돌아가기
          </Link>

          <div className={styles.randomAdoptArea}>
            <button
              type="button"
              className={styles.randomAdoptButton}
              onClick={() => {
                const randomProject = Math.floor(Math.random() * PROJECT_COUNT) + 1;
                router.push(getProjectDestination(randomProject));
              }}
            >
              Click to randomly adopt!
            </button>
            <img className={styles.randomAdoptLever} src="/lever.svg" alt="" />
          </div>
        </div>
      </main>
    </>
  );
}

