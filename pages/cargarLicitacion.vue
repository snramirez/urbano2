<template>
  <v-container>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-title> Proceso </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Nombre"
                v-model="data.nombre"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="N° Proceso"
                v-model="data.num_proceso"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Expediente"
                v-model="data.expediente"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Area"
                v-model="data.area"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Modalidad"
                v-model="data.modalidad"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Tipo Contrato"
                v-model="data.tipo_contrato"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Estado"
                v-model="data.estado"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Plazo"
                v-model="data.plazo"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Inicio"
                v-model="data.inicio"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Finalizacion"
                v-model="data.vencimiento"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title> Licitacion </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="data.pliego_ingreso"
                label="Ingreso Pliego"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="data.pliego_egreso"
                label="Egreso Pliego"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="data.salida_pg1"
                label="Salida PG"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="data.vuelta_pg1"
                label="Vuelta PG"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="data.fecha_llamado"
                label="Fecha de Llamado"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="data.apertura_ofertas"
                label="Apertura de Ofertas"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="data.fecha_acta_preadjudicacion"
                label="Fecha Preadjudicacion"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Acta Preadjudicacion"
                v-model="data.acta_preadjudicacion"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="data.salida_pg2"
                label="Salida PG2"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="data.vuelta_pg2"
                label="Vuelta PG2"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="data.fecha_aprobatoria"
                label="Fecha Aprobatoria"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Aprobatoria"
                v-model="data.aprobatoria"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-btn @click="addRenglon">Nuevo Renglon</v-btn>

    <v-expansion-panels v-model="panelRenglon" multiple>
      <v-expansion-panel v-for="(renglon, index) in data.renglon" :key="index">
        <v-expansion-panel-title>
          Renglon {{ index + 1 }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="renglon.descripcion"
                label="Descripcion"
                variant="outlined"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <currency-field
                v-model="renglon.monto"
                label="Monto"
              ></currency-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <contractor-offer :contratistas=contratistas :datostabla="renglon.oferta"/>
            </v-col>
          </v-row>
          

          <v-row>
            <v-divider></v-divider>
            <h2>Orden de Compra</h2>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Numero de Orden"
                v-model="renglon.orden_compra.num_orden"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Tipo de Orden"
                v-model="renglon.orden_compra.tipo"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <currency-field
                label="Monto"
                v-model="renglon.orden_compra.monto"
              ></currency-field>
            </v-col>            
          </v-row>

          <v-row>
            <v-col cols="6">
              <prorroga :data=renglon.orden_compra.prorroga />
            </v-col>
            <v-col cols="6">
              <ampliatoria :data="renglon.orden_compra.ampliatoria"></ampliatoria>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import data from "../utils/data";
export default {
  data() {
    return {
      panel: [],
      panelRenglon: [],
      data: data.empyData,
      contratistas: [
        {
          razon_social: "Carlos SRL",
          cuit: "23-45452214-2",
        },
        {
          razon_social: "Miguel SRL",
          cuit: "33-55484511-8",
        },
        {
          razon_social: "Nakamura Contrstucciones SA",
          cuit: "33-55541255-4",
        },
      ],
      prorroga: [
        {
          acta: "N2154112",
          vencimiento: "2024-04-20T00:00:00.000+00:00",
        }
      ],
      ampliatoria: [
        {
          acta: "N2154112",
          fecha: "2024-04-20T00:00:00.000+00:00",
          monto: 1000
        }
      ],
      datostabla: [
        {
          _id:"1234",
          monto_ofertado: 1000000,
          observacion: "Muy caro",
          ganador: false,
          documentacion: true,
          beneficiario: [
            {
              razon_social: "Carlos SRL",
              cuit: "",
            },
          ],
        },
        {
          _id:"1235",
          monto_ofertado: 1100000,
          observacion: "Muy muy caro",
          ganador: false,
          documentacion: true,
          beneficiario: [
            {
              razon_social: "Miguel SRL",
              cuit: "",
            },
            {
              razon_social: "Nakamura Contrstucciones SA",
              cuit: "",
            },
          ],
        },
      ],
    };
  },
  methods: {
    addRenglon() {
      this.data.renglon.push({
        descripcion: "",
        monto: 0,
        orden_compra: {
          num_orden:'',
          monto: 0,
          tipo:'',
          prorroga: [],
          ampliatoria: []
        },
        oferta: [],
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
