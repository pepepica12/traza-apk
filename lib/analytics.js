/**
 * Vercel Web Analytics Integration
 * 
 * This module provides utilities for integrating Vercel Web Analytics
 * into an Express application.
 * 
 * Usage:
 * - Use getAnalyticsScript() to get the analytics script tag for inclusion in HTML responses
 * - The script will automatically track page views and send data to Vercel
 */

/**
 * Returns the HTML script tag for Vercel Web Analytics
 * This should be included in HTML responses, typically in the <body> or <head> tag
 * 
 * @returns {string} The analytics script HTML
 */
export function getAnalyticsScript() {
  return `<script>
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  </script>
  <script defer src="/_vercel/insights/script.js"></script>`;
}

/**
 * Middleware to automatically inject analytics script into HTML responses
 * 
 * Usage:
 * app.use(analyticsMiddleware());
 * 
 * @returns {Function} Express middleware function
 */
export function analyticsMiddleware() {
  return (req, res, next) => {
    // Store the original res.send method
    const originalSend = res.send;

    // Override res.send to inject analytics script into HTML responses
    res.send = function(data) {
      // Check if response is HTML
      const contentType = res.getHeader('content-type') || '';
      if (contentType.includes('text/html') && typeof data === 'string') {
        // Inject analytics script before closing body tag
        data = data.replace('</body>', getAnalyticsScript() + '</body>');
        data = data.replace('</html>', '</html>'); // fallback if no body tag
      }

      // Call the original send method
      return originalSend.call(this, data);
    };

    next();
  };
}
