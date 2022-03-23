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
        case (currentTime < '18'):
          period = 'evening';
          break;
        case (currentTime >= '18'):
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;700;900&display=swap');
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
  --background-image: linear-gradient(45deg, #031a36 0%, #031a36 50%, #12324d 100%);
  --color: #dcebf6;
  --tooltip-bg: #12324d;
  --tooltip-color: #dcebf6;
  --card-bg: #031a36;
  --card-shadow: rgba(0, 0, 0, 0.25);
}
body.evening {
  --background-image: linear-gradient(45deg, #19270c 0%, #19270c 50%, #3b562a 100%);
  --color: #e6eedd;
  --tooltip-bg: #19270c;
  --tooltip-color: #e6eedd;
  --card-bg: #2c3419;
  --card-shadow: rgba(44, 52, 25, 0.25);
}
body.day {
  --background-image: linear-gradient(45deg, #b0f0f1 0%, #b0f0f1 50%, #eefdfd 100%);
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
