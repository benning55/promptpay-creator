<template>
  <div>
      <h1 :class="[isGenerate ? 'space' : '']">{{ msg }}</h1>
      <div v-if="newOne" style="padding: 1rem 0">
          <div style="width: 50%; display: block; margin: auto;"><div v-html="value"></div></div>
      </div>
      <div>
        <label for="phone">Phone Number:</label><br>
        <input v-model="phoneNumber" type="text" id="phone" name="phone" :disabled="phoneUse == 1" placeholder="000-000-0000"/><br><br>
      </div>
      <div>
        <label for="idcard">ID Card Number:</label><br>
        <input v-model="idCard" type="text" id="idcard" name="idcard" :disabled="idCardUse == 1" placeholder="0-0000-00000-00-0"/><br><br>
      </div>
      <div>
        <label for="amount">Amount (Bath):</label><br>
        <input v-model="amount" type="number" id="amount" name="amount"  placeholder="4.25"/>
      </div>
      <h1>{{ phoneValidate }}</h1>

      <div class="btn-adj">
        <div class="btn-create" @click="createQr">
          <p class="btn-text">Generate QR</p>
        </div>
      </div>

      <div style="margin-top: 5%;"></div>
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
          phoneValidate: "",
          isGenerate: false
      }
  },
  components: {
  },
  methods: {
    createQr() {
          const amount = parseFloat(this.amount)
          const payload = (this.phoneNumber === "") ? generatePayload(this.idCard, { amount }) : generatePayload(this.phoneNumber, { amount })
          
          const options = { type: 'svg', color: { dark: '#000', light: '#fff' } }
          qrcode.toString(payload, options, (err, svg) => {
            if (err) return console.log(err)
            this.value = svg
          })
          this.isGenerate = true
          this.newOne = true
      }
  },
  watch: {
      phoneNumber: function(val) {
          if(val != "") {
              this.idCardUse = 1
              this.newOne = false
              this.isGenerate = false
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
.space {
  margin: 0;
}
.btn-create{
  padding: 10% 5%;
  border-radius: 100px;
  background-color: white;
}
.btn-create:hover{
  opacity: 0.5;
}
.btn-adj {
  width: 50%;
  margin: 0 auto;
}
.btn-text {
  margin: 0;
}
</style>
