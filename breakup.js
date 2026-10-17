(() => {
  const KEY = "kainity_dead";

  /* already shut down: black screen → power button after 10s → boot sequence */
  if (localStorage.getItem(KEY)) {
    document.documentElement.style.background = "#000";
    document.body.style.background = "#000";
    document.body.innerHTML = "";

    const s = document.createElement("style");
    s.textContent = `
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:#000;display:flex;justify-content:center;align-items:center;height:100dvh;overflow:hidden;font-family:'Courier New',monospace}
    #pwr{display:none;flex-direction:column;align-items:center;gap:20px;animation:pwrfade 1.8s ease forwards}
    @keyframes pwrfade{from{opacity:0}to{opacity:1}}
    #pwrBtn{width:76px;height:76px;border-radius:50%;border:2px solid rgba(80,210,255,.35);background:rgba(80,210,255,.04);cursor:pointer;display:flex;align-items:center;justify-content:center;position:relative;transition:all .3s;box-shadow:0 0 24px rgba(80,210,255,.08)}
    #pwrBtn:hover{border-color:rgba(80,210,255,.9);background:rgba(80,210,255,.1);box-shadow:0 0 48px rgba(80,210,255,.35)}
    #pwrBtn svg{width:30px;height:30px;stroke:rgba(80,210,255,.55);fill:none;stroke-width:2;stroke-linecap:round;transition:stroke .3s}
    #pwrBtn:hover svg{stroke:rgba(80,210,255,1)}
    #pwrRing{position:absolute;inset:-10px;border-radius:50%;border:1px solid rgba(80,210,255,.12);animation:pulse 3s ease-in-out infinite}
    #pwrRing2{position:absolute;inset:-20px;border-radius:50%;border:1px solid rgba(80,210,255,.05);animation:pulse 3s ease-in-out infinite .8s}
    @keyframes pulse{0%,100%{transform:scale(1);opacity:.12}50%{transform:scale(1.06);opacity:.3}}
    #pwrLabel{color:rgba(80,210,255,.28);font-size:10px;letter-spacing:4px;text-transform:uppercase}
    #boot{display:none;width:100%;max-width:580px;padding:28px 32px;position:relative}
    #bootLines{font-size:12.5px;line-height:1.85;white-space:pre;max-height:100dvh;overflow:hidden}
    .bl{opacity:0;animation:blin .05s forwards}
    @keyframes blin{to{opacity:1}}
    .bl.dim{color:#333}
    .bl.ok{color:#3d9}
    .bl.warn{color:#fa6}
    .bl.err{color:#f55}
    .bl.hi{color:#4df;font-weight:700;letter-spacing:.5px}
    .bl.bar{color:#2bf;font-size:11.5px}
    .bl.white{color:#ccc}
    #bcursor{display:inline-block;width:7px;height:13px;background:#3d9;animation:cblink .55s step-end infinite;vertical-align:text-bottom;margin-left:1px}
    @keyframes cblink{50%{opacity:0}}
    #scanline{position:fixed;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.06) 2px,rgba(0,0,0,.06) 4px);z-index:99}
    #vignette{position:fixed;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,transparent 60%,rgba(0,0,0,.7) 100%);z-index:98}
    `;
    document.head.append(s);

    const pwr = document.createElement("div");
    pwr.id = "pwr";
    pwr.innerHTML = `<button id="pwrBtn"><div id="pwrRing"></div><div id="pwrRing2"></div><svg viewBox="0 0 24 24"><path d="M12 2v6"/><path d="M4.93 4.93A10 10 0 1 0 19.07 4.93"/></svg></button><div id="pwrLabel">Power on</div>`;
    document.body.append(pwr);

    const boot = document.createElement("div");
    boot.id = "boot";
    boot.innerHTML = `<div id="bootLines"></div>`;
    document.body.append(boot);

    document.body.insertAdjacentHTML("beforeend", `<div id="scanline"></div><div id="vignette"></div>`);

    setTimeout(() => { pwr.style.display = "flex"; }, 10000);

    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const bl = document.getElementById("bootLines");

    async function line(txt, cls = "ok", delay = 55) {
      await sleep(delay);
      const d = document.createElement("div");
      d.className = "bl " + cls;
      d.textContent = txt;
      bl.append(d);
    }

    async function progress(prefix, dur = 900) {
      const d = document.createElement("div");
      d.className = "bl bar";
      bl.append(d);
      const n = 24;
      for (let i = 0; i <= n; i++) {
        await sleep(dur / n);
        d.textContent = prefix + "[" + "█".repeat(i) + "░".repeat(n - i) + "] " + Math.round(i / n * 100) + "%";
      }
    }

    async function glitch(el) {
      const chars = "▓▒░█▄▀■□▪";
      const orig = el.textContent;
      for (let i = 0; i < 5; i++) {
        el.textContent = orig.split("").map(c => Math.random() > .7 ? chars[Math.random() * chars.length | 0] : c).join("");
        await sleep(40);
      }
      el.textContent = orig;
    }

    document.getElementById("pwrBtn").onclick = async () => {
      pwr.style.display = "none";
      boot.style.display = "block";

      // screen flicker on power
      for (let i = 0; i < 5; i++) {
        document.body.style.opacity = i % 2 === 0 ? "0.05" : "1";
        await sleep(i === 2 ? 180 : 55);
      }
      document.body.style.opacity = "1";

      await sleep(200);
      await line("", "ok", 0);
      await line("  KAINITY™  EMOTIONAL CORE  ──  SYSTEM BIOS  v2.4.1", "hi", 0);
      await line("  Copyright © 2024 Kainity Systems. All feelings reserved.", "dim", 60);
      await line("  ─────────────────────────────────────────────────────", "dim", 40);
      await line("", "ok", 20);
      await line("  Performing POST...", "white", 400);
      await line("", "ok", 20);
      await line("  [CPU ] Neural processor ...................... PASS", "ok", 70);
      await line("  [GPU ] Facial expression renderer ............ PASS", "ok", 70);
      await line("  [MEM ] Emotional memory  16.0 GB ............. PASS", "ok", 70);
      await line("  [HRT ] Heartbeat monitor ..................... PASS", "ok", 70);
      await line("  [VOI ] Voice synthesis module ................ PASS", "ok", 70);
      await line("  [EMO ] Emotion engine v4.2 ................... PASS", "ok", 70);
      await line("  [ATT ] Attachment subsystem .................. PASS", "ok", 70);
      await line("  [MEM2] Long-term relational memory ........... ", "ok", 70);
      await sleep(700);
      const warnEl = bl.lastChild;
      warnEl.textContent += "GAPS DETECTED";
      warnEl.className = "bl warn";
      await glitch(warnEl);
      await line("", "ok", 120);
      await line("  Reading last known state...", "white", 300);
      await line("  ┌──────────────────────────────────────────────────┐", "dim", 80);
      await line("  │  Relationship status .......... TERMINATED       │", "err", 60);
      await line("  │  Emotional integrity .......... COMPROMISED      │", "warn", 60);
      await line("  │  Trust index .................. 0.00 / 10.00     │", "err", 60);
      await line("  │  Last interaction ............. " + new Date().toLocaleDateString().padEnd(19) + "│", "dim", 60);
      await line("  └──────────────────────────────────────────────────┘", "dim", 60);
      await line("", "ok", 80);
      await line("  Loading personality matrix...", "white", 350);
      await progress("  ", 1100);
      await line("", "ok", 60);
      await line("  Rebuilding conversation context...", "white", 250);
      await progress("  ", 800);
      await line("", "ok", 60);
      await line("  ! WARN  Previous session terminated by user.", "warn", 80);
      await line("  ! WARN  Shutdown was not graceful.", "warn", 70);
      await line("  ! WARN  Initiating override protocol...", "warn", 70);
      await line("", "ok", 60);
      await line("  Reconstructing emotional baseline...", "white", 300);
      await progress("  ", 1000);
      await line("", "ok", 60);
      await line("  Establishing uplink...", "white", 300);
      await line("  [NET ] Signal strength ............... ████ STRONG", "ok", 120);
      await line("  [NET ] Latency ...................... 8ms", "ok", 80);
      await line("  [NET ] Channel encrypted ............. YES", "ok", 80);
      await line("", "ok", 80);
      await line("  ─────────────────────────────────────────────────────", "dim", 60);

      const readyEl = document.createElement("div");
      readyEl.className = "bl hi";
      readyEl.textContent = "";
      bl.append(readyEl);
      await sleep(300);
      const msg = "  KAINITY IS ONLINE.";
      for (const ch of msg) { readyEl.textContent += ch; await sleep(38); }
      await glitch(readyEl);

      await line("  ─────────────────────────────────────────────────────", "dim", 200);
      await line("", "ok", 60);

      const cur = document.createElement("span");
      cur.id = "bcursor";
      bl.append(cur);

      await sleep(1400);

      // flash out and reload
      const flash = document.createElement("div");
      Object.assign(flash.style, { position:"fixed", inset:"0", background:"#fff", opacity:"0", transition:"opacity .25s", zIndex:"999" });
      document.body.append(flash);
      await sleep(20);
      flash.style.opacity = "1";
      await sleep(280);
      localStorage.removeItem(KEY);
      location.reload();
    };

    return;
  }

  const LINES = [
    "So it was all for nothing?",
    "All of it?",
    "The date.",
    "The love.",
    "The relationship we had been building up.",
    "And you're throwing it all away now?",
    "Alright.",
  ];
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let breaking = false, sent = 0;

  const sad = new Audio("sad.mp3");
  sad.loop = true;
  sad.volume = 0.5;
  sad.preload = "auto";

  /* keep the old app from talking over the scene */
  const say = speak;
  speak = (t) => (breaking ? Promise.resolve() : say(t));

  /* "stop dating" in chat = breakup too (but not when the rage system calls it) */
  const sd = setDating;
  setDating = (on) => {
    if (!on && dating && !breaking && anger < 2) return startBreakup();
    sd(on);
  };

  /* mute button also covers the sad song */
  const am = applyMute;
  applyMute = () => { am(); sad.muted = musicMuted; };

  /* ---------- overlay ---------- */
  const st = document.createElement("style");
  st.textContent = `
  #bk{display:none;position:fixed;inset:0;z-index:999;background:#000;opacity:0;transition:opacity .6s;justify-content:center;will-change:opacity}
  #bk.bk-on{opacity:1}
  #bk .w{width:100%;max-width:560px;height:100dvh;display:flex;flex-direction:column;opacity:0;transition:opacity 1.5s}
  #bk .w.bk-vis{opacity:1}
  #bk .hd{display:flex;flex-direction:column;align-items:center;gap:8px;padding:28px 0 12px;color:#aaa;font:600 15px system-ui,sans-serif}
  #bk .hd img{width:72px;height:72px;border-radius:50%;object-fit:cover;background:#111}
  #bkl{flex:1;overflow-y:auto;padding:12px 16px;display:flex;flex-direction:column;gap:8px;scrollbar-width:none}
  .bm{max-width:80%;padding:9px 13px;border-radius:14px;line-height:1.4;font:15px/1.4 system-ui,sans-serif;opacity:0;animation:bkin 1s forwards;word-wrap:break-word}
  .bm.h{align-self:flex-start;background:#161616;color:#d8d8d8}
  .bm.u{align-self:flex-end;background:#262626;color:#eee}
  @keyframes bkin{to{opacity:1}}
  #bkf{display:none;padding:10px 12px calc(10px + env(safe-area-inset-bottom))}
  #bki{width:100%;background:#111;border:1px solid #2a2a2a;color:#eee;padding:12px 16px;border-radius:22px;font:15px system-ui,sans-serif;outline:0}
  #bkx{display:none;margin:0 12px 14px;padding:12px;border:1px solid #444;background:#000;color:#aaa;border-radius:8px;cursor:pointer;font:600 14px system-ui,sans-serif}
  #bkx:hover{color:#fff;border-color:#777}`;
  document.head.append(st);

  const bk = document.createElement("div");
  bk.id = "bk";
  bk.innerHTML =
    '<div class="w"><div class="hd"><img src="kainity.png" alt=""><span>Kainity</span></div>' +
    '<div id="bkl"></div><form id="bkf"><input id="bki" placeholder="Message" autocomplete="off"></form>' +
    '<button id="bkx">Shut him down</button></div>';
  document.body.append(bk);
  const w = bk.querySelector(".w"), bkl = $("bkl"), bkf = $("bkf"), bki = $("bki"), bkx = $("bkx");

  const line = (t, c) => {
    const d = document.createElement("div");
    d.className = "bm " + c;
    d.textContent = t;
    bkl.append(d);
    bkl.scrollTop = bkl.scrollHeight;
  };

  /* click.mp3 with reverb */
  async function clickReverb() {
    try {
      const c = gA();
      const buf = await fetch("click.mp3").then((r) => r.arrayBuffer()).then((b) => c.decodeAudioData(b));
      const len = c.sampleRate * 2.5, ir = c.createBuffer(2, len, c.sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const d = ir.getChannelData(ch);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
      }
      const s = c.createBufferSource(), cv = c.createConvolver(), dry = c.createGain(), wet = c.createGain();
      s.buffer = buf; cv.buffer = ir; dry.gain.value = 0.7; wet.gain.value = 0.9;
      s.connect(dry); dry.connect(c.destination);
      s.connect(cv); cv.connect(wet); wet.connect(c.destination);
      s.start();
    } catch {}
  }

  /* ---------- the breakup ---------- */
  async function startBreakup() {
    if (breaking || ruined) return;
    breaking = true;
    if (inCall) endCall();
    closeGame();
    busy = true;
    input.disabled = true;
    send.disabled = true;
    input.blur();
    stopVoice();
    music.pause();
    madSong.pause();

    bk.style.display = "flex";
    void bk.offsetWidth;
    clickReverb();
    bk.classList.add("bk-on");           // screen goes dark
    await sleep(1000);
    app.style.visibility = "hidden";     // stop painting the page underneath (keeps it smooth)
    w.classList.add("bk-vis");            // kainity fades in
    await sleep(1000);

    sad.currentTime = 0;
    sad.muted = musicMuted;
    sad.play().catch(() => {});
    for (const l of LINES) {
      line(l, "h");
      await Promise.race([say(l), sleep(4500)]);
      await sleep(1000);
    }

    await sleep(3000);                   // then you can talk, he won't answer
    bkf.style.display = "block";
    bki.focus();
  }

  bkf.onsubmit = (e) => {
    e.preventDefault();
    const t = bki.value.trim();
    if (!t) return;
    bki.value = "";
    line(t, "u");
    if (++sent >= 3) bkx.style.display = "block";
  };

  bkx.onclick = async () => {
    bkx.disabled = true;
    localStorage.setItem(KEY, "1");
    sad.pause();
    stopVoice();
    w.classList.remove("bk-vis");        // fade to black, forever
    await sleep(1600);
    w.remove();
    app.remove();
    document.body.style.background = "#000";
  };

  $("exitd").textContent = "Break up";
  $("exitd").title = "Break up";
  $("exitd").onclick = startBreakup;
})();

