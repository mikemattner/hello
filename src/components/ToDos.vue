<template>
  <div class="todo-list-container">
    <div class="todo-form-container">
      <form @submit.prevent="addTodo()" class="todo-form">
        <BaseInput v-model="newTodo" name="newTodo" id="todoInput" label="What are you doing today?" />
        <BaseButton @clicked="addTodo()" class="add-todo-button"> Add <CloseIcon /> </BaseButton>
      </form>
    </div>
    <TransitionGroup name="list" class="todo-list" tag="div">
      <div class="todo-list__item" v-for="(todo, index) in todos" :key="`todo-${index}`">
        <div :class="['todo-list__item-content', { done: todo.done }]" @click="doneTodo(todo)">
          <div class="checkmark"></div>
          <div>{{ todo.content }}</div>
        </div>
        <BaseButton @clicked="removeTodo(index)">
          <CloseIcon />
        </BaseButton>
      </div>
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
  components: { BaseCard, CloseIcon, BaseButton, BaseInput },
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

    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 10px;
      padding: 1rem;
      border-radius: 4px;
      background-color: var(--card-bg);
      margin: 0.375rem 0;
      width: 100%;

      &:last-child {
        border-bottom: none;
      }

      &-content {
        display: flex;
        align-items: center;
        transition: all 0.25s ease-in-out;

        .checkmark {
          height: 25px;
          width: 25px;
          flex-grow: 0;
          border: 1px solid var(--input-bg-color);
          border-radius: 50%;
          margin-right: 15px;
          opacity: 0.5;
          transition: all 0.25s ease-in-out;

          &:after {
            content: '';
            position: absolute;
            opacity: 0;
            transition: all 0.25s ease-in-out;
            left: 9px;
            top: 4px;
            width: 6px;
            height: 13px;
            border: solid var(--input-bg-color);
            border-width: 0 1px 1px 0;
            transform: rotate(45deg) scale(0.5);
            transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }
        }

        &:hover {
          cursor: pointer;

          .checkmark {
            opacity: 1;
          }
        }

        &:after {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 50%;
          right: 50%;
          height: 2px;
          background-color: var(--color);
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        &.done {
          &:after {
            opacity: 1;
            left: 36px;
            right: -4px;
          }

          .checkmark {
            opacity: 1;
            &:after {
              opacity: 1;
              transform: rotate(45deg) scale(1);
            }
          }
        }
      }
    }
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
