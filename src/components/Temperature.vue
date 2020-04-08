<template>
  <div class="current-temperature">
    <div class="temperature-value-block">
      <div class="current-temperature__left">
        <div class="current-temperature__value">
          {{ (scaleSymbol === 'C')? value : fValue }}
        </div>
        <div class="temperature__scale">
          <a href="#" @click.prevent="toggleTemperature"
            >&deg;{{ scaleSymbol }}</a
          >
        </div>
      </div>
      <div class="current-temperature__right">
        <div class="temperature__high">
          <img src="../assets/icons/caret-up.svg" alt="high temperature" /><span>{{
            scaleSymbol === 'C' ? high : fHigh
          }}</span
          >&deg;
        </div>
        <div class="temperature__low">
          <img src="../assets/icons/caret-down.svg" alt="low temperature" /><span>{{
            scaleSymbol === 'C' ? low : fLow
          }}</span
          >&deg;
        </div>
      </div>
    </div>
    <div class="current-temperature__location">
      {{ location }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrentWeather',
  props: {
    value: {
      type: Number,
      required: true,
    },
    high: {
      type: Number,
      required: true,
    },
    low: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      scale: 'Fahrenheit',
    };
  },
  computed: {
    scaleSymbol() {
      return this.scale.charAt(0);
    },
    fValue() {
      return this.toFahrenheit(this.value);
    },
    fHigh() {
      return this.toFahrenheit(this.high);
    },
    fLow() {
      return this.toFahrenheit(this.low);
    },
  },
  methods: {
    toFahrenheit(value) {
      return Math.floor(value * 1.8 + 32);
    },
    toggleTemperature() {
      this.scale = this.scale === 'Fahrenheit' ? 'Celcius' : 'Fahrenheit';
    },
  },
};
</script>

<style scoped lang="scss">
.current-temperature {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  line-height: 1;
  &__location {
    font-size: 0.675rem;
    margin-top: 0;
  }
  .temperature-value-block {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__left,
  &__right {
    display: flex;
  }
  &__left {
    justify-content: center;
    align-items: flex-start;
    margin-right: 0.5rem;
  }
  &__right {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  &__value {
    font-size: 2rem;
    font-weight: 700;
  }
  .temperature__scale {
    margin-top:0.125rem;
    font-size: 1rem;
    font-weight: 100;
    a {
      color: #fff;
      text-decoration: none;
      transition: all 0.25s ease-in-out;
      &:hover {
        color: rgba(255,255,255,0.5);
      }
    }
  }
  .temperature__high,
  .temperature__low {
    margin: 0.125rem 0;
    font-size: 0.675rem;
    display: flex;
    justify-content: center;
    img {
      width: 15px;
      opacity: 0.45;
    }
  }
}
</style>
