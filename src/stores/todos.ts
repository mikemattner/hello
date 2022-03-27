import type { ToDo } from '@/types/types';
import { defineStore } from 'pinia'

export const useTodoStore = defineStore({
  id: 'todos',
  state: () => ({
    todos: [],
  }) as TodoState,
  getters: {
    getTodos: (state) => state.todos,
  },
  actions: {
    addTodo(newTodo: string) {
      this.todos.unshift({
        done: false,
        content: newTodo,
      });
    },
    removeTodo(index: number) {
      this.todos.splice(index, 1);
    },
    doneTodo(index: number) {
      this.todos[index].done = !this.todos[index].done;
    },
  },
  persist: {
    key: 'dashboard-todos',
  },
})

interface TodoState {
  todos: ToDo[];
}