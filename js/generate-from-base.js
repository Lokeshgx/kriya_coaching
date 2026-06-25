#!/usr/bin/env node
/**
 * HTML Base Template Generator (moved to js/)
 *
 * This script updates all HTML pages to use the same common head and scripts from pages/base.html
 * It extracts common sections from pages/base.html and applies them to all pages
 *
 * Usage: node js/generate-from-base.js
 */

const fs = require('fs');
const path = require('path');

// Define the pages and their page-specific CSS and JS
const pages = [
    {
        file: 'index.html',  // Root level
        css: ['./css/home.css'],
        js: ['./js/home.js']
    },
    {
        file: 'pages/achievements.html',
        css: ['../css/achievements.css'],
        js: ['../js/achievements.js']
    },
    {
        file: 'pages/contact.html',
        css: ['../css/contact.css'],
        js: ['../js/contact.js']
    },
    {
        file: 'pages/courses.html',
        css: ['../css/courses.css'],
        js: ['../js/courses.js']
    },
    {
        file: 'pages/faculty.html',
        css: ['../css/faculty.css'],
        js: ['../js/faculty.js']
    },
    {
        file: 'pages/gallery.html',
        css: ['../css/gallery.css'],
        js: ['../js/gallery.js']
    },
    {
        file: 'pages/services.html',
        css: ['../css/services.css'],
        js: ['../js/services.js']
    },
    {
        file: 'pages/service-description.html',
        css: ['../css/service-description.css'],
        js: ['../js/service-description.js']
    },
    {
        file: 'pages/testimonials.html',
        css: ['../css/testimonials.css'],
        js: ['../js/testimonials.js']
    },
    {
        file: 'pages/who-are-we.html',
        css: ['../css/who-are-we.css'],
        js: ['../js/who-are-we.js']
    }
];

// Resolve base.html inside pages/
function getCommonHead() {
    const baseFile = path.resolve(__dirname, '..', 'pages', 'base.html');
    const content = fs.readFileSync(baseFile, 'utf-8');

    // Extract from meta charset to common custom CSS
    const startMarker = '<!-- Meta Tags -->';
    const endMarker = '<!-- ===== PAGE-SPECIFIC CSS';

    const startIdx = content.indexOf(startMarker);
    const endIdx = content.indexOf(endMarker);

    if (startIdx === -1 || endIdx === -1) {
        console.error('Could not find head section markers in pages/base.html');
        process.exit(1);
    }

    return content.substring(startIdx, endIdx);
}

function getCommonScripts() {
    const baseFile = path.resolve(__dirname, '..', 'pages', 'base.html');
    const content = fs.readFileSync(baseFile, 'utf-8');

    // Extract from Bootstrap JS to Common JS
    const startMarker = '<!-- Bootstrap JS -->';
    const endMarker = '<!-- ===== PAGE-SPECIFIC SCRIPTS';

    const startIdx = content.indexOf(startMarker);
    const endIdx = content.indexOf(endMarker);

    if (startIdx === -1 || endIdx === -1) {
        console.error('Could not find scripts section markers in pages/base.html');
        process.exit(1);
    }

    return content.substring(startIdx, endIdx);
}

function generatePageCSSImports(cssFiles) {
    if (!cssFiles || cssFiles.length === 0) return '';
    return '\n    <!-- ===== PAGE-SPECIFIC CSS ===== -->\n' +
           cssFiles.map(css => `    <link rel="stylesheet" href="${css}">`).join('\n') + '\n';
}

function generatePageJSImports(jsFiles) {
    if (!jsFiles || jsFiles.length === 0) return '';
    return '\n    <!-- ===== PAGE-SPECIFIC SCRIPTS ===== -->\n' +
           jsFiles.map(js => `    <script src="${js}"></script>`).join('\n') + '\n';
}

function updatePageFile(filePath, pageTitle, cssFiles, jsFiles) {
    const fullPath = path.resolve(__dirname, '..', filePath);

    if (!fs.existsSync(fullPath)) {
        console.warn(`⚠️  File not found: ${filePath}`);
        return;
    }

    const commonHead = getCommonHead();
    const commonScripts = getCommonScripts();
    const pageCSS = generatePageCSSImports(cssFiles);
    const pageJS = generatePageJSImports(jsFiles);

    const newContent = `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="description" content="${pageTitle} - Kriya Coaching Classes">\n\n    <title>${pageTitle}</title>\n\n    ${commonHead}${pageCSS}\n</head>\n<body>\n    <div id="header-container"></div>\n\n    <main id="main-content">\n        <!-- PAGE-SPECIFIC CONTENT PLACEHOLDER -->\n    </main>\n\n    <div id="footer-container"></div>\n\n    <!-- ===== COMMON SCRIPTS & LIBRARIES (from base.html) ===== -->\n    ${commonScripts}${pageJS}\n</body>\n</html>`;

    fs.writeFileSync(fullPath, newContent, 'utf-8');
    console.log(`✅ Updated: ${filePath}`);
}

console.log('🔄 Generating HTML pages from pages/base.html template...\n');

pages.forEach(page => {
    const pageTitle = page.file.replace('.html', '').replace('pages/', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    updatePageFile(page.file, pageTitle, page.css, page.js);
});

console.log('\n✅ All pages updated successfully!');
console.log("📝 Note: Remember to add your page-specific content back to each file's main section.");
