---
id: generate-sql-python-helper
order: 6
status: approved
approved_by: <responsible unit>
approved_date: 2026-06-13
version: 1
---

# EN

## Title
Generate SQL / Python helper code

## Prompt template
Help me write [SQL / PYTHON] code.

Goal: [WHAT THE CODE SHOULD DO]
Inputs / data: [TABLES & COLUMNS, OR DATAFRAME SHAPE — DESCRIBE STRUCTURE, NOT REAL DATA]
Environment: [E.G. POSTGRESQL 15 / PYTHON 3.11 WITH PANDAS]
Constraints: [PERFORMANCE, STYLE, LIBRARIES ALLOWED OR NOT]

Rules:
- Return working, readable code with brief inline comments.
- Explain the approach in 2-3 sentences before the code.
- Note any assumptions you made.
- Point out edge cases (nulls, empty result, division by zero, time zones).
- Do not assume access to data you were not told about.

## Use case
Generate or debug small SQL queries and Python data-handling snippets — analysis,
transformations, quick automation — described in plain language.

## Required inputs
- Language (SQL or Python) and the environment/version.
- The goal of the code.
- The data structure (table/column or dataframe shape) — described, not pasted as real data.
- Any constraints (libraries, performance, style).

## Expected output
A short explanation of the approach, working and commented code, stated
assumptions, and noted edge cases.

## Example
Goal (SQL, PostgreSQL): monthly average of a rate column per counterparty for the
last 12 months. Structure: table `rates(counterparty_id, rate, obs_date)`. →
Explanation plus a `GROUP BY` query with date filtering and a note on null rates.

# SL

## Naslov
Ustvari pomožno kodo SQL / Python

## Predloga poziva
Pomagaj mi napisati kodo [SQL / PYTHON].

Cilj: [KAJ NAJ KODA NAREDI]
Vhodi / podatki: [TABELE IN STOLPCI ALI OBLIKA DATAFRAME — OPIŠI STRUKTURO, NE PRAVIH PODATKOV]
Okolje: [NPR. POSTGRESQL 15 / PYTHON 3.11 S PANDAS]
Omejitve: [ZMOGLJIVOST, SLOG, DOVOLJENE ALI PREPOVEDANE KNJIŽNICE]

Pravila:
- Vrni delujočo, berljivo kodo s kratkimi komentarji.
- Pred kodo v 2-3 stavkih pojasni pristop.
- Navedi morebitne predpostavke.
- Opozori na robne primere (vrednosti null, prazen rezultat, deljenje z nič, časovni pasovi).
- Ne predvidevaj dostopa do podatkov, o katerih ti nisem povedal.

## Namen uporabe
Ustvari ali odpravi napake v manjših poizvedbah SQL in odsekih kode Python za delo
s podatki — analiza, pretvorbe, hitra avtomatizacija — opisanih v naravnem jeziku.

## Zahtevani vhodni podatki
- Jezik (SQL ali Python) in okolje/različica.
- Cilj kode.
- Struktura podatkov (tabela/stolpec ali oblika dataframe) — opisana, ne prilepljena kot pravi podatki.
- Morebitne omejitve (knjižnice, zmogljivost, slog).

## Pričakovani rezultat
Kratka razlaga pristopa, delujoča in komentirana koda, navedene predpostavke ter
opozorila na robne primere.

## Primer
Cilj (SQL, PostgreSQL): mesečno povprečje stolpca z obrestno mero po nasprotni
stranki za zadnjih 12 mesecev. Struktura: tabela `rates(counterparty_id, rate,
obs_date)`. → Razlaga in poizvedba `GROUP BY` s filtrom datuma in opombo o null vrednostih.
