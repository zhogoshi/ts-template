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

`PORT` is the host port. The app inside the container still listens on `3000`. Set `HUGEICONS_NPM_TOKEN` before the image build. In Dokploy, point the domain at container port `3000`.
