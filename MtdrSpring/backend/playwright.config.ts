import { defineConfig, devices } from "@playwright/test";
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: "./tests/e2e", // O './tests' si prefieres incluir todos
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: "http://localhost:8081", // Puedes cambiarlo por el que necesites
    screenshot: "only-on-failure",
    trace: "on",
    video: {
      mode: "on",
      size: { width: 1280, height: 720 },
    },
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Pixel 5",
      use: { ...devices["Pixel 5"] },
    },
    // Puedes descomentar otros navegadores o dispositivos si los necesitas
    // {
    //   name: 'iPhone 12',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  // Si usas un servidor de desarrollo local antes de correr los tests:
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:8081',
  //   reuseExistingServer: !process.env.CI,
  // },
});
