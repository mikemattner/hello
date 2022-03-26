<template>
    <div class="todo-list-container">
        <div class="todo-form">
            <form @submit.prevent="addTodo()">
                <div class="input-text-field">
                    <label class="input-text-field__label" for="todoInput">What are you doing today?</label>
                    <div class="">
                        <input
                            v-model="newTodo"
                            name="newTodo"
                            autocomplete="off"
                            class="input-text-field__input"
                            id="todoInput"
                        >
                    </div>
                </div>
            </form>
        </div>
        <TransitionGroup name="list" class="todo-list" tag="div">
            <div class="todo-list__item" v-for="(todo, index) in todos" :key="`todo-${index}`">
                <div :class="['todo-list__item-content', { done: todo.done }]" @click="doneTodo(todo)">
                    <div class="checkmark"></div>
                    <div>{{ todo.content }}</div>
                </div>
                <BaseButton @clicked="removeTodo(index)">
                    <CloseIcon />
                </BaseButton>
            </div>
        </TransitionGroup>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { ToDo } from '@/types/types';
import BaseCard from './BaseCard.vue';
import CloseIcon from './CloseIcon.vue';
import BaseButton from './BaseButton.vue';

export default defineComponent({
    name: 'ToDos',
    setup() {
        const newTodo = ref('');
        const localToDos = localStorage.getItem('mike-todos');
        let todosData: ToDo[] = [];
        if (localToDos) {
            todosData = JSON.parse(localToDos);
        }
        const todos = ref(todosData);
        function addTodo() {
            if (newTodo.value) {
                todos.value.push({
                    done: false,
                    content: newTodo.value
                });
                newTodo.value = "";
            }
            saveData();
        }
        function doneTodo(todo: ToDo) {
            todo.done = !todo.done;
            saveData();
        }
        function removeTodo(index: number) {
            todos.value.splice(index, 1);
            saveData();
        }
        function saveData() {
            const storageData = JSON.stringify(todos.value);
            localStorage.setItem('mike-todos', storageData);
        }
        return {
            todos,
            newTodo,
            addTodo,
            doneTodo,
            removeTodo,
            saveData
        };
    },
    components: { BaseCard, CloseIcon, BaseButton }
});
</script>

<style lang="scss" scoped>
.todo-list-container {
    margin-top: 4rem;
    // padding: 1rem;
    // border-radius: 4px;
    // background-color: var(--card-bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    max-width: 600px;

    .todo-form {
        text-align: center;
        max-width: 350px;
    }

    .todo-list {
        width: 100%;
        position: relative;
        // border-top: 1px solid var(--input-color);
        // border-bottom: 1px solid var(--input-color);

        &__item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 10px;
            padding: 1rem;
            border-radius: 4px;
            background-color: var(--card-bg);
            margin: 0.375rem 0;
            width: 100%;
            // border-bottom: 1px solid var(--input-color);

            &:last-child {
                border-bottom: none;
            }

            &-content {
                display: flex;
                align-items: center;
                transition: all 0.25s ease-in-out;

                .checkmark {
                    height: 25px;
                    width: 25px;
                    flex-grow: 0;
                    border: 1px solid var(--input-bg-color);
                    border-radius: 50%;
                    margin-right: 15px;
                    opacity: 0.5;
                    transition: all 0.25s ease-in-out;
                    
                    &:after {
                        content: "";
                        position: absolute;
                        opacity: 0;
                        transition: all 0.25s ease-in-out;
                        left: 9px;
                        top: 4px;
                        width: 6px;
                        height: 13px;
                        border: solid var(--input-bg-color);
                        border-width: 0 1px 1px 0;
                        transform: rotate(45deg);
                    }
                }

                &:hover {
                    cursor: pointer;

                    .checkmark {
                        opacity: 1;
                    }
                }

                &:after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 36px;
                    right: 100%;
                    height: 2px;
                    background-color: var(--color);
                    opacity: 0;
                    transition: all 0.25s ease-in-out;
                }

                &.done {
                    &:after {
                        opacity: 1;
                        right: -4px;
                    }

                    .checkmark {
                        opacity: 1;
                        &:after {
                            opacity: 1;
                        }
                    }
                }
            }
        }
        
        .empty-label {
            padding: 20px 10px;
            text-align: center;
        }
    }
}
.input-text-field {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding-bottom: 0.5rem;
  position: relative;

  &__label {
    text-align: center;
    padding-bottom: 0.125rem;
    opacity: 0.5;
    transition: all 0.25s ease-in-out;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
  }

  &__input {
    border: none;
    border-bottom: 2px solid var(--input-bg-color);
    background: none;
    color: var(--color);
    font-weight: 300;
    font-size: 1rem;
    padding: 0.5rem;
    text-align: center;
    -webkit-appearance: none;
    outline: none;
    transition: all 0.25s ease-in-out;
    opacity: 0.5;

    &:hover {
      border-color: var(--input-focus);
    }
    &:focus {
      border-color: var(--input-focus);
    }
  }

  &:focus-within {
        .input-text-field__label,
        .input-text-field__input {
            opacity: 1;
        }

        .input-text-field__label {
            left: 50%;
            transform: translateX(-50%) translateY(-100%);
            font-size: 0.675rem;
            font-weight: 700;
        }
  }
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>