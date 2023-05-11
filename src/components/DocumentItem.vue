<template>
    <div class="document">
        <div>
            <router-link class="document_title"  :to="`/smk/document/${document.id}`"><span v-html="document.code"></span> <span v-html="document.title"></span></router-link>
            <div class="document_content" v-for="find in document.find" v-html="find"></div>
        </div>
        <div class="document__btns">
            <!-- <my-button @click="$router.push(`/smk/document/${document.id}`)">Открыть</my-button> -->
            <!-- <my-button @click="$emit('remove', document)">Удалить</my-button> -->
        </div>
    </div>
</template>

<script>
export default {
    props: {
        document: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.document {
    padding: 10px 0;
    /* border: 2px solid black; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    
}

.document_title {
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    margin: 5px 0;
    color: black;
    text-decoration: none;
}

.document_title:hover {
    color: red;
}

.document_content {
    /* font-weight: 300; */
    font-size: 14px;
    line-height: 14px;
    margin: 15px 20px;
}

</style>