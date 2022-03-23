<template>
  <div class="current-weather">
    <WeatherIcon
      v-if="isInitialized"
      :icon="weatherIcon"
      :description="description"
    ></WeatherIcon>
    <CurrentTemperature
      v-if="isInitialized"
      :value="temperatureValue"
      :high="temperatureHigh"
      :low="temperatureLow"
      :location="location"
    ></CurrentTemperature>
  </div>
</template>

<script lang="ts">
import { onBeforeMount, defineComponent, reactive } from 'vue'
import CurrentTemperature from '@/components/CurrentTemperature.vue';
import WeatherIcon from '@/components/WeatherIcon.vue';
import { useWeatherStore } from '@/stores/weather';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'CurrentWeather',
  components: {
    CurrentTemperature,
    WeatherIcon,
  },
  setup() {
    const weatherStore = useWeatherStore();
    const appId = import.meta.env.VITE_APP_ID;
    
    onBeforeMount(async () => {
      if (navigator.onLine) {
        navigator.geolocation.getCurrentPosition(async (position) =>
          //  currentPosition = position.coords
          await weatherStore.hydrateStore(appId, position.coords)
        );
      }
    });

    const { 
      isInitialized,
      description,
      location, 
      temperatureLow, 
      temperatureHigh, 
      temperatureValue,
      weatherIcon, 
      weatherData 
    } = storeToRefs(weatherStore);


    return {
      isInitialized,
      description,
      location,
      temperatureLow, 
      temperatureHigh, 
      temperatureValue,
      weatherIcon,
      weatherData,
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
</style>
