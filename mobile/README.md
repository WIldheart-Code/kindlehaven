# Kindlehaven: iOS and Android apps

The apps are the web game wrapped with [Capacitor](https://capacitorjs.com). `build-www.mjs` copies `index.html`, the
game assets, the Help guide and local copies of three.js, PeerJS, the QR code library and the fonts into `www/`, so
the app works with no internet connection (co-op still needs one). The web version is unchanged.

| Folder / file | What it is |
|---|---|
| `build-www.mjs` | Builds `www/` from the repo (run before every app build) |
| `vendor/` | Offline copies of three.js r128, GLTFLoader, qrcodejs, PeerJS 1.5.4 and the Lilita One / Nunito fonts |
| `capacitor.config.json` | App id (`com.wildheartgaming.kindlehaven`), name, splash and status bar settings |
| `android/`, `ios/` | The native projects (portrait only) |
| `assets/` | Icon and splash source images; regenerate sizes with `npx capacitor-assets generate` |
| `STORE.md` | Store listing text, privacy answers and screenshot list |

## One-time setup

1. Install Node 20+, then in this folder run `npm install`.
2. The app id is `com.wildheartgaming.kindlehaven`. It can never change after the first store upload.
   The projects use Capacitor 8 and target Android 16 (API 36), which Google Play requires for new apps.
3. Check `WEB_URL` at the top of `build-www.mjs`: co-op invites sent from the app point there (the web version joins
   the same rooms). It is set to `https://dcardine.github.io/engage/`; change it if your GitHub Pages address differs.

## Every release

1. Bump `GAME_VERSION` in `index.html` as usual, and set the same number as the app version:
   - Android: `versionName` and (one higher each upload) `versionCode` in `android/app/build.gradle`
   - iOS: Version and Build in Xcode (target App → General)
2. `npm run sync` (builds `www/` and copies it into both native projects).

## Android (Google Play)

1. Install [Android Studio](https://developer.android.com/studio). Run `npm run android` to open the project.
2. Try it on a phone or emulator (Run ▶).
3. Build → Generate Signed App Bundle → Android App Bundle → create a new keystore. **Back up the keystore and its
   passwords**: every future update must be signed with it (or enrol in Play App Signing, which Play offers on upload).
4. In [Google Play Console](https://play.google.com/console) ($25 once): Create app → fill in the listing from
   `STORE.md`, content rating (IARC questionnaire), Data safety (answers in `STORE.md`), privacy policy URL, target
   audience.
5. New personal accounts must first run a **closed test with at least 12 testers for 14 days**: Testing → Closed
   testing → upload the `.aab`, add testers' emails. After 14 days apply for production access.
6. Production → Create release → upload the `.aab` → roll out.

## iOS (App Store)

Needs a Mac with Xcode 15+ (or a cloud Mac build service such as Codemagic or Ionic Appflow).

1. Join the [Apple Developer Program](https://developer.apple.com/programs/) ($99 a year).
2. On the Mac: `npm install`, then `npm run ios` (opens Xcode; run `pod install` in `ios/App` if Xcode asks).
3. Target App → Signing & Capabilities → choose your team; set the Bundle Identifier to your app id.
4. Run it on a simulator or your iPhone.
5. In [App Store Connect](https://appstoreconnect.apple.com): My Apps → + → New App, same bundle id.
6. In Xcode: Product → Archive → Distribute App → App Store Connect → Upload.
7. Fill in the listing from `STORE.md` (screenshots for 6.7" and 6.5" iPhones and 12.9" iPad), App Privacy
   ("Data Not Collected"), age rating, privacy policy URL, then Submit for Review (usually 1–3 days).
8. Optional: TestFlight lets friends test before release.

## Notes

- The play-stats, play-report and staging tools only work on claude.ai and stay off in the apps.
- The app is about 80 MB, mostly 3D models. Both stores accept that.
