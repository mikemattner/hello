<template>
  <button class="button" @click="$emit('clicked')">
    <span class="button--content">
      <slot />
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BaseButton'
})
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
    font-size: 0.75rem;
    font-weight: 700;
    border: none;
    background-color: unset;
    padding: 0.5rem;

    &:hover {
        background-color: rgba(#dcebf6, 0.125);
        box-shadow: unset;
        cursor: pointer;
    }
    &:focus {
        background-color: rgba(#dcebf6, 0.125);
        box-shadow: unset;
    }

    &--content {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

}

</style>