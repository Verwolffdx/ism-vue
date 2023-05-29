<template>
    <div>
        <header-item></header-item>
        <div class="workArea font-normal">
            <!-- <div class="hierarchy">
                <hierarchy></hierarchy>
                <hr>
            </div> -->
            <admin-panel></admin-panel>
            <div class="createArea">
                <span class="createTitle">Редактирование документа</span>

                <hr>
                <div class="field">
                    <span class="input_title">Загрузить оригинал</span>
                    <input type="file" ref="original">
                    <!-- <my-button @click="sendFileToParse">Загрузить оригинал</my-button> -->

                </div>
                <hr>

                <div class="fields">
                    <div class="field">
                        <span class="input_title">Название:</span>
                        <my-input class="input" v-model="document.name"></my-input>
                    </div>
                    <div class="field">
                        <span class="input_title">Код:</span>
                        <my-input class="input" v-model="document.code"></my-input>
                    </div>
                    <div class="field">
                        <span class="input_title">Версия:</span>
                        <my-input class="input" v-model="document.version"></my-input>
                    </div>
                    <div class="field">
                        <span class="input_title">Дата введения:</span>
                        <my-input class="input" v-model="document.date"></my-input>
                    </div>
                    <hr>
                    <span class="input_title">Содержание</span>
                    <div class="field">
                        <input type="file" ref="file">
                        <my-button @click="sendFileToParse">Считать файл</my-button>
                    </div>
                    <div v-for="content in document.content">
                        <document-input :key="content.id" v-model:input-value="content.chapter_title">
                            Название главы:
                        </document-input>
                        <document-textarea :key="content.id" v-model:input-value="content.chapter">
                            Содержание главы:
                        </document-textarea>
                    </div>

                    <div class="field"><my-button class="button" @click="addChapter">Добавить главу</my-button>
                        <my-button class="button" @click="deleteChapter">Удалить главу</my-button>
                    </div>
                    <hr>

                    <document-input v-for="appendix in document.appendix" :key="appendix.id"
                        v-model:input-value="appendix.appendix">
                        Приложение:
                    </document-input>

                    <div class="field">
                        <my-button class="button" @click="addAppendix">Добавить приложение</my-button>
                        <my-button class="button" @click="deleteAppendix">Удалить приложение</my-button>
                    </div>
                    <hr>
                    <span class="input_title">Связанные документы</span>
                    <div v-for="link in document.links">
                        <document-input :key="link.id" v-model:input-value="link.link_name">
                            Название документа:
                        </document-input>
                        <document-input :key="link.id" v-model:input-value="link.link">
                            Ссылка на документ:
                        </document-input>
                    </div>

                    <div class="field">
                        <my-button class="button" @click="addLink">Добавить связанный документ</my-button>
                        <my-button class="button" @click="deleteLink">Удалить связанный документ</my-button>
                    </div>
                    <hr>
                    <span class="input_title">Лист согласований</span>
                    <div v-for="approval in document.approval_sheet">
                        <document-input :key="approval.id" v-model:input-value="approval.type_of_approval">
                            Согласовано/разработано:
                        </document-input>
                        <document-input :key="approval.id" v-model:input-value="approval.fio">
                            Кем:
                        </document-input>
                        <document-input :key="approval.id" v-model:input-value="approval.position">
                            Должность:
                        </document-input>
                    </div>

                    <div class="field">
                        <my-button class="button" @click="addApproval">Добавить согласованта</my-button>
                        <my-button class="button" @click="deleteApproval">Удалить согласованта</my-button>
                    </div>

                    <span class="input_title">Лист ознакомления (отделы:)</span>
                    <div class="field">
                        <divisions-tree v-model="divisionsArray" @addDivision=addDivision></divisions-tree>
                    </div>

                    <hr>
                    <my-button class="button" @click="createDocument">Создать документ</my-button>
                </div>
            </div>

            <!-- Модальное окно -->
            <my-modal v-if="showModal" @close="this.$router.push('/smk/document/' + this.document_id)">
                <template v-slot:header>Документ успешно создан</template>
            </my-modal>

        </div>
    </div>
</template>

