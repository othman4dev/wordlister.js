#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');
const path = require('path');

// Color codes for beautiful terminal output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    bgMagenta: '\x1b[45m',
    bgCyan: '\x1b[46m'
};

// ASCII Art Banner
function displayBanner() {
    console.clear();
    const banner = `
${colors.cyan}${colors.bright}
╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                                                                                                        ║
║                                                                                                                        ║
║                                                 /$$ /$$ /$$             /$$                                            ║
║                                                | $$| $$|__/            | $$                                            ║
║         /$$  /$$  /$$  /$$$$$$   /$$$$$$   /$$$$$$$| $$ /$$  /$$$$$$$ /$$$$$$    /$$$$$$   /$$$$$$  /$$  /$$$$$$$      ║
║        | $$ | $$ | $$ /$$__  $$ /$$__  $$ /$$__  $$| $$| $$ /$$_____/|_  $$_/   /$$__  $$ /$$__  $$|__/ /$$_____/      ║
║        | $$ | $$ | $$| $$  \\ $$| $$  \\__/| $$  | $$| $$| $$|  $$$$$$   | $$    | $$$$$$$$| $$  \\__/ /$$|  $$$$$$       ║
║        | $$ | $$ | $$| $$  | $$| $$      | $$  | $$| $$| $$ \\____  $$  | $$ /$$| $$_____/| $$      | $$ \\____  $$      ║
║        |  $$$$$/$$$$/|  $$$$$$/| $$      |  $$$$$$$| $$| $$ /$$$$$$$/  |  $$$$/|  $$$$$$$| $$ /$$  | $$ /$$$$$$$/      ║
║         \\_____/\\___/  \\______/ |__/       \\_______/|__/|__/|_______/    \\___/   \\_______/|__/|__/  | $$|_______/       ║
║                                                                                               /$$  | $$                ║
║                                                                                              |  $$$$$$/                ║
║                                                                                               \\______/                 ║
║                                                                                                                        ║
║                                                                                                                        ║
║                ${colors.yellow}🚀 Advanced Wordlist Generation Tool 🚀${colors.cyan}                                                                 ║
║                 ${colors.white}Created for Security Research${colors.magenta} By Othman4dev ${colors.cyan}                                                           ║
║                                                                                                                        ║
╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
${colors.reset}
`;
    console.log(banner);
}

// Progress bar function
function showProgress(current, total, label = 'Processing') {
    const barLength = 30;
    const progress = current / total;
    const filledLength = Math.round(barLength * progress);
    const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);
    const percentage = Math.round(progress * 100);
    
    process.stdout.write(`\r${colors.yellow}${label}: ${colors.cyan}[${bar}] ${colors.white}${percentage}% ${colors.dim}(${current}/${total})${colors.reset}`);
}

// Input collection function
async function collectWords() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const words = [];
    
    console.log(`${colors.green}${colors.bright}📝 Enter words/terms for wordlist generation:${colors.reset}`);
    console.log(`${colors.dim}💡 Tip: Enter one word per line, press Enter on empty line to finish${colors.reset}\n`);
    
    return new Promise((resolve) => {
        const askForWord = () => {
            rl.question(`${colors.cyan}Word ${words.length + 1}: ${colors.white}`, (input) => {
                if (input.trim() === '') {
                    rl.close();
                    resolve(words);
                } else {
                    words.push(input.trim());
                    console.log(`${colors.green}✓ Added: ${colors.yellow}"${input.trim()}"${colors.reset}`);
                    askForWord();
                }
            });
        };
        askForWord();
    });
}

// Advanced wordlist generation
function generateWordlist(words) {
    console.log(`\n${colors.magenta}${colors.bright}🔄 Generating advanced wordlist combinations...${colors.reset}\n`);
    
    const result = new Set();
    const variations = [];
    
    // Step 1: Add original words with variations
    console.log(`${colors.blue}Step 1: ${colors.white}Adding base words and case variations...${colors.reset}`);
    words.forEach((word, index) => {
        showProgress(index + 1, words.length, 'Base words');
        
        result.add(word);
        result.add(word.toLowerCase());
        result.add(word.toUpperCase());
        result.add(capitalize(word));
        
        // Add common mutations
        result.add(word + '123');
        result.add(word + '!');
        result.add(word + '01');
        result.add('123' + word);
        result.add('!' + word);
    });
    console.log(`\n${colors.green}✓ Base variations complete!${colors.reset}\n`);
    
    // Step 2: Two-word combinations
    console.log(`${colors.blue}Step 2: ${colors.white}Generating two-word combinations...${colors.reset}`);
    let combinationCount = 0;
    const totalTwoCombinations = words.length * words.length;
    
    words.forEach(word1 => {
        words.forEach(word2 => {
            combinationCount++;
            showProgress(combinationCount, totalTwoCombinations, 'Two-word combos');
            
            const combinations = [
                word1 + word2,
                word1 + '_' + word2,
                word1 + '-' + word2,
                word1 + '.' + word2,
                word1.toLowerCase() + word2.toUpperCase(),
                word1.toUpperCase() + word2.toLowerCase()
            ];
            
            combinations.forEach(combo => {
                result.add(combo);
                result.add(combo.toLowerCase());
                result.add(combo.toUpperCase());
            });
        });
    });
    console.log(`\n${colors.green}✓ Two-word combinations complete!${colors.reset}\n`);
    
    // Step 3: Three-word combinations (limited to prevent memory issues)
    if (words.length <= 10) {
        console.log(`${colors.blue}Step 3: ${colors.white}Generating three-word combinations...${colors.reset}`);
        let threeCount = 0;
        const totalThreeCombinations = words.length * words.length * Math.min(words.length, 5);
        
        words.forEach(word1 => {
            words.slice(0, Math.min(words.length, 5)).forEach(word2 => {
                words.slice(0, Math.min(words.length, 5)).forEach(word3 => {
                    threeCount++;
                    showProgress(threeCount, totalThreeCombinations, 'Three-word combos');
                    
                    const combo = word1 + word2 + word3;
                    result.add(combo);
                    result.add(combo.toLowerCase());
                    result.add(combo.toUpperCase());
                    result.add(word1 + '_' + word2 + '_' + word3);
                });
            });
        });
        console.log(`\n${colors.green}✓ Three-word combinations complete!${colors.reset}\n`);
    } else {
        console.log(`${colors.yellow}⚠️  Skipping three-word combinations (too many base words)${colors.reset}\n`);
    }
    
    // Step 4: Add common patterns
    console.log(`${colors.blue}Step 4: ${colors.white}Adding common password patterns...${colors.reset}`);
    const commonNumbers = ['1', '12', '123', '2023', '2024', '2025', '01', '00'];
    const commonSymbols = ['!', '@', '#', '$', '&', '*'];
    const commonSuffixes = ['123', '!@#', '2024', 'admin', 'user', 'test'];
    
    const originalSize = result.size;
    Array.from(result).slice(0, Math.min(100, result.size)).forEach(word => {
        commonNumbers.forEach(num => {
            result.add(word + num);
            result.add(num + word);
        });
        
        commonSymbols.forEach(symbol => {
            result.add(word + symbol);
            result.add(symbol + word);
        });
        
        commonSuffixes.forEach(suffix => {
            result.add(word + suffix);
        });
    });
    
    console.log(`${colors.green}✓ Pattern variations added! (+${result.size - originalSize} combinations)${colors.reset}\n`);
    
    return Array.from(result).sort();
}

