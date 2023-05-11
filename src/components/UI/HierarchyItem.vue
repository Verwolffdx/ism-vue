<template>
    <div id="item-template">
        <li :class="{ li_folder : isFolder }" @click="toggle">
            <div :class="{ bold: isFolder }" >
                {{ item.name }}
                <!-- <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span> -->
            </div>
            <ul v-show="isOpen" v-if="isFolder">
                <hierarchy-item class="subitem" v-for="(child, index) in item.children" :key="index" :item="child"></hierarchy-item>
            </ul>
        </li>
    </div>
</template>
<script>
export default {
    name: "hierarchy-item",
    props: {
        item: Object
    },
    data: function () {
        return {
            isOpen: false
        };
    },
    computed: {
        isFolder: function () {
            return this.item.children && this.item.children.length;
        }
    },
    methods: {
        toggle: function () {
            if (this.isFolder) {
                this.isOpen = !this.isOpen;
            }
        },
    }
}
</script>
<style scoped>
/* .item {
    padding-left: 10px;
} */
.subitem {
    
    padding: 10px 0 0 15px;
    list-style-type: none;
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