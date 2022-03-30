import WeatherData from '@/models/WeatherData';
import axios from 'axios';

export default class WeatherService {
  private static api = axios.create({
    baseURL: '/api',
  });

  public static GetWeatherData(coordinates: GeolocationCoordinates): Promise<WeatherData> {
    return this.api.get(`/weather?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`).then((response) => {
      return new WeatherData(response.data);
    });
  }
}