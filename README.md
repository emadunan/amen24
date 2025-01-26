# Amen24
Amen24 is a free non-profitable project to introduce bible content for all.

## Run bible database scripts
```bash
npx tsc createBibleDb.ts --resolveJsonModule --esModuleInterop # Compile the script to JS
node createBibleDb.js # Run the migration program
```

## Handle app restart for RTL on language change (For Android)
- Locate Android main configurations file
  mobile/android/app/src/main/java/com/anonymous/mobile/MainApplication.kt

- initialize expo-updates in onCreate
``` kt
override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, OpenSourceMergedSoMapping)

    // Initialize expo-updates
    expo.modules.updates.UpdatesController.initialize(this)

    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
    ApplicationLifecycleDispatcher.onApplicationCreate(this)
  }
```

- Launch the app in production mode
``` bash
npx expo run:android --variant release

```

## Amen24 project structure
/backend # NestJS backend (API)
/frontend # Next.js frontend (website)
/mobile # React Native mobile app
/shared # Shared code (types, utilities, etc.)
/scripts # Scripts for deployment, build, etc.
/docker # Docker configuration files (if using Docker)
/README.md # Project overview and documentation
/package.json # Root-level package file (for shared tools or workspaces)
/tsconfig.json # Root-level TypeScript configuration (if using workspaces)
