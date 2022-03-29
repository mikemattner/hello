<template>
  <div class="current-time">
    <div class="current-time__display">{{ currentTime }}</div>
    <div class="current-time__message">{{ greeting }}. Today is {{ currentDate }}.</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import type { Messages } from '@/types/types';
import { useDateFormat, useNow } from '@vueuse/core';

export default defineComponent({
  name: 'CurrentTime',
  setup() {
    const timeFormat = ref<string>('h:mm');
    const dateFormat = ref<string>('MM/DD/YYYY');
    const hourFormat = ref<string>('H');
    const currentTime = useDateFormat(useNow(), timeFormat);
    const currentDate = useDateFormat(useNow(), dateFormat);
    const currentHour = useDateFormat(useNow(), hourFormat);

    const messages: Messages = {
      afternoon: 'Good afternoon',
      evening: 'Good evening',
      morning: 'Good morning',
    };

    const greeting = computed<string>(() => {
      const hour = parseInt(currentHour.value);
      switch (true) {
        case hour < 12:
          return messages.morning;
        case hour < 17:
          return messages.afternoon;
        case hour >= 17:
          return messages.evening;
        default:
          return 'Hello';
      }
    });

    return {
      currentDate,
      currentTime,
      greeting,
    };
  },
});
</script>

<style scoped lang="scss">
.current-time {
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  width: 100%;
  padding-bottom: 1rem;
  @media (max-width: 1299px) {
    padding-top: 1rem;
  }
  @media (min-width: 1300px) {
    padding-top: 1rem;
  }
  &__display {
    font-size: 2rem;
    font-weight: 900;
    line-height: 1;
    margin-top: 1rem;
    @media (min-width: 852px) {
      font-size: 3rem;
      margin-top: 0;
    }
  }
  &__message {
    font-size: 1rem;
    line-height: 1.2;
  }
}
</style>
