<template>
  <div class="card">
    <div class="card--body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseCard',
});
</script>

<style scoped lang="scss">
.card {
  margin: 2rem 0;
  border-radius: 4px;
  padding: 1rem;
  background-color: var(--card-bg);
  box-shadow: 2px 10px 20px var(--card-shadow);
  transition: all 0.25s ease-in-out;

  &--body {
    width: 100%;
  }
}
</style>
