# template

Dashboard starter. https://github.com/zhogoshi/ts-template

New apps start with `pnpm create hogoshi my-app`.

```bash
pnpm install
pnpm dev
```

http://localhost:3000

```bash
PORT=3010 docker compose up --build
```

`PORT` defaults to `3000`. The image build needs `HUGEICONS_NPM_TOKEN`. Push to `main` redeploys. `node scripts/deploy.mjs template` does the same.
