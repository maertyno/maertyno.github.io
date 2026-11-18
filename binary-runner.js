const html = document.documentElement;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let currentLanguage = html.lang || "sk";

const translations = {
  sk: {
    "contact.email": "Email",
    "game.score": "Skóre",
    "game.ready": "Jeden klik skok. Dvojklik vo vzduchu salto. Shield drží 5 sekúnd alebo jeden hit.",
    "game.hint": "Klik / medzerník = skok · dvojklik = backflip",
    "game.running": "Run beží",
    "game.over": "Smena skončila. Klikni pre reštart.",
    "game.over.ticket": "Technik zakopol o bug.",
    "game.over.reboot": "Systém chce reštart.",
    "game.over.escalated": "Ticket sa vrátil späť.",
    "game.win": "Výborne. Celá smena je vyriešená.",
    "game.chapter.support": "Helpdesk",
    "game.chapter.repair": "Servisný stôl",
    "game.chapter.network": "Sieťový kút",
    "game.chapter.storage": "Zálohy",
    "game.chapter.server": "Serverovňa",
    "game.chapter.monitoring": "Monitoring",
    "game.chapter.deploy": "Nočný deploy",
    "game.chapter.security": "Security check",
    "game.chapter.datacenter": "Datacentrum",
    "game.chapter.final": "Finálny incident"
  },
  cs: {
    "contact.email": "E-mail",
    "game.score": "Skóre",
    "game.ready": "Jeden klik skok. Dvojklik ve vzduchu salto. Shield drží 5 sekund nebo jeden hit.",
    "game.hint": "Klik / mezerník = skok · dvojklik = backflip",
    "game.running": "Run běží",
    "game.over": "Směna skončila. Klikni pro restart.",
    "game.over.ticket": "Technik zakopl o bug.",
    "game.over.reboot": "Systém chce restart.",
    "game.over.escalated": "Ticket se vrátil zpět.",
    "game.win": "Výborně. Celá směna je vyřešená.",
    "game.chapter.support": "Helpdesk",
    "game.chapter.repair": "Servisní stůl",
    "game.chapter.network": "Síťový kout",
    "game.chapter.storage": "Zálohy",
    "game.chapter.server": "Serverovna",
    "game.chapter.monitoring": "Monitoring",
    "game.chapter.deploy": "Noční deploy",
    "game.chapter.security": "Security check",
    "game.chapter.datacenter": "Datacentrum",
    "game.chapter.final": "Finální incident"
  },
  en: {
    "contact.email": "Email",
    "game.score": "Score",
    "game.ready": "One click to jump. Double click in air to flip. Shield lasts 5 seconds or one hit.",
    "game.hint": "Click / Space = jump · double click = backflip",
    "game.running": "Run active",
    "game.over": "Shift over. Click to restart.",
    "game.over.ticket": "The tech tripped over a bug.",
    "game.over.reboot": "System wants a reboot.",
    "game.over.escalated": "Ticket came back.",
    "game.win": "Well done. The whole shift is solved.",
    "game.chapter.support": "Helpdesk",
    "game.chapter.repair": "Repair bench",
    "game.chapter.network": "Network corner",
    "game.chapter.storage": "Backups",
    "game.chapter.server": "Server room",
    "game.chapter.monitoring": "Monitoring",
    "game.chapter.deploy": "Night deploy",
    "game.chapter.security": "Security check",
    "game.chapter.datacenter": "Datacenter",
    "game.chapter.final": "Final incident"
  }
};

function browserLanguageFallback() {
  const language = (html.lang || navigator.language || "sk").slice(0, 2).toLowerCase();
  if (language === "cs" || language === "cz") return "cs";
  return language === "en" ? "en" : "sk";
}

window.addEventListener("site-language-applied", () => {
  currentLanguage = html.lang || browserLanguageFallback();
});

