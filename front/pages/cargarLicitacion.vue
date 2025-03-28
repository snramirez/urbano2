<template>
  <v-container>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-title> Proceso </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field variant="outlined" label="Nombre" v-model="data.nombre"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field variant="outlined" label="N° Proceso" v-model="data.num_proceso"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field variant="outlined" label="Expediente" v-model="data.expediente"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field variant="outlined" label="Area" v-model="data.area"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-text-field variant="outlined" label="Sub Area" v-model="data.subarea"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field variant="outlined" label="Firmante" v-model="data.firmante"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field variant="outlined" label="Modalidad" v-model="data.modalidad"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field variant="outlined" label="Tipo Contrato" v-model="data.tipo_contrato"></v-text-field>
            </v-col>

          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-text-field variant="outlined" label="Estado" v-model="data.estado"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field variant="outlined" label="Plazo" v-model="data.plazo"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field variant="outlined" label="Inicio" v-model="data.inicio"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field variant="outlined" label="Finalizacion" v-model="data.vencimiento"></v-text-field>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title> Licitacion </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col cols="12" md="3">
              <v-date-input v-model="data.pliego_ingreso" label="Ingreso Pliego" prepend-icon="mdi-calendar"
                variant="outlined" clearable></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input v-model="data.pliego_egreso" label="Egreso Pliego" prepend-icon="mdi-calendar"
                variant="outlined" clearable></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input v-model="data.salida_pg1" label="Salida PG" prepend-icon="mdi-calendar" variant="outlined"
                clearable></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input v-model="data.vuelta_pg1" label="Vuelta PG" prepend-icon="mdi-calendar" variant="outlined"
                clearable></v-date-input>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-date-input v-model="data.fecha_llamado" label="Fecha de Llamado" prepend-icon="mdi-calendar"
                variant="outlined" clearable></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input v-model="data.apertura_ofertas" label="Apertura de Ofertas" prepend-icon="mdi-calendar"
                variant="outlined" clearable></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input v-model="data.fecha_vencimiento_plazo_impugnacion" label="Vencimiento Plazo Impugnacion"
                prepend-icon="mdi-calendar" variant="outlined" clearable></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input v-model="data.fecha_vencimiento_doc" label="Vencimiento Documentacion"
                prepend-icon="mdi-calendar" variant="outlined" clearable></v-date-input>
            </v-col>

          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-date-input v-model="data.salida_pg2" label="Salida PG2" prepend-icon="mdi-calendar" variant="outlined"
                clearable></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input v-model="data.vuelta_pg2" label="Vuelta PG2" prepend-icon="mdi-calendar" variant="outlined"
                clearable></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input v-model="data.fecha_aprobatoria" label="Fecha Aprobatoria" prepend-icon="mdi-calendar"
                variant="outlined" clearable></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field variant="outlined" label="Aprobatoria" v-model="data.aprobatoria"></v-text-field>
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
              <v-text-field v-model="renglon.descripcion" label="Descripcion" variant="outlined"
                clearable></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <currency-field v-model="renglon.monto" label="Monto"></currency-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <contractor-offer :contratistas=contratistas :datostabla="renglon.oferta" />
            </v-col>
          </v-row>

        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>


    <v-btn @click="addOC">Nueva Orden de Compra</v-btn>

    <v-expansion-panels v-model="panelOC" multiple>
      <v-expansion-panel v-for="(OC, index) in data.orden_compra" :key="index">
        <v-expansion-panel-title>
          Orden de Compra {{ index + 1 }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field variant="outlined" label="Numero de Orden" v-model="OC.num_orden"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                  v-model="OC.tipo"
                  :items="tipoOC"
                  label="Tipo Orden"
                  required
                  variant="outlined"
                ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <currency-field label="Monto Original" v-model="OC.monto"></currency-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                  v-model="OC.destinatario"
                  multiple
                  chips
                  :item-props="itemProps"
                  :items="contratistas"
                  label="Contratista"
                  required
                  variant="outlined"
                ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-select
                  v-model="OC.origen"
                  :items="origenOC"
                  label="Origen"
                  required
                  variant="outlined"
                ></v-select>
            </v-col>

            <v-col v-if="OC.origen === 'AMPLIATORIA'" cols="12" md="3">
              <v-select
                  v-model="OC.ampliatoria_origen"
                  :items="getAmpliatoria()"
                  label="Ampliatoria origen"
                  required
                  clearable
                  variant="outlined"
                ></v-select>
            </v-col>

            <v-col v-if="OC.origen === 'PRORROGA'" cols="12" md="3">
              <v-select
                  v-model="OC.prorroga_origen"
                  :items="getPrroroga()"
                  label="Prorroga origen"
                  required
                  clearable
                  variant="outlined"
                ></v-select>
            </v-col>

            <v-col v-if="OC.origen === 'RENGLON'" cols="12" md="3">
              <v-select
                  v-model="OC.renglon_origen"
                  :items="getRenglon()"
                  label="Renglon origen"
                  required
                  clearable
                  variant="outlined"
                ></v-select>
            </v-col>

            <v-col cols="12" md="3">
              <currency-field variant="outlined" :model-value="getMontoTotal(OC)" readonly label="Monto Total"></currency-field>
            </v-col>
          </v-row>


          <v-row>
            <v-col cols="6">
              <prorroga :data=OC.prorroga />
            </v-col>
            <v-col cols="6">
              <ampliatoria :data="OC.ampliatoria"></ampliatoria>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <control :orden_compra=OC />
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
      panelOC: [],
      data: data.empyData,
      tipoOC: ["ABIERTA", "CERRADA"],
      origenOC: ["RENGLON", "AMPLIATORIA", "PRORROGA"],
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
          _id: "1234",
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
          _id: "1235",
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
          num_orden: '',
          monto: 0,
          tipo: '',
          prorroga: [],
          ampliatoria: []
        },
        oferta: [],
      });
    },

    addOC() {
      this.data.orden_compra.push({
        num_orden: '',
        monto: 0,
        tipo: '',
        destinatario: null,
        origen:'',
        ampliatoria_origen: '',
        prorroga_origen: '',
        renglon_origen: '',
        prorroga: [],
        ampliatoria: [],
        control:[]
      });
    },
    
    itemProps(item) {
      return {
        title: item.razon_social,
        subtitle: item.cuit,
      };
    },

    getAmpliatoria(){
      let listAmp = []
      this.data.orden_compra.forEach(OC => {
        OC.ampliatoria.forEach(amp => {
          listAmp.push(amp.acta)
        })
      })
      return listAmp
    },

    getPrroroga(){
      let listProrroga = []
      this.data.orden_compra.forEach(OC => {
        OC.prorroga.forEach(pro => {
          listProrroga.push(pro.acta)
        })
      })
      return listProrroga
    },

    getRenglon(){
      let listRenglon = []
      this.data.renglon.forEach(renglon => listRenglon.push(renglon.descripcion))
      return listRenglon
    },

    getMontoTotal(orden){
      let montoTotal = 0
      orden.ampliatoria.forEach(amp => montoTotal += amp.monto)
      montoTotal += orden.monto
      return montoTotal 
    }
  },

  computed:{
  }
};
</script>

<style lang="scss" scoped></style>
