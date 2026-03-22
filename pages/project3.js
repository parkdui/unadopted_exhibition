import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/Project1.module.css";

const imageSources = [
  "/exhibition_src/3_kkoomool/1.jpg",
  "/exhibition_src/3_kkoomool/2.jpg",
  "/exhibition_src/3_kkoomool/3.jpg",
  "/exhibition_src/3_kkoomool/4.jpg",
  "/exhibition_src/3_kkoomool/5.jpg",
  "/exhibition_src/3_kkoomool/6.jpg",
  "/exhibition_src/3_kkoomool/7.jpg",
  "/exhibition_src/3_kkoomool/8.jpg",
];

const videoSource = "/exhibition_src/3_kkoomool/Gray10.webm";
const mediaImageSources = imageSources.slice(1);
const PROJECT_COUNT = 6;
const CURRENT_PROJECT = 3;

export default function Project3Page() {
  const router = useRouter();
  const [isEnglish, setIsEnglish] = useState(false);
  return (
    <>
      <Head>
        <title>Project 3 • The Unadopted</title>
        <meta name="description" content="Project 3" />
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

        <section className={styles.hero} aria-label="Project 3 hero image">
          <img className={styles.heroImage} src={imageSources[0]} alt="Project 3 main visual" />
        </section>

        <section className={styles.content}>
          <div className={styles.intro}>
            <p className={styles.name}>박지원</p>
            <div className={styles.titleWrap}>
              <h1 className={styles.title}>꾸물 kkoomool</h1>
              <p className={styles.subtitle}>내 모든 꿈을 기록하고 추적하는 웹앱</p>
            </div>
          </div>

          <div className={styles.descriptionKo}>
            <p>
            꿈은 두 가지 의미가 있습니다. 밤에 잠들 때 나타나는 현상으로서의 꿈, 그리고 인생에 있어서 이루고자 하는 목표로서의 꿈.<br />
심리학자 지그문트 프로이트의 ‘꿈의 해석&apos;을 읽고, 두 종류의 꿈은 그리 다르지 않다는 것을 발견했습니다. 밤에 꾸는 꿈은 목표로서의 꿈, 즉 내재된 욕망을 재료로 삼아 만들어지기 때문입니다.<br />
하지만 꿈은 너무나도 빠르게 사라져버리고 맙니다. 내가 도달하고 싶었던 이상향을 잊고 살다가, 밤이 되어서야 보여주고 눈을 뜨고 나면 기억이 나지 않습니다. 마치 아침 이슬처럼요. 두 종류의 꿈들이 모두 증발하기 전에 기록해보는 건 어떨까요? 어떤 욕망이 나도 모르게 슬며시 튀어나왔는지 확인해보세요. 꿈을 타인에게 권할 수도 있고, 다른 사람의 꿈을 살 수도 있어요.
            </p>
            </div>
            <div className={styles.descriptionEn}>
            <p>
            &apos;Dream&apos; has two meanings: dreams as phenomena that appear when we fall asleep at night, and dreams as goals we wish to achieve in life.<br />
            After reading Sigmund Freud’s The Interpretation of Dreams, I discovered that these two kinds of dreams are not so different. Dreams we have at night are created by using the material of our aspirations, our goals and latent desires.<br />
            However, dreams disappear far too quickly. We live on having forgotten the ideal we once wanted to reach. Only at night does it reveal itself, and when we wake, we can no longer remember it, like morning dew. Before both kinds of dreams evaporate, why not try recording them? See what desires may have quietly surfaced without your noticing. You might even recommend your dream to others, or buy someone else’s dream.
            </p>
            </div>
          

          <div className={styles.mediaStack}>
            {mediaImageSources.map((src, index) => (
              <div key={src}>
                <img
                  className={styles.heroImage}
                  src={src}
                  alt={`Project 3 visual ${index + 2}`}
                  loading={index === 0 ? "eager" : "lazy"}
                />
                {index === 0 ? (
                  <video
                    className={styles.heroImage}
                    src={videoSource}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  >
                    브라우저가 비디오 태그를 지원하지 않습니다.
                  </video>
                ) : null}
              </div>
            ))}
            <a className={styles.websiteLink} href="https://kkoomool.vercel.app/" target="_blank" rel="noreferrer">
                https://kkoomool.vercel.app/
              </a>
          </div>
        </section>

        <footer className={styles.footerMeta}>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>IG</span>
            <a  className={styles.websiteLink} href="https://www.instagram.com/jiweon554/" target="_blank" rel="noreferrer">@jiweon554</a>
            {/* <span>@jiweon554</span> */}
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>Email</span>
            <a  className={styles.websiteLink} href="mailto:parkgiwon050@gmail.com" target="_blank" rel="noreferrer">parkgiwon050@gmail.com</a>
            {/* <span>parkgiwon050@gmail.com</span> */}
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

