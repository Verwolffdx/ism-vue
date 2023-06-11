<template>
    <div id="demo" v-for="item in this.divisions">
        <!-- <input type="checkbox" id="checkbox" @input="$emit('addDivision', item.id)">
            <label for="checkbox" :class="{ bold: isFolder }" @click="toggle">{{ item.name }}</label> -->
        <treport-div-tree-item class="hierarchy_item" :item="item"></treport-div-tree-item>
        </div>
</template>

<script>
import TReportDivTreeItem from '@/components/UI/GlobalFamReportTable/TReportDivTreeItem'
import axios from 'axios'
import authHeader from '@/services/auth-header';

export default {
    name: "treport-divisions-tree",
    components: {
        'treport-div-tree-item': TReportDivTreeItem
    },
    props: {
        divisions: [Array]
    },
    data() {
        return {

        }
    },
    mounted() {
        // console.log("divs " + this.divisions)
    },
    methods: {
        toggle(item) {
            item.isOpen = !item.isOpen
        },

        // },
        // watch: {
        //     DivisionsArray: function (arr) {
        //         this.DivisionsArray = arr
        //     }
        // }
    }
}
</script>

<style scoped>
tr, td {
    border: 1px solid black;
}
/* .hierarchy_item {
    cursor: pointer;
}

.bold {
    font-weight: bold;
}

ul {
    list-style: none;
    margin: 0.75em 0;
    padding: 0 1em;
} */
</style>