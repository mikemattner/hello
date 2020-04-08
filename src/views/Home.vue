<template>
  <main class="home">
    <CurrentTime />
    <Card>
      <CurrentWeather />
    </Card>
  </main>
</template>

<script>
import CurrentTime from '@/components/CurrentTime.vue';
import CurrentWeather from '@/components/CurrentWeather.vue';
import Card from '@/components/Card.vue';

export default {
  name: 'Home',
  components: {
    CurrentTime,
    CurrentWeather,
    Card,
  },
};
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
