# Boyi Fu Personal Website

This repository contains the source code for Boyi Fu's personal academic website:

https://boyifu-ai.github.io/

The site is built with Jekyll and GitHub Pages, based on the lightweight Jekyll Now structure, with custom pages for news, biography, research, publications, contact information, and a self-hosted visitor map.

## Local Preview

Install Ruby, Bundler, and the GitHub Pages gem, then run:

```powershell
cd D:\MyBlog\boyifu-ai.github.io-latest
jekyll serve --host 127.0.0.1 --port 4000 --livereload
```

Open:

```text
http://127.0.0.1:4000/
```

## Content Notes

- News posts are stored in `_posts`.
- Earlier hidden long-form blog drafts are stored in `_drafts` and are not published by normal Jekyll builds.
- The footer visitor map is configured in `_config.yml` under `visitor_map`.
- The Cloudflare Worker template for city-level visitor telemetry is in `visitor-telemetry-worker`.

## Deployment

Push changes to `master`. GitHub Pages will rebuild and publish the site automatically.
