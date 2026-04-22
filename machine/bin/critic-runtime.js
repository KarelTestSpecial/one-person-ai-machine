/**
 * RUNTIME CRITIC: The Syntax & Import Guard
 * Scans for missing imports and potential runtime crashes.
 */
import fs from 'fs';
import path from 'path';

const PROJECT_PATH = process.cwd();
const audit = { errors: [] };

const checkRuntimeSafety = (dir) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory() && !fullPath.includes('node_modules')) {
            checkRuntimeSafety(fullPath);
        } else if (file.endsWith('.jsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            
            // Check for used but not imported Lucide icons (Simple heuristic)
            const usedIcons = content.match(/<([A-Z][a-zA-Z0-9]+)/g) || [];
            const importedIcons = content.match(/import {([^}]+)} from 'lucide-react'/s);
            
            if (importedIcons) {
                const imports = importedIcons[1].split(',').map(i => i.trim());
                usedIcons.forEach(tag => {
                    const iconName = tag.substring(1);
                    // Filter common HTML tags and React components
                    if (iconName[0] === iconName[0].toUpperCase() && 
                        !['App', 'PremiumShell', 'ResponsiveContainer', 'AreaChart', 'Area', 'XAxis', 'YAxis', 'CartesianGrid', 'Tooltip', 'BarChart', 'Bar', 'StatBox', 'AnimatePresence', 'motion', 'Fragment'].includes(iconName)) {
                        if (!imports.includes(iconName)) {
                            audit.errors.push(`ReferenceError Potential: ${iconName} is used in ${file} but not imported from lucide-react.`);
                        }
                    }
                });
            }
        }
    });
};

checkRuntimeSafety(path.join(PROJECT_PATH, 'src'));

if (audit.errors.length > 0) {
    console.error("❌ RUNTIME CRITIC REJECTED:");
    audit.errors.forEach(err => console.error(` - ${err}`));
    process.exit(1);
} else {
    console.log("✅ RUNTIME SAFETY APPROVED.");
    process.exit(0);
}
