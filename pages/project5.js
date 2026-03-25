import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/Project1.module.css";

const PROJECT_COUNT = 6;
const CURRENT_PROJECT = 5;

export default function Project5Page() {
  const router = useRouter();
  const [isEnglish, setIsEnglish] = useState(false);
  const heroImageUrl = "/exhibition_src/5_transcendental/1.jpg";
  const mediaImageSources = [
    "/exhibition_src/5_transcendental/2.jpg",
    "/exhibition_src/5_transcendental/3.jpg",
    "/exhibition_src/5_transcendental/4.jpg",
    "/exhibition_src/5_transcendental/5.jpg",
  ];

  return (
    <>
      <Head>
        <title>Project 5 • The Unadopted</title>
        <meta name="description" content="Project 5" />
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
          <img className={styles.heroImage} src={heroImageUrl} alt="Project 5 hero visual" />
        </section>

        <section className={styles.content}>
          <div className={styles.intro}>
            <p className={styles.name}>조수현</p>
            <div className={styles.titleWrap}>
              <h1 className={styles.title}>Transcendental Etude for Everyone</h1>
              <p className={styles.subtitle}>모두를 위한 초절기교 연습곡</p>
            </div>
          </div>

          <div className={styles.descriptionKo}>
            <p>
            때로 나는 선을 긋기는커녕 점 하나를 찍는 일조차 깊은 고민에 빠지곤 한다. 무엇도 결정하지 못한 채 그저 멈춰 있는 상태. 그러나 그 정적 속에서 내가 할 수 있는 일은 지금 당장 시도 가능한 것들을 찾아 하나둘 무작정 해나가는 것뿐이다. 그렇게 흩뿌려진 부스러기들이 훗날 보이지 않는 선으로 연결되어 있음을 깨닫는 순간이 온다. 처음에는 그저 허풍처럼 느껴졌던 시도들은 지극히 평범하고도 끈기 있는 과정이다.<br /><br />
            본 작업은 에이드리언 리치(Adrienne Rich)의 시 &apos;초절기교 연습곡(Transcendental Etude)&apos;의 구절들을 인용하고 재구성하였다. 리치가 노래했듯, 산산조각 난 거울 파편들을 모아 이전에는 없었던 패턴으로 다시 짜 넣는 방식은 곧 나의 작업 방식과 닮아 있다. 우리는 박자를 읽기도 전, 이미 울리고 있는 &apos;어려운 악장&apos; 한가운데에서 태어났다. 이 쓸데없어 보이는 웹 또한 마침내 자기 자신에게로 돌아온 모든 이들을 위한 노래이자, 
            보이지 않는 연결을 믿고 나아가는 모두를 위한 초절기교 연습곡을 표방한다.<br /><br />
            </p>
            </div>
            <div className={styles.descriptionEn}>
            <p>
            At times, I fall into deep hesitation over even placing a single dot, let alone drawing a line. Unable to decide anything, I remain suspended in a state of stillness. Yet within that silence, the only thing I can do is to look for what can be attempted in the present moment and begin, one by one, without much certainty. In time, a moment arrives when those scattered fragments reveal themselves to be connected by invisible lines. What first felt like mere bluster or empty attempts turns out to be nothing more—and nothing less—than an ordinary yet persistent process.<br /><br />
            This work cites and reconfigures passages from Transcendental Etude by Adrienne Rich. As Rich writes, the act of gathering the shards of a shattered mirror and weaving them into a pattern that never existed before closely resembles my own way of working. We are born, after all, into the midst of a difficult movement already sounding—before we have even learned how to read the beat. This seemingly useless web, too, aspires to be a song for those who have finally come home to themselves, and a transcendental etude for all who continue forward believing in invisible connections.
            </p>
          </div>

          <div className={styles.mediaStack}>
            {mediaImageSources.map((src, index) => (
              <img
                key={src}
                className={styles.heroImage}
                src={src}
                alt={`Project 5 visual ${index + 2}`}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}
            <div className={styles.iframeContainer}>
              <iframe className={styles.iframe} src="https://transcendentaletudeforeveryone.netlify.app" width="100%" height="100%" style={{ border: "none" }}></iframe>
            </div>
            <a className={styles.websiteLink} href="https://transcendentaletudeforeveryone.netlify.app" target="_blank" rel="noreferrer">
            https://transcendentaletudeforeveryone.netlify.app
              </a>
          </div>
        </section>

        <footer className={styles.footerMeta}>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>IG</span>
            <a
              className={styles.websiteLink}
              href="https://www.instagram.com/tide1h/"
              target="_blank"
              rel="noreferrer"
            >
              @tide1h
            </a>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>Email</span>
            <a
              className={styles.websiteLink}
              href="mailto:tide1h@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              tide1h@gmail.com
            </a>
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

