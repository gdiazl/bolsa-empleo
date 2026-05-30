// src/composables/useRanking.ts
import type { Estudiante, Perfil, CandidatoRanking } from "../types";

/** RF-02: filtra solo los registros cuyo curso pertenece al perfil */
export function filtrarPorPerfil(
  estudiantes: Estudiante[],
  cursosDelPerfil: string[],
): Estudiante[] {
  return estudiantes.filter((e) => cursosDelPerfil.includes(e.curso));
}

/** Deduplica por correo, conservando la calificación más alta */
export function agruparMejorCalificacion(
  estudiantes: Estudiante[],
): CandidatoRanking[] {
  const mapa = new Map<string, CandidatoRanking>();
  for (const est of estudiantes) {
    const entry = mapa.get(est.correo);
    if (!entry || est.calificacion > entry.promedio) {
      mapa.set(est.correo, {
        nombre: est.nombre,
        correo: est.correo,
        promedio: est.calificacion,
      });
    }
  }
  return Array.from(mapa.values());
}

/** RF-03 + RF-04: orquesta filtrado, agrupación, orden y top 10 */
export function calcularRanking(
  estudiantes: Estudiante[],
  perfil: Perfil,
): CandidatoRanking[] {
  const filtrados = filtrarPorPerfil(estudiantes, perfil.cursos);
  const agrupados = agruparMejorCalificacion(filtrados);
  agrupados.sort((a, b) => b.promedio - a.promedio);
  return agrupados.slice(0, 10);
}

