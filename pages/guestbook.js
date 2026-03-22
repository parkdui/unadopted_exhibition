import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import navStyles from "@/styles/Home.module.css";
import styles from "@/styles/Guestbook.module.css";
import { db } from "@/lib/firebase";

const CARD_COLORS = ["#14F86C", "#FBF130", "#FFA662"];

function pickRandomColor() {
  const index = Math.floor(Math.random() * CARD_COLORS.length);
  return CARD_COLORS[index];
}

function colorFromIndex(index) {
  return CARD_COLORS[index % CARD_COLORS.length];
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function toDateLabel(value) {
  if (!value?.toDate) return "";
  const date = value.toDate();
  const yyyy = String(date.getFullYear());
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd}.`;
}

export default function GuestbookPage() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [entries, setEntries] = useState([]);
  const [isLoadingEntries, setIsLoadingEntries] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [submitError, setSubmitError] = useState(false);
  const entriesRef = useRef(entries);
  const listInnerRef = useRef(null);
  const cardElementsRef = useRef(new Map());
  const simulationRef = useRef(null);
  const rafRef = useRef(0);

  const todayLabel = useMemo(() => {
    const now = new Date();
    const yyyy = String(now.getFullYear());
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd}.`;
  }, []);

  const inputText = isEnglish
    ? {
        title: "Guestbook",
        description: (
          <>
            Leave your words here.
            <br />
            We will adopt them, thanks.
          </>
        ),
        namePlaceholder: "Name",
        messagePlaceholder: "Message",
        submitIdle: "Drop",
        submitLoading: "Saving...",
        submitError: "Could not save your message. Please try again in a moment.",
      }
    : {
        title: "방명록 아이들",
        description: "할 말은 여기에 내려놓고 가세요",
        namePlaceholder: "Name",
        messagePlaceholder: "Message",
        submitIdle: "내려놓기",
        submitLoading: "저장 중...",
        submitError: "메시지를 저장하지 못했어요. 잠시 후 다시 시도해주세요.",
      };

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    const nextName = name.trim();
    const nextMessage = message.trim();
    if (!nextName || !nextMessage) return;

    setSubmitError(false);
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "guestbookEntries"), {
        name: nextName,
        message: nextMessage,
        color: pickRandomColor(),
        createdAt: serverTimestamp(),
      });
      setName("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    const guestbookQuery = query(collection(db, "guestbookEntries"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      guestbookQuery,
      (snapshot) => {
        const nextEntries = snapshot.docs.map((doc, index) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name ?? "익명",
            message: data.message ?? "",
            createdAt: toDateLabel(data.createdAt) || todayLabel,
            color: data.color ?? colorFromIndex(index),
          };
        });
        setEntries(nextEntries);
        setLoadError("");
        setIsLoadingEntries(false);
      },
      (error) => {
        console.error(error);
        setLoadError("방명록을 불러오지 못했어요. 새로고침 후 다시 확인해주세요.");
        setIsLoadingEntries(false);
      },
    );

    return () => unsubscribe();
  }, [todayLabel]);

  useEffect(() => {
    entriesRef.current = entries;
    simulationRef.current?.sync(entries);
  }, [entries]);

  useEffect(() => {
    let canceled = false;

    async function bootSimulation() {
      if (!listInnerRef.current) return;

      const Matter = await import("matter-js");
      if (canceled) return;

      const { Engine, Runner, World, Bodies, Composite, Body } = Matter;
      const engine = Engine.create();
      const runner = Runner.create();
      engine.gravity.y = 1.1;
      Runner.run(runner, engine);

      const world = engine.world;
      const bodyById = new Map();
      let wallBodies = [];
      let bounds = { width: 0, height: 0, insetX: 0, insetTop: 0, floorPadding: 0 };
      let sceneHeight = 0;

      function updateSceneHeight(entryCount) {
        const container = listInnerRef.current;
        if (!container) return;
        const viewportHeight = container.parentElement?.clientHeight || container.getBoundingClientRect().height || 0;
        const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;
        const perCard = isMobileViewport ? 110 : 128;
        const estimated = Math.ceil(entryCount * perCard + viewportHeight * 0.55);
        sceneHeight = Math.max(viewportHeight, estimated, 560);
        container.style.height = `${sceneHeight}px`;
      }

      function readBounds() {
        const container = listInnerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        bounds = {
          width: rect.width,
          height: sceneHeight || rect.height,
          insetX: 34,
          insetTop: 10,
          floorPadding: 10,
        };
      }

      function rebuildWalls() {
        if (wallBodies.length) {
          World.remove(world, wallBodies);
        }

        readBounds();
        const { width, height, insetX, floorPadding } = bounds;
        const thickness = 70;
        wallBodies = [
          Bodies.rectangle(width / 2, height + thickness / 2 + floorPadding, width + 120, thickness, {
            isStatic: true,
            restitution: 0.08,
          }),
          Bodies.rectangle(-thickness / 2 + insetX, height / 2, thickness, height * 2, { isStatic: true }),
          Bodies.rectangle(width + thickness / 2 - insetX, height / 2, thickness, height * 2, { isStatic: true }),
        ];

        World.add(world, wallBodies);
      }

      function sync(nextEntries) {
        updateSceneHeight(nextEntries.length);
        rebuildWalls();

        const activeIds = new Set(nextEntries.map((entry) => entry.id));
        bodyById.forEach((body, id) => {
          if (activeIds.has(id)) return;
          World.remove(world, body);
          bodyById.delete(id);
        });

        nextEntries.forEach((entry, index) => {
          const element = cardElementsRef.current.get(entry.id);
          if (!element) return;

          const width = Math.max(180, element.offsetWidth);
          const height = Math.max(70, element.offsetHeight);
          const existing = bodyById.get(entry.id);

          if (existing) {
            const changedSize =
              Math.abs(existing.guestbookWidth - width) > 1 || Math.abs(existing.guestbookHeight - height) > 1;
            if (!changedSize) return;

            const replacement = Bodies.rectangle(existing.position.x, existing.position.y, width, height, {
              restitution: 0.06,
              friction: 0.88,
              frictionStatic: 0.92,
              frictionAir: 0.025,
              angle: existing.angle,
            });
            replacement.guestbookWidth = width;
            replacement.guestbookHeight = height;
            Body.setVelocity(replacement, existing.velocity);
            Body.setAngularVelocity(replacement, existing.angularVelocity);
            World.remove(world, existing);
            World.add(world, replacement);
            bodyById.set(entry.id, replacement);
            return;
          }

          const { width: areaWidth, insetX, insetTop } = bounds;
          const halfWidth = width / 2;
          const minX = insetX + halfWidth + 6;
          const maxX = Math.max(minX, areaWidth - insetX - halfWidth - 6);
          const spawnX = randomInRange(minX, maxX);
          const spawnY = -120 - (index % 12) * 62;
          const angle = randomInRange(-0.08, 0.08);
          const body = Bodies.rectangle(spawnX, spawnY, width, height, {
            restitution: 0.06,
            friction: 0.88,
            frictionStatic: 0.92,
            frictionAir: 0.025,
            angle,
          });
          body.guestbookWidth = width;
          body.guestbookHeight = height;
          Body.setVelocity(body, { x: randomInRange(-1.3, 1.3), y: randomInRange(0.4, 1.3) });
          Body.setPosition(body, { x: spawnX, y: spawnY + insetTop });
          World.add(world, body);
          bodyById.set(entry.id, body);
        });
      }

      function applyTransforms() {
        entriesRef.current.forEach((entry) => {
          const element = cardElementsRef.current.get(entry.id);
          const body = bodyById.get(entry.id);
          if (!element || !body) return;
          const width = body.guestbookWidth || element.offsetWidth;
          const height = body.guestbookHeight || element.offsetHeight;
          const x = body.position.x - width / 2;
          const y = body.position.y - height / 2;
          element.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${body.angle}rad)`;
        });

        rafRef.current = window.requestAnimationFrame(applyTransforms);
      }

      function onResize() {
        sync(entriesRef.current);
      }

      sync(entriesRef.current);
      applyTransforms();
      window.addEventListener("resize", onResize);

      simulationRef.current = {
        sync,
        destroy() {
          window.removeEventListener("resize", onResize);
          window.cancelAnimationFrame(rafRef.current);
          Runner.stop(runner);
          Composite.clear(world, false);
          Engine.clear(engine);
          bodyById.clear();
        },
      };
    }

    bootSimulation();

    return () => {
      canceled = true;
      simulationRef.current?.destroy();
      simulationRef.current = null;
    };
  }, []);

  return (
    <>
      <Head>
        <title>Guestbook • The Unadopted</title>
        <meta name="description" content="Guestbook" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.page}>
        <header className={navStyles.navbar} role="navigation" aria-label="Global">
          <div className={navStyles.navLeft}>
            <Link className={navStyles.navItem} href="/">
              Home
            </Link>
            <Link className={navStyles.navItem} href="/about">
              About
            </Link>
            <Link className={navStyles.navItem} href="/guestbook" aria-current="page">
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

        <main className={styles.layout}>
          <section className={styles.inputSection}>
            <div className={styles.inputInner}>
              <h1 className={styles.title}>{inputText.title}</h1>
              <p className={styles.description}>{inputText.description}</p>

              <form className={styles.form} onSubmit={handleSubmit}>
                <input
                  className={styles.nameInput}
                  type="text"
                  name="name"
                  placeholder={inputText.namePlaceholder}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  maxLength={20}
                  required
                />
                <textarea
                  className={styles.messageInput}
                  name="message"
                  placeholder={inputText.messagePlaceholder}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  maxLength={300}
                  required
                />
                <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
                  {isSubmitting ? inputText.submitLoading : inputText.submitIdle}
                </button>
              </form>
              {submitError ? <p className={`${styles.formStatus} ${styles.formError}`}>{inputText.submitError}</p> : null}
            </div>
          </section>

          <section className={styles.listSection} aria-label="Guestbook entries">
            <div ref={listInnerRef} className={styles.listInner}>
              {isLoadingEntries ? <p className={styles.listStatus}>방명록을 불러오는 중...</p> : null}
              {loadError ? <p className={`${styles.listStatus} ${styles.formError}`}>{loadError}</p> : null}
              {entries.map((entry) => (
                <article
                  key={entry.id}
                  className={styles.entryCard}
                  style={{ backgroundColor: entry.color }}
                  ref={(element) => {
                    if (element) {
                      cardElementsRef.current.set(entry.id, element);
                    } else {
                      cardElementsRef.current.delete(entry.id);
                    }
                  }}
                >
                  <div className={styles.entryMeta}>
                    <span className={styles.entryName}>{entry.name}</span>
                    <span className={styles.entryDate}>{entry.createdAt}</span>
                  </div>
                  <p className={styles.entryMessage}>{entry.message}</p>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

