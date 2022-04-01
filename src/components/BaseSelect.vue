<template>
  <div :class="classes">
    <label class="input-select-field__label" :for="id">{{ label }}</label>
    <select
      autocomplete="off"
      class="input-select-field__input"
      :id="id"
      :name="name"
      :value="modelValue"
      ref="vModel"
      v-on="events"
    >
      <option v-for="(option, index) in options" :value="option" :key="index" :selected="option === modelValue">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseSelect',
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
    options: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const classes = computed(() => {
      return [
        'input-select-field',
        {
          'input-select-field--populated': !!props.modelValue,
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
.input-select-field {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  position: relative;

  &__label {
    padding-left: 0.5rem;
    opacity: 1;
    transition: all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    font-weight: 700;
    font-size: 0.75rem;
  }

  &__input {
    border: none;
    border-bottom: 1px solid var(--input-bg-color);
    border-radius: 0;
    background: none;
    color: var(--color);
    font-weight: 300;
    font-size: 0.75rem;
    padding: 0.5rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    transition: all 0.25s ease-in-out;
    opacity: 0.5;
    margin: 0;

    option {
      color: var(--card-bg);
    }

    &:hover {
      border-color: var(--input-focus);
    }
    &:focus {
      border-color: var(--input-focus);
    }
  }

  &:focus-within {
    .input-text-field__input {
      opacity: 1;
    }
    .input-text-field__label {
      top: 0;
      transform: translateY(-70%);
      font-size: 0.675rem;
    }
  }
  &--populated > .input-select-field__label {
    top: 0;
    transform: translateY(-70%);
    font-size: 0.675rem;
  }

  &--populated > .input-select-field__input {
    opacity: 1;
  }
}
</style>
