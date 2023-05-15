<template>
    <div class="header font-normal">

        <div>
            <router-link class="logo" to="/smk">ИСМ ЛГТУ</router-link>
            <my-button v-show="isAdmin" @click="this.$router.push('/admin')">Панель администирования</my-button>
        </div>
        <div class="profile">
            <img class="user_icon" src="@/../public/user.png" alt="">
            <div class="user_name"> {{ this.username }}</div>
            <my-button @click.prevent="logOut">Выйти</my-button>
        </div>
    </div>
</template>

<script>
import { auth } from '@/store/auth.module'
export default {
    name: "header-item",
    data() {
        return {
            isAdmin: auth.state.user.roles.includes('ROLE_ADMIN'),
            username: auth.state.user.fio
        }
    },
    mounted() {
        console.log(auth.state.user.fio)
    },
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/login');
        }
    }
}
</script>

<style>
.header .logo {
    font-weight: 500;
    font-size: 24px;
    line-height: 24px;
    margin-left: 35px;
    font-style: bold;
    color: black;
    text-decoration: none;
    margin-right: 30px;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    border-bottom: 1px solid black;
}

.profile {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-right: 15px;
    max-width: 25%;
}

.user_icon {
    width: 45px;
}

.user_name {
    margin: 0 10px;
}
</style>