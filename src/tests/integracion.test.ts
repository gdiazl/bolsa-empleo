import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BuscadorTalento from '../components/BuscadorTalento.vue'
import estudiantesData from '../data/estudiantes.json'
import perfilesData from '../data/perfiles.json'
import empresasData from '../data/empresas.json'
import type { Empresa, Perfil, Estudiante } from '../types'

const empresa = empresasData[0] as Empresa // Pepsi
const perfiles = perfilesData as Perfil[]
const estudiantes = estudiantesData as Estudiante[]

describe('Prueba de Integración - BuscadorTalento', () => {

  it('muestra los 6 perfiles laborales al iniciar', () => {
    const wrapper = mount(BuscadorTalento, {
      props: { empresa, perfiles, estudiantes }
    })
    const botones = wrapper.findAll('.perfil-btn')
    expect(botones.length).toBe(6)
  })

  it('muestra 10 candidatos al seleccionar un perfil', async () => {
    const wrapper = mount(BuscadorTalento, {
      props: { empresa, perfiles, estudiantes }
    })
    // Click en el primer perfil (Desarrollador Web)
    await wrapper.findAll('.perfil-btn')[0].trigger('click')

    const items = wrapper.findAll('.ranking-item')
    const podioItems = wrapper.findAll('.podio-item')
    const totalCandidatos = podioItems.length + items.length
    expect(totalCandidatos).toBe(10)
  })

  it('cada candidato muestra nombre y correo', async () => {
    const wrapper = mount(BuscadorTalento, {
      props: { empresa, perfiles, estudiantes }
    })
    await wrapper.findAll('.perfil-btn')[0].trigger('click')

    // Verificar podio (top 3)
    const nombres = wrapper.findAll('.podio-nombre')
    const correos = wrapper.findAll('.podio-correo')
    expect(nombres.length).toBeGreaterThan(0)
    expect(correos.length).toBeGreaterThan(0)
    expect(nombres[0].text()).not.toBe('')
    expect(correos[0].text()).toContain('@miumg.edu.gt')
  })

  it('muestra candidatos distintos al cambiar de perfil', async () => {
    const wrapper = mount(BuscadorTalento, {
      props: { empresa, perfiles, estudiantes }
    })

    // Seleccionar primer perfil (Desarrollador Web)
    await wrapper.findAll('.perfil-btn')[0].trigger('click')
    const primerNombre = wrapper.find('.podio-nombre').text()

    // Volver a perfiles
    await wrapper.find('.btn-volver').trigger('click')

    // Seleccionar segundo perfil (Soporte Técnico)
    await wrapper.findAll('.perfil-btn')[1].trigger('click')
    const segundoNombre = wrapper.find('.podio-nombre').text()

    expect(primerNombre).not.toBe(segundoNombre)
  })

  it('oculta perfiles al seleccionar uno y los muestra al volver', async () => {
    const wrapper = mount(BuscadorTalento, {
      props: { empresa, perfiles, estudiantes }
    })

    // Inicialmente se ven los perfiles
    expect(wrapper.find('.selector-section').exists()).toBe(true)
    expect(wrapper.find('.resultados-section').exists()).toBe(false)

    // Seleccionar un perfil
    await wrapper.findAll('.perfil-btn')[0].trigger('click')

    // Perfiles ocultos, resultados visibles
    expect(wrapper.find('.selector-section').exists()).toBe(false)
    expect(wrapper.find('.resultados-section').exists()).toBe(true)

    // Click en volver
    await wrapper.find('.btn-volver').trigger('click')

    // Perfiles visibles de nuevo
    expect(wrapper.find('.selector-section').exists()).toBe(true)
    expect(wrapper.find('.resultados-section').exists()).toBe(false)
  })

  it('el header muestra la empresa Pepsi', () => {
    const wrapper = mount(BuscadorTalento, {
      props: { empresa, perfiles, estudiantes }
    })
    const nombreEmpresa = wrapper.find('.empresa-nombre').text()
    expect(nombreEmpresa).toBe('PepsiCo Guatemala')
  })

  it('el tiempo de respuesta al seleccionar un perfil es menor a 3 segundos', async () => {
    const wrapper = mount(BuscadorTalento, {
      props: { empresa, perfiles, estudiantes }
    })

    const inicio = performance.now()

    // Seleccionar un perfil y esperar que se rendericen los resultados
    await wrapper.findAll('.perfil-btn')[0].trigger('click')

    const fin = performance.now()
    const tiempoMs = fin - inicio

    // Verificar que el tiempo es menor a 3000ms (3 segundos)
    expect(tiempoMs).toBeLessThan(3000)

    // Verificar que se muestran los 10 candidatos correctamente
    const podioItems = wrapper.findAll('.podio-item')
    const listaItems = wrapper.findAll('.ranking-item')
    const totalCandidatos = podioItems.length + listaItems.length
    expect(totalCandidatos).toBe(10)
  })

})
