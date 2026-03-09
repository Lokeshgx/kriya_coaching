/**
 * Base Template Loader
 * This script automatically includes common head content and scripts from base files
 * Inject this in the <head> early and it will load common-head.html
 * Call loadCommonScripts() before closing </body> to load common-scripts.html
 */

(function() {
    'use strict';
    
    // Load common head content
    function loadCommonHead() {
        fetch('./common-head.html')
            .then(response => response.text())
            .then(html => {
                // Insert common head content after existing meta tags
                const headElement = document.head;
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                
                // Move all elements from temp div to head
                Array.from(tempDiv.childNodes).forEach(node => {
                    headElement.appendChild(node);
                });
            })
            .catch(error => console.error('Error loading common head:', error));
    }
    
    // Load common scripts before closing body
    function loadCommonScripts() {
        fetch('./common-scripts.html')
            .then(response => response.text())
            .then(html => {
                // Insert common scripts at end of body
                const bodyElement = document.body;
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                
                // Move all elements from temp div to body
                Array.from(tempDiv.childNodes).forEach(node => {
                    bodyElement.appendChild(node);
                });
            })
            .catch(error => console.error('Error loading common scripts:', error));
    }
    
    // Expose functions globally
    window.loadCommonHead = loadCommonHead;
    window.loadCommonScripts = loadCommonScripts;
    
    // Auto-load common head on script load
    loadCommonHead();
})();
