<template>
  <div class="main-view">
    <RouterView />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import moment from 'moment';

export default defineComponent({
  name: 'DashboardApp',
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;700;900&display=swap');
@import '@/assets/styles/open-weather-icons.scss';
@import '@/assets/styles/custom-properties.scss';
@import '@/assets/styles/base.scss';

.main-view {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  padding: 0 20px;
}
</style>
