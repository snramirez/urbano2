<script setup>
import { useCurrencyInput } from 'vue-currency-input';
import { watch } from 'vue';

const props = defineProps({ modelValue: Number, label: String });

const { inputRef, formattedValue, numberValue, setValue } = useCurrencyInput({
  currency: 'ARS',
  locale: 'es-AR',
  currencyDisplay:'code',
  hideCurrencySymbolOnFocus: false,
  hideGroupingSeparatorOnFocus: false,
  precision: 2,
});

watch(
  () => props.modelValue,
  (value) => {
    setValue(value);
  }
);
</script>

<template>
  <VTextField
    v-model="formattedValue"
    variant="outlined"
    ref="inputRef"
    :label="label"
  >
  </VTextField>
</template>