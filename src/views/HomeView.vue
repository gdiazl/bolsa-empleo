<template>
  <div class="app">
    <BuscadorTalento
      :empresa="empresaActiva!"
      :perfiles="perfiles"
      :estudiantes="estudiantes"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BuscadorTalento from '../components/BuscadorTalento.vue'
import type { Empresa } from '../types'

import empresasData from '../data/empresas.json'
import perfilesData from '../data/perfiles.json'
import estudiantesData from '../data/estudiantes.json'

const empresas = empresasData as Empresa[]
const perfiles = perfilesData
const estudiantes = estudiantesData

const empresaActiva = ref<Empresa | null>(empresas.find(e => e.id === 'pepsi') ?? null)
</script>
