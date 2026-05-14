<template>
  <div class="app">
    <Transition name="fade" mode="out-in">
      <LandingEmpresa
        v-if="!empresaActiva"
        :empresas="empresas"
        @seleccionar="onSeleccionarEmpresa"
      />
      <BuscadorTalento
        v-else
        :empresa="empresaActiva"
        :perfiles="perfiles"
        :estudiantes="estudiantes"
        @cambiar="empresaActiva = null"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LandingEmpresa from './components/LandingEmpresa.vue'
import BuscadorTalento from './components/BuscadorTalento.vue'
import type { Empresa } from './types'

import empresasData from './data/empresas.json'
import perfilesData from './data/perfiles.json'
import estudiantesData from './data/estudiantes.json'

const empresas = empresasData as Empresa[]
const perfiles = perfilesData
const estudiantes = estudiantesData

// Inicia con Coca-Cola por defecto, el landing queda oculto pero accesible con "Cambiar empresa"
const empresaActiva = ref<Empresa | null>(empresas.find(e => e.id === 'pepsi') ?? null)

function onSeleccionarEmpresa(empresa: Empresa) {
  empresaActiva.value = empresa
}
</script>
