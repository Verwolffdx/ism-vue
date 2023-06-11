<template>
    <div>
        <header-item></header-item>

        <div class="workArea font-normal">
            <div class="hierarchy">
                <hierarchy></hierarchy>
                <hr>
            </div>
            <div class="searchArea">
                <span class="page-title">{{ report.documentCode }}</span>
                <hr>
                <!-- <div class="report-title">
                    <div>Документ</div>
                    <div>Ознакомились</div>
                    <div>Не ознакомились</div>


                </div> -->
                <table class="report-table">
                    <tr class="report-title">
                        <th>Отдел</th>
                        <th>ФИО</th>
                        <th>Ознакомился</th>
                    </tr>
                    <tr v-for="item in report.report" class="bordered">
                        <td>{{  item.divisionName }}</td>
                        <td>{{ item.fio }}</td>
                        <td v-if="item.views">Ознакомился</td>
                        <td v-else>Не ознакомился</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import authHeader from '@/services/auth-header';
import DoctypeTreeItem from '@/components/UI/GlobalFamReport/DoctypeTreeItem'

import { mapGetters } from 'vuex'
export default {
    components: { DoctypeTreeItem },
    data() {
        return {
            report: []
        }
    },
    mounted() {
        this.getReport()
    },
    methods: {
        async getReport() {
            try {
                const response = await axios.get('http://localhost:8080/api/v2/smk/familiarizationreport/' + this.$route.params.id,
                    {
                        headers: authHeader()
                    })

                if (response.status == 200) {
                    console.log(response.data)
                    this.report = response.data
                }
            } catch (e) {
                alert(e)
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
.page-title {
    font-weight: 400;
    font-size: 22px;
    margin-top: 10px;
}
.report-table {
    align-items: center;
    align-content: center;
    text-align: justify;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    margin-left: 20px;
    border-collapse: collapse;
}

th, td {
    padding: 15px;
    border-bottom: 1px solid gainsboro;
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