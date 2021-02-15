<template>
  <div id="app">
    <div v-show="showModal">
      <Modal :error="errorData" :state="showModal" @close="toggleModal">
      </Modal>
    </div>
    <div style="width: 100%;">
        <img style="width: 100%;" alt="Vue logo" src="./assets/logo.png">
    </div>
    <div class="container">
      <QR @dataError="setError"></QR>
    </div>
  </div>
</template>

<script>
  import QR from './components/QrCode'
  import Modal from './components/Modal'

  export default {
    name: 'App',
    components: {
      QR,
      Modal
    },
    created() {
      if(this.$workbox) {
        this.$workbox.addEventListener("waiting", () => {
          this.showUpgradeUI = true
        })
      }
    },
    data() {
      return {
        showModal: false,
        errorData: ""
      }
    },
    methods: {
      toggleModal() {
        this.showModal = !this.showModal
      },
      setError(value) {
        this.errorData = value
        this.toggleModal()
      },
      async accept() {
        this.showUpgradeUI = false
        await this.$workbox.messageSW({ type: "SKIP_WAITING" });
      }
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