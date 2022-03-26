<template>
  <div class="todo-list__item">
    <div :class="['todo-list__item-content', { done: todo.done }]" @click="finishTodo()">
      <div class="checkmark"></div>
      <div>{{ todo.content }}</div>
    </div>
    <BaseButton @clicked="removeTodo()">
      <CloseIcon />
    </BaseButton>
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
  padding: 20px 10px;
  padding: 1rem;
  border-radius: 4px;
  background-color: var(--card-bg);
  margin: 0.375rem 0;
  width: 100%;

  &:last-child {
    border-bottom: none;
  }

  &-content {
    display: flex;
    align-items: center;
    transition: all 0.25s ease-in-out;

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

    &.done {
      &:after {
        opacity: 1;
        left: 36px;
        right: -4px;
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
