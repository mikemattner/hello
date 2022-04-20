<template>
  <div class="nav-footer">
    <p>&copy; {{ currentYear }} <a href="https://mikemattner.com">Mike Mattner</a></p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useDateFormat, useNow } from '@vueuse/core';

export default defineComponent({
  name: 'AppFooter',
  setup() {
    const yearFormat = ref<string>('YYYY');
    const currentYear = useDateFormat(useNow(), yearFormat);

    return {
      currentYear,
    };
  },
});
</script>

<style lang="scss">
.nav-footer {
  width: 100%;
  padding: 0.25rem 1rem;
  border-top: 1px solid rgba(#263966, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--slate-900);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  font-size: 0.675rem;
}
</style>
