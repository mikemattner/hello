<template>
  <main class="about">
    <div class="container">
      <h1>About This App</h1>
      <p>
        Personal dashboard with time, local weather conditions, and a simple todo board. Built with Vue 3 and far too
        many commits.
      </p>
      <h2>Why build this?</h2>
      <p>
        Another Todo app &hellip; I know. The idea here was to learn Vue 3 a little more in-depth, update the initial
        dashboard app I created, and properly connect to the weather API using Netlify functions.
      </p>
      <dl>
        <dt>GitHub Repo</dt>
        <dd><a href="https://github.com/mikemattner/hello">https://github.com/mikemattner/hello</a></dd>
        <dt>Credits</dt>
        <dd><a href="https://mikemattner.com">Mike Mattner</a></dd>
      </dl>
      <p>&copy; {{ currentYear }}</p>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useDateFormat, useNow } from '@vueuse/core';

export default defineComponent({
  name: 'AboutView',
  setup() {
    const yearFormat = ref<string>('YYYY');
    const currentYear = useDateFormat(useNow(), yearFormat);

    return {
      currentYear,
    };
  },
});
</script>

<style lang="scss">
.about {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1rem 20px;
  font-size: 0.75rem;

  .container {
    max-width: 650px;
    padding: 1.5rem 20px 0;
  }
}
</style>
