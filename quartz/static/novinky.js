/* Dandžny – štítok „nové" pri veciach zo stránky Novinky (novinky.md, píše ju správca).
   Zoznam berie z contentIndex.json (odkazy stránky „novinky"), ktorý Quartz už načítava. */
;(function () {
  if (window.__dandznyNove) return
  window.__dandznyNove = true

  const style = document.createElement("style")
  style.textContent = `
  .nove-badge { display: inline-block; font: 600 .7rem/1.5 var(--bodyFont, system-ui, sans-serif); letter-spacing: .03em;
    text-transform: uppercase; color: var(--light, #fbf8f1); background: var(--tertiary, #5f7f5a); border-radius: 999px;
    padding: 0 .5em; margin-left: .4em; vertical-align: .2em; white-space: nowrap; }
  h1 .nove-badge { font-size: .8rem; vertical-align: .5em; }`
  // SPA navigácia v Quartzi vymieňa <head>; data-persist ho tam nechá, onPage ho prípadne vráti
  style.setAttribute("data-persist", "true")
  document.head.appendChild(style)

  const badge = () => {
    const b = document.createElement("span")
    b.className = "nove-badge"
    b.textContent = "nové"
    return b
  }

  async function mark() {
    if (!style.isConnected) document.head.appendChild(style)
    if (typeof fetchData === "undefined") return
    let idx
    try { idx = await fetchData } catch { return }
    const nov = idx && idx["novinky"]
    if (!nov || !nov.links || !nov.links.length) return
    const fresh = new Set(nov.links)
    const slug = document.body.dataset.slug
    if (slug !== "novinky" && fresh.has(slug)) {
      const h = document.querySelector("h1.article-title")
      if (h && !h.querySelector(".nove-badge")) h.append(badge())
    }
    if (slug === "novinky") return
    // odkazy z tabuliek a zoznamov nemajú data-slug: porovnaj koniec adresy
    const slugOf = (a) => {
      if (a.dataset.slug) return a.dataset.slug
      const path = decodeURIComponent(new URL(a.getAttribute("href"), location.href).pathname).replace(/\.html$/, "")
      for (const s of fresh) if (path === "/" + s || path.endsWith("/" + s)) return s
      return null
    }
    document.querySelectorAll("article a.internal, .page-listing a.internal").forEach((a) => {
      if (a.closest(".transclude, .popover") || a.getAttribute("role") === "anchor") return
      if (!fresh.has(slugOf(a))) return
      if (a.nextElementSibling && a.nextElementSibling.classList.contains("nove-badge")) return
      a.after(badge())
    })
  }

  document.addEventListener("nav", mark)
  if (document.readyState !== "loading") mark()
})()
