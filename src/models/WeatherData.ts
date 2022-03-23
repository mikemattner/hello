export default class WeatherData {
    coord: WeatherCoordinates = new WeatherCoordinates();
    weather: WeatherItem[] = [];
    base: string = '';
    main: WeatherMain = new WeatherMain();
    visibility: number = 0;
    wind: WeatherWind = new WeatherWind();
    clouds: WeatherClouds = new WeatherClouds();
    dt: number = 0;
    sys: WeatherSys = new WeatherSys();
    timezone: number = 0;
    id: number = 0;
    name: string = '';
    cod: number = 0;
  
    constructor(weatherDataObject?: WeatherData) {
      if (weatherDataObject) {
        Object.assign(this, weatherDataObject);
      }
    }
}

export class WeatherCoordinates implements WeatherCoordinates {
    lon: number = 0;
    lat: number = 0;
  
    constructor(weatherCoordinates?: WeatherCoordinates) {
      if (weatherCoordinates) {
        Object.assign(this, weatherCoordinates);
      }
    }
}

export class WeatherItem implements WeatherItem {
    id: number = 0;
    main: string = '';
    description: string = '';
    icon: string = '';
  
    constructor(weatherItem?: WeatherItem) {
      if (weatherItem) {
        Object.assign(this, weatherItem);
      }
    }
}

export class WeatherMain implements WeatherMain {
    temp: number = 0;
    feels_like: number = 0;
    temp_min: number = 0;
    temp_max: number = 0;
    pressure: number = 0;
    humidity: number = 0;
  
    constructor(weatherMain?: WeatherMain) {
      if (weatherMain) {
        Object.assign(this, weatherMain);
      }
    }
}

export class WeatherWind implements WeatherWind {
    speed: number = 0;
    deg: number = 0;
  
    constructor(weatherWind?: WeatherWind) {
      if (weatherWind) {
        Object.assign(this, weatherWind);
      }
    }
}

export class WeatherClouds implements WeatherClouds {
    all: number = 0;
  
    constructor(weatherClouds?: WeatherClouds) {
      if (weatherClouds) {
        Object.assign(this, weatherClouds);
      }
    }
}

export class WeatherSys implements WeatherSys {
    type: number = 0;
    id: number = 0;
    country: string = '';
    sunrise: number = 0;
    sunset: number = 0;
  
    constructor(weatherSys?: WeatherSys) {
      if (weatherSys) {
        Object.assign(this, weatherSys);
      }
    }
}

export interface WeatherCoordinates {
    lon: number;
    lat: number
}

export interface WeatherItem {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface WeatherMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface WeatherWind {
    speed: number;
    deg: number;
}

export interface WeatherClouds {
    all: number;
}

export interface WeatherSys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}