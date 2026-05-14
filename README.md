# TalentLink - Plataforma de Vinculación Laboral Universitaria

## Descripción
TalentLink es una plataforma web tipo bolsa de empleo universitaria en formato MVP (Producto Mínimo Viable). Permite a empresas reclutadoras identificar y consultar los estudiantes más destacados de la Universidad Mariano Gálvez según su rendimiento académico, filtrando por perfil laboral.

## Características
- Selección de empresa reclutadora (Pepsi, Coca-Cola, Cervecería Centroamericana, Tigo, Claro)
- Filtrado de estudiantes por perfil laboral (Desarrollador Web, Soporte Técnico, Analista de Datos, Administrador de Redes, Desarrollador de Software, Especialista en Ciberseguridad)
- Ranking automático de los 10 mejores estudiantes por perfil
- Visualización de nombre y correo institucional del candidato

## Tecnologías
- Vue.js 3
- Vite
- TypeScript
- Datos simulados en JSON estático (sin backend)

## Estructura del proyecto
```
bolsa-empleo/
├── public/
│   └── logos/          # Logos de empresas
├── src/
│   ├── components/
│   │   ├── LandingEmpresa.vue    # Pantalla de selección de empresa
│   │   └── BuscadorTalento.vue   # Vista de búsqueda y resultados
│   ├── composables/
│   │   └── useRanking.ts         # Lógica de filtrado y ranking
│   ├── data/
│   │   ├── empresas.json         # Datos de empresas
│   │   ├── perfiles.json         # Perfiles laborales y cursos mapeados
│   │   └── estudiantes.json      # Datos simulados de estudiantes
│   ├── App.vue
│   ├── main.ts
│   ├── style.css
│   └── types.ts
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Instalación y uso

### Requisitos
- Node.js v18 o superior
- npm

### Pasos
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

La app estará disponible en `http://host-3c5b98.ns.truo.co/bolsa-empleo`

## Equipo de desarrollo
| Rol | Responsable |
|-----|-------------|
| Desarrollador Frontend (UI) | Francisco |
| Desarrollador Frontend (Lógica) | Gustavo |
| Analista de Requerimientos / PM | Gabriel |
| Tester / QA | Yonatan |

## Universidad Mariano Gálvez de Guatemala
Ingeniería en Sistemas de Información