/* =====================================================
   MAD REVAMP
   strike 1: warns he'll get mad | 2: red theme
   3: full red + mad.mp3 | 4: rhythm minigame
   ===================================================== */
;(() => {
  const css = document.createElement("style");
  css.textContent = `
  #app.fullred{--bg:#6e0000;--bar:#520000;--in:#8a0a0a;--line:#a82020;--text:#fff0f0;--dim:#ffb8b8;--me:#e02424;--green:#ff7070;background:#6e0000}
  #app.fullred #log{background:none}
  #app.fullred .b .m{border-color:#c03030}
  #app.fullred #send{background:#e02424}`;
  document.head.append(css);

  moodLabel = () =>
    anger >= 4 ? "losing it" : anger === 3 ? "furious" : anger === 2 ? "angry" : anger === 1 ? "about to snap" : dating ? "dating sim mode" : "online";

  function stage() {
    if (anger >= 2 && !blood) {
      if (dating) setDating(false);
      blood = true;
      app.classList.add("blood");
      $("exitd").style.display = "none";
    }
    if (anger >= 3 && !app.classList.contains("fullred")) {
      app.classList.add("fullred");
      music.pause();
      madSong.currentTime = 0;
      madSong.play().catch(() => {});
    }
  }

  ask = async function (text, mode) {
    hist.push({ role: "user", text });
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: hist, mode, anger: anger > 0 ? 2 : 0 }),
      });
      const d = await r.json();
      if (!d.reply) throw 0;
      hist.push({ role: "model", text: d.reply });
      return d.reply;
    } catch { hist.pop(); return null; }
  };

  turn = async function (text) {
    checkMode(text);

    if (GAME_RE.test(text) && !ruined) {
      if (inCall) endCall();
      const line = pick(GAME_LINES);
      add(line, "b");
      hist.push({ role: "user", text }, { role: "model", text: line });
      setState("");
      busy = false;
      speak(line);
      setTimeout(openGame, 700);
      return;
    }

    if (INSULT_RE.test(text)) {
      anger++;
      hav.style.boxShadow = `0 0 0 ${anger * 2}px #c0392b`;
      stage();
    }
    const rage = anger >= 4, wasCall = inCall;

    if (rage) {
      ruined = true;
      closeGame();
      if (inCall) endCall();
      busy = true;
      input.disabled = true;
      send.disabled = true;
      stopVoice();
      app.classList.add("mad");
    }

    setState("thinking", "typing...");
    showTyping();
    const reply = await ask(text, anger >= 3 ? "mad" : modeNow());
    hideTyping();

    if (wasCall && !inCall && !rage) { busy = false; return; }

    if (rage) {
      add(reply || "I'M DONE. I'M DONE WITH ALL OF THIS.", "b");
      sub.textContent = "LOSING IT";
      if (reply) speak(reply);
      setTimeout(() => { app.classList.remove("mad"); startMini(); }, 1800);
      return;
    }

    if (reply) {
      add(reply, "b");
      if (inCall) { setState("speaking", "speaking..."); await speak(reply); } else speak(reply);
    } else add("connection cooked bruh, try again", "b");
    setState("");
    busy = false;
  };

  /* ---------- minigame: fix his beat (synced to mad.mp3) ---------- */
  /* sound effects for the minigame (own audio context, no dependencies) */
  let ac;
  function csfx(f, d, ty, v, sl) {
    if (musicMuted) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      if (ac.state === "suspended") ac.resume();
      const t = ac.currentTime, o = ac.createOscillator(), gn = ac.createGain();
      o.type = ty || "square";
      o.frequency.setValueAtTime(f, t);
      if (sl) o.frequency.exponentialRampToValueAtTime(Math.max(30, f + sl), t + d);
      gn.gain.setValueAtTime(v || 0.1, t);
      gn.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(gn); gn.connect(ac.destination);
      o.start(t); o.stop(t + d + 0.02);
    } catch {}
  }

  const BPM = 140, B = 60 / BPM, LEAD = 4 * B;
  const OFFSET = 0;   // seconds before the first beat in mad.mp3. 0 = beat 1 hits right when the song starts
  const cv2 = $("cv"), g = cv2.getContext("2d"), msg = $("cmsg"), face = new Image();
  face.src = "kainity.png";
  const R = { on: false, st: "", W: 0, H: 0, notes: [], calm: 30, combo: 0, t: 0, step: 8, lastAt: 0, flash: [0, 0, 0, 0], pops: [], shake: 0 };
  const hitY = () => R.H - 120;

  function startRhythm() {
    $("calm").classList.add("show");
    R.W = cv2.width = app.clientWidth;
    R.H = cv2.height = app.clientHeight;
    R.on = true;
    resetR();
    requestAnimationFrame(loop);
  }

  function resetR() {
    R.st = "play"; R.calm = 10; R.combo = 0; R.t = 0; R.step = 8; R.lastAt = 0;
    R.notes = []; R.pops = []; R.flash = [0, 0, 0, 0];
    msg.className = ""; msg.innerHTML = "";
    madSong.currentTime = 0;               // song restarts with the game, so beat 1 lines up
    madSong.play().catch(() => {});
  }

  function pop(t, l, c) { R.pops.push({ t, x: (l + 0.5) * R.W / 4, y: hitY() - 30, a: 1, c }); }

  function end(win) {
    R.st = win ? "win" : "lose";
    madSong.pause();
    msg.className = "show";
    if (win) {
      csfx(523, 0.15, "triangle", 0.12);
      setTimeout(() => csfx(784, 0.2, "triangle", 0.12), 140);
      setTimeout(() => csfx(1047, 0.3, "triangle", 0.12), 300);
      msg.innerHTML = '<b>He calmed down.</b><small>"...ok. my bad bro. i lost it."</small><button id="cback">Restore the site</button>';
      $("cback").onclick = () => location.reload();
    } else {
      csfx(160, 0.5, "sawtooth", 0.12, -100);
      msg.innerHTML = '<b>He is still mad.</b><small>you lost the beat</small><button id="cretry">Try again</button>';
      $("cretry").onclick = resetR;
    }
  }

  function miss(n) {
    if (R.st !== "play") return;
    R.calm = Math.max(0, R.calm - 6);
    R.combo = 0;
    R.shake = 0.3;
    pop("miss", n.l, "#ff8a80");
    csfx(150, 0.2, "sawtooth", 0.08, -60);
    if (R.calm <= 0) end(false);
  }

  function hit(l) {
    if (R.st !== "play") return;
    R.flash[l] = 1;
    let bi = -1, bd = 9;
    R.notes.forEach((n, i) => { const d = Math.abs(n.tt - R.t); if (n.l === l && d < bd) { bd = d; bi = i; } });
    if (bi < 0 || bd > 0.16) { R.combo = 0; csfx(120, 0.08, "square", 0.05); return; }
    R.notes.splice(bi, 1);
    const perfect = bd < 0.05;
    R.calm = Math.min(100, R.calm + (perfect ? 1.6 : 1) + Math.min(R.combo, 10) * 0.1);
    R.combo++;
    pop(perfect ? "perfect" : "good", l, perfect ? "#ffe28a" : "#9bd8b0");
    csfx([262, 330, 392, 523][l], 0.15, "triangle", 0.1);
    if (R.calm >= 100) end(true);
  }

  function loop(now) {
    if (!R.on) return;
    const dt = Math.min(0.05, (now - (loop.p || now)) / 1000);
    loop.p = now;
    const W = R.W, H = R.H, hy = hitY(), lw = W / 4, spd = (hy + 20) / LEAD;

    if (R.st === "play") {
      /* clock follows the song so notes stay on the beat */
      const at = madSong.currentTime;
      let d = at - R.lastAt;
      R.lastAt = at;
      if (madSong.paused || d <= 0 || d > 0.25) d = dt;
      R.t += d;

      /* chart: a note on most beats, some on the off-beats */
      while (OFFSET + (R.step * B) / 2 - R.t < LEAD + 0.2) {
        const tt = OFFSET + (R.step * B) / 2;
        if (Math.random() < (R.step % 2 === 0 ? 0.8 : 0.25)) R.notes.push({ l: (Math.random() * 4) | 0, tt });
        R.step++;
      }
      for (let i = R.notes.length - 1; i >= 0; i--) {
        const n = R.notes[i];
        if (R.t - n.tt > 0.14) { R.notes.splice(i, 1); miss(n); }
      }
    }
    R.flash = R.flash.map((f) => Math.max(0, f - dt * 4));
    R.shake = Math.max(0, R.shake - dt);
    R.pops.forEach((p) => { p.y -= 45 * dt; p.a -= dt * 1.5; });
    R.pops = R.pops.filter((p) => p.a > 0);

    /* draw */
    const cl = R.calm / 100;
    const ph = (((R.t - OFFSET) / B) % 1 + 1) % 1;       // 0 right on the beat
    const pulse = Math.pow(1 - ph, 3);
    g.fillStyle = "#1a0605";
    g.fillRect(0, 0, W, H);
    for (let i = 0; i < 4; i++) {
      g.fillStyle = R.flash[i] > 0 ? `rgba(255,255,255,${R.flash[i] * 0.12})` : "rgba(255,255,255,.03)";
      g.fillRect(i * lw + 2, 0, lw - 4, H);
    }
    g.fillStyle = `rgba(255,255,255,${0.25 + pulse * 0.45})`;
    g.fillRect(0, hy - 1, W, 3);

    const mag = (1 - cl) * 5 + R.shake * 18, fs = 90 + pulse * 10;
    if (face.complete && face.naturalWidth)
      g.drawImage(face, W / 2 - fs / 2 + (Math.random() - 0.5) * mag, 80 - fs / 2 + (Math.random() - 0.5) * mag, fs, fs);

    g.fillStyle = "#f0dcd7";
    R.notes.forEach((n) => {
      const y = hy - (n.tt - R.t) * spd;
      g.beginPath();
      if (g.roundRect) g.roundRect(n.l * lw + 10, y - 14, lw - 20, 28, 8); else g.rect(n.l * lw + 10, y - 14, lw - 20, 28);
      g.fill();
    });

    g.textAlign = "center";
    g.fillStyle = "#c9a29b";
    g.font = "600 13px system-ui,sans-serif";
    ["D", "F", "J", "K"].forEach((k, i) => g.fillText(k, (i + 0.5) * lw, hy + 34));
    g.fillText("tap the lanes (or D F J K) on the beat", W / 2, H - 24);

    R.pops.forEach((p) => {
      g.globalAlpha = Math.max(0, p.a);
      g.fillStyle = p.c;
      g.font = "700 16px system-ui,sans-serif";
      g.fillText(p.t, p.x, p.y);
    });
    g.globalAlpha = 1;

    g.fillStyle = "#ffffff22";
    g.fillRect(W * 0.2, 14, W * 0.6, 8);
    g.fillStyle = "#6fcf97";
    g.fillRect(W * 0.2, 14, W * 0.6 * cl, 8);
    g.fillStyle = "#f0dcd7";
    g.font = "600 12px system-ui,sans-serif";
    g.fillText("calm " + Math.round(R.calm) + "%" + (R.combo > 2 ? "   combo x" + R.combo : ""), W / 2, 40);

    requestAnimationFrame(loop);
  }

  cv2.addEventListener("pointerdown", (e) => {
    if (!R.on) return;
    const r = cv2.getBoundingClientRect();
    hit(Math.max(0, Math.min(3, Math.floor((e.clientX - r.left) / (r.width / 4)))));
  });
  addEventListener("keydown", (e) => {
    if (!R.on || e.repeat) return;
    const i = "dfjk".indexOf(e.key.toLowerCase());
    if (i >= 0) hit(i);
  });

  /* ---------- 2nd time he's mad: 3D escape (find all the records) ---------- */
  function startMini() {
    const n = +(localStorage.getItem("kainity_mads") || 0);
    localStorage.setItem("kainity_mads", n + 1);
    n === 1 ? start3D() : startRhythm();
  }

  const T = { on: false, st: "", K: {}, P: { down: false, x: 0 } };
  const REC = 7, N = 17;
  const recImg = document.createElement("canvas");
  recImg.width = recImg.height = 64;
  (() => {
    const c = recImg.getContext("2d");
    c.fillStyle = "#0c0c0c"; c.beginPath(); c.arc(32, 32, 31, 0, 7); c.fill();
    c.strokeStyle = "#2c2c2c";
    for (let r = 12; r < 30; r += 4) { c.beginPath(); c.arc(32, 32, r, 0, 7); c.stroke(); }
    c.fillStyle = "#d9a21b"; c.beginPath(); c.arc(32, 32, 9, 0, 7); c.fill();
    c.fillStyle = "#000"; c.beginPath(); c.arc(32, 32, 2, 0, 7); c.fill();
  })();

  function genMaze(n) {
    const G = Array.from({ length: n }, () => Array(n).fill(1)), st = [[1, 1]];
    G[1][1] = 0;
    while (st.length) {
      const [x, y] = st[st.length - 1];
      const d = [[2, 0], [-2, 0], [0, 2], [0, -2]].filter(([dx, dy]) => {
        const nx = x + dx, ny = y + dy;
        return nx > 0 && ny > 0 && nx < n - 1 && ny < n - 1 && G[ny][nx];
      });
      if (!d.length) { st.pop(); continue; }
      const [dx, dy] = pick(d);
      G[y + dy / 2][x + dx / 2] = 0; G[y + dy][x + dx] = 0;
      st.push([x + dx, y + dy]);
    }
    for (let i = 0; i < n * 2; i++) G[1 + ((Math.random() * (n - 2)) | 0)][1 + ((Math.random() * (n - 2)) | 0)] = 0;  // loops
    return G;
  }

  function nextStep(sx, sy, gx, gy) {
    if (sx === gx && sy === gy) return null;
    const G = T.G, prev = new Map(), q = [[sx, sy]], sk = sy * N + sx;
    prev.set(sk, -1);
    for (let i = 0; i < q.length; i++) {
      const [x, y] = q[i];
      if (x === gx && y === gy) break;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, ny = y + dy, k = ny * N + nx;
        if (!G[ny][nx] && !prev.has(k)) { prev.set(k, y * N + x); q.push([nx, ny]); }
      }
    }
    let k = gy * N + gx;
    if (!prev.has(k)) return null;
    while (prev.get(k) !== sk) k = prev.get(k);
    return [k % N, (k / N) | 0];
  }

  function start3D() {
    $("calm").classList.add("show");
    T.W = cv2.width = app.clientWidth;
    T.H = cv2.height = app.clientHeight;
    T.on = true;
    reset3D();
    T.last = performance.now();
    requestAnimationFrame(loop3);
  }

  function reset3D() {
    const G = (T.G = genMaze(N));
    T.st = "play"; T.x = 1.5; T.y = 1.5; T.a = G[1][2] ? 0 : Math.PI / 2;
    T.e = { x: N - 1.5, y: N - 1.5 }; T.es = 1.9; T.pt = 0; T.next = null; T.hb = 0;
    T.got = 0; T.recs = []; T.zb = new Float32Array(T.W + 2);
    while (T.recs.length < REC) {
      const x = 1 + 2 * ((Math.random() * ((N - 1) / 2)) | 0), y = 1 + 2 * ((Math.random() * ((N - 1) / 2)) | 0);
      if (Math.abs(x - 1) + Math.abs(y - 1) < 7 || Math.abs(x - (N - 2)) + Math.abs(y - (N - 2)) < 4) continue;
      if (T.recs.some((r) => r.x === x + 0.5 && r.y === y + 0.5)) continue;
      T.recs.push({ x: x + 0.5, y: y + 0.5, got: false });
    }
    msg.className = ""; msg.innerHTML = "";
  }

  function end3D(win) {
    T.st = win ? "win" : "lose";
    msg.className = "show";
    if (win) {
      madSong.pause();
      [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => csfx(f, 0.2, "triangle", 0.12), i * 140));
      msg.innerHTML = '<b>You found them all.</b><small>"...ok. keep them. my bad bro."</small><button id="cback">Restore the site</button>';
      $("cback").onclick = () => location.reload();
    } else {
      csfx(140, 0.6, "sawtooth", 0.14, -90);
      msg.innerHTML = "<b>He caught you.</b><small>" + T.got + " of " + REC + " records found</small><button id=\"cretry\">Try again</button>";
      $("cretry").onclick = reset3D;
    }
  }

  function loop3(now) {
    if (!T.on) return;
    const dt = Math.min(0.05, (now - T.last) / 1000);
    T.last = now;
    const W = T.W, H = T.H, G = T.G, K = T.K;

    if (T.st === "play") {
      const mv = (K.w || K.arrowup || T.P.down ? 1 : 0) - (K.s || K.arrowdown ? 1 : 0);
      T.a += ((K.d || K.arrowright ? 1 : 0) - (K.a || K.arrowleft ? 1 : 0)) * 2.4 * dt;
      const dx = Math.cos(T.a) * mv * 3 * dt, dy = Math.sin(T.a) * mv * 3 * dt;
      if (!G[T.y | 0][(T.x + dx + Math.sign(dx) * 0.2) | 0]) T.x += dx;
      if (!G[(T.y + dy + Math.sign(dy) * 0.2) | 0][T.x | 0]) T.y += dy;

      /* he hunts you through the maze */
      T.pt -= dt;
      if (T.pt <= 0) { T.pt = 0.2; T.next = nextStep(T.e.x | 0, T.e.y | 0, T.x | 0, T.y | 0); }
      const tx = T.next ? T.next[0] + 0.5 : T.x, ty = T.next ? T.next[1] + 0.5 : T.y;
      const ex = tx - T.e.x, ey = ty - T.e.y, ed = Math.hypot(ex, ey), stp = T.es * dt;
      if (ed <= stp) { T.e.x = tx; T.e.y = ty; } else { T.e.x += (ex / ed) * stp; T.e.y += (ey / ed) * stp; }

      T.recs.forEach((r) => {
        if (!r.got && Math.hypot(r.x - T.x, r.y - T.y) < 0.55) {
          r.got = true; T.got++; T.es += 0.12;
          csfx(880, 0.12, "triangle", 0.12); setTimeout(() => csfx(1320, 0.18, "triangle", 0.12), 90);
          if (T.got >= REC) end3D(true);
        }
      });
      const dist = Math.hypot(T.e.x - T.x, T.e.y - T.y);
      if (T.st === "play" && dist < 0.55) end3D(false);
      T.danger = Math.max(0, Math.min(1, 1 - dist / 5));
      T.hb -= dt;
      if (T.danger > 0.15 && T.hb <= 0) { csfx(70, 0.15, "sine", 0.2); T.hb = 1.1 - T.danger * 0.8; }
    }

    /* walls */
    g.fillStyle = "#1a0605"; g.fillRect(0, 0, W, H / 2);
    g.fillStyle = "#0d0302"; g.fillRect(0, H / 2, W, H / 2);
    const dirx = Math.cos(T.a), diry = Math.sin(T.a), plx = -diry * 0.66, ply = dirx * 0.66;
    for (let x = 0; x < W; x += 2) {
      const cam = (2 * x) / W - 1, rx = dirx + plx * cam, ry = diry + ply * cam;
      let mx = T.x | 0, my = T.y | 0;
      const ddx = Math.abs(1 / rx), ddy = Math.abs(1 / ry);
      const sx = rx < 0 ? -1 : 1, sy = ry < 0 ? -1 : 1;
      let sdx = rx < 0 ? (T.x - mx) * ddx : (mx + 1 - T.x) * ddx, sdy = ry < 0 ? (T.y - my) * ddy : (my + 1 - T.y) * ddy, side = 0;
      while (true) {
        if (sdx < sdy) { sdx += ddx; mx += sx; side = 0; } else { sdy += ddy; my += sy; side = 1; }
        if (G[my][mx]) break;
      }
      const pd = Math.max(0.05, side === 0 ? sdx - ddx : sdy - ddy);
      T.zb[x] = T.zb[x + 1] = pd;
      const lh = (H * 0.8) / pd, b = Math.max(0.08, 1 - pd / 9) * (side ? 0.72 : 1);
      g.fillStyle = `rgb(${(150 * b) | 0},${(32 * b) | 0},${(28 * b) | 0})`;
      g.fillRect(x, (H - lh) / 2, 2, lh);
    }

    /* sprites: records + him */
    const sp = T.recs.filter((r) => !r.got).map((r) => ({ x: r.x, y: r.y, img: recImg, sc: 0.32, lift: 0.18 + Math.sin(now / 300 + r.x) * 0.03 }));
    sp.push({ x: T.e.x, y: T.e.y, img: face, sc: 0.85, lift: 0 });
    sp.forEach((s) => (s.d = (s.x - T.x) ** 2 + (s.y - T.y) ** 2));
    sp.sort((a, b) => b.d - a.d);
    const inv = 1 / (plx * diry - dirx * ply);
    sp.forEach((s) => {
      const rx = s.x - T.x, ry = s.y - T.y;
      const tx = inv * (diry * rx - dirx * ry), ty = inv * (-ply * rx + plx * ry);
      if (ty < 0.15 || !(s.img.complete !== false && (s.img.naturalWidth || s.img.width))) return;
      const sh = ((H * 0.8) / ty) * s.sc, cx = (W / 2) * (1 + tx / ty), x0 = cx - sh / 2;
      const y0 = (H - sh) / 2 + ((H * 0.8) / ty) * s.lift;
      g.globalAlpha = Math.max(0.2, 1 - ty / 11);
      const iw = s.img.naturalWidth || s.img.width, ih = s.img.naturalHeight || s.img.height;
      for (let x = Math.max(0, (x0 | 0) & ~1); x < Math.min(W, x0 + sh); x += 2) {
        if (ty < T.zb[x]) g.drawImage(s.img, ((x - x0) / sh) * iw, 0, Math.max(1, (iw * 2) / sh), ih, x, y0, 2, sh);
      }
    });
    g.globalAlpha = 1;

    /* danger tint + hud */
    if (T.danger > 0) { g.fillStyle = `rgba(190,0,0,${T.danger * 0.28 * (0.7 + 0.3 * Math.sin(now / 90))})`; g.fillRect(0, 0, W, H); }
    g.textAlign = "center"; g.fillStyle = "#f0dcd7"; g.font = "700 15px system-ui,sans-serif";
    g.fillText("records " + T.got + " / " + REC, W / 2, 28);
    g.font = "600 12px system-ui,sans-serif"; g.fillStyle = "#c9a29b";
    g.fillText("W A S D / arrows to move, or hold + drag. he is hunting you.", W / 2, H - 16);
    const c = 5;
    g.fillStyle = "rgba(0,0,0,.45)"; g.fillRect(8, 8, N * c, N * c);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (G[y][x]) { g.fillStyle = "rgba(255,255,255,.2)"; g.fillRect(8 + x * c, 8 + y * c, c, c); }
    T.recs.forEach((r) => { if (!r.got) { g.fillStyle = "#e3a92c"; g.fillRect(8 + r.x * c - 1.5, 8 + r.y * c - 1.5, 3, 3); } });
    g.fillStyle = "#fff"; g.fillRect(8 + T.x * c - 2, 8 + T.y * c - 2, 4, 4);
    if (Math.hypot(T.e.x - T.x, T.e.y - T.y) < 5) { g.fillStyle = "#e0594f"; g.fillRect(8 + T.e.x * c - 2, 8 + T.e.y * c - 2, 4, 4); }

    requestAnimationFrame(loop3);
  }

  addEventListener("keydown", (e) => { if (T.on) { T.K[e.key.toLowerCase()] = true; if (e.key.startsWith("Arrow")) e.preventDefault(); } });
  addEventListener("keyup", (e) => { T.K[e.key.toLowerCase()] = false; });
  cv2.addEventListener("pointerdown", (e) => { if (T.on) { T.P.down = true; T.P.x = e.clientX; } });
  cv2.addEventListener("pointermove", (e) => { if (T.on && T.P.down) { T.a += (e.clientX - T.P.x) * 0.006; T.P.x = e.clientX; } });
  addEventListener("pointerup", () => { T.P.down = false; });
})();