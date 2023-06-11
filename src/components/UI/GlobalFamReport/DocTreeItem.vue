<template>
    <div>
        <li>
            <div class="doc-info">
                <div class="doc-code">
                    <!-- <div :class="{ li_folder: isFolder }" @click="toggle"></div> -->
                    <label :class="{ li_folder: isFolder }" for="checkbox" @click="toggle">{{ this.documentForReport.documentCode }}</label>
                </div>
                <div class="fam">
                    <label>{{ this.documentForReport.familiarized }}</label>
                </div>
                <div class="notfam">
                    <label>{{ this.documentForReport.notFamiliarized }}</label>
                </div>
            </div>

            <ul v-show="isOpen" v-if="isFolder">
                <!-- <doc-tree-item class="subitem" v-for="(child, index) in item.documentsForReport"
                    :item="child"></doc-tree-item> -->
                <report-divisions-tree :divisions="this.documentForReport.familiarizationDivisions"></report-divisions-tree>
            </ul>
        </li>
    </div>
</template>

<script>
import ReportDivisionsTree from '@/components/UI/GlobalFamReport/ReportDivisionsTree'
export default {
    name: "doc-tree-item",
    components: {
        ReportDivisionsTree
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
.doc-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    /* max-width: 1425px; */
}
.doc-info:hover {
    background-color: aliceblue;
}
label:hover {
    cursor: pointer;
}
.doc-code {
    padding-left: 20px;
    text-align: left;
    width: 30%;
}

.fam {
    text-align: center;
    width: 30%;
}
.notfam {
    text-align: right;
    width: 30%;
}

.hierarchy_item {
    cursor: pointer;
}

.bold {
    font-weight: bold;
}

ul {
    list-style: none;
    /* margin: 0.75em 0;
    padding: 0 1em; */
}

.subitem {
    /* padding: 10px 0 0 15px; */
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

</style>