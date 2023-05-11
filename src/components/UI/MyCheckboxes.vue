<template>
    <div v-for="item in arr">
        
        <input type="checkbox" @input="$emit('addDivision', item)">
        <label for="checkbox">{{ item.id }}</label>
    </div>
</template>

<script>
export default {
    name: "my-checkboxes",
    props: {
        divisionsArray: [Array]
    },
    data() {
        return {
            arr: [
                {
                    id: 1
                },
                {
                    id: 2
                },
                {
                    id: 3
                }
            ]
        }
    },
    methdods: {
        addDivision(item) {
            this.$emit('addDivision', item)
        }
    },
    // watch: {
    //     divisionsArray: function (item) {
    //         this.$emit('addDivision', item.id)
    //     }
    // }

}
</script>

<style scoped>
    
</style>


<!-- @input="$emit('addDivision', item.id)" -->