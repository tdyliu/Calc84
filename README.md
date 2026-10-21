# Calc 84

A graphing calculator with Google-calculator ergonomics and TI-84 CE features: textbook (2D) math entry, graphing with trace/zero/intersect/∫, tables, matrices, lists and stats, distributions, calculus, units and constants.

Runs on Windows (Electron) and Android (Capacitor). The whole app is `www/index.html`.

## Install

Download from **Releases**: `Calc84-Setup.exe` for Windows, the `.apk` for Android (allow "install unknown apps" when asked).

## Build

Needs Node.js. Android builds also need the Android SDK and a JDK 21 (Gradle finds it automatically).

```bash
npm install
npm start               # run on Windows without packaging
npm run dist            # Windows installer → dist/Calc84-Setup.exe
npm run android         # debug APK → android/app/build/outputs/apk/debug/
npm run android:release # signed APK → android/app/build/outputs/apk/release/
```

`npm run vendor` (run by the build scripts) copies math.js, MathLive and the font into `www/vendor/`. To try it in a browser, run it once and serve `www/`.

Release signing reads `~/.calc84/keystore.properties` (`storeFile`, `storePassword`, `keyAlias`, `keyPassword`). Without it, release APKs are built unsigned.

Self-test: open the app with `#test` at the end of the URL.
