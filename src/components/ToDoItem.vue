<template>
  <div class="todo-list__item">
    <div :class="['todo-list__item-content', { done: todo.done }]" @click="finishTodo()">
      <div class="checkmark"></div>
      <div class="todo-content">{{ todo.content }}</div>
    </div>
    <div class="todo-done">
      <BaseButton @clicked="removeTodo()">
        <CloseIcon />
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import type { ToDo } from '@/types/types';
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import BaseButton from './BaseButton.vue';
import CloseIcon from './CloseIcon.vue';

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
    return {
      finishTodo,
      removeTodo,
    };
  },
});
</script>

<style lang="scss" scoped>
.todo-list__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  background-color: var(--card-bg);
  margin: 0.375rem 0;
  width: 100%;

  &:last-child {
    border-bottom: none;
  }

  .todo-done {
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.1);
  }

  &-content {
    display: flex;
    align-items: center;
    transition: all 0.25s ease-in-out;
    flex-grow: 1;
    padding: 1rem;
    .checkmark {
      height: 25px;
      width: 25px;
      flex-grow: 0;
      border: 1px solid var(--input-bg-color);
      border-radius: 50%;
      margin-right: 15px;
      opacity: 0.5;
      transition: all 0.25s ease-in-out;

      &:after {
        content: '';
        position: absolute;
        opacity: 0;
        transition: all 0.25s ease-in-out;
        left: 9px;
        top: 4px;
        width: 6px;
        height: 13px;
        border: solid var(--input-color);
        border-width: 0 1px 1px 0;
        transform: rotate(45deg) scale(0.5);
        transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
    }

    &:hover {
      cursor: pointer;

      .checkmark {
        opacity: 1;
        background-color: var(--tooltip-bg);
      }
    }

    .todo-content {
      position: relative;

      &:after {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 50%;
        right: 50%;
        height: 2px;
        background-color: rgba(#dcebf6, 0.5);
        opacity: 0;
        transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
    }

    &.done {
      .todo-content {
        &:after {
          opacity: 1;
          left: -4px;
          right: -4px;
        }
      }

      .checkmark {
        opacity: 1;
        background-color: var(--color);
        &:after {
          opacity: 1;
          transform: rotate(45deg) scale(1);
        }
      }
    }
  }
}
</style>
