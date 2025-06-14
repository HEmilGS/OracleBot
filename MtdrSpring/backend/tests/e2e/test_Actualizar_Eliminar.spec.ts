import { test, expect } from "@playwright/test";
import { readFileSync } from "fs";

test.describe("Gestión de tareas", () => {
  test("CT02 - Actualizar y eliminar una tarea existente", async ({ page }) => {
    const { taskTitle } = JSON.parse(
      readFileSync("tests/e2e/titulo-tarea.json", "utf-8")
    );

    await page.goto("http://localhost:8081/");
    await page.getByText("Tasks").click();

    // 🕒 Esperar a que aparezca la tarea específica
    await page.waitForSelector(`text=${taskTitle}`, { timeout: 60000 });
    await page.locator(`text=${taskTitle}`).first().click();

    // 📝 Actualizar tarea
    const nuevoTitulo = `Tarea de actualizar ${Date.now()}`;
    await expect(page.getByRole("textbox", { name: "Task Title" })).toBeVisible(
      { timeout: 10000 }
    );
    await page.getByRole("textbox", { name: "Task Title" }).fill(nuevoTitulo);
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

    // 🔙 Volver a lista y eliminarla
    await page.goto("http://localhost:8081/tasks");
    await page.waitForSelector(`text=${nuevoTitulo}`, { timeout: 60000 });

    const tarea = page.locator(`text=${nuevoTitulo}`).first();
    const botonEliminar = tarea.locator("button").nth(1);

    page.once("dialog", async (dialog) => await dialog.accept());
    await botonEliminar.click();

    // ✅ Verificar que ya no esté
    await expect(page.locator(`text=${nuevoTitulo}`)).toHaveCount(0);
  });
});


/*import { test, expect } from "@playwright/test";
import fs from "fs";

test.describe("Módulo de Tareas - Actualizar y Eliminar", () => {
  test("CT02 - Actualizar y eliminar una tarea existente @actualizar @eliminar @tareas", async ({ page }) => {
    const { title } = JSON.parse(fs.readFileSync("temp-task.json", "utf-8"));

    await page.goto("http://localhost:8081/");
    await page.getByText("Tasks").click();

    const tarea = page.getByRole("listitem").filter({ hasText: title }).getByRole("link");
    await expect(tarea).toBeVisible({ timeout: 10000 });

    try {
      await tarea.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await tarea.click();
    } catch (err) {
      if (page.isClosed()) return;
      await tarea.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await tarea.click({ force: true });
    }

    await page.getByRole("textbox", { name: "Task Title" }).fill("Tarea de actualizar tarea");
    await page.getByRole("textbox", { name: "Task Start Date" }).fill("2025-06-14");
    await page.getByRole("textbox", { name: "Task End Date" }).fill("2025-06-16");
    await page.getByRole("textbox", { name: "Task Description" }).fill("Prueba con playwright para actualizar una tarea");
    await page.getByLabel("Assign to").selectOption("3");
    await page.getByRole("button", { name: "Medium" }).click();

    page.once("dialog", async (dialog) => await dialog.dismiss().catch(() => {}));
    await page.getByRole("button", { name: "Actualizar" }).click();

    await page.goto("http://localhost:8081/");
    await page.getByText("Tasks").click();

    const tareaActualizada = page.getByRole("listitem").filter({ hasText: "Tarea de actualizar tarea" });
    await expect(tareaActualizada).toBeVisible({ timeout: 10000 });

    const eliminarBtn = tareaActualizada.getByRole("button", {
      name: /eliminar|delete|trash/i,
    });

    await eliminarBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(eliminarBtn).toBeVisible({ timeout: 10000 });

    page.once("dialog", async (dialog) => await dialog.accept().catch(() => {}));
    await eliminarBtn.click();
  });
});
*/