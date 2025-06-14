import { test, expect } from "@playwright/test";
import { readFileSync } from "fs";
import path from "path";

test.describe("Gestión de tareas", () => {
  test("CT02 - Actualizar y eliminar una tarea existente", async ({
    page,
  }, testInfo) => {
    // Lee el título original
    const tempFile = path.resolve(
      __dirname,
      `titulo-tarea.${testInfo.project.name}.json`
    );
    const { taskTitle } = JSON.parse(readFileSync(tempFile, "utf-8"));

    await page.goto("/");
    await page.getByText("Tasks").click();

    // Espera la tarea original
    const tareaListItem = page
      .getByRole("listitem")
      .filter({ hasText: taskTitle });
    await expect(tareaListItem).toBeVisible({ timeout: 60000 });

    // Editar la tarea
    const linkEditar = tareaListItem.getByRole("link").first();
    await expect(linkEditar).toBeVisible({ timeout: 10000 });
    await linkEditar.click();

    // Espera campo título
    const tituloInput = page.getByRole("textbox", { name: "Task Title" });
    await expect(tituloInput).toBeVisible({ timeout: 20000 });

    // Actualiza datos
    const nuevoTitulo = `Tarea de actualizar ${Date.now()} [${testInfo.project.name}]`;
    await tituloInput.fill(nuevoTitulo);
    await page
      .getByRole("textbox", { name: "Task Start Date" })
      .fill("2025-02-12");
    await page
      .getByRole("textbox", { name: "Task End Date" })
      .fill("2025-03-12");
    await page
      .getByRole("textbox", { name: "Task Description" })
      .fill("Actualizada y lista para eliminar");
    await page.getByRole("button", { name: "High" }).click();
    await page.getByRole("button", { name: "Actualizar" }).click();

    // Reload de la lista
    await page.goto("/tasks");

    // Espera activa hasta que la lista tenga al menos un item (máx 20s)
    await expect(page.locator('li[role="listitem"]')).not.toHaveCount(0, {
      timeout: 20000,
    });

    // Espera activa hasta que el nuevo título aparezca en la lista (máx 40s)
    const updatedListItem = page
      .getByRole("listitem")
      .filter({ hasText: nuevoTitulo });
    await expect(updatedListItem).toBeVisible({ timeout: 40000 });

    // Log de TODOS los listitems tras reload
    const allItems = await page
      .locator('li[role="listitem"]')
      .allTextContents();
    allItems.forEach((txt, idx) => {
      console.log(`Listitem[${idx}]: ${txt}`);
    });

    // Eliminar (segundo botón, estándar)
    const botonEliminar = updatedListItem.getByRole("button").nth(1);
    page.once("dialog", async (dialog) => await dialog.accept());
    await botonEliminar.click();

    // Checa que ya no esté
    await expect(page.getByText(nuevoTitulo, { exact: true })).toHaveCount(0);
  });
});
