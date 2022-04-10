<template>
  <main class="home">
    <ToDos />
  </main>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import ToDos from '../components/ToDos.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    ToDos,
  },
});
</script>

<style lang="scss">
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px;
}
</style>
