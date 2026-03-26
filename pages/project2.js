import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/Project1.module.css";

const PROJECT_COUNT = 6;
const CURRENT_PROJECT = 2;
const NOT_OPENED_PROJECTS = new Set([2, 4, 6]);

function getProjectDestination(projectId) {
  if (NOT_OPENED_PROJECTS.has(projectId)) {
    return `/notOpen?project=${projectId}`;
  }
  return `/project${projectId}`;
}

export default function Project2Page() {
  const router = useRouter();
  const [isEnglish, setIsEnglish] = useState(false);
  const heroImageUrl = "https://www.figma.com/api/mcp/asset/5af4d540-6eca-4e8b-9d45-bafd85c3214c";

  useEffect(() => {
    router.replace("/notOpen?project=2");
  }, [router]);

  return (
    <>
      <Head>
        <title>Project 2 • The Unadopted</title>
        <meta name="description" content="Project 2" />
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
          <img className={styles.heroImage} src={heroImageUrl} alt="Project 2 hero visual" />
        </section>

        <section className={styles.content}>
          <div className={styles.intro}>
            <p className={styles.name}>박수연</p>
            <div className={styles.titleWrap}>
              <h1 className={styles.title}>MAGIGYARU</h1>
              <p className={styles.subtitle}>마법소녀와 갸루를 결합한 새로운 문화</p>
            </div>
          </div>

          <div className={styles.descriptionKo}>
            <p>
            마지갸루는 전통적인 마법소녀 이미지를 현대적 감성과 개성으로 재해석한 새로운 갸루 문화이다. 갸루 문화에서 차용한 자유분방함과 강한 자기표현, 
외형에 대한 주체적인 태도는 마지갸루를 기존의 마법소녀 이미지와 
구별짓는 핵심 요소로 작용한다. 마지갸루는 선택받은 소수의 존재가 아닌 누구나 될 수 있으며, 스스로를 긍정하고 드러내는 과정에서 자연스럽게 
발현되는 힘을 지닌다. 마지갸루만의 스타일은 단순한 장식이 아닌 자신의 내면과 신념을 시각화한 상징이자 전투 방식이며, 하나의 언어가 된다. 
이를 통해 마지갸루는 귀여움과 순수함에만 머무르지 않고, 당당함·반항성·유희성을 포괄하는 새로운 여성상(또는 캐릭터상)을 제시한다.<br /><br />
            </p>
            </div>
            <div className={styles.descriptionEn}>
            <p>
            MAGIGYARU is a new gyaru culture that reinterprets the magical girl through contemporary sensibility and individuality.
            Its free-spirited attitude, strong self-expression, and agency over appearance distinguish it from conventional magical girl imagery. MAGIGYARU is not reserved for a chosen few, but something anyone can become. Its style is not mere   decoration, but a deeply personal symbol and a language in itself. Through this, MAGIGYARU moves beyond cuteness and innocence, embracing confidence, rebellion, and playfulness.
            </p>
          </div>

          <div className={styles.mediaStack}>
            <div className={`${styles.grayBox} ${styles.grayBoxSmall}`}>
              <div className={styles.hintText}>
                <p className={styles.hintTitle}>프로젝트 이미지 A type</p>
              </div>
            </div>
            <a className={styles.websiteLink} href="https://magigyaru.vercel.app/" target="_blank" rel="noreferrer">
            https://magigyaru.vercel.app/
              </a>
          </div>
        </section>

        <footer className={styles.footerMeta}>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>IG</span>
            <a  className={styles.websiteLink} href="https://www.instagram.com/yscoiing/" target="_blank" rel="noreferrer">@yscoiing</a>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>Email</span>
            <a  className={styles.websiteLink} href="mailto:yscino67@gmail.com" target="_blank" rel="noreferrer">yscino67@gmail.com</a>
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
