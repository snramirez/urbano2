<template>
  <div>
    <v-container>
      <v-row>
        <v-btn
          @click="showAdd"
          justify="space-around"
          icon="mdi-plus"
          small
          v-tooltip="'Nueva Oferta'"
        ></v-btn>
        <h2>Ofertas</h2>
      </v-row>
      <v-row>
        <v-data-table
          :headers="headers"
          :items="datostabla"
          :row-props="itemRowBackground"
          hide-default-footer
          disable-pagination
          class="elevation-1"
        >
          <template v-slot:item.beneficiario="{ item }">
            <v-chip
              v-for="(contratista, index) in item.beneficiario"
              :key="index"
            >
              {{ contratista.razon_social }}
            </v-chip>
          </template>

          <template v-slot:item.monto_ofertado="{ item }">
            <span>{{ format.priceFormater(item.monto_ofertado) }}</span>
          </template>
          
          <template v-slot:item.actions="{ item }">
            <v-btn-toggle>
              <v-btn
                justify="space-around"
                small
                icon="mdi-pencil"
                v-tooltip="'Editar'"
                @click="cargarEdit(item)"
              ></v-btn>

              <v-btn
                justify="space-around"
                small
                icon="mdi-file-remove"
                v-tooltip="'Borrar Oferta'"
                @click="borrarOferta(item)"
              ></v-btn>

              <v-btn
                justify="space-around"
                small
                icon="mdi-check-bold"
                v-tooltip="'Ganador Licitacion'"
                @click="ganador(item)"
              ></v-btn>

              <v-btn
                justify="space-around"
                small
                icon="mdi-close-thick"
                v-tooltip="'Borrar Ganador Licitacion'"
                @click="noGanador(item)"
              ></v-btn>
            </v-btn-toggle>
          </template>
        </v-data-table>
      </v-row>
    </v-container>

    <v-dialog v-model="addWindow" max-width="700">
      <v-card class="my-10 pa-5" max-width="700">
        <v-card-title class="d-flex justify-center pt-5"
          >Nueva Oferta</v-card-title
        >
        <v-divider></v-divider>
        <v-card-text class="pa-3">
          <v-form @submit.lazy="">
            <v-row>
              <v-col cols="10">
                <v-select
                  v-model="beneficiario"
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

            <v-row class="mt-8 mx-auto">
              <currency-field
                label="Oferta"
                v-model="monto_ofertado"
              ></currency-field>
            </v-row>

            <v-row>
              <v-textarea
                v-model="observacion"
                name="Observaciones"
                label="Observaciones"
                variant="outlined"
                auto-grow
                :counter="300"
              ></v-textarea>
            </v-row>
            <v-btn color="success" @Click="agregarOferta" class="pa-2"
              >Agregar</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editWindow" max-width="700">
      <v-card class="my-10 pa-5" max-width="700">
        <v-card-title class="d-flex justify-center pt-5"
          >Editar Oferta</v-card-title
        >
        <v-divider></v-divider>
        <v-card-text class="pa-3">
          <v-form @submit.lazy="">
            <v-row>
              <v-col cols="10">
                <v-select
                  v-model="beneficiario"
                  multiple
                  :item-props="itemProps"
                  :items="contratistas"
                  label="Contratista"
                  required
                  variant="outlined"
                ></v-select>
              </v-col>
            </v-row>

            <v-row class="mt-8 mx-auto">
              <currency-field
                label="Oferta"
                v-model="monto_ofertado"
              ></currency-field>
            </v-row>

            <v-row>
              <v-textarea
                v-model="observacion"
                name="Observaciones"
                label="Observaciones"
                variant="outlined"
                auto-grow
                :counter="300"
              ></v-textarea>
            </v-row>
            <v-btn color="success" @Click="editOferta" class="pa-2"
              >Agregar</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import format from "../utils/formatText";

export default {
  data() {
    return {
      headers: [
        { title: "Razon Social", value: "beneficiario" },
        { title: "Oferta", value: "monto_ofertado" },
        // { title: "Diferencia %", value: "Porcentage" },
        { title: "Observaciones", value: "observacion" },
        { title: "Accion", value: "actions", sortable: false },
      ],
      addWindow: false,
      editWindow: false,
      monto_ofertado: 0,
      observacion: "",
      beneficiario: [],
      editIndex: -1,
      format: format,
    };
  },
  props: {
    contratistas: Array,
    datostabla: Array,
  },

  methods: {
    showAdd() {
      this.addWindow = !this.addWindow;
    },

    showEdit() {
      this.editWindow = !this.editWindow;
    },

    itemRowBackground(item) {
      console.log(item.item.ganador);
      return item.item.ganador ? { class: "style-1" } : { class: "" };
    },
    itemProps(item) {
      return {
        title: item.razon_social,
        subtitle: item.cuit,
      };
    },
    agregarOferta() {
      this.datostabla.push({
        monto_ofertado: this.monto_ofertado,
        observacion: this.observacion,
        ganador: false,
        documentacion: true,
        beneficiario: this.beneficiario,
      });
      this.showAdd();
      this.limpiarVistaAgregar();
    },

    limpiarVistaAgregar() {
      this.monto_ofertado = 0;
      this.observacion = "";
      this.beneficiario = [];
    },

    ganador(item) {
      this.datostabla.forEach((element) => {
        if (element._id === item._id) {
          element.ganador = true;
        }
      });
    },

    noGanador(item) {
      this.datostabla.forEach((element) => {
        if (element._id === item._id) {
          element.ganador = false;
        }
      });
    },

    cargarEdit(item) {
      this.showEdit();
      this.beneficiario = [];
      this.monto_ofertado = item.monto_ofertado;
      this.observacion = item.observacion;
      this.beneficiario = item.beneficiario;
      this.editIndex = this.datostabla.indexOf(item);
    },

    editOferta() {
      this.datostabla[this.editIndex] = {
        monto_ofertado: this.monto_ofertado,
        observacion: this.observacion,
        ganador: false,
        documentacion: true,
        beneficiario: this.beneficiario,
      };
      this.showEdit();
      this.limpiarVistaAgregar();
    },

    borrarOferta(item) {
      let index = this.datostabla.indexOf(item);
      this.datostabla.splice(index, 1);
    },
  },
};
</script>

<style>
.style-1 {
  background-color: #ffd500;
}

.style-2 {
  background-color: rgb(223, 35, 22);
}
</style>