<script>
import DocumentInput from "@/components/DocumentInput";
import DocumentTextarea from "@/components/DocumentTextarea";
import AdminPanel from "@/components/UI/AdminPanel";
import MyModal from "@/components/UI/MyModal"
import DivisionsTree from "@/components/UI/DivisionsTree"
import authHeader from "@/services/auth-header";
import fileHeader from "@/services/file-header"
import axios from 'axios'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
    components: { DocumentInput, DocumentTextarea, AdminPanel, MyModal, DivisionsTree },
    // props: {
    //     documentFull: {
    //         type: Object,
    //         required: true
    //     }
    // },
    data() {
        return {
            divisionsArray: [1, 2, 3],
            showModal: false,
            //Количество глав
            count_chapter: 0,
            tmpDocument: {},
            document_id: "",
            //Модель документа
            document: {
                id: "",
                name: "",
                code: "",
                version: "",
                date: "",
                content: [
                    {
                        id: 0,
                        chapter_title: "",
                        chapter: []
                    }
                ],
                appendix: [
                    {
                        id: 0,
                        appendix: ""
                    }
                ],
                links: [
                    {
                        id: 0,
                        link_name: "",
                        link: ""
                    }

                ],
                approval_sheet: [
                    {
                        id: 0,
                        type_of_approval: "",
                        fio: "",
                        position: ""
                    }
                ]
            },
        }
    },
    mounted() {
        // this.addChapter()
        if (this.documentFull != null) {
            

            this.document.name = this.documentFull.title
            this.document.code = this.documentFull.code
            this.document.date = this.documentFull.date
            this.document.version = this.documentFull.version

            let content = []
            for (let i = 0; i < this.documentFull.content.length; i++) {
                let chapter_item = []
                this.documentFull.content[i].chapter.forEach(item => {
                    chapter_item.push(item.chapter_text)
                })
                content.push({
                        chapter_title: this.documentFull.content[i].chapter_title,
                        chapter: chapter_item
                    })
            }
            this.document.content = content

            let appendix = []
            for (let i = 0; i < this.documentFull.appendix.length; i++) {
                this.document.appendix = this.documentFull.appendix
                appendix.push({
                    appendix: this.documentFull.appendix[i]
                })
            }
            this.document.appendix = appendix

            this.document.approval_sheet = this.documentFull.approval_sheet
            this.document.links = this.documentFull.links
        }
    },
    computed: {
        ...mapGetters({
            // document: 'document/getDocumentById'
            documentFull: 'document/getDocument'
        })

    },
    methods: {
        ...mapActions({
            getDocumentByIdWithHighlight: 'document/getDocumentByIdWithHighlight',
            getDocumentFile: 'document/getDocumentFile'
        }),
        addDivision(item) {
            if (this.divisionsArray.includes(item.id)) {
                this.divisionsArray = this.divisionsArray.filter(e => e !== item.division_id)
            }
            else
                this.divisionsArray.push(item.division_id)
        },
        //Добавить одну главу
        addChapter() {
            this.document.content.push({ chapter_title: '', chapter: [], id: this.document.content.length })
        },
        //Удалить одну главу
        deleteChapter() {
            if (this.document.content.length > 1)
                this.document.content.pop()
        },
        //Добавить одно приложение
        addAppendix() {
            this.document.appendix.push({ appendix: '', id: this.document.appendix.length })
        },
        //Удалить одно приложение
        deleteAppendix() {
            if (this.document.appendix.length > 1)
                this.document.appendix.pop()
        },
        //Добавить одну ссылку
        addLink() {
            this.document.links.push({ link_name: '', link: '', id: this.document.links.length })
        },
        //Удалить одну ссылку
        deleteLink() {
            if (this.document.links.length > 1)
                this.document.links.pop()
        },
        //Добавить одного соглаванта
        addApproval() {
            this.document.approval_sheet.push({ type_of_approval: '', fio: '', position: '', id: this.document.links.length })
        },
        //Удалить одного соглаванта
        deleteApproval() {
            if (this.approval_sheet.length > 1)
                this.approval_sheet.pop()
        },
        //Создание документа и его отправка
        createDocument() {
            this.tmpDocument = this.document;
            let chapter = [];
            this.tmpDocument.content.forEach(el => {
                let ch = el.chapter.toString().split('\n')
                chapter.push(ch)
            })

            for (var i = 0; i < this.tmpDocument.content.length; i++) {
                this.tmpDocument.content[i].chapter = chapter[i]
            }
            let appendix = this.tmpDocument.appendix.map(function (item) { return item['appendix'] });
            this.tmpDocument.appendix = appendix

            this.sendDoc()
        },


        //Отправка файла для парсинга и получения содержимого документа (название глав и их содержание)
        async sendFileToParse() {
            try {

                let file = this.$refs.file.files[0];

                let formData = new FormData();

                formData.append("file", file);

                const response = await axios.post('http://localhost:8080/api/v2/smk/parsefile', formData, {
                    headers: fileHeader()
                })

                this.document.content = []

                if (response.status == 200) {
                    this.document.content = response.data
                }

            } catch (e) {
                console.log(e)
            }
        },
        //Отправка документа для сохранения
        async sendDoc() {
            try {
                this.document.id = this.$route.params.id
                let body = {
                    document: this.document,
                    divisions: this.divisionsArray
                }

                let originalFile = this.$refs.original.files[0];

                let formData = new FormData();

                // formData.append("document", JSON.stringify(body))
                // formData.append("file", originalFile);

                formData.append('document', new Blob([JSON.stringify(body)], {
                    type: "application/json"
                }));

                // const fr = new FileReader()
                // fr.readAsArrayBuffer(originalFile)
                formData.append(
                    'file',
                    new Blob([originalFile], {
                        type: "multipart/form-data"
                    }),
                    originalFile.name
                );



                const response = await axios.post('http://localhost:8080/api/v2/smk/update',
                    formData,
                    { headers: fileHeader() }
                )

                if (response.status == 200) {
                    console.log(response)
                    this.document_id = response.data.document_id
                    this.showModal = true
                }
            } catch (e) {
                alert(e)
                console.log(e)
            } finally {

            }
        },
        resetFields() {
            // this.showModal = false

            this.$router.push('/smk/document/' + this.document_id)

            // this.count_chapter = 0
            // this.tmpDocument = {}

            // let content = [
            //     {
            //         id: 0,
            //         chapter_title: "",
            //         chapter: [""]
            //     }
            // ]

            // let appendix = [
            //         {
            //             id: 0,
            //             appendix: ""
            //         }
            //     ]

            // let links = [
            //         {
            //             id: 0,
            //             link_name: "",
            //             link: ""
            //         }

            //     ]

            // let approval_sheet = [
            //         {
            //             id: 0,
            //             type_of_approval: "",
            //             fio: "",
            //             position: ""
            //         }
            //     ]


            // let emptyDocument = {
            //     name: "",
            //     code: "",
            //     version: "",
            //     date: "",
            //     content: content,
            //     appendix: appendix,
            //     links: links,
            //     approval_sheet: approval_sheet
            // }

            // this.document.$remove
            // this.document = emptyDocument



            // this.document = {
            //     name: "",
            //     code: "",
            //     version: "",
            //     date: "",
            //     content: [
            //         {
            //             id: 0,
            //             chapter_title: "",
            //             chapter: []
            //         }
            //     ],
            //     appendix: [
            //         {
            //             id: 0,
            //             appendix: ""
            //         }
            //     ],
            //     links: [
            //         {
            //             id: 0,
            //             link_name: "",
            //             link: ""
            //         }

            //     ],
            //     approval_sheet: [
            //         {
            //             id: 0,
            //             type_of_approval: "",
            //             fio: "",
            //             position: ""
            //         }
            //     ]
            // }
        }
    }
}
</script>

<style scoped>
.createArea {
    margin-bottom: 100px;
}

.createTitle {
    font-weight: 500;
    font-size: 20px;
    line-height: 20px;
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
    padding: 15px 35px;
}

.createArea {
    display: flex;
    flex-direction: column;
    width: 60%;
    padding: 10px 5%;
}

hr {
    margin: 20px 0;
}

.fields {
    display: flex;
    flex-direction: column;

}

.field {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0;
}

.input_title {
    margin: 0 10px;
}

.input {
    width: 70%;
}

.button {
    width: 20%;
}
</style>