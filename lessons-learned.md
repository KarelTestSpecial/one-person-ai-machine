# One-Person AI Machine: Lessons Learned

## Technical Gotchas
- **State Lifting**: Sidebar navigation must always lift state to the parent component (`App.jsx`) to ensure deterministic rendering of views. Static shells are "dead" in real-world scenarios.
- **Reference Errors**: When modifying `App.jsx` hooks (like high-frequency loops), always ensure state variables (`data`, `setData`) are not accidentally deleted.
- **Vite Ports**: In a multi-project workspace, always specify `--port` to avoid conflicts and ensure the Browser Critic targets the correct instance.
- **CSS Containers**: `Recharts` and other responsive components require explicit container heights (e.g., `.chart-wrapper { min-height: 400px }`) to render correctly.

## Client Alignment
- **Live Feedback**: Real-world clients equate "functionality" with "real-time feedback". A pulsing "LIVE" indicator and latency monitor are essential for trading/dashboard applications.
- **The 6th Critic (Visual)**: Code-level audits aren't enough. The Browser Critic must verify that the app actually *shows* something and the console is clean.

## System Management
- **Disk Space**: Frequent `pnpm` installs can clog the Chromebook's limited SSD. Regular pruning is mandatory.
- **Task Finalization**: Always run `finish-task.sh` to sync lessons and clean up system resources.
