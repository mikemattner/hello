<template>
  <Teleport to="body">
    <div :class="['modal-overlay', { active: isOpen }]">
      <div
        :class="['modal-container', { active: isOpen }]"
        role="dialog"
        ref="modal"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div class="modal-header">
          <div class="modal-header-title" id="modal-title">
            {{ title }}
          </div>
          <BaseButton @click="close()" button-type="tertiary">
            <span class="visually-hidden">Close</span>
            <span class="material-icons-outlined">close</span>
          </BaseButton>
        </div>
        <div class="modal-body" id="modal-description">
          <slot name="body"></slot>
        </div>
        <div v-if="hasSlot('footer')" class="modal-footer">
          <slot name="footer"></slot>
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
  name: 'BaseModal',
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

    const modal = ref();
    onClickOutside(modal, () => {
      if (props.isOpen) {
        close();
      }
    });
    const { activate, deactivate } = useFocusTrap(modal);

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
      modal,
    };
  },
});
</script>

<style scoped lang="scss">
.modal-overlay {
  background-color: rgba(#000, 0.75);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.375s ease;
  opacity: 0;
  visibility: hidden;

  &.active {
    opacity: 1;
    visibility: visible;
  }
  .modal-container {
    width: 500px;
    border-radius: 4px;
    background-color: var(--card-bg);
    box-shadow: 2px 10px 20px var(--card-shadow);
    opacity: 0;
    transform: translate(0, 50px);
    transition: all 0.375s 0s cubic-bezier(0.68, -0.55, 0.265, 1.55);

    &.active {
      opacity: 1;
      transform: translate(0, 0);
      transition: all 0.375s 0.125s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .modal-header {
      font-size: 1rem;
      text-align: center;
      padding: 1rem;
      background-color: rgba(0, 0, 0, 0.25);
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-title {
        font-weight: 900;
      }
    }
    .modal-body {
      padding: 1.25rem 1rem;
    }
    .modal-footer {
      display: flex;
      padding: 1rem;
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter,
.modal-leave-active {
  opacity: 0;
}
</style>
