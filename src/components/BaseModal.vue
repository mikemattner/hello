<template>
  <Teleport to="body">
    <Transition name="modal" mode="out-in">
      <div v-if="isOpen" class="modal-overlay">
        <UseFocusTrap v-if="isOpen">
          <div
            class="modal-container slide-up"
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
              <BaseButton @click="close()">
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
    onClickOutside(modal, () => close());

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
      modal,
    };
  },
});
</script>

<style scoped lang="scss">
.modal-overlay {
  background-color: rgba(#111727, 0.75);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  transition: opacity 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-container {
    width: 500px;
    border-radius: 4px;
    background-color: var(--card-bg);
    box-shadow: 2px 10px 20px var(--card-shadow);

    .modal-header {
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
