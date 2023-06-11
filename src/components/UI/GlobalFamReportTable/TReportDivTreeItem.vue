<template>
    <!-- <td> -->
        <div class="division-info">
            <td class="division-name">
                <div :class="{ li_folder: isFolder }" @click="toggle"></div>
                <label for="checkbox" @click="toggle">{{ this.item.divisionsName }}</label>
            </td>
            <td class="fam">
                <label>{{ this.item.familiarized }}</label>
            </td>
            <td class="norfam">
                <label>{{ this.item.notFamiliarized }}</label>
            </td>
        </div>

        <tr v-show="isOpen" v-if="isFolder" v-for="child in this.item.childDivisions">
            <treport-div-tree-item class="subitem" :item="child"></treport-div-tree-item>
            <!-- <report-divisions-tree :divisions="this.documentForReport.childDivisions"></report-divisions-tree> -->
        </tr>
    <!-- </td> -->
</template>
<script>
import TReportDivisionsTree from '@/components/UI/GlobalFamReportTable/TReportDivisionsTree'
export default {
    name: "treport-div-tree-item",
    components: {
        'report-divisions-tree': TReportDivisionsTree
    },
    props: {
        item: Object
    },
    data: function () {
        return {
            isChecked: false,
            isOpen: false
        };
    },
    mounted() {
        // console.log("item " + this.item)
    },
    watch: {
        isChecked(newIsChecked) {
            if (this.isChecked) {
                // const user = localStorage.getItem('user')
                // user.divisions = this.item.id

                // console.log(localStorage.user)
            }
        }
    },
    computed: {
        isFolder: function () {
            return this.item.childDivisions && this.item.childDivisions.length;
        },
    },
    methods: {
        toggle: function () {
            if (this.isFolder) {
                this.isOpen = !this.isOpen;
            }
        },
        updateInput(event) {
            this.$emit('push', event.target.value)
        },
        addDivision(item) {
            this.$emit('addDivision', item)
            // console.log(event)
        }
    }
}
</script>
<style scoped>
/* .item {
    padding-left: 10px;
} */

tr, td {
    border: 1px solid black;
}
/* .division-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    max-width: 900px;
    min-width: 900px;
}

.division-name {
    max-width: 300px;
    min-width: 300px;
}

.fam {
    max-width: 300px;
    min-width: 300px;
}

.notfam {
    max-width: 300px;
    min-width: 300px;
}

.subitem {

    padding: 10px 0 0 15px;
    list-style-type: none;
} */

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
}
</style>