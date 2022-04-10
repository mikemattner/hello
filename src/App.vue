<template>
  <div class="main-view">
    <AppHeader />
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import { useWeatherStore } from '@/stores/weather';
import AppHeader from '@/components/AppHeader.vue';

export default defineComponent({
  components: {
    AppHeader,
  },
  name: 'DashboardApp',
  setup() {
    const weatherStore = useWeatherStore();
    onBeforeMount(async () => {
      if (navigator.onLine) {
        navigator.geolocation.getCurrentPosition(async (position) => await weatherStore.hydrateStore(position.coords));
      }
    });
  },
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;700;900&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Outlined');
@import '@/assets/styles/open-weather-icons.scss';
@import '@/assets/styles/custom-properties.scss';
@import '@/assets/styles/base.scss';

.main-view {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  padding: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 100ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
