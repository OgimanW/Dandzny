import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"

// Zoznamy v kapitolách: najprv podkapitoly, potom stránky, obe abecedne podľa názvu (nie podľa dátumu).
type Stranka = { slug?: string; frontmatter?: { title?: string } }
const jeKapitola = (f: Stranka) => (f.slug ?? "").endsWith("/index")
const nazov = (f: Stranka) => (f.frontmatter?.title ?? f.slug ?? "").replace(/^[^\p{L}\p{N}]+/u, "")

ExternalPlugin.FolderPage({
  sort: (a: Stranka, b: Stranka) => {
    if (jeKapitola(a) !== jeKapitola(b)) return jeKapitola(a) ? -1 : 1
    return nazov(a).localeCompare(nazov(b), "sk", { numeric: true })
  },
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
