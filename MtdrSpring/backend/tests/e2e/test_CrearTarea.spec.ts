import { test, expect } from "@playwright/test";
import { writeFileSync } from "fs";

test.describe("Gestión de tareas", () => {
  test("CT01 - Crear una nueva tarea con prioridad media", async ({ page }) => {
    await page.goto("http://localhost:8081/");
    await page.getByText("Tasks").click();
    await page.getByRole("link", { name: "Create Task" }).click();

    const timestamp = Date.now();
    const taskTitle = `Tarea de crear tarea ${timestamp}`;

    await page.getByRole("textbox", { name: "Task Title" }).click();
    await page.getByRole("textbox", { name: "Task Title" }).press("CapsLock");
    await page.getByRole("textbox", { name: "Task Title" }).fill(taskTitle);

    await page
      .getByRole("textbox", { name: "Task Start Date" })
      .fill("2004-02-12");
    await page
      .getByRole("textbox", { name: "Task End Date" })
      .fill("2004-03-12");

    await page.getByRole("textbox", { name: "Task Description" }).click();
    await page
      .getByRole("textbox", { name: "Task Description" })
      .press("CapsLock");
    await page
      .getByRole("textbox", { name: "Task Description" })
      .fill(taskTitle);

    await page.getByLabel("Assign to").selectOption("3");

    await page
      .getByRole("spinbutton", { name: "Tiempo Estimado (horas)" })
      .click();
    await page
      .getByRole("spinbutton", { name: "Tiempo Estimado (horas)" })
      .fill("1");

    await page.getByRole("spinbutton", { name: "Tiempo Real (horas)" }).click();
    await page
      .getByRole("spinbutton", { name: "Tiempo Real (horas)" })
      .fill("2");

    await page.getByRole("button", { name: "Medium" }).click();
    await page.getByRole("button", { name: "Create" }).click();

    // 💾 Guardar el título en un archivo temporal para el siguiente test
    writeFileSync("tests/e2e/titulo-tarea.json", JSON.stringify({ taskTitle }));
  });
});

/*
import { test, expect } from "@playwright/test";
import fs from "fs";

test.describe("Módulo de Tareas - Crear", () => {
  test("CT01 - Crear una nueva tarea desde la vista de tareas @crear @tareas", async ({ page }) => {
    const uniqueTitle = `Tarea de crear tarea ${Date.now()}`;
    fs.writeFileSync("temp-task.json", JSON.stringify({ title: uniqueTitle }));

    await page.goto("http://localhost:8081/");
    await page.getByText("Tasks").click();
    await page.getByRole("button", { name: "Create Task" }).click();

    await page.getByRole("textbox", { name: "Task Title" }).fill(uniqueTitle);
    await page.getByRole("textbox", { name: "Task Start Date" }).fill("2025-06-12");
    await page.getByRole("textbox", { name: "Task End Date" }).fill("2025-06-13");
    await page.getByRole("textbox", { name: "Task Description" }).fill("Prueba con Playwright para crear una tarea");
    await page.getByLabel("Assign to").selectOption("2");
    await page.getByRole("spinbutton", { name: "Tiempo Estimado (horas)" }).fill("2");
    await page.getByRole("spinbutton", { name: "Tiempo Real (horas)" }).fill("4");
    await page.getByRole("button", { name: "High" }).click();

    page.once("dialog", (dialog) => dialog.dismiss().catch(() => {}));
    await page.getByRole("button", { name: "Create" }).click();

    await expect(page.locator("li").filter({ hasText: uniqueTitle }).first()).toBeVisible();
  });
});

*/
