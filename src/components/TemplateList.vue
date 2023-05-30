<template>
    
    <div class="results">
        
        <div v-if="documentsLoading == true">Загрузка...</div>
        <div v-if="isSearched == true">
            <!-- <hr> -->
            Результатов: {{ numOfResults }}
            <template-item 
            :template="template" 
            v-for="template in templates"
            @remove="$emit('remove', template)"
            />
        </div>
        <!-- <div v-else>Введите поисковый запрос</div> -->
    </div>
</template>

<script>
import TemplateItem from '@/components/TemplateItem';
export default {
    components: {TemplateItem},
    props: {
        templates: {
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