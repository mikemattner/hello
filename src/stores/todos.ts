import type { ToDo, TodoState } from '@/types/types';
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid';

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
    getTotalCount: (state) => {
       return state.todos.ready.tasks.length + state.todos.inProgress.tasks.length + state.todos.done.tasks.length;
    },
  },
  actions: {
    addTodo(newTodo: string, due: Date, category: string, description: string) {
      this.todos.ready.tasks.unshift({
        key: uuidv4(),
        category: category,
        content: newTodo,
        description: description,
        date: new Date().toString(),
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
  },
  persist: {
    key: 'dashboard-todos',
  },
})
