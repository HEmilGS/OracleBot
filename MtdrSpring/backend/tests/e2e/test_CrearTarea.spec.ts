import { test, expect } from "@playwright/test";
import { writeFileSync } from "fs";
import path from "path";

test.describe("Gestión de tareas", () => {
  test("CT01 - Crear una nueva tarea con prioridad media", async ({
    page,
  }, testInfo) => {
    await page.goto("/");
    await page.getByText("Tasks").click();
    await page.getByRole("link", { name: "Create Task" }).click();

    const timestamp = Date.now();
    const taskTitle = `Tarea de crear tarea ${timestamp} [${testInfo.project.name}]`;

    await page.getByRole("textbox", { name: "Task Title" }).fill(taskTitle);
    await page
      .getByRole("textbox", { name: "Task Start Date" })
      .fill("2004-02-12");
    await page
      .getByRole("textbox", { name: "Task End Date" })
      .fill("2004-03-12");

    await page
      .getByRole("textbox", { name: "Task Description" })
      .fill(taskTitle);

    await page.getByLabel("Assign to").selectOption("3");

    await page
      .getByRole("spinbutton", { name: "Tiempo Estimado (horas)" })
      .fill("1");
    await page
      .getByRole("spinbutton", { name: "Tiempo Real (horas)" })
      .fill("2");

    await page.getByRole("button", { name: "Medium" }).click();
    await page.getByRole("button", { name: "Create" }).click();

    // 💾 Guarda el título usando el nombre del proyecto/browser
    const tempFile = path.resolve(
      __dirname,
      `titulo-tarea.${testInfo.project.name}.json`
    );
    writeFileSync(tempFile, JSON.stringify({ taskTitle }), "utf-8");
  });
});
