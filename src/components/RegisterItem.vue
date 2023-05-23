<template>
    <div class="document">
        <div>
            <div class="title">
                <router-link class="document_title" :to="`/smk/document/${document.id}`">
                    <span v-html="document.code"></span>
                    <span>&nbsp;</span>
                    <span v-html="document.title"></span>
                </router-link>
                <div @click="deleteDocument" >Удалить</div>
            </div>
            
            <my-button class="document_content" v-for="find in document.find" v-html="find.item"></my-button>
        </div>
        <div class="document__btns">
            <!-- <my-button @click="$router.push(`/smk/document/${document.id}`)">Открыть</my-button> -->
            <!-- <my-button @click="$emit('remove', document)">Удалить</my-button> -->
            <!-- <my-button @click="toFavorite">
                <span v-if="isFavorite">Убрать из избранного</span>
                <span v-else>Добавить в избранное</span>
            </my-button> -->

        </div>
    </div>
</template>

<script>
import axios from 'axios';
import authHeader from '@/services/auth-header';
import { auth } from '@/store/auth.module'
export default {
    props: {
        document: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isFavorite: this.document.isFavorite
        }
    },
    methods: {
        async deleteDocument() {
            try {

                


                
                    const response = await axios.delete('http://localhost:8080/api/v2/smk/deleteDocument?id=' + this.document.id, {
                        headers: authHeader()
                    })

                    if (response.status == 200) {
                        console.log(response)
                    }
               





            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>

<style scoped>
.btn-delete {
    background: url("@/../public/favorite.png");
    background-size: contain;
    min-width: 25px;
    height: 25px;
    cursor: pointer;
    background-repeat: no-repeat;
}



.document {
    padding: 10px 0;
}

.document_title {

    color: black;
    text-decoration: none;
}

.title {

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    margin: 5px 0;
    color: black;
    text-decoration: none;
    width: 100%;
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