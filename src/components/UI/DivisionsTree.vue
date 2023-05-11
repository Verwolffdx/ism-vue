<template>
    <div>
        <ul id="demo" v-for="item in divisions.children" >
            <!-- <input type="checkbox" id="checkbox" @input="$emit('addDivision', item.id)">
            <label for="checkbox" :class="{ bold: isFolder }" @click="toggle">{{ item.name }}</label> -->
            <div-tree-item class="hierarchy_item" :item="item" @addDivision=addDivision></div-tree-item>
        </ul>
    </div>
</template>

<script>
import DivTreeItem from '@/components/UI/DivTreeItem'

export default {
    name: "divisions-tree",
    components: {
        'div-tree-item': DivTreeItem
    },
    props: {
        divisionsArray: [Array]
    },
    data() {
        return {
            DivisionsArray: [],
            divisions: {
                children: [
                    {
                        id: 3,
                        name: "Ректор",
                        children: [
                            {
                                id: 5,
                                name: "Первый проректор",
                            }
                        ],
                        isOpen: false
                    },
                    {
                        id: 4,
                        name: "Еще ректор",
                    },

                ]
            }
        }
    },
    methods: {
        toggle(item) {
            item.isOpen = !item.isOpen
        },
        addDivision(item, event) {
            this.$emit('addDivision', item)
            // console.log(event)
        }
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
    /* padding-top: 15px; */
    cursor: pointer;
}

.bold {
    font-weight: bold;
}

ul {
    /* padding-left: 1em;
    line-height: 1.5em; */
    list-style: none;
    margin: 0.75em 0;
    padding: 0 1em;
}
</style>