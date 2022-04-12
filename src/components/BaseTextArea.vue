<template>
  <div :class="classes">
    <label class="input-text-area__label" :for="id">{{ label }}</label>
    <textarea
      autocomplete="off"
      class="input-text-area__input"
      :id="id"
      :name="name"
      :value="modelValue"
      :rows="rows"
      ref="vModel"
      v-on="events"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseInput',
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    rows: {
      type: String || Number,
      default: 4,
    },
  },
  setup(props, { emit }) {
    const classes = computed(() => {
      return [
        'input-text-area',
        {
          'input-text-area--populated': !!props.modelValue,
        },
      ];
    });
    const events = computed(() => {
      return {
        input: (event: any) => {
          emit('update:modelValue', event.target.value);
        },
        focus: (event: any) => {
          emit('focus', event);
        },
        blur: (event: any) => {
          emit('blur', event);
        },
      };
    });

    return {
      classes,
      events,
    };
  },
});
</script>

<style lang="scss" scoped>
.input-text-area {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  position: relative;

  &__label {
    background-color: var(--card-bg);
    // padding-left: 0.5rem;
    padding: 0 2px;
    opacity: 1;
    transition: all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    position: absolute;
    left: 0.5rem;
    top: 20px;
    transform: translateY(-50%);
    width: 100%;
    font-weight: 700;
    font-size: 0.75rem;
    width: max-content;
  }

  &__input {
    border: none;
    border: 1px solid var(--input-border-color);
    border-radius: 4px;
    background: none;
    color: var(--color);
    font-weight: 300;
    font-size: 0.75rem;
    padding: 0.5rem;
    -webkit-appearance: none;
    outline: none;
    transition: all 0.25s ease-in-out;
    margin: 0;
    font-family: Inter, sans-serif;

    &:hover {
      border-color: var(--input-border-focus);
    }
    &:focus {
      border-color: var(--input-border-focus);
    }
  }

  &:focus-within {
    .input-text-area__input {
      opacity: 1;
    }
    .input-text-area__label {
      top: 0;
      transform: translateY(-50%);
      font-size: 0.5rem;
      z-index: 2;
    }
  }
  &--populated > .input-text-area__label {
    top: 0;
    transform: translateY(-50%);
    font-size: 0.5rem;
    z-index: 2;
  }

  &--populated > .input-text-area__input {
    opacity: 1;
  }
}
</style>
