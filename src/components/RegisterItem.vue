<template>
    <div class="document">
        <div>
            <div class="title">
                <router-link class="document_title" :to="`/smk/document/${document.id}`">
                    <span v-html="document.code"></span>
                    <span>&nbsp;</span>
                    <span v-html="document.title"></span>
                </router-link>
                <div>
                    <!-- <my-button @click="deleteDocument">Удалить</my-button> -->
                    <div @click="toFavorite" :class="{ favorite: isFavorite, nofavorite: !isFavorite }"></div>
                </div>
            </div>

            <!-- <my-button class="document_content" v-for="find in document.find" v-html="find.item"></my-button> -->
        </div>
        <div class="document__btns">
            <!-- <my-button @click="$router.push(`/smk/document/${document.id}`)">Открыть</my-button> -->
            <!-- <my-button @click="$emit('remove', document)">Удалить</my-button> -->
            <!-- <my-button @click="toFavorite">
                <span v-if="isFavorite">Убрать из избранного</span>
                <span v-else>Добавить в избранное</span>
            </my-button> -->

        </div>
        <hr>
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
        },
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
.btn-delete {
    background: url("@/../public/favorite.png");
    background-size: contain;
    min-width: 25px;
    height: 25px;
    cursor: pointer;
    background-repeat: no-repeat;
}

.nofavorite {
    background: url("@/../public/nofavorite.png");
    background-size: contain;
    height: 25px;
    min-width: 25px;
    cursor: pointer;
    background-repeat: no-repeat;
}

.favorite {
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