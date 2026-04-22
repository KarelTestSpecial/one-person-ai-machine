# WORKFLOW: Librarian Distillation

## Objective
Convert successful project logs into reusable 'Master Components' to increase the machine's speed.

## Steps
1. **Analyze**: Scan the `done.md` and project logs for new successful code blocks.
2. **Identify**: Find patterns that appeared more than once.
3. **Abstract**: Remove project-specific variables and comments.
4. **Verify**: Run a syntax check on the abstracted code.
5. **Store**: Save to `machine/library/[component-name].js`.
6. **Index**: Update `machine/library/index.json` with the new skill metadata.
7. **Cleanup**: Delete the raw episodic logs to save disk space.
