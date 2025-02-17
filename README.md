# Amen24
Amen24 is a free non-profitable project to introduce bible content for all.

## Setup development environment

####  Install database engine locally and configure it
``` bash
sudo apt update     # Update apt repository
sudo apt install postgresql postgresql-contrib  # Install postgresql and some additional utilities

sudo -i -u postgres
psql  # Login through peer authentication
```

``` sql
ALTER USER postgres WITH PASSWORD 'hiJack7';
\q
```

``` bash
exit
sudo nano /etc/postgresql/16/main/pg_hba.conf # Modify database login from peer to md5
sudo systemctl restart postgresql.service # Restart postgresql service
sudo systemctl status postgresql.service # Check service availability
psql -U postgres # Login with postgres through md5 authentication
```

#### Run bible database scripts
```bash
npx tsc createBibleDb.ts --resolveJsonModule --esModuleInterop # Compile the script to JS
node createBibleDb.js # Run the migration program
```

## Technical debts

#### Handle app restart for RTL on language change (For Android)
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

Launch the app in production mode
``` bash
npx expo run:android --variant release

```

#### Sometimes it's necessary to delete your last commit pushed to the remote, here is how to do
``` bash
git push origin +HEAD^:"$name_of_your_branch"
```

#### After merging the feature branch with main in the remote, perform fetch prune localy as clean up
``` bash
git fetch --all --prune
git branch -vv | awk '/: gone]/{print $1}' | xargs git branch -d
```

#### Configure pnpm to handle workspace with react-native expo & react nextjs projects with different versions
``` bash
pnpm config set node-linker=hoisted --location project
```

## Amen24 project structure
/backend # NestJS backend (API)
/mobile # React Native mobile app
/README.md # Project overview and documentation

/frontend # Next.js frontend (website)
/shared # Shared code (types, utilities, etc.)
/scripts # Scripts for deployment, build, etc.
/docker # Docker configuration files (if using Docker)
/package.json # Root-level package file (for shared tools or workspaces)
/tsconfig.json # Root-level TypeScript configuration (if using workspaces)
