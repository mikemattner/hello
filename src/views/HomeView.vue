<template>
  <main class="home">
    <CurrentTime />
    <BaseCard>
      <CurrentWeather />
    </BaseCard>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CurrentTime from '@/components/CurrentTime.vue';
import CurrentWeather from '@/components/CurrentWeather.vue';
import BaseCard from '@/components/BaseCard.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    CurrentTime,
    CurrentWeather,
    BaseCard,
  },
})
</script>

<style lang="scss">
.home {
  display: flex;
  width: 100%;
  max-width: 600px;
  margin: 0 20px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
</style>
