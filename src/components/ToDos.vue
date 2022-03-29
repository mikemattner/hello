<template>
  <div class="todo-list-container">
    <div class="todo-form-container">
      <form @submit.prevent="addTodo()" class="todo-form">
        <BaseInput v-model="newTodo" name="newTodo" id="todoInput" label="What are you working on today?" />
        <BaseButton @clicked="addTodo()" class="add-todo-button" primary>Add Todo</BaseButton>
      </form>
    </div>
    <Transition name="fade">
      <section class="todo-list-todos" v-if="getTodos.length > 0">
        <template v-if="sm">
          <TransitionGroup name="list" class="todo-list" tag="div">
            <ToDoItem
              v-for="(todo, index) in getTodos"
              :key="todo.content"
              :todo="todo"
              @done="doneTodo(todo)"
              @remove="removeTodo(todo)"
            />
          </TransitionGroup>
        </template>
        <template v-if="!sm">
          <div>
            <h4 class="headings">Upcoming</h4>
            <TransitionGroup name="list" class="todo-list" tag="div">
              <ToDoItem
                v-for="(todo, index) in notCompletedTodos"
                :key="todo.content"
                :todo="todo"
                @done="doneTodo(todo)"
                @remove="removeTodo(todo)"
              />
            </TransitionGroup>
          </div>
          <div>
            <h4 class="headings">Done</h4>
            <TransitionGroup name="list" class="todo-list" tag="div">
              <ToDoItem
                v-for="(todo, index) in completedTodos"
                :key="todo.content"
                :todo="todo"
                @done="doneTodo(todo)"
                @remove="removeTodo(todo)"
              />
            </TransitionGroup>
          </div>
        </template>
      </section>
    </Transition>
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
import type { ToDo } from '@/types/types';
import useBreakpoints from '@/composables/useBreakpoints';

export default defineComponent({
  name: 'ToDos',
  setup() {
    const { sm } = useBreakpoints();
    const newTodo = ref('');
    const todoStore = useTodoStore();
    const { getTodos } = storeToRefs(todoStore);

    const notCompletedTodos = computed<ToDo[]>(() => {
      return getTodos.value.filter((i) => i.done === false);
    });

    const completedTodos = computed<ToDo[]>(() => {
      return getTodos.value.filter((i) => i.done === true);
    });

    const addTodo = () => {
      if (newTodo.value) {
        todoStore.addTodo(newTodo.value);
        newTodo.value = '';
      }
    };

    const doneTodo = (todo: ToDo) => {
      todoStore.doneTodo(todo);
    };

    const removeTodo = (todo: ToDo) => {
      todoStore.removeTodo(todo);
    };

    return {
      newTodo,
      addTodo,
      doneTodo,
      removeTodo,
      getTodos,
      notCompletedTodos,
      completedTodos,
      sm,
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
  max-width: 1200px;
  padding-bottom: 60px;

  .todo-form-container {
    width: 100%;
    max-width: 600px;
    margin-bottom: 2rem;
    padding: 1.5rem 1rem;
    border-radius: 4px;
    background-color: var(--input-color);
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

  .todo-list-todos {
    width: 100%;
    @media (min-width: 730px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .headings {
      font-size: 0.75rem;
      font-weight: 900;
      margin-bottom: 1rem;
    }
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
