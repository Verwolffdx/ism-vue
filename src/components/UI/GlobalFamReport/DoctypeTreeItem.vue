<template>
    <div id="item-template">
        <li>
            <div class="doctype-name">
                <!-- <div :class="{ li_folder: isFolder }" @click="toggle"></div> -->
                <label :class="{ li_folder: isFolder }" for="checkbox" @click="toggle">{{ item.docTypeName }}</label>
            </div>
            <ul v-show="isOpen" v-if="isFolder">
                <div v-for="document in this.item.documentsForReport">
                    <doc-tree-item class="subitem" :documentForReport="document"></doc-tree-item>
                </div>
            </ul>

        </li>
    </div>
</template>
<script>
import DocTreeItem from '@/components/UI/GlobalFamReport/DocTreeItem';
export default {
    name: "doctype-tree-item",
    components: {
        'doc-tree-item': DocTreeItem
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
/* .subitem {
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

.doctype-name:hover {
    cursor: pointer;
}

label:hover {
    cursor: pointer;
}

/* label {
    margin-left: 5px;
} */
</style>