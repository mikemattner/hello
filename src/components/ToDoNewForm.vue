<template>
  <form key="todo-form" class="todo-form" @submit.prevent="addTodo()" @keyup.enter="addTodo()">
    <div class="row">
      <BaseInput
        :model-value="todoTitle"
        class="input-grow"
        name="newTodo"
        id="todoInput"
        label="Task title"
        @input="updateTodoTitle($event)"
      />
    </div>
    <div class="row">
      <BaseTextArea
        :model-value="todoDescription"
        class="input-grow"
        name="todoDescription"
        id="todoDescription"
        label="Task description"
        rows="2"
        @input="updateTodoDescription($event)"
      />
    </div>
    <div class="row">
      <BaseSelect
        :model-value="todoCategory"
        :options="options"
        class="input-grow"
        name="newCategory"
        id="newCategory"
        label="Category"
        @input="updateTodoCategory($event)"
      />
      <v-date-picker
        class="todo-date-picker"
        v-model="selectedDate"
        mode="date"
        color="gray"
        is-dark
        @dayclick="updateDueDate()"
      >
        <template v-slot="{ inputValue, inputEvents }">
          <BaseInput id="date-picker" name="date" label="Due Date" :model-value="inputValue" v-on="inputEvents" />
        </template>
      </v-date-picker>
    </div>
    <div class="row">
      <BaseButton type="submit" class="add-todo-button" primary>
        Add <span class="material-icons-outlined bold"> add </span>
      </BaseButton>
      <BaseButton class="add-todo-button" color="warning" @click="toggleForm()"> Cancel </BaseButton>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import BaseSelect from './BaseSelect.vue';
import BaseTextArea from './BaseTextArea.vue';

export default defineComponent({
  components: {
    BaseButton,
    BaseInput,
    BaseSelect,
    BaseTextArea,
  },
  props: {
    todoTitle: {
      type: String,
      default: '',
    },
    todoDescription: {
      type: String,
      default: '',
    },
    todoCategory: {
      type: String,
      default: '',
    },
    dueDate: {
      type: Date,
      default: '',
    },
  },
  setup(props, { emit }) {
    const options: String[] = ['Work', 'Personal', 'Home'];
    const selectedDate = ref<Date>(props.dueDate);
    const addTodo = () => {
      emit('addTodo');
    };
    const toggleForm = () => {
      emit('toggle');
    };

    const updateTodoTitle = (event: any) => {
      emit('update:todoTitle', event.target.value);
    };

    const updateTodoDescription = (event: any) => {
      emit('update:todoDescription', event.target.value);
    };

    const updateTodoCategory = (event: any) => {
      emit('update:todoCategory', event.target.value);
    };

    const updateDueDate = () => {
      emit('update:dueDate', selectedDate.value);
    };

    return {
      addTodo,
      toggleForm,
      options,
      updateTodoTitle,
      updateTodoDescription,
      updateTodoCategory,
      updateDueDate,
      selectedDate,
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

  :deep(.vc-popover-content) {
    background-color: var(--card-bg);
  }
}
</style>
