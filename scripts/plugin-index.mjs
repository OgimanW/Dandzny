// Vygeneruje .quartz/plugins/index.ts len z npm pluginov v quartz.config.yaml.
// Na GitHube nahrádza `quartz plugin install`, lebo žiadne Git pluginy nepoužívame.
import fs from "node:fs"
import path from "node:path"
import { builtinMessage } from "../quartz/cli/builtin-migration.js"
import { readPluginsJson, parseGitSource } from "../quartz/cli/plugin-data.js"
import { writePluginIndex } from "../quartz/cli/plugin-index.js"

const pluginsDir = path.join(process.cwd(), ".quartz", "plugins")
fs.mkdirSync(pluginsDir, { recursive: true })
const npmPackages = []
for (const entry of readPluginsJson()?.plugins ?? []) {
  if (builtinMessage(entry.source)) continue
  try {
    const parsed = parseGitSource(entry.source)
    if (parsed.npmPackage) npmPackages.push(parsed.name)
  } catch {}
}
writePluginIndex({ pluginsDir, npmPackages })
console.log(`plugin index: ${npmPackages.length} npm pluginov`)
