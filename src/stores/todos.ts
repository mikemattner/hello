import type { ToDo, TodoState } from '@/types/types';
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
        key: this.todos.length + 1,
        done: false,
        content: newTodo,
      });
    },
    removeTodo(todo: ToDo) {
      const index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
    doneTodo(todo: ToDo) {
      const index = this.todos.indexOf(todo);
      this.todos[index].done = !this.todos[index].done;
    },
  },
  persist: {
    key: 'dashboard-todos',
  },
})
