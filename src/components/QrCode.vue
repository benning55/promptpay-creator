<template>
  <div>
    <h1 :class="[isGenerate ? 'space' : '']">{{ msg }}</h1>
    <div v-if="newOne" style="padding: 1rem 0">
      <div style="width: 50%; display: block; margin: auto;">
        <div v-html="value"></div>
      </div>
    </div>
    <div>
      <input class="form-input effect-9" v-model="phoneNumber" type="text" id="phone" name="phone" :disabled="phoneUse == 1"
        placeholder="Phone Number" /><br><br>
    </div>
    <div>
      <input class="form-input" v-model="idCard" type="text" id="idcard" name="idcard" :disabled="idCardUse == 1"
        placeholder="ID Card Number" /><br><br>
    </div>
    <div>
      <input class="form-input" v-model="amount" type="number" id="amount" name="amount" placeholder="Amount (Bath)" />
    </div>

    <div style="margin-top: 2rem"></div>

    <div class="btn-adj">
      <div class="btn-create" @click="createQr">
        <p class="btn-text">Generate QR</p>
      </div>
    </div>

    <div style="margin-top: 10%;"></div>
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
        msg: "QR Generator.",
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
    components: {},
    methods: {
      createQr() {
        const amount = parseFloat(this.amount)
        if (this.phoneNumber === "" && this.idCard === "") {
          this.$emit("dataError", "Please enter either Phone or ID")
        } else if (this.phoneNumber !== "" && this.phoneNumber.length !== 10) {
          this.$emit("dataError", "Phone need to be 10 char")
        } else if (this.idCard !== "" && this.idCard.length !== 13) {
          this.$emit("dataError", "ID Card need to be 13 char")
        } else {
          const payload = (this.phoneNumber === "") ? generatePayload(this.idCard, {
            amount
          }) : generatePayload(this.phoneNumber, {
            amount
          })

          const options = {
            type: 'svg',
            color: {
              dark: '#000',
              light: '#fff'
            }
          }
          qrcode.toString(payload, options, (err, svg) => {
            if (err) return console.log(err)
            this.value = svg
          })
          this.isGenerate = true
          this.newOne = true
        }
      }
    },
    watch: {
      phoneNumber: function (val) {
        if (val != "") {
          this.idCardUse = 1
          this.newOne = false
          this.isGenerate = false
        } else {
          this.idCardUse = 0
        }
      },
      idCard: function (val) {
        if (val != "") {
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

  .btn-create {
    padding: 10% 5%;
    border-radius: 100px;
    background-color: white;
  }

  .btn-create:hover {
    opacity: 0.5;
  }

  .btn-adj {
    width: 60%;
    margin: 0 auto;
  }

  .btn-text {
    margin: 0;
    font-size: 1.5rem;
    color: rgb(72, 70, 70);
    font-weight: 900;
  }

  .form-input {
    color: #333;
    font-size: 1.2rem;
    margin: 0 auto;
    padding: 1rem 2rem;
    border-radius: 100px;
    border: none;
    width: 90%;
    display: block;
    border-bottom: 0.3rem solid transparent;
    transition: all 0.3s;
    z-index: -5;
  }

  /* .form-input{
    color: #333;
    font-size: 1.2rem;
    margin: 0 auto;
    padding: 1rem 2rem;
    border-radius: 0.2rem;
    background-color: rgb(255, 255, 255);
    border: none;
    width: 90%;
    display: block;
    border-bottom: 0.3rem solid transparent;
    transition: all 0.3s;
  } */
</style>