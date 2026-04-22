/**
 * RUNTIME CRITIC: The Syntax & Import Guard
 * Scans for missing imports and potential runtime crashes.
 */
import fs from 'fs';
import path from 'path';

const PROJECT_PATH = process.argv[2] || process.cwd();
const audit = { errors: [] };

const checkRuntimeSafety = (dir) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory() && !fullPath.includes('node_modules')) {
            checkRuntimeSafety(fullPath);
        } else if (file.endsWith('.jsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            
            // Extract all symbols from imports
            const importedSymbols = new Set();
            // Better regex: match either {symbols} or a single default symbol, ensuring we don't skip over other imports
            const importMatches = content.matchAll(/import\s+({[\s\S]+?}|[a-zA-Z0-9_$]+)\s+from/g);
            
            for (const match of importMatches) {
                let symbolsText = match[1].replace(/[\{\}]/g, ''); 
                const symbols = symbolsText.split(/[\n,]/).map(s => {
                    const parts = s.trim().split(/\s+as\s+/);
                    return parts[parts.length - 1]; 
                }).filter(Boolean);
                symbols.forEach(s => importedSymbols.add(s));
            }

            // Extract all used PascalCase components
            const usedComponents = [...new Set(content.match(/<([A-Z][a-zA-Z0-9]+)/g) || [])].map(tag => tag.substring(1));
            
            const builtinReact = ['Fragment', 'StrictMode'];
            const recharts = ['AreaChart', 'Area', 'XAxis', 'YAxis', 'CartesianGrid', 'Tooltip', 'ResponsiveContainer', 'BarChart', 'Bar'];
            const motion = ['motion', 'AnimatePresence'];
            const whitelist = [...builtinReact, ...recharts, ...motion];

            usedComponents.forEach(comp => {
                if (!whitelist.includes(comp) && !importedSymbols.has(comp)) {
                    audit.errors.push(`ReferenceError: ${comp} is used in ${file} but not imported.`);
                }
            });
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
