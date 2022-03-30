import WeatherData from '@/models/WeatherData';
import axios from 'axios';

export default class WeatherService {
  // private static api = axios.create({
  //   baseURL: 'https://api.openweathermap.org/data/2.5',
  // });

  private static api = axios.create({
    baseURL: '/api/weather',
  });

  public static GetWeatherData(coordinates: GeolocationCoordinates): Promise<WeatherData> {
    return this.api.get(`?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`).then((response) => {
      return new WeatherData(response.data);
    });
  }
}