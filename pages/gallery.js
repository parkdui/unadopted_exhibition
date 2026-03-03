import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

function mulberry32(seed) {
  let t = seed >>> 0;
  return function random() {    
    t += 0x6d2b79f5;
    let r = t;
    r = Math.imul(r ^ (r >>> 15), r | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function svgToDataUrl(svg) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function makeArtworkSvg({ id, width, height, hue }) {
  const title = `UNADOPTED #${String(id).padStart(4, "0")}`;
  const h1 = hue;
  const h2 = (hue + 36) % 360;
  const h3 = (hue + 220) % 360;
  const grainOpacity = 0.12;

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(${h1} 88% 62%)"/>
      <stop offset="0.55" stop-color="hsl(${h2} 92% 58%)"/>
      <stop offset="1" stop-color="hsl(${h3} 82% 52%)"/>
    </linearGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${grainOpacity} 0"/>
    </filter>
    <radialGradient id="v" cx="50%" cy="40%" r="70%">
      <stop offset="0" stop-color="rgba(255,255,255,0.16)"/>
      <stop offset="1" stop-color="rgba(0,0,0,0.38)"/>
    </radialGradient>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <rect width="${width}" height="${height}" fill="url(#v)"/>
  <rect width="${width}" height="${height}" filter="url(#grain)" opacity="0.95"/>

  <g opacity="0.25">
    <circle cx="${Math.round(width * 0.22)}" cy="${Math.round(height * 0.32)}" r="${Math.round(
    Math.min(width, height) * 0.28,
  )}" fill="rgba(255,255,255,0.22)"/>
    <circle cx="${Math.round(width * 0.78)}" cy="${Math.round(height * 0.68)}" r="${Math.round(
    Math.min(width, height) * 0.34,
  )}" fill="rgba(0,0,0,0.18)"/>
  </g>

  <g font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
     fill="rgba(255,255,255,0.92)">
    <text x="${Math.round(width * 0.06)}" y="${Math.round(height * 0.14)}" font-size="${Math.round(
    width * 0.045,
  )}" font-weight="700" letter-spacing="-0.02em">${title}</text>
    <text x="${Math.round(width * 0.06)}" y="${Math.round(height * 0.14) + Math.round(
    width * 0.055,
  )}" font-size="${Math.round(width * 0.025)}" opacity="0.9">GENERATED PLACEHOLDER • ADD YOUR IMAGES LATER</text>
  </g>
</svg>
`.trim();

  return svgToDataUrl(svg);
}

function makeItem(id) {
  const rand = mulberry32(id * 2654435761);
  const hue = Math.round(rand() * 360);
  const aspect = clamp(0.7 + rand() * 0.9, 0.65, 1.75);
  const width = 1200;
  const height = Math.max(740, Math.round(width / aspect));
  const src = makeArtworkSvg({ id, width, height, hue });

  return {
    id,
    title: `Unadopted #${String(id).padStart(4, "0")}`,
    meta: `${height}×${width} • hsl(${hue}°)`,
    hue,
    aspect,
    src,
  };
}

function makeBatch(startId, count) {
  return Array.from({ length: count }, (_, i) => makeItem(startId + i));
}

