<template>
    <textarea name="textarea" id="" cols="30" rows="10" :value="modelValue" @input="updateInput" class="input"></textarea>
</template>

<script>
export default {
    name: 'my-textarea',
    props: {
        modelValue: [String, Number]
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>

<style scoped>
.input {
    width: 100%;
    border: 1px solid black;
    padding: 10px 15px;
    margin: 5px 0;
    outline: none;
}
</style>