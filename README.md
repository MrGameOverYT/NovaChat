# NovaChat Android build

This package contains the supplied NovaChat static website in `www/` and a Capacitor Android wrapper.

## Build an APK using GitHub Actions (free usage limits apply)
1. Create a new GitHub repository or use a copy of your existing repository.
2. Upload the contents of this folder to the repository root (including `.github/`).
3. Open **Actions** and enable workflows if GitHub asks.
4. Run **Build NovaChat APK** from the Actions tab, or push a commit to `main`/`master`.
5. Open the completed workflow run, find **Artifacts**, and download `NovaChat-debug-apk`. It contains `app-debug.apk`.

The APK is a debug build suitable for testing and sideload installation, not a Play Store release.

## Important checks
- This is a static website wrapper. Firebase/Telegram behavior must be tested on-device.
- The Telegram login integration depends on the configured Cloudflare Worker and Telegram bot settings.
- Push notifications via Firebase Messaging/service worker may not behave identically in Android WebView.
- Do not commit private server secrets. Firebase web config is normally public, but Firebase Security Rules must protect data.
