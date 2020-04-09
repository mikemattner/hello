<template>
  <div class="current-weather">
    <WeatherIcon
      :icon="this.forecast.weatherIcon"
      :description="this.forecast.description"
    ></WeatherIcon>
    <Temperature
      :value="this.forecast.temperatureValue"
      :high="this.forecast.temperatureHigh"
      :low="this.forecast.temperatureLow"
      :location="this.forecast.location"
    ></Temperature>
  </div>
</template>

<script>
import Temperature from '@/components/Temperature.vue';
import WeatherIcon from '@/components/WeatherIcon.vue';
import WeatherForecast from '../api/WeatherForecast';

export default {
  name: 'CurrentWeather',
  components: {
    Temperature,
    WeatherIcon,
  },
  data() {
    return {
      forecast: new WeatherForecast(),
    };
  },
};
</script>

<style scoped lang="scss">
.current-weather {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
