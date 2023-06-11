<template>
    <div>
        <header-item></header-item>
        <div class="workArea font-normal">
            <div class="hierarchy">

                <hierarchy></hierarchy>

                <hr>

            </div>

            <div class="searchArea">
                <p class="pageTitle"> {{ this.doctype }}</p>
                <hr>

                <register-list :documents="documents"></register-list>
            </div>
            <div class="famSheet" v-if="famSheet.length > 0">
                <span>Ознакомьтесь с документами</span>
                <fam-list :famSheet="famSheet"></fam-list>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
import authHeader from '@/services/auth-header';
import RegisterList from '@/components/RegisterList.vue'
import FamList from '@/components/FamList'
import { mapState, mapActions } from 'vuex'
export default {
    components: { RegisterList, FamList },
    data() {
        return {
            doctype: "",
            documents: []
        }
    },
    methods: {
        docType() {
            console.log(this.$route.params.type)
            switch (this.$route.params.type) {
                case 'standarts':
                    this.doctype = 'Сдандарты организации'
                    break;
                case 'regulations':
                    this.doctype = 'Положения общеуниверситетские'
                    break;
                case 'methodics':
                    this.doctype = 'Инструкции'
                    break;
                case 'methrek':
                    this.doctype = 'Методически рекомендации'
                    break;
                case 'all':
                    this.doctype = 'Реестр нормативных документов'
                    break;
            }
        },
        async getDocumentsByType(doctype) {
            try {
                const response = await axios.get('http://localhost:8080/api/v2/smk/documents/' + doctype,
                    {
                        headers: authHeader()
                    })

                if (response.status == 200) {
                    console.log(response.data)
                    // this.documents = []
                    response.data.forEach(item => {
                        
                        this.documents.push({
                            id: item.document_id,
                            code: item.document_code,
                            title: item.document_name
                        })
                    })
                }
            } catch (e) {
                alert(e)
                console.log(e)
            }
        },
        ...mapActions({
            fecthFamiliarizationSheetForUser: 'document/fecthFamiliarizationSheetForUser',
        }),
    },
    beforeMount() {
        this.docType()
        this.getDocumentsByType(this.$route.params.type)
    },
    beforeUpdate() {
        this.documents = []
        this.docType()
        this.getDocumentsByType(this.$route.params.type)
    },
    computed: {
        ...mapState({
            famSheet: state => state.document.familiarizationSheetForUser,
        }),
    }
}
</script>

<style scoped>
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

.searchArea {
    display: flex;
    flex-direction: column;
    width: 60%;
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

.searchArea {
    display: flex;
    flex-direction: column;
    min-width: 60%;
    padding: 10px;
    padding: 10px 5%;
}

hr {
    margin: 20px 0;
}
</style>