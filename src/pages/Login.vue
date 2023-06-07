<template>
    <div>
        <header-item></header-item>
        <div class="auth-page">
            <Form @submit="handleLogin" :validation-schema="schema" class="form">
                <div class="form-group">
                    <label for="username">Логин</label>
                    <Field name="login" as="my-input">
                        <!-- <input name="login" type="text" class="input" placeholder="Введите логин"> -->
                    </Field>
                    <ErrorMessage name="login" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="password">Пароль</label>
                    <Field name="password" type="password" as="my-input">
                        <!-- <input name="password" type="password" class="input" placeholder="Введите пароль"> -->
                    </Field>
                    <ErrorMessage name="password" class="error-feedback" />
                </div>

                <!-- <div >
                <button class="btn" :disabled="loading">
                    <span v-show="loading" class="spinner">Загрузка</span>
                    <span>Войти</span>
                </button>
            </div> -->

                <my-button :disabled="loading">Войти</my-button>
                <span v-show="loading" class="spinner">Загрузка</span>

                <div class="form-group">
                    <div v-if="message" class="alert alert-danger" role="alert">
                        {{ message }}
                    </div>
                </div>
            </Form>

            <!-- Без vee-validate -->
            <!-- <form @submit="handleLogin">
                <div class="form-group">
                    <label for="login">Логин</label>
                    <input v-model="user.login" name="login" type="text" class="form-control" />
                    
                </div>
                <div class="form-group">
                    <label for="password">Пароль</label>
                    <input v-model="user.password" name="password" type="password" class="form-control" />
                    
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block" :disabled="loading">
                        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                        <span>Авторизоваться</span>
                    </button>
                </div>

                <div class="form-group">
                    <div v-if="message" class="alert alert-danger" role="alert">
                        {{ message }}
                    </div>
                </div>
            </form> -->

        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
    name: "LoginComponent",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            login: yup.string().required("Введите логин!"),
            password: yup.string().required("Введите пароль!"),
        });

        return {
            loading: false,
            message: "",
            schema
            //Без vee-validate
            // user: {
            //     login: "",
            //     password: ""
            // }
        }
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    created() {
        if (this.loggedIn) {
            this.$router.push("/smk");
        }
    },
    methods: {
        handleLogin(user) {
            this.loading = true;

            this.$store.dispatch("auth/login", user).then(
                () => {
                    this.$router.push("/smk");
                },
                (error) => {
                    this.loading = false;
                    console.log(error)
                    switch (error.response.status) {
                        case 401:
                            this.message = "Неверный логин или пароль"
                            break;

                        default:
                            this.message = "Ошибка авторизации"
                            break;
                    }
                    // this.message = 
                    // this.message =
                    //     (error.response &&
                    //         error.response.data &&
                    //         error.response.data.message) ||
                    //     error.message ||
                    //     error.toString();
                }
            );
        },
    },
}
</script>

<style scoped>
.auth-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
}

.form-group {
    margin: 5px 0 5px 0;
    width: 100%;
}

.profile-img {
    width: 96px;
    height: 96px;
    margin: 0 auto 50px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}

label {
    width: 40%;
}

.btn {
    padding: 10px 15px;
    background: none;
    color: black;
    border: 1px solid black;
    border-radius: 5px;
    margin: auto;
}

.input {
    width: 100%;
    border: 1px solid black;
    padding: 10px 15px;
    margin: 5px 0;
    outline: none;
}

/* label {
    display: block;
    margin-top: 10px;
}

.card-container.card {
    max-width: 350px !important;
    padding: 40px 40px;
}

.card {
    background-color: #f7f7f7;
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    margin-top: 50px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}

.error-feedback {
    color: red;
} */
</style>