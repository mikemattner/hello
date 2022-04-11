<template>
  <div class="navbar">
    <div class="logo">
      <BaseButton @click="toggleDrawer()" simple-button>
        <span class="material-icons-outlined"> more_vert </span>
      </BaseButton>
      <BaseButton to="/" simple-button>
        <span class="material-icons-outlined"> task_alt </span>
        <span class="logo-title">MyTodos</span>
      </BaseButton>
    </div>
  </div>

  <AppDrawer :open="openDrawer" @toggle="toggleDrawer()" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BaseButton from './BaseButton.vue';
import AppDrawer from './AppDrawer.vue';

export default defineComponent({
  name: 'AppHeader',
  components: {
    BaseButton,
    AppDrawer,
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
  background-color: var(--background-color);
  // z-index: 1000;
  // position: fixed;
  // top: 0;
  // right: 0;
  // left: 0;
  .logo {
    display: flex;
    align-items: center;
    gap: 10px;

    .material-icons-outlined {
      font-size: 1rem;
    }

    &-title {
      font-size: 0.5rem;
      font-weight: 700;
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
