import { test, expect, chromium, firefox, webkit } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

// ─── RNF-02: Compatibilidad de navegadores ───────────────────────────────────

const BASE_URL = "http://localhost:5173"; // ajusta si usas otro puerto

const browsers = [
  { name: "Chromium (Chrome)", launcher: chromium },
  { name: "Firefox", launcher: firefox },
  { name: "WebKit (Safari)", launcher: webkit },
];

for (const { name, launcher } of browsers) {
  test(`RNF-02 | ${name} — carga la app y el buscador funciona`, async () => {
    const browser = await launcher.launch();
    const page = await browser.newPage();

    // 1. La app carga sin errores
    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    await expect(page).toHaveTitle(/.+/); // tiene título

    // 2. El selector de perfiles está visible
    const selector = page
      .locator('select, [data-testid="perfil-select"]')
      .first();
    await expect(selector).toBeVisible();

    // 3. Seleccionar un perfil genera resultados
    await selector.selectOption({ index: 1 });
    const cards = page.locator(
      '[data-testid="student-card"], .student-card, li',
    );
    await expect(cards.first()).toBeVisible({ timeout: 3000 }); // RNF-01 implícito

    // 4. No hay errores JS en consola
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.reload({ waitUntil: "networkidle" });
    expect(errors.length).toBe(0);

    await browser.close();
  });
}

// ─── RNF-03: Mantenibilidad — separación lógica/presentación ─────────────────

test("RNF-03 | Estructura modular: lógica de negocio separada de la presentación", () => {
  const srcDir = path.resolve(__dirname, "../../src");

  // 1. Existe carpeta de composables (lógica de negocio)
  const composablesDir = path.join(srcDir, "composables");
  expect(fs.existsSync(composablesDir)).toBe(true);

  // 2. Existe carpeta de componentes (presentación)
  const componentsDir = path.join(srcDir, "components");
  expect(fs.existsSync(componentsDir)).toBe(true);

  // 3. El composable de ranking existe y es un .ts puro (sin <template>)
  const composableFiles = fs.readdirSync(composablesDir);
  const rankingFile = composableFiles.find(
    (f) =>
      f.toLowerCase().includes("ranking") ||
      f.toLowerCase().includes("filtrar"),
  );
  expect(rankingFile).toBeDefined();

  const rankingContent = fs.readFileSync(
    path.join(composablesDir, rankingFile!),
    "utf-8",
  );
  // No debe tener etiquetas de template (es lógica pura)
  expect(rankingContent).not.toContain("<template>");
  expect(rankingContent).not.toContain("<style>");

  // 4. BuscadorTalento.vue existe en componentes (presentación)
  const buscadorPath = path.join(componentsDir, "BuscadorTalento.vue");
  expect(fs.existsSync(buscadorPath)).toBe(true);

  const buscadorContent = fs.readFileSync(buscadorPath, "utf-8");
  // Sí debe tener template (es presentación)
  expect(buscadorContent).toContain("<template>");
  // No debe tener la lógica de filtrado hardcodeada aquí
  expect(buscadorContent).not.toMatch(/\.sort\s*\(.*calificacion/);
});
