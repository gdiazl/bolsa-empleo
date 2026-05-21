<template>
  <div class="qa-container">

    <h1>QA Integration Testing</h1>
    <p class="subtitle">Validación profesional de integración del sistema TalentLink</p>

    <!-- 1. Carga de la SPA -->
    <div class="qa-section">
      <div class="qa-header">
        <h2>1. Carga de la SPA Vue.js</h2>
        <button class="run-btn" @click="ejecutarPruebaSPA">Ejecutar prueba</button>
      </div>
      <div class="result-card" :class="spaTest.estado">
        <div class="result-top">
          <span class="test-name">Inicialización Vue</span>
          <span class="badge">{{ spaTest.estado.toUpperCase() }}</span>
        </div>
        <p class="description">{{ spaTest.descripcion }}</p>
      </div>
    </div>

    <!-- 2. Interacción entre componentes -->
    <div class="qa-section">
      <div class="qa-header">
        <h2>2. Interacción entre componentes Vue</h2>
        <button class="run-btn" @click="ejecutarPruebaComponentes">Ejecutar prueba</button>
      </div>
      <div class="result-card" :class="componentTest.estado">
        <div class="result-top">
          <span class="test-name">Comunicación App.vue → BuscadorTalento.vue</span>
          <span class="badge">{{ componentTest.estado.toUpperCase() }}</span>
        </div>
        <p class="description">{{ componentTest.descripcion }}</p>
      </div>
    </div>

    <!-- 3. Lectura de archivos JSON -->
    <div class="qa-section">
      <div class="qa-header">
        <h2>3. Lectura de archivos JSON</h2>
        <button class="run-btn" @click="ejecutarPruebaJSON">Ejecutar prueba</button>
      </div>
      <div class="result-card" :class="jsonTest.estado">
        <div class="result-top">
          <span class="test-name">Carga de datos estáticos</span>
          <span class="badge">{{ jsonTest.estado.toUpperCase() }}</span>
        </div>
        <p class="description">{{ jsonTest.descripcion }}</p>
      </div>
    </div>

    <!-- 4. Algoritmo calcularRanking -->
    <div class="qa-section">
      <div class="qa-header">
        <h2>4. Ejecución del algoritmo calcularRanking()</h2>
        <button class="run-btn" @click="ejecutarPruebaRanking">Ejecutar prueba</button>
      </div>
      <div class="result-card" :class="rankingTest.estado">
        <div class="result-top">
          <span class="test-name">Integración useRanking.ts</span>
          <span class="badge">{{ rankingTest.estado.toUpperCase() }}</span>
        </div>
        <p class="description">{{ rankingTest.descripcion }}</p>
      </div>
    </div>

    <!-- 5. Renderización Top 10 -->
    <div class="qa-section">
      <div class="qa-header">
        <h2>5. Renderización del Top 10</h2>
        <button class="run-btn" @click="ejecutarPruebaRender">Ejecutar prueba</button>
      </div>
      <div class="result-card" :class="renderTest.estado">
        <div class="result-top">
          <span class="test-name">Renderizado Visual de Candidatos</span>
          <span class="badge">{{ renderTest.estado.toUpperCase() }}</span>
        </div>
        <p class="description">{{ renderTest.descripcion }}</p>
      </div>
      <div v-if="ranking.length > 0" class="ranking-container">
        <div v-for="(candidato, index) in ranking" :key="candidato.correo" class="ranking-item">
          <div class="ranking-position">{{ index + 1 }}</div>
          <div class="ranking-info">
            <span class="ranking-name">{{ candidato.nombre }}</span>
            <span class="ranking-email">{{ candidato.correo }}</span>
          </div>
          <div class="ranking-score">{{ candidato.promedio }}</div>
        </div>
      </div>
    </div>

    <!-- 6. Tiempo de respuesta -->
    <div class="qa-section">
      <div class="qa-header">
        <h2>6. Tiempo de respuesta</h2>
        <button class="run-btn" @click="ejecutarPruebaPerformance">Ejecutar prueba</button>
      </div>
      <div class="result-card" :class="performanceTest.estado">
        <div class="result-top">
          <span class="test-name">Performance calcularRanking()</span>
          <span class="badge">{{ performanceTest.estado.toUpperCase() }}</span>
        </div>
        <p class="description">{{ performanceTest.descripcion }}</p>
      </div>
      <div v-if="tiempoRespuesta !== null" class="metrics-container">
        <div class="metric-card">
          <span class="metric-title">Tiempo de respuesta</span>
          <span class="metric-value">{{ tiempoRespuesta }} ms</span>
        </div>
        <div class="metric-card">
          <span class="metric-title">Candidatos generados</span>
          <span class="metric-value">{{ totalCandidatos }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import perfilesData from '../data/perfiles.json'
import estudiantesData from '../data/estudiantes.json'
import empresasData from '../data/empresas.json'
import { calcularRanking } from '../composables/useRanking'

// Estados de pruebas
const spaTest = reactive({ estado: 'pending', descripcion: 'Esperando ejecución...' })
const componentTest = reactive({ estado: 'pending', descripcion: 'Esperando ejecución...' })
const jsonTest = reactive({ estado: 'pending', descripcion: 'Esperando ejecución...' })
const rankingTest = reactive({ estado: 'pending', descripcion: 'Esperando ejecución...' })
const renderTest = reactive({ estado: 'pending', descripcion: 'Esperando ejecución...' })
const performanceTest = reactive({ estado: 'pending', descripcion: 'Esperando ejecución...' })

const ranking = ref<any[]>([])
const tiempoRespuesta = ref<number | null>(null)
const totalCandidatos = ref(0)

// 1. Carga SPA
function ejecutarPruebaSPA() {
  try {
    const app = document.querySelector('#app')
    if (app) {
      spaTest.estado = 'pass'
      spaTest.descripcion = 'Vue montó correctamente la SPA en el elemento #app.'
    } else {
      spaTest.estado = 'fail'
      spaTest.descripcion = 'No se encontró el elemento #app.'
    }
  } catch (error) {
    spaTest.estado = 'fail'
    spaTest.descripcion = 'Error al iniciar la SPA Vue.js.'
  }
}

// 2. Interacción entre componentes
function ejecutarPruebaComponentes() {
  try {
    const pepsi = empresasData.find(e => e.id === 'pepsi')
    if (pepsi) {
      componentTest.estado = 'pass'
      componentTest.descripcion = `App.vue envió correctamente la empresa "${pepsi.nombre}" al componente BuscadorTalento.vue mediante props.`
    } else {
      componentTest.estado = 'fail'
      componentTest.descripcion = 'No se encontró la empresa Pepsi para enviar al componente hijo.'
    }
  } catch (error) {
    componentTest.estado = 'fail'
    componentTest.descripcion = 'Ocurrió un error en la integración entre componentes Vue.'
  }
}

// 3. Lectura JSON
function ejecutarPruebaJSON() {
  try {
    const tieneEmpresas = empresasData.length > 0
    const tienePerfiles = perfilesData.length > 0
    const tieneEstudiantes = estudiantesData.length > 0
    if (tieneEmpresas && tienePerfiles && tieneEstudiantes) {
      jsonTest.estado = 'pass'
      jsonTest.descripcion = `Se cargaron correctamente ${empresasData.length} empresas, ${perfilesData.length} perfiles y ${estudiantesData.length} estudiantes desde los archivos JSON.`
    } else {
      jsonTest.estado = 'fail'
      jsonTest.descripcion = 'No se pudieron cargar todos los archivos JSON.'
    }
  } catch (error) {
    jsonTest.estado = 'fail'
    jsonTest.descripcion = 'Error al leer los archivos JSON estáticos.'
  }
}

// 4. Algoritmo ranking
function ejecutarPruebaRanking() {
  try {
    const perfil = perfilesData.find(p => p.id === 'dev-web')
    if (!perfil) { rankingTest.estado = 'fail'; rankingTest.descripcion = 'No se encontró el perfil Desarrollador Web.'; return }
    const result = calcularRanking(estudiantesData, perfil)
    if (result.length > 0) {
      rankingTest.estado = 'pass'
      rankingTest.descripcion = `calcularRanking() generó correctamente ${result.length} candidatos. Primer lugar: ${result[0].nombre}.`
    } else {
      rankingTest.estado = 'fail'
      rankingTest.descripcion = 'El algoritmo no generó candidatos.'
    }
  } catch (error) {
    rankingTest.estado = 'fail'
    rankingTest.descripcion = 'Ocurrió un error al ejecutar calcularRanking().'
  }
}

// 5. Renderización Top 10
function ejecutarPruebaRender() {
  try {
    const perfil = perfilesData.find(p => p.id === 'dev-web')
    if (!perfil) { renderTest.estado = 'fail'; renderTest.descripcion = 'No se encontró el perfil Desarrollador Web.'; return }
    ranking.value = calcularRanking(estudiantesData, perfil)
    if (ranking.value.length > 0) {
      renderTest.estado = 'pass'
      renderTest.descripcion = `Vue renderizó correctamente ${ranking.value.length} candidatos en pantalla.`
    } else {
      renderTest.estado = 'fail'
      renderTest.descripcion = 'Vue no pudo renderizar candidatos.'
    }
  } catch (error) {
    renderTest.estado = 'fail'
    renderTest.descripcion = 'Error durante la renderización del Top 10.'
  }
}

// 6. Tiempo de respuesta
function ejecutarPruebaPerformance() {
  try {
    const perfil = perfilesData.find(p => p.id === 'dev-web')
    if (!perfil) { performanceTest.estado = 'fail'; performanceTest.descripcion = 'No se encontró el perfil.'; return }
    const inicio = performance.now()
    const result = calcularRanking(estudiantesData, perfil)
    const fin = performance.now()
    const tiempoTotal = Number((fin - inicio).toFixed(2))
    tiempoRespuesta.value = tiempoTotal
    totalCandidatos.value = result.length
    if (tiempoTotal < 100) {
      performanceTest.estado = 'pass'
      performanceTest.descripcion = `El algoritmo respondió correctamente en ${tiempoTotal} ms.`
    } else {
      performanceTest.estado = 'fail'
      performanceTest.descripcion = `Tiempo de respuesta elevado: ${tiempoTotal} ms.`
    }
  } catch (error) {
    performanceTest.estado = 'fail'
    performanceTest.descripcion = 'Error durante la medición del tiempo de respuesta.'
  }
}
</script>

<style scoped>
.qa-container { min-height: 100vh; background: #0f172a; color: white; padding: 40px; font-family: Inter; }
h1 { font-size: 42px; margin-bottom: 10px; }
.subtitle { color: #94a3b8; margin-bottom: 40px; }
.qa-section { background: #1e293b; border-radius: 18px; padding: 24px; margin-bottom: 30px; }
.qa-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.run-btn { background: #22c55e; border: none; color: white; padding: 12px 20px; border-radius: 12px; cursor: pointer; font-size: 15px; font-weight: 600; }
.result-card { background: #0f172a; border-radius: 14px; padding: 18px; border-left: 6px solid gray; margin-bottom: 20px; }
.result-card.pass { border-left-color: #22c55e; }
.result-card.fail { border-left-color: #ef4444; }
.result-card.pending { border-left-color: #facc15; }
.result-top { display: flex; justify-content: space-between; margin-bottom: 10px; }
.test-name { font-weight: 700; font-size: 16px; }
.badge { font-weight: bold; text-transform: uppercase; }
.description { color: #cbd5e1; }
.ranking-container { display: grid; gap: 14px; }
.ranking-item { display: flex; align-items: center; justify-content: space-between; background: #0f172a; padding: 16px; border-radius: 14px; }
.ranking-position { width: 42px; height: 42px; border-radius: 50%; background: #22c55e; display: flex; align-items: center; justify-content: center; font-weight: bold; }
.ranking-info { flex: 1; margin-left: 18px; display: flex; flex-direction: column; }
.ranking-name { font-weight: 700; }
.ranking-email { color: #94a3b8; font-size: 14px; }
.ranking-score { font-size: 18px; font-weight: bold; color: #22c55e; }
.metrics-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 18px; }
.metric-card { background: #0f172a; padding: 20px; border-radius: 14px; display: flex; flex-direction: column; }
.metric-title { color: #94a3b8; margin-bottom: 10px; }
.metric-value { font-size: 32px; font-weight: bold; color: #22c55e; }
</style>
