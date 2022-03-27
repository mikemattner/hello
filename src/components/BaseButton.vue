<template>
  <button :class="classes" @click="$emit('clicked')">
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
    },
  },
  setup(props) {
    const classes = computed(() => {
      return [
        'button',
        {
          button__primary: props.primary,
        },
      ];
    });

    return {
      classes,
    };
  },
});
</script>

<style scoped lang="scss">
.button {
  border-radius: 4px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.25s ease-in-out;
  overflow: hidden;
  border: none;
  background-color: unset;
  padding: 0.5rem;
  color: var(--color);
  border: 1px solid rgba(#dcebf6, 0.125);

  &:hover {
    background-color: rgba(#dcebf6, 0.125);
    border-color: var(--contrast-color);
    box-shadow: unset;
    cursor: pointer;
  }
  &:focus {
    background-color: rgba(#dcebf6, 0.125);
    border-color: var(--contrast-color);
    box-shadow: unset;
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
    &:hover {
      box-shadow: inset 0 0 0 40px rgba(0, 0, 0, 0.25);
      background-color: var(--contrast-color);
    }
  }
}
</style>
