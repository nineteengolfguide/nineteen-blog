# CLAUDE.md — nineteen-blog

Eleventy-Static-Site, deployed per GitHub Actions via FTPS auf Metanet.

## Fakten, die man nicht raten kann

- **Zeus bietet KEIN SSH/SFTP.** Port 22 ist zu, Port 21 offen (ProFTPD mit
  `AUTH TLS`). Deshalb FTPS explizit — nicht auf SFTP umbauen.
- **Webroot ist NICHT `httpdocs`.** Der Dokumentstamm von
  nineteengolfguide.com ist in Plesk `/nineteengolfguide.com` (httpdocs
  gehoert zu siebura.ch, das im selben Abo liegt). Das FTP-Konto `github`
  ist auf dieses Verzeichnis eingesperrt, deshalb ist das Deploy-Ziel `./`.
- **Plesk-Abo:** Systembenutzer `siburachsc`, Server zeus.metanet.ch
  (80.74.156.75). Im selben Abo liegen siebura.ch (WordPress, ~650 MB) und
  sibura.ch (Weiterleitung) — beim Deploy nicht anfassen.
- **Domains:** `nineteengolfguide.com` = Testumfeld, live, auf
  zeus.metanet.ch (80.74.156.75). `nineteengolf.guide` = bestehende
  Produktion (80.74.146.65), wird erst uebernommen wenn das Testumfeld
  sitzt. **`nineteen.blog` wird nie verwendet** — taucht es irgendwo auf,
  ist es ein Ueberbleibsel.
- **Metanet laeuft auf Plesk**, und Plesk kann per Git direkt von GitHub
  ziehen. **Bewusst nicht genutzt:** Plesk zieht den Quellcode, Eleventy
  braucht aber einen Build; ausserdem sind Plesks Deploy-Logs von aussen
  nicht einsehbar, was Fehlersuche unmoeglich macht. Build gehoert auf den
  GitHub-Runner, nur `_site/` geht rueber.

## Regeln fuer Aenderungen

- **Actions immer auf Commit-SHA pinnen**, nie auf `@v4`. Tags sind
  verschiebbar — das ist der uebliche Supply-Chain-Angriff.
- **`npm ci --ignore-scripts`**, nie `npm install` in der CI. Lockfile-treu
  und ohne postinstall-Scripts.
- **`main` ist geschuetzt** (Ruleset `protect-main`): signierte Commits
  Pflicht, kein Force-Push, kein Loeschen. Lokal ist SSH-Signing
  eingerichtet — nicht abschalten.
- Vor jedem Push lokal `npm run build` gruen haben.

## Lokale Umgebung

Node liegt unter `~/.local/opt/node-v24.18.0-darwin-arm64`, verlinkt nach
`~/.local/bin` (kein Homebrew auf dieser Maschine). `gh` ebenso unter
`~/.local/bin/gh`.

Arbeitskopie: `~/Projects/nineteen-blog` — **bewusst nicht in Google Drive**,
weil der Drive-Sync `.git` zerschiessen kann.
