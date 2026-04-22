/**
 * AESTHETIC CRITIC: The Visual Guardian
 * Checks for Glassmorphism, Premium Typography, and Harmoneous Colors.
 */
import fs from 'fs';
import path from 'path';

const PROJECT_PATH = process.cwd();
const audit = { errors: [], score: 10 };

const checkAesthetics = (dir) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory() && !fullPath.includes('node_modules')) {
            checkAesthetics(fullPath);
        } else if (file.endsWith('.jsx') || file.endsWith('.css')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            
            // Check for Glassmorphism
            if (!content.includes('backdrop-filter: blur') && !content.includes('glass-panel')) {
                audit.errors.push(`Missing Glassmorphism in ${file}`);
            }
            
            // Check for Motion Design (NEW)
            if ((file === 'App.jsx' || file === 'PremiumShell.jsx') && !content.includes('framer-motion')) {
                audit.errors.push(`Missing Motion Design: Use framer-motion in ${file}`);
            }

            // Check for Premium Fonts (NEW)
            if (file === 'PremiumShell.jsx' && !content.includes('fonts.googleapis.com')) {
                audit.errors.push("Missing Premium Typography: Use Google Fonts (Inter).");
            }
        }
    });
};

checkAesthetics(path.join(PROJECT_PATH, 'src'));

if (audit.errors.length > 0) {
    console.error("❌ AESTHETIC CRITIC REJECTED:");
    audit.errors.forEach(err => console.error(` - ${err}`));
    process.exit(1);
} else {
    console.log("✅ AESTHETIC APPROVED.");
    process.exit(0);
}
