# Dandžny — príručka hráča

Statická stránka pre hráčov, postavená na [Quartz 5](https://quartz.jzhao.xyz). Obsah sú obyčajné markdown súbory v `content/`, dajú sa otvárať aj v Obsidiane.

## Spustenie náhľadu

```bash
npx quartz build --serve
```

Stránka beží na http://localhost:8080 a pri každom uložení súboru sa obnoví.

## Zverejnenie

Po `git push` na vetvu `main` GitHub Action (`.github/workflows/deploy.yml`) stránku zostaví a zverejní na GitHub Pages, trvá to 1–2 minúty. Stav vidno v záložke **Actions** na GitHube.

Stránka je verejná pre každého s odkazom, vyhľadávače ju neindexujú (`noindex`). Do `content/` nedávaj nič, čo nemajú vidieť hráči.

## Štruktúra obsahu

```
content/
├── index.md              úvod
├── tahak.md              pravidlá na jednej strane
├── pravidla/             boj, reakcie, zranenie, inventár, vzdialenosti
├── magia/                porovnanie systémov + 4 systémy
│   └── slova-moci/       1 slovo = 1 súbor
├── obchody/              bežný obchod, ARCANUM, alchymistické potreby, kováčstvo, dojo
├── alchymia-priser.md    pravidlá alchýmie (odkaz na recepty hore)
└── kampan/               relikvie/, recepty/, duchovia/, bohovia/, bytosti/, reputácia, zručnosti
```

## Správca (admin)

Na **/admin/** (napr. `https://ogimanw.github.io/Dandzny/admin/`) je rozhranie, kde máš všetko pokope a prepínačom určuješ, čo hráči vidia.

- **Knižnica** = súkromné repo `Dandzny-gm`: všetky veci vrátane tých, ktoré hráči ešte nenašli. Štruktúra je rovnaká ako `content/`.
- **Stránka hráčov** = `content/` v tomto repe: len to, čo je zverejnené.
- Prepínač pri veci → **Zverejniť**: vec sa skopíruje do `content/` (alebo zmaže), stránka sa prestaví za 1–2 minúty.
- Odkaz `[[...]]` na skrytú stránku sa na webe zobrazí ako obyčajný text a položka zoznamu, ktorá je len takýmto odkazom, sa vynechá (napr. úvodný zoznam kapitol). Správca pri skrytej veci ukáže, ktoré stránky na ňu odkazujú.
- ★ = pripravené na session. Pred hrou si hviezdičkou označ, čo môžu nájsť, počas hry stačí filter **★ Na session** a prepínač.
- **+ Nová vec** vytvorí súbor z formulára (skrytý, kým ho nezverejníš). ✎ upraví celý súbor; ak je vec zverejnená, zmena ide aj na stránku.

Prvé spustenie: vytvor súkromné repo `Dandzny-gm` a fine-grained token (Contents: Read and write na obe repá, Actions: Read-only). Token sa uloží len v tvojom prehliadači. Bez GitHubu si to vieš pozrieť na `/admin/?demo`.

Kód je v `admin/index.html` (jeden súbor, bez buildu), na stránku ho kopíruje workflow.

## Ako pridať novú vec ručne

1. Skopíruj podobný súbor v tom istom priečinku (napr. `kampan/relikvie/vinuty-bic.md`).
2. Prepíš `title`, `description` a text. Pri relikvii aj `naboje` (zobrazí sa v tabuľke spolu s `description`).
3. Ulož. Zoznamy priečinkov a tabuľka relikvií sa doplnia samy.

## Značky v texte

- `<span class="neobjavene">???</span>` — ešte neobjavená vlastnosť.
- `[[nazov-suboru]]` alebo `[[nazov-suboru|text]]` — odkaz na inú stránku.

## Úpravy oproti Quartz

- `quartz/i18n/locales/sk-SK.ts` — slovenčina (Quartz ju nemal).
- `quartz/styles/custom.scss` — `[!homebrew]`, `???`, kompaktné tabuľky pre mobil, skryté dátumy a technické popisy.
- `quartz/plugins/builtins/links.ts` + `disableBrokenWikilinks` v `quartz.config.yaml` — odkazy na nezverejnené stránky ako text.
- `quartz.ts` — zoznamy v kapitolách zoradené abecedne.
- `quartz.config.yaml` — názov, farby, fonty; vypnutá nefunkčná TTRPG téma a pluginy na mapy.
