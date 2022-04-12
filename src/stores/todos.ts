import type { ToDo, TodoState } from '@/types/types';
import { defineStore } from 'pinia'

export const useTodoStore = defineStore({
  id: 'todos',
  state: () => ({
    todos: [],
    done: [],
    inProgress: [],
  }) as TodoState,
  getters: {
    getTodos: (state) => state.todos,
    getInProgressTodos: (state) => state.inProgress,
    getDoneTodos: (state) => state.done,
  },
  actions: {
    addTodo(newTodo: string, due: Date, category: string, description: string) {
      this.todos.unshift({
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
      const doneIndex = this.done.indexOf(todo);
      if(index > -1) {
        this.todos.splice(index, 1);
      } else if(progressIndex > -1) {
        this.inProgress.splice(progressIndex, 1);
      } else if(doneIndex > -1) {
        this.done.splice(doneIndex, 1);
      }
    },
    doneTodo(todo: ToDo) {
      const index = this.todos.indexOf(todo);
      const progressIndex = this.inProgress.indexOf(todo);
      const doneIndex = this.done.indexOf(todo);

      if(index > -1) {
        this.todos[index].done = !this.todos[index].done;
        this.todos.splice(index, 1);
        this.done.push(todo);
      } else if(progressIndex > -1) {
        this.inProgress[progressIndex].done = !this.inProgress[progressIndex].done;
        this.inProgress.splice(progressIndex, 1);
        this.done.push(todo);
      } else if(doneIndex > -1) {
        this.done[doneIndex].done = !this.done[doneIndex].done;
        this.done.splice(doneIndex, 1);
        this.todos.push(todo);
      }
    },
  },
  persist: {
    key: 'dashboard-todos',
  },
})
