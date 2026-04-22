#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * Librarian Gate v2.0
 * Unified Context Loader for Project and Global Lessons.
 */

const GLOBAL_DIR = path.join(os.homedir(), '.gemini', 'lessons');
const LOCAL_DIR = path.join(process.cwd(), 'learned-lessons');
const FALLBACK_FILE = path.join(process.cwd(), 'lessons-learned.md');

function readMdFiles(dir) {
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return [];
    return fs.readdirSync(dir)
        .filter(f => f.endsWith('.md'))
        .map(f => ({
            name: f,
            content: fs.readFileSync(path.join(dir, f), 'utf8')
        }));
}

function main() {
    console.log("# 📚 LIBRARIAN CONTEXT LOADED\n");

    // 1. Load Global Lessons
    const globalLessons = readMdFiles(GLOBAL_DIR);
    if (globalLessons.length > 0) {
        console.log("## 🌍 Global Infrastructure Lessons");
        globalLessons.forEach(l => {
            console.log(`### ${l.name}\n${l.content}\n`);
        });
    }

    // 2. Load Local Lessons (Directory)
    const localLessons = readMdFiles(LOCAL_DIR);
    if (localLessons.length > 0) {
        console.log("## 📁 Project-Specific Lessons");
        localLessons.forEach(l => {
            console.log(`### ${l.name}\n${l.content}\n`);
        });
    }

    // 3. Load Fallback File
    if (fs.existsSync(FALLBACK_FILE)) {
        console.log("## 📄 Legacy Project Lessons (lessons-learned.md)");
        console.log(fs.readFileSync(FALLBACK_FILE, 'utf8'));
    }

    console.log("\n--- Librarian Gate Closed ---");
}

main();
