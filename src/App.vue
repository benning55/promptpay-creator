<template>
  <div id="app">
    <div class="container">
      <div style="width: 100%; margin-top: 3rem;">
        <img style="width: 100%;" alt="Vue logo" src="./assets/logo.png">
      </div>
      <QR/>
    </div>
  </div>
</template>

<script>
import QR from './components/QrCode'

export default {
  name: 'App',
  components: {
    QR
  }
}
</script>

<style>

/* *, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
} */

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
