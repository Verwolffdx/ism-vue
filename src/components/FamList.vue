<template>
    <div class="famSheet">
        <div v-if="famSheet.length > 0">
            <fam-item :fam="fam" v-for="fam in famSheet" :key="fam.fam_id" />
        </div>


        
    </div>
</template>

<script>
import DocumentItem from '@/components/DocumentItem';
import FamItem from '@/components/FamItem'
export default {
    components: { DocumentItem, FamItem },
    props: {
        famSheet: {
            type: Array,
            required: true,
        }
    }
}
</script>

<style scoped>
.famSheet {
    display: flex;
    flex-direction: column;
}

div {
    margin-left: 10px;
}
</style>