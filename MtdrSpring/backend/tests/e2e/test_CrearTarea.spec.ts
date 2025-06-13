import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:8081/");
  await page.getByText("Tasks").click();
  await page.getByRole("button", { name: "Create Task" }).click();
  await page.getByRole("textbox", { name: "Task Title" }).click();
  await page.getByRole("textbox", { name: "Task Title" }).press("CapsLock");
  await page
    .getByRole("textbox", { name: "Task Title" })
    .fill("Tarea de crear tarea ");
  await page
    .getByRole("textbox", { name: "Task Start Date" })
    .fill("2025-06-12");
  await page.getByRole("textbox", { name: "Task End Date" }).fill("2025-06-13");
  await page.getByRole("textbox", { name: "Task Description" }).click();
  await page
    .getByRole("textbox", { name: "Task Description" })
    .press("CapsLock");
  await page
    .getByRole("textbox", { name: "Task Description" })
    .fill("Prueba con playwright para crear una tarea ");
  await page.getByLabel("Assign to").selectOption("2");
  await page
    .getByRole("spinbutton", { name: "Tiempo Estimado (horas)" })
    .click();
  await page
    .getByRole("spinbutton", { name: "Tiempo Estimado (horas)" })
    .fill("2");
  await page.getByRole("spinbutton", { name: "Tiempo Real (horas)" }).click();
  await page.getByRole("spinbutton", { name: "Tiempo Real (horas)" }).fill("4");
  await page.getByRole("button", { name: "High" }).click();
  await page.getByRole("button", { name: "Create" }).click();
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page
    .getByRole("listitem")
    .filter({ hasText: "Tarea de crear tarea #375 |" })
    .getByRole("button")
    .first()
    .click();
});
