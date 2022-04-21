<template>
  <div class="nav-footer">
    <span class="material-icons-outlined"> build_circle </span>
    <div>Built by <a href="https://mikemattner.com" target="_blank">Mike Mattner</a>.</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'AppFooter',
});
</script>

<style lang="scss">
.nav-footer {
  width: 100%;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  background-color: var(--slate-900);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  font-size: 0.675rem;

  &:after {
    content: '';
    position: absolute;
    top: -50px;
    bottom: 100%;
    left: 0;
    right: 0;
    width: 100%;
    background-image: linear-gradient(to top, #0f172a, rgba(#0f172a, 0));
  }
}
</style>
