#!/bin/bash

# === CONFIGURATION ===
SOURCE_DIR="/home/emad/Music/bibleMp3ai"
DEST_USER="emad"
DEST_HOST="164.92.231.145"
DEST_DIR="/home/emad/mp3"
SSH_PORT=22
LOG_FILE="rsync_transfer_$(date +%Y%m%d_%H%M%S).log"

# === SSH & RSYNC OPTIONS ===
SSH_CMD="ssh -p $SSH_PORT"
RSYNC_OPTS="-avz --progress --partial --bwlimit=2048 -e \"$SSH_CMD\""

# === EXECUTION ===
echo "Starting rsync transfer..."
eval rsync $RSYNC_OPTS \"$SOURCE_DIR\" \"${DEST_USER}@${DEST_HOST}:$DEST_DIR\" | tee "$LOG_FILE"

# === RESULT ===
if [ $? -eq 0 ]; then
  echo "Transfer completed successfully. Log saved to $LOG_FILE"
else
  echo "Transfer failed. Check $LOG_FILE for details."
fi
