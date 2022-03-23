<template>
  <section>
    <div class="icon-container">
      <img class="weather__icon" :src="icon" :alt="description" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.weather__icon {
  width: 40px;
}
.icon-container {
  width:60px;
  height: 60px;
  border-radius: 30px;
  background-color: rgba(0,0,0,0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}
</style>
