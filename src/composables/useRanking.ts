import type { Estudiante, Perfil, CandidatoRanking } from '../types'

export function calcularRanking(
  estudiantes: Estudiante[],
  perfil: Perfil
): CandidatoRanking[] {
  const cursosDelPerfil = perfil.cursos

  // Tomar la calificación más alta del estudiante en los cursos del perfil
  const mapaEstudiantes = new Map<string, { nombre: string; correo: string; mejor: number }>()

  for (const est of estudiantes) {
    if (!cursosDelPerfil.includes(est.curso)) continue

    const key = est.correo
    if (!mapaEstudiantes.has(key)) {
      mapaEstudiantes.set(key, { nombre: est.nombre, correo: est.correo, mejor: est.calificacion })
    } else {
      const entry = mapaEstudiantes.get(key)!
      if (est.calificacion > entry.mejor) entry.mejor = est.calificacion
    }
  }

  const ranking: CandidatoRanking[] = Array.from(mapaEstudiantes.values()).map(e => ({
    nombre: e.nombre,
    correo: e.correo,
    promedio: e.mejor
  }))

  ranking.sort((a, b) => b.promedio - a.promedio)

  return ranking.slice(0, 10)
}
