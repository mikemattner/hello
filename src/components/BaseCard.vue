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
  margin: 2rem auto;
  border-radius: 4px;
  padding: 1rem;
  background-color: rgba(255,255,255,0.125);
  box-shadow: 2px 2px 20px rgba(0,0,0,0.15);
  transition: all 0.25s ease-in-out;
  &:hover {
    box-shadow: 2px 10px 40px rgba(0,0,0,0.25);
  }
}
</style>
