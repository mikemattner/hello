<template>
  <main class="home">
    <header class="home-header">
      <div class="corner-weather">
        <BaseCard>
          <CurrentWeather />
        </BaseCard>
      </div>
      <CurrentTime class="current-time" />
    </header>
    <ToDos />
  </main>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import CurrentTime from '@/components/CurrentTime.vue';
import CurrentWeather from '@/components/CurrentWeather.vue';
import BaseCard from '@/components/BaseCard.vue';
import { useWeatherStore } from '@/stores/weather';
import { storeToRefs } from 'pinia';
import ToDos from '../components/ToDos.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    CurrentTime,
    CurrentWeather,
    BaseCard,
    ToDos,
  },
  setup() {
    const weatherStore = useWeatherStore();
    const appId = import.meta.env.VITE_APP_ID;

    onBeforeMount(async () => {
      if (navigator.onLine) {
        navigator.geolocation.getCurrentPosition(
          async (position) => await weatherStore.hydrateStore(appId, position.coords),
        );
      }
    });

    const { isInitialized } = storeToRefs(weatherStore);

    return {
      isInitialized,
    };
  },
});
</script>

<style lang="scss">
.home {
  width: 100%;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  &-header {
    @media (min-width: 1300px) {
      display: grid;
      grid-template-columns:
        [empty] 1fr
        [time] 1fr
        [weather] 1fr;
      gap: 20px;
    }
  }

  .current-time {
    grid-area: time;
  }

  .corner-weather {
    grid-area: weather;
    min-height: 117px;
    .card {
      margin-top: 0;
      margin-bottom: 0;
      max-width: max-content;
      @media (max-width: 1299px) {
        margin-left: auto;
        margin-right: auto;
      }
      @media (min-width: 1300px) {
        margin-left: auto;
      }
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

.fadestay-enter-active,
.fadestay-leave-active {
  transition: opacity 200ms ease;
  position: absolute;
}

.fadestay-enter-from,
.fadestay-leave-to {
  opacity: 0;
}
</style>
