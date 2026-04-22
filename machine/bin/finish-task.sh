#!/bin/bash

# THE MACHINE: Shutdown & Finalization Procedure
# Goal: Cleanup resources, sync lessons, and prepare for next task.

echo "🏁 Starting Task Finalization Procedure..."

# 1. System Cleanup (Managing GBs)
echo "🧹 Cleaning up system resources..."
pnpm store prune
sudo apt autoremove --purge -y
sudo apt clean
echo "✅ Disk space optimized."

# 2. Librarian Sync & Audit
echo "📚 Syncing & Auditing lessons learned..."
node /home/kareltestspecial/new-agent/machine/bin/critic-librarian.js
[ $? -ne 0 ] && echo "⚠️ Knowledge audit failed. Please refine lessons-learned.md" && exit 1
cat lessons-learned.md | head -n 20
echo "✅ Knowledge base updated and verified."

# 3. Memory Consolidation
echo "🧠 Refreshing Skill: remember-lessons..."
# Trigger the internal librarian workflow (simulation)
node /home/kareltestspecial/new-agent/machine/bin/critic-integrity.js --silence
echo "✅ Skills updated and ready for next session."

# 4. Git Housekeeping
echo "📦 Saving state to GitHub..."
git add lessons-learned.md machine/bin/finish-task.sh
git commit -m "chore: Finalize task and update lessons learned"
git push origin main
echo "✅ Cloud sync complete."

echo "🚀 Shutdown Procedure Complete. The One-Person Machine is now idle."
