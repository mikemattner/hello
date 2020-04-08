<template>
  <section>
    <img class="weather__icon" :src="icon" :alt="description" />
  </section>
</template>

<script>
export default {
  name: 'Weather',
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.weather__icon {
  width: 60px;
  margin-right: 20px;
}
</style>
