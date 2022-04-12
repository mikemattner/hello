<template>
  <div class="current-time">
    <div class="current-time__display">
      <span class="material-icons-outlined"> schedule </span>
      <span class="time">{{ currentTime }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useDateFormat, useNow } from '@vueuse/core';
import { format } from 'date-fns';

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
  height: 100%;

  &__display {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 5px;

    .material-icons-outlined {
      color: var(--slate-500);
    }
    .time {
      font-size: 1rem;
      font-weight: 900;
      line-height: 1;
    }
  }
}
</style>
