const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({

env: {
    baseUrl: "https://www.tractorjunction.com/",
  },

retries: {
    runMode: 1,
    openMode: 0,
  }, 

e2e: {
    chromeWebSecurity: false,
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,

    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureWriter(on, config);
      return config;
    },

  specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

  },
  
});
