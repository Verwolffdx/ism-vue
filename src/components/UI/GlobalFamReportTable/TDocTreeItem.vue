<template>
    <tr>
        <!-- <div class="doc-info"> -->
            <td class="doc-code">
                <div :class="{ li_folder: isFolder }" @click="toggle"></div>
                <label for="checkbox" @click="toggle">{{ this.documentForReport.documentCode }}</label>
            </td>
            <td class="fam">
                <label>{{ this.documentForReport.familiarized }}</label>
            </td>
            <td class="notfam">
                <label>{{ this.documentForReport.notFamiliarized }}</label>
            </td>
        <!-- </div> -->

        <!-- <div v-show="isOpen" v-if="isFolder">
            <treport-divisions-tree :divisions="this.documentForReport.familiarizationDivisions"></treport-divisions-tree>
        </div> -->
    </tr>
</template>

<script>
import TReportDivisionsTree from '@/components/UI/GlobalFamReportTable/TReportDivisionsTree'
export default {
    name: "tdoc-tree-item",
    components: {
        'treport-divisions-tree': TReportDivisionsTree
    },
    props: {
        documentForReport: Object
    },
    data() {
        return {
            isFolder: true,
            isOpen: false,
        }
    },
    methods: {
        toggle: function () {
            if (this.isFolder) {
                this.isOpen = !this.isOpen;
            }
        },

    },
    mounted() {
        // console.log(this.documentForReport.familiarizationDivisions)
    }
}
</script>

<style scoped>
tr, td {
    border: 1px solid black;
}
/* .doc-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    max-width: 1425px;
}

.doc-code {
    max-width: 475px;
    min-width: 475px;
}

.fam {
    max-width: 475px;
    min-width: 475px;
}

.notfam {
    max-width: 475px;
    min-width: 475px;
} */
/* 
.hierarchy_item {
    cursor: pointer;
}

.bold {
    font-weight: bold;
}

ul {
    list-style: none;
    margin: 0.75em 0;
    padding: 0 1em;
}

.subitem {
    padding: 10px 0 0 15px;
    list-style-type: none;
}

.triangle {
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
</style>