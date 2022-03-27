<template>
  <div class="todo-list-container">
    <div class="todo-form-container">
      <form @submit.prevent="addTodo()" class="todo-form">
        <BaseInput v-model="newTodo" name="newTodo" id="todoInput" label="What are you working on today?" />
        <BaseButton @clicked="addTodo()" primary> Add <CloseIcon /> </BaseButton>
      </form>
    </div>
    <TransitionGroup name="list" class="todo-list" tag="div">
      <ToDoItem
        v-for="(todo, index) in getTodos"
        :key="todo.content"
        :todo="todo"
        @done="doneTodo(index)"
        @remove="removeTodo(index)"
      />
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import BaseCard from './BaseCard.vue';
import CloseIcon from './CloseIcon.vue';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import ToDoItem from './ToDoItem.vue';
import { useTodoStore } from '@/stores/todos';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'ToDos',
  setup() {
    const newTodo = ref('');
    const todoStore = useTodoStore();
    const { getTodos } = storeToRefs(todoStore);

    const addTodo = () => {
      if (newTodo.value) {
        todoStore.addTodo(newTodo.value);
        newTodo.value = '';
      }
    };

    const doneTodo = (index: number) => {
      todoStore.doneTodo(index);
    };

    const removeTodo = (index: number) => {
      todoStore.removeTodo(index);
    };

    return {
      newTodo,
      addTodo,
      doneTodo,
      removeTodo,
      getTodos,
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
    align-items: stretch;
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
  }
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.375s cubic-bezier(0.68, -0.55, 0.265, 1.55);
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
