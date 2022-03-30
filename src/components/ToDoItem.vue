<template>
  <div class="todo-list__item">
    <div
      :class="['todo-list__item-content', { done: todo.done }]"
      @keyup.enter="finishTodo()"
      @keyup.space="finishTodo()"
      @click="finishTodo()"
      tabindex="0"
    >
      <div class="checkmark"></div>
      <div class="todo-content">
        <div class="todo-content__label">{{ todo.content }}</div>
        <div class="todo-content__time">
          Added <strong>{{ dateSet }}</strong>
        </div>
      </div>
    </div>
    <div :class="['todo-done', { done: todo.done }]">
      <BaseButton @clicked="removeTodo()">
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

    const dateFormat = ref<string>('MM/DD/YYYY');
    const dateSet = useDateFormat(props.todo.date, dateFormat);

    return {
      finishTodo,
      removeTodo,
      dateSet,
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
  margin: 0.375rem 0;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  overflow: hidden;

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
    align-items: center;
    transition: all 0.25s ease-in-out;
    flex-grow: 1;
    padding: 1rem;
    line-height: 1.5;

    &:focus {
      box-shadow: var(--inner-focus-shadow);
    }

    .checkmark {
      height: 25px;
      width: 25px;
      flex-grow: 0;
      border: 1px solid var(--input-bg-color);
      border-radius: 4px;
      margin-right: 15px;
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

      &__time {
        font-size: 0.5rem;
        line-height: 1;
      }
    }

    &.done {
      .todo-content {
        &__label {
          text-decoration-line: line-through;
          text-decoration-color: var(--contrast-color);
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
