<template>
    <div>
        <ul id="demo" v-for="item in divisionsJSON.children" >
            <!-- <input type="checkbox" id="checkbox" @input="$emit('addDivision', item.id)">
            <label for="checkbox" :class="{ bold: isFolder }" @click="toggle">{{ item.name }}</label> -->
            <div-tree-item :divisions=divisions class="hierarchy_item" :item="item" @addDivision=addDivision></div-tree-item>
        </ul>
    </div>
</template>

<script>
import DivTreeItem from '@/components/UI/DivTreeItem'
import axios from 'axios'
import authHeader from '@/services/auth-header';

export default {
    name: "divisions-tree",
    components: {
        'div-tree-item': DivTreeItem
    },
    props: {
        divisions: [Array]
    },
    data() {
        return {
            DivisionsArray: [],
            // divisions: {
            //     children: [
            //         {
            //             id: 3,
            //             name: "Ректор",
            //             children: [
            //                 {
            //                     id: 5,
            //                     name: "Первый проректор",
            //                 }
            //             ],
            //             isOpen: false
            //         },
            //         {
            //             id: 4,
            //             name: "Еще ректор",
            //         },

            //     ]
            // },
            divisionsJSON: {
                children: []
            }
        }
    },
    mounted() {
        this.getDivisions()
    },
    methods: {
        toggle(item) {
            item.isOpen = !item.isOpen
        },
        addDivision(item, event) {
            this.$emit('addDivision', item)
            // console.log(event)
        },
        async getDivisions() {
            try {
                const response = await axios.get('http://localhost:8080/api/v2/smk/divisions', { headers: authHeader() })
                if (response.status === 200) {
                  this.divisionsJSON.children = response.data
                }
            } catch (e) {
                alert(e)
                console.log(e)

            } finally {
               
            }
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