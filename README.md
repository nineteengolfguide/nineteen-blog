# nineteen-blog

NineteenGolf.Guide Blog — Eleventy Static Site, deployed via GitHub Actions auf Metanet.

| | |
|---|---|
| **Staging** | https://nineteen.blog (Metanet Zeus, `80.74.156.75`) — automatisch bei Push auf `main` |
| **Produktion** | https://nineteengolf.guide (Metanet Univers, `80.74.146.65`) — nur manuell mit Freigabe |
| **Generator** | [Eleventy](https://www.11ty.dev/) 3.x |
| **Transport** | FTPS (explizites TLS, Port 21) — Zeus bietet kein SSH |

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

**Staging** passiert von selbst: Push auf `main` → Build → FTPS-Upload → nineteen.blog.

**Produktion** bewusst:

```bash
gh workflow run "Build & Deploy" -f target=production
```

Der Job wartet dann auf die Freigabe im Environment `production`.

## Umzug nineteen.blog → nineteengolf.guide

Wenn die Testphase sitzt, sind nur die Secrets im Environment `production` zu
setzen (`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_REMOTE_DIR` für
Univers) — Workflow und Build bleiben unveraendert.

## Sicherheit

Siehe [SECURITY.md](SECURITY.md).