function initBinaryRunner() {
  const shell = document.querySelector("[data-runner]");
  if (!shell) return;

  const trigger = shell.querySelector("[data-game-trigger]");
  const titleNode = shell.querySelector("#contact-title");
  const titleLineOne = shell.querySelector("[data-contact-line=\"1\"]");
  const titleLineTwo = shell.querySelector("[data-contact-line=\"2\"]");
  const titleLineThree = shell.querySelector("[data-contact-line=\"3\"]");
  const panel = shell.querySelector("#binary-runner");
  const canvas = shell.querySelector("[data-game-canvas]");
  const scoreNode = shell.querySelector("[data-game-score]");
  const metaNode = shell.querySelector("[data-game-meta]");
  const stateNode = shell.querySelector("[data-game-state]");
  const scoreActionNode = shell.querySelector(".actions .button.primary span");
  const levelActionNode = shell.querySelector(".actions .button:not(.primary) span");
  const mobileGameMedia = window.matchMedia("(max-width: 900px) and (hover: none) and (pointer: coarse)");
  if (!trigger || !titleNode || !titleLineOne || !titleLineTwo || !titleLineThree || !panel || !canvas || !scoreNode || !metaNode || !stateNode) return;

  const ctx = canvas.getContext("2d");
  const player = { x: 58, y: 0, width: 38, height: 46, velocity: 0, grounded: true, runTime: 0, squash: 1, flipAngle: 0, flipVelocity: 0, flipAvailable: false };

  const maxScore = 30000;
  const chapters = [
    { min: 0, key: "game.chapter.support", color: "rgba(143, 247, 210, 0.34)", ground: "rgba(143, 247, 210, 0.32)" },
    { min: 1000, key: "game.chapter.repair", color: "rgba(255, 212, 138, 0.34)", ground: "rgba(255, 212, 138, 0.3)" },
    { min: 2000, key: "game.chapter.network", color: "rgba(126, 215, 255, 0.34)", ground: "rgba(126, 215, 255, 0.3)" },
    { min: 3000, key: "game.chapter.storage", color: "rgba(176, 205, 255, 0.34)", ground: "rgba(176, 205, 255, 0.3)" },
    { min: 4000, key: "game.chapter.server", color: "rgba(135, 168, 255, 0.36)", ground: "rgba(135, 168, 255, 0.32)" },
    { min: 5000, key: "game.chapter.monitoring", color: "rgba(143, 247, 210, 0.28)", ground: "rgba(143, 247, 210, 0.26)" },
    { min: 6000, key: "game.chapter.deploy", color: "rgba(214, 176, 255, 0.32)", ground: "rgba(214, 176, 255, 0.28)" },
    { min: 7000, key: "game.chapter.security", color: "rgba(255, 212, 138, 0.3)", ground: "rgba(255, 212, 138, 0.26)" },
    { min: 8000, key: "game.chapter.datacenter", color: "rgba(255, 116, 116, 0.28)", ground: "rgba(255, 116, 116, 0.28)" },
    { min: 9000, key: "game.chapter.final", color: "rgba(247, 250, 246, 0.32)", ground: "rgba(247, 250, 246, 0.26)" }
  ];

  const incidentTypes = [
    { kind: "virus", width: 32, height: 32, weight: 2.8 },
    { kind: "bug", width: 44, height: 30, weight: 3.2 },
    { kind: "wifi", width: 38, height: 34, weight: 2.6 },
    { kind: "update", width: 40, height: 38, weight: 2.1 },
    { kind: "fire", width: 34, height: 30, weight: 1.25, rare: true },
    { kind: "crash", width: 46, height: 34, weight: 1.5, rare: true },
    { kind: "battery", width: 42, height: 26, weight: 2.2 },
    { kind: "router", width: 40, height: 28, weight: 2.1 },
    { kind: "keyboard", width: 48, height: 18, weight: 1.8 },
    { kind: "server", width: 34, height: 44, weight: 1.6 },
    { kind: "chip", width: 32, height: 30, weight: 1.8 },
    { kind: "lock", width: 34, height: 38, weight: 1.8 },
    { kind: "terminal", width: 44, height: 34, weight: 1.6 },
    { kind: "database", width: 38, height: 38, weight: 1.4 },
    { kind: "drone", width: 40, height: 24, weight: 1.1, air: true, rare: true },
    { kind: "popup", width: 48, height: 36, weight: 1.4 },
    { kind: "cable", width: 54, height: 16, weight: 1.25 },
    { kind: "cloud", width: 52, height: 26, weight: 1.05, air: true, rare: true }
  ];
  const pickupTypes = [
    { kind: "shield", weight: 1 },
    { kind: "jetpack", weight: 0.55, min: 1000 }
  ];

  const runnerSpeech = {
    sk: {
      idle: [
        "Ticket beží. Ja tiež.",
        "Kábel vyzerá podozrivo, čiže normálny deň.",
        "Najprv preverím logy, potom panika.",
        "Reštart nechávam ako elegantnú možnosť.",
        "Zatiaľ to funguje. To je podozrivé.",
        "Helpdesk mode: pokojný výraz, rýchle nohy.",
        "Tento incident má dobrý timing. Zlý, ale dobrý.",
        "Ak to bliká, tvárim sa, že to je plánované.",
        "Systém protestuje, ja pokračujem.",
        "Nie je to útek. Je to terénna diagnostika.",
        "Bug sa tvári nenápadne. Neprešlo mu to.",
        "Oprava za behu je stále oprava.",
        "Dnes riešim veci skôr, než ma dobehnú.",
        "Keby tu bol manuál, otvorím ho hneď po smene."
      ],
      jump: [
        "Hop. Incident obídený.",
        "Prekážka preskočená, ticket zatiaľ žije.",
        "Rýchly workaround v praxi.",
        "Problém zostal pod nohami.",
        "Elegantné nie. Funkčné áno.",
        "Skok schválený zdravým rozumom.",
        "O jeden problém menej v ceste.",
        "Hop a tvárim sa pokojne."
      ],
      flip: [
        "Salto mimo dokumentácie.",
        "Ak sa niekto pýta, bol to test.",
        "Fyzika dostala krátky timeout.",
        "Bug je zmätený. Výborne.",
        "Zbytočné? Možno. Štýlové? Určite.",
        "Zapisujem: funguje aj v otočke."
      ],
      shield: [
        "Štít zapnutý, tempo drží.",
        "Firewall v teréne aktívny.",
        "Problém sa odrazil. Pekne.",
        "Tento update si nechám.",
        "Krátke okno bez stresu.",
        "Bug narazil na oprávnenia."
      ],
      tier: [
        "Priorita stúpa.",
        "Viac rýchlosti, menej priestoru na omyl.",
        "Level hore, tep hore.",
        "Systém práve pridal prácu.",
        "Teraz už treba obe oči.",
        "Toto už vyzerá ako incident."
      ]
    },
    cs: {
      idle: [
        "Ticket běží. Já taky.",
        "Kabel vypadá podezřele, takže normální den.",
        "Nejdřív zkontroluju logy, potom panika.",
        "Restart nechávám jako elegantní možnost.",
        "Zatím to funguje. To je podezřelé.",
        "Helpdesk mode: klidný výraz, rychlé nohy.",
        "Tenhle incident má dobré načasování. Špatné, ale dobré.",
        "Když to bliká, tvářím se, že je to plánované.",
        "Systém protestuje, já pokračuju.",
        "Neutíkám. Dělám terénní diagnostiku.",
        "Bug se tváří nenápadně. Neprošlo mu to.",
        "Oprava za běhu je pořád oprava.",
        "Dnes řeším věci dřív, než mě doběhnou.",
        "Kdyby tu byl manuál, otevřu ho hned po směně."
      ],
      jump: [
        "Hop. Incident obejitý.",
        "Překážka přeskočená, ticket zatím žije.",
        "Rychlý workaround v praxi.",
        "Problém zůstal pod nohama.",
        "Elegantní ne. Funkční ano.",
        "Skok schválen zdravým rozumem.",
        "O jeden problém méně v cestě.",
        "Hop a tvářím se klidně."
      ],
      flip: [
        "Salto mimo dokumentaci.",
        "Jestli se někdo ptá, byl to test.",
        "Fyzika dostala krátký timeout.",
        "Bug je zmatený. Výborně.",
        "Zbytečné? Možná. Stylové? Určitě.",
        "Zapisuju: funguje i v otočce."
      ],
      shield: [
        "Štít zapnutý, tempo drží.",
        "Firewall v terénu aktivní.",
        "Problém se odrazil. Hezky.",
        "Tenhle update si nechám.",
        "Krátké okno bez stresu.",
        "Bug narazil na oprávnění."
      ],
      tier: [
        "Priorita stoupá.",
        "Více rychlosti, méně prostoru na omyl.",
        "Level nahoru, tep nahoru.",
        "Systém právě přidal práci.",
        "Teď už to chce obě oči.",
        "Tohle už vypadá jako incident."
      ]
    },
    en: {
      idle: [
        "This is definitely not a bug. Just a surprise.",
        "The Wi-Fi left before my motivation did.",
        "If it does not crash, I am not clicking it.",
        "Ticket open. So am I.",
        "That cable looks suspicious. As always.",
        "Restart is the answer, not the question.",
        "The cache is lying. I can feel it.",
        "This has Monday energy.",
        "The server is breathing. For now.",
        "Popups belong in a museum.",
        "The bug is trying to look innocent. Badly.",
        "Panic first, documentation later.",
        "Not a fall, a debug landing.",
        "I will pretend I know what I am doing.",
        "If there was a log, I would blame it.",
        "The system says no. I say hop.",
        "Today I fix things by moving.",
        "I pressed nothing and something happened.",
        "Just a small incident. Famous words.",
        "Someone left chaos turned on.",
        "Even antivirus would run now.",
        "This looks like an update without warning.",
        "I am not running away. I am diagnosing fast.",
        "If I had a manual, I would jump over it.",
        "Gravity does not have admin rights.",
        "This bug needs personal attention.",
        "I have a plan. It is very short.",
        "When unsure, I jump. When sure, also jump.",
        "This is not a game, it is system status.",
        "My internal CPU is at 100 percent.",
        "Battery low, confidence full.",
        "Firewall holds. My nerves do not.",
        "A lock? Great, another system opinion.",
        "I would click support, but I am running.",
        "This is exactly why helpdesk exists.",
        "If it blinks, it is important. Probably.",
        "The problem is approaching very actively.",
        "Minimizing risk. Maximum speed.",
        "I am not stuck. I am rendering a decision.",
        "Quiet, I am listening to the system fall.",
        "I tried optimism. It did not help.",
        "This needs an Undo button.",
        "Error between sky and ground.",
        "Everything works so far. Suspicious.",
        "If I survive, I close the ticket.",
        "No problem, just many problems at once.",
        "This is a tech support speedrun.",
        "Fixing while running is still fixing.",
        "If it had a cable, I would trip on it.",
        "Problem monitoring: the problem monitors me."
      ],
      jump: [
        "Hop, ticket avoided.",
        "Cleared. Close without comment.",
        "Problem under my feet. Literally.",
        "That is what a quick workaround looks like.",
        "Jump approved by helpdesk.",
        "Obstacle was optional.",
        "Physical escape executed.",
        "That was a cloud jump.",
        "The bug did not catch me.",
        "Jump done, logs later.",
        "Jumping over it is also a solution.",
        "Elegant? No. Functional? Yes.",
        "Accident postponed.",
        "I turned off gravity for one second.",
        "One less problem in the way.",
        "Hop, and I look calm."
      ],
      flip: [
        "Backflip deployed to production.",
        "This was not in the changelog.",
        "Physics got a timeout.",
        "Backflip patch applied.",
        "If you ask, it was a test.",
        "That was a reboot with animation.",
        "Upside down, I see fewer problems.",
        "Backflip increased morale.",
        "The bug is confused. Excellent.",
        "That was unnecessary, but stylish.",
        "This did not deserve a unit test.",
        "Logging: works while spinning too."
      ],
      shield: [
        "Firewall on legs activated.",
        "Briefly unbeatable now.",
        "Shield on, courage too.",
        "Problem bounced away. Nice.",
        "This is my favorite update.",
        "Five seconds without responsibility.",
        "Security mode: cool guy.",
        "Finally, protection from reality.",
        "I would keep this upgrade.",
        "The bug met an administrator."
      ],
      tier: [
        "Oh, the game got serious.",
        "More speed, less thinking.",
        "Level up, pulse up.",
        "The system added problems.",
        "Now I need both eyes.",
        "The obstacles had a meeting.",
        "Speed decided to be a problem.",
        "This looks like an incident now.",
        "Coffee would be good architecture.",
        "Higher priority incoming."
      ]
    }
  };
  let width = 0;
  let height = 0;
  let ground = 0;
  let dpr = 1;
  let frame = 0;
  let lastFrameTime = 0;
  const unlockClicksRequired = 5;
  const activationCopy = {
    sk: {
      trigger: "Poďme",
      lines: [["dať"], ["veci", "do", "pohybu"], []]
    },
    cs: {
      trigger: "Pojďme",
      lines: [["dát"], ["věci", "do", "pohybu"], []]
    },
    en: {
      trigger: "Let’s",
      lines: [["get"], ["things", "moving"], []]
    }
  };
  let triggerClicks = 0;
  let revealed = false;
  let running = false;
  let gameOver = false;
  let score = 0;
  let best = 0;
  let streak = 0;
  let speed = 320;
  let spawnTimer = 0.7;
  let pickupTimer = 1.8;
  let shield = false;
  let shieldTimer = 0;
  let jetpack = false;
  let jetpackTimer = 0;
  let shake = 0;
  let speedFlash = 0;
  let lastIncident = "";
  let lastPressTime = 0;
  let incidents = [];
  let pickups = [];
  let bits = [];
  let sparks = [];
  let notes = [];
  let speech = null;
  let speechCooldown = 0;
  let recentSpeech = [];
  let chapterIndex = 0;
  let endMessage = "";
  let triggerTitleTimer = 0;
  let controlHintDelay = 0;
  let controlHintLife = 0;
  let controlHintShown = false;
  let contactLayoutLocked = false;

  function gameCopy(key) {
    const language = currentLanguage || html.lang || browserLanguageFallback();
    return translations[language]?.[key] || translations.en[key] || "";
  }

  function setState(key) {
    stateNode.textContent = gameCopy(key);
  }

  function activationTitleCopy() {
    const language = currentLanguage || html.lang || browserLanguageFallback();
    return activationCopy[language] || activationCopy.en;
  }

  function renderTriggerPhrase() {
    const copy = activationTitleCopy();
    const fullWords = copy.lines.flat();
    const removedWords = Math.min(triggerClicks, unlockClicksRequired - 1);
    const remainingWords = fullWords.slice(0, Math.max(0, fullWords.length - removedWords));
    if (revealed || triggerClicks >= unlockClicksRequired) {
      trigger.textContent = "Ticket Run";
      titleLineOne.textContent = "";
      titleLineTwo.textContent = "\u00A0";
      titleLineThree.textContent = "\u00A0";
      return;
    }

    trigger.textContent = copy.trigger;
    const lineOneCount = Math.min(copy.lines[0].length, remainingWords.length);
    const lineTwoCount = Math.min(copy.lines[1].length, Math.max(0, remainingWords.length - copy.lines[0].length));
    const lineThreeCount = Math.min(copy.lines[2].length, Math.max(0, remainingWords.length - copy.lines[0].length - copy.lines[1].length));
    const lineOneWords = remainingWords.slice(0, lineOneCount);
    const lineTwoWords = remainingWords.slice(copy.lines[0].length, copy.lines[0].length + lineTwoCount);
    const lineThreeWords = remainingWords.slice(copy.lines[0].length + copy.lines[1].length, copy.lines[0].length + copy.lines[1].length + lineThreeCount);

    titleLineOne.textContent = lineOneWords.length ? ` ${lineOneWords.join(" ")}` : "\u00A0";
    titleLineTwo.textContent = lineTwoWords.length ? `${lineTwoWords.join(" ")}.` : "\u00A0";
    titleLineThree.textContent = lineThreeWords.length ? `${lineThreeWords.join(" ")}.` : "\u00A0";
  }

  function setTriggerProgress() {
    // Progress stays logical in JS, but visual bar is intentionally disabled in CSS.
    const progress = revealed ? 1 : Math.min(triggerClicks / unlockClicksRequired, 1);
    trigger.style.setProperty("--unlock-progress", progress.toFixed(3));
  }

  function lockContactLayout() {
    if (contactLayoutLocked) return;
    const lock = () => {
      const titleHeight = Math.ceil(titleNode.getBoundingClientRect().height);
      const shellHeight = Math.ceil(shell.getBoundingClientRect().height);
      if (titleHeight > 0) titleNode.style.minHeight = `${titleHeight}px`;
      if (shellHeight > 0) shell.style.minHeight = `${shellHeight}px`;
      contactLayoutLocked = titleHeight > 0 && shellHeight > 0;
    };
    lock();
    if (!contactLayoutLocked) {
      window.requestAnimationFrame(lock);
    }
  }

  function pulseTrigger() {
    trigger.classList.remove("is-probing");
    void trigger.offsetWidth;
    trigger.classList.add("is-probing");
    if (triggerTitleTimer) {
      window.clearTimeout(triggerTitleTimer);
      triggerTitleTimer = 0;
    }
    triggerTitleTimer = window.setTimeout(() => {
      trigger.classList.remove("is-probing");
      triggerTitleTimer = 0;
    }, 220);
  }

  function scheduleTriggerTitle() {
    renderTriggerPhrase();
    setTriggerProgress();
  }

  function languageSpeech() {
    const language = currentLanguage || html.lang || browserLanguageFallback();
    return runnerSpeech[language] || runnerSpeech.en;
  }

  function speak(group = "idle", force = false) {
    if (!running || gameOver) return;
    if (!force && speechCooldown > 0) return;
    const copy = languageSpeech();
    const pool = [...(copy[group] || []), ...(group === "idle" ? [] : copy.idle)];
    const available = pool.filter((line) => !recentSpeech.includes(line));
    const source = available.length ? available : pool;
    const text = source[Math.floor(Math.random() * source.length)];
    if (!text) return;
    speech = { text, life: 4.2, max: 4.2 };
    recentSpeech.push(text);
    if (recentSpeech.length > 18) recentSpeech.shift();
    speechCooldown = force ? 13 + Math.random() * 7 : 20 + Math.random() * 10;
  }

  function chapterForScore() {
    let chapter = chapters[0];
    for (const candidate of chapters) {
      if (score >= candidate.min) chapter = candidate;
    }
    return chapter;
  }

  function setActionHudDefault() {
    if (scoreActionNode) scoreActionNode.textContent = gameCopy("contact.email") || "Email";
    if (levelActionNode) levelActionNode.textContent = "LinkedIn";
  }

  function setActionHudGame() {
    // Keep contact buttons static while playing; game HUD is shown in canvas header.
    setActionHudDefault();
  }

  function setMobileGameUi(active) {
    if (!mobileGameMedia.matches) {
      shell.classList.remove("mobile-game-active");
      return;
    }
    shell.classList.toggle("mobile-game-active", Boolean(active));
  }

  function updateHud() {
    const chapter = chapterForScore();
    const previousChapter = chapterIndex;
    chapterIndex = chapters.indexOf(chapter);
    if (running && previousChapter !== chapterIndex && score > 0) {
      speedFlash = 0.55;
      const baseSpeed = width < 460 ? 205 : 245;
      const tierStep = width < 460 ? 30 : 38;
      speed = Math.max(speed, baseSpeed + chapterIndex * tierStep);
      if (Math.random() < 0.25) speak("tier", true);
      burst(Math.min(width - 90, player.x + 78), ground - 66, chapter.color);
    }
    metaNode.textContent = `Level ${chapterIndex + 1}/${chapters.length}`;
    scoreNode.textContent = String(Math.min(maxScore, Math.floor(score)));
    setActionHudGame();
  }

  function resizeGame() {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(300, rect.width || 360);
    height = Math.max(144, rect.height || 154);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ground = height - 8;
    if (player.grounded || player.y <= 0) player.y = ground - player.height;
  }

  function setMouseEffectsPaused(paused) {
    window.dispatchEvent(new CustomEvent("ticket-run-effects", {
      detail: { paused: Boolean(paused) }
    }));
  }

  function focusGame() {
    setMouseEffectsPaused(true);
    document.body.classList.add("game-focus");
    document.body.classList.remove("desktop-effects");
    if (window.__deviceExperience) window.__deviceExperience.gameFocus = true;
  }

  function resetGame() {
    setMouseEffectsPaused(true);
    resizeGame();
    setMobileGameUi(true);
    incidents = [];
    pickups = [];
    bits = [];
    sparks = [];
    notes = [];
    speech = null;
    speechCooldown = 8 + Math.random() * 5;
    recentSpeech = [];
    score = 0;
    streak = 0;
    speed = width < 460 ? 205 : 245;
    spawnTimer = 1.05 + Math.random() * 0.85;
    pickupTimer = 9.5 + Math.random() * 6.5;
    shield = false;
    shieldTimer = 0;
    jetpack = false;
    jetpackTimer = 0;
    shake = 0;
    speedFlash = 0;
    lastIncident = "";
    lastPressTime = 0;
    chapterIndex = 0;
    endMessage = "";
    if (!controlHintShown && !mobileGameMedia.matches) {
      controlHintDelay = 1;
      controlHintLife = 5;
      controlHintShown = true;
    } else {
      controlHintDelay = 0;
      controlHintLife = 0;
    }
    running = true;
    gameOver = false;
    lastFrameTime = 0;
    player.y = ground - player.height;
    player.velocity = 0;
    player.grounded = true;
    player.runTime = 0;
    player.squash = 1;
    player.flipAngle = 0;
    player.flipVelocity = 0;
    player.flipAvailable = false;
    updateHud();
    setState("game.running");
    scheduleGame();
  }

  function chooseIncident() {
    const level = Math.min(chapters.length, Math.max(1, Math.floor(score / 1000) + 1));
    const unlockedCount = Math.min(incidentTypes.length, 4 + (level - 1) * 2);
    const unlocked = incidentTypes.slice(0, unlockedCount);
    let available = unlocked.filter((incident) => incident.kind !== lastIncident);
    if (!available.length) available = unlocked;
    const pool = available.flatMap((incident) => {
      const base = incident.weight || 2;
      const randomFactor = 0.7 + Math.random() * 0.9;
      const repeats = Math.max(1, Math.round(base * randomFactor));
      return Array.from({ length: repeats }, () => incident);
    });
    const next = pool[Math.floor(Math.random() * pool.length)];
    lastIncident = next.kind;
    return next;
  }

  function addNote(text, x, y, color = "rgba(184, 255, 232, 0.86)") {
    notes.push({ text, x, y, life: 1, color });
    if (notes.length > 8) notes.shift();
  }

  function spawnIncident() {
    const incident = chooseIncident();
    const airLift = incident.air ? 56 + Math.random() * 56 : 0;
    incidents.push({
      ...incident,
      x: width + 24 + Math.random() * 80,
      y: Math.max(16, ground - incident.height - airLift),
      wobble: Math.random() * Math.PI * 2,
      scored: false
    });
  }

  function spawnPickup() {
    if (shield || jetpack || pickups.length) return null;
    const available = pickupTypes.filter((pickup) => score >= (pickup.min || 0));
    if (!available.length) return null;
    const pool = available.flatMap((pickup) => {
      const repeats = Math.max(1, Math.round((pickup.weight || 1) * 10));
      return Array.from({ length: repeats }, () => pickup);
    });
    const pickup = pool[Math.floor(Math.random() * pool.length)];
    const y = pickup.kind === "jetpack"
      ? Math.max(28, ground - 124 - Math.random() * 42)
      : Math.max(34, ground - 72 - Math.random() * 20);
    pickups.push({ ...pickup, x: width + 20, y, width: 22, height: 22, spin: Math.random() * Math.PI * 2 });
    return pickup.kind;
  }

  function spawnBit() {
    bits.push({ x: width + Math.random() * 90, y: 20 + Math.random() * (height * 0.45), speed: 24 + Math.random() * 32, value: Math.random() > 0.5 ? "1" : "0", alpha: 0.14 + Math.random() * 0.22 });
    if (bits.length > 28) bits.shift();
  }

  function burst(x, y, color) {
    for (let index = 0; index < 9; index += 1) {
      const angle = Math.random() * Math.PI * 2;
      sparks.push({ x, y, vx: Math.cos(angle) * (32 + Math.random() * 60), vy: Math.sin(angle) * (24 + Math.random() * 50), life: 1, color });
    }
  }

  function jump() {
    if (!running || gameOver || jetpack || !player.grounded) return;
    player.velocity = width < 460 ? -620 : -650;
    player.grounded = false;
    player.squash = 0.86;
    player.flipAvailable = true;
    player.flipAngle = 0;
    player.flipVelocity = 0;
    if (Math.random() < 0.05) speak("jump");
  }

  function flip() {
    if (!running || gameOver || jetpack || player.grounded || !player.flipAvailable) return;
    player.flipAvailable = false;
    player.flipVelocity = -12.5;
    player.velocity = Math.min(player.velocity, width < 460 ? -300 : -340);
    if (Math.random() < 0.07) speak("flip");
    burst(player.x + player.width / 2, player.y + 18, "rgba(184, 255, 232, 0.5)");
  }

  function overlap(a, b) {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
  }

  function updateGame(seconds) {
    const progress = Math.min(score / maxScore, 1);
    const speedTier = Math.min(18, Math.floor(score / 1500));
    const multiplier = 1 + Math.min(streak, 9) * 0.018;
    const difficulty = speedTier / 18;
    const baseRate = 25 + progress * 28;
    const targetSpeed = (width < 460 ? 205 : 245) + speedTier * (width < 460 ? 18 : 23);
    score += seconds * baseRate * multiplier;
    speed += (targetSpeed - speed) * Math.min(seconds * 5.4, 1);
    spawnTimer -= seconds;
    pickupTimer -= seconds;
    speechCooldown = Math.max(0, speechCooldown - seconds);
    if (controlHintDelay > 0) {
      controlHintDelay = Math.max(0, controlHintDelay - seconds);
    } else if (controlHintLife > 0) {
      controlHintLife = Math.max(0, controlHintLife - seconds);
    }
    if (speech) {
      speech.life -= seconds;
      if (speech.life <= 0) speech = null;
    }
    if (!speech && speechCooldown <= 0 && Math.random() < seconds * 0.1) {
      speak("idle");
    }
    if (shield) {
      shieldTimer = Math.max(0, shieldTimer - seconds);
      if (shieldTimer <= 0) {
        shield = false;
        burst(player.x + player.width / 2, player.y + 20, "rgba(135, 168, 255, 0.42)");
      }
    }
    if (jetpack) {
      jetpackTimer = Math.max(0, jetpackTimer - seconds);
      if (jetpackTimer <= 0) {
        jetpack = false;
        burst(player.x + player.width / 2, player.y + 24, "rgba(255, 170, 102, 0.68)");
      }
    }
    shake = Math.max(0, shake - seconds * 18);
    speedFlash = Math.max(0, speedFlash - seconds);
    player.runTime += seconds * (jetpack ? 1.8 : (player.grounded ? 1 : 0.45));
    player.squash += (1 - player.squash) * Math.min(seconds * 10, 1);
    if (!player.grounded && player.flipVelocity !== 0) {
      player.flipAngle += player.flipVelocity * seconds;
      if (player.flipVelocity > 0 && player.flipAngle >= Math.PI * 2) {
        player.flipAngle = Math.PI * 2;
        player.flipVelocity = 0;
      } else if (player.flipVelocity < 0 && player.flipAngle <= -Math.PI * 2) {
        player.flipAngle = -Math.PI * 2;
        player.flipVelocity = 0;
      }
    }

    if (spawnTimer <= 0) {
      spawnIncident();
      const minGap = Math.max(0.38, 0.92 - difficulty * 0.5);
      const maxGap = Math.max(0.72, 1.78 - difficulty * 0.68);
      const pause = Math.random() < 0.18 ? Math.random() * 0.58 : 0;
      spawnTimer = minGap + Math.random() * (maxGap - minGap) + pause;
    }
    if (pickupTimer <= 0) {
      const spawnedPickupKind = spawnPickup();
      if (spawnedPickupKind === "jetpack") {
        pickupTimer = 14 + Math.random() * 8;
      } else if (spawnedPickupKind === "shield") {
        pickupTimer = 12.5 + Math.random() * 8.2;
      } else {
        pickupTimer = 4.2 + Math.random() * 3.4;
      }
    }
    

    if (jetpack) {
      const cruiseY = Math.max(18, ground - player.height - (height < 460 ? 80 : 94));
      player.velocity = 0;
      player.y += (cruiseY - player.y) * Math.min(seconds * 14, 1);
      player.grounded = false;
      player.flipAvailable = false;
      player.flipVelocity = 0;
      player.flipAngle = 0;
      speed = Math.max(speed, targetSpeed * 1.58);
    } else {
      player.velocity += 1720 * seconds;
      player.y += player.velocity * seconds;
      if (player.y >= ground - player.height) {
        if (!player.grounded && player.velocity > 180) player.squash = 1.14;
        player.y = ground - player.height;
        player.velocity = 0;
        player.grounded = true;
        player.flipAngle = 0;
        player.flipVelocity = 0;
        player.flipAvailable = false;
      }
    }

    for (const incident of incidents) {
      incident.x -= speed * seconds;
      incident.wobble += seconds * 5;
      if (!incident.scored && incident.x + incident.width < player.x) {
        incident.scored = true;
        streak = Math.min(streak + 1, 12);
        const reward = Math.round(8 + streak * 1.8);
        score += reward;
      }
    }
    for (const pickup of pickups) {
      pickup.x -= speed * 0.88 * seconds;
      pickup.spin += seconds * 5.5;
    }
    for (const bit of bits) bit.x -= bit.speed * seconds;
    for (const spark of sparks) {
      spark.x += spark.vx * seconds;
      spark.y += spark.vy * seconds;
      spark.vy += 80 * seconds;
      spark.life -= seconds * 1.8;
    }
    for (const note of notes) {
      note.y -= 26 * seconds;
      note.life -= seconds * 0.9;
    }

    incidents = incidents.filter((incident) => incident.x + incident.width > -30);
    pickups = pickups.filter((pickup) => pickup.x + pickup.width > -30);
    bits = bits.filter((bit) => bit.x > -25);
    sparks = sparks.filter((spark) => spark.life > 0);
    notes = notes.filter((note) => note.life > 0);

    const playerBox = { x: player.x + 8, y: player.y + 6, width: player.width - 15, height: player.height - 8 };
    for (let index = pickups.length - 1; index >= 0; index -= 1) {
      const pickup = pickups[index];
      const box = { x: pickup.x + 2, y: pickup.y + 2, width: pickup.width - 4, height: pickup.height - 4 };
      if (!overlap(playerBox, box)) continue;
      if (pickup.kind === "jetpack") {
        jetpack = true;
        jetpackTimer = 3;
        shield = false;
        shieldTimer = 0;
        score += 28;
        burst(pickup.x + 11, pickup.y + 11, "rgba(255, 166, 96, 0.92)");
        addNote("JETPACK", pickup.x - 8, pickup.y - 8, "rgba(255, 206, 130, 0.96)");
        if (Math.random() < 0.45) speak("tier", true);
      } else {
        shield = true;
        shieldTimer = 5;
        score += 18;
        if (Math.random() < 0.22) speak("shield", true);
        burst(pickup.x + 11, pickup.y + 11, "rgba(135, 168, 255, 0.85)");
      }
      pickups.splice(index, 1);
    }

    for (let index = incidents.length - 1; index >= 0; index -= 1) {
      const incident = incidents[index];
      const box = { x: incident.x + 3, y: incident.y + 3, width: incident.width - 6, height: incident.height - 5 };
      if (!overlap(playerBox, box)) continue;
      if (jetpack) {
        streak = Math.min(streak + 1, 12);
        score += 22;
        burst(incident.x + incident.width / 2, incident.y + incident.height / 2, "rgba(255, 166, 96, 0.9)");
        incidents.splice(index, 1);
        continue;
      }
      if (shield) {
        shield = false;
        shieldTimer = 0;
        streak = 0;
        score += 18;
        burst(incident.x + incident.width / 2, incident.y + incident.height / 2, "rgba(135, 168, 255, 0.85)");
        incidents.splice(index, 1);
        continue;
      }
      streak = 0;
      shake = 5;
      burst(incident.x + incident.width / 2, incident.y + incident.height / 2, "rgba(255, 116, 116, 0.85)");
      incidents.splice(index, 1);
      running = false;
      gameOver = true;
      setMouseEffectsPaused(false);
      best = Math.max(best, Math.min(maxScore, Math.floor(score)));
      const endings = ["game.over.ticket", "game.over.reboot", "game.over.escalated"];
      endMessage = gameCopy(endings[Math.floor(Math.random() * endings.length)]);
      setState("game.over");
      break;
    }
    if (score >= maxScore && running && !gameOver) {
      score = maxScore;
      running = false;
      gameOver = true;
      setMouseEffectsPaused(false);
      best = Math.max(best, maxScore);
      endMessage = gameCopy("game.win");
      setState("game.win");
      burst(player.x + player.width / 2, player.y + 8, "rgba(184, 255, 232, 0.92)");
    }
    updateHud();
  }

  function roundedRect(x, y, rectWidth, rectHeight, radius) {
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(x, y, rectWidth, rectHeight, radius);
    } else {
      ctx.beginPath();
      ctx.rect(x, y, rectWidth, rectHeight);
    }
  }

  function drawLocation(chapter) {
    return;
  }

  function drawIncident(incident) {
    const x = incident.x;
    const y = incident.y + Math.sin(incident.wobble) * 1.5;
    const cx = x + incident.width / 2;
    const cy = y + incident.height / 2;
    ctx.save();
    ctx.shadowBlur = 8;
    ctx.shadowColor = incident.kind === "virus" || incident.kind === "bug" ? "rgba(255, 86, 86, 0.35)" : "rgba(135, 168, 255, 0.28)";
    if (incident.kind === "virus") {
      ctx.strokeStyle = "rgba(255, 96, 96, 0.78)";
      ctx.lineWidth = 1.4;
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * 10, cy + Math.sin(angle) * 10);
        ctx.lineTo(cx + Math.cos(angle) * 17, cy + Math.sin(angle) * 17);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(cx, cy, 11, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 68, 68, 0.28)";
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "rgba(255, 230, 230, 0.9)";
      ctx.fillRect(cx - 4, cy - 3, 3, 3);
      ctx.fillRect(cx + 3, cy + 2, 3, 3);
    } else if (incident.kind === "bug") {
      ctx.strokeStyle = "rgba(255, 97, 97, 0.72)";
      ctx.lineWidth = 1.4;
      for (let index = 0; index < 3; index += 1) {
        const offset = -8 + index * 8;
        ctx.beginPath();
        ctx.moveTo(cx - 9, cy + offset * 0.15);
        ctx.lineTo(cx - 21, cy + offset + 3);
        ctx.moveTo(cx + 9, cy + offset * 0.15);
        ctx.lineTo(cx + 21, cy + offset + 3);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.ellipse(cx, cy + 2, 13, 9, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(42, 10, 14, 0.96)";
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(cx, cy - 10, 7, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else if (incident.kind === "wifi") {
      ctx.strokeStyle = "rgba(247, 250, 246, 0.72)";
      ctx.lineWidth = 1.8;
      for (let radius = 8; radius <= 22; radius += 7) {
        ctx.beginPath();
        ctx.arc(cx, cy + 9, radius, Math.PI * 1.16, Math.PI * 1.84);
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(247, 250, 246, 0.78)";
      ctx.beginPath();
      ctx.arc(cx, cy + 10, 2.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 96, 96, 0.9)";
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(x + 4, y + 3);
      ctx.lineTo(x + incident.width - 4, y + incident.height - 3);
      ctx.stroke();
    } else if (incident.kind === "update") {
      roundedRect(x + 2, y + 2, incident.width - 4, incident.height - 4, 5);
      ctx.fillStyle = "rgba(58, 140, 255, 0.34)";
      ctx.fill();
      ctx.strokeStyle = "rgba(103, 176, 255, 0.86)";
      ctx.stroke();
      ctx.fillStyle = "rgba(224, 241, 255, 0.78)";
      ctx.fillRect(x + 9, y + 9, 7, 7);
      ctx.fillRect(x + 20, y + 9, 7, 7);
      ctx.fillRect(x + 9, y + 20, 7, 7);
      ctx.fillRect(x + 20, y + 20, 7, 7);
    } else if (incident.kind === "fire") {
      ctx.shadowColor = "rgba(255, 126, 58, 0.42)";
      ctx.strokeStyle = "rgba(255, 168, 84, 0.82)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - 13, y + incident.height - 2);
      ctx.quadraticCurveTo(cx - 18, y + 12, cx - 5, y + 11);
      ctx.quadraticCurveTo(cx - 7, y + 1, cx + 3, y + 8);
      ctx.quadraticCurveTo(cx + 12, y + 12, cx + 10, y + incident.height - 2);
      ctx.closePath();
      ctx.fillStyle = "rgba(255, 92, 42, 0.36)";
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - 5, y + incident.height - 3);
      ctx.quadraticCurveTo(cx - 7, y + 16, cx + 1, y + 15);
      ctx.quadraticCurveTo(cx + 7, y + 17, cx + 5, y + incident.height - 3);
      ctx.closePath();
      ctx.fillStyle = "rgba(255, 216, 123, 0.72)";
      ctx.fill();
    } else if (incident.kind === "battery") {
      roundedRect(x + 2, y + 5, incident.width - 8, incident.height - 10, 4);
      ctx.fillStyle = "rgba(29, 18, 14, 0.86)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 212, 138, 0.9)";
      ctx.lineWidth = 1.6;
      ctx.stroke();
      roundedRect(x + incident.width - 7, y + 11, 5, 7, 2);
      ctx.fillStyle = "rgba(255, 212, 138, 0.72)";
      ctx.fill();
      ctx.fillStyle = "rgba(255, 96, 96, 0.72)";
      ctx.fillRect(x + 7, y + 10, 7, 8);
      ctx.strokeStyle = "rgba(247, 250, 246, 0.82)";
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(x + 23, y + 8);
      ctx.lineTo(x + 18, y + 15);
      ctx.lineTo(x + 25, y + 15);
      ctx.lineTo(x + 20, y + 22);
      ctx.stroke();
    } else if (incident.kind === "lock") {
      ctx.strokeStyle = "rgba(255, 212, 138, 0.86)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, y + 15, 9, Math.PI, Math.PI * 2);
      ctx.stroke();
      roundedRect(x + 5, y + 15, incident.width - 10, incident.height - 17, 5);
      ctx.fillStyle = "rgba(75, 49, 18, 0.86)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 212, 138, 0.86)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = "rgba(247, 250, 246, 0.84)";
      ctx.beginPath();
      ctx.arc(cx, y + 25, 2.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(cx - 1, y + 27, 2, 6);
    } else if (incident.kind === "router") {
      roundedRect(x + 2, y + 6, incident.width - 4, incident.height - 10, 5);
      ctx.fillStyle = "rgba(12, 34, 42, 0.9)";
      ctx.fill();
      ctx.strokeStyle = "rgba(126, 215, 255, 0.78)";
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.fillStyle = "rgba(184, 255, 232, 0.74)";
      ctx.fillRect(x + 8, y + 11, 3, 3);
      ctx.fillRect(x + 14, y + 11, 3, 3);
      ctx.fillRect(x + 20, y + 11, 3, 3);
      ctx.strokeStyle = "rgba(126, 215, 255, 0.78)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(x + 9, y + 8);
      ctx.lineTo(x + 7, y + 2);
      ctx.moveTo(x + incident.width - 9, y + 8);
      ctx.lineTo(x + incident.width - 7, y + 2);
      ctx.stroke();
    } else if (incident.kind === "keyboard") {
      roundedRect(x + 2, y + 8, incident.width - 4, incident.height - 10, 5);
      ctx.fillStyle = "rgba(16, 24, 31, 0.94)";
      ctx.fill();
      ctx.strokeStyle = "rgba(184, 255, 232, 0.34)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.fillStyle = "rgba(184, 255, 232, 0.52)";
      for (let key = 0; key < 4; key += 1) {
        ctx.fillRect(x + 8 + key * 9, y + 12, 5, 3);
      }
    } else if (incident.kind === "server") {
      roundedRect(x + 4, y + 2, incident.width - 8, incident.height - 4, 4);
      ctx.fillStyle = "rgba(7, 13, 19, 0.96)";
      ctx.fill();
      ctx.strokeStyle = "rgba(126, 215, 255, 0.72)";
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.fillStyle = "rgba(184, 255, 232, 0.78)";
      for (let row = 0; row < 3; row += 1) {
        ctx.fillRect(x + 10, y + 9 + row * 10, 3, 3);
        ctx.fillRect(x + 16, y + 9 + row * 10, 3, 3);
        ctx.fillRect(x + 22, y + 9 + row * 10, 3, 3);
      }
    } else if (incident.kind === "chip") {
      roundedRect(x + 8, y + 6, incident.width - 16, incident.height - 12, 4);
      ctx.fillStyle = "rgba(29, 63, 82, 0.86)";
      ctx.fill();
      ctx.strokeStyle = "rgba(126, 215, 255, 0.84)";
      ctx.lineWidth = 1.3;
      ctx.stroke();
      ctx.strokeStyle = "rgba(184, 255, 232, 0.52)";
      for (let pin = 0; pin < 4; pin += 1) {
        const pinY = y + 10 + pin * 5;
        ctx.beginPath();
        ctx.moveTo(x + 5, pinY);
        ctx.lineTo(x + 8, pinY);
        ctx.moveTo(x + incident.width - 5, pinY);
        ctx.lineTo(x + incident.width - 8, pinY);
        ctx.stroke();
      }
    } else if (incident.kind === "terminal") {
      roundedRect(x + 1, y + 3, incident.width - 2, incident.height - 6, 5);
      ctx.fillStyle = "rgba(5, 16, 11, 0.94)";
      ctx.fill();
      ctx.strokeStyle = "rgba(143, 247, 210, 0.72)";
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.fillStyle = "rgba(143, 247, 210, 0.78)";
      ctx.fillRect(x + 8, y + 10, incident.width - 16, 3);
      ctx.fillRect(x + 8, y + 17, incident.width - 22, 3);
      ctx.fillRect(x + 8, y + 24, incident.width - 18, 3);
    } else if (incident.kind === "database") {
      ctx.fillStyle = "rgba(126, 215, 255, 0.14)";
      for (let layer = 0; layer < 3; layer += 1) {
        const cyDb = y + 10 + layer * 10;
        ctx.beginPath();
        ctx.ellipse(cx, cyDb, 12, 4.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(126, 215, 255, 0.76)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    } else if (incident.kind === "drone") {
      ctx.strokeStyle = "rgba(184, 255, 232, 0.74)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(x + 8, cy);
      ctx.lineTo(x + incident.width - 8, cy);
      ctx.moveTo(cx, y + 5);
      ctx.lineTo(cx, y + incident.height - 5);
      ctx.stroke();
      roundedRect(cx - 7, cy - 5, 14, 10, 4);
      ctx.fillStyle = "rgba(18, 30, 38, 0.94)";
      ctx.fill();
      ctx.strokeStyle = "rgba(126, 215, 255, 0.7)";
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + 7, y + 6, 3.2, 0, Math.PI * 2);
      ctx.arc(x + incident.width - 7, y + 6, 3.2, 0, Math.PI * 2);
      ctx.arc(x + 7, y + incident.height - 6, 3.2, 0, Math.PI * 2);
      ctx.arc(x + incident.width - 7, y + incident.height - 6, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(184, 255, 232, 0.62)";
      ctx.fill();
    } else if (incident.kind === "cable") {
      ctx.strokeStyle = "rgba(255, 212, 138, 0.86)";
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(x + 3, cy);
      ctx.bezierCurveTo(x + 16, cy - 10, x + 34, cy + 11, x + incident.width - 6, cy - 2);
      ctx.stroke();
      roundedRect(x + incident.width - 12, cy - 5, 8, 10, 2);
      ctx.fillStyle = "rgba(255, 212, 138, 0.72)";
      ctx.fill();
    } else if (incident.kind === "cloud") {
      ctx.fillStyle = "rgba(184, 255, 232, 0.18)";
      ctx.beginPath();
      ctx.arc(x + 18, y + 13, 9, 0, Math.PI * 2);
      ctx.arc(x + 30, y + 11, 11, 0, Math.PI * 2);
      ctx.arc(x + 40, y + 14, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(184, 255, 232, 0.72)";
      ctx.lineWidth = 1.3;
      ctx.stroke();
      ctx.strokeStyle = "rgba(255, 96, 96, 0.84)";
      ctx.beginPath();
      ctx.moveTo(x + 20, y + incident.height - 2);
      ctx.lineTo(x + 30, y + incident.height - 10);
      ctx.lineTo(x + 25, y + incident.height - 10);
      ctx.lineTo(x + 34, y + incident.height - 20);
      ctx.stroke();
    } else if (incident.kind === "popup") {
      roundedRect(x + 1, y + 3, incident.width - 2, incident.height - 6, 6);
      ctx.fillStyle = "rgba(9, 20, 17, 0.92)";
      ctx.fill();
      ctx.strokeStyle = "rgba(184, 255, 232, 0.72)";
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.fillStyle = "rgba(255, 96, 96, 0.78)";
      ctx.beginPath();
      ctx.arc(x + incident.width - 9, y + 10, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(247, 250, 246, 0.86)";
      ctx.lineWidth = 1.7;
      ctx.beginPath();
      ctx.moveTo(x + 13, y + 14);
      ctx.lineTo(x + 23, y + 24);
      ctx.moveTo(x + 23, y + 14);
      ctx.lineTo(x + 13, y + 24);
      ctx.stroke();
      ctx.fillStyle = "rgba(184, 255, 232, 0.5)";
      ctx.fillRect(x + 29, y + 17, 10, 3);
      ctx.fillRect(x + 29, y + 23, 7, 3);
    } else {
      roundedRect(x + 1, y + 2, incident.width - 2, incident.height - 4, 5);
      ctx.fillStyle = "rgba(32, 88, 210, 0.72)";
      ctx.fill();
      ctx.strokeStyle = "rgba(132, 185, 255, 0.9)";
      ctx.stroke();
      ctx.fillStyle = "rgba(235, 246, 255, 0.85)";
      ctx.fillRect(x + 8, y + 9, 18, 3);
      ctx.fillRect(x + 8, y + 16, 30, 3);
      ctx.strokeStyle = "rgba(255, 116, 116, 0.82)";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(x + 31, y + 8);
      ctx.lineTo(x + 39, y + 16);
      ctx.moveTo(x + 39, y + 8);
      ctx.lineTo(x + 31, y + 16);
      ctx.stroke();
      ctx.strokeStyle = "rgba(184, 255, 232, 0.34)";
      ctx.beginPath();
      ctx.moveTo(x + 6, y + incident.height - 8);
      ctx.lineTo(x + 17, y + incident.height - 18);
      ctx.lineTo(x + 27, y + incident.height - 11);
      ctx.lineTo(x + 40, y + incident.height - 23);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawPickup(pickup) {
    const x = pickup.x;
    const y = pickup.y + Math.sin(pickup.spin) * 3;
    const cx = x + pickup.width / 2;
    ctx.save();
    ctx.translate(cx, y + pickup.height / 2);
    ctx.rotate(Math.sin(pickup.spin) * 0.16);
    ctx.translate(-cx, -(y + pickup.height / 2));
    if (pickup.kind === "jetpack") {
      ctx.shadowBlur = 14;
      ctx.shadowColor = "rgba(255, 176, 108, 0.45)";
      roundedRect(x + 6, y + 3, 10, 16, 3);
      ctx.fillStyle = "rgba(99, 120, 142, 0.78)";
      ctx.fill();
      ctx.strokeStyle = "rgba(214, 232, 246, 0.9)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      roundedRect(x + 15, y + 4, 4, 5, 2);
      ctx.fillStyle = "rgba(184, 255, 232, 0.85)";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x + 8, y + 19);
      ctx.lineTo(x + 6, y + 23);
      ctx.lineTo(x + 11, y + 22);
      ctx.closePath();
      ctx.fillStyle = "rgba(255, 133, 76, 0.84)";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x + 14, y + 19);
      ctx.lineTo(x + 13, y + 24);
      ctx.lineTo(x + 17, y + 22);
      ctx.closePath();
      ctx.fillStyle = "rgba(255, 208, 122, 0.82)";
      ctx.fill();
    } else {
      ctx.shadowBlur = 12;
      ctx.shadowColor = "rgba(135, 168, 255, 0.42)";
      ctx.beginPath();
      ctx.moveTo(cx, y + 2);
      ctx.lineTo(x + 18, y + 7);
      ctx.lineTo(x + 16, y + 17);
      ctx.lineTo(cx, y + 21);
      ctx.lineTo(x + 6, y + 17);
      ctx.lineTo(x + 4, y + 7);
      ctx.closePath();
      ctx.fillStyle = "rgba(135, 168, 255, 0.22)";
      ctx.fill();
      ctx.strokeStyle = "rgba(165, 195, 255, 0.86)";
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, y + 11, 5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(184, 255, 232, 0.72)";
      ctx.stroke();
    }
    ctx.restore();
  }

  function wrapSpeech(text, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let line = "";
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines.slice(0, 3);
  }

  function drawControlHint() {
    if (!running || gameOver || controlHintDelay > 0 || controlHintLife <= 0) return;
    const hintText = gameCopy("game.hint");
    if (!hintText) return;
    ctx.save();
    const age = 5 - controlHintLife;
    const alpha = Math.min(1, controlHintLife / 0.4, age / 0.28);
    const maxTextWidth = Math.min(width - 44, width < 460 ? 230 : 360);
    ctx.font = "800 10.5px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const lines = wrapSpeech(hintText, maxTextWidth);
    const textWidth = Math.max(...lines.map((line) => ctx.measureText(line).width), 80);
    const bubbleWidth = Math.min(width - 20, textWidth + 28);
    const bubbleHeight = 20 + lines.length * 13;
    const x = (width - bubbleWidth) / 2;
    const y = 10;
    ctx.globalAlpha = Math.max(0, alpha);
    roundedRect(x, y, bubbleWidth, bubbleHeight, 999);
    ctx.shadowColor = "rgba(143, 247, 210, 0.14)";
    ctx.shadowBlur = 12;
    ctx.fillStyle = "rgba(9, 24, 19, 0.82)";
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(184, 255, 232, 0.34)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "rgba(247, 250, 246, 0.88)";
    lines.forEach((line, index) => {
      ctx.fillText(line, width / 2, y + 13 + index * 13);
    });
    ctx.restore();
  }

  function drawSpeech() {
    if (!speech) return;
    ctx.save();
    const alpha = Math.min(1, speech.life / 0.35, (speech.max - speech.life) / 0.25);
    ctx.globalAlpha = Math.max(0, alpha);
    ctx.font = "700 10.5px ui-sans-serif, system-ui, sans-serif";
    const maxTextWidth = width < 460 ? 124 : 166;
    const lines = wrapSpeech(speech.text, maxTextWidth);
    const textWidth = Math.max(...lines.map((line) => ctx.measureText(line).width), 40);
    const bubbleWidth = Math.min(maxTextWidth + 28, textWidth + 28);
    const bubbleHeight = 20 + lines.length * 14;
    const anchorX = player.x + 34;
    const anchorY = Math.max(12, player.y - 8);
    const x = Math.min(width - bubbleWidth - 8, Math.max(8, anchorX));
    const y = Math.max(8, anchorY - bubbleHeight);
    roundedRect(x, y, bubbleWidth, bubbleHeight, 10);
    ctx.shadowColor = "rgba(143, 247, 210, 0.14)";
    ctx.shadowBlur = 12;
    ctx.fillStyle = "rgba(9, 24, 19, 0.8)";
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(184, 255, 232, 0.4)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(Math.min(x + 24, bubbleWidth + x - 18), y + bubbleHeight);
    ctx.lineTo(Math.min(x + 36, bubbleWidth + x - 10), y + bubbleHeight);
    ctx.lineTo(player.x + 27, Math.max(18, player.y + 8));
    ctx.closePath();
    ctx.fillStyle = "rgba(9, 24, 19, 0.8)";
    ctx.fill();
    ctx.strokeStyle = "rgba(184, 255, 232, 0.38)";
    ctx.stroke();
    ctx.font = "700 10.5px ui-sans-serif, system-ui, sans-serif";
    ctx.fillStyle = "rgba(247, 250, 246, 0.94)";
    lines.forEach((line, index) => {
      ctx.fillText(line, x + 14, y + 17 + index * 14);
    });
    ctx.restore();
  }

  function drawTechnician() {
    const stride = jetpack ? 0 : (player.grounded && running ? Math.sin(player.runTime * 17) : -0.48);
    const bob = jetpack ? 0 : (player.grounded && running ? Math.abs(Math.sin(player.runTime * 17)) * 1.4 : 0);
    const tilt = jetpack
      ? -0.06 + Math.sin(player.runTime * 9) * 0.02
      : (player.grounded ? stride * 0.022 : Math.max(-0.14, Math.min(0.14, player.velocity / 2800)) + player.flipAngle);
    const x = player.x;
    const y = Math.max(player.y, 6);
    const jumpHeight = Math.max(0, ground - player.height - player.y);
    const shadowScale = Math.max(0.45, 1 - jumpHeight / 155);
    const shadowAlpha = 0.1 + shadowScale * 0.12;
    ctx.fillStyle = `rgba(0, 0, 0, ${shadowAlpha})`;
    ctx.beginPath();
    ctx.ellipse(x + 22, ground + 4, 22 * shadowScale, 4.5 * (0.72 + shadowScale * 0.28), 0, 0, Math.PI * 2);
    ctx.fill();
    if (shield) {
      const shieldRatio = Math.max(0, Math.min(1, shieldTimer / 5));
      const pulse = Math.sin(player.runTime * 10) * 1.6;
      ctx.beginPath();
      ctx.arc(x + 23, y + 21, 29 + pulse, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * shieldRatio);
      ctx.strokeStyle = "rgba(135, 168, 255, 0.56)";
      ctx.lineWidth = 2.4;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + 23, y + 21, 32 + pulse * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(135, 168, 255, 0.18)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
    if (jetpack) {
      const flamePulse = 0.72 + Math.sin(player.runTime * 22) * 0.2;
      ctx.save();
      ctx.globalAlpha = 0.88;
      ctx.fillStyle = "rgba(255, 140, 92, 0.86)";
      ctx.beginPath();
      ctx.moveTo(x + 8, y + 40);
      ctx.lineTo(x - 5 - flamePulse * 5, y + 46);
      ctx.lineTo(x + 8, y + 50);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "rgba(255, 218, 138, 0.82)";
      ctx.beginPath();
      ctx.moveTo(x + 8, y + 42);
      ctx.lineTo(x - 1 - flamePulse * 3.5, y + 46);
      ctx.lineTo(x + 8, y + 48);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(184, 255, 232, 0.38)";
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(x + 6, y + 45);
      ctx.lineTo(x - 13 - flamePulse * 8, y + 45);
      ctx.stroke();
      ctx.restore();
    }
    ctx.save();
    ctx.translate(x + 22, y + 24 - bob);
    ctx.rotate(tilt);
    ctx.scale(1 / player.squash, player.squash);
    ctx.translate(-22, -24);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.strokeStyle = "rgba(6, 10, 10, 0.98)";
    ctx.lineWidth = 4.8;
    ctx.beginPath();
    ctx.moveTo(17, 34);
    ctx.lineTo(9 - stride * 3.4, 44);
    ctx.moveTo(27, 34);
    ctx.lineTo(35 + stride * 3.4, 44);
    ctx.stroke();
    ctx.strokeStyle = "rgba(184, 255, 232, 0.64)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(9 - stride * 3.4, 44);
    ctx.lineTo(4 - stride * 3.4, 44);
    ctx.moveTo(35 + stride * 3.4, 44);
    ctx.lineTo(41 + stride * 3.4, 44);
    ctx.stroke();

    roundedRect(9, 18, 27, 21, 8);
    ctx.fillStyle = "rgba(7, 18, 17, 0.98)";
    ctx.fill();
    ctx.strokeStyle = "rgba(143, 247, 210, 0.76)";
    ctx.stroke();
    roundedRect(13, 22, 18, 12, 4);
    ctx.fillStyle = "rgba(184, 255, 232, 0.08)";
    ctx.fill();
    ctx.strokeStyle = "rgba(184, 255, 232, 0.36)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.strokeStyle = "rgba(184, 255, 232, 0.6)";
    ctx.beginPath();
    ctx.moveTo(22, 18);
    ctx.lineTo(22, 38);
    ctx.stroke();

    ctx.strokeStyle = "rgba(184, 255, 232, 0.66)";
    ctx.lineWidth = 2.8;
    ctx.beginPath();
    ctx.moveTo(13, 24);
    ctx.lineTo(7, 31 + stride);
    ctx.moveTo(32, 24);
    ctx.lineTo(38, 29 - stride * 0.7);
    ctx.stroke();

    roundedRect(29, 23 - stride * 0.7, 21, 13, 3);
    ctx.fillStyle = "rgba(106, 132, 155, 0.62)";
    ctx.fill();
    ctx.strokeStyle = "rgba(207, 232, 238, 0.92)";
    ctx.stroke();
    ctx.fillStyle = "rgba(184, 255, 232, 0.54)";
    ctx.fillRect(33, 27 - stride * 0.7, 10, 1.3);
    ctx.fillRect(33, 30 - stride * 0.7, 6, 1.2);
    ctx.fillStyle = "rgba(247, 250, 246, 0.28)";
    ctx.fillRect(31, 34 - stride * 0.7, 20, 2);

    roundedRect(14, 5, 18, 9, 4);
    ctx.fillStyle = "rgba(7, 12, 12, 0.98)";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(22, 12, 9, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(232, 190, 160, 0.98)";
    ctx.fill();
    ctx.strokeStyle = "rgba(247, 250, 246, 0.38)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "rgba(8, 10, 9, 0.98)";
    ctx.beginPath();
    ctx.ellipse(22, 6, 9.8, 5.5, -0.12, Math.PI, Math.PI * 2);
    ctx.fill();
    roundedRect(13, 5, 17, 4, 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(17, 8);
    ctx.lineTo(12, 13);
    ctx.lineTo(18, 12);
    ctx.fill();
    ctx.strokeStyle = "rgba(19, 34, 31, 0.92)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(14, 12);
    ctx.lineTo(30, 12);
    ctx.stroke();
    roundedRect(16, 10, 13, 5, 2.5);
    ctx.fillStyle = "rgba(8, 17, 15, 0.66)";
    ctx.fill();
    ctx.strokeStyle = "rgba(184, 255, 232, 0.48)";
    ctx.stroke();
    ctx.fillStyle = "rgba(8, 10, 9, 0.82)";
    ctx.fillRect(18, 12, 2, 1.5);
    ctx.fillRect(25, 12, 2, 1.5);
    ctx.strokeStyle = "rgba(90, 47, 36, 0.54)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, 17);
    ctx.quadraticCurveTo(23, 18.2, 27, 17);
    ctx.stroke();
    ctx.restore();
  }

  function drawGame() {
    ctx.clearRect(0, 0, width, height);
    const chapter = chapters[chapterIndex] || chapterForScore();
    ctx.save();
    if (shake) ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
    drawLocation(chapter);
    if (speedFlash > 0) {
      ctx.save();
      ctx.globalAlpha = Math.min(0.55, speedFlash);
      ctx.strokeStyle = chapter.color;
      ctx.lineWidth = 1.2;
      for (let index = 0; index < 8; index += 1) {
        const y = 26 + index * 20;
        const x = width - ((speedFlash * 260 + index * 73) % (width + 120));
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 72, y + 10);
        ctx.stroke();
      }
      ctx.restore();
    }
    incidents.forEach(drawIncident);
    pickups.forEach(drawPickup);
    drawTechnician();
    drawSpeech();
    drawControlHint();
    sparks.forEach((spark) => {
      ctx.fillStyle = spark.color;
      ctx.globalAlpha = Math.max(0, spark.life);
      ctx.fillRect(spark.x, spark.y, 3, 3);
      ctx.globalAlpha = 1;
    });
    notes.forEach((note) => {
      ctx.globalAlpha = Math.max(0, note.life);
      ctx.fillStyle = note.color;
      ctx.font = "700 10px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
      ctx.fillText(note.text, note.x, note.y);
      ctx.globalAlpha = 1;
    });
    if (gameOver) {
      ctx.fillStyle = "rgba(34, 40, 34, 0.88)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "rgba(247, 250, 246, 0.94)";
      ctx.font = "700 15px ui-sans-serif, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(endMessage || gameCopy("game.over"), width / 2, height / 2 - 8);
      ctx.fillStyle = "rgba(184, 224, 198, 0.92)";
      ctx.font = "11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
      ctx.fillText(`${gameCopy("game.score")}: ${Math.min(maxScore, Math.floor(score))}  BEST: ${best}`, width / 2, height / 2 + 18);
      ctx.textAlign = "left";
    }
    ctx.restore();
  }

  function gameLoop(timestamp = performance.now()) {
    frame = 0;
    const elapsed = lastFrameTime ? timestamp - lastFrameTime : 16.67;
    const seconds = Math.min(elapsed / 1000, 0.05);
    lastFrameTime = timestamp;
    if (running && !gameOver) updateGame(seconds);
    drawGame();
    if (running && !gameOver) {
      frame = window.requestAnimationFrame(gameLoop);
    } else {
      lastFrameTime = 0;
    }
  }

  function scheduleGame() {
    if (document.visibilityState !== "visible") return;
    if (!frame) frame = window.requestAnimationFrame(gameLoop);
  }

  function handleGameVisibilityChange() {
    if (document.visibilityState !== "visible") {
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
      lastFrameTime = 0;
      return;
    }
    if (revealed && running && !gameOver) scheduleGame();
  }

  function revealGame() {
    if (!revealed) {
      revealed = true;
      setMobileGameUi(true);
      renderTriggerPhrase();
      setTriggerProgress();
      trigger.setAttribute("aria-expanded", "true");
      scheduleTriggerTitle();
      const revealDelay = reducedMotion.matches ? 0 : 260;
      window.setTimeout(() => {
        if (mobileGameMedia.matches) {
          shell.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "center" });
        }
        focusGame();
        panel.hidden = false;
        window.setTimeout(resetGame, reducedMotion.matches ? 0 : 120);
      }, revealDelay);
      return;
    }
    resetGame();
  }


  function handleGamePress(event) {
    event.preventDefault();
    if (!revealed || gameOver) {
      revealGame();
      return;
    }
    const now = performance.now();
    if (player.grounded) {
      lastPressTime = now;
      jump();
      return;
    }
    if (now - lastPressTime < 360) {
      flip();
    }
    lastPressTime = now;
  }

  function handleGameAction(event) {
    event.preventDefault();
    handleGamePress(event);
  }

  function handleTriggerPress(event) {
    event.preventDefault();
    if (!revealed) {
      triggerClicks += 1;
      renderTriggerPhrase();
      setTriggerProgress();
      pulseTrigger();
      if (triggerClicks >= unlockClicksRequired) revealGame();
      return;
    }
    handleGamePress(event);
  }

  trigger.addEventListener("click", handleTriggerPress);
  canvas.addEventListener("pointerdown", handleGamePress);
  canvas.addEventListener("dblclick", (event) => {
    event.preventDefault();
    flip();
  });
  let lastTouchEnd = 0;
  canvas.addEventListener("touchend", (event) => {
    const now = Date.now();
    if (now - lastTouchEnd < 320) {
      // Block browser double-tap zoom inside the minigame area.
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, { passive: false });
  canvas.addEventListener("gesturestart", (event) => {
    // iOS Safari gesture guard for game surface.
    event.preventDefault();
  }, { passive: false });
  window.addEventListener("resize", () => {
    if (!revealed) return;
    resizeGame();
    drawGame();
  }, { passive: true });
  window.addEventListener("keydown", (event) => {
    if (!revealed || (event.code !== "Space" && event.code !== "ArrowUp")) return;
    if (event.repeat) {
      event.preventDefault();
      return;
    }
    handleGameAction(event);
  });
  window.addEventListener("site-language-applied", () => {
    if (!revealed) {
      setState("game.ready");
      if (triggerTitleTimer) { window.clearTimeout(triggerTitleTimer); triggerTitleTimer = 0; }
      trigger.classList.remove("is-probing");
      renderTriggerPhrase();
      setTriggerProgress();
      setActionHudDefault();
      return;
    }
    scheduleTriggerTitle();
    updateHud();
    setState(gameOver ? "game.over" : "game.running");
    drawGame();
  });
  window.addEventListener("visibilitychange", handleGameVisibilityChange, { passive: true });
  mobileGameMedia.addEventListener("change", () => {
    setMobileGameUi(revealed);
  });

  renderTriggerPhrase();
  setTriggerProgress();
  lockContactLayout();
  setMobileGameUi(false);
  setActionHudDefault();
}

document.addEventListener("DOMContentLoaded", initBinaryRunner);
