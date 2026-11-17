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

## Ako pridať novú vec

1. Skopíruj podobný súbor v tom istom priečinku (napr. `kampan/relikvie/vinuty-bic.md`).
2. Prepíš `title`, `description` a text. Pri relikvii aj `naboje` (zobrazí sa v tabuľke spolu s `description`).
3. Ulož. Zoznamy priečinkov a tabuľka relikvií sa doplnia samy.

## Značky v texte

- `> [!homebrew] Naše pravidlo` — oranžový box pre naše úpravy pravidiel.
- `<span class="neobjavene">???</span>` — ešte neobjavená vlastnosť.
- `[[nazov-suboru]]` alebo `[[nazov-suboru|text]]` — odkaz na inú stránku.

## Úpravy oproti Quartz

- `quartz/i18n/locales/sk-SK.ts` — slovenčina (Quartz ju nemal).
- `quartz/styles/custom.scss` — `[!homebrew]`, `???`, kompaktné tabuľky pre mobil, skryté dátumy a technické popisy.
- `quartz.ts` — zoznamy v kapitolách zoradené abecedne.
- `quartz.config.yaml` — názov, farby, fonty; vypnutá nefunkčná TTRPG téma a pluginy na mapy.
