# WORKFLOW: Watchtower Market Scan

## Objective
Identify high-value, low-effort projects on freelancer platforms that match our Master Component library.

## Steps
1. **Browse**: Use the Browser Subagent to check the 'New Projects' feed on Freelancer.com, Fiverr, and Upwork.
2. **Filter**: 
    - Keywords: `React`, `Vite`, `Firebase`, `Tailwind`, `AI Automation`, `Chatbot`.
    - Exclude: `GGZ`, `Justice`, `Legal`, `Prison`.
    - Budget: > $100.
3. **Analyze**: For each potential job, check if we have a matching 'Master Component' in `machine/library/`.
4. **Report**: Create a `leads.md` file with the top 3 opportunities, including:
    - Platform link.
    - Estimated time to complete (using our unfair advantage).
    - Proposed 'winnende' pitch.
5. **CEO Notification**: Notify the user that leads are ready for review.
