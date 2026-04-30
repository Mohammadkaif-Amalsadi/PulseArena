import { useEffect, useMemo, useRef, useState } from "react";

const games = [
  {
    id: "pulse-grid",
    title: "Pulse Grid",
    genre: "Reflex Strategy",
    mode: "Solo Challenge",
    vibe: "Neon, tactical, time-pressure",
    tag: "Live challenge",
    description: "Dash through a shifting arena, collect blue points, protect your lives, and survive the route logic.",
    cardImage: "/assets/cards/nebula-drift.jpg",
    poster: "/assets/posters/nebula-drift.jpg",
    video: "/assets/videos/nebula-drift.mp4",
    accent: "#77e8ff",
    accentSecondary: "#ff70d2",
    surface: "rgba(8, 16, 34, 0.86)",
    howToPlayLabel: "How To Play",
    howToPlayBadges: ["Collect blue points", "Avoid red danger", "Unlock pattern 2"],
    route: "grid"
  },
  {
    id: "ember-ttt",
    title: "Vanishing Tic Tac Toe",
    genre: "Mind Game",
    mode: "Vs AI",
    vibe: "Fast reads, disappearing marks, short duels",
    tag: "Brain duel",
    description: "Play against the AI, but once either side drops a fourth mark, the oldest one disappears and the board rewires.",
    cardImage: "/assets/cards/ember-realm.jpg",
    poster: "/assets/posters/ember-realm.jpg",
    video: "/assets/videos/ember-realm.mp4",
    accent: "#ff8b72",
    accentSecondary: "#7fb8ff",
    surface: "rgba(25, 14, 28, 0.86)",
    howToPlayLabel: "How To Play",
    howToPlayBadges: ["Place 3 active marks", "4th move removes oldest", "Beat adaptive AI"],
    route: "ttt"
  },
  {
    id: "skyline-ops",
    title: "Skyline Ops",
    genre: "Preview Drop",
    mode: "Hero Focus",
    vibe: "Cool, sharp, cyber-urban",
    tag: "City run",
    description: "A colder skyline palette with a sleek storefront rhythm and strong cinematic focus.",
    cardImage: "/assets/cards/tidal-strike.jpg",
    poster: "/assets/posters/tidal-strike.jpg",
    video: "/assets/videos/tidal-strike.mp4",
    accent: "#7ec7ff",
    accentSecondary: "#8f7dff",
    surface: "rgba(10, 18, 36, 0.86)",
    howToPlayLabel: "How To Play",
    howToPlayBadges: ["Swipe through cards", "Preview each world", "Open linked mode"],
    route: "grid"
  },
  {
    id: "wild-loop",
    title: "Wild Loop",
    genre: "Arcade Flow",
    mode: "Feature Mode",
    vibe: "Bright, playful, pulse-driven",
    tag: "Indie signal",
    description: "A brighter neon variation to prove the launcher and the site theme can flex with each selected world.",
    cardImage: "/assets/cards/wild-beat.jpg",
    poster: "/assets/posters/wild-beat.jpg",
    video: "/assets/videos/wild-beat.mp4",
    accent: "#d786ff",
    accentSecondary: "#6ce9b3",
    surface: "rgba(20, 12, 35, 0.86)",
    howToPlayLabel: "How To Play",
    howToPlayBadges: ["Preview themed content", "Switch color systems", "Jump into games"],
    route: "ttt"
  }
];

const clampGridValue = (value) => Math.max(10, Number.parseInt(value, 10) || 10);
const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function getRouteFromHash() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  return hash === "grid" || hash === "ttt" ? hash : "home";
}

