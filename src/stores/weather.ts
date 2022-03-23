import WeatherService from '@/services/weatherService';
import { defineStore } from 'pinia'

export const useWeatherStore = defineStore({
  id: 'weather',
  state: () => ({
    initialized: false,
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
    async getWeatherData(appId: string, coordinates: GeolocationCoordinates) {
      try {
        const data = await WeatherService.GetWeatherData(appId, coordinates);
        this.temperatureValue = data.main.temp;
        this.temperatureHigh = data.main.temp_max;
        this.temperatureLow = data.main.temp_min;
        this.description = data.weather[0].description;
        this.location.name = data.name;
        this.location.country = data.sys.country;
        this.weatherIcon = data.weather[0].icon;
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
  temperatureValue: number;
  temperatureHigh: number;
  temperatureLow: number;
  description: string;
  location: Location;
  weatherIcon: string;
}

interface Location {
  name: string;
  country: string;
}