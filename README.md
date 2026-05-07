# Medical Portal

Portal médico desarrollado con Next.js, React, TypeScript y Tailwind CSS.

---

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- ESLint

---

## Requirements

- Node.js 24
- NVM recomendado

---

## Installation

Clone repository:

```bash
git clone https://github.com/Bryan-Zavala/medical-portal.git
```

Enter project folder:

```bash
cd medical-portal
```

Use correct Node version:

```bash
nvm use
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

## Git Workflow

Do NOT work directly on `main`.

Before starting a task:

```bash
git checkout main
git pull origin main
git checkout -b feature/task-name
```

After finishing:

- push branch
- open Pull Request to `main`

---

## Sync dependencies

After pulling new changes:

```bash
git pull origin main
npm install
```

If you open a new terminal session:

```bash
nvm use
```

---

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
