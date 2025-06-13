import { test, expect } from "@playwright/test";

test("Actualizar y eliminar tarea", async ({ page }) => {
  await page.goto("http://localhost:8081/");
  await page.getByText("Tasks").click();

  const tarea = page
    .getByRole("listitem")
    .filter({ hasText: "Tarea de crear tarea" })
    .getByRole("link");

  await expect(tarea).toBeVisible();
  await tarea.click();

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

  // Manejar diálogo (solo una vez)
  page.once("dialog", async (dialog) => {
    await dialog.dismiss().catch(() => {});
  });

  await page.getByRole("button", { name: "Actualizar" }).click();

  // --- Recargar para reflejar los cambios ---
  await page.goto("http://localhost:8081/");
  await page.getByText("Tasks").click();

  // --- ELIMINAR ---
  const eliminarBtn = page
    .getByRole("listitem")
    .filter({ hasText: "Tarea de actualizar tarea" })
    .getByRole("button", { name: /eliminar|delete|trash/i });

  await expect(eliminarBtn).toBeVisible();

  // Manejar diálogo de confirmación (una sola vez)
  page.once("dialog", async (dialog) => {
    await dialog.accept().catch(() => {});
  });

  await eliminarBtn.click();
});
