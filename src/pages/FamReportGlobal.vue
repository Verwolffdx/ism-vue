<template>
    <div>
        <header-item></header-item>

        <div class="workArea font-normal">
            <div class="hierarchy">
                <hierarchy></hierarchy>
                <hr>
            </div>
            <div class="searchArea">
                <!-- <table cols="3">
                    <tr>
                        <th>Документ</th>
                        <th>Ознакомились</th>
                        <th>Не ознакомились</th>
                    </tr>
                    <tr>
                        <td>Стандарты организации</td>
                    </tr>
                    <tr>
                        <td>СТО-01-2023</td>
                        <td>8</td>
                        <td>9</td>
                    </tr>
                    <tr>
                        <td>Отдел 1</td>
                        <td>4</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td>Подотдел 1</td>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Подотдел 2</td>
                        <td>3</td>
                        <td>4</td>
                    </tr>

                </table> -->
                <hr>
                <div class="report-title">
                    <div>Документ</div>
                    <div class="fam-title">Ознакомились</div>
                    <div>Не ознакомились</div>
                </div>
                <ul v-for="item in report">
                    <doctype-tree-item class="hierarchy_item" :item="item"></doctype-tree-item>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import authHeader from '@/services/auth-header';
import DoctypeTreeItem from '@/components/UI/GlobalFamReport/DoctypeTreeItem'
import TDoctypeTreeItem from '@/components/UI/GlobalFamReportTable/TDoctypeTreeItem'
export default {
    components: { DoctypeTreeItem, 'tdoctype-tree-item': TDoctypeTreeItem },
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
                const response = await axios.get('http://localhost:8080/api/v2/smk/familiarizationreport/',
                    {
                        headers: authHeader()
                    })

                if (response.status == 200) {
                    console.log(response.data)
                    this.report = response.data.docTypesForReport
                }
            } catch (e) {
                alert(e)
                console.log(e)
            }
        }
    }
}
</script>

<style scoped>
table,
tr,
td {
    border: 1px solid black;
}

.fam-title {
    padding-left: 7%;
}

.report-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* width: 1100px; */
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
}

.report-title .div {
    /* width: 30%; */
    padding-left: 10px;
}

.hierarchy_item:hover {
    cursor: pointer;
}

.bold {
    font-weight: bold;
}

ul {
    list-style: none;
    /* margin: 0.75em 0; */
    width: 100%;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    padding-left: 10px;
    /* background-color: aliceblue; */
}



/* label:hover {
    background-color: aliceblue;
} */

/* .subitem {
    padding: 10px 0 0 15px;
    list-style-type: none;
} */

/* .triangle {
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
}

.li_folder::before {
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
}

label {
    margin-left: 5px;
} */

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
}</style>