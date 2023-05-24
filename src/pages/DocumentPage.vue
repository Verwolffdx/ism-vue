<template>
    <!-- <h1>Страница документа с id = {{ $route.params.id }}</h1> -->
    <div>
        <header-item></header-item>
        <div v-if="!this.loading" class="workArea font-normal">
            <div class="hierarchy">
                <!-- <hierarchy></hierarchy> -->
                <my-button @click="scroll()">Подтвердить ознакомление</my-button>
                <div
                    v-show="typeof this.document.find != undefined && this.document.find != null && this.document.find.length != null && this.document.find.length > 1">
                    <strong>Найденные элементы</strong>
                    <div class="hierarchy_item" v-for=" item in this.document.find ">
                        <div v-html="item.item" :id="item.ref"></div>
                    </div>
                </div>



                <hr>
                <strong>Связанные документы</strong>
                <div class="hierarchy_item" v-for=" link  in  this.document.links ">
                    <div v-html="link.link_name"></div>
                </div>

            </div>
            <div class="documentArea">
                <div class="buttons">
                    <my-button>Редактировать</my-button>
                    <my-button>Скачать</my-button>
                </div>
                <div class="title_list">
                    <div class="title_item" v-html="this.document.title"></div>
                    <div class="title_item" v-html="this.document.code"></div>
                    <div class="title_item">Версия {{ this.document.version }}</div>
                </div>
                <div class="title_item"> Дата введения {{ this.document.date }}</div>
                <div class="document_content" v-for=" content  in  this.document.content ">
                    <div class="chapter_title" v-html="content.chapter_title"></div>
                    <div class="chapter" v-for=" ch  in  content.chapter " v-html="ch"></div>
                </div>

                <div class="appendix">
                    <span class="chapter_title">Приложение</span>
                    <div v-for=" appendix  in  this.document.appendix " v-html="appendix"></div>
                </div>

                <div class="approval_sheet">
                    <span class="chapter_title">Лист согласований</span>
                    <div v-for=" approval  in  this.document.approval_sheet ">
                        <div v-html="approval.type_of_approval"></div>
                        <div v-html="approval.position"></div>
                        <div v-html="approval.fio"></div>
                    </div>
                </div>

                <div class="fam" ref="fam" v-if="!this.isFamiliarize">
                    <!-- <input class="fam-input" type="checkbox"> -->
                    <!-- <label class="fam-label"></label> -->
                    <my-button @click="this.showModal = true">Подтвердить ознакомление</my-button>
                </div>


            </div>

        </div>
        <div v-else>Загрузка</div>

        <!-- Модальное окно -->
        <my-modal v-if="showModal" @close="confirmFamiliarize()">
            <template v-slot:header>Вы ознакомились с документом?</template>
            <template v-slot:footer>Да</template>
        </my-modal>

    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import { auth } from '@/store/auth.module'
import authHeader from '@/services/auth-header';
import MyModal from "@/components/UI/MyModal.vue"

