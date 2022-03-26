<template>
  <div class="todo-list-container">
    <div class="todo-form-container">
      <form @submit.prevent="addTodo()" class="todo-form">
        <BaseInput v-model="newTodo" name="newTodo" id="todoInput" label="What are you doing today?" />
        <BaseButton @clicked="addTodo()" class="add-todo-button"> Add <CloseIcon /> </BaseButton>
      </form>
    </div>
    <TransitionGroup name="list" class="todo-list" tag="div">
      <ToDoItem
        v-for="(todo, index) in todos"
        :key="`todo-${index}`"
        :todo="todo"
        @done="doneTodo(todo)"
        @remove="removeTodo(index)"
      />
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { ToDo } from '@/types/types';
import BaseCard from './BaseCard.vue';
import CloseIcon from './CloseIcon.vue';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import ToDoItem from './ToDoItem.vue';

export default defineComponent({
  name: 'ToDos',
  setup() {
    const newTodo = ref('');
    const localToDos = localStorage.getItem('mike-todos');
    let todosData: ToDo[] = [];
    if (localToDos) {
      todosData = JSON.parse(localToDos);
    }
    const todos = ref(todosData);
    function addTodo() {
      if (newTodo.value) {
        todos.value.push({
          done: false,
          content: newTodo.value,
        });
        newTodo.value = '';
      }
      saveData();
    }
    function doneTodo(todo: ToDo) {
      todo.done = !todo.done;
      saveData();
    }
    function removeTodo(index: number) {
      todos.value.splice(index, 1);
      saveData();
    }
    function saveData() {
      const storageData = JSON.stringify(todos.value);
      localStorage.setItem('mike-todos', storageData);
    }
    return {
      todos,
      newTodo,
      addTodo,
      doneTodo,
      removeTodo,
      saveData,
    };
  },
  components: { BaseCard, CloseIcon, BaseButton, BaseInput, ToDoItem },
});
</script>

<style lang="scss" scoped>
.todo-list-container {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  gap: 10px;
  width: 100%;
  max-width: 600px;
  padding-bottom: 60px;

  .todo-form-container {
    width: 100%;
  }

  .todo-form {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    .add-todo-button {
      flex-grow: 0;

      svg {
        transform: rotate(45deg);
      }
    }

    .input-text-field {
      flex-grow: 1;
    }
  }

  .todo-list {
    width: 100%;
    position: relative;
    flex-grow: 1;
    padding-bottom: 4rem;
  }
}
.list-move,
.list-enter-active,
.list-leave-active {
  //   transition: all 0.5s ease;
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.list-leave-active {
  position: absolute;
}
</style>
