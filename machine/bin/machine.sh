#!/bin/bash

# THE MACHINE - Master Control Script
# Usage: ./machine.sh [command]

COMMAND=$1

case $COMMAND in
  "scan")
    echo "🔭 Watchtower: Scanning markets..."
    node /home/kareltestspecial/new-agent/machine/watchtower/index.js
    ;;
  "build")
    echo "🏗️ Factory: Building project from directives.md..."
    # Trigger the architect and engineer
    ;;
  "distill")
    echo "📚 Librarian: Distilling knowledge from logs..."
    # Trigger the librarian
    ;;
  "critique")
    echo "🛡️ Integrity Critic: Auditing function..."
    node /home/kareltestspecial/new-agent/machine/bin/critic-integrity.js
    [ $? -ne 0 ] && exit 1
    echo "🎨 Aesthetic Critic: Auditing form..."
    node /home/kareltestspecial/new-agent/machine/bin/critic-aesthetic.js
    [ $? -ne 0 ] && exit 1
    echo "💡 Usefulness Critic: Auditing value..."
    node /home/kareltestspecial/new-agent/machine/bin/critic-usefulness.js
    [ $? -ne 0 ] && exit 1
    echo "⚡ Runtime Critic: Auditing safety..."
    node /home/kareltestspecial/new-agent/machine/bin/critic-runtime.js
    [ $? -ne 0 ] && exit 1
    echo "🎯 Requirement Critic: Auditing client alignment..."
    node /home/kareltestspecial/new-agent/machine/bin/critic-requirement.js
    [ $? -ne 0 ] && exit 1
    echo "🌐 Browser Critic: Auditing live rendering..."
    node /home/kareltestspecial/new-agent/machine/bin/critic-browser.js $2
    [ $? -ne 0 ] && exit 1
    echo "💎 All Critics Approved. Build is Premium, Useful, Stable, Client-Ready & Render-Verified."
    ;;
  *)
    echo "Usage: ./machine.sh {scan|build|distill|critique|clean}"
    exit 1
    ;;
esac
