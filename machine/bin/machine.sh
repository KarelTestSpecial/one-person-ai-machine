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
  "prime")
    echo "📚 Librarian: Priming machine context..."
    node /home/kareltestspecial/new-agent/machine/bin/librarian-gate.js
    ;;
  "distill")
    echo "📚 Librarian: Distilling knowledge with Triage..."
    # Usage: machine distill "Title" "Content"
    node /home/kareltestspecial/new-agent/machine/bin/triage-logic.js "$2" "$3"
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
    echo "⚖️ Legal Critic: Auditing branding safety..."
    LEGAL_MODE=${3:-INTERNAL}
    node /home/kareltestspecial/new-agent/machine/bin/critic-legal.js "$2" "$LEGAL_MODE"
    [ $? -ne 0 ] && exit 1
    echo "🌐 Browser Critic: Auditing live rendering..."
    node /home/kareltestspecial/new-agent/machine/bin/critic-browser.js "$2"
    [ $? -ne 0 ] && exit 1
    echo "💎 All Critics Approved. Build is Premium, Useful, Stable, Client-Ready & Brand-Safe."
    ;;
  *)
    echo "Usage: ./machine.sh {prime|scan|build|distill|critique|clean}"
    exit 1
    ;;
esac
