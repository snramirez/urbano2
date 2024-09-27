<template>
    <div>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ props }">
          <v-text-field
            v-model="date"
            :label="message"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="props"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          @input="menu = false"
          locale="es-AR"
        ></v-date-picker>
      </v-menu>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
          menu: false,
          date: '',
      };
    },
  
    props: {
      message: String,
      //this value (index) if for track from where its come. Some date picker
      //are in a array, and for updated is need the index value, inside this component
      //don't have a function  
      index: {
        type: Number,
        default: 0
      }, 
      //This value is for update de date if this component is called in a edit view
      initialDate: String,
    },
  
    watch: {
        date(newVal, oldVal){
            this.$emit("update-date", {
              date: newVal, 
              index: this.index});
        },
        initialDate(newVal, oldVal){
          this.date = newVal
        }
  
      },
    
  };
  </script>
  <style lang=""></style>