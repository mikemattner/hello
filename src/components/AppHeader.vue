<template>
  <div class="navbar">
    <div class="logo">
      <BaseButton @click="toggleDrawer()" button-type="tertiary">
        <span class="material-icons-outlined"> more_vert </span>
      </BaseButton>
      <BaseButton to="/" button-type="tertiary">
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
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #0d1321;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

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
      font-weight: 900;
    }
  }
}
</style>
