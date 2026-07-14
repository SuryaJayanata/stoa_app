const fs = require('fs');
const path = require('path');

function processDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Remove JSX single-line comments: {/* comment */}
            // This regex matches optional whitespace, the comment, optional whitespace, and optional newline
            content = content.replace(/^[ \t]*\{\/\*.*?\*\/\}[ \t]*\r?\n/gm, ''); // Whole line JSX comment
            content = content.replace(/\{\/\*.*?\*\/\}/g, ''); // Inline JSX comment
            
            // Remove JS single-line comments: // comment 
            // Whole line JS comment
            content = content.replace(/^[ \t]*\/\/.*?\r?\n/gm, '');
            // Inline JS comment (not preceded by :)
            content = content.replace(/[ \t]+(?<!:)\/\/.*$/gm, '');

            fs.writeFileSync(fullPath, content, 'utf8');
        }
    });
}
processDir('c:\\Users\\hallo\\Music\\stoa_app\\src');
