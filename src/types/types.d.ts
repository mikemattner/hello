export interface Messages {
    morning: string;
    afternoon: string;
    evening: string;
}

export interface ToDo {
    key?: number;
    done: boolean;
    content: string;
}

interface TodoState {
    todos: ToDo[];
}

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