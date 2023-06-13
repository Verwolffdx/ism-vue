<template>
    <div>
        <header-item></header-item>

        <div class="workArea font-normal">
            <div class="hierarchy">
                <hierarchy></hierarchy>
                <hr>
            </div>
            <div class="searchArea">
                <div class="searchBar">
                    <input class="searchInput" type="text" placeholder="Поиск..." v-model="searchValue"
                        @keyup.enter="fetchDocumentsV2">
                    <button class="searchBtn" @click="fetchDocumentsV2"></button>
                </div>
                <hr>
                <document-list :documents="documents" :isSearched="isSearched" :documentsLoading="documentsLoading"
                    :numOfResults="numOfResults" @remove="removeDocument"></document-list>
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
import FamList from '@/components/FamList'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

import axios from 'axios'
export default {
    components: {
        DocumentForm, DocumentList, FamList
    },
    data() {
        return {
            // value: "",
            // isSearched: false,
            // searchValue: "Положение",
            // numOfResults: 0,
            // documents: [],
            // documents: [
            //     {
            //         id: 1,
            //         code: 'ПО-008-2023',
            //         title: 'Положение общеуниверситетское “О системе управления охраной труда”',
            //         find: [
            //             '8.6 Комиссия по проведению специальной оценки условий труда',
            //             '8.6 Комиссия по проведению специальной оценки условий труда'
            //         ]
            //     },
            //     {
            //         id: 2,
            //         code: 'ПО-51-2021',
            //         title: 'Положение общеунверситетское “О комиссии по рассмотрению вопросов о списании федерального имущества, находяшегося на балансе ЛГТУ”',
            //         find: [
            //             '4.1 Комиссия создается в соответсвии с постановлением Правилтельства Российской Федерации №834 от ...',
            //             '6.1 Решение Комиссии по рассмотрению вопросов о списании федерального имущества принимается на ...',
            //             '6.4.1 Решение Комиссии, принятое на заседании Комисии, оформляется протоколом, который подписывается ...'
            //         ]

            //     },
            //     {
            //         id: 3,
            //         code: 'ПО-53-2012',
            //         title: 'Положение общеуниверситетское “О комиссии университета по рассмотрению вопросов использования и распоряжения федеральным имуществом, закрепелнным за ЛГТУ”',
            //         find: [
            //             'Настоящее положение о комисии университета по рассмотрению вопросов использования и распоряжения ...',
            //             'Комиссия - комиссия университета по рассмотрению вопросов использования и распоряжения федеральным ...',
            //         ]
            //     },
            //     {
            //         id: 4,
            //         code: 'ПО-63-2013',
            //         title: 'Положение общеуниверситетское “О комиссии по урегулированию споров между участиниками образовательных отношений ЛГТУ”',
            //         find: [
            //             '2.1 Комиссия по урегулированию споров между участниками образовательных отношений состоит из равного ...'
            //         ]
            //     }
            // ],
            dialogVisible: false,
            // documentsLoading: false

        }
    },
    mounted() {
        // value = getValue()
        // console.log(this.value)
        this.fecthFamiliarizationSheetForUser()
    },

    computed: {
        ...mapState({
            isSearched: state => state.document.isSearched,
            searchValue: state => state.document.searchValue,
            numOfResults: state => state.document.numOfResults,
            documents: state => state.document.documents,
            documentsLoading: state => state.document.documentsLoading,
            famSheet: state => state.document.familiarizationSheetForUser
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
            fecthFamiliarizationSheetForUser: 'document/fecthFamiliarizationSheetForUser'
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
/* .font-bold strong {
    font-weight: 700;
} */

/* .app {
    padding: 20px;
} */


.workArea {
    display: flex;
    flex-direction: row;
    /* min-height: 100%; */

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

.famTitle {
    font-weight: 400;
    font-size: 22px;
    margin-top: 10px;
}

.famSheet {
    padding-top: 15px;
}




hr {
    margin: 20px 0;
}
</style>