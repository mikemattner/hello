<template>
  <div :class="['todo-list__item', categoryClasses]">
    <div class="todo-list__item-content">
      <div class="drag-surround handle">
        <span class="material-icons-outlined"> drag_indicator </span>
      </div>
      <div class="todo-content">
        <div class="todo-content__label">{{ todo.content }}</div>
        <div v-if="todo.description" class="todo-content__description">{{ todo.description }}</div>
        <div class="todo-content__time">
          <div class="content-time">
            <span class="material-icons-outlined"> event </span>
            <strong>{{ dateSet }}</strong>
          </div>
          <span v-if="todo.category" :class="categoryClasses">
            <span class="dot"></span>
            <span>{{ todo.category }}</span>
          </span>
        </div>
      </div>
    </div>
    <div class="todo-actions">
      <BaseButton @click="editToDo()" button-type="secondary" color="success" size="small">
        <span class="material-icons-outlined"> edit </span>
      </BaseButton>
      <BaseButton @click="removeTodo()" button-type="secondary" color="warning" size="small">
        <span class="material-icons-outlined"> remove_circle_outline </span>
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import type { ToDo } from '@/types/types';
import { computed, defineComponent, ref } from 'vue';
import type { PropType } from 'vue';
import BaseButton from './BaseButton.vue';
import CloseIcon from './CloseIcon.vue';
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
  emits: ['edit', 'remove'],
  setup(props, { emit }) {
    const editToDo = () => {
      emit('edit');
    };
    const removeTodo = () => {
      emit('remove');
    };

    const categoryClasses = computed(() => {
      return [
        'category-label',
        {
          'category-home': props.todo.category === 'Home',
          'category-personal': props.todo.category === 'Personal',
          'category-work': props.todo.category === 'Work',
        },
      ];
    });

    const dateFormat = ref<string>('MMM d, y');
    const dateSet = computed(() => format(new Date(props.todo.due), dateFormat.value));

    return {
      editToDo,
      removeTodo,
      dateSet,
      categoryClasses,
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
  margin: 0 0 0.5rem;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  overflow: hidden;
  box-shadow: 2px 10px 20px var(--card-shadow);

  .drag-surround {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0.25rem;
    background-color: rgba(0, 0, 0, 0.25);
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }

  .todo-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
    padding: 1rem 0.5rem;
    // background-color: rgba(0, 0, 0, 0.25);
    transition: all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55);

    @media (min-width: 1024px) {
      transform: translateX(20px);
      opacity: 0;
    }
  }

  &:hover {
    .todo-actions {
      transform: translateX(0);
      opacity: 1;
    }
  }

  &-content {
    display: flex;
    align-items: stretch;
    transition: all 0.25s ease-in-out;
    flex-grow: 1;
    line-height: 1.4;

    .todo-content {
      position: relative;
      padding: 1rem;
      width: 100%;

      &__time {
        margin-top: 0.375rem;
        font-size: 0.5rem;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
        width: 100%;
        color: var(--slate-400);

        .content-time {
          display: flex;
          align-items: center;
          gap: 5px;
        }

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
        font-size: 0.75rem;
        color: var(--header-color);
      }
      &__description {
        margin: 0.25rem 0 1rem;
        font-size: 0.675rem;
        color: var(--slate-400);
      }
      .category-label {
        padding: 4px 8px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;

        span {
          font-weight: 900;
        }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: block;
        }

        &.category-home {
          color: var(--ocean-green-900);
          background-color: var(--ocean-green-400);

          .dot {
            background-color: var(--ocean-green-900);
          }
        }

        &.category-work {
          color: var(--jaffa-900);
          background-color: var(--jaffa-400);

          .dot {
            background-color: var(--jaffa-900);
          }
        }

        &.category-personal {
          color: var(--carnation-900);
          background-color: var(--carnation-400);

          .dot {
            background-color: var(--carnation-900);
          }
        }
      }
    }

    // &.done {
    //   .todo-content {
    //     &__label {
    //       text-decoration-line: line-through;
    //       text-decoration-style: wavy;
    //       text-decoration-color: var(--input-border-focus);
    //       text-decoration-thickness: 1px;
    //       color: rgba(255, 255, 255, 0.5);
    //     }
    //   }

    //   // .checkmark {
    //   //   opacity: 1;
    //   //   background-color: var(--input-border-focus);
    //   //   border-color: var(--input-border-focus);
    //   //   &:after {
    //   //     opacity: 1;
    //   //     transform: rotate(45deg) scale(1);
    //   //   }
    //   // }
    // }
  }
}
</style>
