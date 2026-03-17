module.exports = {
  testDir: './tests',

  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    { name: 'Firefox', use: { browserName: 'firefox' } },
    { name: 'WebKit', use: { browserName: 'webkit' } }
  ],

  use: {
    screenshot: 'only-on-failure',
    trace: 'on-first-retry'
  },

  reporter: [['json', { outputFile: 'results.json' }]],
};