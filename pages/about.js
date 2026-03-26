import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import navStyles from "@/styles/Home.module.css";
import styles from "@/styles/About.module.css";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutPage() {
  const [isEnglish, setIsEnglish] = useState(false);

  // NOTE: user-specified ScrollReveal params (must be preserved)
  const scrollRevealProps = {
    baseOpacity: 0.4,
    enableBlur: true,
    baseRotation: 0,
    blurStrength: 4,
  };

  return (
    <>
      <Head>
        <title>About • The Unadopted</title>
        <meta name="description" content="About" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={navStyles.mainPage}>
        <header className={navStyles.navbar} role="navigation" aria-label="Global">
          <div className={navStyles.navLeft}>
            <Link className={navStyles.navItem} href="/">
              Home
            </Link>
            <Link className={navStyles.navItem} href="/about" aria-current="page">
              About
            </Link>
            <Link className={navStyles.navItem} href="/guestbook">
              Guestbook
            </Link>
            <button
              type="button"
              className={`${navStyles.navItem} ${navStyles.navButton}`}
              onClick={() => setIsEnglish((prev) => !prev)}
              aria-pressed={isEnglish}
            >
              {isEnglish ? "KOR" : "EN"}
            </button>
          </div>
        </header>

        <main className={styles.main} aria-label="About">
          <Link className={styles.backHome} href="/">
            ← Home
          </Link>

          <section className={styles.titleSubtitleSection}>
            <div className={styles.titleBlock}>
              <div className={styles.titleEn}>
                THE
                <br />
                UNADOPTED
              </div>
              <div className={styles.titleKo}>채택받지 못한 아이들</div>
            </div>

            <div className={styles.subtitle}>
              <span className={styles.subtitleDark}>
                not having been taken from a place such as a rescue centre{" "}
              </span>
              <span className={styles.subtitlePink}>to become someone's pet</span>
            </div>
          </section>

          <section className={styles.descriptionSection}>
            <div className={styles.descKo}>
              <ScrollReveal {...scrollRevealProps}>
                디자이너로서, 아티스트로서, 그냥 뭔가를 만드는 행위를 멈추지 않고서는 못 배기는
                창작자들이 소중히 키워 온 아이디어가 있습니다. 상업성이 없다는 이유로, 대중성이
                없다는 이유로, 혹은 너무 ‘아티스트' 같다는 이유만으로 뽑히지 못한 아이디어들은
                성장을 멈추곤 합니다. 이리저리 치이다가 결국 빛을 보지 못하고 마음 한 켠에
                내던져지고 맙니다.
              </ScrollReveal>
              
              <br />
              <ScrollReveal {...scrollRevealProps}>
                이제 손을 내밀어 그들을 다시 꺼내어봅시다. 두텁게 쌓인 먼지를 닦아내고, 따뜻한
                햇볕을 쪼이고, 다시 활기를 불어 넣어보는 겁니다. 남들에게 채택되지 않았다 하더라도,
                창작자 자신들에게는 버려지지 않은, 아직 채택될 기회가 있는 아이디어들이기
                때문입니다.
              </ScrollReveal>
              
              <br />
              <ScrollReveal {...scrollRevealProps}>
                〈채택받지 못한 아이들〉은 여섯 명이 각자의 묵혀둔 아이디어를 마침내 꺼내보이는 웹
                전시입니다. 바쁜 학기를 마치고 약 두 달 남짓의 시간동안 갈고 닦은 아이들을 무대에
                올려두려 합니다.
              </ScrollReveal>
              
              <br />
              <ScrollReveal {...scrollRevealProps}>
                마음껏, 있는 힘껏, 모두 채택해주시길 바랍니다.
              </ScrollReveal>
            </div>

            <div className={styles.descEn}>
              <ScrollReveal {...scrollRevealProps}>
                As designers, as artists—simply as people who cannot help but keep making things—we
                carry ideas that we have carefully nurtured over time. Yet some of these ideas stop
                growing. Dismissed for lacking commercial value, for not being popular enough, or for
                being “too artistic,” they are set aside. After being pushed around and overlooked,
                they fail to see the light of day and are eventually left in a quiet corner of our
                hearts.
              </ScrollReveal>
              
              <br />
              <ScrollReveal {...scrollRevealProps}>
                Now, let us reach out and bring them back. Let us wipe away the thick layer of dust,
                let them bask in warm sunlight, and breathe new life into them. Even if they were not
                selected by others, they were never abandoned by their creators. They remain ideas
                that still deserve a chance to be chosen.
              </ScrollReveal>
              
              <br />
              <ScrollReveal {...scrollRevealProps}>
                {"<The Unadopted>"} is a web exhibition where six creators finally unveil the ideas
                they had long kept tucked away. After completing a busy semester, we spent nearly two
                months refining and nurturing these works, preparing to place them on stage at last.
              </ScrollReveal>
              <br />
              <ScrollReveal {...scrollRevealProps}>
                Freely, wholeheartedly—we invite you to adopt them all.
              </ScrollReveal>
            </div>
          </section>

          <section className={styles.periodSection}>
            <div className={styles.periodTitle}>작업 기간</div>
            <div className={styles.periodDescription}>
              2025.12-2026.03
              </div>
          </section>

          <section className={styles.creditPlanSection}>
            <div className={styles.creditTitlePlan}>기획</div>
            <div className={styles.creditDescriptionPlan}>
              <p>권도연</p>
              <p>박지원</p>
            </div>
          </section>

          <section className={styles.creditDevSection}>
            <div className={styles.creditTitleDev}>웹 개발</div>
            <div className={styles.creditDescriptionDev}>
              <p>박지원</p>
            </div>
          </section>

          <section className={styles.participantsSection}>
            <div className={styles.participantsTitle}>참여한 사람들</div>
            <div className={styles.participantsDescription}>
              <p>권도연</p>
              <p>박수연</p>
              <p>박지원</p>
              <p>박혜빈</p>
              <p>조수현</p>
              <p>홍유라</p>
              </div>
          </section>
          
        </main>
      </div>
    </>
  );
}

