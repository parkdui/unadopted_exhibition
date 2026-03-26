import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/Project1.module.css";

const PROJECT_COUNT = 6;
const CURRENT_PROJECT = 4;

export default function Project4Page() {
  const router = useRouter();
  const [isEnglish, setIsEnglish] = useState(false);
  const heroImageUrl = "https://www.figma.com/api/mcp/asset/5af4d540-6eca-4e8b-9d45-bafd85c3214c";

  useEffect(() => {
    router.replace("/notOpen");
  }, [router]);

  return (
    <>
      <Head>
        <title>Project 4 • The Unadopted</title>
        <meta name="description" content="Project 4" />
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
          <img className={styles.heroImage} src={heroImageUrl} alt="Project 4 hero visual" />
        </section>

        <section className={styles.content}>
          <div className={styles.intro}>
            <p className={styles.name}>박혜빈</p>
            <div className={styles.titleWrap}>
              <h1 className={styles.title}>UNLOCKED ARCHIVED MUSEUM</h1>
              <p className={styles.subtitle}>락커 안 답사기, 뮤지엄 보관소</p>
            </div>
          </div>

          <div className={styles.descriptionKo}>
            <p>
            이 웹사이트는 박혜빈이 2025년 9월부터 2026년 1월까지 다녀온 유럽 뮤지엄 답사기이다. 총 29곳을 방문하였으며, 그중 깊은 감명을 받은 일부의 답사기를 담았다. 이곳에는 각 뮤지엄에 있는 락커 또는 네모난 형태의 사물들이 쌓여 있다. 

락커를 열고 지극히 개인적인 답사기를 읽어주시길 바란다. 전문적인 분석은 아니지만 각 뮤지엄만의 고유한 태도를 찾아내고자 했다. 언젠가 나 또한 소장품뿐만 아니라 리플렛과 벤치로, 작가뿐만이 아니라 사회가 하고 싶은 말을 전하는 그곳들 중 하나에서 제작자로 일할 수 있길 바라며···.<br /><br />
            </p>
          </div>
          <div className={styles.descriptionEn}>
            <p>
            This website is a record of  Park Hyebin’s visits to European museums from September 2025 to January 2026.
Among the 29 museums visited, a selection of those that left a lasting impression is presented here. In this space, lockers—or box-like objects found in each museum—are stacked together.
You are invited to open each locker and read these deeply personal reflections.

Though not a professional analysis, this project attempts to trace the distinct attitude of each museum. Beyond collections, it looks at leaflets, benches, and spatial elements - at how these places communicate what society seeks to express, not only through artists but through the institution itself. One day, I hope to become a maker within such a space—
one that speaks, in its own way.
            </p>
          </div>

          <div className={styles.mediaStack}>
            <div className={`${styles.grayBox} ${styles.grayBoxSmall}`}>
              <div className={styles.hintText}>
                <p className={styles.hintTitle}>프로젝트 이미지 A type</p>
              </div>
            </div>
            <a className={styles.websiteLink} href="https://kkoomool.vercel.app/" target="_blank" rel="noreferrer">
                https://kkoomool.vercel.app/
              </a>
          </div>
        </section>

        <footer className={styles.footerMeta}>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>IG</span>
            <a  className={styles.websiteLink} href="https://www.instagram.com/bagaebin/" target="_blank" rel="noreferrer">@bagaebin</a>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>Email</span>
            <a  className={styles.websiteLink} href="mailto:bagaebin0@gmail.com" target="_blank" rel="noreferrer">bagaebin0@gmail.com</a>
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
              router.push(`/project${randomProject}`);
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
