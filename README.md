# nineteen-blog

NineteenGolf Blog — Eleventy Static Site, deployed via GitHub Actions auf Metanet.

| | |
|---|---|
| **Testumfeld (live)** | https://nineteengolfguide.com — `zeus.metanet.ch` / `80.74.156.75` — automatisch bei Push auf `main` |
| **Produktion** | https://nineteengolf.guide — `80.74.146.65` — nur manuell mit Freigabe, erst wenn das Testumfeld sitzt |
| **Generator** | [Eleventy](https://www.11ty.dev/) 3.x |
| **Transport** | FTPS (explizites TLS, Port 21) — Zeus bietet kein SSH |

`nineteen.blog` wird **nicht** verwendet.

## Lokal arbeiten

```bash
npm ci
npm run serve     # http://localhost:8080 mit Live-Reload
npm run build     # baut nach _site/
```

Node 24 (siehe `.nvmrc`).

## Inhalte

```
src/
  index.njk            Startseite (listet collection "posts")
  about.njk            Ueber-Seite
  posts/*.md           Blogbeitraege — hier kommt neuer Inhalt rein
  _includes/base.njk   Grundlayout
  _includes/post.njk   Layout eines Beitrags
  assets/              wird 1:1 kopiert (Bilder, CSS)
```

Neuer Beitrag = neue `.md` in `src/posts/` mit Front-Matter:

```markdown
---
title: Titel des Beitrags
date: 2026-07-24
layout: post.njk
---

Text …
```

## Deployen

**Testumfeld** passiert von selbst: Push auf `main` → Build → FTPS → nineteengolfguide.com

**Produktion** bewusst:

```bash
gh workflow run "Build & Deploy" -f target=production
```

Der Job wartet dann auf die Freigabe im Environment `production`.

## Warum nicht Plesk-Git

Plesk kann per Git direkt von GitHub ziehen — bewusst nicht genutzt. Plesk
zieht den *Quellcode*, Eleventy braucht aber einen Build-Schritt, und Plesks
Deploy-Logs sind von aussen nicht einsehbar. Der Build laeuft deshalb auf
GitHub-Runnern (reproduzierbar, unabhaengig von der Node-Version auf dem
Server), und nur das fertige `_site/` geht per FTPS rueber.

## Sicherheit

Siehe [SECURITY.md](SECURITY.md).
