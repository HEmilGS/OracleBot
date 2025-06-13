import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30 * 1000,
  use: {
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    baseURL: "http://localhost:5173",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "Pixel 5", use: { ...devices["Pixel 5"] } },
  ],
});
