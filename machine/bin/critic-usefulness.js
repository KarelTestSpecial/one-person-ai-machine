/**
 * USEFULNESS CRITIC: The Business Value Guard
 * Checks if the app provides real functional value.
 */
import fs from 'fs';
import path from 'path';

const PROJECT_PATH = process.cwd();
const audit = { errors: [], score: 10 };

const checkUsefulness = (dir) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory() && !fullPath.includes('node_modules')) {
            checkUsefulness(fullPath);
        } else if (file === 'App.jsx') {
            const content = fs.readFileSync(fullPath, 'utf8');
            
            // 1. Complexity Check (State Management)
            const stateMatches = content.match(/useState/g) || [];
            if (stateMatches.length < 3) {
                audit.errors.push("Low Functional Value: App has too little interactive state.");
            }

            // 2. Data Handling (Side effects)
            if (!content.includes('useEffect')) {
                audit.errors.push("Static Experience: No real-time data handling (useEffect) detected.");
            }

            // 3. UI Complexity (Multiple specialized components)
            if (!content.includes('Chart') && !content.includes('Table') && !content.includes('Feed')) {
                audit.errors.push("Generic UI: Missing specialized business components (Charts, Tables, or Feeds).");
            }
        }
    });
};

checkUsefulness(path.join(PROJECT_PATH, 'src'));

if (audit.errors.length > 0) {
    console.error("❌ USEFULNESS CRITIC REJECTED:");
    audit.errors.forEach(err => console.error(` - ${err}`));
    process.exit(1);
} else {
    console.log("✅ USEFULNESS APPROVED.");
    process.exit(0);
}
