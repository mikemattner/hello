<template>
  <BaseModal :is-open="open" title="Add New Task" @close="toggleForm()">
    <template v-slot:body>
      <form key="todo-form" class="todo-form" @submit.prevent="addTodo()">
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
            rows="2"
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
          <BaseButton type="submit" class="add-todo-button" color="success" button-type="primary">
            Add <span class="material-icons-outlined bold"> add_circle_outline </span>
          </BaseButton>
          <BaseButton
            class="add-todo-button"
            type="button"
            @click="toggleForm()"
            color="warning"
            button-type="secondary"
          >
            Cancel
          </BaseButton>
        </div>
      </form>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import BaseSelect from './BaseSelect.vue';
import BaseTextArea from './BaseTextArea.vue';
import type { NewToDo, ToDo } from '@/types/types';
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
  },
  emits: ['addTodo', 'toggle'],
  setup(props, { emit }) {
    const options: String[] = ['Work', 'Personal', 'Home'];
    const todoModel = ref<NewToDo>({
      todoTitle: '',
      todoDescription: '',
      todoCategory: 'Work',
      dueDate: new Date(),
    });

    const addTodo = () => {
      if (todoModel.value.todoTitle) {
        emit('addTodo', todoModel.value);
        todoModel.value = {
          todoTitle: '',
          todoDescription: '',
          todoCategory: 'Work',
          dueDate: new Date(),
        };
      }
    };

    const toggleForm = () => {
      emit('toggle');
      todoModel.value = {
        todoTitle: '',
        todoDescription: '',
        todoCategory: 'Work',
        dueDate: new Date(),
      };
    };

    return {
      addTodo,
      toggleForm,
      options,
      todoModel,
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
