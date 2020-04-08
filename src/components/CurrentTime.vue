<template>
  <div class="current-time">
    <div class="current-time__display">{{currentTime}}</div>
    <div class="current-time__message">
      {{greeting}}. Today is {{currentDate}}.
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'CurrentTime',
  data() {
    return {
      currentTime: null,
      currentHour: null,
      currentDate: null,
      greeting: 'Hello',
      messages: {
        morning: 'Good morning',
        afternoon: 'Good afternoon',
        evening: 'Good evening',
      },
      name: 'Mike',
    };
  },
  methods: {
    updateCurrentTime() {
      this.currentTime = moment().format('h:mm:ss');
    },
    updateCurrentDate() {
      this.currentDate = moment().format('MMMM Do YYYY');
    },
    setMessage() {
      this.currentHour = moment().format('H');

      switch (true) {
        case (this.currentHour < 12):
          this.greeting = this.messages.morning;
          break;
        case (this.currentHour < 17):
          this.greeting = this.messages.afternoon;
          break;
        case (this.currentHour > 17):
          this.greeting = this.messages.evening;
          break;
        default:
          this.greeting = 'Hello';
      }
    },
  },
  created() {
    this.currentTime = moment().format('h:mm:ss');
    this.updateCurrentDate();
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
    setInterval(() => this.setMessage(), 1 * 1000);
  },
};
</script>

<style scoped lang="scss">
.current-time {
  &__display {
    font-size: 9rem;
    font-weight: 700;
    line-height: 1;
  }
  &__message {
    font-size: 1.5rem;
    line-height: 1.2;
  }
}
</style>
