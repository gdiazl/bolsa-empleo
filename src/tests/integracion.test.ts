import { describe, it, assert } from "vitest";
import { mount } from "@vue/test-utils";
import BuscadorTalento from "../components/BuscadorTalento.vue";
import type { Empresa, Perfil, Estudiante } from "../types";

const EMPRESA_MOCK: Empresa = {
  id: "id",
  colorSecundario: "#fff",
  nombre: "Empresa Test",
  logo: "www.google.com",
  color: "#000",
};

const PERFILES_MOCK: Perfil[] = [
  {
    id: "dev-web",
    nombre: "Desarrollador Web",
    icono: "💻",
    descripcion: "Desarrollo web",
    cursos: ["PROG101"],
  },
];

const ESTUDIANTES_MOCK: Estudiante[] = [
  { id: 1, nombre: "Ana López", correo: "ana@uni.gt", curso: "PROG101", calificacion: 95 },
  { id: 2, nombre: "Luis Pérez", correo: "luis@uni.gt", curso: "PROG101", calificacion: 88 },
  { id: 3, nombre: "Juan Torres", correo: "juan@uni.gt", curso: "BD101", calificacion: 99 },
  { id: 4, nombre: "Carlos Méndez", correo: "carlos@uni.gt", curso: "PROG101", calificacion: 80 },
];

describe("Prueba de Integración - Flujo completo del sistema", () => {

  it("I1 - Validación integral: carga de perfiles, filtrado, ranking, correo y tiempo de respuesta", async () => {
    // 1. Montar componente completo
    const wrapper = mount(BuscadorTalento, {
      props: { empresa: EMPRESA_MOCK, perfiles: PERFILES_MOCK, estudiantes: ESTUDIANTES_MOCK },
    });

    // 2. Verificar que los perfiles se cargan
    assert.isTrue(wrapper.find(".perfil-btn").exists(), "Los perfiles deben cargarse al iniciar");

    // 3. Medir tiempo de respuesta al seleccionar perfil
    const inicio = performance.now();
    await wrapper.find(".perfil-btn").trigger("click");
    const fin = performance.now();
    assert.isBelow(fin - inicio, 3000, "El tiempo de respuesta debe ser menor a 3 segundos");

    // 4. Verificar filtrado correcto
    const texto = wrapper.text();
    assert.include(texto, "Ana López", "Debe mostrar estudiantes del perfil seleccionado");
    assert.include(texto, "Luis Pérez", "Debe mostrar estudiantes del perfil seleccionado");
    assert.notInclude(texto, "Juan Torres", "No debe mostrar estudiantes de otros perfiles");

    // 5. Verificar orden por calificación
    const podio1 = wrapper.find(".podio-item.podio-1");
    assert.include(podio1.text(), "Ana López", "El primer lugar debe ser el de mayor calificación");

    // 6. Verificar que muestra correo institucional
    assert.include(texto, "ana@uni.gt", "Debe mostrar el correo institucional del candidato");
    assert.include(texto, "luis@uni.gt", "Debe mostrar el correo institucional del candidato");
  });

});
