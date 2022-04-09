<template>
  <Transition name="modal" mode="out-in">
    <div v-if="addTodoForm" class="todo-form-overlay">
      <div class="todo-form-container slide-up">
        <div class="todo-form-title">Add New To Do</div>
        <div class="todo-form-body">
          <ToDoNewForm @addTodo="addTodo($event)" @toggle="toggleForm()" />
        </div>
      </div>
    </div>
  </Transition>
  <BaseButton @click="toggleForm()" action-button primary>
    <span class="material-icons-outlined bold"> add </span>
    Add Task
  </BaseButton>
  <div class="todo-list-container">
    <section class="todo-list-todos">
      <div class="todo-list-todos__col">
        <div class="headings">
          <div class="flex-content">
            <span class="content">To Do</span>
          </div>
          <span class="count">{{ todoList.length }}</span>
        </div>
        <div class="todo-list">
          <VDraggable
            v-model="todoList"
            tag="div"
            item-key="key"
            group="tasks"
            class="todo-list-draggable"
            :component-data="{ tag: 'div', name: !drag ? 'list' : null, type: 'transition' }"
            key="draggable-list"
            v-bind="dragOptions"
            @start="drag = true"
            @end="drag = false"
          >
            <template #item="{ element }">
              <ToDoItem :todo="element" @done="doneTodo(element)" @remove="removeTodo(element)" />
            </template>
          </VDraggable>
        </div>
      </div>
      <div class="todo-list-todos__col">
        <div class="headings">
          <span class="content">In Progress</span> <span class="count">{{ inProgressTodoList.length }}</span>
        </div>
        <div class="todo-list">
          <VDraggable
            v-model="inProgressTodoList"
            tag="div"
            item-key="key"
            group="tasks"
            class="todo-list-draggable"
            :component-data="{ tag: 'div', name: !drag ? 'list' : null, type: 'transition' }"
            key="draggable-list"
            v-bind="dragOptions"
            @start="drag = true"
            @end="drag = false"
          >
            <template #item="{ element }">
              <ToDoItem :todo="element" @done="doneTodo(element)" @remove="removeTodo(element)" />
            </template>
          </VDraggable>
        </div>
      </div>
      <div class="todo-list-todos__col">
        <div class="headings">
          <span class="content">Done</span> <span class="count">{{ doneTodoList.length }}</span>
        </div>
        <div class="todo-list">
          <VDraggable
            v-model="doneTodoList"
            tag="div"
            item-key="key"
            group="tasks"
            class="todo-list-draggable"
            :component-data="{ tag: 'div', name: !drag ? 'list' : null, type: 'transition' }"
            key="draggable-list"
            v-bind="dragOptions"
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
import { computed, defineComponent, ref, onMounted, onUnmounted } from 'vue';
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
    const addTodoForm = ref<boolean>(false);
    const drag = ref<boolean>(false);
    const dragOptions = computed(() => {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    });

    const todoList = computed<ToDo[]>({
      get: () => todoStore.$state.todos,
      set: (value) => {
        const mapped: ToDo[] = value.map((item) => {
          return {
            category: item.category,
            content: item.content,
            description: item.description,
            date: item.date,
            done: false,
            due: item.due,
            key: item.key,
          };
        });
        todoStore.$state.todos = mapped;
      },
    });

    const inProgressTodoList = computed<ToDo[]>({
      get: () => todoStore.$state.inProgress,
      set: (value) => {
        const mapped: ToDo[] = value.map((item) => {
          return {
            category: item.category,
            content: item.content,
            description: item.description,
            date: item.date,
            done: false,
            due: item.due,
            key: item.key,
          };
        });
        todoStore.$state.inProgress = mapped;
      },
    });

    const doneTodoList = computed<ToDo[]>({
      get: () => todoStore.$state.done,
      set: (value) => {
        const mapped: ToDo[] = value.map((item) => {
          return {
            category: item.category,
            content: item.content,
            description: item.description,
            date: item.date,
            done: true,
            due: item.due,
            key: item.key,
          };
        });
        todoStore.$state.done = mapped;
      },
    });

    const addTodo = (value: NewToDo) => {
      todoStore.addTodo(value.todoTitle, value.dueDate, value.todoCategory, value.todoDescription);
      toggleForm();
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

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && addTodoForm.value) {
        toggleForm();
      }
    };

    onMounted(() => {
      document.addEventListener('keydown', handleEscape);
    });

    onUnmounted(() => {
      document.removeEventListener('keydown', handleEscape);
    });

    return {
      addTodo,
      doneTodo,
      removeTodo,
      todoList,
      inProgressTodoList,
      doneTodoList,
      addTodoForm,
      toggleForm,
      drag,
      dragOptions,
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
  padding-bottom: 60px;

  @media (max-width: 1299px) {
    margin-top: 1rem;
  }
  @media (min-width: 1300px) {
    margin-top: 1rem;
  }

  .todo-list {
    width: 100%;
    position: relative;
    flex-grow: 1;
    height: 600px;
    overflow-y: auto;
    &-draggable {
      min-height: 550px;
    }
  }

  .todo-list-todos {
    width: 100%;
    @media (min-width: 1023px) {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
    }

    &__col {
      padding: 20px 10px;
      background-color: rgba(#263966, 0.125);
      border-radius: 4px;

      @media (max-width: 1022px) {
        margin-top: 1.25rem;
        &:first-child {
          margin-top: 0;
        }
      }
    }

    .headings {
      font-size: 0.75rem;
      margin-bottom: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 0 0.5rem;

      .flex-content {
        display: flex;
        align-items: center;
        gap: 10px;
      }

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
        color: var(--tooltip-color);
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

.todo-form-overlay {
  background-color: rgba(#263966, 0.75);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  transition: opacity 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  .todo-form-container {
    width: 500px;
    border-radius: 4px;
    background-color: var(--card-bg);
    box-shadow: 2px 10px 20px var(--card-shadow);

    .todo-form-title {
      font-size: 1rem;
      font-weight: 900;
      text-align: center;
      padding: 1rem;
      background-color: rgba(0, 0, 0, 0.1);
    }
    .todo-form-body {
      padding: 1.25rem 1rem;
    }
  }
}

.ghost {
  opacity: 0.5;
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.375s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter,
.modal-leave-active {
  opacity: 0;
}
</style>
