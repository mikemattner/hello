import type WeatherData from "@/models/WeatherData";

export const data: WeatherData = {
    "coord": {
      "lon": -86.4588,
      "lat": 42.0781
    },
    "weather": [
      {
        "id": 701,
        "main": "Mist",
        "description": "mist",
        "icon": "50d"
      }
    ],
    "base": "stations",
    "main": {
      "temp": 8.08,
      "feels_like": 5.35,
      "temp_min": 7.05,
      "temp_max": 9.27,
      "pressure": 999,
      "humidity": 92
    },
    "visibility": 4828,
    "wind": {
      "speed": 4.63,
      "deg": 120
    },
    "clouds": {
      "all": 100
    },
    "dt": 1648037872,
    "sys": {
      "type": 2,
      "id": 2005599,
      "country": "US",
      "sunrise": 1648035833,
      "sunset": 1648080047
    },
    "timezone": -14400,
    "id": 4992394,
    "name": "Fair Plain",
    "cod": 200
}