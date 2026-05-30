<template>
  <div class="buscador">
    <div class="buscador-bg"></div>

    <!-- Header · estilo UMG -->
    <header class="buscador-header">
      <div class="header-left">
        <img
          src="/umg-logo.png"
          alt="Universidad Mariano Gálvez de Guatemala"
          class="header-umg-logo"
        />
        <div class="header-divider"></div>
        <div class="empresa-badge">
          <img
            :src="empresa.logo"
            :alt="empresa.nombre"
            class="header-logo"
            @error="onImgError($event)"
          />
          <div class="empresa-info">
            <span class="empresa-label">Empresa</span>
            <span class="empresa-nombre">{{ empresa.nombre }}</span>
          </div>
        </div>
      </div>
      <div class="header-right">
        <span class="header-tagline">Bolsa de Empleo</span>
      </div>
    </header>

    <!-- Banner UMG -->
    <div class="umg-banner">
      <div class="umg-banner-content">
        <h1 class="umg-title">Bolsa <b>de Empleo</b></h1>
        <p class="umg-subtitle">Encuentra los estudiantes más destacados según el perfil laboral que necesitas</p>
      </div>
    </div>

    <!-- Hero -->
    <div class="hero-section">
      <h1>Talento <span class="highlight">UMG</span></h1>
      <p>Selecciona un perfil laboral para consultar el ranking de candidatos</p>
    </div>

    <!-- Selector de perfil -->
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
            <span class="perfil-icono">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <template v-if="perfil.id === 'dev-web'">
                  <polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>
                </template>
                <template v-else-if="perfil.id === 'soporte-tecnico'">
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line>
                </template>
                <template v-else-if="perfil.id === 'analista-datos'">
                  <line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>
                </template>
                <template v-else-if="perfil.id === 'admin-redes'">
                  <circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </template>
                <template v-else-if="perfil.id === 'dev-software'">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </template>
                <template v-else>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </template>
              </svg>
            </span>
            <span class="perfil-nombre">{{ perfil.nombre }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Resultados -->
    <div class="resultados-section" v-if="perfilSeleccionado">
      <div class="resultados-header">
        <div class="resultados-titulo">
          <span class="resultados-icono">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#003366" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="8" r="5"></circle>
              <path d="M20 21a8 8 0 1 0-16 0"></path>
            </svg>
          </span>
          <div>
            <h2>Top 10 candidatos</h2>
            <p>{{ perfilSeleccionado.nombre }} · {{ perfilSeleccionado.descripcion }}</p>
          </div>
        </div>
        <button class="btn-volver" @click="volverAPerfiles">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Cambiar perfil
        </button>
      </div>

      <div v-if="ranking.length === 0" class="sin-resultados">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#707070" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:0 auto 16px">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
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

const emit = defineEmits<{ cambiar: [] }>()

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
  perfilSeleccionado.value = null
  ranking.value = []
  emit('cambiar')
}
</script>
