<template>
  <BaseDrawer title="Dashboard" :is-open="open" @close="toggleDrawer()">
    <template v-slot:body class="about-app" tag="nav">
      <ul class="app-menu">
        <li>
          <RouterLink to="/">
            <span class="menu-block" @click="toggleDrawer()">
              <span class="material-icons-outlined"> task_alt </span> MyTodos
            </span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/about">
            <span class="menu-block" @click="toggleDrawer()">
              <span class="material-icons-outlined"> info </span> About
            </span>
          </RouterLink>
        </li>
      </ul>
    </template>
  </BaseDrawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseDrawer from '@/components/BaseDrawer.vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
  components: {
    BaseDrawer,
    RouterLink,
  },
  name: 'AppDrawer',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['toggle'],
  setup(props, { emit }) {
    const toggleDrawer = () => {
      emit('toggle');
    };

    return {
      toggleDrawer,
    };
  },
});
</script>

<style scoped lang="scss">
.app-menu {
  margin: 0 0.5rem;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 5px;

  a {
    font-size: 0.675rem;
    display: block;
    color: var(--ebony-200);
    text-decoration: none;
    border-radius: 4px;
    .menu-block {
      font-weight: 900;
      display: block;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0.5rem;

      .material-icons-outlined {
        color: var(--ebony-500);
      }
    }

    &.router-link-active {
      background-color: var(--card-bg-contrast);
      color: var(--ebony-200);
    }

    &:hover {
      background-color: var(--ebony-800);
      color: var(--ebony-200);
    }
  }
}
</style>
