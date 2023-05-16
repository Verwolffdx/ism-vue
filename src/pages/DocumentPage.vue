<template>
    <!-- <h1>Страница документа с id = {{ $route.params.id }}</h1> -->
    <div>
        <header-item></header-item>
        <div class="workArea font-normal">
            <div class="hierarchy">
                <!-- <hierarchy></hierarchy> -->
                <my-button @click="scroll()">Подтвердить ознакомление</my-button>
                <strong>Найденные элементы</strong>
                <div class="hierarchy_item" v-for="item in this.document(this.$route.params.id).find">
                    <div v-html="item.item" :id="item.ref"></div>
                </div>

                <hr>
                <strong>Связанные документы</strong>
                <div class="hierarchy_item" v-for="link in this.document(this.$route.params.id).links">
                    <div v-html="link.link_name"></div>
                </div>

            </div>
            <div class="documentArea">
                <div class="buttons">
                    <my-button>Редактировать</my-button>
                    <my-button>Скачать</my-button>
                </div>
                <div class="title_list">
                    <div class="title_item" v-html="this.document(this.$route.params.id).title"></div>
                    <div class="title_item" v-html="this.document(this.$route.params.id).code"></div>
                    <div class="title_item">Версия {{ this.document(this.$route.params.id).version }}</div>
                </div>
                <div class="title_item"> Дата введения {{ this.document(this.$route.params.id).date }}</div>
                <div class="document_content" v-for="content in this.document(this.$route.params.id).content">
                    <div class="chapter_title" v-html="content.chapter_title"></div>
                    <div class="chapter" v-for="ch in content.chapter" v-html="ch"></div>
                </div>

                <div class="appendix">
                    <span class="chapter_title">Приложение</span>
                    <div v-for="appendix in this.document(this.$route.params.id).appendix" v-html="appendix"></div>
                </div>

                <div class="approval_sheet">
                    <span class="chapter_title">Лист согласований</span>
                    <div v-for="approval in this.document(this.$route.params.id).approval_sheet">
                        <div v-html="approval.type_of_approval"></div>
                        <div v-html="approval.position"></div>
                        <div v-html="approval.fio"></div>
                    </div>
                </div>

                <div class="fam" ref="fam">
                    <input class="fam-input" type="checkbox">
                    <label class="fam-label">Подтвердить ознакомление</label>
                </div>


            </div>

        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'


export default {
    data() {
        return {

        }
    },
    methods: {
        scroll() {
            this.$refs["fam"].scrollIntoView({ behavior: "smooth" })
        },
    },
    mounted() {
        console.log(this.document(this.$route.params.id).find)
    },
    computed: {
        ...mapGetters({
            document: 'document/getDocumentById'
        })
    }
}
</script>
<style scoped>
.header .logo {
    font-weight: 500;
    font-size: 24px;
    line-height: 24px;
    margin-left: 35px;
    font-style: bold;
    color: black;
    text-decoration: none;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    border-bottom: 1px solid black;
}

.profile {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-right: 15px;
    max-width: 25%;
}

.user_icon {
    width: 45px;
}

.user_name {
    margin: 0 10px;
}

.workArea {
    display: flex;
    flex-direction: row;
}

.hierarchy {
    display: flex;
    flex-direction: column;
    min-width: 250px;
    width: 15%;
    /* border: 1px solid black; */
    padding: 15px 35px;
}

.hierarchy_item {
    padding-top: 15px;
}

.documentArea {
    display: flex;
    flex-direction: column;
    /* width: %; */
    max-width: 1350px;
    padding: 10px;
    padding: 10px 5%;
    font-size: 20px;
    line-height: 24px;
}

.buttons {
    text-align: right;
}

.buttons>* {
    margin-right: 10px;
}

.documentArea>* {
    padding: 10px;
}

.document_content {
    /* font-weight: 400; */

    text-align: justify;
}

.document_content>* {
    padding: 5px;
}

.title_list {
    text-align: center;
    font-weight: 700;
}

.title_item {
    padding-bottom: 10px;
}

.chapter_title {
    font-weight: 700;
}

.appendix>* {
    padding: 10px;
}

.approval_sheet>* {
    padding: 10px;
}

.fam {
    text-align: center;
    font-weight: 700;
    margin-top: 50px;
    margin-bottom: 150px;
}

.fam-input {
    transform: scale(1.5);
    margin-right: 10px;
}

hr {
    margin: 20px 0;
}
</style>