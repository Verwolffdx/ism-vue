<template>
    <div id="item-template">
        <li>
            <div class="division-info">
                <div class="division-name" :class="{ subitem: subItem}">
                    <!-- <div :class="{ li_folder: isFolder }" @click="toggle"></div> -->
                    <label :class="{ li_folder: isFolder }" for="checkbox" @click="toggle">{{ this.item.divisionsName }}</label>
                </div>
                <div class="fam">
                    <label>{{ this.item.familiarized }}</label>
                </div>
                <div class="notfam">
                    <label>{{ this.item.notFamiliarized }}</label>
                </div>
            </div>

            <ul v-show="isOpen" v-if="isFolder" v-for="child in this.item.childDivisions">
                <report-div-tree-item :item="child" :subItem="true"></report-div-tree-item>
                <!-- <report-divisions-tree :divisions="this.documentForReport.childDivisions"></report-divisions-tree> -->

            </ul>
            
        </li>
    </div>
</template>
<script>
import ReportDivisionsTree from '@/components/UI/GlobalFamReport/ReportDivisionsTree'
export default {
    name: "report-div-tree-item",
    components: {
        'report-divisions-tree': ReportDivisionsTree
    },
    props: {
        item: Object,
        subItem: {
            type: Boolean
        }
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
.division-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    
    /* max-width: 900px;
    min-width: 900px; */
}

.division-info:hover {
    background-color: aliceblue;
}
label:hover {
    cursor: pointer;
}
.division-name {
    padding-left: 40px;
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
.subitem {
    padding-left: 60px;
    list-style-type: none;
    padding-top: 5px;
    padding-bottom: 5px;
}

ul {
    list-style: none;
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

.bold {
    font-weight: bold;
}

</style>