import { describe, it, expect } from "vitest";
import estudiantes from "../data/estudiantes.json";
import perfiles from "../data/perfiles.json";

describe("U1 · Carga de datos JSON (RF-06)", () => {
  it("estudiantes.json carga y tiene la forma correcta", () => {
    expect(Array.isArray(estudiantes)).toBe(true);
    expect(estudiantes.length).toBeGreaterThan(0);

    // Verifica que cada objeto tenga los campos requeridos
    for (const e of estudiantes) {
      expect(e).toHaveProperty("id");
      expect(e).toHaveProperty("nombre");
      expect(e).toHaveProperty("correo");
      expect(e).toHaveProperty("curso");
      expect(typeof e.calificacion).toBe("number");
      expect(e.calificacion).toBeGreaterThanOrEqual(0);
      expect(e.calificacion).toBeLessThanOrEqual(100);
    }
  });

  it("perfiles.json carga con al menos 5 perfiles (RF-01)", () => {
    expect(Array.isArray(perfiles)).toBe(true);
    expect(perfiles.length).toBeGreaterThanOrEqual(5);

    for (const p of perfiles) {
      expect(p).toHaveProperty("id");
      expect(p).toHaveProperty("nombre");
      expect(Array.isArray(p.cursos)).toBe(true);
      expect(p.cursos.length).toBeGreaterThan(0);
    }
  });

  it("todos los cursos referenciados en perfiles existen en estudiantes", () => {
    const cursosEnDatos = new Set(estudiantes.map((e) => e.curso));
    for (const perfil of perfiles) {
      for (const curso of perfil.cursos) {
        expect(
          cursosEnDatos.has(curso),
          `Curso "${curso}" del perfil "${perfil.nombre}" no tiene estudiantes`,
        ).toBe(true);
      }
    }
  });
});