function buildPattern(rows, cols, patternNumber) {
  const tiles = new Array(rows * cols).fill("safe");
  const centerRow = Math.floor(rows / 2);
  const centerCol = Math.floor(cols / 2);
  const setTile = (row, col, type) => {
    if (row < 0 || row >= rows || col < 0 || col >= cols) {
      return;
    }
    tiles[row * cols + col] = type;
  };

  if (patternNumber === 1) {
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        if (row === col || row + col === cols - 1) {
          setTile(row, col, "point");
        }
      }
    }

    for (let row = 1; row < rows - 1; row += 1) {
      for (let col = 1; col < cols - 1; col += 1) {
        const isDiagonal = row === col || row + col === cols - 1;
        const onSafeCross = row === centerRow || col === centerCol;
        const nearSafeCross = Math.abs(row - centerRow) <= 1 || Math.abs(col - centerCol) <= 1;
        const onOuterLane = row === 1 || row === rows - 2 || col === 1 || col === cols - 2;

        if (!isDiagonal && !onSafeCross && !onOuterLane && ((row + col) % 4 === 0 || (nearSafeCross && (row + col) % 3 === 0))) {
          setTile(row, col, "danger");
        }
      }
    }

    for (let row = 1; row < rows - 1; row += 1) {
      setTile(row, centerCol, tiles[row * cols + centerCol] === "danger" ? "safe" : tiles[row * cols + centerCol]);
    }
    for (let col = 1; col < cols - 1; col += 1) {
      setTile(centerRow, col, tiles[centerRow * cols + col] === "danger" ? "safe" : tiles[centerRow * cols + col]);
    }

    setTile(centerRow - 2, centerCol, "danger");
    setTile(centerRow + 2, centerCol, "danger");
    setTile(centerRow, centerCol - 2, "danger");
    setTile(centerRow, centerCol + 2, "danger");
  } else {
    for (let col = 1; col < cols - 1; col += 1) {
      setTile(1, col, "point");
      setTile(rows - 2, col, "point");
    }
    for (let row = 2; row < rows - 2; row += 1) {
      setTile(row, 1, "point");
      setTile(row, cols - 2, "point");
    }
    for (let row = Math.max(1, centerRow - 1); row <= Math.min(rows - 2, centerRow + 1); row += 1) {
      for (let col = Math.max(1, centerCol - 1); col <= Math.min(cols - 2, centerCol + 1); col += 1) {
        setTile(row, col, "point");
      }
    }

    for (let row = 2; row < rows - 2; row += 1) {
      for (let col = 2; col < cols - 2; col += 1) {
        const isRing = row === 1 || row === rows - 2 || col === 1 || col === cols - 2;
        const isCenterBlock =
          row >= Math.max(1, centerRow - 1) &&
          row <= Math.min(rows - 2, centerRow + 1) &&
          col >= Math.max(1, centerCol - 1) &&
          col <= Math.min(cols - 2, centerCol + 1);
        const isVerticalBridge = col === centerCol;
        const isHorizontalBridge = row === centerRow;

        if (!isRing && !isCenterBlock && !isVerticalBridge && !isHorizontalBridge &&
          ((row + col) % 3 === 0 || (Math.abs(row - centerRow) === 2 && Math.abs(col - centerCol) <= 2))) {
          setTile(row, col, "danger");
        }
      }
    }

    for (let row = 0; row < rows; row += 1) {
      setTile(row, centerCol, tiles[row * cols + centerCol] === "danger" ? "safe" : tiles[row * cols + centerCol]);
    }
    for (let col = 0; col < cols; col += 1) {
      setTile(centerRow, col, tiles[centerRow * cols + col] === "danger" ? "safe" : tiles[centerRow * cols + col]);
    }

    setTile(centerRow - 1, centerCol - 2, "danger");
    setTile(centerRow - 1, centerCol + 2, "danger");
    setTile(centerRow + 1, centerCol - 2, "danger");
    setTile(centerRow + 1, centerCol + 2, "danger");
    setTile(centerRow - 2, centerCol - 1, "danger");
    setTile(centerRow - 2, centerCol + 1, "danger");
    setTile(centerRow + 2, centerCol - 1, "danger");
    setTile(centerRow + 2, centerCol + 1, "danger");
  }

  return tiles;
}

function findSpawnIndex(rows, cols, tileTypes) {
  const centerCol = Math.floor(cols / 2);
  for (let row = rows - 1; row >= 0; row -= 1) {
    for (let offset = 0; offset < cols; offset += 1) {
      const leftCol = centerCol - offset;
      const rightCol = centerCol + offset;
      const candidates = offset === 0 ? [centerCol] : [leftCol, rightCol];

      for (const col of candidates) {
        if (col < 0 || col >= cols) continue;
        const index = row * cols + col;
        if (tileTypes[index] === "safe") return index;
      }
    }
  }
  return 0;
}

function createRoundState(rows, cols, patternNumber, previousScore = 0) {
  const tiles = buildPattern(rows, cols, patternNumber).map((type, index) => ({
    id: `${patternNumber}-${index}`,
    type,
    collected: false,
    hit: false
  }));

  return {
    rows,
    cols,
    patternNumber,
    score: previousScore,
    lives: 5,
    timeLeft: 30,
    active: true,
    result: "idle",
    message:
      patternNumber === 1
        ? "Clear Pattern 1, collect the blue nodes, and preserve your lives."
        : "Pattern 2 is live. Route carefully and finish the harder maze in time.",
    tiles,
    playerIndex: findSpawnIndex(rows, cols, tiles.map((tile) => tile.type))
  };
}

function getWinner(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function CustomCursor() {
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) {
      return undefined;
    }

    const handleMove = (event) => {
      setCursor({ x: event.clientX, y: event.clientY, visible: true });
    };
    const hideCursor = () => setCursor((current) => ({ ...current, visible: false }));

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", hideCursor);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", hideCursor);
    };
  }, []);

  if (!cursor.visible) return null;

  return (
    <>
      <div className="cursor-ring" style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }} />
      <div className="cursor-dot" style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }} />
    </>
  );
}

