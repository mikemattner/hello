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
    due: string;
    key: number;
}

export interface NewToDo {
    todoTitle: string;
    todoDescription: string;
    todoCategory: string;
    dueDate: Date;
}

interface TodoState {
    todos: ToDoColumns;
}

export interface ToDoColumns {
    done: ToDoColumn;
    inProgress: ToDoColumn;
    ready: ToDoColumn;
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

type Colors = 'highlight' | 'warning';