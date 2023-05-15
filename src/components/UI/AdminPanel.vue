<template>
    <div class="admin-panel">
        <my-button class="panel-button" @click="toCreate()">Создание документа</my-button>
        <my-button class="panel-button" @click="toRegister()">Регистрация пользователя</my-button>
        <my-button class="panel-button">Создание шаблона</my-button>
        <my-button class="panel-button">Редактирование иерархии</my-button>
        <my-button class="panel-button">Реестр документов</my-button>
        <my-button class="panel-button">Реестр приложений</my-button>
        <my-button class="panel-button">Реестр шаблонов</my-button>
    </div>
</template>

<script>
export default {
    name: "admin-panel",
    methods: {
        toCreate() {
            this.$router.push("/admin/create")
        },
        toRegister() {
            this.$router.push("/admin/register")
        },
    }
}
</script>
<style scoped>
.admin-panel {
    display: flex;
    flex-direction: column;
    width: 250px;
    margin: 5px;
    border-right: 1px solid black;
}

.panel-button {
    margin: 5px;
}
</style>