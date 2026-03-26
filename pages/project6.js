import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/Project1.module.css";

const PROJECT_COUNT = 6;
const CURRENT_PROJECT = 6;
const NOT_OPENED_PROJECTS = new Set([2, 4, 6]);

function getProjectDestination(projectId) {
  if (NOT_OPENED_PROJECTS.has(projectId)) {
    return `/notOpen?project=${projectId}`;
  }
  return `/project${projectId}`;
}

export default function Project6Page() {
  const router = useRouter();
  const [isEnglish, setIsEnglish] = useState(false);
  const heroImageUrl = "https://www.figma.com/api/mcp/asset/5af4d540-6eca-4e8b-9d45-bafd85c3214c";

  useEffect(() => {
    router.replace("/notOpen?project=6");
  }, [router]);

  return (
    <>
      <Head>
        <title>Project 6 • The Unadopted</title>
        <meta name="description" content="Project 6" />
      </Head>
      <main className={styles.page}>
        <header className={styles.nav}>
          <div className={styles.navInner}>
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

        <section className={styles.hero} aria-label="Project hero image">
          <img className={styles.heroImage} src={heroImageUrl} alt="Project 6 hero visual" />
        </section>

        <section className={styles.content}>
          <div className={styles.intro}>
            <p className={styles.name}>홍유라</p>
            <div className={styles.titleWrap}>
              <h1 className={styles.title}>Self Lecture Series</h1>
              <p className={styles.subtitle}>프로젝트 부제목</p>
            </div>
          </div>

          <div className={styles.descriptionKo}>
            <p>
              이것은 작품 설명입니다. 이것은 단지 예시를 나타내기 위한 더미 텍스트입니다. 진짜 텍스트가 아직
              아닙니다. 참고만 부탁드립니다. 이것은 작품 설명입니다. 이것은 단지 예시를 나타내기 위한 더미
              텍스트입니다. 진짜 텍스트가 아직 아닙니다. 참고만 부탁드립니다.
            </p>
          </div>
          <div className={styles.descriptionEn}>
            <p>
              This is a paragraph of description of the project above. This is just a test text, not a real one.
              This is a paragraph of description of the project above. This is just a test text, not a real one.
            </p>
          </div>

          <div className={styles.mediaStack}>
            <div className={`${styles.grayBox} ${styles.grayBoxSmall}`}>
              <div className={styles.hintText}>
                <p className={styles.hintTitle}>프로젝트 이미지 A type</p>
              </div>
            </div>
            <a className={styles.websiteLink} href="https://yourahong.com/self-lecture/index.html" target="_blank" rel="noreferrer">
            https://yourahong.com/self-lecture/index.html
              </a>
          </div>
        </section>

        <footer className={styles.footerMeta}>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>IG</span>
            <a  className={styles.websiteLink} href="https://www.instagram.com/jiweon554/" target="_blank" rel="noreferrer">@jiweon554</a>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>Email</span>
            <a  className={styles.websiteLink} href="mailto:parkgiwon050@gmail.com" target="_blank" rel="noreferrer">parkgiwon050@gmail.com</a>
          </div>
        </footer>

        <div className={styles.ctaWrap}>
          <button
            type="button"
            className={styles.ctaButton}
            onClick={() => {
              let randomProject = CURRENT_PROJECT;
              while (randomProject === CURRENT_PROJECT) {
                randomProject = Math.floor(Math.random() * PROJECT_COUNT) + 1;
              }
              router.push(getProjectDestination(randomProject));
            }}
          >
            Click to adopt another one!
          </button>
          <img className={styles.ctaLever} src="/lever.svg" alt="" />
        </div>
      </main>
    </>
  );
}
