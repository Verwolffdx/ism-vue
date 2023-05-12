<template>
    <div id="item-template">
        <li>
            <div :class="{ li_folder: isFolder }" @click="toggle"></div>
            <input type="checkbox" :id="item.id" @change="$emit('addDivision', item)">
            <label for="checkbox" @click="toggle">{{ item.division_name }}</label>
            <!-- <div :class="{ bold: isFolder }">
                {{ item.name }}
                <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
            </div> -->
            <ul v-show="isOpen" v-if="isFolder">
                <div-tree-item class="subitem" v-for="(child, index) in item.children" :key="index"
                    :item="child" @addDivision=addDivision></div-tree-item>
            </ul>
        </li>
    </div>
</template>
<script>
export default {
    name: "div-tree-item",
    props: {
        item: Object,
        modelValue: [Array]
    },
    data: function () {
        return {
            isChecked: false,
            isOpen: false
        };
    },
    watch: {
        isChecked(newIsChecked) {
            if(this.isChecked) {
                // const user = localStorage.getItem('user')
                // user.divisions = this.item.id
                
                // console.log(localStorage.user)
            }
        }
    },
    computed: {
        isFolder: function () {
            return this.item.children && this.item.children.length;
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
}
</style>