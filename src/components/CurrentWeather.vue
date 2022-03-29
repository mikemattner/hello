<template>
  <div class="current-weather">
    <Transition name="fadeweather" mode="out-in">
      <WeatherIcon v-if="isInitialized" :icon="weatherIcon" @click="updateWeather()" />
    </Transition>
    <Transition name="fadeweather" mode="out-in">
      <CurrentTemperature
        v-if="isInitialized"
        :temperature-value="getTemperatureValue"
        :high="getTemperatureHigh"
        :low="getTemperatureLow"
        :description="getDescription"
        :location="getLocation"
      />
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CurrentTemperature from '@/components/CurrentTemperature.vue';
import WeatherIcon from '@/components/WeatherIcon.vue';
import { useWeatherStore } from '@/stores/weather';
import { storeToRefs } from 'pinia';
import useBreakpoints from '@/composables/useBreakpoints';

export default defineComponent({
  name: 'CurrentWeather',
  components: {
    CurrentTemperature,
    WeatherIcon,
  },
  setup() {
    const { sm } = useBreakpoints();
    const weatherStore = useWeatherStore();
    const appId = import.meta.env.VITE_APP_ID;

    const {
      isInitialized,
      getDescription,
      getLocation,
      getTemperatureLow,
      getTemperatureHigh,
      getTemperatureValue,
      weatherIcon,
    } = storeToRefs(weatherStore);

    const updateWeather = async () => {
      if (navigator.onLine) {
        navigator.geolocation.getCurrentPosition(
          async (position) => await weatherStore.hydrateStore(appId, position.coords),
        );
      }
    };

    return {
      isInitialized,
      getDescription,
      getLocation,
      getTemperatureLow,
      getTemperatureHigh,
      getTemperatureValue,
      weatherIcon,
      updateWeather,
      sm,
    };
  },
});
</script>

<style scoped lang="scss">
.current-weather {
  display: flex;
  justify-content: center;
  align-items: center;
}
.fadeweather-enter-active,
.fadeweather-leave-active {
  transition: opacity 200ms ease;
}

.fadeweather-enter-from,
.fadeweather-leave-to {
  opacity: 0;
}
</style>
