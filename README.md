# Calc 84

A graphing calculator with Google-calculator ergonomics and TI-84 Plus CE features: textbook (2D) math entry, graphing with trace/zero/intersect/∫, tables, matrices, lists and stats, distributions, calculus, units and constants.

**Use it online: https://tdyliu.github.io/Calc84/** (works on any phone, tablet or computer, no download)

It also runs as a Windows app (Electron) and an Android app (Capacitor). The whole app is `www/index.html`.

## Get it

| Where | How |
|---|---|
| Any browser | Open https://tdyliu.github.io/Calc84/. After the first visit it also works offline. |
| Phone or tablet home screen | Open the link above, then **Add to Home Screen** (Safari: Share button; Chrome: ⋮ menu → *Install app*). It opens full screen like an app. |
| Windows | From **Releases**: `Calc84-Setup.exe` (installs), `Calc84-…-win.zip` (unzip and run `Calc 84.exe`), or `Calc84-Portable.exe` (single file, slower to start). |
| Android | From **Releases**: `Calc84.apk`. Allow "install unknown apps" when asked. |

The Windows and Android files aren't from an app store, so the first launch may warn you: **More info → Run anyway** on Windows, **Install anyway** on Android.

Your history, variables and settings are saved on each device (per browser for the web version) and aren't shared between them.

## Build

Needs Node.js. Android builds also need the Android SDK and a JDK 21 (Gradle finds it automatically).

```bash
npm install
npm start               # run on Windows without packaging
npm run dist            # Windows: installer, zip and portable exe → dist/
npm run android         # debug APK → android/app/build/outputs/apk/debug/
npm run android:release # signed APK → android/app/build/outputs/apk/release/
```

`npm run vendor` (run by the build scripts) copies math.js, MathLive and the font into `www/vendor/`. To try the web version locally, run it once and serve `www/`, for example with `python -m http.server -d www`.

The web version deploys itself: every push to `main` runs `.github/workflows/pages.yml`, which publishes `www/` to GitHub Pages. `www/sw.js` caches the app for offline use; it refreshes in the background, so a new version shows up on the second visit after a deploy.

Release signing reads `~/.calc84/keystore.properties` (`storeFile`, `storePassword`, `keyAlias`, `keyPassword`). Without it, release APKs are built unsigned.

Self-test: add `#test` to the end of the address.
