This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Instalation
First, install node package module
```bash
npm install
# or
yarn install
```

Create .env file
```bash
DATABASE_URL=postgresql://postgres:password@localhost:5432/fabelio-test?schema=public
```
Migrate database using prisma migrate
```bash
npx prisma migrate dev
```
Generate prisma model
```bash
npx prisma generate
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.