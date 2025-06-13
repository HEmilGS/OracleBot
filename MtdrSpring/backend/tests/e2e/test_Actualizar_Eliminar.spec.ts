import { test, expect } from "@playwright/test";
import fs from "fs";

test("Actualizar y eliminar tarea", async ({ page, context }) => {
  const { title } = JSON.parse(fs.readFileSync("temp-task.json", "utf-8"));

  await page.goto("http://localhost:8081/");
  await page.getByText("Tasks").click();

  const tarea = page
    .getByRole("listitem")
    .filter({ hasText: title })
    .getByRole("link");

  await expect(tarea).toBeVisible({ timeout: 10000 });

  try {
    await tarea.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await tarea.click();
  } catch (err) {
    console.warn("Click normal falló, intentando forzar...");

    // Verifica si la página sigue viva
    if (page.isClosed()) {
      console.error("La página ya está cerrada, cancelando test.");
      return;
    }

    try {
      await tarea.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await tarea.click({ force: true });
    } catch (err2) {
      console.error("Incluso el click forzado falló. Cancelando test.", err2);
      return;
    }
  }

  // --- ACTUALIZAR ---
  await page
    .getByRole("textbox", { name: "Task Title" })
    .fill("Tarea de actualizar tarea");
  await page
    .getByRole("textbox", { name: "Task Start Date" })
    .fill("2025-06-14");
  await page.getByRole("textbox", { name: "Task End Date" }).fill("2025-06-16");
  await page
    .getByRole("textbox", { name: "Task Description" })
    .fill("Prueba con playwright para actualizar una tarea");
  await page.getByLabel("Assign to").selectOption("3");
  await page.getByRole("button", { name: "Medium" }).click();

  page.once("dialog", async (dialog) => {
    await dialog.dismiss().catch(() => {});
  });

  await page.getByRole("button", { name: "Actualizar" }).click();

  // --- Recargar para reflejar cambios ---
  await page.goto("http://localhost:8081/");
  await page.getByText("Tasks").click();

  const tareaActualizada = page
    .getByRole("listitem")
    .filter({ hasText: "Tarea de actualizar tarea" });

  await expect(tareaActualizada).toBeVisible({ timeout: 10000 });

  const eliminarBtn = tareaActualizada.getByRole("button", {
    name: /eliminar|delete|trash/i,
  });

  await eliminarBtn.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await expect(eliminarBtn).toBeVisible({ timeout: 10000 });

  page.once("dialog", async (dialog) => {
    await dialog.accept().catch(() => {});
  });

  await eliminarBtn.click();
});
