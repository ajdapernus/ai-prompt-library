---
id: translate-check-translation
order: 5
status: approved
approved_by: <responsible unit>
approved_date: 2026-06-13
version: 1
---

# EN

## Title
Translate / check translation

## Prompt template
Task: [TRANSLATE / CHECK AN EXISTING TRANSLATION]
Source language: [E.G. SLOVENIAN]
Target language: [E.G. ENGLISH]
Register: [FORMAL / OFFICIAL / NEUTRAL]
Domain: central banking and finance.

Rules:
- Use correct central-banking and financial terminology in the target language.
- Preserve meaning, numbers and defined terms exactly; do not paraphrase away nuance.
- Keep formatting (headings, lists) intact.
- If checking a translation: list the corrections with the original, the proposed
  fix, and a one-line reason. Do not silently rewrite the whole text.

Text:
[PASTE THE SOURCE TEXT — OR THE SOURCE + EXISTING TRANSLATION TO CHECK]

## Use case
Translate financial/official text between Slovenian and English, or review an
existing translation for accuracy and correct terminology.

## Required inputs
- Whether you want a translation or a check of an existing one.
- Source and target language, and the register.
- The source text (and the existing translation, if checking).

## Expected output
For translation: a faithful translation with correct domain terminology and
preserved formatting. For checking: a list of corrections, each with original,
fix, and reason.

## Example
Task: check. SL→EN. Text: a press release plus its draft English translation. →
A list flagging "monetary base" mistranslated, an inconsistent term, and a number
formatting issue, each with the suggested fix.

# SL

## Naslov
Prevedi / preveri prevod

## Predloga poziva
Naloga: [PREVEDI / PREVERI OBSTOJEČI PREVOD]
Izvorni jezik: [NPR. SLOVENŠČINA]
Ciljni jezik: [NPR. ANGLEŠČINA]
Register: [FORMALEN / URADEN / NEVTRALEN]
Področje: centralno bančništvo in finance.

Pravila:
- Uporabljaj pravilno centralnobančno in finančno terminologijo v ciljnem jeziku.
- Natančno ohrani pomen, številke in opredeljene pojme; ne izgubi odtenkov s preubeseditvijo.
- Ohrani oblikovanje (naslove, sezname).
- Pri preverjanju prevoda: naštej popravke z izvirnikom, predlogom in enovrstičnim
  pojasnilom. Ne prepisuj tiho celotnega besedila.

Besedilo:
[PRILEPI IZVORNO BESEDILO — ALI IZVIRNIK + OBSTOJEČI PREVOD ZA PREVERJANJE]

## Namen uporabe
Prevedi finančno/uradno besedilo med slovenščino in angleščino ali preglej obstoječi
prevod glede točnosti in pravilne terminologije.

## Zahtevani vhodni podatki
- Ali želite prevod ali preverjanje obstoječega.
- Izvorni in ciljni jezik ter register.
- Izvorno besedilo (in obstoječi prevod, če preverjate).

## Pričakovani rezultat
Za prevod: zvest prevod s pravilno strokovno terminologijo in ohranjenim
oblikovanjem. Za preverjanje: seznam popravkov, vsak z izvirnikom, popravkom in
pojasnilom.

## Primer
Naloga: preverjanje. SL→EN. Besedilo: sporočilo za javnost in njegov osnutek
angleškega prevoda. → Seznam, ki opozarja na napačno preveden "monetary base",
nedosleden izraz in napako pri zapisu številke, vsak s predlogom popravka.
