# Sicherheit

## Schwachstelle melden

Bitte **kein oeffentliches Issue** eroeffnen. Melde Funde an
**philipp@nineteengolf.guide** oder ueber den privaten Kanal
[Security Advisories](https://github.com/nineteengolfguide/nineteen-blog/security/advisories/new).

Wir melden uns innerhalb von 5 Werktagen zurueck.

## Was in diesem Repo geschuetzt ist

| Massnahme | Wo |
|---|---|
| Secret Scanning + Push Protection | GitHub Repo-Settings |
| Dependabot (npm + Actions) | `.github/dependabot.yml` |
| CodeQL statische Analyse | `.github/workflows/codeql.yml` |
| `npm audit` blockiert Deploys ab "high" | `.github/workflows/deploy.yml` |
| Actions auf Commit-SHA gepinnt (kein Tag-Hijacking) | `.github/workflows/*.yml` |
| `npm ci --ignore-scripts` (keine postinstall-Scripts) | `.github/workflows/deploy.yml` |
| Signierte Commits (SSH) | lokale git-Config |
| Branch Protection auf `main` | GitHub Repo-Settings |
| Produktions-Deploy nur mit manueller Freigabe | Environment `production` |

## Zugangsdaten

Es gehoeren **keine** Zugangsdaten ins Repository. Die FTPS-Zugaenge liegen
ausschliesslich als GitHub **Environment Secrets**:

- Environment `staging` -> nineteen.blog
- Environment `production` -> nineteengolf.guide

Benoetigte Secrets je Environment: `FTP_SERVER`, `FTP_USERNAME`,
`FTP_PASSWORD`, `FTP_REMOTE_DIR`.

Der FTPS-Account sollte auf das Web-Verzeichnis der jeweiligen Domain
beschraenkt sein - kein Vollzugriff auf den gesamten Webspace.
