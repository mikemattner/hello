export interface Messages {
    morning: string;
    afternoon: string;
    evening: string;
}

export interface ToDo {
    index?: number;
    done: boolean;
    content: string;
}