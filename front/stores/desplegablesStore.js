import { defineStore, createPinia, setActivePinia } from "pinia";
import { ref } from "vue";
import {useAxios} from "~/composables/useAxios";

const pinia = createPinia();
export default { store: setActivePinia(pinia) };

export const useDesplegablesStore = defineStore("desplegables", () => {
  const api = useAxios();
  const estadoLicitacion = ref([]);
  const tipoLicitacion = ref([]);
  const tipoContratacion = ref([]);
  const estadoOC = ref([]);
  const area = ref([]);
  const subArea = ref([]);
  const firmante = ref([]);
  const modalidad = ref([]);
  const subModalidad = ref([]);

  const fetchEstadoLicitacion = async () => {
    try {
      const res = await api.get("/desplegables?tipo=ESTADO_LIC");
      estadoLicitacion.value = res.data;
    } catch (err) {
      console.error("Error fetching estados de licitación:", err);
    }
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

  const fetchArea = async () => {
    try {
      const res = await api.get("/desplegables?tipo=AREA");
      area.value = res.data;
    } catch (err) {
      console.error("Error fetching areas:", err);
    }
  };

  const fetchSubArea = async () => {
    try {
      const res = await api.get("/desplegables?tipo=SUB_AREA");
      subArea.value = res.data;
    } catch (err) {
      console.error("Error fetching sub areas:", err);
    }
  };

  const fetchFirmante = async () => {
    try {
      const res = await api.get("/desplegables?tipo=FIRMANTE");
      firmante.value = res.data;
    } catch (err) {
      console.error("Error fetching firmantes:", err);
    }
  };

  const fetchModalidad = async () => {
    try {
      const res = await api.get("/desplegables?tipo=MODALIDAD");
      modalidad.value = res.data;
    } catch (err) {
      console.error("Error fetching modalidades:", err);
    }
  };

  const fetchSubModalidad = async () => {
    try {
      const res = await api.get("/desplegables?tipo=SUB_MODALIDAD");
      subModalidad.value = res.data;
    } catch (err) {
      console.error("Error fetching sub modalidades:", err);
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

  const getArea = () => {
    return area.value.map((item) => item.valor);
  };

  const getSubArea = () => {
    return subArea.value.map((item) => item.valor);
  };

  const getFirmante = () => {
    return firmante.value.map((item) => item.valor);
  };

  const getModalidad = () => {
    return modalidad.value.map((item) => item.valor);
  };

  const getSubModalidad = () => {
    return subModalidad.value.map((item) => item.valor);
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
        case "AREA":
          area.value.push(res.data);
          break;
        case "SUB_AREA":
          subArea.value.push(res.data);
          break;
        case "FIRMANTE":
          firmante.value.push(res.data);
          break;
        case "MODALIDAD":
          modalidad.value.push(res.data);
          break;
        case "SUB_MODALIDAD":
          subModalidad.value.push(res.data);
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
    area,
    subArea,
    firmante,
    modalidad,
    subModalidad,
    fetchEstadoLicitacion,
    fetchTipoLicitacion,
    fetchTipoContratacion,
    fetchEstadoOC,
    fetchArea,
    fetchSubArea,
    fetchFirmante,
    fetchModalidad,
    fetchSubModalidad,
    getEstadoLicitacion,
    getTipoLicitacion,
    getTipoContratacion,
    getEstadoOC,
    getArea,
    getSubArea,
    getFirmante,
    getModalidad,
    getSubModalidad,
    createDesplegable,
    deleteDesplegable,
  };
});
