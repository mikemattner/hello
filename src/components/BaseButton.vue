<template>
  <button :class="classes" v-bind="{ ...attributes }" @click="$emit('clicked')">
    <span class="button--content">
      <slot />
    </span>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { Colors } from '@/types/types';

export default defineComponent({
  name: 'BaseButton',
  props: {
    primary: {
      type: Boolean,
      default: false,
    },
    actionButton: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String as PropType<Colors>,
      default: 'highlight',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const attributes = computed(() => {
      return {
        disabled: props.disabled,
      };
    });

    const classes = computed(() => {
      return [
        'button',
        {
          button__primary: props.primary,
          button__action: props.actionButton,
          button__highlight: props.color === 'highlight',
          button__warning: props.color === 'warning',
          button__disabled: props.disabled,
        },
      ];
    });

    return {
      attributes,
      classes,
    };
  },
});
</script>

<style scoped lang="scss">
.button {
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  border: none;
  background-color: unset;
  padding: 0.25rem 0.5rem;
  color: var(--color);
  border: 1px solid rgba(#dcebf6, 0.125);
  transition: all 0.25s ease-in-out;

  &.button__action {
    position: fixed;
    bottom: 40px;
    right: 20px;
    border-radius: 30px;
    padding: 0.5rem 0.75rem;
    z-index: 99;
    box-shadow: 2px 10px 20px var(--card-shadow);

    :deep(.material-icons-outlined) {
      font-size: 1.25rem;
    }
  }
  &.button__highlight {
    color: var(--color);
    &:hover:not(:disabled) {
      background-color: rgba(#dcebf6, 0.125);
      border-color: var(--contrast-color);
    }
  }

  &.button__warning {
    color: var(--color);

    // :deep(.material-icons-outlined) {
    //   color: var(--color--red);
    // }

    border: 1px solid var(--color--red);
    &:hover:not(:disabled) {
      background-color: rgba(#dcebf6, 0.125);
      border-color: var(--color--red);
    }
  }

  &:hover:not(:disabled) {
    cursor: pointer;
  }
  &:focus {
    outline: 0;
    box-shadow: var(--button-focus-shadow);
  }

  &--disabled,
  &:disabled {
    cursor: not-allowed;
    opacity: 0.25;
    pointer-events: none;
  }

  &--content {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 10px;
    font-size: 0.75rem;
    font-weight: 900;
  }

  :deep(svg) {
    fill: var(--contrast-color);
  }

  &__primary {
    &.button__highlight {
      color: var(--contrast-text-color);
      background-color: var(--contrast-color);
      &:hover:not(:disabled) {
        color: var(--contrast-text-color-hover);
        background-color: var(--contrast-color-hover);
      }
    }

    &.button__warning {
      color: #fff;
      background-color: var(--color--red);
      &:hover:not(:disabled) {
        background-color: var(--color--red);
        border-color: var(--color--red);
      }
    }

    :deep(svg) {
      fill: var(--card-bg);
    }
    &:hover:not(:disabled) {
      box-shadow: inset 0 0 0 40px rgba(0, 0, 0, 0.25);
    }
    &:focus {
      outline: 0;
      box-shadow: inset 0 0 0 40px rgba(0, 0, 0, 0), var(--button-focus-shadow);
    }
  }
}
</style>
