# Dandžny — príručka hráča (prototyp)

Statická stránka pre hráčov, postavená na [Quartz 5](https://quartz.jzhao.xyz). Obsah sú obyčajné markdown súbory v `quartz-site/content/`, dajú sa otvárať aj v Obsidiane.

## Spustenie náhľadu

```bash
cd quartz-site
npx quartz build --serve
```

Stránka beží na http://localhost:8080 a pri každom uložení súboru sa obnoví.

## Štruktúra obsahu

```
content/
├── index.md              úvod
├── tahak.md              pravidlá na jednej strane
├── pravidla/             boj, reakcie, zranenie, inventár, vzdialenosti
├── magia/                porovnanie systémov + 4 systémy
│   └── slova-moci/       1 slovo = 1 súbor
├── leopoldovo/           obchody a služby
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
