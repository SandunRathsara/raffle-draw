// Favicon script to handle light/dark mode
(function() {
  // Check for dark mode preference
  function updateFavicon() {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const faviconLink = document.querySelector('link[rel="icon"]');
    
    if (faviconLink) {
      faviconLink.href = isDarkMode ? '/favicon-dark.svg' : '/favicon.svg';
    }
  }
  
  // Update favicon initially
  updateFavicon();
  
  // Listen for changes in color scheme preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);
  }
})(); 