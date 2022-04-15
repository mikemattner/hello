<template>
  <div class="todo-list-header">
    <CurrentGreeting />
    <div class="add-task-button-container">
      <Transition name="fade">
        <BaseButton v-if="getTotalCount > 0" @click="toggleForm()" button-type="secondary" size="small">
          Add Task
          <span class="material-icons-outlined bold"> add </span>
        </BaseButton>
      </Transition>
    </div>
  </div>
  <TransitionGroup name="todo">
    <div v-if="getTotalCount < 1" class="empty-todo" key="empty-todos-state">
      <p class="empty-emoji">🥳</p>
      <p>You finished it all!</p>
      <BaseButton @click="toggleForm()" button-type="secondary">
        Add
        <span class="material-icons-outlined bold"> add </span>
      </BaseButton>
    </div>
    <div v-else class="todo-list-container" key="active-todos-state">
      <section class="todo-list-todos">
        <div v-for="(column, index) in todoList" :key="`column-${column.name}-${index}`" class="todo-list-todos__col">
          <div class="headings">
            <div class="flex-content">
              <span class="content">{{ column.name }}</span>
            </div>
            <span class="count">{{ column.tasks.length }}</span>
          </div>
          <div class="todo-list">
            <VDraggable
              v-model="column.tasks"
              tag="div"
              item-key="key"
              group="tasks"
              handle=".handle"
              class="todo-list-draggable"
              :component-data="{ tag: 'div', name: 'flip-list', type: 'transition' }"
              key="draggable-list"
              v-bind="dragOptions"
              @start="drag = true"
              @end="drag = false"
            >
              <template #item="{ element }">
                <ToDoItem
                  :todo="element"
                  @edit="openEditForm(element.key, index, element)"
                  @remove="removeTodo(element, index)"
                />
              </template>
            </VDraggable>
          </div>
        </div>
      </section>
    </div>
  </TransitionGroup>
  <ToDoNewModal @addTodo="addTodo($event)" @toggle="toggleForm()" :open="addTodoForm" />
  <ToDoEditModal
    @close="toggleEditForm()"
    @saveToDo="saveToDo($event)"
    :todo-item="editTodoItem"
    :todo-item-key="editTodoItemKey"
    :column="editToDoColumn"
    :open="editModalForm"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import BaseCard from './BaseCard.vue';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import BaseSelect from './BaseSelect.vue';
import ToDoItem from './ToDoItem.vue';
import { useTodoStore } from '@/stores/todos';
import type { NewToDo, ToDo, ToDoColumn, SaveToDo } from '@/types/types';
import BaseTextArea from './BaseTextArea.vue';
import ToDoNewModal from './ToDoNewModal.vue';
import VDraggable from 'vuedraggable';
import CurrentGreeting from './CurrentGreeting.vue';
import { storeToRefs } from 'pinia';
import ToDoEditModal from './ToDoEditModal.vue';

export default defineComponent({
  name: 'ToDos',
  setup() {
    const todoStore = useTodoStore();
    const addTodoForm = ref<boolean>(false);
    const editModalForm = ref<boolean>(false);
    const drag = ref<boolean>(false);
    const dragOptions = computed(() => {
      return {
        animation: 200,
        disabled: false,
        ghostClass: 'ghost',
      };
    });

    const todoList = computed<ToDoColumn[]>({
      get: () => todoStore.$state.todos,
      set: (value) => (todoStore.$state.todos = value),
    });

    const { getTotalCount } = storeToRefs(todoStore);

    const addTodo = (value: NewToDo) => {
      todoStore.addTodo(value);
      toggleForm();
    };

    const removeTodo = (todo: ToDo, column: number) => {
      todoStore.removeTodo(todo, column);
    };

    const toggleForm = () => {
      addTodoForm.value = !addTodoForm.value;
    };

    const editToDoColumn = ref<number>(0);
    const editTodoItemKey = ref<string | number>('');
    const editTodoItem = ref<ToDo>({
      category: '',
      content: '',
      description: '',
      due: new Date().toString(),
      key: '',
    });

    const openEditForm = (itemKey: string | number, column: number, todo: ToDo) => {
      editTodoItemKey.value = itemKey;
      editToDoColumn.value = column;
      editTodoItem.value = todo;
      toggleEditForm();
    };

    const toggleEditForm = () => {
      editModalForm.value = !editModalForm.value;
    };

    const saveToDo = (value: SaveToDo) => {
      todoStore.saveTodo(value);
      toggleEditForm();
    };

    return {
      addTodo,
      addTodoForm,
      drag,
      dragOptions,
      removeTodo,
      todoList,
      toggleForm,
      getTotalCount,
      editModalForm,
      toggleEditForm,
      openEditForm,
      editToDoColumn,
      editTodoItem,
      saveToDo,
      editTodoItemKey,
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
    ToDoEditModal,
  },
});
</script>

<style lang="scss" scoped>
.todo-list-header {
  // display: grid;
  // align-items: flex-end;
  // grid-template-columns: 1fr 1fr;
  padding: 1.5rem 10px 1.25rem 20px;
  display: flex;
  align-items: stretch;
  gap: 20px;

  .add-task-button-container {
    display: flex;
    align-items: flex-end;
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
  height: 400px;

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
  border: 1px solid var(--sky-400);
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.todo-move,
.todo-enter-active,
.todo-leave-active {
  transition: all 0.375s ease-in-out;
}

.todo-enter-from,
.todo-leave-to {
  opacity: 0;
}

.todo-leave-active {
  position: absolute;
}
</style>
