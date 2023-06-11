<template>
    <!-- <td> -->
        <div :class="{ li_folder: isFolder }" @click="toggle"></div>
        <label for="checkbox" @click="toggle">{{ item.docTypeName }}</label>
        <div v-show="isOpen" v-if="isFolder">
            <div v-for="document in this.item.documentsForReport">
                <tdoc-tree-item class="subitem" :documentForReport="document"></tdoc-tree-item>
            </div>
        </div>
    <!-- </td> -->
</template>
<script>
import TDocTreeItem from '@/components/UI/GlobalFamReportTable/TDocTreeItem';
export default {
    name: "tdoctype-tree-item",
    components: {
        'tdoc-tree-item': TDocTreeItem
    },
    props: {
        item: Object
    },
    data: function () {
        return {
            isChecked: false,
            isOpen: false,
            isFolder: true
        };
    },
    methods: {
        toggle: function () {
            if (this.isFolder) {
                this.isOpen = !this.isOpen;
            }
        },
    },
    mounted() {
        // console.log(this.item.documentsForReport)
    }
}
</script>
<style scoped>

tr, td {
    border: 1px solid black;
}
/* .subitem {
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