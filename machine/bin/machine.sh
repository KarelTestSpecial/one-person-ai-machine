#!/bin/bash

# THE MACHINE - Master Control Script
# Usage: ./machine.sh [command]

COMMAND=$1

case $COMMAND in
  "scan")
    PROJECT_DIR=${2:-$(pwd)}
    echo "🔭 Watchtower: Scanning markets in $PROJECT_DIR..."
    node /home/kareltestspecial/new-agent/machine/watchtower/index.js "$PROJECT_DIR"
    ;;
  "build")
    PROJECT_DIR=${2:-$(pwd)}
    echo "🏗️ Factory: Building project in $PROJECT_DIR..."
    # Trigger the architect and engineer
    ;;
  "prime")
    PROJECT_DIR=${2:-$(pwd)}
    echo "📚 Librarian: Priming machine context for $PROJECT_DIR..."
    node /home/kareltestspecial/new-agent/machine/bin/librarian-gate.js "$PROJECT_DIR"
    ;;
  "distill")
    PROJECT_DIR=${4:-$(pwd)}
    echo "📚 Librarian: Distilling knowledge with Triage in $PROJECT_DIR..."
    node /home/kareltestspecial/new-agent/machine/bin/triage-logic.js "$2" "$3" "$PROJECT_DIR"
    ;;
  "report")
    PROJECT_DIR=${2:-$(pwd)}
    echo "📄 Librarian: Generating Client Delivery Report for $PROJECT_DIR..."
    node /home/kareltestspecial/new-agent/machine/bin/generate-report.js "$PROJECT_DIR"
    ;;
  "test-api")
    echo "🌐 Vexillion: Running API Bridge Simulation..."
    node /home/kareltestspecial/new-agent/machine/bin/test-api.js
    ;;
  "critique")
    PROJECT_DIR=${2:-$(pwd)}
    echo "🎯 Briefing Critic: Verifying Strategy Alignment..."
    node /home/kareltestspecial/new-agent/machine/bin/critic-briefing.js "$PROJECT_DIR"
    [ $? -ne 0 ] && exit 1
    
    echo "🛡️ Integrity Critic: Auditing $PROJECT_DIR..."
    node /home/kareltestspecial/new-agent/machine/bin/critic-integrity.js "$PROJECT_DIR"
    [ $? -ne 0 ] && exit 1
    
    echo "🎨 Aesthetic Critic: Auditing $PROJECT_DIR..."
    node /home/kareltestspecial/new-agent/machine/bin/critic-aesthetic.js "$PROJECT_DIR"
    [ $? -ne 0 ] && exit 1
    
    echo "💡 Usefulness Critic: Auditing $PROJECT_DIR..."
    node /home/kareltestspecial/new-agent/machine/bin/critic-usefulness.js "$PROJECT_DIR"
    [ $? -ne 0 ] && exit 1
    
    echo "⚡ Runtime Critic: Auditing $PROJECT_DIR..."
    node /home/kareltestspecial/new-agent/machine/bin/critic-runtime.js "$PROJECT_DIR"
    [ $? -ne 0 ] && exit 1
    
    echo "🎯 Requirement Critic: Auditing $PROJECT_DIR..."
    node /home/kareltestspecial/new-agent/machine/bin/critic-requirement.js "$PROJECT_DIR"
    [ $? -ne 0 ] && exit 1
    
    echo "⚖️ Legal Critic: Auditing $PROJECT_DIR..."
    LEGAL_MODE=${3:-INTERNAL}
    node /home/kareltestspecial/new-agent/machine/bin/critic-legal.js "$PROJECT_DIR" "$LEGAL_MODE"
    [ $? -ne 0 ] && exit 1
    
    echo "🌐 Browser Critic: Auditing $PROJECT_DIR..."
    node /home/kareltestspecial/new-agent/machine/bin/critic-browser.js "$PROJECT_DIR"
    [ $? -ne 0 ] && exit 1
    
    echo "💎 All Critics Approved for $PROJECT_DIR."
    ;;

  "finish")
    echo "🏁 Librarian: Finalizing task and distilling lessons..."
    bash /home/kareltestspecial/new-agent/machine/bin/finish-task.sh
    ;;

  *)
    echo "Usage: ./machine.sh {prime|scan|build|distill|critique|report|test-api|finish|clean}"
    exit 1
    ;;
esac
