import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "@/styles/Home.module.css";

const ONBOARDING_KEY = "unadopted:onboarding:v1";

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [bootReady, setBootReady] = useState(false);

  useEffect(() => {
    let shouldShow = true;
    try {
      const params = new URLSearchParams(window.location.search);
      const force = params.get("onboarding") === "1";
      const reset = params.get("resetOnboarding") === "1";

      if (reset) window.localStorage.removeItem(ONBOARDING_KEY);
      if (force || reset) {
        shouldShow = true;
      } else {
        const seen = window.localStorage.getItem(ONBOARDING_KEY) === "1";
        shouldShow = !seen;
      }
    } catch {
      shouldShow = true;
    }

    const t = window.setTimeout(() => {
      setShowOnboarding(shouldShow);
      setBootReady(true);
    }, 0);

    return () => window.clearTimeout(t);
  }, []);

  if (!bootReady) return null;

  return (
    <>
      <Head>
        <title>The Unadopted</title>
        <meta name="description" content="The Unadopted" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.mainPage}>
        <header className={styles.navbar} role="navigation" aria-label="Global">
          <div className={styles.navLeft}>
            <Link className={styles.navItem} href="/about">
              About
            </Link>
            <Link className={styles.navItem} href="/guestbook">
              Guestbook
            </Link>
          </div>
        </header>

        <main className={styles.hero} aria-label="Main">
          <h1 className={styles.title}>
            THE
            <br />
            UNADOPTED
          </h1>
          <h2 className={styles.subtitle}>채택받지 못한 아이들</h2>
        </main>

        <FallingCircles active={!showOnboarding} />

        {showOnboarding ? (
          <Onboarding
            onDone={() => {
              try {
                window.localStorage.setItem(ONBOARDING_KEY, "1");
              } catch {
                // ignore
              }
              setShowOnboarding(false);
            }}
          />
        ) : null}
      </div>
    </>
  );
}

function splitForAnimation(text) {
  const parts = [];
  const rawLines = text.split("\n");
  for (let li = 0; li < rawLines.length; li += 1) {
    const line = rawLines[li];
    for (let ci = 0; ci < line.length; ci += 1) {
      const ch = line[ci];
      parts.push({ type: "char", value: ch, key: `l${li}c${ci}` });
    }
    if (li !== rawLines.length - 1) parts.push({ type: "br", key: `br${li}` });
  }
  return parts;
}

