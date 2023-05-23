<template>
    <div>
        <header-item></header-item>
        <div class="workArea font-normal">
            <div class="hierarchy">

                <hierarchy></hierarchy>

                <hr>

            </div>

            <div class="searchArea">
                <p class="pageTitle">Избранное</p>
                <hr>
                <favorite-list :documents="favoriteDocuments" :templates="favoriteTamplates"></favorite-list>
            </div>

        </div>
    </div>
</template>

<script>
import FavoriteList from '@/components/FavoriteList'
import { auth } from '@/store/auth.module'
import authHeader from '@/services/auth-header';
import axios from 'axios'

export default {
    components: {
        FavoriteList
    },
    data() {
        return {
            favoriteDocuments: [],
            favoriteTamplates: [],
        }
    },
    mounted() {
        this.documentsLoading = true
        this.getFavoriteDocuments()
    },
    methods: {
        async getFavoriteDocuments() {
            try {

                const response = await axios.get('http://localhost:8080/api/v2/smk/favorites/' + auth.state.user.id,
                    { headers: authHeader() },
                )

                if (response.status === 200) {
                    response.data.forEach(e => {
                        this.favoriteDocuments.push({
                            id: e.document_id,
                            title: e.document_name,
                            code: e.document_code,
                            isFavorite: true
                        })
                    })
                }
            } catch (e) {
                alert(e)
                console.log(e)

            } finally {
                this.documentsLoading = false
                this.isSearched = true
            }

        }
    }
}
</script>

<style scoped>
.pageTitle {
    font-weight: 400;
    font-size: 22px;
}

.workArea {
    display: flex;
    flex-direction: row;
}

.hierarchy {
    display: flex;
    flex-direction: column;
    min-width: 250px;
    width: 15%;
    /* border: 1px solid black; */
    padding: 15px 35px;
}

.searchArea {
    display: flex;
    flex-direction: column;
    width: 60%;
    padding: 10px;
    padding: 10px 5%;
}

.searchBar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    width: 100%;
    border: 1px solid black;
    border-radius: 5px;
    margin-top: 10px;
}

.searchInput {
    display: flex;
    border: none;
    padding: 10px 10px;
    width: 95%;
    outline: none;
    margin-left: 5px;
}

.searchBtn {
    display: flex;
    border: none;
    background: url('../../public/search.png');
    background-repeat: no-repeat;
    background-size: 15px 15px;
    background-position: center;
    width: 5%;
    margin-right: 5px;
}





hr {
    margin: 20px 0;
}
</style>