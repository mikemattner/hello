<template>
  <BaseModal :is-open="open" title="Edit Task" @close="toggleForm()">
    <template v-slot:body>
      <form key="todo-form" class="todo-form" @submit.prevent="saveToDo()">
        <div class="row">
          <BaseInput
            v-model="todoModel.todoTitle"
            class="input-grow"
            name="newTodo"
            id="todoInput"
            label="Task title"
          />
        </div>
        <div class="row">
          <BaseTextArea
            v-model="todoModel.todoDescription"
            class="input-grow"
            name="todoDescription"
            id="todoDescription"
            label="Task description"
            rows="4"
          />
        </div>
        <div class="row">
          <BaseSelect
            v-model="todoModel.todoCategory"
            :options="options"
            class="input-grow"
            name="newCategory"
            id="newCategory"
            label="Category"
          />
          <v-date-picker class="todo-date-picker" v-model="todoModel.dueDate" mode="date" color="red" is-dark>
            <template v-slot="{ inputValue, inputEvents }">
              <BaseInput id="date-picker" name="date" label="Due Date" :model-value="inputValue" v-on="inputEvents" />
            </template>
          </v-date-picker>
        </div>
        <div class="row">
          <BaseButton
            type="submit"
            class="add-todo-button"
            color="success"
            button-type="primary"
            :disabled="isDisabled"
          >
            Save
            <span class="material-icons-outlined"> check_circle_outline </span>
          </BaseButton>
          <BaseButton
            class="add-todo-button"
            type="button"
            @click="toggleForm()"
            color="warning"
            button-type="tertiary"
          >
            Cancel
          </BaseButton>
        </div>
      </form>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import BaseSelect from './BaseSelect.vue';
import BaseTextArea from './BaseTextArea.vue';
import type { NewToDo, ToDo, SaveToDo } from '@/types/types';
import BaseModal from './BaseModal.vue';
import type { PropType } from 'vue';

export default defineComponent({
  components: {
    BaseButton,
    BaseInput,
    BaseSelect,
    BaseTextArea,
    BaseModal,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    todoItem: {
      type: Object as PropType<ToDo>,
      required: true,
    },
    todoItemKey: {
      type: [String, Number],
      required: true,
    },
    column: {
      type: Number,
      required: true,
    },
  },
  emits: ['saveToDo', 'close'],
  setup(props, { emit }) {
    const options: String[] = ['Other', 'Work', 'Personal', 'Home'];
    const todoModel = ref<NewToDo>({
      todoTitle: props.todoItem.content,
      todoDescription: props.todoItem.description,
      todoCategory: props.todoItem.category,
      dueDate: new Date(props.todoItem.due),
    });

    const toDoInitial = ref<string>('');

    watch(
      () => props.todoItem,
      (value) => {
        todoModel.value.todoTitle = value.content;
        todoModel.value.todoDescription = value.description;
        todoModel.value.todoCategory = value.category;
        todoModel.value.dueDate = new Date(value.due);
      },
    );

    watch(
      () => props.open,
      () => {
        toDoInitial.value = JSON.stringify(todoModel.value);
      },
    );

    const isDisabled = computed<boolean>(() => {
      return toDoInitial.value === JSON.stringify(todoModel.value);
    });

    const saveToDo = () => {
      const saveItem: SaveToDo = {
        column: props.column,
        todo: todoModel.value,
        key: props.todoItemKey,
      };
      emit('saveToDo', saveItem);
    };

    const toggleForm = () => {
      emit('close');
    };

    return {
      saveToDo,
      toggleForm,
      options,
      todoModel,
      isDisabled,
    };
  },
});
</script>

<style scoped lang="scss">
.todo-form {
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  .row {
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    gap: 10px;
  }

  .add-todo-button {
    flex-grow: 0;

    .bold {
      position: relative;
      top: 1px;
    }
  }

  .input-grow {
    flex-grow: 1;
  }

  .todo-date-picker {
    max-width: 200px;
  }
}
</style>
