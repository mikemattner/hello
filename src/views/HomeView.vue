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
          <span class="todo-count start">{{ getReadyTodos.tasks.length }}</span>
          <span class="todo-count-label">Ready</span>
        </div>
        <div class="todo-counter">
          <span class="todo-count progress">{{ getInProgressTodos.tasks.length }}</span>
          <span class="todo-count-label">In Progress</span>
        </div>
        <div class="todo-counter">
          <span class="todo-count done">{{ getDoneTodos.tasks.length }}</span>
          <span class="todo-count-label">Done</span>
        </div>
        <div class="todo-counter">
          <span class="todo-count total">{{ getTotalCount }}</span>
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
    const { getInProgressTodos, getDoneTodos, getReadyTodos, getTotalCount } = storeToRefs(todoStore);

    return {
      isInitialized,
      isError,
      getInProgressTodos,
      getDoneTodos,
      getReadyTodos,
      getTotalCount,
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
      padding: 0.5rem 1rem;
      display: flex;
      align-items: center;
      gap: 10px;

      .todo-count {
        aspect-ratio: 1;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.675rem;

        &.progress {
          background-color: var(--jaffa-400);
          color: var(--jaffa-900);
        }
        &.start {
          background-color: var(--carnation-400);
          color: var(--carnation-900);
        }
        &.done {
          background-color: var(--ocean-green-400);
          color: var(--ocean-green-900);
        }
        &.total {
          background-color: var(--slate-400);
          color: var(--slate-900);
        }
      }
      .todo-count-label {
        font-size: 0.675rem;
        font-weight: 700;
      }
    }
  }

  .error-state {
    text-align: center;
    color: var(--contrast-color);
    p {
      font-size: 0.75rem;
      margin: 0;
    }
  }
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
