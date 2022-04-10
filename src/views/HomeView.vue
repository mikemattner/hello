<template>
  <main class="home">
    <header class="home-header">
      <div class="logo-zone">
        <div class="logo">
          <BaseButton @click="toggleDrawer()">
            <span class="material-icons-outlined"> task_alt </span>
            <h1>MyTodos</h1>
          </BaseButton>
        </div>
      </div>
      <div class="corner-weather">
        <BaseCard>
          <TransitionGroup name="fadeweather" mode="out-in">
            <BaseLoader v-if="!isInitialized" />
            <div v-if="isError && isInitialized" class="error-state">
              <span class="material-icons-outlined"> error_outline </span>
              <p>Couldn&rsquo;t load weather!</p>
            </div>
            <CurrentWeather v-if="isInitialized && !isError" />
          </TransitionGroup>
        </BaseCard>
      </div>
      <CurrentTime class="current-time" />
    </header>
    <ToDos />
  </main>
  <BaseDrawer :is-open="openDrawer" @close="toggleDrawer()">
    <template v-slot:body class="about-app">
      <h2>About</h2>
      <p>Personal dashboard with time and local weather conditions, plus a simple todo interface.</p>
      <h3>Why build this?</h3>
      <p>
        Another Todo app&hellip;I know. The idea here was to learn Vue 3 a little more in-depth, update the initial
        dashboard app I created, and properly connect to the weather API using Netlify functions.
      </p>
      <dl>
        <dt>Repo</dt>
        <dd><a href="https://github.com/mikemattner/hello">https://github.com/mikemattner/hello</a></dd>
        <dt>Credits</dt>
        <dd><a href="https://mikemattner.com">Mike Mattner</a></dd>
      </dl>
      <p>&copy; {{ currentYear }}</p>
    </template>
  </BaseDrawer>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import CurrentTime from '@/components/CurrentTime.vue';
import CurrentWeather from '@/components/CurrentWeather.vue';
import BaseCard from '@/components/BaseCard.vue';
import { useWeatherStore } from '@/stores/weather';
import { storeToRefs } from 'pinia';
import ToDos from '../components/ToDos.vue';
import BaseLoader from '@/components/BaseLoader.vue';
import BaseDrawer from '@/components/BaseDrawer.vue';
import BaseButton from '../components/BaseButton.vue';
import { useDateFormat, useNow } from '@vueuse/core';

export default defineComponent({
  name: 'HomeView',
  components: {
    CurrentTime,
    CurrentWeather,
    BaseCard,
    ToDos,
    BaseLoader,
    BaseDrawer,
    BaseButton,
  },
  setup() {
    const weatherStore = useWeatherStore();
    const openDrawer = ref<boolean>(false);

    const yearFormat = ref<string>('YYYY');
    const currentYear = useDateFormat(useNow(), yearFormat);

    onBeforeMount(async () => {
      if (navigator.onLine) {
        navigator.geolocation.getCurrentPosition(async (position) => await weatherStore.hydrateStore(position.coords));
      }
    });

    const { isInitialized, isError } = storeToRefs(weatherStore);

    const toggleDrawer = () => {
      openDrawer.value = !openDrawer.value;
    };

    return {
      isInitialized,
      isError,
      openDrawer,
      toggleDrawer,
      currentYear,
    };
  },
});
</script>

<style lang="scss">
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  &-header {
    width: 100%;
    padding-bottom: 1rem;
    @media (min-width: 1300px) {
      display: grid;
      grid-template-columns:
        [logo] 1fr
        [time] 2fr
        [weather] 1fr;
      gap: 20px;
    }
  }

  .logo-zone {
    grid-area: logo;

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;

      color: var(--ebony-400);
    }

    h1 {
      font-size: 0.75rem;
      font-weight: 700;
    }
  }

  .current-time {
    grid-area: time;
  }

  .error-state {
    text-align: center;
    color: var(--contrast-color);
    p {
      font-size: 0.75rem;
    }
  }

  .corner-weather {
    grid-area: weather;
    .card {
      margin-top: 0;
      margin-bottom: 0;
      width: 272px;
      height: 124px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      @media (max-width: 500px) {
        width: 100%;
        border-radius: 0 0 4px 4px;
      }
      @media (max-width: 1299px) {
        margin-left: auto;
        margin-right: auto;
      }
      @media (min-width: 1300px) {
        margin-left: auto;
      }
      .card--body {
        display: flex;
        align-items: stretch;
        justify-content: center;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fadestay-enter-active,
.fadestay-leave-active {
  transition: opacity 100ms ease;
  position: absolute;
}

.fadestay-enter-from,
.fadestay-leave-to {
  opacity: 0;
}

.fadeweather-move,
.fadeweather-enter-active,
.fadeweather-leave-active {
  transition: all 0.375s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.fadeweather-enter-from,
.fadeweather-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.fadeweather-leave-active {
  position: absolute;
}
</style>
