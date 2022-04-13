import type { ToDo, TodoState } from '@/types/types';
import { defineStore } from 'pinia'

export const useTodoStore = defineStore({
  id: 'todos',
  state: () => ({
    todos: {
      ready: { name: 'Ready', tasks: []},
      inProgress: { name: 'In Progress', tasks: []},
      done: { name: 'Done', tasks: []},
    },
  }) as TodoState,
  getters: {
    getTodos: (state) => state.todos,
    getReadyTodos: (state) => state.todos.ready,
    getInProgressTodos: (state) => state.todos.inProgress,
    getDoneTodos: (state) => state.todos.done,
  },
  actions: {
    addTodo(newTodo: string, due: Date, category: string, description: string) {
      this.todos.ready.tasks.unshift({
        key: this.todos.ready.tasks.length + 1,
        category: category,
        content: newTodo,
        description: description,
        date: new Date().toString(),
        done: false,
        due: due.toString(),
      });
    },
    removeTodo(todo: ToDo) {
      const index = this.todos.ready.tasks.indexOf(todo);
      const progressIndex = this.todos.inProgress.tasks.indexOf(todo);
      const doneIndex = this.todos.done.tasks.indexOf(todo);
      if(index > -1) {
        this.todos.ready.tasks.splice(index, 1);
      } else if(progressIndex > -1) {
        this.todos.inProgress.tasks.splice(progressIndex, 1);
      } else if(doneIndex > -1) {
        this.todos.done.tasks.splice(doneIndex, 1);
      }
    },
    doneTodo(todo: ToDo) {
      const index = this.todos.ready.tasks.indexOf(todo);
      const progressIndex = this.todos.inProgress.tasks.indexOf(todo);
      const doneIndex = this.todos.done.tasks.indexOf(todo);

      if(index > -1) {
        this.todos.ready.tasks[index].done = !this.todos.ready.tasks[index].done;
        this.todos.ready.tasks.splice(index, 1);
        this.todos.done.tasks.push(todo);
      } else if(progressIndex > -1) {
        this.todos.inProgress.tasks[progressIndex].done = !this.todos.inProgress.tasks[progressIndex].done;
        this.todos.inProgress.tasks.splice(progressIndex, 1);
        this.todos.done.tasks.push(todo);
      } else if(doneIndex > -1) {
        this.todos.done.tasks[doneIndex].done = !this.todos.done.tasks[doneIndex].done;
        this.todos.done.tasks.splice(doneIndex, 1);
        this.todos.ready.tasks.push(todo);
      }
    },
  },
  persist: {
    key: 'dashboard-todos',
  },
})
