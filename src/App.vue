<template>
  <div class="main-view">
    <AppHeader />
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <AppFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import { useWeatherStore } from '@/stores/weather';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default defineComponent({
  components: {
    AppHeader,
    AppFooter,
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
@import '@/assets/styles/normalize.scss';
@import '@/assets/styles/open-weather-icons.scss';
@import '@/assets/styles/custom-properties.scss';
@import '@/assets/styles/base.scss';

.main-view {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  padding: 0 0 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.125s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
