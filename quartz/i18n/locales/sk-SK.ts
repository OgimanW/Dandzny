import { Translation } from "./definition"

const pocet = (count: number, jeden: string, dva: string, pat: string) =>
  count === 1 ? `1 ${jeden}` : count >= 2 && count <= 4 ? `${count} ${dva}` : `${count} ${pat}`

export default {
  propertyDefaults: {
    title: "Bez názvu",
    description: "Bez popisu",
  },
  components: {
    callout: {
      note: "Poznámka",
      abstract: "Zhrnutie",
      info: "Info",
      todo: "Treba doplniť",
      tip: "Tip",
      success: "Úspech",
      question: "Otázka",
      warning: "Pozor",
      failure: "Neúspech",
      danger: "Nebezpečenstvo",
      bug: "Chyba",
      example: "Príklad",
      quote: "Citát",
    },
    backlinks: {
      title: "Spomína sa na",
      noBacklinksFound: "Žiadne odkazy sem nevedú",
    },
    themeToggle: {
      lightMode: "Svetlý režim",
      darkMode: "Tmavý režim",
    },
    readerMode: {
      title: "Režim čítania",
    },
    explorer: {
      title: "Obsah príručky",
    },
    footer: {
      createdWith: "Vytvorené pomocou",
    },
    graph: {
      title: "Mapa súvislostí",
    },
    recentNotes: {
      title: "Najnovšie zmeny",
      seeRemainingMore: ({ remaining }) => `Zobraziť ďalších ${remaining} →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Vložené z ${targetSlug}`,
      linkToOriginal: "Odkaz na pôvodnú stránku",
    },
    search: {
      title: "Hľadať",
      searchBarPlaceholder: "Hľadaj pravidlo, kúzlo, predmet…",
    },
    tableOfContents: {
      title: "Na tejto stránke",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `${minutes} min čítania`,
    },
  },
  pages: {
    rss: {
      recentNotes: "Najnovšie zmeny",
      lastFewNotes: ({ count }) => `Posledné zmeny (${count})`,
    },
    error: {
      title: "Nenájdené",
      notFound: "Táto stránka neexistuje alebo ešte nebola objavená.",
      home: "Späť na úvod",
    },
    folderContent: {
      folder: "Kapitola",
      itemsUnderFolder: ({ count }) => pocet(count, "položka", "položky", "položiek"),
    },
    tagContent: {
      tag: "Štítok",
      tagIndex: "Všetky štítky",
      itemsUnderTag: ({ count }) => pocet(count, "položka", "položky", "položiek"),
      showingFirst: ({ count }) => `Zobrazených prvých ${count} štítkov.`,
      totalTags: ({ count }) => `Spolu ${count} štítkov.`,
    },
  },
} as const satisfies Translation
