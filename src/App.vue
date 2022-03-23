<template>
  <main :class="['main-view', setPeriod]">
    <RouterView />
  </main>
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
        case (currentTime < '17'):
          period = 'day';
          break;
        case (currentTime > '17'):
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
html {
  font-weight: 300;
  font-size: calc(14px + 0.5vw);
  line-height: 1.65;
  letter-spacing: 0.0125rem;
  @media (min-width: 1600px) {
    font-size: 22px;
  }
}
body {
  color: #fff;
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.main-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  &.night {
    background-image: linear-gradient(to right top,
      #242E42, #404756);
  }
  &.day {
    background-image: linear-gradient(to right top,
      #242E42, #404756);
  }
}
</style>
