const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://csgoroll-www-master-h7r4kpopga-uc.a.run.app/dice',
    viewportWidth: 1400,
    viewportHeight: 1000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
