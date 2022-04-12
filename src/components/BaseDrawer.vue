<template>
  <Teleport to="body">
    <div :class="['drawer-overlay', { active: isOpen }]">
      <div
        :class="['drawer-container', { active: isOpen }]"
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
          <BaseButton @click="close()" simple-button>
            <span class="visually-hidden">Close</span>
            <span class="material-icons-outlined">close</span>
          </BaseButton>
        </div>
        <div class="drawer-body" id="drawer-description">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import { onClickOutside } from '@vueuse/core';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

export default defineComponent({
  components: {
    BaseButton,
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
    const drawer = ref();

    onClickOutside(drawer, () => {
      if (props.isOpen) {
        close();
      }
    });

    const { activate, deactivate } = useFocusTrap(drawer);

    watch(
      () => props.isOpen,
      (value) => {
        if (value) {
          setTimeout(() => {
            activate();
          }, 250);
        } else {
          deactivate();
        }
      },
    );

    const hasSlot = (name: string) => {
      return !!slots[name];
    };

    const close = () => {
      emit('close');
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && props.isOpen) {
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
  background-color: rgba(#0f172a, 0.75);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1001;
  transition: opacity 0.25s ease;
  opacity: 0;
  visibility: hidden;

  &.active {
    opacity: 1;
    visibility: visible;
  }

  .drawer-focus {
    height: 100%;
  }

  .drawer-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    max-width: 300px;
    height: 100%;
    border-radius: 4px 0 0 4px;
    background-color: var(--card-bg);
    box-shadow: 2px 10px 20px var(--card-shadow);
    transform: translateX(-50px);
    transition: all 0.375s ease;

    &.active {
      transform: translateX(0);
    }

    .drawer-header {
      font-size: 0.75rem;
      text-align: center;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-title {
        font-size: 0.675rem;
        font-weight: 900;
      }
    }
    .drawer-body {
      padding: 1rem 0;
      font-size: 0.75rem;
    }
    .drawer-footer {
      display: flex;
      padding: 1rem;
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
