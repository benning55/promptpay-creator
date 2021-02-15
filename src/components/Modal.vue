<template>
    <div class="backdrop" @click="closeModal">
        <div class="make-center">
            <div class="modal">
                <h1>Error!!</h1>
                <h3>{{ error }}</h3>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['error'],
    data() {
        return {
        }
    },
    methods: {
        closeModal() {
            this.$emit('close')
        }
    },
}
</script>

<style scoped>
    .modal {
        width: 80%;
        padding: 20px;
        margin: 0 auto;
        background: white;
        border-radius: 10px;
    }

    .modal h1, p {
        text-align: center;
        color: red;
    }

    .modal h3 {
        text-align: center;
    }

    .backdrop {
        top: 0;
        position: fixed;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
    }

    .make-center {
        display: flex;
        align-items: center;
        min-height: 100vh;
    }
    
</style>