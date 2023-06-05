<template>
    <div class="favorites">
        <div v-if="documents.length > 0">
            <!-- <p class="fav-title">Документы</p> -->
            <register-item :document="document" v-for="document in documents" :key="document.id" />
        </div>
    </div>
</template>

<script>
import RegisterItem from '@/components/RegisterItem';
export default {
    components: { RegisterItem },
    props: {
        documents: {
            type: Array,
            required: true,
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