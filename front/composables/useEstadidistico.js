export function useEstadidistico() {
  const getMontoTotal = (licitacion) => {
    let montoTotal = 0;
    licitacion.orden_compra.forEach((orden) => {
      montoTotal += orden.monto;
    });
    return montoTotal;
  };

  const getMontoTotalDevengado = (licitacion) => {
    let montoTotal = 0;
    licitacion.orden_compra.forEach((orden) => {
      orden.control.forEach((control) => {
        if (control.estado === "DEVENGADO" || control.estado === "PAGADO") {
          montoTotal += control.monto_ejecutado;
        }
      });
    });
    return montoTotal;
  };

    const getMontoTotalPagado = (licitacion) => {
    let montoTotal = 0;
    licitacion.orden_compra.forEach((orden) => {
      orden.control.forEach((control) => {
        if (control.estado === "PAGADO") {
          montoTotal += control.monto_ejecutado;
        }
      });
    });
    return montoTotal;
  };

  const devengadosPedientes = (licitacion) => {
    return licitacion.orden_compra.some((orden) => {
      return orden.control.some((control) => {
        let currentDate = new Date();
        if (
          new Date(control.periodo) < currentDate &&
          control.estado === "NO DEVENGADO"
        ) {
          return true;
        } else {
          return false;
        }
      });
    });
  };

  const pagosPendientes = (licitacion) => {
    return licitacion.orden_compra.some((orden) => {
      return orden.control.some((control) => {
        let currentDate = new Date();
        if (
          new Date(control.periodo) < currentDate &&
          control.estado != "PAGADO"
        ) {
          return true;
        } else {
          return false;
        }
      });
    });
  };

  return {
    getMontoTotal,
    getMontoTotalDevengado,
    getMontoTotalPagado,
    devengadosPedientes,
    pagosPendientes,
  };
}
