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
    background-color: var(--slate-900);
    // padding-left: 0.5rem;
    padding: 0 2px;
    opacity: 1;
    transition: all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    position: absolute;
    left: 0.5rem;
    top: 50%;
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
    color: var(--header-color);
    font-weight: 300;
    font-size: 0.75rem;
    padding: 0.5rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    transition: all 0.25s ease-in-out;
    margin: 0;
    font-family: var(----font-family);
    background-image: linear-gradient(45deg, transparent 50%, var(--color) 50%),
      linear-gradient(135deg, var(--color) 50%, transparent 50%);
    background-position: calc(100% - 20px) 1.125em, calc(100% - 15px) 1.125em;
    background-size: 5px 5px, 5px 5px, 1px 1.5em;
    background-repeat: no-repeat;

    option {
      color: var(--card-bg);
      font-family: var(----font-family);
    }

    &:hover {
      border-color: var(--input-border-focus);
    }
    &:focus {
      border-color: var(--input-border-focus);
    }
  }

  &:focus-within {
    .input-text-field__input {
      opacity: 1;
    }
    .input-text-field__label {
      top: 0;
      transform: translateY(-50%);
      font-size: 0.5rem;
      z-index: 2;
    }
  }
  &--populated > .input-select-field__label {
    top: 0;
    transform: translateY(-50%);
    font-size: 0.5rem;
    z-index: 2;
  }

  &--populated > .input-select-field__input {
    opacity: 1;
  }
}
</style>
