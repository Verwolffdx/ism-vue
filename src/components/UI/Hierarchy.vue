<template>
    <div>
        <ul id="demo" v-for="item in hierarchy.children">
            <hierarchy-item class="hierarchy_item" :item="item"></hierarchy-item>
        </ul>
    </div>
</template>

<script>
import HierarchyItem from '@/components/UI/HierarchyItem'

export default {
    name: "hierarchy",
    components: {
        'hierarchy-item': HierarchyItem
    },
    data() {
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
    },
    methods: {
        toggle(item) {
            item.isOpen = !item.isOpen
        }
    }
}
</script>

<style scoped>
.hierarchy_item {
    /* padding-top: 15px; */
    cursor: pointer;
}

.bold {
    font-weight: bold;
}

ul {
    /* padding-left: 1em;
    line-height: 1.5em; */
    list-style: none;
    margin: 0.75em 0;
    padding: 0 1em;
}
</style>