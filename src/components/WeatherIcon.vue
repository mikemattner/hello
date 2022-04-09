<template>
  <section class="weather-icon-container">
    <div class="icon-container">
      <span :class="['weather__icon', 'owi', `owi-${icon}`]"></span>
      <span class="material-icons-outlined refresh">refresh</span>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WeatherIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.weather-icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  position: relative;
  z-index: 100;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  &:hover {
    transform: scale(1.1);
  }
  .weather__icon {
    width: 80px;
    font-size: 2.25rem;
    color: var(--tooltip-color);
    transition: all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .refresh {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 1.5rem;
    transform: translate(-50%, -50%);
    transition: all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  .icon-container {
    width: 80px;
    height: 80px;
    border-radius: 40px;
    color: var(--tooltip-color);
    background-color: var(--tooltip-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    z-index: 1;
    position: relative;
  }
  .icon-description {
    text-transform: uppercase;
    font-size: 0.5rem;
    font-weight: 700;
    padding: 5px;
    margin-top: 0.25rem;
    border-radius: 5px;
    color: var(--tooltip-color);
    background-color: var(--tooltip-bg);
    box-shadow: 2px 10px 20px var(--card-shadow);
    z-index: 100;
    position: absolute;
    bottom: 0;
    transform: translate3d(0, 0, 0);
    transition: all 0.125s ease-in-out;
    opacity: 0;
    width: max-content;
  }

  &:hover {
    .weather__icon {
      opacity: 0;
      visibility: hidden;
    }

    .refresh {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
