# Lessons Learned: Vexillion AI Project

## Technical Gotchas
- **Port Locking**: Always use port 5175 for Vite dev servers to maintain compatibility with the Machine's Browser Critic.
- **Glassmorphism Performance**: Use `backdrop-filter: blur()` sparingly on low-power devices like Chromebooks to avoid FPS drops in high-frequency (10+ UPS) data loops.
- **LocalStorage Sync**: Always stringify complex objects before saving to `localStorage` to prevent data corruption during persistent state updates.

## Client Alignment
- **Strategic Rebranding**: Align the core identity (Vexillion AI) across all metadata and reports before starting the 9-Gate audit.
- **Traceability Mandate**: Ensure `original_job.md` contains a valid Source URL and Client ID to pass the Briefing Gate.
- **Report Automation**: Generate the `client_report.md` early in the process to demonstrate value-based progress to the enterprise lead.

## Actionable Strategy
- Expand the Master Component Library with the Vexillion glassmorphism tokens.
- Deploy the Librarian distillation script to automate the 9th gate verification.