// Utility function to capitalize first letter
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Generate unique filename
function generateFilename() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').split('.')[0];
    return `wordlist_${timestamp}.txt`;
}

// Save wordlist to file
function saveWordlist(wordlist, filename) {
    console.log(`${colors.magenta}💾 Saving wordlist to file...${colors.reset}`);
    
    try {
        // Create output directory if it doesn't exist
        const outputDir = './wordlists';
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        const filepath = path.join(outputDir, filename);
        const content = wordlist.join('\n');
        
        fs.writeFileSync(filepath, content, 'utf8');
        
        return filepath;
    } catch (error) {
        console.error(`${colors.red}❌ Error saving file: ${error.message}${colors.reset}`);
        return null;
    }
}

// Display results with beautiful formatting
function displayResults(wordlist, filepath, originalWords) {
    console.log(`\n${colors.bright}${colors.bgGreen}                    GENERATION COMPLETE!                    ${colors.reset}\n`);
    
    console.log(`${colors.cyan}📊 ${colors.bright}STATISTICS:${colors.reset}`);
    console.log(`${colors.white}┌─────────────────────────────────────────────────────────┐${colors.reset}`);
    console.log(`${colors.white}│ ${colors.yellow}Original words:      ${colors.bright}${originalWords.length.toString().padEnd(25)}${colors.white}│${colors.reset}`);
    console.log(`${colors.white}│ ${colors.green}Generated wordlist:  ${colors.bright}${wordlist.length.toString().padEnd(25)}${colors.white}│${colors.reset}`);
    console.log(`${colors.white}│ ${colors.blue}File location:       ${colors.bright}${path.basename(filepath).padEnd(25)}${colors.white}│${colors.reset}`);
    console.log(`${colors.white}│ ${colors.magenta}File size:           ${colors.bright}${(fs.statSync(filepath).size / 1024).toFixed(2)} KB${' '.repeat(15)}${colors.white}│${colors.reset}`);
    console.log(`${colors.white}└─────────────────────────────────────────────────────────┘${colors.reset}`);
    
    console.log(`\n${colors.green}${colors.bright}✅ SUCCESS: ${colors.white}Wordlist saved to: ${colors.cyan}${filepath}${colors.reset}`);
    
    // Show sample words
    console.log(`\n${colors.yellow}📋 Sample generated words:${colors.reset}`);
    const sampleWords = wordlist.slice(0, 10);
    sampleWords.forEach((word, index) => {
        console.log(`${colors.dim}${(index + 1).toString().padStart(2)}: ${colors.white}${word}${colors.reset}`);
    });
    
    if (wordlist.length > 10) {
        console.log(`${colors.dim}... and ${wordlist.length - 10} more words${colors.reset}`);
    }
    
    console.log(`\n${colors.bright}${colors.green}🎉 Happy wordlist hunting! 🎉${colors.reset}\n`);
}

// Main execution function
async function main() {
    try {
        displayBanner();
        
        const words = await collectWords();
        
        if (words.length === 0) {
            console.log(`${colors.red}❌ No words entered. Exiting...${colors.reset}`);
            return;
        }
        
        console.log(`\n${colors.green}✅ Collected ${words.length} base words: ${colors.yellow}${words.join(', ')}${colors.reset}\n`);
        
        const wordlist = generateWordlist(words);
        const filename = generateFilename();
        const filepath = saveWordlist(wordlist, filename);
        
        if (filepath) {
            displayResults(wordlist, filepath, words);
        }
        
    } catch (error) {
        console.error(`${colors.red}❌ Fatal error: ${error.message}${colors.reset}`);
    }
}

// Run the tool
if (require.main === module) {
    main();
}

module.exports = { generateWordlist, collectWords };
