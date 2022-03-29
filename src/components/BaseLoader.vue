<template>
  <div class="loader">
    <span class="material-icons-outlined icon rotate-medium"> sync </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseLoader',
});
</script>

<style scoped>
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.icon {
  opacity: 0.5;
  font-size: 3.5rem;
}
.rotate-medium {
  animation: rotation 1s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
