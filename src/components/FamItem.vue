<template>
    <div class="document">
        <div>
            <div class="title">
                <router-link class="document_title" :to="`/smk/document/${fam.document_id}`">
                    <span v-html="fam.document_code"></span>
                    <span>&nbsp;</span>
                    <span v-html="fam.document_name"></span>
                </router-link>
            </div>
            
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import authHeader from '@/services/auth-header';
import { auth } from '@/store/auth.module'
export default {
    props: {
        fam: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
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