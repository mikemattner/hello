<template>
  <main class="about">
    <div class="container">
      <h1>
        <small><span class="material-icons-outlined logo-icon"> task_alt </span> About This</small> Todo App
      </h1>
      <p>
        This is my personal dashboard with time, local weather conditions, and a simple todo board. Built with Vue 3 and
        far too many commits.
      </p>
      <p>I have future plans to implement:</p>
      <ul>
        <li>Card deletion guards</li>
        <li>Authentication</li>
        <li>Saving tasks somewhere other than local storage</li>
        <li>Dark/light mode toggles</li>
        <li>Another view containing a list of tools I find to be useful</li>
      </ul>
      <p>Consider the above a check list of sorts.</p>
      <dl>
        <dt>GitHub Repo</dt>
        <dd><a href="https://github.com/mikemattner/hello">https://github.com/mikemattner/hello</a></dd>
        <dt>Author</dt>
        <dd><a href="https://mikemattner.com">Mike Mattner</a></dd>
      </dl>
      <h2>Why build this?</h2>
      <p>
        Another Todo app &hellip; I know. The idea here was to learn Vue 3 a little more in-depth, update the initial
        dashboard app I created, and properly connect to the weather API using Netlify functions.
      </p>
      <p>Feel free to fork this and use it yourself for learning purposes.</p>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'AboutView',
});
</script>

<style lang="scss">
.about {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2rem 20px 4rem;

  .container {
    max-width: 650px;
    padding: 1.5rem 20px 0;
  }
}
</style>
