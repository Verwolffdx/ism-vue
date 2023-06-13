<template>
    <div>
        <header-item></header-item>

        <div class="workArea font-normal">
            <div class="hierarchy">
                
                <hierarchy></hierarchy>
                
                <hr>
                <!-- Добавление документа (из видео) -->
                <!-- <my-button @click="showDialog">Создать документ</my-button>
                <my-dialog v-model:show="dialogVisible">
                    <document-form @create="createDocument" />
                </my-dialog> -->

            </div>
            <!-- :model-value="searchValue"
                        @update:model-value="setSearchValue(searchValue)" -->
            <div class="searchArea">
                <p class="pageTitle">Шаблоны документов</p>
                <div class="searchBar">
                    <input class="searchInput" type="text" placeholder="Поиск..." v-model="this.templateSearch"
                        @keyup.enter="this.searchTemplates(this.templateSearch)">
                    <button class="searchBtn" @click="this.searchTemplates(this.templateSearch)"></button>
                </div>
                <hr>
                <template-list :templates="this.templates" :isSearched="isSearched" :documentsLoading="documentsLoading"
                    :numOfResults="numOfResults" @remove="removeDocument"></template-list>
            </div>

            <div class="famSheet" v-if="famSheet.length > 0">
                <span class="famTitle">Ознакомьтесь с документами</span>
                <fam-list :famSheet="famSheet"></fam-list>
            </div>

        </div>
    </div>
</template>

<script>
import DocumentForm from '@/components/DocumentForm'
import DocumentList from '@/components/DocumentList'
import TemplateList from '@/components/TemplateList'
import FamList from '@/components/FamList'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

import axios from 'axios'
export default {
    components: {
        DocumentForm, DocumentList, FamList, TemplateList
    },
    data() {
        return {
            dialogVisible: false,
            templateSearch: ""
        }
    },
    mounted() {
        this.fecthFamiliarizationSheetForUser()
    },

    computed: {
        ...mapState({
            isSearched: state => state.document.isSearched,
            searchValue: state => state.document.searchValue,
            numOfResults: state => state.document.numOfResults,
            documents: state => state.document.documents,
            documentsLoading: state => state.document.documentsLoading,
            famSheet: state => state.document.familiarizationSheetForUser,
            templates: state => state.document.templates
        }),
        searchValue: {
            get() {
                return this.$store.state.document.searchValue
            },
            set(value) {
                this.setSearchValue(value)
            }
        }
    },
    methods: {
        
        ...mapMutations({
            setSearchValue: 'document/setSearchValue'
        }),
        ...mapActions({
            fetchDocuments: 'document/fetchDocuments',
            fetchDocumentsV2: 'document/fetchDocumentsV2',
            fecthFamiliarizationSheetForUser: 'document/fecthFamiliarizationSheetForUser',
            searchTemplates: 'document/searchTemplates'
        }),
        searchDocuments() {
            this.isSearched = this.isSearched == true ? false : true
            this.numOfResults = this.documents.length
        },
        createDocument(document) {
            this.documents.push(document)
            this.dialogVisible = false
        },
        removeDocument(document) {
            this.documents = this.documents.filter(d => d.id !== document.id)
        },
        showDialog() {
            this.dialogVisible = true
        },
        

    }
}
</script>

<style scoped>

.famTitle {
    font-weight: 400;
    font-size: 22px;
    margin-top: 10px;
}

.famSheet {
    padding-top: 15px;
}
.pageTitle {
    font-weight: 400;
    font-size: 22px;
    margin-top: 10px;
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
    padding: 10px 10px;
}



/* li::before {
    content: "";
    border-color: transparent #111;
    border-style: solid;
    border-width: 0.35em 0 0.35em 0.45em;
    display: block;
    height: 0;
    width: 0;
    left: -1em;
    top: 0.9em;
    position: relative;
} */

.searchArea {
    display: flex;
    flex-direction: column;
    min-width: 60%;
    padding: 10px;
    padding: 10px 5%;
}

.searchBar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    width: 100%;
    border: 1px solid black;
    border-radius: 5px;
    margin-top: 10px;
}

.searchInput {
    display: flex;
    border: none;
    padding: 10px 10px;
    width: 95%;
    outline: none;
    margin-left: 5px;
}

.searchBtn {
    display: flex;
    border: none;
    background: url('../../public/search.png');
    background-repeat: no-repeat;
    background-size: 15px 15px;
    background-position: center;
    width: 5%;
    margin-right: 5px;
}





hr {
    margin: 20px 0;
}
</style>