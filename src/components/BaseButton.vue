<template>
  <component :is="element" :class="classes" v-bind="attributes">
    <span class="button--content">
      <slot />
    </span>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { ButtonType, Colors, Size } from '@/types/types';
import { RouterLink } from 'vue-router';

export default defineComponent({
  components: {
    RouterLink,
  },
  name: 'BaseButton',
  props: {
    href: {
      type: String,
      default: null,
    },
    to: {
      type: String,
      default: null,
    },
    color: {
      type: String as PropType<Colors>,
      default: 'default',
    },
    size: {
      type: String as PropType<Size>,
      default: 'medium',
    },
    buttonType: {
      type: String as PropType<ButtonType>,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const attributes = computed(() => {
      return {
        href: props.href,
        to: props.to,
        disabled: props.disabled,
      };
    });

    const classes = computed(() => {
      return [
        'button',
        {
          button__primary: props.buttonType === 'primary',
          button__secondary: props.buttonType === 'secondary',
          button__tertiary: props.buttonType === 'tertiary',
          button__default: props.color === 'default',
          button__warning: props.color === 'warning',
          button__success: props.color === 'success',
          button__medium: props.size === 'medium',
          button__small: props.size === 'small',
          button__disabled: props.disabled,
        },
      ];
    });

    const element = computed(() => {
      if (props.href) {
        return 'a';
      }

      if (props.to) {
        return 'router-link';
      }

      return 'button';
    });

    return {
      attributes,
      classes,
      element,
    };
  },
});
</script>

<style scoped lang="scss">
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: unset;
  border: none;
  border-radius: 4px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.25s ease-in-out;
  font-family: var(----font-family);

  &:hover:not(:disabled) {
    cursor: pointer;
  }
  &:focus,
  &:active {
    outline: 0;
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
    gap: 5px;
    font-weight: 900;
    line-height: 1;
  }

  &.button__small {
    padding: 0.25rem 0.25rem;

    .button--content {
      font-size: 0.75rem;
      :deep(.material-icons-outlined) {
        font-size: 1rem;
      }
    }
  }

  &.button__medium {
    padding: 0.25rem 0.5rem;

    .button--content {
      font-size: 0.75rem;

      :deep(.material-icons-outlined) {
        font-size: 1rem;
      }
    }
  }

  &__primary {
    color: var(--button-primary-text-color);
    background-color: var(--button-primary-background-color);

    &:hover:not(:disabled) {
      color: var(--button-primary-text-hover-color);
      background-color: var(--button-primary-background-hover-color);
    }

    &:active,
    &:focus-visible {
      outline: 0;
      box-shadow: var(--button-focus-shadow);
    }
  }

  &__secondary {
    color: var(--button-secondary-text-color);
    background-color: var(--button-secondary-background-color);
    box-shadow: inset 0 0 0 1px var(--button-secondary-border-color);

    &:hover:not(:disabled) {
      color: var(--button-secondary-text-hover-color);
      background-color: var(--button-secondary-background-hover-color);
      box-shadow: inset 0 0 0 1px var(--button-secondary-border-hover-color);
    }

    &:active,
    &:focus-visible {
      outline: 0;
      box-shadow: inset 0 0 0 1px var(--button-secondary-border-hover-color), var(--button-focus-shadow);
    }
  }

  &__tertiary {
    color: var(--button-tertiary-text-color);
    background-color: var(--button-tertiary-background-color);
    box-shadow: inset 0 0 0 1px var(--button-tertiary-border-color);

    &:hover:not(:disabled) {
      color: var(--button-tertiary-text-hover-color);
      background-color: var(--button-tertiary-background-hover-color);
      box-shadow: inset 0 0 0 1px var(--button-tertiary-border-hover-color);
    }

    &:active,
    &:focus-visible {
      outline: 0;
      box-shadow: inset 0 0 0 1px var(--button-tertiary-border-hover-color), var(--button-focus-shadow);
    }
  }

  &__default {
    --button-primary-text-color: var(--slate-900);
    --button-primary-text-hover-color: var(--slate-900);
    --button-primary-background-color: var(--sky-400);
    --button-primary-background-hover-color: var(--sky-300);
    --button-primary-border-color: var(--sky-800);
    --button-primary-border-hover-color: var(--sky-400);

    --button-secondary-text-color: var(--sky-400);
    --button-secondary-text-hover-color: var(--slate-900);
    --button-secondary-background-color: rgba(56, 189, 248, 0.1);
    --button-secondary-background-hover-color: rgba(56, 189, 248, 1);
    --button-secondary-border-color: var(--sky-800);
    --button-secondary-border-hover-color: var(--sky-400);

    --button-tertiary-text-color: var(--header-color);
    --button-tertiary-text-hover-color: var(--header-color);
    --button-tertiary-background-color: rgba(56, 189, 248, 0);
    --button-tertiary-background-hover-color: rgba(56, 189, 248, 0.1);
    --button-tertiary-border-color: rgba(56, 189, 248, 0);
    --button-tertiary-border-hover-color: var(--sky-800);
  }

  &__success {
    --button-primary-text-color: var(--ocean-green-900);
    --button-primary-text-hover-color: var(--ocean-green-900);
    --button-primary-background-color: var(--ocean-green-400);
    --button-primary-background-hover-color: var(--ocean-green-300);
    --button-primary-border-color: var(--ocean-green-800);
    --button-primary-border-hover-color: var(--ocean-green-400);

    --button-secondary-text-color: var(--ocean-green-100);
    --button-secondary-text-hover-color: var(--ocean-green-900);
    --button-secondary-background-color: rgba(72, 187, 120, 0.1);
    --button-secondary-background-hover-color: rgba(72, 187, 120, 1);
    --button-secondary-border-color: var(--ocean-green-800);
    --button-secondary-border-hover-color: var(--ocean-green-400);

    --button-tertiary-text-color: var(--ocean-green-400);
    --button-tertiary-text-hover-color: var(--ocean-green-200);
    --button-tertiary-background-color: rgba(72, 187, 120, 0);
    --button-tertiary-background-hover-color: rgba(72, 187, 120, 0.1);
    --button-tertiary-border-color: rgba(72, 187, 120, 0);
    --button-tertiary-border-hover-color: var(--ocean-green-800);
  }

  &__warning {
    --button-primary-text-color: var(--carnation-900);
    --button-primary-text-hover-color: var(--carnation-900);
    --button-primary-background-color: var(--carnation-400);
    --button-primary-background-hover-color: var(--carnation-300);
    --button-primary-border-color: var(--carnation-800);
    --button-primary-border-hover-color: var(--carnation-400);

    --button-secondary-text-color: var(--carnation-100);
    --button-secondary-text-hover-color: var(--carnation-100);
    --button-secondary-background-color: rgba(125, 31, 31, 0.1);
    --button-secondary-background-hover-color: rgba(125, 31, 31, 1);
    --button-secondary-border-color: var(--carnation-800);
    --button-secondary-border-hover-color: var(--carnation-400);

    --button-tertiary-text-color: var(--carnation-400);
    --button-tertiary-text-hover-color: var(--carnation-200);
    --button-tertiary-background-color: rgba(125, 31, 31, 0);
    --button-tertiary-background-hover-color: rgba(125, 31, 31, 0.1);
    --button-tertiary-border-color: rgba(125, 31, 31, 0);
    --button-tertiary-border-hover-color: var(--carnation-800);
  }
}
</style>
