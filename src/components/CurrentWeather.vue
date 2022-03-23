<template>
  <div class="current-weather">
    <WeatherIcon
      :icon="weatherIcon"
      :description="getDescription"
    ></WeatherIcon>
    <CurrentTemperature
      :temperature-value="getTemperatureValue"
      :high="getTemperatureHigh"
      :low="getTemperatureLow"
      :location="getLocation"
    ></CurrentTemperature>
  </div>
</template>

<script lang="ts">
import { onBeforeMount, defineComponent } from 'vue'
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
          await weatherStore.hydrateStore(appId, position.coords)
        );
      }
    });

    const { 
      isInitialized,
      getDescription,
      getLocation, 
      getTemperatureLow, 
      getTemperatureHigh, 
      getTemperatureValue,
      weatherIcon, 
    } = storeToRefs(weatherStore);


    return {
      isInitialized,
      getDescription,
      getLocation, 
      getTemperatureLow, 
      getTemperatureHigh, 
      getTemperatureValue,
      weatherIcon,
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
