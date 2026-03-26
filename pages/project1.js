import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/Project1.module.css";

const PROJECT_COUNT = 6;
const CURRENT_PROJECT = 1;
const NOT_OPENED_PROJECTS = new Set([2, 4, 6]);
const ROTATED_SPREAD_NUMBERS = new Set([
  4, 5, 9, 10, 11, 12, 15, 16, 19, 20, 21, 22, 23, 24, 25, 26, 29, 30, 31,
  32, 33, 34, 35, 38, 39, 40, 41, 42, 43, 46, 47, 50, 51,
]);

function getProjectDestination(projectId) {
  if (NOT_OPENED_PROJECTS.has(projectId)) {
    return `/notOpen?project=${projectId}`;
  }
  return `/project${projectId}`;
}

export default function Project1Page() {
  const router = useRouter();
  const [isEnglish, setIsEnglish] = useState(false);
  const heroImageUrl = "/exhibition_src/1_eogeumni/1.jpg";
  const firstMediaImageUrl = "/exhibition_src/1_eogeumni/2.jpg";
  const spreadImageSources = Array.from(
    { length: 60 },
    (_, index) => `/exhibition_src/1_eogeumni/image_spread/book_${index + 1}.png`,
  );
  const lastMediaImageUrl = "/exhibition_src/1_eogeumni/last.jpg";

  return (
    <>
      <Head>
        <title>Project 1 • The Unadopted</title>
        <meta name="description" content="Project 1" />
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
          <img className={styles.heroImage} src={heroImageUrl} alt="Project 1 hero visual" />
        </section>

        <section className={styles.content}>
          <div className={styles.intro}>
            <p className={styles.name}>권도연</p>
            <div className={styles.titleWrap}>
              <h1 className={styles.title}>수동 알고리즘</h1>
              <p className={styles.subtitle}>어금니프레스</p>
            </div>
          </div>

          <div className={styles.descriptionKo}>
            <p>
            수동알고리즘 프로젝트는 ’좋아하는 것‘을 기준으로 사람을 추천하는 기존 알고리즘과 달리, 호불호 중 ’불호‘에 집중해 펜팔을 연결하는 프로젝트
입니다. 이 프로젝트는 디자이너가 알고리즘이 되어 사람들의 글을 읽고, 
편지를 바탕으로 관계를 중개합니다.
            </p>
            </div>
            <div className={styles.descriptionEn}>
            <p>
            The Passive Algorithm Project connects pen pals by focusing on what people dislike, rather than what they like—unlike conventional algorithms that rely on shared preferences.
            In this project, the designer acts as the algorithm, carefully reading each person’s writing and mediating connections based on their letters.
            </p>
          </div>

          <div className={styles.mediaStack}>
            <img className={styles.heroImage} src={firstMediaImageUrl} alt="Project 1 visual 2" loading="eager" />
            {spreadImageSources.map((src, index) => (
              <img
                key={src}
                className={`${styles.heroImage} ${
                  ROTATED_SPREAD_NUMBERS.has(index + 1) ? styles.rotatedSpread : ""
                }`}
                src={src}
                alt={`Project 1 spread visual ${index + 1}`}
                loading="lazy"
              />
            ))}
            <img className={styles.heroImage} src={lastMediaImageUrl} alt="Project 1 ending visual" loading="lazy" />
          </div>
        </section>

        <footer className={styles.footerMeta}>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>IG</span>
            <a  className={styles.websiteLink} href="https://www.instagram.com/eogeumnipress/" target="_blank" rel="noreferrer">@eogeumnipress</a>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>Email</span>
            <a  className={styles.websiteLink} href="mailto:pippobap@gmail.com" target="_blank" rel="noreferrer">pippobap@gmail.com</a>
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

