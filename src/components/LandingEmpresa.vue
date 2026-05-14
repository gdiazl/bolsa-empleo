<template>
  <div class="landing">
    <div class="landing-bg">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
    </div>

    <div class="landing-content">
      <div class="brand">
        <div class="brand-icon">🎓</div>
        <h1 class="brand-name">TalentLink</h1>
        <p class="brand-tagline">Plataforma de Vinculación Laboral Universitaria</p>
      </div>

      <div class="welcome-card">
        <h2>¿Qué empresa representas?</h2>
        <p>Selecciona tu empresa para acceder al directorio de talento universitario</p>

        <div class="empresas-grid">
          <button
            v-for="empresa in empresas"
            :key="empresa.id"
            class="empresa-card"
            :style="{ '--empresa-color': empresa.color }"
            @click="$emit('seleccionar', empresa)"
          >
            <div class="empresa-logo-wrap">
              <img
                :src="empresa.logo"
                :alt="empresa.nombre"
                class="empresa-logo"
                @error="onImgError($event)"
              />
            </div>
            <span class="empresa-nombre">{{ empresa.nombre }}</span>
            <div class="empresa-arrow">→</div>
          </button>
        </div>
      </div>

      <p class="footer-note">Acceso exclusivo para empresas reclutadoras · Universidad Mariano Gálvez</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Empresa } from '../types'

defineProps<{ empresas: Empresa[] }>()
defineEmits<{ seleccionar: [empresa: Empresa] }>()

function onImgError(e: Event) {
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
  const parent = img.parentElement
  if (parent) {
    parent.innerHTML = `<span class="logo-fallback">${img.alt.charAt(0)}</span>`
  }
}
</script>
