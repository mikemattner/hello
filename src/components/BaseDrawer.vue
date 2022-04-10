<template>
  <Teleport to="body">
    <Transition name="drawer" mode="out-in">
      <div v-if="isOpen" class="drawer-overlay">
        <UseFocusTrap v-if="isOpen" class="drawer-focus">
          <div
            class="drawer-container slide-right"
            role="dialog"
            ref="drawer"
            aria-drawer="true"
            aria-labelledby="drawer-title"
            aria-describedby="drawer-description"
          >
            <div class="drawer-header">
              <div v-if="title" class="drawer-header-title" id="drawer-title">
                {{ title }}
              </div>
              <BaseButton @click="close()">
                <span class="visually-hidden">Close</span>
                <span class="material-icons-outlined">close</span>
              </BaseButton>
            </div>
            <div class="drawer-body" id="drawer-description">
              <slot name="body"></slot>
            </div>
          </div>
        </UseFocusTrap>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import { onClickOutside } from '@vueuse/core';
import { UseFocusTrap } from '@vueuse/integrations/useFocusTrap/component';

export default defineComponent({
  components: {
    BaseButton,
    UseFocusTrap,
  },
  name: 'BaseDrawer',
  props: {
    title: {
      type: String,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  setup(props, { emit, slots }) {
    const hasSlot = (name: string) => {
      return !!slots[name];
    };

    const close = () => {
      emit('close');
    };

    const drawer = ref();
    onClickOutside(drawer, () => close());

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    onMounted(() => {
      document.addEventListener('keydown', handleEscape);
    });

    onUnmounted(() => {
      document.removeEventListener('keydown', handleEscape);
    });

    return {
      close,
      hasSlot,
      drawer,
    };
  },
});
</script>

<style scoped lang="scss">
.drawer-overlay {
  background-color: rgba(#111727, 0.75);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  transition: opacity 0.3s ease;

  .drawer-focus {
    height: 100%;
  }

  .drawer-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    max-width: 500px;
    height: 100%;
    border-radius: 4px 0 0 4px;
    background-color: var(--card-bg);
    box-shadow: 2px 10px 20px var(--card-shadow);

    .drawer-header {
      font-size: 1rem;
      text-align: center;
      padding: 1rem;
      background-color: rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-title {
        font-weight: 900;
      }
    }
    .drawer-body {
      padding: 1.25rem 1rem;
      font-size: 0.75rem;
    }
    .drawer-footer {
      display: flex;
      padding: 1rem;
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.25s ease;
}

.drawer-enter,
.drawer-leave-active {
  opacity: 0;
}
</style>
