<template>
    <div class="document">
        <div>
            <router-link class="document_title" :to="`/smk/document/${document.id}`">
                <span v-html="document.code"></span>
                <span>&nbsp;</span>
                <span v-html="document.title"></span>
            </router-link>
            <div class="document_content" v-for="find in document.find" v-html="find.item"></div>
        </div>
        <div class="document__btns">
            <!-- <my-button @click="$router.push(`/smk/document/${document.id}`)">Открыть</my-button> -->
            <!-- <my-button @click="$emit('remove', document)">Удалить</my-button> -->
            <my-button @click="toFavorite">
                <span v-if="isFavorite">Убрать из избранного</span>
                <span v-else>Добавить в избранное</span>
            </my-button>
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
        async toFavorite() {
            try {

                let body = {
                    document_id: this.document.id,
                    user_id: auth.state.user.id
                }


                if (this.isFavorite) {
                    const response = await axios.post('http://localhost:8080/api/v2/smk/deletefavorites', body, {
                        headers: authHeader()
                    })

                    if (response.status == 200) {
                        this.isFavorite = this.isFavorite ? false : true
                        this.document.isFavorite = this.document.isFavorite ? false : true
                    }
                } else {
                    const response = await axios.post('http://localhost:8080/api/v2/smk/addfavorites', body, {
                        headers: authHeader()
                    })

                    if (response.status == 200) {
                        this.isFavorite = this.isFavorite ? false : true
                        this.document.isFavorite = this.document.isFavorite ? false : true
                    }
                }





            } catch (e) {
                console.log(e)
            }
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