function Navbar({ route, navigate }) {
  return (
    <nav className="navbar">
      <button type="button" className="brandmark-button" onClick={() => navigate("home")}>Pulse Arena</button>
      <div className="nav-links">
        <button type="button" onClick={() => navigate("home")} className={route === "home" ? "active" : ""}>Home</button>
        <a href="#contact-zone">Contact</a>
      </div>
    </nav>
  );
}

function HomePage({ selectedIndex, onSelect, onOpenRoute }) {
  const [stageActive, setStageActive] = useState(true);
  const cardsRef = useRef(null);
  const videoRef = useRef(null);
  const touchStartRef = useRef(0);
  const touchDeltaRef = useRef(0);
  const stageTimerRef = useRef(null);

  const selectedGame = games[selectedIndex];
  const previousGame = games[(selectedIndex - 1 + games.length) % games.length];
  const nextGame = games[(selectedIndex + 1) % games.length];

  useEffect(() => {
    return () => {
      if (stageTimerRef.current) window.clearTimeout(stageTimerRef.current);
    };
  }, []);

  useEffect(() => {
    setStageActive(false);
    if (stageTimerRef.current) window.clearTimeout(stageTimerRef.current);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    stageTimerRef.current = window.setTimeout(() => {
      setStageActive(true);
      videoRef.current?.play().catch(() => {});
    }, 240);

    return () => {
      if (stageTimerRef.current) window.clearTimeout(stageTimerRef.current);
    };
  }, [selectedIndex]);

  const jumpToCard = (nextIndex, shouldScroll = true) => {
    const lockedScrollY = window.scrollY;
    const normalizedIndex = (nextIndex + games.length) % games.length;
    onSelect(normalizedIndex);

    window.requestAnimationFrame(() => {
      if (window.scrollY !== lockedScrollY) {
        window.scrollTo({
          top: lockedScrollY,
          left: window.scrollX,
          behavior: "instant"
        });
      }
    });

    if (shouldScroll && cardsRef.current?.children[normalizedIndex]) {
      const rail = cardsRef.current;
      const card = rail.children[normalizedIndex];
      const railCenter = rail.clientWidth / 2;
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const nextScrollLeft = Math.max(0, cardCenter - railCenter);

      rail.scrollTo({
        left: nextScrollLeft,
        behavior: "smooth"
      });
    }
  };

  const handleSwipeEnd = () => {
    if (Math.abs(touchDeltaRef.current) < 36) return;
    jumpToCard(selectedIndex + (touchDeltaRef.current < 0 ? 1 : -1));
    touchDeltaRef.current = 0;
  };

  return (
    <>
      <section id="home" className="hero-stage panel" style={{ "--selected-accent": selectedGame.accent }}>
        <div className="hero-header">
          <div className="hero-intro">
            <p className="label">Featured Worlds</p>
            <h2>Clear home page, swipe-first launcher, and dedicated playable pages</h2>
            <p>
              Browse featured game concepts, preview each world, and jump into standalone experiences instead of stacking everything into one long page.
            </p>
          </div>
          <div className="hero-utility">
            <span className="utility-pill">Theme shifts per card</span>
            <span className="utility-pill">Dedicated game pages</span>
            <span className="utility-pill">Phone friendly</span>
          </div>
        </div>

        <div className="launcher-shell">
          <div
            className="launcher-stage"
            onTouchStart={(event) => {
              touchStartRef.current = event.changedTouches[0].clientX;
              touchDeltaRef.current = 0;
            }}
            onTouchMove={(event) => {
              touchDeltaRef.current = event.changedTouches[0].clientX - touchStartRef.current;
            }}
            onTouchEnd={handleSwipeEnd}
          >
            <button
              type="button"
              className="stage-side side-left"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => jumpToCard(selectedIndex - 1)}
              aria-label={`Previous game: ${previousGame.title}`}
            >
              <img src={previousGame.poster} alt={previousGame.title} className="side-poster" loading="lazy" />
              <div className="side-shade" />
              <div className="side-copy">
                <span>Previous</span>
                <strong>{previousGame.title}</strong>
              </div>
              <span className="side-arrow">&lsaquo;</span>
            </button>

            <div className={`hero-video ${stageActive ? "stage-active" : "stage-resting"}`}>
              <div className="stage-topbar">
                <span className="stage-ribbon">{selectedGame.howToPlayLabel}</span>
                <div className="stage-badges">
                  {selectedGame.howToPlayBadges.map((badge) => (
                    <span key={badge} className="team-badge dynamic-badge">{badge}</span>
                  ))}
                </div>
              </div>

              <video
                ref={videoRef}
                key={selectedGame.video}
                className="feature-video"
                src={selectedGame.video}
                poster={selectedGame.poster}
                controls
                muted
                loop
                playsInline
                preload="metadata"
              />
              <div className="video-mask" />
              <div className="video-copy">
                <span className="chip" style={{ "--chip-accent": selectedGame.accent }}>{selectedGame.tag}</span>
                <h2>{selectedGame.title}</h2>
                <p>{selectedGame.description}</p>
                <div className="video-meta">
                  <span>{selectedGame.genre}</span>
                  <span>{selectedGame.mode}</span>
                  <span>{selectedGame.vibe}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="stage-side side-right"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => jumpToCard(selectedIndex + 1)}
              aria-label={`Next game: ${nextGame.title}`}
            >
              <img src={nextGame.poster} alt={nextGame.title} className="side-poster" loading="lazy" />
              <div className="side-shade" />
              <div className="side-copy">
                <span>Next</span>
                <strong>{nextGame.title}</strong>
              </div>
              <span className="side-arrow">&rsaquo;</span>
            </button>
          </div>

          <div className="selector-shell">
            <div className="selector-head">
              <div>
                <p className="label">Game Switcher</p>
                <h3>Select a title and launch preview</h3>
              </div>
              <button type="button" className="launch launch-large" onClick={() => onOpenRoute(selectedGame.route)}>
                Open Game Page
              </button>
            </div>

            <div className="selected-summary">
              <div className="summary-title">
                <span className="summary-tag" style={{ "--summary-accent": selectedGame.accent }}>{selectedGame.tag}</span>
                <strong>{selectedGame.title}</strong>
              </div>
              <p>{selectedGame.description}</p>
              <div className="swipe-hint">
                <span>Swipe the stage or card row, tap side posters, or open a dedicated page.</span>
              </div>
            </div>

            <div
              ref={cardsRef}
              className="card-rail compact"
              onTouchStart={(event) => {
                touchStartRef.current = event.changedTouches[0].clientX;
                touchDeltaRef.current = 0;
              }}
              onTouchMove={(event) => {
                touchDeltaRef.current = event.changedTouches[0].clientX - touchStartRef.current;
              }}
              onTouchEnd={handleSwipeEnd}
            >
              {games.map((game, index) => (
                <button
                  key={game.id}
                  type="button"
                  className={`game-card compact ${index === selectedIndex ? "active" : ""}`}
                  style={{ backgroundImage: `linear-gradient(180deg, transparent, rgba(3, 7, 16, 0.92)), url(${game.cardImage})` }}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => jumpToCard(index)}
                >
                  <span className="game-card-chip">{game.tag}</span>
                  <strong>{game.title}</strong>
                  <span>{game.genre}</span>
                </button>
              ))}
            </div>

            <div className="dot-row">
              {games.map((game, index) => (
                <button
                  key={game.id}
                  type="button"
                  className={`dot ${index === selectedIndex ? "active" : ""}`}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => jumpToCard(index)}
                  aria-label={`Select ${game.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="feature-section">
        <div className="section-heading">
          <div>
            <p className="label">Browse Games</p>
            <h2>Choose a game page</h2>
          </div>
          <p>
            A cleaner home page should help reviewers understand the available experiences immediately, without dropping them into gameplay before they choose it.
          </p>
        </div>

        <div className="browse-grid">
          {games.slice(0, 2).map((game) => (
            <article key={game.id} className="browse-card panel" style={{ "--browse-accent": game.accent }}>
              <div className="browse-media" style={{ backgroundImage: `linear-gradient(180deg, transparent, rgba(4, 8, 18, 0.92)), url(${game.poster})` }}>
                <span className="browse-tag">{game.tag}</span>
                <h3>{game.title}</h3>
                <p>{game.genre}</p>
              </div>
              <div className="browse-copy">
                <p>{game.description}</p>
                <button type="button" className="launch" onClick={() => onOpenRoute(game.route)}>Open {game.title}</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ContactSection />
    </>
  );
}

function GridPage({ navigate }) {
  const [rowsInput, setRowsInput] = useState(10);
  const [colsInput, setColsInput] = useState(10);
  const [selectedPattern, setSelectedPattern] = useState(1);
  const [round, setRound] = useState({
    rows: 10,
    cols: 10,
    patternNumber: 1,
    score: 0,
    lives: 5,
    timeLeft: 30,
    active: false,
    result: "idle",
    message: "Set the arena size, then launch the run.",
    tiles: [],
    playerIndex: 0
  });

  const autoAdvanceRef = useRef(null);
  const hitTimeoutsRef = useRef(new Map());
  const remainingBlue = useMemo(
    () => round.tiles.filter((tile) => tile.type === "point" && !tile.collected).length,
    [round.tiles]
  );

  useEffect(() => {
    if (!round.active) return undefined;
    const timerId = window.setInterval(() => {
      setRound((current) => {
        if (!current.active) return current;
        if (current.timeLeft <= 1) {
          return {
            ...current,
            active: false,
            timeLeft: 0,
            result: "lose",
            message: "Lose. The timer ran out before you collected every blue tile."
          };
        }
        return { ...current, timeLeft: current.timeLeft - 1 };
      });
    }, 1000);
    return () => window.clearInterval(timerId);
  }, [round.active]);

  useEffect(() => {
    return () => {
      if (autoAdvanceRef.current) window.clearTimeout(autoAdvanceRef.current);
      hitTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      hitTimeoutsRef.current.clear();
    };
  }, []);

  const startRound = (patternNumber, carryScore = 0) => {
    const rows = clampGridValue(rowsInput);
    const cols = clampGridValue(colsInput);
    setSelectedPattern(patternNumber);
    setRound(createRoundState(rows, cols, patternNumber, carryScore));
  };

  const resetArena = () => {
    if (autoAdvanceRef.current) {
      window.clearTimeout(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
    setRound({
      rows: clampGridValue(rowsInput),
      cols: clampGridValue(colsInput),
      patternNumber: selectedPattern,
      score: 0,
      lives: 5,
      timeLeft: 30,
      active: false,
      result: "idle",
      message: "Set the arena size, then launch the run.",
      tiles: [],
      playerIndex: 0
    });
  };

  const movePlayer = (dx, dy) => {
    setRound((current) => {
      if (!current.active) return current;
      const currentRow = Math.floor(current.playerIndex / current.cols);
      const currentCol = current.playerIndex % current.cols;
      const nextRow = currentRow + dy;
      const nextCol = currentCol + dx;
      if (nextRow < 0 || nextRow >= current.rows || nextCol < 0 || nextCol >= current.cols) return current;

      const nextPlayerIndex = nextRow * current.cols + nextCol;
      const landedTile = current.tiles[nextPlayerIndex];
      if (!landedTile) return current;

      const nextTiles = current.tiles.map((tile, index) => {
        if (index !== nextPlayerIndex) return tile;
        if (tile.type === "point" && !tile.collected) return { ...tile, collected: true };
        if (tile.type === "danger") return { ...tile, hit: true };
        return tile;
      });

      if (landedTile.type === "point" && !landedTile.collected) {
        const nextScore = current.score + 10;
        const nextBlueCount = nextTiles.filter((tile) => tile.type === "point" && !tile.collected).length;
        if (nextBlueCount === 0) {
          if (current.patternNumber === 1) {
            if (autoAdvanceRef.current) window.clearTimeout(autoAdvanceRef.current);
            autoAdvanceRef.current = window.setTimeout(() => startRound(2, nextScore), 1000);
            return {
              ...current,
              tiles: nextTiles,
              score: nextScore,
              playerIndex: nextPlayerIndex,
              active: false,
              result: "advance",
              message: "Pattern 1 cleared. Pattern 2 will start automatically."
            };
          }
          return {
            ...current,
            tiles: nextTiles,
            score: nextScore,
            playerIndex: nextPlayerIndex,
            active: false,
            result: "win",
            message: "Win. You cleared both patterns and collected every blue tile."
          };
        }
        return { ...current, tiles: nextTiles, score: nextScore, playerIndex: nextPlayerIndex };
      }

      if (landedTile.type === "danger") {
        const nextLives = current.lives - 1;
        const existingTimeout = hitTimeoutsRef.current.get(landedTile.id);
        if (existingTimeout) window.clearTimeout(existingTimeout);

        const timeoutId = window.setTimeout(() => {
          setRound((latest) => ({
            ...latest,
            tiles: latest.tiles.map((tile) => (tile.id === landedTile.id ? { ...tile, hit: false } : tile))
          }));
          hitTimeoutsRef.current.delete(landedTile.id);
        }, 350);
        hitTimeoutsRef.current.set(landedTile.id, timeoutId);

        if (nextLives <= 0) {
          return {
            ...current,
            tiles: nextTiles,
            lives: 0,
            playerIndex: nextPlayerIndex,
            active: false,
            result: "lose",
            message: "Lose. All 5 lives were lost before the arena was cleared."
          };
        }
        return { ...current, tiles: nextTiles, lives: nextLives, playerIndex: nextPlayerIndex };
      }

      return { ...current, playerIndex: nextPlayerIndex };
    });
  };

  useEffect(() => {
    if (!round.active) return undefined;
    const handleKeyDown = (event) => {
      const controls = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
        w: [0, -1],
        a: [-1, 0],
        s: [0, 1],
        d: [1, 0],
        W: [0, -1],
        A: [-1, 0],
        S: [0, 1],
        D: [1, 0]
      };
      const nextMove = controls[event.key];
      if (!nextMove) return;
      event.preventDefault();
      movePlayer(nextMove[0], nextMove[1]);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [round.active, round.playerIndex, round.rows, round.cols]);

  return (
    <>
      <section className="page-hero panel">
        <div>
          <p className="label">Playable Page</p>
          <h2>Pulse Grid arena</h2>
          <p>Minimum 10x10, manual pattern switching, automatic transition into Pattern 2, and movement-based tile logic with lives and timer.</p>
        </div>
        <button type="button" className="ghost" onClick={() => navigate("home")}>Back To Home</button>
      </section>

      <section className="arena-grid">
        <aside className="panel control-stack">
          <div className="stack-head">
            <p className="label">Arena Config</p>
            <h3>Build the grid challenge</h3>
            <p>Use the player orb to navigate, collect blue tiles, avoid red danger, and finish both patterns in time.</p>
          </div>

          <label className="field">
            <span>Rows</span>
            <input type="number" min="10" value={rowsInput} onChange={(event) => setRowsInput(clampGridValue(event.target.value))} />
          </label>
          <label className="field">
            <span>Columns</span>
            <input type="number" min="10" value={colsInput} onChange={(event) => setColsInput(clampGridValue(event.target.value))} />
          </label>
          <label className="field">
            <span>Pattern</span>
            <select value={selectedPattern} onChange={(event) => setSelectedPattern(Number.parseInt(event.target.value, 10))}>
              <option value={1}>Pattern 1</option>
              <option value={2}>Pattern 2</option>
            </select>
          </label>
          <div className="button-row">
            <button type="button" className="launch" onClick={() => startRound(selectedPattern)}>Start Run</button>
            <button type="button" className="ghost" onClick={resetArena}>Reset</button>
          </div>
          <div className="legend-card">
            <p><span className="swatch blue" /> Blue tiles add points.</p>
            <p><span className="swatch red" /> Red tiles blink and remove 1 life.</p>
            <p><span className="swatch green" /> Green tiles are safe.</p>
            <p><span className="swatch player" /> Move with arrow keys, WASD, or the on-screen pad.</p>
          </div>
        </aside>

        <section className="panel arena-shell">
          <div className="stats-row">
            <div className="stat"><span>Pattern</span><strong>{round.patternNumber}</strong></div>
            <div className="stat"><span>Lives</span><strong>{round.lives}</strong></div>
            <div className="stat"><span>Timer</span><strong>{round.timeLeft}</strong></div>
            <div className="stat"><span>Score</span><strong>{round.score}</strong></div>
            <div className="stat"><span>Blue Left</span><strong>{remainingBlue}</strong></div>
          </div>
          <div className={`status-banner ${round.result}`}>
            <p>{round.message}</p>
          </div>
          <div className="movement-hint">
            <span>Controls</span>
            <p>Move one tile at a time, plan around danger tiles, and clear Pattern 1 to trigger Pattern 2 automatically.</p>
          </div>
          <div className="arena-board" style={{ gridTemplateColumns: `repeat(${round.cols}, minmax(0, 1fr))` }}>
            {round.tiles.length === 0 ? (
              <div className="board-empty"><p>Press Start Run to generate the arena.</p></div>
            ) : (
              round.tiles.map((tile, index) => (
                <button
                  key={tile.id}
                  type="button"
                  className={["tile", tile.type, tile.collected ? "collected" : "", tile.hit ? "hit" : "", round.playerIndex === index ? "player" : ""].join(" ")}
                  onClick={() => {
                    if (!round.active) return;
                    const playerRow = Math.floor(round.playerIndex / round.cols);
                    const playerCol = round.playerIndex % round.cols;
                    const tileRow = Math.floor(index / round.cols);
                    const tileCol = index % round.cols;
                    const rowDelta = tileRow - playerRow;
                    const colDelta = tileCol - playerCol;
                    if (Math.abs(rowDelta) + Math.abs(colDelta) === 1) {
                      movePlayer(colDelta, rowDelta);
                    }
                  }}
                  aria-label={`${tile.type} tile`}
                />
              ))
            )}
          </div>
          <div className="movement-pad">
            <div />
            <button type="button" className="pad-button" onClick={() => movePlayer(0, -1)}>&uarr;</button>
            <div />
            <button type="button" className="pad-button" onClick={() => movePlayer(-1, 0)}>&larr;</button>
            <button type="button" className="pad-button" onClick={() => movePlayer(0, 1)}>&darr;</button>
            <button type="button" className="pad-button" onClick={() => movePlayer(1, 0)}>&rarr;</button>
          </div>
        </section>
      </section>

      <ContactSection />
    </>
  );
}

function chooseAiMove(board, aiQueue, playerQueue) {
  const emptyCells = board
    .map((value, index) => (value === null ? index : null))
    .filter((value) => value !== null);

  const simulateMove = (symbol, queue, index) => {
    const nextBoard = [...board];
    const nextQueue = [...queue];
    if (nextQueue.length >= 3) {
      const removed = nextQueue.shift();
      nextBoard[removed] = null;
    }
    nextBoard[index] = symbol;
    nextQueue.push(index);
    return { nextBoard, nextQueue };
  };

  for (const cell of emptyCells) {
    const { nextBoard } = simulateMove("O", aiQueue, cell);
    if (getWinner(nextBoard) === "O") return cell;
  }
  for (const cell of emptyCells) {
    const { nextBoard } = simulateMove("X", playerQueue, cell);
    if (getWinner(nextBoard) === "X") return cell;
  }

  const weighted = [4, 0, 2, 6, 8, 1, 3, 5, 7];
  return weighted.find((cell) => emptyCells.includes(cell)) ?? emptyCells[0] ?? null;
}

function TicTacToePage({ navigate }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerQueue, setPlayerQueue] = useState([]);
  const [aiQueue, setAiQueue] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [status, setStatus] = useState("Your turn. Place X. On the 4th active mark, the oldest one disappears.");
  const [winner, setWinner] = useState(null);
  const [blinkingCells, setBlinkingCells] = useState([]);
  const [pendingMove, setPendingMove] = useState(null);
  const previewRemovalCell =
    !winner && !pendingMove && playerTurn && playerQueue.length >= 3 ? playerQueue[0] : null;

  const applyMove = (symbol, queue, index, currentBoard) => {
    const nextBoard = [...currentBoard];
    const nextQueue = [...queue];
    if (nextQueue.length >= 3) {
      const removed = nextQueue.shift();
      nextBoard[removed] = null;
    }
    nextBoard[index] = symbol;
    nextQueue.push(index);
    return { nextBoard, nextQueue };
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayerQueue([]);
    setAiQueue([]);
    setPlayerTurn(true);
    setWinner(null);
    setBlinkingCells([]);
    setPendingMove(null);
    setStatus("Your turn. Place X. On the 4th active mark, the oldest one disappears.");
  };

  const finishTurn = (symbol, queue, setQueue, index, currentBoard, nextStatus) => {
    const { nextBoard, nextQueue } = applyMove(symbol, queue, index, currentBoard);
    const nextWinner = getWinner(nextBoard);
    setBoard(nextBoard);
    setQueue(nextQueue);
    setBlinkingCells([]);

    if (nextWinner) {
      setWinner(nextWinner);
      setStatus(symbol === "X" ? "You win. The AI got out-read." : "AI wins. Try to control the board rhythm better.");
      return;
    }

    setStatus(nextStatus);
    setPlayerTurn(symbol !== "X");
  };

  const scheduleMoveWithBlink = (symbol, queue, index, nextStatus) => {
    if (queue.length < 3) {
      if (symbol === "X") {
        finishTurn(symbol, queue, setPlayerQueue, index, board, nextStatus);
      } else {
        finishTurn(symbol, queue, setAiQueue, index, board, nextStatus);
      }
      return;
    }

    const oldestCell = queue[0];
    setBlinkingCells([oldestCell]);
    setPendingMove({ symbol, index, nextStatus });
    setStatus(symbol === "X" ? "Your oldest X is about to vanish..." : "AI is cycling its oldest O...");
  };

  const handlePlayerMove = (index) => {
    if (!playerTurn || winner || board[index] || pendingMove) return;
    scheduleMoveWithBlink("X", playerQueue, index, "AI is thinking...");
  };

  useEffect(() => {
    if (!pendingMove) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      if (pendingMove.symbol === "X") {
        finishTurn("X", playerQueue, setPlayerQueue, pendingMove.index, board, pendingMove.nextStatus);
      } else {
        finishTurn("O", aiQueue, setAiQueue, pendingMove.index, board, pendingMove.nextStatus);
      }
      setPendingMove(null);
    }, 520);

    return () => window.clearTimeout(timeoutId);
  }, [pendingMove, board, playerQueue, aiQueue]);

  useEffect(() => {
    if (playerTurn || winner || pendingMove) return undefined;
    const aiTimer = window.setTimeout(() => {
      const move = chooseAiMove(board, aiQueue, playerQueue);
      if (move === null) {
        setPlayerTurn(true);
        setStatus("Your turn.");
        return;
      }
      scheduleMoveWithBlink("O", aiQueue, move, "Your turn. Watch the oldest mark before your 4th move.");
    }, 520);

    return () => window.clearTimeout(aiTimer);
  }, [playerTurn, winner, board, aiQueue, playerQueue, pendingMove]);

  return (
    <>
      <section className="page-hero panel">
        <div>
          <p className="label">Playable Page</p>
          <h2>Vanishing Tic Tac Toe vs AI</h2>
          <p>A tactical tic tac toe variant where each side can keep only three active marks, so the fourth move removes the oldest after a warning blink.</p>
        </div>
        <button type="button" className="ghost" onClick={() => navigate("home")}>Back To Home</button>
      </section>

      <section className="ttt-grid">
        <section className="panel ttt-shell">
          <div className="ttt-topbar">
            <div className="ttt-badge">How To Play</div>
            <div className="ttt-rules">
              <span>Place X against the AI</span>
              <span>Only 3 active marks per side</span>
              <span>4th mark blinks then removes oldest</span>
            </div>
          </div>

          <div className={`ttt-status ${winner ? "finished" : ""}`}>
            <p>
              {previewRemovalCell !== null
                ? "Your oldest X is highlighted. Placing your next mark will remove it."
                : status}
            </p>
          </div>

          <div className="ttt-board">
            {board.map((value, index) => (
              <button
                key={index}
                type="button"
                className={[
                  "ttt-cell",
                  value === "X" ? "player-x" : "",
                  value === "O" ? "player-o" : "",
                  blinkingCells.includes(index) ? "about-to-remove" : "",
                  previewRemovalCell === index ? "next-to-remove" : ""
                ].join(" ")}
                onClick={() => handlePlayerMove(index)}
              >
                {value}
              </button>
            ))}
          </div>

          <div className="ttt-actions">
            <button type="button" className="launch" onClick={resetGame}>Restart Duel</button>
          </div>
        </section>

        <aside className="panel ttt-sidebar">
          <div className="mini-stat">
            <span>Your queue</span>
            <strong>{playerQueue.length}/3</strong>
          </div>
          <div className="mini-stat">
            <span>AI queue</span>
            <strong>{aiQueue.length}/3</strong>
          </div>
          <div className="mini-stat">
            <span>Tempo</span>
            <strong>{playerTurn ? "You" : "AI"}</strong>
          </div>
          <div className="legend-card">
            <p><span className="swatch player" /> Your oldest X blinks before disappearing on the 4th active move.</p>
            <p><span className="swatch blue" /> The AI follows the same rule with O marks.</p>
            <p><span className="swatch red" /> Winning lines still count instantly, so move order matters.</p>
          </div>
        </aside>
      </section>

      <ContactSection />
    </>
  );
}

function ContactSection() {
  return (
    <section id="contact-zone" className="feature-section">
      <div className="contact-shell panel">
        <div>
          <p className="label">Contact</p>
          <h2>Built for the FOG assessment</h2>
          <p className="contact-copy">This section keeps the home page professional and gives reviewers a simple way to reach out after trying the game pages.</p>
        </div>
        <div className="contact-card">
          <span>Email</span>
          <a href="mailto:amalsadikaif98@gmail.com">amalsadikaif98@gmail.com</a>
        </div>
        <div className="contact-card">
          <span>Phone</span>
          <a href="tel:+919773279670">+91 97732 79670</a>
        </div>
        <div className="contact-card">
          <span>GitHub</span>
          <a href="https://github.com/Mohammadkaif-Amalsadi/PulseArena" target="_blank" rel="noreferrer">
            github.com/Mohammadkaif-Amalsadi/PulseArena
          </a>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [route, setRoute] = useState(() => getRouteFromHash());
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRouteFromHash());
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = (nextRoute) => {
    window.location.hash = nextRoute === "home" ? "/" : `/${nextRoute}`;
    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectedGame = games[selectedIndex];
  const routeTheme =
    route === "grid"
      ? games.find((game) => game.route === "grid")
      : route === "ttt"
        ? games.find((game) => game.route === "ttt")
        : selectedGame;

  return (
    <div
      className="app-shell theme-shell"
      style={{
        "--theme-primary": routeTheme.accent,
        "--theme-secondary": routeTheme.accentSecondary,
        "--theme-surface": routeTheme.surface
      }}
    >
      <CustomCursor />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <Navbar route={route} navigate={navigate} />

      <header className="topbar">
        <div>
          <p className="label">Pulse Arena</p>
          <h1>{route === "home" ? "Choose a world. Open a dedicated page for it." : route === "grid" ? "Pulse Grid arena" : "Vanishing Tic Tac Toe vs AI"}</h1>
        </div>
        <p className="topbar-copy">
          {route === "home"
            ? "A polished game hub with a swipeable launcher, clearer home page, dedicated playable pages, and card-driven theme shifts."
            : route === "grid"
              ? "A dynamic grid challenge with scalable layouts, player movement, timer pressure, and automatic Pattern 2 progression."
              : "A tactical tic tac toe twist where the fourth active mark makes the oldest one blink before vanishing."}
        </p>
      </header>

      <main className="dashboard">
        {route === "home" && <HomePage selectedIndex={selectedIndex} onSelect={setSelectedIndex} onOpenRoute={navigate} />}
        {route === "grid" && <GridPage navigate={navigate} />}
        {route === "ttt" && <TicTacToePage navigate={navigate} />}
      </main>
    </div>
  );
}

export default App;
