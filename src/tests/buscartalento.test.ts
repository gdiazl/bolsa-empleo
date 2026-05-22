import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BuscadorTalento from "../components/BuscadorTalento.vue";
import type { Empresa, Perfil, Estudiante } from "../types";

// Datos mínimos pero representativos
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
    icono: "www.google.com",
    descripcion: "Desarrollo web",
    cursos: ["PROG101"],
  },
];

const ESTUDIANTES_MOCK: Estudiante[] = [
  {
    id: 1,
    nombre: "Ana López",
    correo: "ana@uni.gt",
    curso: "PROG101",
    calificacion: 95,
  },
  {
    id: 2,
    nombre: "Luis Pérez",
    correo: "luis@uni.gt",
    curso: "PROG101",
    calificacion: 88,
  },
  {
    id: 3,
    nombre: "Juan Torres",
    correo: "juan@uni.gt",
    curso: "BD101",
    calificacion: 99,
  },
];

describe("I1 · BuscadorTalento — flujo completo (RF-01 a RF-04, RF-08)", () => {
  it("muestra los botones de perfil al cargar (RF-01)", () => {
    const wrapper = mount(BuscadorTalento, {
      props: {
        empresa: EMPRESA_MOCK,
        perfiles: PERFILES_MOCK,
        estudiantes: ESTUDIANTES_MOCK,
      },
    });
    expect(wrapper.find(".perfil-btn").exists()).toBe(true);
    expect(wrapper.findAll(".perfil-btn")).toHaveLength(1);
  });

  it("al hacer clic en un perfil, muestra solo estudiantes de ese perfil (RF-02 + RF-03)", async () => {
    const wrapper = mount(BuscadorTalento, {
      props: {
        empresa: EMPRESA_MOCK,
        perfiles: PERFILES_MOCK,
        estudiantes: ESTUDIANTES_MOCK,
      },
    });

    await wrapper.find(".perfil-btn").trigger("click");

    // Juan Torres (BD101) no debe aparecer; Ana y Luis (PROG101) sí
    const nombres = wrapper.text();
    expect(nombres).toContain("Ana López");
    expect(nombres).toContain("Luis Pérez");
    expect(nombres).not.toContain("Juan Torres");
  });

  it("el candidato con mayor calificación aparece primero (RF-03)", async () => {
    const wrapper = mount(BuscadorTalento, {
      props: {
        empresa: EMPRESA_MOCK,
        perfiles: PERFILES_MOCK,
        estudiantes: ESTUDIANTES_MOCK,
      },
    });
    await wrapper.find(".perfil-btn").trigger("click");

    // Ana (95) debe aparecer antes que Luis (88) en el DOM
    const texto = wrapper.text();
    expect(texto.indexOf("Ana López")).toBeLessThan(
      texto.indexOf("Luis Pérez"),
    );
  });

  it("mostrar correo institucional de cada candidato (RF-04)", async () => {
    const wrapper = mount(BuscadorTalento, {
      props: {
        empresa: EMPRESA_MOCK,
        perfiles: PERFILES_MOCK,
        estudiantes: ESTUDIANTES_MOCK,
      },
    });
    await wrapper.find(".perfil-btn").trigger("click");
    expect(wrapper.text()).toContain("ana@uni.gt");
  });
});
