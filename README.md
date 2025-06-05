# Amen24
Amen24 is a free non-profitable project to introduce bible content for all.

🛠️ See [maintenance-commands.md](./documentation/maintenance-commands.md) for DB backups and Nginx configuration during maintenance.

## Setup development environment

#### Show the git branch with colours in Bash prompt
``` bash
# Replace:
if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi

# With:
# Add git branch if its present to PS1
parse_git_branch() {
 git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)/'
}
if [ "$color_prompt" = yes ]; then
 PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[01;31m\]$(parse_git_branch)\[\033[00m\]\$ '
else
 PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w$(parse_git_branch)\$ '
fi
```

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

#### To push to remote deploy branch without firing github actions
``` bash
git commit -m "chore: Add commit to push to deploy remote branch without firing github actions [skip ci]"
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

## Setup Production

### Setup Redis Server

- Install redis server
``` bash
sudo apt update
sudo apt install redis-server
```

- Configure redis
``` bash
sudo vim /etc/redis/redis.conf
# Check Config
redis-cli CONFIG GET appendonly
redis-cli CONFIG GET save

# Change appendonly value:
appendonly yes

# Then restart Redis:
sudo systemctl restart redis
```

### Setup Secure with an SSL Certificate (Let's Encrypt)
``` bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d amen24.org -d www.amen24.org
```

- Certbot automatically installs a renewal cron job, but you can test it manually:
``` bash
sudo certbot renew --dry-run
sudo systemctl reload nginx
```
