/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  timeout: 30 * 1000,

  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
  },

  webServer: {
    command: 'npm run dev',
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: false,
    env: {
      NEXT_PUBLIC_API_URL: 'http://localhost:8000',
    },
  },
};

module.exports = config;
