# Hello – A Dashboard

[![Netlify Status](https://api.netlify.com/api/v1/badges/98593b98-f4c9-4ed4-904a-8aa2886faf5e/deploy-status)](https://app.netlify.com/sites/loving-austin-7e5db8/deploys)

Building out a dashboard to mimic something like Currently. Now updated to Vue 3 and Vite. Deploys to Netlify and
uses Netlify serverless functions. Setup your own API Key for [OpenWeather](https://openweathermap.org/api) data.

- [x] Update to Vue 3
- [x] Create models/services for grabbing weather data
- [x] Add Todos!!!
- [x] Create Netlify serverless function to grab weather data

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### For Netlify Function Testing with Hot-Reload Development
Make sure you set up your .env file locally (see .env.example)

```sh
npm run serve
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).
