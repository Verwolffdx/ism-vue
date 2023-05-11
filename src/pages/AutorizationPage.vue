<template>
    <div>
        <h1>Авторизация</h1>
        <router-link to="/smk">Авторизоваться</router-link>
        <!-- <h3> {{ $store.getters.doubleLikes}}</h3>
        <div>
            <my-button @click="$store.commit('incrementLikes')">+</my-button>
            <my-button @click="$store.commit('decrementLikes')">-</my-button>
        </div> -->

        <ul id="demo" v-for="item in hierarchy.children">
            <hierarchy-item class="item" :item="item"></hierarchy-item>
        </ul>

    </div>
</template>
<script>



export default {
    data: function () {
        return {
            hierarchy: {
                children: [
                    {
                        name: "Политика в области качества",
                        children: [
                            { name: "Миссия" },
                            { name: "Политика ЛГТУ в области качества" },
                            { name: "Сертификаты" },
                        ],
                        isOpen: false
                    },
                    {
                        name: "Документы СМК",
                        children: [
                            { name: "Руководство по качеству РК-01-2019" },
                            { name: "Стандарты организации" },
                            { name: "Положения общеуниверситетские" },
                            { name: "Инструкции" },
                            { name: "Методические рекомендации" },
                            { name: "Реестр нормативных документов интегрированной системы менеджмента" },
                        ],
                        isOpen: false
                    },
                    {
                        name: "Внутренний аудит СМК",
                        isOpen: false
                    },
                    {
                        name: "Совещания по качеству",
                        children: [
                            { name: "Совещание по качеству от 27.09.2022" },
                            { name: "Совещание по качеству от 29.11.2022" },
                            { name: "Мониторинг решений Совещаний по качеству" },
                            { name: "Архив" }
                        ],
                        isOpen: false
                    },
                    {
                        name: "Круглые столы по качеству",
                        children: [
                            { name: "Круглый стол 1" },
                            { name: "Круглый стол 2" },
                            { name: "Круглый стол 3" },
                            { name: "Круглый стол 4" },
                            { name: "Круглый стол 5" },
                            { name: "Круглый стол 6" },
                            { name: "Круглый стол 7" },
                            { name: "Круглый стол 8" },
                            { name: "Круглый стол 9" }
                        ],
                        isOpen: false
                    },
                    {
                        name: "Мониторинг удовлетворенности",
                        isOpen: false
                    },
                    {
                        name: "Полезная информация СМК",
                        isOpen: false
                    },
                    {
                        name: "Мониторинг в системе образования",
                        isOpen: false
                    }
                ]
            }

        }
    }
}
</script>
<style scoped>
body {
    font-family: Menlo, Consolas, monospace;
    color: #444;
}

.item {
    cursor: pointer;
    padding-bottom: 5px;
}

.bold {
    font-weight: bold;
}

ul {
    padding-left: 1em;
    line-height: 1.5em;
    /* list-style-type: dot; */
}
</style>