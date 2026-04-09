const { defineConfig } = require("cypress");
require('dotenv').config(); 

module.exports = defineConfig({
  e2e: {
        reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
      charts: true
    },
    env: {
      
      BASE_URL: process.env.BASE_URL,
    },
    setupNodeEvents(on, config) {
      return config;
    },
  },
  
    chromeWebSecurity: false,

});
