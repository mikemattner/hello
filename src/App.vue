<template>
  <div id="app" :class="period">
    <router-view/>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'CurrentTime',
  data() {
    return {
      currentTime: null,
      period: null,
    };
  },
  methods: {
    setPeriod() {
      this.currentTime = moment().format('H');

      switch (true) {
        case (this.currentTime < 17):
          this.period = 'day';
          break;
        case (this.currentTime > 17):
          this.period = 'night';
          break;
        default:
          this.period = 'day';
      }
    },
  },
  created() {
    setInterval(() => this.setPeriod(), 1 * 1000);
  },
};
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
  // background-color: #484F60;
  background-image: linear-gradient(to right top,
      #484F60, #3E738D);
  color: #fff;
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  &.night {
    // background-color: #484F60;
    background-image: linear-gradient(to right top,
      #484F60, #3E738D);
  }
  &.day {
    // background-color: #6CB9C8;
    background-image: linear-gradient(to right top,
      #6CB9C8, #5DCCC9);
  }
}
</style>
