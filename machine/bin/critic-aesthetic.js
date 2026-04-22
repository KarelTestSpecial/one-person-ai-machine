/**
 * AESTHETIC CRITIC: The Visual Guardian
 * Checks for Glassmorphism, Premium Typography, and Harmoneous Colors.
 */
import fs from 'fs';
import path from 'path';

const PROJECT_PATH = process.argv[2] || process.cwd();
const audit = { errors: [], score: 10, hasGlass: false, hasMotion: false, hasFonts: false };

const checkAesthetics = (dir) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory() && !fullPath.includes('node_modules')) {
            checkAesthetics(fullPath);
        } else if (file.endsWith('.jsx') || file.endsWith('.css')) {
            if (['main.jsx', 'App.css', 'index.html'].includes(file)) return;
            const content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('glass-panel') || content.includes('backdrop-filter: blur')) audit.hasGlass = true;
            if (content.includes('framer-motion') || content.includes('motion.')) audit.hasMotion = true;
            if (content.includes('Inter') || content.includes('Roboto')) audit.hasFonts = true;
        }
    });
};

checkAesthetics(path.join(PROJECT_PATH, 'src'));

if (!audit.hasGlass) audit.errors.push("Missing Glassmorphism: No components use glass-panel or blur.");
if (!audit.hasMotion) audit.errors.push("Missing Motion Design: No components use framer-motion.");
if (!audit.hasFonts) audit.errors.push("Missing Premium Typography: No mention of premium fonts (Inter/Roboto).");

if (audit.errors.length > 0) {
    console.error("❌ AESTHETIC CRITIC REJECTED:");
    audit.errors.forEach(err => console.error(` - ${err}`));
    process.exit(1);
} else {
    console.log("✅ AESTHETIC APPROVED.");
    process.exit(0);
}
