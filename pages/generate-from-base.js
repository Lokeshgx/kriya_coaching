#!/usr/bin/env node
/**
 * HTML Base Template Generator
 * 
 * This script updates all HTML pages to use the same common head and scripts from base.html
 * It extracts common sections from base.html and applies them to all pages
 * 
 * Usage: node generate-from-base.js
 */

const fs = require('fs');
const path = require('path');

// Define the pages and their page-specific CSS and JS
const pages = [
    {
        file: '../index.html',  // Root level
        css: ['./css/home.css'],
        js: ['./js/home.js']
    },
    {
        file: 'achievements.html',
        css: ['../css/achievements.css'],
        js: ['../js/achievements.js']
    },
    {
        file: 'contact.html',
        css: ['../css/contact.css'],
        js: ['../js/contact.js']
    },
    {
        file: 'courses.html',
        css: ['../css/courses.css'],
        js: ['../js/courses.js']
    },
    {
        file: 'faculty.html',
        css: ['../css/faculty.css'],
        js: ['../js/faculty.js']
    },
    {
        file: 'gallery.html',
        css: ['../css/gallery.css'],
        js: ['../js/gallery.js']
    },
    {
        file: 'services.html',
        css: ['../css/services.css'],
        js: ['../js/services.js']
    },
    {
        file: 'service-description.html',
        css: ['../css/service-description.css'],
        js: ['../js/service-description.js']
    },
    {
        file: 'testimonials.html',
        css: ['../css/testimonials.css'],
        js: ['../js/testimonials.js']
    },
    {
        file: 'who-are-we.html',
        css: ['../css/who-are-we.css'],
        js: ['../js/who-are-we.js']
    }
];

// Extract common head from base.html
function getCommonHead() {
    const baseFile = './base.html';
    const content = fs.readFileSync(baseFile, 'utf-8');
    
    // Extract from meta charset to common custom CSS
    const startMarker = '<!-- Meta Tags -->';
    const endMarker = '<!-- ===== PAGE-SPECIFIC CSS';
    
    const startIdx = content.indexOf(startMarker);
    const endIdx = content.indexOf(endMarker);
    
    if (startIdx === -1 || endIdx === -1) {
        console.error('Could not find head section markers in base.html');
        process.exit(1);
    }
    
    return content.substring(startIdx, endIdx);
}

// Extract common scripts from base.html
function getCommonScripts() {
    const baseFile = './base.html';
    const content = fs.readFileSync(baseFile, 'utf-8');
    
    // Extract from Bootstrap JS to Common JS
    const startMarker = '<!-- Bootstrap JS -->';
    const endMarker = '<!-- ===== PAGE-SPECIFIC SCRIPTS';
    
    const startIdx = content.indexOf(startMarker);
    const endIdx = content.indexOf(endMarker);
    
    if (startIdx === -1 || endIdx === -1) {
        console.error('Could not find scripts section markers in base.html');
        process.exit(1);
    }
    
    return content.substring(startIdx, endIdx);
}

// Generate page-specific CSS imports
function generatePageCSSImports(cssFiles) {
    if (cssFiles.length === 0) return '';
    return '\n    <!-- ===== PAGE-SPECIFIC CSS ===== -->\n' + 
           cssFiles.map(css => `    <link rel="stylesheet" href="${css}">`).join('\n') + '\n';
}

// Generate page-specific JS imports
function generatePageJSImports(jsFiles) {
    if (jsFiles.length === 0) return '';
    return '\n    <!-- ===== PAGE-SPECIFIC SCRIPTS ===== -->\n' + 
           jsFiles.map(js => `    <script src="${js}"><\/script>`).join('\n') + '\n';
}

// Update a page file
function updatePageFile(filePath, pageTitle, cssFiles, jsFiles) {
    const fullPath = path.join(__dirname, filePath);
    
    if (!fs.existsSync(fullPath)) {
        console.warn(`⚠️  File not found: ${filePath}`);
        return;
    }
    
    const commonHead = getCommonHead();
    const commonScripts = getCommonScripts();
    const pageCSS = generatePageCSSImports(cssFiles);
    const pageJS = generatePageJSImports(jsFiles);
    
    // Build new page content
    const newContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${pageTitle} - Kriya Coaching Classes">
    
    <title>${pageTitle}</title>
    
    ${commonHead}${pageCSS}
</head>
<body>
    <div id="header-container"></div>

    <main id="main-content">
        <!-- PAGE-SPECIFIC CONTENT PLACEHOLDER -->
    </main>

    <div id="footer-container"></div>

    <!-- ===== COMMON SCRIPTS & LIBRARIES (from base.html) ===== -->
    ${commonScripts}${pageJS}
</body>
</html>`;
    
    // Write back to file
    fs.writeFileSync(fullPath, newContent, 'utf-8');
    console.log(`✅ Updated: ${filePath}`);
}

// Main execution
console.log('🔄 Generating HTML pages from base.html template...\n');

pages.forEach(page => {
    const pageTitle = page.file.replace('.html', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    updatePageFile(page.file, pageTitle, page.css, page.js);
});

console.log('\n✅ All pages updated successfully!');
console.log('📝 Note: Remember to add your page-specific content back to each file\'s main section.');
