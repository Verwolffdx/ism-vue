<template>
    
    <div class="results">
        
        <div v-if="documentsLoading == true">Загрузка...</div>
        <div v-if="isSearched == true">
            <!-- <hr> -->
            Результатов: {{ numOfResults }}
            <document-item 
            :document="document" 
            v-for="document in documents" 
            :key="document.id"
            @remove="$emit('remove', document)"
            />
        </div>
        <!-- <div v-else>Введите поисковый запрос</div> -->
    </div>
</template>

<script>
import DocumentItem from '@/components/DocumentItem';
export default {
    components: {DocumentItem},
    props: {
        documents: {
            type: Array,
            required: true,
        },
        isSearched: false,
        documentsLoading: false,
        numOfResults: 0
    }
}
</script>

<style scoped>
.results {
    display: flex;
    flex-direction: column;
}

</style>