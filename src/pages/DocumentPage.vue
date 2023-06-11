<template>
    <!-- <h1>Страница документа с id = {{ $route.params.id }}</h1> -->
    <div>
        <header-item></header-item>
        <div v-if="!this.loading" class="workArea font-normal">
            <div class="hierarchy">
                <!-- <hierarchy></hierarchy> -->
                <my-button @click="scroll()" v-if="!this.isFamiliarize">Подтвердить ознакомление</my-button>
                <div
                    v-show="typeof this.document.find != undefined && this.document.find != null && this.document.find.length != null && this.document.find.length > 1">
                    <strong>Найденные элементы</strong>
                    <div class="hierarchy_item" v-for=" item in this.document.find ">
                        <div v-html="item.item" @click="scroll(item.ref_id)"></div>
                    </div>
                    <hr>
                </div>

                <div>
                    <strong>Связанные документы</strong>
                    <div class="hierarchy_item" v-for=" link in this.document.links ">
                        <a class="link" v-html="link.link_name" :href="link.link" target="_blank"></a>
                    </div>
                    <hr>
                </div>
                <div>
                    <strong>Связанные шаблоны</strong>
                    <div class="hierarchy_item" v-for=" appendix  in  this.document.appendix ">
                        <div class="appendix_item">
                            <div v-html="appendix"></div>
                            <!-- <div v-html="item.item"  @click="scroll(item.ref_id)"></div> -->
                            <div class="download" @click="getTemplateFile(appendix)"></div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="documentArea">
                <div class="buttons">
                    
                    <my-button @click="getDocumentFile(this.$route.params.id)">Скачать оригинал</my-button>
                    <my-button v-if="!this.isFavorite" @click="toFavorite">Добавить избранное</my-button>
                    <my-button v-if="this.isFavorite" @click="toFavorite">Удалить из избранного</my-button>
                    <my-button v-if="this.isAdmin" @click="this.$router.push('/smk/document/' + document.id +'/report/')">Лист ознакомления</my-button>
                    <my-button v-if="this.isAdmin" @click="this.$router.push('/admin/edit/' + document.id)">Редактировать</my-button>
                    <my-button v-if="this.isAdmin" @click="deleteDocument">Удалить</my-button>

                </div>
                <div class="title_list">
                    <div class="title_item" v-html="this.document.title"></div>
                    <div class="title_item" v-html="this.document.code"></div>
                    <div class="title_item">Версия {{ this.document.version }}</div>
                </div>
                <div class="title_item"> Дата введения {{ this.document.date }}</div>
                <div class="document_content" v-for=" content  in  this.document.content">
                    <div class="chapter_title" v-html="content.chapter_title" :id="content.ref_id"
                        :class="{ 'find-el': content.ref_id != null }"></div>
                    <div class="chapter" v-for=" ch in content.chapter">
                        <div v-html="ch.chapter_text" :id="ch.ref_id" :class="{ 'find-el': ch.ref_id != null }"></div>
                    </div>
                </div>

                <div class="appendix">
                    <span class="chapter_title">Приложения</span>
                    <div v-for=" appendix  in  this.document.appendix ">
                        <div v-html="appendix"></div>
                        <my-button @click="getTemplateFile(appendix)">Скачать</my-button>
                    </div>
                </div>

                <div class="approval_sheet">
                    <span class="chapter_title">Лист согласований</span>
                    <div v-for=" approval  in  this.document.approval_sheet ">
                        <div v-html="approval.type_of_approval"></div>
                        <div v-html="approval.position"></div>
                        <div v-html="approval.fio"></div>
                    </div>
                </div>

                <div class="fam" ref="fam1" v-if="!this.isFamiliarize">
                    <!-- <input class="fam-input" type="checkbox"> -->
                    <!-- <label class="fam-label"></label> -->
                    <my-button @click="this.showModal = true">Подтвердить ознакомление</my-button>
                </div>

                <!-- <div ref="7">ТЕСТ</div> -->


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
            isFavorite: false,
            isAdmin: false
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
        this.isAdmin = auth.state.user.roles.includes('ROLE_ADMIN')

    },
    watch: {
        document: function () {
            if (typeof this.document != undefined) {
                this.loading = false
                this.isFamiliarize = this.document.isFamiliarize
                this.isFavorite = this.document.isFavorite
            }
        }
    },
    methods: {
        async deleteDocument() {
            try {
                const response = await axios.delete('http://localhost:8080/api/v2/smk/deleteDocument?id=' + this.document.id, {
                    headers: authHeader()
                })

                if (response.status == 200) {
                    console.log(response)
                    this.$router.go(-1)
                }
            } catch (e) {
                console.log(e)
            }
        },
        scroll(id) {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });

            }
        },
        ...mapActions({
            getDocumentByIdWithHighlight: 'document/getDocumentByIdWithHighlight',
            getDocumentFile: 'document/getDocumentFile',
            getTemplateFile: 'document/getTemplateFile'
        }),
        async confirmFamiliarize() {
            try {
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

        },
        async toFavorite() {
            try {

                let body = {
                    document_id: this.document.id,
                    user_id: auth.state.user.id
                }


                if (this.isFavorite) {
                    const response = await axios.post('http://localhost:8080/api/v2/smk/deletefavorites', body, {
                        headers: authHeader()
                    })

                    if (response.status == 200) {
                        this.isFavorite = this.isFavorite ? false : true
                        this.document.isFavorite = this.document.isFavorite ? false : true
                    }
                } else {
                    const response = await axios.post('http://localhost:8080/api/v2/smk/addfavorites', body, {
                        headers: authHeader()
                    })

                    if (response.status == 200) {
                        this.isFavorite = this.isFavorite ? false : true
                        this.document.isFavorite = this.document.isFavorite ? false : true
                    }
                }





            } catch (e) {
                console.log(e)
            }
        }
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
.appendix_item {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.download {
    background: url("@/../public/download.png");
    background-size: contain;
    height: 25px;
    min-width: 25px;
    cursor: pointer;
    background-repeat: no-repeat;
    margin-left: 5px;
}

.find-el {
    /* color: yellow; */
    background-color: yellow;
}

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
    padding: 15px 15px;
}

.hierarchy_item {
    padding-top: 15px;
}

.documentArea {
    display: flex;
    flex-direction: column;
    width: 100em;
    min-width: 30em;
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

.link {
    color: black;
    text-decoration: none;
}

.link:hover {
    text-decoration: underline;
}

hr {
    margin: 20px 0;
}
</style>