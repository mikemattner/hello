<template>
  <div class="current-time">
    <div class="current-time__display">{{ currentTime }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useDateFormat, useNow } from '@vueuse/core';

export default defineComponent({
  name: 'CurrentTime',
  setup() {
    const timeFormat = ref<string>('h:mm');
    const currentTime = useDateFormat(useNow(), timeFormat);

    return {
      currentTime,
    };
  },
});
</script>

<style scoped lang="scss">
.current-time {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  width: 100%;
  height: 100%;

  &__display {
    font-size: 2rem;
    font-weight: 900;
    line-height: 1;
  }
}
</style>
