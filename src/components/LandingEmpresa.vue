<template>
  <div class="landing">
    <div class="landing-bg"></div>

    <div class="landing-content">
      <div class="brand">
        <img src="/umg-logo.png" alt="UMG" class="brand-logo" />
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
            <div class="empresa-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
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
