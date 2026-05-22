import { describe, it, expect } from "vitest";
import {
  calcularRanking,
  agruparMejorCalificacion,
} from "../composables/useRanking";
import type { Estudiante, Perfil } from "../types";

// Perfil de prueba
const PERFIL_TEST: Perfil = {
  id: "dev-web",
  nombre: "Desarrollador Web",
  icono: "💻",
  descripcion: "Test",
  cursos: ["PROG101"],
};

// 12 estudiantes únicos para probar el límite de 10
const mkEst = (id: number, cal: number): Estudiante => ({
  id,
  nombre: `Estudiante ${id}`,
  correo: `e${id}@uni.gt`,
  curso: "PROG101",
  calificacion: cal,
});
const DOCE_ESTUDIANTES: Estudiante[] = Array.from(
  { length: 12 },
  (_, i) => mkEst(i + 1, 100 - i * 3), // 100, 97, 94, ... 67
);

describe("U3 · calcularRanking (RF-03 + RF-04)", () => {
  it("devuelve máximo 10 candidatos", () => {
    const ranking = calcularRanking(DOCE_ESTUDIANTES, PERFIL_TEST);
    expect(ranking.length).toBeLessThanOrEqual(10);
  });

  it("ordena de mayor a menor calificación", () => {
    const ranking = calcularRanking(DOCE_ESTUDIANTES, PERFIL_TEST);
    for (let i = 0; i < ranking.length - 1; i++) {
      expect(ranking[i].promedio).toBeGreaterThanOrEqual(
        ranking[i + 1].promedio,
      );
    }
  });

  it("si un estudiante tiene calificaciones en varios cursos, usa la más alta", () => {
    const estudianteDuplicado: Estudiante[] = [
      {
        id: 1,
        nombre: "Pedro Ruiz",
        correo: "pedro@uni.gt",
        curso: "PROG101",
        calificacion: 70,
      },
      {
        id: 2,
        nombre: "Pedro Ruiz",
        correo: "pedro@uni.gt",
        curso: "PROG101",
        calificacion: 92,
      },
    ];
    const agrupados = agruparMejorCalificacion(estudianteDuplicado);
    expect(agrupados).toHaveLength(1);
    expect(agrupados[0].promedio).toBe(92);
  });
});
