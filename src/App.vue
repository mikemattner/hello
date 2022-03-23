<template>
  <div class="main-view">
    <RouterView />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import moment from 'moment';

export default defineComponent({
  setup () {
    const setPeriod = computed<string>(() => {
      let period: string = '';
      const currentTime: string = moment().format('H');

      switch (true) {
        case (currentTime < '16'):
          period = 'day';
          break;
        case (currentTime > '16'):
          period = 'night';
          break;
        default:
          period = 'day';
      }

      return period;
    });

    document.body.classList.add(setPeriod.value);

    return {
      setPeriod,
    }
  }
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;700&display=swap');
@import '@/assets/styles/open-weather-icons.scss';
html {
  font-weight: 300;
  font-size: calc(14px + 0.5vw);
  line-height: 1.65;
  letter-spacing: 0.0125rem;
  @media (min-width: 1600px) {
    font-size: 22px;
  }
}
body.night {
  --background-image: linear-gradient(to right top, #233b57, #274f7d);
  --color: #c9dbee;
  --tooltip-bg: #244568;
  --tooltip-color: #f3f6fc;
  --card-bg: #233b57;
  --card-shadow: rgba(35, 59, 87,0.25);
}
body.day {
    --background-image: linear-gradient(to right top, #d5f8f8, #eefdfd);
    --color: #1f505a;
    --tooltip-bg: #1f505a;
    --tooltip-color: #eefdfd;
    --card-bg: #b0f1f1;
    --card-shadow: rgba(31,80,90,0.25);
}
body {
  color: var(--color);
  margin: 0;
  padding: 0;
  background-image: var(--background-image);
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.main-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
