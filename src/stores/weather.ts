import type { WeatherState } from '@/types/types';
import WeatherService from '@/services/weatherService';
import { defineStore } from 'pinia'

export const useWeatherStore = defineStore({
  id: 'weather',
  state: () => ({
    initialized: false,
    error: false,
    temperatureValue: 0,
    temperatureHigh: 0,
    temperatureLow: 0,
    description: '',
    location: {
      name: '',
      country: '',
    },
    weatherIcon: '',
  }) as WeatherState,
  getters: {
    isInitialized: (state) => state.initialized,
    isError: (state) => state.error,
    getTemperatureValue: (state) => { return Math.round(state.temperatureValue) },
    getTemperatureHigh: (state) => { return Math.round(state.temperatureHigh) },
    getTemperatureLow: (state) => { return Math.round(state.temperatureLow) },
    getDescription: (state) =>  { return state.description },
    getLocation: (state) =>  {
      if (state.location.name === null && state.location.country === null) {
        return '';
      }
      return `${state.location.name}, ${state.location.country}`;
    },
    getWeatherIcon: (state) =>  { return state.weatherIcon; },
  },
  actions: {
    async getWeatherData(coordinates: GeolocationCoordinates) {
      try {
        const data = await WeatherService.GetWeatherData(coordinates);
        this.temperatureValue = data.main.temp;
        this.temperatureHigh = data.main.temp_max;
        this.temperatureLow = data.main.temp_min;
        this.description = data.weather[0].description;
        this.location.name = data.name;
        this.location.country = data.sys.country;
        this.weatherIcon = data.weather[0].icon;
      } catch (error) {
        this.error = true;
      }
    },
    async hydrateStore(coordinates: GeolocationCoordinates) {
      this.initialized = false;
      await this.getWeatherData(coordinates);
      this.initialized = true;
    },
  }
})
