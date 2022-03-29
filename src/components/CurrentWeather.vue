<template>
  <div class="current-weather">
    <WeatherIcon :icon="weatherIcon" @click="updateWeather()" />
    <CurrentTemperature
      :temperature-value="getTemperatureValue"
      :high="getTemperatureHigh"
      :low="getTemperatureLow"
      :description="getDescription"
      :location="getLocation"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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

    const { getDescription, getLocation, getTemperatureLow, getTemperatureHigh, getTemperatureValue, weatherIcon } =
      storeToRefs(weatherStore);

    const updateWeather = async () => {
      if (navigator.onLine) {
        navigator.geolocation.getCurrentPosition(async (position) => await weatherStore.hydrateStore(position.coords));
      }
    };

    return {
      getDescription,
      getLocation,
      getTemperatureLow,
      getTemperatureHigh,
      getTemperatureValue,
      weatherIcon,
      updateWeather,
    };
  },
});
</script>

<style scoped lang="scss">
.current-weather {
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100%;
}
</style>
