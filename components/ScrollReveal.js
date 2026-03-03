import { useEffect, useMemo, useRef } from "react";
import styles from "./ScrollReveal.module.css";

let gsapModulePromise;
async function getGsap() {
  if (typeof window === "undefined") return null;
  if (!gsapModulePromise) {
    gsapModulePromise = (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    })();
  }
  return gsapModulePromise;
}

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}) {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span data-scroll-reveal-word className={styles.word} key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    let alive = true;
    let tweens = [];

    (async () => {
      const mod = await getGsap();
      if (!alive || !mod) return;

      const { gsap } = mod;
      const el = containerRef.current;
      if (!el) return;

      const scroller =
        scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

      const rotationTween = gsap.fromTo(
        el,
        { transformOrigin: "0% 50%", rotate: baseRotation },
        {
          ease: "none",
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top bottom",
            end: rotationEnd,
            scrub: true,
          },
        },
      );

      const wordElements = el.querySelectorAll("[data-scroll-reveal-word]");

      const opacityTween = gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: "opacity" },
        {
          ease: "none",
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top bottom-=20%",
            end: wordAnimationEnd,
            scrub: true,
          },
        },
      );

      tweens = [rotationTween, opacityTween];

      if (enableBlur) {
        const blurTween = gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: "none",
            filter: "blur(0px)",
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: "top bottom-=20%",
              end: wordAnimationEnd,
              scrub: true,
            },
          },
        );
        tweens.push(blurTween);
      }
    })();

    return () => {
      alive = false;
      for (const t of tweens) {
        try {
          t?.scrollTrigger?.kill();
          t?.kill();
        } catch {
          // ignore
        }
      }
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <div ref={containerRef} className={`${styles.scrollReveal} ${containerClassName}`.trim()}>
      <span className={`${styles.scrollRevealText} ${textClassName}`.trim()}>{splitText}</span>
    </div>
  );
}

