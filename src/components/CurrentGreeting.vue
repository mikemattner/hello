<template>
  <div class="current-greeting">
    <div class="current-greeting__message">
      <strong>{{ greeting }}</strong>
      <span class="date">{{ currentDate }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import type { Messages } from '@/types/types';
import { useDateFormat, useNow } from '@vueuse/core';
import { format } from 'date-fns';

export default defineComponent({
  name: 'CurrentTime',
  setup() {
    const dateFormat = ref<string>('MMM d, y');
    const hourFormat = ref<string>('H');
    const currentDate = format(useNow().value, dateFormat.value);
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
      greeting,
    };
  },
});
</script>

<style scoped lang="scss">
.current-greeting {
  padding: 0;

  &__message {
    font-size: 1rem;
    line-height: 1.2;
    color: var(--bunker-400);
    display: flex;
    flex-direction: column;

    strong {
      font-weight: 700;
    }

    .date {
      font-size: 0.675rem;
      color: var(--slate-400);
    }
  }
}
</style>
