import type WeatherData from '@/models/WeatherData';
import WeatherService from '@/services/weatherService';
import { defineStore } from 'pinia'

export const useWeatherStore = defineStore({
  id: 'weather',
  state: () => ({
    initialized: false,
    data: {},
  }) as WeatherState,
  getters: {
    isInitialized: (state) => state.initialized,
    weatherData: (state) => state.data,
    temperatureValue: (state) => { return Math.round(state.data.main.temp) },
    temperatureHigh: (state) => { return Math.round(state.data.main.temp_max) },
    temperatureLow: (state) => { return Math.round(state.data.main.temp_min) },
    description: (state) =>  { return state.data.weather[0].description },
    location: (state) =>  {
      if (state.data.name === null && state.data.sys.country === null) {
        return '';
      }
      return `${state.data.name}, ${state.data.sys.country}`;
    },
    weatherIcon: (state) =>  {
      const id = state.data.weather[0].id;

      if (id > 199 && id < 233) {
        return '/icons/weather/thunderstorm.svg';
      }
  
      if (id > 299 && id < 322 || id > 499 && id < 532) {
        return '/icons/weather/rain.svg';
      }
  
      if (id > 599 && id < 623) {
        return '/icons/weather/snow.svg';
      }
  
      return '/icons/weather/cloud.svg';
    },
  },
  actions: {
    async getWeatherData(appId: string, coordinates: GeolocationCoordinates) {
      try {
        this.data = await WeatherService.GetWeatherData(appId, coordinates);
      } catch (error) {
        console.error(error);
      }
    },
    async hydrateStore(appId: string, coordinates: GeolocationCoordinates) {
      if (!this.initialized) {
        await this.getWeatherData(appId, coordinates);
        this.initialized = true;
      }
    },
  }
})

interface WeatherState {
  initialized: boolean;
  data: WeatherData;
}

// interface WeatherState {
//   initialized: boolean;
//   cloudiness: number;
//   windSpeed: number;
//   humidity: number;
//   temperatureValue: number;
//   temperatureHigh: number;
//   temperatureLow: number;
//   location: string;
//   description: string;
//   weatherIcon: string;
// }