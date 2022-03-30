<template>
  <button :class="classes" v-bind="{ ...attributes }" @click="$emit('clicked')">
    <span class="button--content">
      <slot />
    </span>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseButton',
  props: {
    primary: {
      type: Boolean,
      default: false,
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

  &:hover:not(:disabled) {
    background-color: rgba(#dcebf6, 0.125);
    border-color: var(--contrast-color);
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
    background-color: var(--contrast-color);
    color: var(--card-bg);
    box-shadow: inset 0 0 0 40px rgba(0, 0, 0, 0);

    :deep(svg) {
      fill: var(--card-bg);
    }
    &:hover:not(:disabled) {
      box-shadow: inset 0 0 0 40px rgba(0, 0, 0, 0.25);
      background-color: var(--contrast-color);
    }
    &:focus {
      outline: 0;
      box-shadow: inset 0 0 0 40px rgba(0, 0, 0, 0), var(--button-focus-shadow);
    }
  }
}
</style>
