<template>
  <div class="current-time">
    <div class="current-time__display">{{ currentTime }}</div>
    <div class="current-time__message">{{ greeting }}. Today is {{ currentDate }}.</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import moment from 'moment';
import type { Messages } from '@/types/types';

export default defineComponent({
  name: 'CurrentTime',
  setup() {
    const currentTime = ref<string>(moment().format('h:mm'));
    const currentHour = ref<string>(moment().format('H'));
    const currentDate = ref<string>(moment().format('MMMM Do, YYYY'));
    const messages: Messages = {
      morning: 'Good morning',
      afternoon: 'Good afternoon',
      evening: 'Good evening',
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

    const updateCurrentHour = () => {
      currentHour.value = moment().format('H');
    };

    const updateCurrentTime = () => {
      currentTime.value = moment().format('h:mm');
    };

    const updateCurrentDate = () => {
      currentDate.value = moment().format('MMMM, Do YYYY');
    };

    updateCurrentDate();
    setInterval(() => updateCurrentTime(), 1 * 1000);
    setInterval(() => updateCurrentHour(), 1 * 1000);

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
  @media (max-width: 1299px) {
    padding-top: 2rem;
  }
  @media (min-width: 1300px) {
    padding-top: 4rem;
  }
  &__display {
    font-size: 4rem;
    font-weight: 900;
    line-height: 1;
    color: var(--contrast-color);
    @media (min-width: 852px) {
      font-size: 4rem;
    }
  }
  &__message {
    font-size: 1.25rem;
    line-height: 1.2;
  }
}
</style>
