<template>
  <div class="buscador" :style="{ '--empresa-color': empresa.color }">
    <div class="buscador-bg">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
    </div>

    <!-- Header -->
    <header class="buscador-header">
      <div class="header-left">
        <div class="empresa-badge">
          <img
            :src="empresa.logo"
            :alt="empresa.nombre"
            class="header-logo"
            @error="onImgError($event)"
          />
          <div class="empresa-info">
            <span class="empresa-label">Sesión activa</span>
            <span class="empresa-nombre">{{ empresa.nombre }}</span>
          </div>
        </div>
      </div>
      <button class="btn-cambiar" @click="salir">
        <span>⇄</span> Salir
      </button>
    </header>

    <!-- Hero -->
    <div class="hero-section">
      <h1>Encuentra tu próximo <span class="highlight">talento</span></h1>
      <p>Consulta los estudiantes más destacados según el perfil que necesitas</p>
    </div>

    <!-- Selector de perfil (se oculta al seleccionar uno) -->
    <div class="selector-section" v-if="!perfilSeleccionado">
      <div class="selector-card">
        <label class="selector-label">Perfil laboral</label>
        <div class="perfiles-grid">
          <button
            v-for="perfil in perfiles"
            :key="perfil.id"
            class="perfil-btn"
            @click="seleccionarPerfil(perfil)"
          >
            <span class="perfil-icono">{{ perfil.icono }}</span>
            <span class="perfil-nombre">{{ perfil.nombre }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Resultados -->
    <div class="resultados-section" v-if="perfilSeleccionado">
      <div class="resultados-header">
        <div class="resultados-titulo">
          <span class="resultados-icono">{{ perfilSeleccionado.icono }}</span>
          <div>
            <h2>Top 10 candidatos</h2>
            <p>{{ perfilSeleccionado.nombre }} · {{ perfilSeleccionado.descripcion }}</p>
          </div>
        </div>
        <button class="btn-volver" @click="volverAPerfiles">
          ← Cambiar perfil
        </button>
      </div>

      <div v-if="ranking.length === 0" class="sin-resultados">
        <span>🔍</span>
        <p>No hay candidatos disponibles para este perfil</p>
      </div>

      <div v-else>
        <!-- Podio top 3 -->
        <div class="podio" v-if="ranking.length >= 3">
          <div class="podio-item podio-2">
            <div class="podio-avatar">{{ ranking[1].nombre.charAt(0) }}</div>
            <div class="podio-nombre">{{ ranking[1].nombre }}</div>
            <div class="podio-correo">{{ ranking[1].correo }}</div>
            <div class="podio-base podio-base-2">2°</div>
          </div>
          <div class="podio-item podio-1">
            <div class="podio-avatar podio-avatar-1">{{ ranking[0].nombre.charAt(0) }}</div>
            <div class="podio-nombre">{{ ranking[0].nombre }}</div>
            <div class="podio-correo">{{ ranking[0].correo }}</div>
            <div class="podio-base podio-base-1">1°</div>
          </div>
          <div class="podio-item podio-3">
            <div class="podio-avatar">{{ ranking[2].nombre.charAt(0) }}</div>
            <div class="podio-nombre">{{ ranking[2].nombre }}</div>
            <div class="podio-correo">{{ ranking[2].correo }}</div>
            <div class="podio-base podio-base-3">3°</div>
          </div>
        </div>

        <!-- Lista del 4 al 10 -->
        <div class="ranking-lista" v-if="ranking.length > 3">
          <div
            v-for="(candidato, index) in ranking.slice(3)"
            :key="candidato.correo"
            class="ranking-item"
            :style="{ animationDelay: `${index * 60}ms` }"
          >
            <div class="ranking-posicion">{{ index + 4 }}</div>
            <div class="candidato-avatar">{{ candidato.nombre.charAt(0) }}</div>
            <div class="candidato-info">
              <span class="candidato-nombre">{{ candidato.nombre }}</span>
              <span class="candidato-correo">{{ candidato.correo }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Estado inicial -->
    <div class="estado-inicial" v-else>
      <div class="estado-icon">👆</div>
      <p>Selecciona un perfil laboral para ver los candidatos destacados</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Empresa, Perfil, Estudiante, CandidatoRanking } from '../types'
import { calcularRanking } from '../composables/useRanking'

const props = defineProps<{
  empresa: Empresa
  perfiles: Perfil[]
  estudiantes: Estudiante[]
}>()

defineEmits<{ cambiar: [] }>()

const perfilSeleccionado = ref<Perfil | null>(null)
const ranking = ref<CandidatoRanking[]>([])

function seleccionarPerfil(perfil: Perfil) {
  perfilSeleccionado.value = perfil
  ranking.value = calcularRanking(props.estudiantes, perfil)
}

function volverAPerfiles() {
  perfilSeleccionado.value = null
  ranking.value = []
}

function onImgError(e: Event) {
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
}

function salir() {
  window.location.href = 'https://www.google.com'
}
</script>
