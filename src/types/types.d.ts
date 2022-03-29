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