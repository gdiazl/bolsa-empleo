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

describe("Pruebas Unitarias - BuscadorTalento", () => {

  it("U1 - Muestra los botones de perfil al cargar", () => {
    const wrapper = mount(BuscadorTalento, {
      props: { empresa: EMPRESA_MOCK, perfiles: PERFILES_MOCK, estudiantes: ESTUDIANTES_MOCK },
    });
    assert.isTrue(wrapper.find(".perfil-btn").exists());
    assert.equal(wrapper.findAll(".perfil-btn").length, 1);
  });

  it("U2 - Filtra solo estudiantes del perfil seleccionado", async () => {
    const wrapper = mount(BuscadorTalento, {
      props: { empresa: EMPRESA_MOCK, perfiles: PERFILES_MOCK, estudiantes: ESTUDIANTES_MOCK },
    });
    await wrapper.find(".perfil-btn").trigger("click");
    const texto = wrapper.text();
    assert.include(texto, "Ana López");
    assert.include(texto, "Luis Pérez");
    assert.notInclude(texto, "Juan Torres");
  });

  it("U3 - El candidato con mayor calificación aparece en primer lugar", async () => {
    const wrapper = mount(BuscadorTalento, {
      props: { empresa: EMPRESA_MOCK, perfiles: PERFILES_MOCK, estudiantes: ESTUDIANTES_MOCK },
    });
    await wrapper.find(".perfil-btn").trigger("click");
    const podio1 = wrapper.find(".podio-item.podio-1");
    assert.include(podio1.text(), "Ana López");
  });

  it("U4 - Muestra el correo institucional de cada candidato", async () => {
    const wrapper = mount(BuscadorTalento, {
      props: { empresa: EMPRESA_MOCK, perfiles: PERFILES_MOCK, estudiantes: ESTUDIANTES_MOCK },
    });
    await wrapper.find(".perfil-btn").trigger("click");
    assert.include(wrapper.text(), "ana@uni.gt");
  });

  it("U5 - El tiempo de respuesta es menor a 3 segundos", async () => {
    const wrapper = mount(BuscadorTalento, {
      props: { empresa: EMPRESA_MOCK, perfiles: PERFILES_MOCK, estudiantes: ESTUDIANTES_MOCK },
    });
    const inicio = performance.now();
    await wrapper.find(".perfil-btn").trigger("click");
    const fin = performance.now();
    assert.isBelow(fin - inicio, 3000);
  });

});
