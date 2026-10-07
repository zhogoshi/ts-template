# template

The dashboard new Hogoshi apps are copied from.

Repository: https://github.com/zhogoshi/ts-template

## What

A Next.js shell: sidebar, search, charts, theme, and the kit already installed from npm.

## Why

A new product starts here, then lives in its own repository. Product features do not get added back into this template.

## Install and run

```bash
pnpm install
pnpm dev
```

Dev server: http://localhost:3000

Create a project from the navigator instead of copying by hand:

```bash
pnpm create hogoshi my-app
```

## Docker

```bash
PORT=3010 docker compose up --build
```

The process binds `PORT`. When it is unset, it listens on `3000`. Compose publishes that same port. After `next build`, the image runs `obfuscate-hogoshi .next`. Local `pnpm dev` stays readable. Set `HUGEICONS_NPM_TOKEN` before the image build. In Dokploy, set `PORT` and point the domain at that container port.
