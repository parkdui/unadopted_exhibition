import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Project1.module.css";

export default function ProjectPageTemplate({ projectNumber }) {
  const heroImageUrl = "https://www.figma.com/api/mcp/asset/5af4d540-6eca-4e8b-9d45-bafd85c3214c";
  const ctaDotUrl = "https://www.figma.com/api/mcp/asset/27dd6947-9b2a-4cd0-93fa-0104049897d1";

  return (
    <>
      <Head>
        <title>{`Project ${projectNumber} • The Unadopted`}</title>
        <meta name="description" content={`Project ${projectNumber}`} />
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
          <img className={styles.heroImage} src={heroImageUrl} alt={`Project ${projectNumber} hero visual`} />
        </section>

        <section className={styles.content}>
          <div className={styles.intro}>
            <p className={styles.name}>박지원</p>
            <div className={styles.titleWrap}>
              <h1 className={styles.title}>꾸물 kkoomool</h1>
              <p className={styles.subtitle}>꿈을 기록하고 추적하는 웹앱</p>
            </div>
          </div>

          <div className={styles.description}>
            <p>
              이것은 작품 설명입니다. 이것은 단지 예시를 나타내기 위한 더미 텍스트입니다. 진짜 텍스트가 아직
              아닙니다. 참고만 부탁드립니다. 이것은 작품 설명입니다. 이것은 단지 예시를 나타내기 위한 더미
              텍스트입니다. 진짜 텍스트가 아직 아닙니다. 참고만 부탁드립니다. 이것은 작품 설명입니다. 이것은 단지
              예시를 나타내기 위한 더미 텍스트입니다. 진짜 텍스트가 아직 아닙니다. 참고만 부탁드립니다. 이것은 작품
              설명입니다. 이것은 단지 예시를 나타내기 위한 더미 텍스트입니다. 진짜 텍스트가 아직 아닙니다. 참고만
              부탁드립니다.
            </p>
            <p>
              This is a paragraph of description of the project above. This is just a test text, not a real one.
              This is a paragraph of description of the project above. This is just a test text, not a real one. This
              is a paragraph of description of the project above. This is just a test text, not a real one. This is a
              paragraph of description of the project above. This is just a test text, not a real one.
            </p>
          </div>

          <div className={styles.mediaStack}>
            <div className={`${styles.grayBox} ${styles.grayBoxSmall}`}>
              <div className={styles.hintText}>
                <p className={styles.hintTitle}>프로젝트 이미지 A type</p>
                <p>
                  width: 1200 고정
                  <br />
                  height: 자유 (그러나 너무 길면 모니터 화면을 벗어나 스크롤 해야할 수 있습니다!)
                </p>
              </div>
            </div>

            <div className={styles.logoStrip}>kkoomool</div>

            <div className={styles.splitGrid}>
              <div className={styles.splitCell}>
                <p className={styles.hintTitle}>프로젝트 이미지 B type</p>
                <p>
                  width: 590 고정
                  <br />
                  height: 자유 (그러나 너무 길면 모니터 화면을 벗어나 스크롤 해야할 수 있습니다!)
                </p>
              </div>
              <div className={styles.splitCell}>
                <p className={styles.hintTitle}>프로젝트 이미지 B type</p>
                <p>
                  width: 590 고정
                  <br />
                  height: 자유 (그러나 너무 길면 모니터 화면을 벗어나 스크롤 해야할 수 있습니다!)
                </p>
              </div>
            </div>

            <div className={`${styles.grayBox} ${styles.grayBoxLarge}`}>
              <div className={styles.hintText}>
                <p className={styles.hintTitle}>프로젝트 이미지 A type</p>
                <p>
                  width: 1200 고정
                  <br />
                  height: 자유 (그러나 너무 길면 모니터 화면을 벗어나 스크롤 해야할 수 있습니다!)
                </p>
              </div>
            </div>

            <div className={`${styles.grayBox} ${styles.grayBoxVideo}`}>
              <div className={styles.hintText}>
                <p className={styles.hintTitle}>프로젝트 영상</p>
                <p>
                  Youtube link를 주시면 임베드 가능합니다.
                  <br />
                  width, height: 16:9 비율로 고정
                </p>
              </div>
            </div>

            <div className={styles.websiteBlock}>
              <div className={`${styles.grayBox} ${styles.grayBoxVideo}`}>
                <div className={styles.hintText}>
                  <p className={styles.hintTitle}>웹사이트</p>
                  <p>
                    width: 고정
                    <br />
                    height: 16:9비율로 기본 고정이나, 원하시는 경우 늘리거나 줄이기 가능함
                    <br />
                    <br />
                    웹사이트 만들었는데 임베드 하고 싶은 경우, 공개된(호스팅 된) 웹 링크를 주세요.
                    <br />
                    {"<iframe>"}으로 넣어드릴 예정입니다.
                  </p>
                </div>
              </div>
              <a className={styles.websiteLink} href="https://kkoomool.vercel.app/" target="_blank" rel="noreferrer">
                https://kkoomool.vercel.app/
              </a>
            </div>
          </div>
        </section>

        <footer className={styles.footerMeta}>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>IG</span>
            <span>@jiweon554</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>Email</span>
            <span>parkgiwon050@gmail.com</span>
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
