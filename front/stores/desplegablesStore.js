import { defineStore, createPinia, setActivePinia } from "pinia";
import { ref } from "vue";
import api from "@/utils/axios";

const pinia = createPinia();
export default { store: setActivePinia(pinia) };

export const useDesplegablesStore = defineStore("desplegables", () => {
  const estadoLicitacion = ref([]);
  const tipoLicitacion = ref([]);
  const tipoContratacion = ref([]);
  const estadoOC = ref([]);

  const fetchEstadoLicitacion = async () => {
    try {
      const res = await api.get("/desplegables?tipo=ESTADO_LIC");
      estadoLicitacion.value = res.data;
    } catch (err) {
      console.error("Error fetching estados de licitación:", err);
    }
  };

  const getEstadoLicitacion = () => {
    return estadoLicitacion.value.map((item) => item.valor);
  };

  const getTipoLicitacion = () => {
    return tipoLicitacion.value.map((item) => item.valor);
  };

  const getTipoContratacion = () => {
    return tipoContratacion.value.map((item) => item.valor);
  };

  const getEstadoOC = () => {
    return estadoOC.value.map((item) => item.valor);
  };

  const fetchTipoLicitacion = async () => {
    try {
      const res = await api.get("/desplegables?tipo=TIPO_LIC");
      tipoLicitacion.value = res.data;
    } catch (err) {
      console.error("Error fetching tipo de licitación:", err);
    }
  };

  const fetchTipoContratacion = async () => {
    try {
      const res = await api.get("/desplegables?tipo=TIPO_CONTR");
      tipoContratacion.value = res.data;
    } catch (err) {
      console.error("Error fetching tipo de contratacion:", err);
    }
  };

  const fetchEstadoOC = async () => {
    try {
      const res = await api.get("/desplegables?tipo=ESTADO_OC");
      estadoOC.value = res.data;
    } catch (err) {
      console.error("Error fetching estados de orden de compra:", err);
    }
  };

  const createDesplegable = async (desplegable) => {
    try {
      const res = await api.post("/desplegables", desplegable);
      switch (desplegable.tipo) {
        case "ESTADO_LIC":
          estadoLicitacion.value.push(res.data);
          break;
        case "TIPO_LIC":
          tipoLicitacion.value.push(res.data);
          break;
        case "TIPO_CONTR":
          tipoContratacion.value.push(res.data);
          break;
        case "ESTADO_OC":
          estadoOC.value.push(res.data);
          break;
      }
    } catch (err) {
      console.error("Error creating desplegable:", err);
    }
  };

  const deleteDesplegable = async (id) => {
    try {
      await api.delete(`/desplegables?id=${id}`);
      estadoLicitacion.value = estadoLicitacion.value.filter(
        (d) => d._id !== id
      );
      tipoLicitacion.value = tipoLicitacion.value.filter((d) => d._id !== id);
      tipoContratacion.value = tipoContratacion.value.filter(
        (d) => d._id !== id
      );
      estadoOC.value = estadoOC.value.filter((d) => d._id !== id);
    } catch (err) {
      console.error("Error deleting desplegable:", err);
    }
  };

  return {
    estadoLicitacion,
    tipoLicitacion,
    tipoContratacion,
    estadoOC,
    fetchEstadoLicitacion,
    fetchTipoLicitacion,
    fetchTipoContratacion,
    fetchEstadoOC,
    getEstadoLicitacion,
    getTipoLicitacion,
    getTipoContratacion,
    getEstadoOC,
    createDesplegable,
    deleteDesplegable,
  };
});
