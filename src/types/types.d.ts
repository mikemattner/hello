export interface Messages {
    afternoon: string;
    evening: string;
    morning: string;
}

export interface SaveToDo {
    column: number;
    todo: NewToDo;
    key: number | string;
}

export interface ToDo {
    category: string;
    content: string;
    description: string;
    due: string;
    key: number | string;
}

export interface NewToDo {
    todoTitle: string;
    todoDescription: string;
    todoCategory: string;
    dueDate: Date;
}

interface TodoState {
    todos: ToDoColumn[];
}

export interface ToDoColumn {
    name: string;
    tasks: ToDo[];
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

type Colors = 'default' | 'warning' | 'success';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

type Size = 'small' | 'medium';