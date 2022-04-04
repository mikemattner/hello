<template>
  <div class="todo-list-container">
    <section class="todo-list-todos">
      <div class="todo-list-todos__col">
        <h4 class="headings">
          <span class="content">All Tasks</span> <span class="count">{{ getTodos.length }}</span>
        </h4>
        <div class="todo-list">
          <VDraggable
            v-model="todoList"
            tag="div"
            item-key="key"
            group="tasks"
            class="todo-list-draggable"
            :component-data="{ tag: 'div', name: !drag ? 'list' : null, type: 'transition' }"
            key="draggable-list"
            @start="drag = true"
            @end="drag = false"
          >
            <template #item="{ element }">
              <ToDoItem :todo="element" @done="doneTodo(element)" @remove="removeTodo(element)" />
            </template>
          </VDraggable>
          <div class="todo-form-container" key="new-todo-form">
            <ToDoNewForm v-if="addTodoForm" @addTodo="addTodo($event)" @toggle="toggleForm()" />
            <div v-else class="empty-form" key="todo-form-empty">
              <BaseButton @click="toggleForm()" primary>
                Add a task <span class="material-icons-outlined bold"> add </span>
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
      <div class="todo-list-todos__col">
        <h4 class="headings">
          <span class="content">In Progress</span> <span class="count">{{ inProgressTodoList.length }}</span>
        </h4>
        <div class="todo-list">
          <VDraggable
            v-model="inProgressTodoList"
            tag="div"
            item-key="key"
            group="tasks"
            class="todo-list-draggable"
            :component-data="{ tag: 'div', name: !drag ? 'list' : null, type: 'transition' }"
            key="draggable-list"
            @start="drag = true"
            @end="drag = false"
          >
            <template #item="{ element }">
              <ToDoItem :todo="element" @done="doneTodo(element)" @remove="removeTodo(element)" />
            </template>
          </VDraggable>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import BaseCard from './BaseCard.vue';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import BaseSelect from './BaseSelect.vue';
import ToDoItem from './ToDoItem.vue';
import { useTodoStore } from '@/stores/todos';
import { storeToRefs } from 'pinia';
import type { NewToDo, ToDo } from '@/types/types';
import BaseTextArea from './BaseTextArea.vue';
import ToDoNewForm from './ToDoNewForm.vue';
import VDraggable from 'vuedraggable';

export default defineComponent({
  name: 'ToDos',
  setup() {
    const todoStore = useTodoStore();
    const { getTodos } = storeToRefs(todoStore);
    const addTodoForm = ref<boolean>(false);
    const drag = ref<boolean>(false);

    const notCompletedTodos = computed<ToDo[]>(() => {
      return getTodos.value.filter((i) => i.done === false);
    });

    const completedTodos = computed<ToDo[]>(() => {
      return getTodos.value.filter((i) => i.done === true);
    });

    const dueToday = computed<ToDo[]>(() => {
      return getTodos.value.filter((i) => {
        const due = new Date(i.due);
        const today = new Date();
        return due.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
      });
    });

    const todoList = computed({
      get: () => todoStore.$state.todos,
      set: (value) => {
        todoStore.$state.todos = value;
      },
    });

    const inProgressTodoList = computed({
      get: () => todoStore.$state.inProgress,
      set: (value) => {
        todoStore.$state.inProgress = value;
      },
    });

    const addTodo = (value: NewToDo) => {
      todoStore.addTodo(value.todoTitle, value.dueDate, value.todoCategory, value.todoDescription);
    };

    const doneTodo = (todo: ToDo) => {
      todoStore.doneTodo(todo);
    };

    const removeTodo = (todo: ToDo) => {
      todoStore.removeTodo(todo);
    };

    const toggleForm = () => {
      addTodoForm.value = !addTodoForm.value;
    };

    return {
      addTodo,
      doneTodo,
      removeTodo,
      getTodos,
      todoList,
      inProgressTodoList,
      notCompletedTodos,
      completedTodos,
      addTodoForm,
      toggleForm,
      dueToday,
      drag,
    };
  },
  components: { BaseCard, BaseButton, BaseInput, BaseSelect, ToDoItem, BaseTextArea, ToDoNewForm, VDraggable },
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
    min-height: 94px;
    padding: 1.25rem 1rem;
    border-radius: 4px;
    margin: 0.5rem 0;
    background-color: var(--card-bg);
    box-shadow: 2px 10px 20px var(--card-shadow);

    .full-height {
      height: 42px;
      display: flex;
      align-items: stretch;
      justify-content: center;
    }
  }

  .todo-list {
    width: 100%;
    position: relative;
    flex-grow: 1;
    &-draggable {
      min-height: 100px;
    }
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
      padding: 0.5rem 1rem;
      border: 1px dashed rgba(255, 255, 255, 0.25);
      border-radius: 4px;
      font-size: 0.75rem;
      width: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .empty-emoji {
        font-size: 1.75rem;
      }
    }
    .empty-form {
      cursor: pointer;
      transition: all 0.25s ease-in-out;
      display: flex;
      align-items: stretch;
      justify-content: center;
      width: 100%;
      height: 42px;
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
  // transform: translateY(-30px);
}

// .list-leave-active {
//   position: absolute;
// }
</style>
