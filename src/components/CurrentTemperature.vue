<template>
  <div class="current-temperature">
    <div class="temperature-value-block">
      <div class="current-temperature__left">
        <div class="current-temperature__value">
          {{ (scaleSymbol === 'C')? temperatureValue : fValue }}
        </div>
        <div class="temperature__scale" @click.prevent="toggleTemperature">
          <span>&deg;{{ scaleSymbol }}</span>
        </div>
      </div>
      <div class="current-temperature__right">
        <div class="temperature__high">
          <span>&uarr;</span><span>{{ scaleSymbol === 'C' ? high : fHigh }}</span
          >&deg;
        </div>
        <div class="temperature__low">
          <span>&darr;</span>
          <span>{{ scaleSymbol === 'C' ? low : fLow }}</span
          >&deg;
        </div>
      </div>
    </div>
    <div class="current-temperature__location">
      <div class="current-temperature__location-name">{{ location }}</div>
      <div class="current-temperature__location-description">{{ description }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Temperature',
  props: {
    temperatureValue: {
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
    description: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const scale = ref<string>('Fahrenheit');

    const toFahrenheit = (value: number) => {
      return Math.floor(value * 1.8 + 32);
    };

    const toggleTemperature = () => {
      scale.value = scale.value === 'Fahrenheit' ? 'Celcius' : 'Fahrenheit';
    };

    const scaleSymbol = computed<string>(() => {
      return scale.value.charAt(0);
    });

    const fValue = computed<number>(() => {
      return toFahrenheit(props.temperatureValue);
    });

    const fHigh = computed<number>(() => {
      return toFahrenheit(props.high);
    });

    const fLow = computed<number>(() => {
      return toFahrenheit(props.low);
    });
  
    return{
      fValue,
      fHigh,
      fLow,
      scaleSymbol,
      toggleTemperature,
    }
  },
});
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
    margin-top: 0.25rem;
    font-weight: 700;

    &-description {
      margin-top: 0.25rem;
      text-transform: capitalize;
      font-weight: 300;
    }

    &-name {
      font-weight: 700;
    }
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
    font-weight: 900;
  }
  .temperature__scale {
    margin-top:0.125rem;
    font-size: 1rem;
    font-weight: 100;
    cursor: pointer;
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
    font-weight: 700;
    display: flex;
    justify-content: center;
    max-height: 12px;
    img {
      width: 15px;
      opacity: 0.45;
    }
  }
}
</style>
