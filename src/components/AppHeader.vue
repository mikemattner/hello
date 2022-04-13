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
        color: var(--sky-500);
      }
    }

    &-title {
      font-size: 0.675rem;
      font-weight: 900;
    }
  }
}
</style>
