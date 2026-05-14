export interface Empresa {
  id: string
  nombre: string
  logo: string
  color: string
  colorSecundario: string
}

export interface Perfil {
  id: string
  nombre: string
  icono: string
  descripcion: string
  cursos: string[]
}

export interface Estudiante {
  id: number
  nombre: string
  correo: string
  curso: string
  calificacion: number
}

export interface CandidatoRanking {
  nombre: string
  correo: string
  promedio: number
}
