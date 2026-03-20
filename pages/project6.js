import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Project1.module.css";

export default function Project6Page() {
  const heroImageUrl = "https://www.figma.com/api/mcp/asset/5af4d540-6eca-4e8b-9d45-bafd85c3214c";
  const ctaDotUrl = "https://www.figma.com/api/mcp/asset/27dd6947-9b2a-4cd0-93fa-0104049897d1";

  return (
    <>
      <Head>
        <title>Project 6 • The Unadopted</title>
        <meta name="description" content="Project 6" />
      </Head>
      <main className={styles.page}>
        <header className={styles.nav}>
          <div className={styles.navInner}>
            <Link className={styles.navLink} href="/">
              Home
            </Link>
            <Link className={styles.navLink} href="/about">
              About
            </Link>
            <Link className={styles.navLink} href="/guestbook">
              Guestbook
            </Link>
          </div>
        </header>

        <section className={styles.hero} aria-label="Project hero image">
          <img className={styles.heroImage} src={heroImageUrl} alt="Project 6 hero visual" />
        </section>

        <section className={styles.content}>
          <div className={styles.intro}>
            <p className={styles.name}>작가명</p>
            <div className={styles.titleWrap}>
              <h1 className={styles.title}>프로젝트 제목</h1>
              <p className={styles.subtitle}>프로젝트 부제목</p>
            </div>
          </div>

          <div className={styles.description}>
            <p>
              이것은 작품 설명입니다. 이것은 단지 예시를 나타내기 위한 더미 텍스트입니다. 진짜 텍스트가 아직
              아닙니다. 참고만 부탁드립니다. 이것은 작품 설명입니다. 이것은 단지 예시를 나타내기 위한 더미
              텍스트입니다. 진짜 텍스트가 아직 아닙니다. 참고만 부탁드립니다.
            </p>
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
          </div>
        </section>

        <footer className={styles.footerMeta}>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>IG</span>
            <span>@instagram</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>Email</span>
            <span>email@example.com</span>
          </div>
        </footer>

        <div className={styles.ctaWrap}>
          <button type="button" className={styles.ctaButton}>
            Click to adopt!
          </button>
          <img className={styles.ctaDot} src={ctaDotUrl} alt="" />
        </div>
      </main>
    </>
  );
}

