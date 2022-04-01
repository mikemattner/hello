<template>
  <div class="todo-list__item">
    <div
      :class="['todo-list__item-content', { done: todo.done }]"
      @keyup.enter="finishTodo()"
      @keyup.space="finishTodo()"
      @click="finishTodo()"
      tabindex="0"
    >
      <div class="checkmark-surround">
        <div class="checkmark"></div>
      </div>
      <div class="todo-content">
        <div class="todo-content__label">{{ todo.content }}</div>
        <div class="todo-content__time">
          <span v-if="todo.category" class="category-label">{{ todo.category }}</span>
          <template v-if="!todo.done">
            <span class="material-icons-outlined"> event </span>
            <strong>{{ dateSet }}</strong>
            <span class="time-ago">{{ timeAgo }}</span>
          </template>
          <template v-else>
            <span class="material-icons-outlined"> task_alt </span>
            <strong>Completed</strong>
          </template>
        </div>
      </div>
    </div>
    <div :class="['todo-done', { done: todo.done }]">
      <BaseButton @clicked="removeTodo()" color="warning">
        <span class="material-icons-outlined"> delete_outline </span>
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import type { ToDo } from '@/types/types';
import { defineComponent, ref } from 'vue';
import type { PropType } from 'vue';
import BaseButton from './BaseButton.vue';
import CloseIcon from './CloseIcon.vue';
import { useDateFormat, useTimeAgo } from '@vueuse/core';
import { format } from 'date-fns';

export default defineComponent({
  components: {
    BaseButton,
    CloseIcon,
  },
  props: {
    todo: {
      type: Object as PropType<ToDo>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const removeTodo = () => {
      emit('remove');
    };

    const finishTodo = () => {
      emit('done');
    };

    const dateFormat = ref<string>('MMM d, y');
    const dateSet = format(new Date(props.todo.due), dateFormat.value);
    const timeAgo = useTimeAgo(props.todo.due);

    return {
      finishTodo,
      removeTodo,
      dateSet,
      timeAgo,
    };
  },
});
</script>

<style lang="scss" scoped>
.todo-list__item {
  display: grid;
  grid-template-columns: 1fr auto;
  border-radius: 4px;
  background-color: var(--card-bg);
  margin: 0.5rem 0;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  overflow: hidden;
  box-shadow: 2px 10px 20px var(--card-shadow);

  .category-label {
    padding: 3px 8px;
    border-radius: 4px;
    background-color: var(--input-color);
  }

  .checkmark-surround {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .todo-done {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    background-color: rgba(0, 0, 0, 0.1);

    @media (min-width: 730px) {
      opacity: 0;
      transform: translateX(50px);
      transition: all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    &.done {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &:hover,
  &:focus,
  &:focus-within {
    .todo-done {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &-content {
    display: flex;
    align-items: stretch;
    transition: all 0.25s ease-in-out;
    flex-grow: 1;
    line-height: 1.4;

    &:focus {
      box-shadow: var(--inner-focus-shadow);
    }

    .checkmark {
      height: 25px;
      width: 25px;
      flex-grow: 0;
      border: 1px solid var(--input-bg-color);
      border-radius: 4px;
      opacity: 0.5;
      transition: all 0.25s ease-in-out;
      flex: 0 0 25px;

      &:after {
        content: '';
        position: absolute;
        opacity: 0;
        transition: all 0.25s ease-in-out;
        left: 9px;
        top: 4px;
        width: 6px;
        height: 13px;
        border: solid var(--card-bg);
        border-width: 0 2px 2px 0;
        transform: rotate(45deg) scale(0.5);
        transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
    }

    &:hover {
      cursor: pointer;

      .checkmark {
        opacity: 1;
        background-color: var(--tooltip-bg);
        border-color: var(--contrast-color);
      }
    }

    .todo-content {
      position: relative;
      font-size: 0.75rem;
      padding: 1rem;

      &__time {
        margin-top: 0.375rem;
        font-size: 0.5rem;
        line-height: 1;
        display: flex;
        align-items: center;
        gap: 5px;

        strong {
          font-weight: 700;
        }

        .material-icons-outlined {
          font-size: 0.675rem;
        }

        .time-ago {
          text-transform: capitalize;
        }
      }
      &__label {
        font-weight: 700;
      }
    }

    &.done {
      .todo-content {
        &__label {
          text-decoration-line: line-through;
          text-decoration-style: wavy;
          text-decoration-color: var(--contrast-color);
          text-decoration-thickness: 1px;
          color: rgba(255, 255, 255, 0.5);
        }
      }

      .checkmark {
        opacity: 1;
        background-color: var(--contrast-color);
        border-color: var(--contrast-color);
        &:after {
          opacity: 1;
          transform: rotate(45deg) scale(1);
        }
      }
    }
  }
}
</style>
