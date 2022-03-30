<template>
  <div class="todo-list-container">
    <div class="todo-form-container">
      <form @submit.prevent="addTodo()" class="todo-form">
        <BaseInput v-model="newTodo" name="newTodo" id="todoInput" label="Add a task" />
        <BaseButton @clicked="addTodo()" class="add-todo-button" primary>
          <span class="material-icons-outlined bold"> add_circle </span>
        </BaseButton>
      </form>
    </div>
    <section class="todo-list-todos">
      <div class="todo-list-todos__col">
        <h4 class="headings">
          <span class="content">Tasks</span> <span class="count">{{ notCompletedTodos.length }}</span>
        </h4>
        <Transition name="fadestay">
          <div v-if="notCompletedTodos.length < 1" class="empty-todo">
            <template v-if="getTodos.length < 1">
              <p class="empty-emoji">🌮</p>
              <p>Add tasks, earn tacos.</p>
            </template>
            <template v-else>
              <p class="empty-emoji">🥳</p>
              <p>You finished it all!</p>
            </template>
          </div>
        </Transition>
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
      <div class="todo-list-todos__col">
        <h4 class="headings">
          <span class="content">Done</span> <span class="count">{{ completedTodos.length }}</span>
        </h4>
        <Transition name="fadestay">
          <div v-if="completedTodos.length < 1" class="empty-todo">
            <template v-if="getTodos.length < 1">
              <p class="empty-emoji">😱</p>
              <p>Whoa, nothing to do!</p>
            </template>
            <template v-else>
              <p class="empty-emoji">🙌</p>
              <p>You&rsquo;ve got this!</p>
            </template>
          </div>
        </Transition>
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
    </section>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  gap: 10px;
  width: 100%;
  max-width: 1200px;
  padding-bottom: 60px;

  @media (max-width: 1299px) {
    margin-top: 1rem;
  }
  @media (min-width: 1300px) {
    margin-top: 1rem;
  }

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

      .bold {
        font-size: 1.25rem;
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
    @media (min-width: 1023px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }

    &__col {
      @media (max-width: 1022px) {
        margin-top: 1.25rem;
        &:first-child {
          margin-top: 0;
        }
      }
    }

    .headings {
      font-size: 0.75rem;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 0 0.5rem;

      .content {
        font-weight: 900;
      }

      .count {
        font-size: 0.625rem;
        width: 30px;
        height: 30px;
        aspect-ratio: 1;
        border-radius: 50%;
        background-color: var(--card-bg);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 900;
        color: var(--contrast-color);
      }
    }

    .empty-todo {
      padding: 1rem;
      border: 1px dashed rgba(255, 255, 255, 0.25);
      border-radius: 4px;
      font-size: 0.75rem;
      width: 100%;
      text-align: center;

      .empty-emoji {
        font-size: 1.75rem;
      }
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
