<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 51">
    <path
      d="M29.18,25.47,45.78,8.88a3,3,0,0,0-4.22-4.22L25,21.25,8,4.26A3,3,0,0,0,3.75,8.48l17,17-17,17a3,3,0,0,0,0,4.22,3,3,0,0,0,4.22,0l17-17,16.6,16.59a2.94,2.94,0,0,0,2.11.88,3,3,0,0,0,2.11-5.1Z"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CloseIcon',
});
</script>

<style scoped>
svg {
  width: 15px;
  height: 15px;
  fill: #dcebf6;
  transition: all 0.25s ease-in-out;
}
</style>
