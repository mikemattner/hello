<template>
  <main class="home">
    <div class="home-grid">
      <div class="home-col main-content">
        <ToDos />
      </div>
      <div class="home-col sidebar">
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
        <div class="todo-counter">
          <span class="todo-count">{{ getTodos.length }}</span>
          <span class="todo-count-label">Todos to Start</span>
        </div>
        <div class="todo-counter">
          <span class="todo-count">{{ getInProgressTodos.length }}</span>
          <span class="todo-count-label">Todos in Progress</span>
        </div>
        <div class="todo-counter">
          <span class="todo-count">{{ todoCount }}</span>
          <span class="todo-count-label">Total Todos</span>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import ToDos from '../components/ToDos.vue';
import CurrentTime from '@/components/CurrentTime.vue';
import CurrentWeather from '@/components/CurrentWeather.vue';
import BaseCard from '@/components/BaseCard.vue';
import { useWeatherStore } from '@/stores/weather';
import { storeToRefs } from 'pinia';
import BaseLoader from '@/components/BaseLoader.vue';
import CurrentGreeting from '../components/CurrentGreeting.vue';
import { useTodoStore } from '@/stores/todos';

export default defineComponent({
  name: 'HomeView',
  components: {
    CurrentTime,
    CurrentWeather,
    BaseCard,
    ToDos,
    BaseLoader,
    CurrentGreeting,
  },
  setup() {
    const weatherStore = useWeatherStore();
    const { isInitialized, isError } = storeToRefs(weatherStore);

    const todoStore = useTodoStore();
    const { getTodos, getInProgressTodos } = storeToRefs(todoStore);

    const todoCount = computed<number>(() => {
      const todoCount = getTodos.value.length;
      const inProgressCount = getInProgressTodos.value.length;
      return todoCount + inProgressCount;
    });

    return {
      isInitialized,
      isError,
      todoCount,
      getTodos,
      getInProgressTodos,
    };
  },
});
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  padding: 20px;

  .home-grid {
    @media (min-width: 1200px) {
      display: grid;
      grid-template-columns:
        [main] 1fr
        [sidebar] 272px;
      gap: 0 20px;
    }
  }

  .main-content {
    grid-area: main;
  }

  .sidebar {
    grid-area: sidebar;
    gap: 20px;

    .card {
      margin: 0 0 10px;
      width: 272px;
      height: 124px;
      .card--body {
        height: 100%;
      }

      @media (max-width: 1022px) {
        width: 100%;
      }
    }

    .todo-counter {
      background-color: var(--card-bg-contrast);
      border-radius: 4px;
      margin: 0 0 10px;
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 10px;

      .todo-count {
        aspect-ratio: 1;
        border-radius: 20px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--card-bg);
        font-weight: 700;
        font-size: 0.75rem;
        color: var(--carnation-400);
      }
      .todo-count-label {
        font-size: 0.75rem;
      }
    }
  }

  .error-state {
    text-align: center;
    color: var(--contrast-color);
    p {
      font-size: 0.75rem;
    }
  }
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
