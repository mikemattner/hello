import type { ToDo, TodoState } from '@/types/types';
import { defineStore } from 'pinia'

export const useTodoStore = defineStore({
  id: 'todos',
  state: () => ({
    todos: [],
    inProgress: [],
  }) as TodoState,
  getters: {
    getTodos: (state) => state.todos,
  },
  actions: {
    addTodo(newTodo: string, due: Date, category: string, description: string) {
      this.todos.push({
        key: this.todos.length + 1,
        category: category,
        content: newTodo,
        description: description,
        date: new Date().toString(),
        done: false,
        due: due.toString(),
      });
    },
    removeTodo(todo: ToDo) {
      const index = this.todos.indexOf(todo);
      const progressIndex = this.inProgress.indexOf(todo);
      if(index > -1) {
        this.todos.splice(index, 1);
      } else {
        this.inProgress.splice(progressIndex, 1);
      }
    },
    doneTodo(todo: ToDo) {
      const index = this.todos.indexOf(todo);
      const progressIndex = this.inProgress.indexOf(todo);
      if(index > -1) {
        this.todos[index].done = !this.todos[index].done;
      } else {
        this.inProgress[progressIndex].done = !this.inProgress[progressIndex].done;
      }
    },
  },
  persist: {
    key: 'dashboard-todos',
  },
})
