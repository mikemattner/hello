export interface Messages {
    afternoon: string;
    evening: string;
    morning: string;
}

export interface ToDo {
    category: string;
    content: string;
    description: string;
    date: string;
    done: boolean;
    due: string;
    key: number;
}

interface TodoState {
    todos: ToDo[];
}

interface WeatherState {
    initialized: boolean;
    error: boolean;
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

type Colors = 'highlight' | 'warning';