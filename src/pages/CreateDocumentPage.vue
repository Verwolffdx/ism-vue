<template>
    <div>
        <header-item></header-item>
        <div class="workArea font-normal">
            <div class="hierarchy">
                <hierarchy></hierarchy>
                <hr>
            </div>
            <div class="createArea">
                <span class="createTitle">Создать документ</span>
                <div class="field">
                    <input type="file" ref="file">
                    <my-button @click="sendFileToParse">Загрузить файл</my-button>
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

                    <hr>
                    <my-button class="button" @click="createDocument">Создать документ</my-button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import DocumentInput from "@/components/DocumentInput.vue";
import DocumentTextarea from "@/components/DocumentTextarea.vue";
import authHeader from "@/services/auth-header";
import axios from 'axios'
export default {
    components: { DocumentInput, DocumentTextarea },
    data() {
        return {
            count_chapter: 0,
            tmpDocument: {},
            document: {
                name: "",
                code: "",
                version: "",
                date: "",
                content: [
                    {
                        id: 0,
                        chapter_title: "",
                        chapter: ""
                    }
                ],
                appendix: [
                    {
                        appendix: "",
                        id: 0
                    }
                ],
                links: [
                    {
                        link_name: "",
                        link: ""
                    }

                ],
                approval_sheet: [
                    {
                        type_of_approval: "",
                        fio: "",
                        position: ""
                    }
                ]
            },
        }
    },
    methods: {

        addChapter() {
            this.document.content.push({ chapter_title: '', chapter: [], id: this.document.content.length })
        },
        deleteChapter() {
            if (this.document.content.length > 1)
                this.document.content.pop()
        },
        addAppendix() {
            this.document.appendix.push({ appendix: '', id: this.document.appendix.length })
        },
        deleteAppendix() {
            if (this.document.appendix.length > 1)
                this.document.appendix.pop()
        },
        addLink() {
            this.document.links.push({ link_name: '', link: '', id: this.document.links.length })
        },
        deleteLink() {
            if (this.document.links.length > 1)
                this.document.links.pop()
        },
        addApproval() {
            this.document.approval_sheet.push({ type_of_approval: '', fio: '', position: '', id: this.document.links.length })
        },
        deleteApproval() {
            if (this.approval_sheet.length > 1)
                this.approval_sheet.pop()
        },
        createDocument() {
            this.tmpDocument = this.document;
            let chapter = [];
            this.tmpDocument.content.forEach(el => {
                let ch = el.chapter.split(`\n`)
                chapter.push(ch)
            })

            for (var i = 0; i < this.tmpDocument.content.length; i++) {
                this.tmpDocument.content[i].chapter = chapter[i]
            }
            let appendix = this.tmpDocument.appendix.map(function (item) { return item['appendix'] });
            this.tmpDocument.appendix = appendix

            this.sendDoc()
        },
        async sendFileToParse() {
            try {
                let file = this.$refs.file.files[0];

                let formData = new FormData();

                formData.append("file", file);

                let user = JSON.parse(localStorage.getItem('user'));

                let header = {
                    Authorization: 'Bearer ' + user.accessToken,
                    "Content-Type": "multipart/form-data"
                };

                console.log(header)

                const response = await axios.post('http://localhost:8080/api/v2/smk/parsefile', formData, {
                    headers: header

                })

                console.log(response)

                if (response.status == 200) {

                    this.document.content = response.data

                    this.document.content = []

                    response.data.forEach(e => {
                        this.document.content.push({ chapter_title: e.chapter_title, chapter: e.chapter })
                    })
                }

            } catch (e) {
                console.log(e)
            }
        },
        async sendDoc() {
            try {
                const response = await axios.post('http://localhost:8080/api/v2/smk/create', this.tmpDocument)
            } catch (e) {
                console.log(e)
            }
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