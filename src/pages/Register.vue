<template>
  <header-item></header-item>
  <div class="workArea font-normal">
    <div class="hierarchy">
      <hierarchy></hierarchy>
    </div>
    <div class="register-page">
      <span class="createTitle">Регистрация пользователя</span>
      <hr>
      <Form @submit="handleRegister" :validation-schema="schema" class="form">
        <div v-if="!successful">
          <div class="form-group">
            <span class="field_title" for="fio">ФИО:</span>
            <Field name="fio" type="text" as="my-input" />
          </div>
          <ErrorMessage name="fio" class="error-feedback" />

          <div class="form-group">
            <span class="field_title" for="login">Логин:</span>
            <Field name="login" as="my-input" />
          </div>
          <ErrorMessage name="login" class="error-feedback" />

          <div class="form-group">
            <span class="field_title" for="password">Пароль:</span>
            <Field name="password" type="password" as="my-input" />
          </div>
          <ErrorMessage name="password" class="error-feedback" />

          <div class="form-group">
            <span class="field_title" for="password">Роль:</span>
            <Field name="role" v-model="role">
              <select v-model="role" multiple>
                <option value="user" selected>Пользователь</option>
                <option value="admin">Администратор</option>
              </select>
            </Field>
          </div>
          <ErrorMessage name="role" class="error-feedback" />

          <div class="form-group">
            <span class="field_title" for="login">Отдел:</span>
            <Field name="divisions" v-model="divisionsArray">
            <divisions-tree @addDivision=addDivision></divisions-tree>
            </Field>
          </div>
          <ErrorMessage name="divisions" class="error-feedback" />

          <hr>

          <my-button :disabled="loading">Зарегистрировать</my-button>
          <span v-show="loading" class="spinner"></span>
        </div>
      </Form>

      <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
        {{ message }}
        <my-button @click="reset">Повторить</my-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import DivisionsTree from "@/components/UI/DivisionsTree";

export default {
  name: "RegisterComponent",
  components: {
    Form,
    Field,
    ErrorMessage,
    DivisionsTree,
  },
  data() {
    const schema = yup.object().shape({
      login: yup
        .string()
        .required("Введите логин!")
        .min(3, "Логин слишком короткий")
        .max(20, "Логин не может быть длиннее 20 символов"),
      fio: yup
        .string()
        .required("Введите ФИО")
        .max(50, "ФИО не можеты быть длинее 50 символов"),
      password: yup
        .string()
        .required("Введите пароль")
        .min(6, "Пароль слишком короткий")
        .max(40, "Пароль не можеты быть длинее 40 символов"),
      role: yup
        .array()
        .required("Выберите роль"),
      divisions: yup
        .array()
        .required("Выберите отдел(ы)")
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      roles: ["user", "admin"],
      role: ["user"],
      // tree: [],
      fetchDivisions: [],
      divisionsArray: [],
      divisionTreeData: [
        {
          text: "Ректор",
          state: { checked: false, selected: false, expanded: false },
          id: 1,
          checkable: true,
          nodes: [
            {
              text: "Проректор 1",
              state: { checked: false, selected: false, expanded: false },
              id: 2,
              checkable: true,
            }
          ]
        }
      ],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    // if (this.loggedIn) {
    //   this.$router.push("/profile");
    // }
  },
  methods: {
    addDivision(item) {
      if (this.divisionsArray.includes(item.id)) {
        this.divisionsArray = this.divisionsArray.filter(e => e !== item.division_id)
      }
      else
        this.divisionsArray.push(item.division_id)
    },
    reset() {
      this.successful = false
      this.loading = false
      this.message = ""
      this.role = "user"
    },
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      console.log(user)


      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = "Пользователь успешно зарегистрирован!"
          // this.message = data.message;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.message = "Ошибка регистрации! Повторите попытку позже"
          // this.message =
          //   (error.response &&
          //     error.response.data &&
          //     error.response.data.message) ||
          //   error.message ||
          //   error.toString();
          // this.successful = false;
          // this.loading = false;
        }
      );

    },
  },
};
</script>

<style scoped>
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

.hierarchy_item {
  padding-top: 15px;
}

hr {
  margin: 20px 0;
}

.documentArea {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  padding: 10px 5%;
  font-size: 20px;
  line-height: 24px;
}

.createTitle {
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
}

.register-page {
  /* display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; */

  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 10px 5%;

  /* font-size: 20px;
  line-height: 24px; */
}

.form {
  /* display: flex;
  flex-direction: row;
  align-items: center; */
  padding: 10px;
}

.form-group {
  display: flex;
  flex-direction: row;
  margin: 5px 0 5px 0;
  width: 100%;
  align-items: center;
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

.field_title {
  width: 15%;
}



.input {
  width: 100%;
  border: 1px solid black;
  padding: 10px 15px;
  margin: 5px 0;
  outline: none;
}
</style>