function Onboarding({ onDone }) {
  const phrase = "We might have been chosen.\nBut we are...";
  const parts = useMemo(() => splitForAnimation(phrase), []);
  const charCount = useMemo(
    () => parts.reduce((acc, p) => acc + (p.type === "char" ? 1 : 0), 0),
    [parts],
  );

  const [phase, setPhase] = useState("enter"); // enter -> hold -> exit

  useEffect(() => {
    const perCharDelay = 0.035;
    const enterDuration = 0.7;
    const animationEndsAt = Math.max(0.8, (charCount - 1) * perCharDelay + enterDuration);
    const exitDelay = 2.0;
    const exitDuration = 1.2;

    const t1 = window.setTimeout(() => setPhase("hold"), Math.round(animationEndsAt * 1000));
    const t2 = window.setTimeout(
      () => setPhase("exit"),
      Math.round((animationEndsAt + exitDelay) * 1000),
    );
    const t3 = window.setTimeout(
      () => onDone?.(),
      Math.round((animationEndsAt + exitDelay + exitDuration) * 1000),
    );

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [charCount, onDone]);

  return (
    <div className={`${styles.onboarding} ${phase === "exit" ? styles.onboardingExit : ""}`}>
      <div className={styles.onboardingText} aria-label="We might have been chosen. But we are...">
        {parts.map((p, i) => {
          if (p.type === "br") return <br key={p.key} />;
          const delay = i * 0.035;
          const isSpace = p.value === " ";
          return (
            <span
              key={p.key}
              className={`${styles.splitChar} ${isSpace ? styles.splitSpace : ""}`}
              style={{ animationDelay: `${delay}s` }}
            >
              {isSpace ? "\u00A0" : p.value}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function FallingCircles({ active }) {
  const router = useRouter();
  const [scale, setScale] = useState(1);
  const isHandheld =
    typeof navigator !== "undefined" &&
    ((navigator.maxTouchPoints ?? 0) > 0 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  const motionSupported =
    typeof window !== "undefined" && typeof window.DeviceMotionEvent !== "undefined";
  const motionNeedsPermission =
    motionSupported && typeof window.DeviceMotionEvent?.requestPermission === "function";
  const [motionGranted, setMotionGranted] = useState(() => motionSupported && !motionNeedsPermission);
  const [motionEnabled, setMotionEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const mq = window.matchMedia("(max-width: 500px)");
    const update = () => setScale(mq.matches ? 0.6 : 1);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    // On Android/most browsers, no permission prompt exists. Auto-enable once on handheld.
    if (!isHandheld) return undefined;
    if (!motionSupported) return undefined;
    if (motionNeedsPermission) return undefined;
    const t = window.setTimeout(() => setMotionEnabled(true), 0);
    return () => window.clearTimeout(t);
  }, [isHandheld, motionNeedsPermission, motionSupported]);

  const circles = useMemo(() => {
    const colors = ["#FBF130", "#FB3D3D", "#FF9B4E", "#14F86C", "#60A0FB", "#60A0FB"];
    const lefts = [12, 28, 44, 60, 76, 90]; // %
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
    return colors.map((color, idx) => {
      const rand = mulberry32((idx + 1) * 2654435761);
      const size = Math.round(200 * scale);
      const startOffset = 120 + Math.round(rand() * 540);
      const startY = -startOffset;
      // Start falling from 1s after load, but each circle differs.
      const delayMs = 1000 + Math.round(rand() * 1400);
      const vx0 = (rand() * 2 - 1) * 120; // px/s
      const vy0 = rand() * 40; // px/s

      return {
        id: idx + 1,
        color,
        size,
        startY,
        delayMs,
        left: lefts[idx] ?? 50,
        vx0,
        vy0,
      };
    });
  }, [scale]);

  const elsRef = useRef([]);

  useEffect(() => {
    // When onboarding is visible, keep circles "unstarted" above the viewport.
    if (!active) {
      for (let i = 0; i < circles.length; i += 1) {
        const el = elsRef.current[i];
        if (!el) continue;
        el.style.transform = `translate3d(0px, ${-(circles[i]?.size ?? 200) - 40}px, 0)`;
      }
      return undefined;
    }

    const GRAVITY = 1400; // px/s^2
    const RESTITUTION = 0.34;
    const WALL_RESTITUTION = 0.55;
    const FRICTION_X = 0.84;
    const CIRCLE_RESTITUTION = 0.55;
    const SHAKE_THRESHOLD = 7; // acceleration delta (m/s^2-ish) - tuned for Android/Chrome
    const SHAKE_COOLDOWN_MS = 260;
    const SHAKE_IMPULSE = 8.5; // scales acceleration -> px/s
    const ORIENTATION_THRESHOLD = 18; // degrees
    const MOTION_FORCE = 16; // continuous impulse multiplier
    const MAX_V = 1200;

    const state = circles.map((c, idx) => {
      const rand = (() => {
        // deterministic-ish per circle for stable layout
        const seed = (idx + 1) * 9973;
        let t = seed >>> 0;
        return function random() {
          t += 0x6d2b79f5;
          let r = t;
          r = Math.imul(r ^ (r >>> 15), r | 1);
          r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
          return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
        };
      })();

      const w = window.innerWidth || 1200;
      const h = window.innerHeight || 900;
      const r = c.size / 2;
      const baseX = (c.left / 100) * w;
      const x = Math.max(r, Math.min(w - r, baseX + (rand() * 2 - 1) * 40));

      return {
        id: c.id,
        href: `/project${c.id}`,
        color: c.color,
        size: c.size,
        r,
        x,
        y: c.startY,
        vx: c.vx0,
        vy: c.vy0,
        // Start timing from the moment main becomes active (post-onboarding fade).
        spawnAt: performance.now() + c.delayMs,
        phase: "waiting", // waiting -> falling -> float
        nextTurnAt: 0,
        entered: false,
      };
    });

    let lastMag = 0;
    let lastShakeAt = 0;
    let lastBeta = 0;
    let lastGamma = 0;
    function onDeviceMotion(e) {
      const a = e.accelerationIncludingGravity || e.acceleration;
      if (!a) return;
      const ax = Number.isFinite(a.x) ? a.x : 0;
      const ay = Number.isFinite(a.y) ? a.y : 0;
      const az = Number.isFinite(a.z) ? a.z : 0;

      // Flip direction (user expectation: tilt/shake maps opposite).
      const fx = -ax;
      const fy = ay;

      // Continuous small "push" so any shaking/tilting feels responsive.
      for (let i = 0; i < state.length; i += 1) {
        const s = state[i];
        if (s.phase === "waiting") continue;
        s.vx = Math.max(-MAX_V, Math.min(MAX_V, s.vx + fx * MOTION_FORCE));
        s.vy = Math.max(-MAX_V, Math.min(MAX_V, s.vy + fy * MOTION_FORCE));
      }

      const mag = Math.hypot(ax, ay, az);
      const delta = Math.abs(mag - lastMag);
      lastMag = mag;

      const now = performance.now();
      if (delta < SHAKE_THRESHOLD) return;
      if (now - lastShakeAt < SHAKE_COOLDOWN_MS) return;
      lastShakeAt = now;

      // Apply an impulse to all active circles (ballpit shake).
      for (let i = 0; i < state.length; i += 1) {
        const s = state[i];
        if (s.phase === "waiting") continue;
        const jitterX = (Math.random() * 2 - 1) * 90;
        const jitterY = (Math.random() * 2 - 1) * 90;
        s.vx = Math.max(-MAX_V, Math.min(MAX_V, s.vx + fx * SHAKE_IMPULSE + jitterX));
        s.vy = Math.max(-MAX_V, Math.min(MAX_V, s.vy + fy * SHAKE_IMPULSE + jitterY));
      }
    }

    function onDeviceOrientation(e) {
      const beta = Number.isFinite(e.beta) ? e.beta : 0;
      const gamma = Number.isFinite(e.gamma) ? e.gamma : 0;
      const d = Math.hypot(beta - lastBeta, gamma - lastGamma);
      lastBeta = beta;
      lastGamma = gamma;

      const now = performance.now();
      if (d < ORIENTATION_THRESHOLD) return;
      if (now - lastShakeAt < SHAKE_COOLDOWN_MS) return;
      lastShakeAt = now;

      for (let i = 0; i < state.length; i += 1) {
        const s = state[i];
        if (s.phase === "waiting") continue;
        const jitterX = (Math.random() * 2 - 1) * 110;
        const jitterY = (Math.random() * 2 - 1) * 110;
        s.vx = Math.max(-MAX_V, Math.min(MAX_V, s.vx + jitterX));
        s.vy = Math.max(-MAX_V, Math.min(MAX_V, s.vy + jitterY));
      }
    }

    function applyStyles(i) {
      const el = elsRef.current[i];
      if (!el) return;
      const s = state[i];
      el.style.transform = `translate3d(${Math.round(s.x - s.r)}px, ${Math.round(
        s.y - s.r,
      )}px, 0)`;
    }

    function ensureBounds(s, w, h) {
      if (s.x - s.r < 0) {
        s.x = s.r;
        s.vx = Math.abs(s.vx) * WALL_RESTITUTION;
      }
      if (s.x + s.r > w) {
        s.x = w - s.r;
        s.vx = -Math.abs(s.vx) * WALL_RESTITUTION;
      }

      // Top boundary: allow initial entry from above, but once entered, never escape.
      if (s.entered && s.y - s.r < 0) {
        s.y = s.r;
        s.vy = Math.abs(s.vy) * WALL_RESTITUTION;
      }

      if (s.y + s.r > h) {
        s.y = h - s.r;
        s.vy = -Math.abs(s.vy) * RESTITUTION;
        s.vx *= FRICTION_X;
        return true;
      }
      return false;
    }

    function resolveCircleCollisions(w, h) {
      // Simple equal-mass circle collision response + positional correction.
      for (let i = 0; i < state.length; i += 1) {
        const a = state[i];
        if (a.phase === "waiting") continue;
        for (let j = i + 1; j < state.length; j += 1) {
          const b = state[j];
          if (b.phase === "waiting") continue;

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const minDist = a.r + b.r;
          const distSq = dx * dx + dy * dy;
          if (distSq >= minDist * minDist) continue;

          const dist = Math.sqrt(Math.max(0.0001, distSq));
          const nx = dx / dist;
          const ny = dy / dist;

          // Positional correction (separate overlap).
          const overlap = minDist - dist;
          const correction = overlap * 0.52; // split across both
          a.x -= nx * correction;
          a.y -= ny * correction;
          b.x += nx * correction;
          b.y += ny * correction;

          // Velocity impulse along collision normal (elastic-ish).
          const rvx = b.vx - a.vx;
          const rvy = b.vy - a.vy;
          const relVel = rvx * nx + rvy * ny;
          if (relVel < 0) {
            const impulse = (-(1 + CIRCLE_RESTITUTION) * relVel) / 2;
            const ix = impulse * nx;
            const iy = impulse * ny;
            a.vx -= ix;
            a.vy -= iy;
            b.vx += ix;
            b.vy += iy;
          }

          ensureBounds(a, w, h);
          ensureBounds(b, w, h);
        }
      }
    }

    let raf = 0;
    let last = performance.now();

    function tick(now) {
      const dt = Math.min(0.034, Math.max(0.001, (now - last) / 1000));
      last = now;

      const w = window.innerWidth || 1200;
      const h = window.innerHeight || 900;

      // Integrate motion first.
      for (let i = 0; i < state.length; i += 1) {
        const s = state[i];

        if (s.phase === "waiting") {
          s.y = Math.min(s.y, -s.r - 2);
          if (now >= s.spawnAt) {
            s.phase = "falling";
          }
          continue;
        }

        if (!s.entered && s.y >= s.r) s.entered = true;

        if (s.phase === "falling") {
          // Gravity-driven fall with slight sideways drift (random initial vx).
          s.vy += GRAVITY * dt;
          s.x += s.vx * dt;
          s.y += s.vy * dt;

          const hitFloor = ensureBounds(s, w, h);
          if (hitFloor) {
            s.phase = "float";
            const speed = 26 + (i % 3) * 8;
            const angle = ((i * 73 + Math.floor(now)) % 360) * (Math.PI / 180);
            s.vx = Math.cos(angle) * speed;
            s.vy = -Math.abs(Math.sin(angle) * speed) * 0.8;
            s.nextTurnAt = now + 1800 + (i % 4) * 650;
            s.entered = true;
          }
          continue;
        }

        // float
        if (now >= s.nextTurnAt) {
          const base = Math.atan2(s.vy, s.vx);
          const jitter = ((i + 1) * 0.618) % 1;
          const turn = (jitter * 2 - 1) * 0.9;
          const angle = base + turn;
          const speed = Math.min(54, Math.max(18, Math.hypot(s.vx, s.vy)));
          s.vx = Math.cos(angle) * speed;
          s.vy = Math.sin(angle) * speed;
          s.nextTurnAt = now + 2200 + ((i * 997) % 1200);
        }

        s.x += s.vx * dt;
        s.y += s.vy * dt;

        ensureBounds(s, w, h);
      }

      // Resolve overlaps after integration (ballpit rule: never overlap).
      resolveCircleCollisions(w, h);

      // Apply transforms after collisions.
      for (let i = 0; i < state.length; i += 1) {
        applyStyles(i);
      }

      raf = window.requestAnimationFrame(tick);
    }

    const canUseMotion =
      isHandheld &&
      motionSupported &&
      motionEnabled &&
      (!motionNeedsPermission || motionGranted) &&
      window.isSecureContext;

    if (canUseMotion) {
      window.addEventListener("devicemotion", onDeviceMotion, { passive: true });
      // Fallback for devices/browsers where devicemotion is flaky.
      window.addEventListener("deviceorientation", onDeviceOrientation, { passive: true });
    }

    // Initialize positions (black) before animation.
    for (let i = 0; i < state.length; i += 1) {
      applyStyles(i);
    }

    raf = window.requestAnimationFrame((n) => {
      last = n;
      tick(n);
    });

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("devicemotion", onDeviceMotion);
      window.removeEventListener("deviceorientation", onDeviceOrientation);
    };
  }, [active, circles, isHandheld, motionEnabled, motionGranted, motionNeedsPermission, motionSupported]);

  return (
    <div className={styles.circlesLayer} aria-hidden="false">
      {isHandheld &&
      motionSupported &&
      (!window.isSecureContext || (motionNeedsPermission && !motionGranted) || !motionEnabled) ? (
        <button
          type="button"
          className={styles.motionButton}
          disabled={!window.isSecureContext}
          onClick={async () => {
            if (!window.isSecureContext) return;
            if (motionNeedsPermission) {
              try {
                const res = await window.DeviceMotionEvent.requestPermission();
                const granted = res === "granted";
                setMotionGranted(granted);
                if (granted) setMotionEnabled(true);
              } catch {
                setMotionGranted(false);
              }
              return;
            }
            setMotionEnabled(true);
          }}
        >
          {!window.isSecureContext ? "Motion requires HTTPS" : "Enable Motion"}
        </button>
      ) : null}
      {circles.map((c, idx) => {
        const href = `/project${c.id}`;
        return (
          <a
            key={c.id}
            href={href}
            className={styles.circle}
            aria-label={`Open project ${c.id}`}
            ref={(el) => {
              elsRef.current[idx] = el;
            }}
            onClick={(e) => {
              if (e.defaultPrevented) return;
              if (e.button !== 0) return;
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              router.push(href);
            }}
            style={{
              width: `${c.size}px`,
              height: `${c.size}px`,
              "--hover-color": c.color,
            }}
          />
        );
      })}
    </div>
  );
}
