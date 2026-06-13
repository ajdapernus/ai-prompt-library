---
id: extract-action-items
order: 9
status: approved
approved_by: <responsible unit>
approved_date: 2026-06-13
version: 1
---

# EN

## Title
Extract action items

## Prompt template
Extract the action items from the text below (meeting notes, email thread or minutes).

For each action item, give:
- Action: what needs to be done.
- Owner: who is responsible (use the name/role stated; "unassigned" if none).
- Due date: the deadline stated, or "not specified".
- Source: a short quote or reference to where it came from.

Rules:
- Include only concrete actions, not general discussion.
- Do not invent owners or deadlines that are not in the text.
- List anything that looks like an action but is missing an owner or date under
  "Needs clarification".
- Present the result as a table.

Text:
[PASTE THE NOTES / THREAD / MINUTES HERE]

## Use case
Pull a clean, structured list of action items — with owners and deadlines — out of
messy meeting notes, minutes or an email thread.

## Required inputs
- The source text (meeting notes, minutes or email thread).

## Expected output
A table of action items (action, owner, due date, source), plus a "Needs
clarification" list for actions missing an owner or deadline — nothing invented.

## Example
Text: notes from a project meeting. → A table with five actions, owners and dates
where stated, and two items flagged under "Needs clarification" because no owner
was named.

# SL

## Naslov
Izlušči naloge

## Predloga poziva
Iz spodnjega besedila izlušči naloge (zapiski sestanka, e-poštna nit ali zapisnik).

Za vsako nalogo navedi:
- Naloga: kaj je treba narediti.
- Nosilec: kdo je odgovoren (uporabi navedeno ime/vlogo; "nedodeljeno", če ni navedeno).
- Rok: naveden rok ali "ni naveden".
- Vir: kratek navedek ali sklic, od kod izhaja.

Pravila:
- Vključi le konkretne naloge, ne splošne razprave.
- Ne izmišljaj si nosilcev ali rokov, ki jih v besedilu ni.
- Vse, kar je videti kot naloga, a brez nosilca ali roka, navedi pod "Potrebno pojasnilo".
- Rezultat prikaži kot tabelo.

Besedilo:
[SEM PRILEPI ZAPISKE / NIT / ZAPISNIK]

## Namen uporabe
Iz neurejenih zapiskov sestanka, zapisnika ali e-poštne niti izlušči pregleden,
strukturiran seznam nalog — z nosilci in roki.

## Zahtevani vhodni podatki
- Izvorno besedilo (zapiski sestanka, zapisnik ali e-poštna nit).

## Pričakovani rezultat
Tabela nalog (naloga, nosilec, rok, vir) ter seznam "Potrebno pojasnilo" za naloge
brez nosilca ali roka — brez izmišljevanja.

## Primer
Besedilo: zapiski s projektnega sestanka. → Tabela s petimi nalogami, nosilci in
datumi, kjer so navedeni, ter dve postavki pod "Potrebno pojasnilo", ker nosilec ni naveden.
