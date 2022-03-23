import WeatherData from '@/models/WeatherData';
import axios from 'axios';

export default class WeatherService {
  private static api = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
  });

  public static GetWeatherData(appId: string, coordinates: GeolocationCoordinates): Promise<WeatherData> {
    return this.api.get(`/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${appId}&units=metric`).then((response) => {
      return new WeatherData(response.data);
    });
  }
}