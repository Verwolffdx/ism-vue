<template>
    <div class="header font-normal">

        <div>
            <router-link class="logo" to="/smk">ИСМ ЛГТУ</router-link>
        </div>
        <div class="profile" @click="toggle" v-if="this.isAuth.state.user != null">
            <img class="user_icon" src="@/../public/user.png" alt="">
            <div class="user_name"> {{ this.username }}</div>
            <p :class="{ menu_btn_open: this.dropdownOpen }" class="menu_btn_close"></p>
            <div v-if="this.dropdownOpen" class="menu">
                <div class="menu-item" @click="toFav">Избранное</div>
                <div class="menu-item" v-show="isAdmin" @click="this.$router.push('/smk/create')">Создание документа</div>
                <div class="menu-item" v-show="isAdmin" @click="this.$router.push('/smk/register')">Регистрация пользователя</div>
                <div class="menu-item" v-show="isAdmin" @click="this.$router.push('/smk/report')">Лист ознакомления</div>
                <div class="menu-item" @click.prevent="logOut">Выход</div>
            </div>
        </div>
    </div>
</template>

<script>
import { auth } from '@/store/auth.module'
export default {
    name: "header-item",
    data() {
        return {
            isAdmin: "",
            username: "",
            dropdownOpen: "",
            isAuth: auth
        }
    },
    mounted() {
        // console.log(auth.state.user.fio)
        if (this.isAuth.state.user != null) {
            this.isAdmin = auth.state.user.roles.includes('ROLE_ADMIN'),
            this.username = auth.state.user.fio,
            this.dropdownOpen = false
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/login');
        },
        toFav() {
            this.$router.push('/smk/favorites')
        },
        toggle() {
            this.dropdownOpen = !this.dropdownOpen
        }
    }
}
</script>

<style>
.menu {
    position: absolute;
    top: 0;
    right: 0;
    border: 0.5px solid gainsboro;
    margin-top: 60px;
    margin-right: 30px;
    background-color: white;
    font-size: 16px;
    line-height: 24px;
}

.menu-item {
    padding: 3px 5px;
    cursor: pointer;
}

.menu-item:hover {
    background-color: #B6CFF1;
}

.menu_btn_close {
    height: 10px;
    width: 10px;
    border: solid #B6CFF1;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    padding: 3px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}

.menu_btn_open {
    border-color: gray;
}

.menu_btn_close:hover {
    border-color: gray;
}

.logo {
    font-weight: 500;
    font-size: 24px;
    line-height: 24px;
    margin-left: 35px;
    font-style: bold;
    text-decoration: none;
    margin-right: 30px;
    color: #EEF5EE;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    border-bottom: 1px solid black;
    min-width: 100%;
    background-color: #284469;
}

.profile {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-right: 15px;
    max-width: 25%;
    
    cursor: pointer;
}

.user_icon {
    width: 45px;
}

.user_name {
    margin: 0 10px;
    font-size: 16px;
    color: #EEF5EE;
}
</style>