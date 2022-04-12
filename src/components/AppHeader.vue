<template>
  <div class="navbar">
    <div class="logo">
      <BaseButton @click="toggleDrawer()" simple-button>
        <span class="material-icons-outlined"> more_vert </span>
      </BaseButton>
      <BaseButton to="/" simple-button>
        <span class="material-icons-outlined logo-icon"> task_alt </span>
        <span class="logo-title">MyTodos</span>
      </BaseButton>
    </div>
    <CurrentTime />
  </div>

  <AppDrawer :open="openDrawer" @toggle="toggleDrawer()" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BaseButton from './BaseButton.vue';
import AppDrawer from './AppDrawer.vue';
import CurrentTime from './CurrentTime.vue';

export default defineComponent({
  name: 'AppHeader',
  components: {
    BaseButton,
    AppDrawer,
    CurrentTime,
  },
  setup() {
    const openDrawer = ref<boolean>(false);
    const toggleDrawer = () => {
      openDrawer.value = !openDrawer.value;
    };

    return {
      openDrawer,
      toggleDrawer,
    };
  },
});
</script>

<style lang="scss">
.navbar {
  width: 100%;
  padding: 0.25rem 1rem;
  border-bottom: 1px solid rgba(#263966, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--background-color);
  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-grow: 1;

    .material-icons-outlined {
      font-size: 1rem;

      &.logo-icon {
        color: var(--ebony-500);
      }
    }

    &-title {
      font-size: 0.675rem;
      font-weight: 900;
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
