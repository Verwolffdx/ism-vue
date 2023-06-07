<template>
    <div>
        <header-item></header-item>
        
        
        <div class="workArea font-normal">
            <div class="hierarchy">

                <admin-panel></admin-panel>

                

            </div>

            <div class="searchArea">
                <p class="pageTitle">Реестр документов</p>
                <hr>

                <register-list :documents="documents"></register-list>
            </div>

        </div>
    </div>
</template>
<script>
import AdminPanel from '@/components/UI/AdminPanel'
import RegisterList from '@/components/RegisterList.vue'
import authHeader from '@/services/auth-header';
import axios from 'axios'

export default {
    components: { AdminPanel, RegisterList },
    data() {
        return {
            documents: []
        }
    },
    mounted() {
        this.getDocuments()
    },
    methods: {
        async getDocuments() {
            try {

                const response = await axios.get('http://localhost:8080/api/v2/smk/all',
                    { headers: authHeader() },
                )

                if (response.status === 200) {
                    console.log(response)
                    response.data.forEach(e => {
                        this.documents.push({
                            id: e.id,
                            title: e.name,
                            code: e.code
                        })
                    })
                }
            } catch (e) {
                alert(e)
                console.log(e)

            } finally {
              
            }

        }
    }
}
</script>
<style scoped>
.pageTitle {
    font-weight: 400;
    font-size: 22px;
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