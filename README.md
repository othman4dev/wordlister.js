# 🚀 WordLister - Advanced Wordlist Generator

<div align="center">

```
                            __   ___                 __                                   
                           /\ \ /\_ \    __         /\ \__                   __           
 __  __  __    ___   _ __  \_\ \\//\ \  /\_\    ____\ \ ,_\    __   _ __    /\_\    ____  
/\ \/\ \/\ \  / __`\/\`'__\/'_` \ \ \ \ \/\ \  /',__\\ \ \/  /'__`\/\`'__\  \/\ \  /',__\ 
\ \ \_/ \_/ \/\ \L\ \ \ \//\ \L\ \ \_\ \_\ \ \/\__, `\\ \ \_/\  __/\ \ \/ __ \ \ \/\__, `\
 \ \___x___/'\ \____/\ \_\\ \___,_\/\____\\ \_\/\____/ \ \__\ \____\\ \_\/\_\_\ \ \/\____/
  \/__//__/   \/___/  \/_/ \/__,_ /\/____/ \/_/\/___/   \/__/\/____/ \/_/\/_/\ \_\ \/___/ 
                                                                            \ \____/      
                                                                             \/___/       

```

[![Node.js Version](https://img.shields.io/badge/node.js-%3E%3D%2014.0.0-brightgreen)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Linux%20%7C%20Windows%20%7C%20macOS-lightgrey)](https://github.com/yourusername/wordlister)
[![Status](https://img.shields.io/badge/status-Active-success)](https://github.com/yourusername/wordlister)

**A powerful, interactive wordlist generation tool for security research and penetration testing**

[Features](#-features) •
[Installation](#-installation) •
[Usage](#-usage) •
[Examples](#-examples) •
[Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [Examples](#-examples)
- [Configuration](#-configuration)
- [Output Format](#-output-format)
- [Performance](#-performance)
- [Contributing](#-contributing)
- [License](#-license)
- [Disclaimer](#-disclaimer)

---

## 🎯 Overview

WordLister is an advanced, interactive wordlist generation tool designed for security professionals, penetration testers, and researchers. It takes user-provided words and generates comprehensive wordlists with various combinations, mutations, and patterns commonly used in password attacks and security assessments.

### Why WordLister?

- **Interactive**: Beautiful CLI interface with colored output and progress bars
- **Comprehensive**: Generates thousands of combinations from a few base words
- **Smart**: Includes common password patterns and mutations
- **Efficient**: Memory-optimized with duplicate prevention
- **Professional**: Clean output with detailed statistics and file management

---

## ✨ Features

### 🎨 **Beautiful Interface**
- Colorful ASCII art banner
- Interactive word collection with readline
- Real-time progress bars
- Formatted statistics display
- Sample word preview

### 🔧 **Advanced Generation**
- **Base Variations**: Original, lowercase, uppercase, capitalized
- **Two-Word Combinations**: Multiple separator styles (_, -, .)
- **Three-Word Combinations**: Smart generation for smaller wordsets
- **Common Patterns**: Numbers (123, 2024, etc.), symbols (!@#$)
- **Smart Mutations**: Common suffixes (admin, user, test, 123)

### 📁 **File Management**
- Unique timestamped filenames
- Automatic directory creation (`./wordlists/`)
- Never overwrites existing files
- File size and statistics tracking

### ⚡ **Performance**
- Memory-efficient duplicate removal
- Smart limitations for large datasets
- Progress tracking for long operations
- Error handling and validation

---

## 🚀 Installation

### Prerequisites
- Node.js >= 14.0.0
- npm (comes with Node.js)

### Quick Install

```bash
# Clone the repository
git clone https://github.com/othman4dev/wordlister.js.git

# Navigate to directory
cd wordlister

# Make executable (Linux/macOS)
chmod +x wordlister.js

# Run the tool
node wordlister.js
```

### Alternative Installation

```bash
# Download single file
curl -O https://raw.githubusercontent.com/yourusername/wordlister/main/wordlister.js

# Run directly
node wordlister.js
```

---

## 🎮 Usage

### Basic Usage

```bash
node wordlister.js
```

### Interactive Mode

1. **Start the tool**: Run `node wordlister.js`
2. **Enter words**: Type words one by one when prompted
3. **Finish input**: Press Enter on empty line to start generation
4. **View results**: Check the generated statistics and file location

### Example Session

```
📝 Enter words/terms for wordlist generation:
💡 Tip: Enter one word per line, press Enter on empty line to finish

Word 1: admin
✓ Added: "admin"
Word 2: 2024
✓ Added: "2024"
Word 3: company
✓ Added: "company"
Word 4: [Enter to finish]

✅ Collected 3 base words: admin, 2024, company

🔄 Generating advanced wordlist combinations...
```

---

## 📊 Examples

### Sample Input
```
admin
2024
company
test
```

### Sample Output
```
📊 STATISTICS:
┌─────────────────────────────────────────────────────────┐
│ Original words:      4                                  │
│ Generated wordlist:  1,247                              │
│ File location:       wordlist_2025-06-03_14-30-25.txt  │
│ File size:           23.45 KB                           │
└─────────────────────────────────────────────────────────┘

📋 Sample generated words:
 1: admin
 2: ADMIN
 3: Admin
 4: admin123
 5: admin!
 6: admin2024
 7: admin_company
 8: admin-test
 9: 2024admin
10: companyadmin
... and 1,237 more words
```

### Generated Combinations Include:
- `admin`, `ADMIN`, `Admin`
- `admin123`, `admin!`, `admin2024`
- `admin_company`, `admin-test`
- `companyadmin`, `testcompany`
- `admin_company_test`
- And many more variations...

---

## ⚙️ Configuration

### File Output
- **Directory**: `./wordlists/`
- **Filename Format**: `wordlist_YYYY-MM-DD_HH-MM-SS.txt`
- **Encoding**: UTF-8
- **Line Ending**: Unix style (`\n`)

### Generation Limits
- **Three-word combinations**: Limited to ≤10 base words for performance
- **Pattern mutations**: Applied to first 100 combinations
- **Memory usage**: Optimized with Set-based deduplication

### Customization
You can modify the generation patterns by editing these arrays in the code:

```javascript
const commonNumbers = ['1', '12', '123', '2023', '2024', '2025', '01', '00'];
const commonSymbols = ['!', '@', '#', '$', '&', '*'];
const commonSuffixes = ['123', '!@#', '2024', 'admin', 'user', 'test'];
```

---

## 📈 Performance

### Benchmarks
| Base Words | Generated Words | Time | Memory |
|------------|-----------------|------|---------|
| 3 words    | ~500           | <1s  | <10MB  |
| 5 words    | ~2,000         | ~2s  | <25MB  |
| 10 words   | ~15,000        | ~10s | <100MB |

### Optimization Features
- **Duplicate Prevention**: Uses Set for O(1) duplicate checking
- **Memory Management**: Streams large datasets to prevent memory overflow
- **Smart Limits**: Automatically adjusts generation based on input size
- **Progress Tracking**: Real-time feedback on generation progress

---

## 🛡️ Security Use Cases

### Penetration Testing
- Custom wordlist generation for specific targets
- Company-specific password attacks
- Brute force preparation

### Security Research
- Password pattern analysis
- Dictionary attack preparation
- Social engineering wordlist creation

### Red Team Operations
- Target-specific wordlist generation
- OSINT-based password lists
- Custom attack dictionaries

---

## 🔧 Troubleshooting

### Common Issues

**Q: Tool doesn't start**
```bash
# Check Node.js version
node --version  # Should be >= 14.0.0

# Install Node.js if needed
# Visit: https://nodejs.org/
```

**Q: Permission denied (Linux/macOS)**
```bash
chmod +x wordlister.js
```

**Q: Large wordlists taking too long**
- Reduce number of base words
- The tool automatically limits three-word combinations for >10 words

**Q: Output directory not created**
- Check write permissions in current directory
- Tool will create `./wordlists/` automatically

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute
- 🐛 **Bug Reports**: Open an issue with details
- 💡 **Feature Requests**: Suggest new functionality
- 📝 **Documentation**: Improve README or code comments
- 🔧 **Code Improvements**: Submit pull requests

### Development Setup
```bash
# Fork the repository
git clone https://github.com/yourusername/wordlister.git
cd wordlister

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and test
node wordlister.js

# Commit and push
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
```

### Code Style
- Use 4 spaces for indentation
- Follow existing naming conventions
- Add comments for complex logic
- Test with various input sizes

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 WordLister Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## ⚠️ Disclaimer

**IMPORTANT**: This tool is designed for legitimate security research, penetration testing, and educational purposes only.

### Legal Notice
- Only use on systems you own or have explicit permission to test
- Respect all applicable laws and regulations
- Unauthorized access to computer systems is illegal
- Users are responsible for compliance with local laws

### Ethical Use
- Use for defensive security purposes
- Respect privacy and data protection
- Follow responsible disclosure practices
- Do not use for malicious activities

---

## 🌟 Acknowledgments

- **Contributors**: Thanks to all who have contributed to this project
- **Community**: Inspired by the security research community
- **Libraries**: Built with Node.js core modules for maximum compatibility

---

## 📞 Support

### Getting Help
- 📖 **Documentation**: Check this README first
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/wordlister/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/wordlister/discussions)

### Contact
- **Author**: [Your Name](https://github.com/yourusername)
- **Email**: your.email@example.com
- **Twitter**: [@yourusername](https://twitter.com/yourusername)

---

<div align="center">

**⭐ Star this repo if you find it useful! ⭐**

[🔝 Back to Top](#-wordlister---advanced-wordlist-generator)

Made with ❤️ for the security community

</div>
