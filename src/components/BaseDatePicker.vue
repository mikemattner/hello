<template>
  <div>
    <Datepicker v-model="modelValue" v-on="events" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Datepicker from 'vue3-datepicker';

export default defineComponent({
  name: 'BaseDatePicker',
  components: {
    Datepicker,
  },
  props: {
    modelValue: {
      type: Date,
      default: '',
    },
  },
  setup(props, { emit }) {
    const events = computed(() => {
      return {
        input: (event: any) => {
          emit('update:modelValue', event.target.value);
        },
        focus: (event: any) => {
          emit('focus', event);
        },
        blur: (event: any) => {
          emit('blur', event);
        },
      };
    });

    return {
      events,
    };
  },
});
</script>

<style scoped></style>
