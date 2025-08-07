import { defineStore, createPinia, setActivePinia } from "pinia";
import { ref } from "vue";
import api from "@/utils/axios";

//creo una instancia de Pinia aca porque por alguna razón no lo hace automáticamente ¯\_(ツ)_/¯
const pinia = createPinia();
export default { store: setActivePinia(pinia) };

export const useLicitacionStore = defineStore("licitacion", () => {
  const licitaciones = ref([]);
  const loading = ref(false);
  const licitacionActual = ref({
    nombre: "",
    num_proceso: "",
    expediente: "",
    area: "",
    subarea: "",
    firmante: "",
    modalidad: "",
    tipo_contrato: "",
    estado: "",
    plazo: "",
    inicio: null,
    vencimiento: null,
    monto: 0,
    pliego_ingreso: null,
    pliego_egreso: null,
    salida_pg1: null,
    vuelta_pg1: null,
    fecha_llamado: null,
    apertura_ofertas: null,
    fecha_vencimiento_plazo_impugnacion: null,
    fecha_vencimiento_doc: null,
    salida_pg2: null,
    vuelta_pg2: null,
    fecha_aprobatoria: null,
    aprobatoria: "",
    renglon: [],
    orden_compra: [],
  });

  const limpiarLicitacionActual = () => {
    licitacionActual.value = {
      nombre: "",
      num_proceso: "",
      expediente: "",
      area: "",
      subarea: "",
      firmante: "",
      modalidad: "",
      tipo_contrato: "",
      estado: "",
      plazo: "",
      inicio: "",
      vencimiento: "",
      monto: 0,
      pliego_ingreso: null,
      pliego_egreso: null,
      salida_pg1: null,
      vuelta_pg1: null,
      fecha_llamado: null,
      apertura_ofertas: null,
      fecha_vencimiento_plazo_impugnacion: null,
      fecha_vencimiento_doc: null,
      salida_pg2: null,
      vuelta_pg2: null,
      fecha_aprobatoria: null,
      aprobatoria: "",
      renglon: [],
      orden_compra: [],
    };
  }

  const setLicitacionActual = async (licitacion) => {
    licitacionActual.value = licitacion
  }

  const fetchLicitaciones = async () => {
    try {
      loading.value = true;
      const res = await api.get("/licitacion");
      licitaciones.value = res.data;
    } catch (err) {
      console.error("Error fetching licitaciones:", err);
    } finally {
      loading.value = false;
    }
  };

  const createLicitacion = async (licitacion) => {
    try {
      loading.value = true;
      const res = await api.post("/licitacion", licitacion);
      licitaciones.value.push(res.data);
    } catch (err) {
      console.error("Error creating licitacion:", err);
    } finally {
      loading.value = false;
    }
  };

  const updateLicitacion = async (id, licitacion) => {
    try {
      loading.value = true;
      const res = await api.put(`/licitacion?id=${id}`, { licitacion });
      const index = licitaciones.value.findIndex((l) => l._id === id);
      if (index !== -1) {
        licitaciones.value[index] = res.data;
      }
    } catch (err) {
      console.error("Error updating licitacion:", err);
    } finally {
      loading.value = false;
    }
  };

  const deleteLicitacion = async (id) => {
    try {
      loading.value = true;
      await api.delete(`/licitacion?id=${id}`);
      licitaciones.value = licitaciones.value.filter((l) => l._id !== id);
    } catch (err) {
      console.error("Error deleting licitacion:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    licitaciones,
    loading,
    licitacionActual,
    setLicitacionActual,
    limpiarLicitacionActual,
    fetchLicitaciones,
    createLicitacion,
    updateLicitacion,
    deleteLicitacion,
  };
});
