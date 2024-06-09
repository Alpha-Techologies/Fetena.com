// playwright.config.js
module.exports = {
    testDir: '../test', // Directory where test files are located
    timeout: 30000,     // Timeout for each test
    use: {
      headless: true,  // Run tests in headless mode
      baseURL: import.meta.env.VITE_API_URL, // Base URL for the application under test
    },
  };
  