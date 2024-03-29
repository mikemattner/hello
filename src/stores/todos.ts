import type { ToDo, TodoState, NewToDo, SaveToDo } from '@/types/types';
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid';

export const useTodoStore = defineStore({
  id: 'todos',
  state: () => ({
    todos: [
      { name: 'Ready', tasks: []},
      { name: 'In Progress', tasks: []},
      { name: 'Done', tasks: []},
    ],
  }) as TodoState,
  getters: {
    getTodos: (state) => state.todos,
    getReadyTodos: (state) => state.todos[0],
    getInProgressTodos: (state) => state.todos[1],
    getDoneTodos: (state) => state.todos[2],
    getTotalCount: (state) => {
       return state.todos[0].tasks.length + state.todos[1].tasks.length + state.todos[2].tasks.length;
    },
  },
  actions: {
    addTodo(value: NewToDo) {
      this.todos[0].tasks.unshift({
        key: uuidv4(),
        category: value.todoCategory,
        content: value.todoTitle,
        description: value.todoDescription,
        due: value.dueDate.toString(),
      });
    },
    removeTodo(todo: ToDo, column: number) {
      const index = this.todos[column].tasks.indexOf(todo);
      this.todos[column].tasks.splice(index, 1);
    },
    saveTodo(value: SaveToDo) {
      const index = this.todos[value.column].tasks.map(t => t.key).indexOf(value.key);
      if(index != -1) {
        const updatedTodo: ToDo = {
          key: value.key,
          category: value.todo.todoCategory,
          content: value.todo.todoTitle,
          description: value.todo.todoDescription,
          due: value.todo.dueDate.toString(),
        };
        Object.assign(this.todos[value.column].tasks[index], updatedTodo); 
      }
    },
  },
  persist: {
    key: 'dashboard-todos',
  },
})
