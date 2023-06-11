<template>
    <div>
        <ul id="demo" v-for="item in this.divisions" >
            <!-- <input type="checkbox" id="checkbox" @input="$emit('addDivision', item.id)">
            <label for="checkbox" :class="{ bold: isFolder }" @click="toggle">{{ item.name }}</label> -->
            <report-div-tree-item class="hierarchy_item" :item="item"></report-div-tree-item>
        </ul>
    </div>
</template>

<script>
import ReportDivTreeItem from '@/components/UI/GlobalFamReport/ReportDivTreeItem'
import axios from 'axios'
import authHeader from '@/services/auth-header';

export default {
    name: "report-divisions-tree",
    components: {
        'report-div-tree-item': ReportDivTreeItem
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
</style>