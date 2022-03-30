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
    addTodo(newTodo: string, due: Date) {
      this.todos.push({
        key: this.todos.length + 1,
        content: newTodo,
        date: new Date().toString(),
        done: false,
        due: due.toString(),
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
