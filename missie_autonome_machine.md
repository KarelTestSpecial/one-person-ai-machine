# MISSIE-BRIEFING: De Autonome Machine (24/7 Loop)
**Status**: Klaar voor Implementatie
**Doel**: Het bouwen van een 24/7 cyclus die leads vindt, briefingen schrijft en kwaliteit controleert zonder constante menselijke supervisie.

---

## 1. De Architectuur (Scherper Gedefinieerd)

### A. Watchtower (Lead Scraper)
- **Strategie**: Gebruik de `browser_subagent` om elk uur Upwork/Fiverr te scannen op trefwoorden (React, Automation, AI).
- **Fallback**: Gebruik de officiële API's alleen als de credentials al in `~/.ssh/` of `.env` staan.
- **Output**: Creëer een `original_job.md` in een nieuwe projectmap onder `~/new-agent/projects/`.

### B. De Geautomatiseerde 9-Gate Audit
- Voer `machine.sh critique [project] FINAL` uit in een headless omgeving.
- De machine mag geen project "goedkeuren" voor levering als de `Requirement Critic` (v2.1) niet 100% matcht met de briefing.

---

## 2. De "Budget Guard" (Real-time Beveiliging)

De Google Billing API is te traag (vertraging van uren). We implementeren een **Token Counter**:

- **Token Guard**: Elk script dat de AI aanroept (Gemini 3) moet het aantal gebruikte tokens bijhouden in `~/machine_usage.json`.
- **Hard Stop**: Als `~/machine_usage.json` aangeeft dat de limiet van €2,00 (gebaseerd op token-prijzen) is bereikt, blokkeert de machine alle verdere uitvoer totdat deze handmatig door de USER wordt gereset.

---

## 3. Cloud Deployment (GCP Details)

- **Platform**: Google Cloud Run (voor de webhooks) en Cloud Scheduler (voor de loop).
- **Regio**: `europe-west1` (België) voor minimale latency en privacy-compliance.
- **Persistence**: Gebruik Firebase Firestore voor het opslaan van lead-statussen (Nieuw, In Audit, Gereed, Afgekeurd).

---

## 4. Self-Healing Protocollen (True Autonomy)

Als een Gate (bijv. Integrity of Runtime) faalt, mag de machine niet direct stoppen:
1.  **Analyseer de fout**: Lees de foutmelding van de critic.
2.  **Repareer**: De machine moet een `fix-it` plan genereren en uitvoeren (bijv. ontbrekende imports toevoegen of dode knoppen koppelen).
3.  **Her-audit**: Voer de 9-Gate audit opnieuw uit. Pas na 3 mislukte reparatiepogingen wordt de USER gewaarschuwd.

---

## 5. De "Control Room" Dashboard

De agent moet een minimale HTML/JS pagina bouwen (via de `generate-screen-from-text` tool) die:
1. De actuele status van de Autonome Machine toont.
2. Een lijst toont van "Gereed voor Levering" projecten.
3. Een knop bevat: **"Verstuur naar Klant"**. *De machine doet de rest.*

---

## 6. Laatste Kwaliteits-Checklist (Voor de volgende Agent)

- [ ] Is de **Token Guard** actief? (Zonder dit mag de loop niet starten).
- [ ] Werkt de **Browser Scraper**? (Test op 1 lead).
- [ ] Is de **GCP Deployment** schaalbaar?

---

## 7. Instructie voor de start:
> "Antigravity, laad 'Missie Autonome Machine'. We gaan de 24/7 loop implementeren met Self-Healing protocollen. 
> Stap 1: Bouw de 'Token Guard' logica in `machine/bin/`.
> Stap 2: Configureer de Watchtower en test de eerste automatische reparatie-cyclus."

---
*Gedestilleerd door De Librarian - Versie 2.1 (Master Polish)*
