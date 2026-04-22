/**
 * INTEGRITY CRITIC: The Technical Watchdog
 * Checks for broken links, dead buttons, and SEO failures.
 */
import fs from 'fs';
import path from 'path';

const PROJECT_PATH = process.cwd();
const audit = { errors: [], score: 10 };

const checkInteractions = (dir) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory() && !fullPath.includes('node_modules')) {
            checkInteractions(fullPath);
        } else if (file.endsWith('.jsx') || file.endsWith('.html')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            
            // Broken Links
            if (content.includes('href="#"')) audit.errors.push(`Broken Link in ${file}`);
            
            // Dead Buttons
            if (content.includes('<button') && !content.includes('onClick') && !content.includes('type="submit"')) {
                audit.errors.push(`Dead Button in ${file}`);
            }

            // Sidebar Check (NEW)
            if (file === 'PremiumShell.jsx') {
                if (!content.includes('activeTab')) audit.errors.push("Non-functional Sidebar: Missing navigation state.");
                if (!content.includes('lucide-react')) audit.errors.push("Missing Sidebar Icons: Use lucide-react.");
            }
        }
    });
};

const checkSEO = () => {
    const indexPath = path.join(PROJECT_PATH, 'index.html');
    if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, 'utf8');
        if (content.includes('<title>portal</title>')) audit.errors.push("Generic Title detected.");
    }
};

checkInteractions(path.join(PROJECT_PATH, 'src'));
checkSEO();

if (audit.errors.length > 0) {
    console.error("❌ INTEGRITY CRITIC REJECTED:");
    audit.errors.forEach(err => console.error(` - ${err}`));
    process.exit(1);
} else {
    console.log("✅ INTEGRITY APPROVED.");
    process.exit(0);
}
