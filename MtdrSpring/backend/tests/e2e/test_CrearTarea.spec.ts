import { test, expect } from "@playwright/test";
import fs from "fs";

test.describe("Crear Tarea", () => {
  test("CT01 - Crear una nueva tarea desde la vista de tareas", async ({
    page,
  }) => {
    const uniqueTitle = `Tarea de crear tarea ${Date.now()}`;

    // Guardar el título en un archivo temporal
    fs.writeFileSync("temp-task.json", JSON.stringify({ title: uniqueTitle }));

    await page.goto("http://localhost:8081/");
    await page.getByText("Tasks").click();
    await page.getByRole("button", { name: "Create Task" }).click();

    // Completar formulario
    await page.getByRole("textbox", { name: "Task Title" }).fill(uniqueTitle);
    await page
      .getByRole("textbox", { name: "Task Start Date" })
      .fill("2025-06-12");
    await page
      .getByRole("textbox", { name: "Task End Date" })
      .fill("2025-06-13");
    await page
      .getByRole("textbox", { name: "Task Description" })
      .fill("Prueba con Playwright para crear una tarea");
    await page.getByLabel("Assign to").selectOption("2");
    await page
      .getByRole("spinbutton", { name: "Tiempo Estimado (horas)" })
      .fill("2");
    await page
      .getByRole("spinbutton", { name: "Tiempo Real (horas)" })
      .fill("4");
    await page.getByRole("button", { name: "High" }).click();

    page.once("dialog", (dialog) => dialog.dismiss().catch(() => {}));
    await page.getByRole("button", { name: "Create" }).click();

    // Verificar visibilidad
    await expect(
      page.locator("li").filter({ hasText: uniqueTitle }).first()
    ).toBeVisible();
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