export default {
    components: { auth, MyModal },

    data() {
        return {
            // document: {}
            showModal: false,
            loading: true,
            isFamiliarize: false,
        }
    },
    beforeMount() {
        this.getDocumentByIdWithHighlight(this.$route.params.id)

    },
    mounted() {
        // this.getDocumentById()
        // console.log(this.document(this.$route.params.id).find)
        // this.document(this.$route.params.id)
        // this.getDocument(this.$route.params.id)

        // this.getDocumentById()

        // this.isFamiliarize = this.document.isFamiliarize

    },
    watch: {
        document: function () {
            if (typeof this.document != undefined) {
                this.loading = false
                this.isFamiliarize = this.document.isFamiliarize
            }
        }
    },
    methods: {
        scroll() {
            this.$refs["fam"].scrollIntoView({ behavior: "smooth" })
        },
        ...mapActions({
            getDocumentByIdWithHighlight: 'document/getDocumentByIdWithHighlight'
        }),
        async confirmFamiliarize() {
            try {


                // const response = await axios.get('http://localhost:8080/api/v2/smk/confirmFamiliarization?user_id=' + auth.state.user.id + "&document_id=" + this.document.id,
                //     { headers: authHeader() }
                // )

                // const response = await axios.put('http://localhost:8080/api/v2/smk/confirmFamiliarization?user_id=' + auth.state.user.id + "&document_id=" + this.document.id,
                //     { headers: authHeader() }
                // )

                const response = await axios({
                    headers: authHeader(),
                    method: "put",
                    url: 'http://localhost:8080/api/v2/smk/confirmFamiliarization?user_id=' + auth.state.user.id + "&document_id=" + this.document.id,
                })



                if (response.status == 200) {
                    console.log(response.data)
                }

            } catch (e) {
                console.log(e)
            } finally {
                this.showModal = false
                this.isFamiliarize = !this.isFamiliarize
            }

        }
        // async getDocumentById() {
        //     try {


        //         let body = {
        //             document_id: this.$route.params.id,
        //             // value: state.searchValue,
        //             user_id: auth.state.user.id,
        //         }

        //         const response = await axios.post('http://localhost:8080/api/v2/smk/document', body,
        //             { headers: authHeader() },
        //         )
        //         // console.log(response.request)
        //         // console.log(response.data)

        //         if (response.status === 200) {


        //             // console.log(response.data)

        //             // response.data.forEach(e => {
        //             let find = []
        //             let id_item = 0

        //             let id = response.data.id
        //             let code = response.data.code
        //             if (response.data.highlightFields?.code) {
        //                 code = response.data.highlightFields.code[0]
        //             }
        //             let title = response.data.name
        //             if (response.data.highlightFields?.name) {
        //                 title = response.data.highlightFields.name[0]
        //             }


        //             // if (e.highlightFields?.appendix) {
        //             //     e.highlightFields.appendix.forEach(appendix => find.push({ ref: id_item++, item: appendix }))
        //             // }

        //             let content = response.data.content
        //             if (response.data.highlightFields?.code) {
        //                 response.data.highlightFields.code.forEach(content => find.push({ ref: id_item++, item: content }))
        //             }
        //             if (response.data.highlightFields?.name) {
        //                 response.data.highlightFields.name.forEach(content => find.push({ ref: id_item++, item: content }))
        //             }

        //             if (response.data.highlightFields?.["content.chapter"]) {
        //                 response.data.highlightFields["content.chapter"].forEach(content => find.push({ ref: id_item++, item: content }))
        //             }

        //             if (response.data.highlightFields?.["content.chapter_title"]) {
        //                 response.data.highlightFields["content.chapter_title"].forEach(content => find.push({ ref: id_item++, item: content }))
        //             }
        //             // TODO Синхронизировать содержание документа и найденные элементы для скоролла к ним
        //             // find.forEach(item => {

        //             // })

        //             let date = response.data.date
        //             if (response.data.highlightFields?.date) {
        //                 response.data.highlightFields.date.forEach(date => find.push({ ref: id_item++, item: date }))
        //             }

        //             let links = response.data.links
        //             if (response.data.highlightFields?.links) {
        //                 response.data.highlightFields.links.forEach(links => find.push({ ref: id_item++, item: links }))
        //             }

        //             let appendix = response.data.appendix
        //             if (response.data.highlightFields?.appendix) {
        //                 response.data.highlightFields.appendix.forEach(appendix => find.push({ ref: id_item++, item: appendix }))
        //             }

        //             let approval_sheet = response.data.approval_sheet
        //             if (response.data.highlightFields?.approval_sheet) {
        //                 response.data.highlightFields.approval_sheet.forEach(approval_sheet => find.push({ ref: id_item++, item: approval_sheet }))
        //             }

        //             let version = response.data.version

        //             let isFavorite = response.data.favorite

        //             this.document = {
        //                 id,
        //                 code,
        //                 title,
        //                 content,
        //                 find,
        //                 date,
        //                 links,
        //                 appendix,
        //                 approval_sheet,
        //                 version,
        //                 isFavorite
        //             }


        //         }
        //     } catch (e) {
        //         alert(e)
        //         console.log(e)

        //     } finally {

        //     }
        // }
    },
    computed: {
        ...mapGetters({
            // document: 'document/getDocumentById'
            document: 'document/getDocument'
        })

    },

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