<template>
    <div>
        <form @submit.prevent>
            <h4>Создать документ</h4>
            <!-- Двустороннее связаные без v-model
            v-bind:value="document.title" 
            @input="document.title = $event.target.value" 
         -->
            <div class="inputForm">
                <my-input class="input" v-model="document.code" type="text" placeholder="Обозначение" />
                <my-input class="input" v-model="document.title" type="text" placeholder="Название" />
            </div>
            <my-button @click="createDocument">Создать</my-button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            document: {
                code: '',
                title: ''
            }
        }
    },
    methods: {
        createDocument() {
            this.document.id = Date.now;
            this.$emit('create', this.document);
            this.document = {
                code: '',
                title: ''
            }
        }
    }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}

.inputForm {
    margin: 10px 0;
}



/* .btn {
    padding: 10px 15px;
    background: none;
    color: black;
    border: 1px solid black;
    margin-top: 15px;
} */
</style>