/* Dandžny – hádzanie kockami.
   - Plávajúce tlačidlo 🎲 vpravo dole: rýchle kocky, vlastný hod (napr. 2d6+1), záchrana d20, história.
   - Hody v texte stránky (d6+1, 1d8, 2d6…) sa dajú ťuknutím hodiť.
   Používa ho stránka hráčov (vkladá ho quartz/plugins/index.ts) aj správca (admin/index.html).
   Každý vidí len svoje hody; história je uložená v tomto prehliadači. */
;(function () {
  if (window.__dandznyDice) return
  window.__dandznyDice = true

  const HISTORY_KEY = "dandzny-dice-history"
  // hod v texte: d6, 2d6, d6+1, 1d8 + 2, 3d6−1 (nie uprostred slova)
  const INLINE = /(?<![\p{L}\p{N}])(\d{0,2}[dk](?:4|6|8|10|12|20|100|%)(?:\s*[+\-−]\s*\d{1,3}(?![\p{L}\p{N}]))?)(?![\p{L}\p{N}])/giu

  // ---------- náhoda a výpočet ----------
  function rnd(sides) {
    const buf = new Uint32Array(1)
    const limit = Math.floor(0x100000000 / sides) * sides
    let x
    do {
      crypto.getRandomValues(buf)
      x = buf[0]
    } while (x >= limit)
    return (x % sides) + 1
  }

  // "2d6+1d4-1" → { total, parts: [{n, sides, rolls}], mod, text }
  function roll(expr) {
    const clean = String(expr).toLowerCase().replace(/−/g, "-").replace(/\s+/g, "")
    if (!clean || !/^[+\-]?(\d*[dk](\d+|%)|\d+)([+\-](\d*[dk](\d+|%)|\d+))*$/.test(clean)) return null
    const terms = clean.match(/[+\-]?[^+\-]+/g)
    let total = 0, mod = 0, dice = 0
    const parts = []
    for (const t of terms) {
      const sign = t.startsWith("-") ? -1 : 1
      const body = t.replace(/^[+\-]/, "")
      const m = /^(\d*)[dk](\d+|%)$/.exec(body)
      if (m) {
        const n = Math.min(parseInt(m[1] || "1", 10), 100)
        const sides = m[2] === "%" ? 100 : parseInt(m[2], 10)
        if (!n || sides < 2 || sides > 1000) return null
        dice += n
        const rolls = Array.from({ length: n }, () => rnd(sides))
        total += sign * rolls.reduce((a, b) => a + b, 0)
        parts.push({ sign, n, sides, rolls })
      } else {
        mod += sign * parseInt(body, 10)
        total += sign * parseInt(body, 10)
      }
    }
    if (!dice) return null
    return { expr: clean.replace(/k/g, "d"), total, parts, mod }
  }

  // ---------- štýly ----------
  const css = `
  .dd-fab { position: fixed; right: 16px; bottom: 16px; z-index: 900; width: 52px; height: 52px; border-radius: 50%;
    border: 1px solid var(--lightgray, #e6dfd0); background: var(--secondary, #8a5a1f); color: var(--light, #fbf8f1);
    font-size: 26px; line-height: 1; cursor: pointer; box-shadow: 0 2px 10px #0004; display: grid; place-items: center; }
  .dd-fab:hover { filter: brightness(1.08); }
  .dd-panel { position: fixed; right: 16px; bottom: 80px; z-index: 901; width: min(340px, calc(100vw - 32px));
    max-height: calc(100vh - 110px); overflow: auto; background: var(--light, #fbf8f1); color: var(--dark, #2a241c);
    border: 1px solid var(--lightgray, #e6dfd0); border-radius: 12px; box-shadow: 0 6px 24px #0005; padding: 14px;
    font: 15px/1.4 var(--bodyFont, "Source Sans 3", system-ui, sans-serif); display: none; }
  .dd-panel.open { display: block; }
  .dd-panel h3 { margin: 0 0 10px; font-size: 1.15rem; display: flex; justify-content: space-between; align-items: center; }
  .dd-row { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
  .dd-btn { border: 1px solid var(--lightgray, #e6dfd0); background: var(--highlight, #8f9fa926); color: inherit; border-radius: 8px;
    padding: 6px 0; min-width: 0; flex: 1 1 0; font: inherit; font-weight: 600; cursor: pointer; }
  .dd-btn:hover { border-color: var(--secondary, #8a5a1f); }
  .dd-btn.primary { background: var(--secondary, #8a5a1f); color: var(--light, #fbf8f1); border-color: transparent; flex: 0 0 auto; padding: 6px 14px; }
  .dd-input { flex: 1 1 auto; min-width: 0; border: 1px solid var(--lightgray, #e6dfd0); border-radius: 8px; padding: 6px 10px;
    background: transparent; color: inherit; font: inherit; }
  .dd-label { font-size: .8rem; color: var(--gray, #8a7f6a); margin: 2px 0 4px; font-weight: 600; text-transform: uppercase; letter-spacing: .04em; }
  .dd-last { text-align: center; padding: 8px 0 12px; }
  .dd-last .dd-total { font-size: 2.6rem; font-weight: 700; line-height: 1.1; color: var(--secondary, #8a5a1f); }
  .dd-last .dd-detail { font-size: .85rem; color: var(--gray, #8a7f6a); }
  .dd-ok { color: #4f7d4a; } .dd-fail { color: #a03a46; }
  .dd-hist { list-style: none; margin: 0; padding: 0; font-size: .88rem; }
  .dd-hist li { display: flex; justify-content: space-between; gap: 8px; padding: 4px 0; border-top: 1px solid var(--lightgray, #e6dfd0); }
  .dd-hist li span:first-child { color: var(--gray, #8a7f6a); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .dd-hist li b { font-variant-numeric: tabular-nums; }
  .dd-clear { border: 0; background: none; color: var(--gray, #8a7f6a); cursor: pointer; font: inherit; font-size: .8rem; text-decoration: underline; }
  .dd-close { border: 0; background: none; color: var(--gray, #8a7f6a); cursor: pointer; font-size: 1.3rem; line-height: 1; }
  button.dd-inline { all: unset; cursor: pointer; border-bottom: 1px dashed currentColor; white-space: nowrap; }
  button.dd-inline::after { content: "🎲"; font-size: .75em; margin-left: 2px; opacity: .55; }
  button.dd-inline:hover { color: var(--secondary, #8a5a1f); }
  button.dd-inline:focus-visible { outline: 2px solid var(--secondary, #8a5a1f); outline-offset: 2px; }
  .dd-toast { position: fixed; left: 50%; bottom: 84px; transform: translateX(-50%); z-index: 902; background: var(--dark, #2a241c);
    color: var(--light, #fbf8f1); border-radius: 10px; padding: 8px 16px; box-shadow: 0 4px 16px #0005; font: 15px/1.35 var(--bodyFont, system-ui, sans-serif);
    text-align: center; pointer-events: none; opacity: 0; transition: opacity .15s; max-width: calc(100vw - 32px); }
  .dd-toast.show { opacity: 1; }
  .dd-toast b { font-size: 1.5rem; margin-left: 6px; }
  @media print { .dd-fab, .dd-panel, .dd-toast { display: none !important; } }
  `
  const style = document.createElement("style")
  style.textContent = css
  document.head.appendChild(style)

  // ---------- história ----------
  function loadHistory() {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [] } catch { return [] }
  }
  function saveHistory(h) {
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(h.slice(0, 30))) } catch {}
  }
  let history = loadHistory()

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c])
  function detail(r) {
    const dice = r.parts.map((p, i) => {
      const s = (p.sign < 0 ? "− " : i ? "+ " : "")
      const rolls = p.rolls.map((v) => (v === p.sides ? `<b>${v}</b>` : v === 1 && p.sides >= 6 ? `<u>${v}</u>` : v)).join(", ")
      return `${s}${p.n}d${p.sides} [${rolls}]`
    }).join(" ")
    const mod = r.mod ? ` ${r.mod > 0 ? "+" : "−"} ${Math.abs(r.mod)}` : ""
    return dice + mod
  }

  // ---------- panel ----------
  const fab = document.createElement("button")
  fab.className = "dd-fab"
  fab.type = "button"
  fab.title = "Hodiť kockou"
  fab.setAttribute("aria-label", "Hodiť kockou")
  fab.textContent = "🎲"

  const panel = document.createElement("div")
  panel.className = "dd-panel"
  panel.setAttribute("role", "dialog")
  panel.setAttribute("aria-label", "Kocky")
  panel.innerHTML = `
    <h3>Kocky <button class="dd-close" type="button" aria-label="Zavrieť">×</button></h3>
    <div class="dd-last" aria-live="polite"><div class="dd-total">–</div><div class="dd-detail">ťukni na kocku</div></div>
    <div class="dd-row">${[4, 6, 8, 10, 12, 20, 100].map((s) => `<button class="dd-btn" type="button" data-roll="d${s}">d${s}</button>`).join("")}</div>
    <div class="dd-label">Vlastný hod</div>
    <form class="dd-row dd-custom"><input class="dd-input" name="expr" placeholder="napr. 2d6+1" autocomplete="off" inputmode="text"><button class="dd-btn primary">Hodiť</button></form>
    <div class="dd-label">Záchrana (d20 ≤ vlastnosť)</div>
    <form class="dd-row dd-save"><input class="dd-input" name="attr" type="number" min="1" max="30" placeholder="STR / DEX / WIL" inputmode="numeric"><button class="dd-btn primary">Hodiť</button></form>
    <div class="dd-label" style="display:flex;justify-content:space-between"><span>História</span><button class="dd-clear" type="button">vymazať</button></div>
    <ul class="dd-hist"></ul>`
  const toast = document.createElement("div")
  toast.className = "dd-toast"
  toast.setAttribute("aria-live", "polite")

  function mount() {
    if (!document.body.contains(fab)) document.body.append(fab, panel, toast)
  }

  const $ = (s) => panel.querySelector(s)
  function renderHistory() {
    $(".dd-hist").innerHTML = history.length
      ? history.map((h) => `<li><span title="${esc(h.d)}">${esc(h.l)}</span><b>${esc(h.t)}</b></li>`).join("")
      : `<li><span>zatiaľ nič</span></li>`
  }
  function show(total, label, det, cls) {
    $(".dd-total").innerHTML = `<span class="${cls || ""}">${esc(total)}</span>`
    $(".dd-detail").innerHTML = `${esc(label)}: ${det}`
    history.unshift({ l: label, t: String(total), d: det.replace(/<[^>]+>/g, "") })
    saveHistory(history)
    renderHistory()
  }
  let toastTimer
  function flash(html) {
    toast.innerHTML = html
    toast.classList.add("show")
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3200)
  }

  function doRoll(expr, label, quiet) {
    const r = roll(expr)
    if (!r) {
      flash("Tomu nerozumiem. Skús napr. <b style='font-size:1rem'>2d6+1</b>")
      return
    }
    const det = detail(r)
    show(r.total, label || r.expr, det)
    if (quiet) flash(`${esc(label || r.expr)} <b>${r.total}</b><br><small>${det}</small>`)
  }

  fab.onclick = () => {
    panel.classList.toggle("open")
    if (panel.classList.contains("open")) renderHistory()
  }
  $(".dd-close").onclick = () => panel.classList.remove("open")
  panel.querySelectorAll("[data-roll]").forEach((b) => (b.onclick = () => doRoll(b.dataset.roll)))
  $(".dd-custom").onsubmit = (e) => {
    e.preventDefault()
    doRoll(e.target.expr.value)
  }
  $(".dd-save").onsubmit = (e) => {
    e.preventDefault()
    const attr = parseInt(e.target.attr.value, 10)
    if (!attr) return e.target.attr.focus()
    const v = rnd(20)
    const ok = v <= attr
    show(v, `záchrana proti ${attr}`, `d20 [${v}] → <span class="${ok ? "dd-ok" : "dd-fail"}">${ok ? "uspel" : "neuspel"}</span>`, ok ? "dd-ok" : "dd-fail")
  }
  $(".dd-clear").onclick = () => {
    history = []
    saveHistory(history)
    renderHistory()
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") panel.classList.remove("open")
  })

  // ---------- hody v texte ----------
  function linkify(root) {
    if (!root) return
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        if (!INLINE.test(n.nodeValue)) return NodeFilter.FILTER_REJECT
        INLINE.lastIndex = 0
        const p = n.parentElement
        if (!p || p.closest("a, button, code, pre, script, style, textarea, input, .dd-panel, .katex, h1, h2")) return NodeFilter.FILTER_REJECT
        return NodeFilter.FILTER_ACCEPT
      },
    })
    const nodes = []
    while (walker.nextNode()) nodes.push(walker.currentNode)
    for (const n of nodes) {
      const text = n.nodeValue
      const frag = document.createDocumentFragment()
      let last = 0
      INLINE.lastIndex = 0
      for (const m of text.matchAll(INLINE)) {
        if (!roll(m[1])) continue
        frag.append(text.slice(last, m.index))
        const b = document.createElement("button")
        b.type = "button"
        b.className = "dd-inline"
        b.dataset.dice = m[1]
        b.title = `Hodiť ${m[1]}`
        b.textContent = m[1]
        frag.append(b)
        last = m.index + m[0].length
      }
      if (!last) continue
      frag.append(text.slice(last))
      n.replaceWith(frag)
    }
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest?.("button.dd-inline")
    if (!b) return
    e.preventDefault()
    // názov veci (nadpis stránky) ako popis hodu
    const title = document.querySelector("article h1, .article-title")?.textContent?.trim()
    doRoll(b.dataset.dice, title ? `${title}: ${b.dataset.dice}` : b.dataset.dice, true)
  })

  function onPage() {
    mount()
    document.querySelectorAll("article, [data-dice-scope]").forEach(linkify)
  }
  // Quartz pri každej (aj SPA) navigácii vyšle „nav"; inde stačí načítanie stránky
  document.addEventListener("nav", onPage)
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", onPage)
  else onPage()

  window.DandznyDice = { roll, linkify }
})()
