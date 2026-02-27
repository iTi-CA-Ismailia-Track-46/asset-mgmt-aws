# ---- Base ----
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# ---- Dependencies ----
FROM base AS deps
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# ---- Build ----
FROM base AS build
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN bun build ./src/index.ts --outdir ./dist

# ---- Release ----
FROM base AS release
COPY --from=build /usr/src/app/dist .
COPY --from=deps /usr/src/app/node_modules ./node_modules

EXPOSE 3000
CMD ["bun", "run", "index.js"]
