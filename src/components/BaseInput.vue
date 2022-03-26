<template>
  <div class="input-text-field">
    <label class="input-text-field__label" :for="id">{{ label }}</label>
    <input
      autocomplete="off"
      class="input-text-field__input"
      :id="id"
      :name="name"
      :value="modelValue"
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
  },
  setup(props, { emit }) {
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
      events,
    };
  },
});
</script>

<style lang="scss" scoped>
.input-text-field {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding-bottom: 0.5rem;
  position: relative;

  &__label {
    padding-bottom: 0.125rem;
    opacity: 0.5;
    transition: all 0.25s ease-in-out;
    position: absolute;
    left: 0;
    width: 100%;
  }

  &__input {
    border: none;
    border-bottom: 2px solid var(--input-bg-color);
    border-radius: 0;
    background: none;
    color: var(--color);
    font-weight: 300;
    font-size: 1rem;
    padding: 0.5rem;
    -webkit-appearance: none;
    outline: none;
    transition: all 0.25s ease-in-out;
    opacity: 0.5;

    &:hover {
      border-color: var(--input-focus);
    }
    &:focus {
      border-color: var(--input-focus);
    }
  }

  &:focus-within {
    .input-text-field__label,
    .input-text-field__input {
      opacity: 1;
    }

    .input-text-field__label {
      left: 0;
      transform: translateY(-100%);
      font-size: 0.675rem;
      font-weight: 700;
    }
  }
}
</style>
