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
    weatherId: 0,
  } as WeatherState),
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
    weatherIcon: (state) =>  {
      const id = state.weatherId;

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
        const data = await WeatherService.GetWeatherData(appId, coordinates);
        this.temperatureValue = data.main.temp;
        this.temperatureHigh = data.main.temp_max;
        this.temperatureLow = data.main.temp_min;
        this.description = data.weather[0].description;
        this.location.name = data.name;
        this.location.country = data.sys.country;
        this.weatherId = data.weather[0].id;
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
  weatherId: number;
}

interface Location {
  name: string;
  country: string;
}