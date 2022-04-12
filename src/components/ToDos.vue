<template>
  <div class="todo-list-header">
    <CurrentGreeting />
    <div class="add-task-button-container">
      <BaseButton @click="toggleForm()" primary>
        Add
        <span class="material-icons-outlined bold"> add </span>
      </BaseButton>
    </div>
  </div>
  <div v-if="todoList.length < 1 && inProgressTodoList.length < 1 && doneTodoList.length < 1" class="empty-todo">
    <p class="empty-emoji">🥳</p>
    <p>You finished it all!</p>
    <BaseButton @click="toggleForm()">
      Add
      <span class="material-icons-outlined bold"> add </span>
    </BaseButton>
  </div>
  <div v-else class="todo-list-container">
    <section class="todo-list-todos">
      <div class="todo-list-todos__col">
        <div class="headings">
          <div class="flex-content">
            <span class="content">Ready</span>
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
            @change="log($event)"
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
            @change="log($event)"
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
            @change="log($event)"
          >
            <template #item="{ element }">
              <ToDoItem :todo="element" @done="doneTodo(element)" @remove="removeTodo(element)" />
            </template>
          </VDraggable>
        </div>
      </div>
    </section>
  </div>
  <ToDoNewModal @addTodo="addTodo($event)" @toggle="toggleForm()" :open="addTodoForm" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import BaseCard from './BaseCard.vue';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import BaseSelect from './BaseSelect.vue';
import ToDoItem from './ToDoItem.vue';
import { useTodoStore } from '@/stores/todos';
import type { NewToDo, ToDo } from '@/types/types';
import BaseTextArea from './BaseTextArea.vue';
import ToDoNewModal from './ToDoNewModal.vue';
import VDraggable from 'vuedraggable';
import CurrentGreeting from './CurrentGreeting.vue';

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

    const todoList = computed<ToDo[]>(() => {
      return todoStore.$state.todos.filter((item) => item.ready === true);
    });

    const inProgressTodoList = computed<ToDo[]>(() => {
      return todoStore.$state.todos.filter((item) => item.inProgress === true);
    });

    const doneTodoList = computed<ToDo[]>(() => {
      return todoStore.$state.todos.filter((item) => item.done === true);
    });

    // const todoList = computed<ToDo[]>({
    //   get: () => todoStore.$state.todos,
    //   set: (value) => {
    //     const mapped: ToDo[] = value.map((item) => {
    //       return {
    //         category: item.category,
    //         content: item.content,
    //         description: item.description,
    //         date: item.date,
    //         done: false,
    //         inProgress: false,
    //         ready: true,
    //         due: item.due,
    //         key: item.key,
    //       };
    //     });
    //     todoStore.$state.todos = mapped;
    //   },
    // });

    // const inProgressTodoList = computed<ToDo[]>({
    //   get: () => todoStore.$state.inProgress,
    //   set: (value) => {
    //     const mapped: ToDo[] = value.map((item) => {
    //       return {
    //         category: item.category,
    //         content: item.content,
    //         description: item.description,
    //         date: item.date,
    //         done: false,
    //         inProgress: true,
    //         ready: false,
    //         due: item.due,
    //         key: item.key,
    //       };
    //     });
    //     todoStore.$state.inProgress = mapped;
    //   },
    // });

    // const doneTodoList = computed<ToDo[]>({
    //   get: () => todoStore.$state.done,
    //   set: (value) => {
    //     const mapped: ToDo[] = value.map((item) => {
    //       return {
    //         category: item.category,
    //         content: item.content,
    //         description: item.description,
    //         date: item.date,
    //         done: true,
    //         inProgress: false,
    //         ready: false,
    //         due: item.due,
    //         key: item.key,
    //       };
    //     });
    //     todoStore.$state.done = mapped;
    //   },
    // });

    const addTodo = (value: NewToDo) => {
      todoStore.addTodo(value.todoTitle, value.dueDate, value.todoCategory, value.todoDescription);
      toggleForm();
    };

    const doneTodo = (todo: ToDo) => {
      console.log('Done');
      todoStore.doneTodo(todo);
    };

    const removeTodo = (todo: ToDo) => {
      todoStore.removeTodo(todo);
    };

    const toggleForm = () => {
      addTodoForm.value = !addTodoForm.value;
    };

    const log = (evt: any) => {
      console.log(evt);
    };

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
      log,
    };
  },
  components: {
    BaseCard,
    BaseButton,
    BaseInput,
    BaseSelect,
    ToDoItem,
    BaseTextArea,
    ToDoNewModal,
    VDraggable,
    CurrentGreeting,
  },
});
</script>

<style lang="scss" scoped>
.todo-list-header {
  display: grid;
  align-items: flex-end;
  grid-template-columns: 1fr 1fr;
  padding: 1.5rem 20px 1.25rem;

  .add-task-button-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
  height: 100%;

  .empty-emoji {
    font-size: 1.75rem;
  }
}
.todo-list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  gap: 10px;
  width: 100%;
  padding-bottom: 1rem;

  .todo-list {
    width: 100%;
    position: relative;
    flex-grow: 1;
    height: 65vh;
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
      background-color: rgba(#1e293b, 0.25);
      border-radius: 4px;

      @media (max-width: 1022px) {
        margin-top: 1.25rem;
        &:first-child {
          margin-top: 0;
        }
      }
    }

    .headings {
      font-size: 0.675rem;
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
      }
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
</style>
