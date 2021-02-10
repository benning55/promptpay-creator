<template>
  <div>
      <h1>{{ msg }}</h1>
      <div>
        <label for="phone">Phone Number:</label><br>
        <input v-model="phoneNumber" type="text" id="phone" name="phone" :disabled="phoneUse == 1" placeholder="000-000-0000"/><br><br>
      </div>
      <label for="idcard">ID Card Number:</label><br>
      <input v-model="idCard" type="text" id="idcard" name="idcard" :disabled="idCardUse == 1" placeholder="0-0000-00000-00-0"/><br><br>
      <label for="amount">Amount (Bath):</label><br>
      <input v-model="amount" type="number" id="amount" name="amount"  placeholder="4.25"/>
      <h1>{{ phoneValidate }}</h1>
      <h1>{{ idCard }}</h1>
      <h1>{{ phoneCount }}</h1>
      <button @click="createQr" type="submit">Generate QR</button>
      <!-- <QrcodeVue :value="value" :size="size" level="H" /> -->
      <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41" shape-rendering="crispEdges"><path fill="#ffffff" d="M0 0h41v41H0z"/><path stroke="#000000" d="M4 4.5h7m1 0h4m4 0h4m1 0h1m2 0h1m1 0h7M4 5.5h1m5 0h1m2 0h4m4 0h1m2 0h2m2 0h1m1 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m2 0h2m1 0h2m1 0h2m2 0h1m1 0h1m1 0h1m2 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m1 0h5m1 0h2m1 0h2m1 0h2m1 0h1m2 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m1 0h1m1 0h2m1 0h2m2 0h4m3 0h1m1 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m1 0h1m1 0h1m2 0h1m2 0h4m3 0h1m2 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M12 11.5h2m1 0h3m1 0h3m3 0h2M4 12.5h1m3 0h1m1 0h6m2 0h1m2 0h1m1 0h1m5 0h5m2 0h1M6 13.5h2m1 0h1m1 0h1m1 0h1m1 0h4m4 0h1m4 0h1m2 0h2m1 0h3M5 14.5h1m1 0h1m1 0h2m1 0h5m3 0h2m1 0h1m1 0h2m2 0h1m1 0h1m2 0h2M6 15.5h1m8 0h2m1 0h6m1 0h1m1 0h1m3 0h1m1 0h1M4 16.5h5m1 0h4m1 0h1m1 0h3m2 0h5m1 0h3m4 0h1M4 17.5h1m1 0h1m5 0h2m3 0h1m2 0h1m2 0h1m5 0h2m4 0h2M8 18.5h3m3 0h2m2 0h1m1 0h4m1 0h3m3 0h2M4 19.5h1m1 0h2m4 0h7m4 0h5m3 0h2M4 20.5h3m1 0h4m1 0h1m1 0h5m1 0h1m2 0h2m1 0h1m1 0h1m1 0h1m1 0h1m1 0h2M4 21.5h1m1 0h2m1 0h1m1 0h1m2 0h3m4 0h1m1 0h3m2 0h4m1 0h3M4 22.5h1m1 0h1m1 0h4m2 0h3m3 0h1m1 0h1m1 0h1m2 0h1m2 0h2m1 0h1m1 0h2M4 23.5h3m4 0h2m3 0h1m2 0h1m3 0h4m2 0h5M5 24.5h2m3 0h1m2 0h2m1 0h1m2 0h2m5 0h2m3 0h1m2 0h3M4 25.5h5m2 0h2m1 0h1m2 0h1m4 0h5m1 0h2m5 0h2M6 26.5h3m1 0h2m2 0h3m2 0h1m1 0h1m2 0h1m1 0h2m3 0h3M6 27.5h1m5 0h1m4 0h4m1 0h1m2 0h3m1 0h1m2 0h1m2 0h1M4 28.5h3m3 0h3m3 0h3m1 0h1m1 0h3m1 0h1m1 0h6m2 0h1M12 29.5h1m1 0h3m1 0h3m1 0h1m2 0h2m1 0h1m3 0h1m2 0h2M4 30.5h7m1 0h3m1 0h2m2 0h2m3 0h4m1 0h1m1 0h4M4 31.5h1m5 0h1m6 0h3m1 0h2m2 0h2m1 0h1m3 0h2M4 32.5h1m1 0h3m1 0h1m1 0h2m2 0h1m5 0h1m1 0h1m3 0h6m1 0h1M4 33.5h1m1 0h3m1 0h1m6 0h2m1 0h2m1 0h1m4 0h4m2 0h3M4 34.5h1m1 0h3m1 0h1m3 0h3m1 0h1m1 0h1m2 0h1m1 0h3m3 0h2M4 35.5h1m5 0h1m6 0h2m4 0h5m1 0h2m1 0h4M4 36.5h7m1 0h1m1 0h1m4 0h2m1 0h1m1 0h2m1 0h5m2 0h3"/></svg> -->
      <div v-if="newOne" style="padding-top: 2rem">
          <div style="width: 50%; display: block; margin: auto;"><div v-html="value"></div></div>
      </div>
  </div>
</template>

<script>
const generatePayload = require('promptpay-qr')
const qrcode = require('qrcode')
const fs = require('fs')
export default {
  name: 'QR',
  data() {
      return {
          msg: "Promptpay Generator Service.",
          phoneNumber: "",
          phoneUse: 0,
          idCardUse: 0,
          idCard: "",
          amount: null,
          value: "",
          size: 300,
          newOne: false,
          phoneCount: 0,
          phoneValidate: ""
      }
  },
  components: {
  },
  methods: {
    createQr() {
          const amount = parseFloat(this.amount)
          const payload = generatePayload(this.phoneNumber, { amount })
          console.log(payload)

          const options = { type: 'svg', color: { dark: '#000', light: '#fff' } }
          qrcode.toString(payload, options, (err, svg) => {
            if (err) return console.log(err)
            this.value = svg
            console.log(this.value)
          })
          this.newOne = true
      }
  },
  watch: {
      phoneNumber: function(val) {
          if(val != "") {
              this.idCardUse = 1
              this.newOne = false
              let sizes = val.length
              if(val.length === 4 || val.length === 7){
                  this.phoneValidate += "-"
                  this.phoneValidate += this.phoneNumber[sizes-1]
              }else {
                  this.phoneValidate += this.phoneNumber[sizes-1]
              }
              console.log(this.phoneValidate)
              this.phoneCount = val.length
          }else {
              this.idCardUse = 0
          }
      },
      idCard: function(val){
          if(val != "") {
              this.phoneUse = 1
              this.newOne = false
          } else {
              this.phoneUse = 0
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
