<template>
  <main class="home">
    <CurrentTime />
    <Transition name="fade" mode="out-in">
      <BaseCard v-if="isInitialized" class="corner-weather">
        <CurrentWeather />
      </BaseCard>
    </Transition>
  </main>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import CurrentTime from '@/components/CurrentTime.vue';
import CurrentWeather from '@/components/CurrentWeather.vue';
import BaseCard from '@/components/BaseCard.vue';
import { useWeatherStore } from '@/stores/weather';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'HomeView',
  components: {
    CurrentTime,
    CurrentWeather,
    BaseCard,
  },
  setup() {
    const weatherStore = useWeatherStore();
    const appId = import.meta.env.VITE_APP_ID;
    
    onBeforeMount(async () => {
      if (navigator.onLine) {
        navigator.geolocation.getCurrentPosition(async (position) =>
          await weatherStore.hydrateStore(appId, position.coords)
        );
      }
    });

    const { 
      isInitialized,
    } = storeToRefs(weatherStore);

    return {
      isInitialized
    }
  }
})
</script>

<style lang="scss">
.home {
  display: flex;
  width: 100%;
  max-width: 800px;
  margin: 0 20px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .corner-weather {
    @media (min-width: 600px) {
      position: absolute;
      margin: 0;
      top: 2rem;
      right: 2rem;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
