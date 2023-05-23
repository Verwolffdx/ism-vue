<template>
    <div class="favorites">
        <div v-if="documents.length > 0">
            <p class="fav-title">Документы</p>
            <document-item :document="document" v-for="document in documents" :key="document.id" />
        </div>
        
        <div v-if="templates.length > 0">
            <hr>
            <p class="fav-title">Шаблоны</p>
            <document-item :document="document" v-for="document in documents" :key="document.id" />
        </div>

        
    </div>
</template>

<script>
import DocumentItem from '@/components/DocumentItem';
export default {
    components: { DocumentItem },
    props: {
        documents: {
            type: Array,
            required: true,
        },
       templates: {
            type: Array,
            required: true
       } 
    }
}
</script>

<style scoped>
.fav-title {
    font-weight: 400;
    font-size: 19px;
    line-height: 18px;
}
.favorites {
    display: flex;
    flex-direction: column;
}

div {
    margin-left: 10px;
}
</style>