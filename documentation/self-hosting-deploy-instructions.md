# Self-hosting Deploy Instructions

## Download

### Create a folder
``` bash
mkdir actions-runner && cd actions-runnerCopied!# Download the latest runner package
curl -o actions-runner-linux-x64-2.325.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.325.0/actions-runner-linux-x64-2.325.0.tar.gzCopied! # Optional: Validate the hash
echo "5020da7139d85c776059f351e0de8fdec753affc9c558e892472d43ebeb518f4  actions-runner-linux-x64-2.325.0.tar.gz" | shasum -a 256 -cCopied!# Extract the installer
tar xzf ./actions-runner-linux-x64-2.325.0.tar.gz
```

## Configure

### Create the runner and start the configuration experience
``` bash
./config.sh --url https://github.com/emadunan/amen24 --token AMVVL6CICQAJKNGQN7DEJV3IIKP5UCopied!# Last step, run it!
./run.sh
```

# Using your self-hosted runner
## Use this YAML in your workflow file for each job
- runs-on: self-hosted

# To Keep the Runner Always Available
#### Your runner is currently running in the foreground via ./run.sh. That means it will stop if:
- You close the terminal
- The server reboots

#### To make it run as a background service (auto-start on reboot):
1. Stop the current runner with Ctrl + C
2. Install the service:
``` bash
sudo ./svc.sh install
sudo ./svc.sh start
```

3. Check status:
``` bash
sudo ./svc.sh status
```

# Now the runner will:
- Run in the background
- Automatically restart on reboot
- Be available for all jobs using runs-on: self-hosted