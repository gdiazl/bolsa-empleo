import { describe, it, expect } from "vitest";
import { filtrarPorPerfil } from "../composables/useRanking";
import type { Estudiante } from "../types";

// Dataset mínimo y controlado — no depende de los archivos JSON
const ESTUDIANTES: Estudiante[] = [
  {
    id: 1,
    nombre: "Ana López",
    correo: "ana@uni.gt",
    curso: "PROG101",
    calificacion: 90,
  },
  {
    id: 2,
    nombre: "Luis Pérez",
    correo: "luis@uni.gt",
    curso: "BD101",
    calificacion: 85,
  },
  {
    id: 3,
    nombre: "María García",
    correo: "maria@uni.gt",
    curso: "PROG101",
    calificacion: 78,
  },
  {
    id: 4,
    nombre: "Juan Torres",
    correo: "juan@uni.gt",
    curso: "WEB301",
    calificacion: 95,
  },
];

describe("U2 · filtrarPorPerfil (RF-02)", () => {
  it("retorna solo los estudiantes cuyos cursos pertenecen al perfil", () => {
    const resultado = filtrarPorPerfil(ESTUDIANTES, ["PROG101", "WEB301"]);
    expect(resultado).toHaveLength(3);
    expect(resultado.map((e) => e.correo)).not.toContain("luis@uni.gt");
  });

  it("retorna lista vacía si ningún estudiante coincide con el perfil", () => {
    const resultado = filtrarPorPerfil(ESTUDIANTES, ["REDES101"]);
    expect(resultado).toHaveLength(0);
  });

  it("no muta el array original", () => {
    const copia = [...ESTUDIANTES];
    filtrarPorPerfil(ESTUDIANTES, ["PROG101"]);
    expect(ESTUDIANTES).toEqual(copia);
  });
});
