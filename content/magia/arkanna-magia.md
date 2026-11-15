---
title: Arkánna mágia
description: Sprievodca hráča. Mágia na Magic Dice z magického vybavenia.
tags: [oficialne, homebrew]
---

> [!example] Kúzla
> **[[magia/slova-moci/index|Slová moci]]** · vybavenie kúpiš v [[arcanum|ARCANE]]

## Základy čarovania
Kúzla vyžadujú **Magic Dice (MD, d6)**. MD získavaš **výhradne z magického vybavenia**: prútikov, palíc a podobne. Počet MD určuje silu kúzla. MD sa použitím nestrácajú; jediné riziko čarovania je **Arcane Feedback**.

## Postup čarovania
1. Investuj ľubovoľný počet MD, najviac toľko, koľko ti dáva vybavenie.
2. Hoď investovanými MD. Za každú **4–6** získaš **1 Únavu**. Za každú **6** môžeš hodiť 1 extra MD (aj nad limit vybavenia). Celkový počet hodených MD **nikdy nesmie presiahnuť 4**.
3. Prezri si výsledky: rovnaké hodnoty na viacerých kockách = Arcane Feedback. Potom uplatni efekt kúzla.

## Arcane Feedback
Ak sa medzi hodmi objavia **rovnaké hodnoty**, súčet kociek so zdvojenou hodnotou sa odpočíta najprv z HP, potom z WIL ako poškodenie.
- Príklad: hod 4-3-3 → poškodenie 6 (3+3).
- Ak je poškodenie väčšie ako 6, má vlastnosť **Blast** a zasiahne každého v Blízkosti.

> [!warning] Feedback prichádza až potom
> Arcane Feedback nastáva **až po tom**, čo kúzlo zaberie.

## Typy kúziel

### 1. Tvarovanie energie (poškodzujúce kúzla)
Za 1 MD vyčaruješ základnú magickú strelu. Za každý extra MD si vyber jedno vylepšenie:

| Sila kúzla | 1 MD | +1 MD | +2 MD | +3 MD |
| --- | --- | --- | --- | --- |
| Poškodenie | 1d6 | 2d6 | 3d6 | 4d6 |
| Dosah | Blízko | Ďaleko | Vzdialene | — |
| Rýchlosť | celé kolo | rýchle kolo | — | — |
| Ciele | 1 | 2 | Blast | — |
| Živel | žiadny | 1 (oheň, ľad…) | — | — |
| Typ poškodenia | zranenie (STR) | omráčenie (DEX), pomätenie (WIL) | — | — |

> [!example] Príklad
> Harvald investuje 3 MD a hodí 3, 4, 6. Šestka mu umožní hodiť extra MD, hodí 4. Zo štyroch kociek vyberie 6 a 4 na poškodenie (10), 4 na vylepšenie dosahu (Blízko → Ďaleko) a 3 na rýchle kolo. Kúzlo robí 10 poškodenia na Ďaleko a je rýchle. Vedľajší efekt: 3 Únava (za 4, 4, 6) a 8 poškodenia z Arcane Feedback (dve štvorky).

> [!note] Výnimka z pravidla o najvyššom hode
> Pri Tvarovaní energie sa **sčítavajú všetky** hody poškodenia, nie len najvyšší. 4 MD znamenajú ~72 % šancu na Arcane Feedback, ~93 % šancu aspoň na 1 Únavu a potrebu 4 voľných slotov.

### 2. Triky (nepriame kúzla)
Nikdy nespôsobujú priame poškodenie, sú vždy **rýchle** a dosah je maximálne **Blízko**. Môžeš nimi omráčiť, odzbrojiť, zraziť, odtlačiť…
- 1 MD: základ triku.
- +1 MD za **Obťažnosť**: zníž atribút cieľa pre save o 2.
- +1 MD za **Cieľ**: trik zasiahne ďalšieho nepriateľa v Blízkosti hlavného cieľa.

Warden určí vhodný save cieľa (STR, DEX alebo WIL).

> [!example] Príklad
> Maltas investuje 2 MD (hod 3, 5): 1 MD na trik, 1 MD na obťažnosť. Ork musí hodiť pod STR 14, ale kvôli obťažnosti sa počíta len STR 12. Maltas získa 1 Únavu (za 5).

### 3. Protiúder (obrana proti mágii)
Čarovanie sa vyhlasuje na začiatku kola, takže môžeš nepriateľovi kúzlo zrušiť.
- Pokúsiť sa môže ktokoľvek s dostupnými MD, ale nie ak sám v tom kole čaruje.
- Investuješ a hodíš MD podľa rovnakých pravidiel (Únava, Feedback).
- **Tvoj súčet ≥ nepriateľov** → kúzla sa vzájomne zrušia. Inak nepriateľovo kúzlo zaúčinkuje normálne.

### 4. Praktická mágia (ostatné efekty)
Čokoľvek, čo nie je priame ani nepriame poškodenie, sa improvizuje podľa počtu MD:

| MD | Rozsah efektu |
| --- | --- |
| 1 | malý osobný efekt, dá sa dosiahnuť aj nástrojmi (zapálenie fakle, lano z viniča) |
| 2 | úroveň miestnosti alebo interakcie s inou osobou (silová stena, dýchanie pod vodou, telepatická správa) |
| 3 | veľké „nemožné" efekty, porušujú prírodné zákony (oživenie mŕtvych, teleportácia) |
| 4 | mýtické, mimoriadne nebezpečné zmeny samotnej reality |

> [!example] Príklad
> Maltas chce osvetliť okolie. 1 MD = svietiaci hrot palice. 2 MD = vznášajúci sa svetelný orb. 3 MD = mrak spektrálnych svätojánskych mušiek. 4 MD = guľa svetla so silou slnka.

Na presne definované kúzla slúžia [[magia/slova-moci/index|Slová moci]].

## Arkánne vybavenie a Power
Magické predmety dávajú MD a majú **Power**, ktorá chráni pred poškodením z Arcane Feedback alebo nepriateľských kúziel.

| Predmet | MD bonus | Power |
| --- | --- | --- |
| Drobnosti | — | 1–6 |
| Malé predmety | +1 MD | 1–3 |
| Veľké predmety | **+2 MD** | 4–6 |
| Oblečenie | +1 MD | — |
| Klobúky | +1 MD | — |

> [!homebrew] Naše pravidlo
> Veľké predmety (palice, veľké knihy) dávajú **+2 MD**.

### Ako funguje Power
- **Arcane Feedback:** míňaš Power 1:1 za každú zrušenú kocku so zdvojenou hodnotou.
- **Nepriateľovo kúzlo:** po oznámení počtu MD (ale pred hodom) môžeš míňať Power na zrušenie kociek.
- Predmet bez Power (**prasknutý**) nedáva MD, kým sa neopraví.
- **Oprava:** 1 Power za deň, vyžaduje suroviny alebo peniaze. Ceny opravy sú v [[arcanum|ARCANE]].

> [!example] Príklad
> Harvald má Klobúk (+1 MD) a Palicu (+2 MD, Power 3) a hodí 3, 5, 5. Môže minúť 2 Power na zrušenie oboch pätiek a vyhnúť sa 10 poškodeniu z Arcane Feedback. Alebo keď nepriateľ čaruje 3 MD, môže minúť 3 Power a celé kúzlo zrušiť (palica sa rozlomí).

> [!tip] Buď kreatívny
> Opíš, čo chceš dosiahnuť, a Warden určí počet MD.
