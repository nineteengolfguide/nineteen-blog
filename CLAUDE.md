# CLAUDE.md — nineteen-blog

Eleventy-Static-Site, deployed per GitHub Actions via FTPS auf Metanet.

## Fakten, die man nicht raten kann

- **Zeus bietet KEIN SSH/SFTP.** Port 22 ist zu, Port 21 offen (ProFTPD mit
  `AUTH TLS`). Deshalb FTPS explizit — nicht auf SFTP umbauen.
- **Webroot ist `./httpdocs/`** (Metanet-Konvention). Ueberschreibbar per
  Secret `FTP_REMOTE_DIR`.
- **Staging und Produktion liegen auf verschiedenen Metanet-Servern:**
  nineteen.blog -> Zeus (80.74.156.75), nineteengolf.guide -> Univers
  (80.74.146.65). Andere Zugangsdaten, deshalb getrennte Environments.
- **Plan:** erst nineteen.blog perfektionieren, dann auf nineteengolf.guide
  umziehen. Produktion ist bewusst manuell + freigabepflichtig.

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
