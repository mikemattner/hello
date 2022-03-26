<template>
  <div class="main-view">
    <RouterView />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import moment from 'moment';

export default defineComponent({
  name: 'DashboardApp',
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;700;900&display=swap');
@import '@/assets/styles/open-weather-icons.scss';
@import '@/assets/styles/custom-properties.scss';

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  position: relative;
  font-weight: normal;
}

html {
  font-weight: 300;
  font-size: calc(16px + 0.5vw);
  line-height: 1.65;
  letter-spacing: 0.0125rem;
  @media (min-width: 1600px) {
    font-size: 22px;
  }
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
  align-items: flex-start;
  min-height: 100vh;
  min-height: -webkit-fill-available;
}
</style>