export default function GalleryPage() {
  const BATCH_SIZE = 24;
  const [items, setItems] = useState(() => makeBatch(0, BATCH_SIZE));
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const sentinelRef = useRef(null);
  const loadMoreLockRef = useRef(false);

  const activeItem = useMemo(() => {
    if (activeIndex === null) return null;
    return items[activeIndex] ?? null;
  }, [activeIndex, items]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    if (typeof IntersectionObserver === "undefined") return;

    const el = sentinelRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        if (loadMoreLockRef.current) return;

        loadMoreLockRef.current = true;
        setIsLoading(true);

        // Simulate loading latency so the footer feedback is visible.
        window.setTimeout(() => {
          setItems((prev) => prev.concat(makeBatch(prev.length, BATCH_SIZE)));
          setIsLoading(false);
          loadMoreLockRef.current = false;
        }, 250);
      },
      { rootMargin: "800px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    function onKeyDown(e) {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowLeft") setActiveIndex((i) => Math.max(0, (i ?? 0) - 1));
      if (e.key === "ArrowRight") setActiveIndex((i) => Math.min(items.length - 1, (i ?? 0) + 1));
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, items.length]);

  return (
    <>
      <Head>
        <title>Gallery • Unadopted</title>
        <meta
          name="description"
          content="Infinite gallery page with responsive layout and lightbox."
        />
      </Head>

      <div className="page">
        <header className="topbar">
          <div className="topbarInner">
            <div className="left">
              <Link className="back" href="/">
                ← Home
              </Link>
              <div className="titleBlock">
                <div className="kicker">GALLERY</div>
                <h1 className="title">Unadopted — Infinite Wall</h1>
              </div>
            </div>
            <div className="right">
              <div className="stat">
                <span className="statLabel">Loaded</span>
                <span className="statValue">{items.length}</span>
              </div>
              <button
                className="ghost"
                type="button"
                onClick={() => setItems((prev) => prev.concat(makeBatch(prev.length, BATCH_SIZE)))}
              >
                Load more
              </button>
            </div>
          </div>
        </header>

        <main className="main" aria-label="Gallery grid">
          <div className="columns">
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className="card"
                onClick={() => setActiveIndex(index)}
                aria-label={`Open ${item.title}`}
              >
                <img
                  className="img"
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  style={{ aspectRatio: `${item.aspect}` }}
                />
                <div className="overlay">
                  <div className="overlayTitle">{item.title}</div>
                  <div className="overlayMeta">{item.meta}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="footer">
            <div className="sentinel" ref={sentinelRef} aria-hidden="true" />
            <div className="footerText">
              {isLoading ? "Loading more…" : "Scroll to keep expanding (∞)."}
            </div>
          </div>
        </main>

        {activeItem ? (
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeItem.title} detail`}
          >
            <button
              className="backdrop"
              type="button"
              aria-label="Close dialog"
              onClick={() => setActiveIndex(null)}
            />
            <div className="modalPanel">
              <div className="modalTop">
                <div className="modalHeading">
                  <div className="modalTitle">{activeItem.title}</div>
                  <div className="modalMeta">{activeItem.meta}</div>
                </div>
                <div className="modalActions">
                  <button
                    className="ghost"
                    type="button"
                    onClick={() => setActiveIndex((i) => Math.max(0, (i ?? 0) - 1))}
                    disabled={activeIndex === 0}
                  >
                    ← Prev
                  </button>
                  <button
                    className="ghost"
                    type="button"
                    onClick={() =>
                      setActiveIndex((i) => Math.min(items.length - 1, (i ?? 0) + 1))
                    }
                    disabled={activeIndex === items.length - 1}
                  >
                    Next →
                  </button>
                  <button className="close" type="button" onClick={() => setActiveIndex(null)}>
                    Close
                  </button>
                </div>
              </div>

              <div className="modalMedia">
                <img className="modalImg" src={activeItem.src} alt={activeItem.title} />
              </div>

              <div className="modalHint">
                Tip: use <kbd>←</kbd>/<kbd>→</kbd> to navigate, <kbd>Esc</kbd> to close.
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: radial-gradient(
              1200px 800px at 20% 0%,
              rgba(255, 255, 255, 0.12),
              transparent 55%
            ),
            radial-gradient(900px 700px at 90% 10%, rgba(255, 255, 255, 0.08), transparent 55%),
            var(--background);
          color: var(--foreground);
        }

        .topbar {
          position: sticky;
          top: 0;
          z-index: 10;
          backdrop-filter: blur(10px);
          background: color-mix(in srgb, var(--background), transparent 28%);
          border-bottom: 1px solid color-mix(in srgb, var(--foreground), transparent 88%);
        }

        .topbarInner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .left {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
        }

        .back {
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid color-mix(in srgb, var(--foreground), transparent 86%);
          color: var(--foreground);
          font-size: 13px;
          opacity: 0.9;
          flex: 0 0 auto;
        }

        .titleBlock {
          min-width: 0;
        }

        .kicker {
          font-size: 12px;
          letter-spacing: 0.18em;
          opacity: 0.65;
        }

        .title {
          font-size: 18px;
          line-height: 1.2;
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 0 0 auto;
        }

        .stat {
          display: flex;
          align-items: baseline;
          gap: 8px;
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid color-mix(in srgb, var(--foreground), transparent 86%);
          background: color-mix(in srgb, var(--background), transparent 8%);
        }

        .statLabel {
          font-size: 12px;
          opacity: 0.7;
        }

        .statValue {
          font-size: 14px;
          font-weight: 700;
        }

        .ghost {
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid color-mix(in srgb, var(--foreground), transparent 86%);
          background: transparent;
          color: var(--foreground);
          font-size: 13px;
          cursor: pointer;
          opacity: 0.92;
        }

        .ghost:disabled {
          cursor: not-allowed;
          opacity: 0.45;
        }

        .main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 18px 20px 64px;
        }

        /* Masonry-like columns (simple, fast, responsive). */
        .columns {
          column-gap: 14px;
          columns: 1;
        }

        @media (min-width: 520px) {
          .columns {
            columns: 2;
          }
        }

        @media (min-width: 860px) {
          .columns {
            columns: 3;
          }
        }

        @media (min-width: 1160px) {
          .columns {
            columns: 4;
          }
        }

        .card {
          width: 100%;
          display: block;
          border: 0;
          padding: 0;
          margin: 0 0 14px;
          background: transparent;
          text-align: left;
          cursor: pointer;
          break-inside: avoid;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.14);
          transform: translateZ(0);
        }

        .img {
          width: 100%;
          height: auto;
          display: block;
          background: rgba(255, 255, 255, 0.06);
        }

        .overlay {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 14px 14px 12px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.65), transparent 70%);
          color: rgba(255, 255, 255, 0.95);
          opacity: 0.92;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .overlayTitle {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .overlayMeta {
          margin-top: 4px;
          font-size: 12px;
          opacity: 0.82;
        }

        @media (hover: hover) and (pointer: fine) {
          .card:hover .overlay {
            opacity: 1;
            transform: translateY(-2px);
          }

          .card:hover {
            box-shadow: 0 22px 55px rgba(0, 0, 0, 0.22);
          }
        }

        .footer {
          margin-top: 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .sentinel {
          height: 1px;
          width: 1px;
        }

        .footerText {
          font-size: 13px;
          opacity: 0.7;
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px dashed color-mix(in srgb, var(--foreground), transparent 80%);
        }

        .modal {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: grid;
          place-items: center;
          padding: 18px;
        }

        .backdrop {
          position: absolute;
          inset: 0;
          border: 0;
          background: rgba(0, 0, 0, 0.62);
          cursor: pointer;
        }

        .modalPanel {
          width: min(1080px, 100%);
          max-height: min(92vh, 860px);
          overflow: auto;
          border-radius: 18px;
          border: 1px solid color-mix(in srgb, #fff, transparent 78%);
          background: color-mix(in srgb, #0b0b0b, transparent 0%);
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.55);
          position: relative;
          z-index: 1;
        }

        .modalTop {
          position: sticky;
          top: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 14px;
          background: rgba(10, 10, 10, 0.82);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .modalHeading {
          min-width: 0;
        }

        .modalTitle {
          color: rgba(255, 255, 255, 0.96);
          font-size: 14px;
          font-weight: 800;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .modalMeta {
          margin-top: 3px;
          color: rgba(255, 255, 255, 0.72);
          font-size: 12px;
        }

        .modalActions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 0 0 auto;
        }

        .close {
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.95);
          font-size: 13px;
          cursor: pointer;
        }

        .modalMedia {
          padding: 14px;
        }

        .modalImg {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.03);
        }

        .modalHint {
          padding: 0 14px 16px;
          color: rgba(255, 255, 255, 0.75);
          font-size: 12px;
        }

        kbd {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
            "Courier New", monospace;
          font-size: 11px;
          padding: 2px 6px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(255, 255, 255, 0.1);
          margin: 0 2px;
        }
      `}</style>
    </>
  );
}
