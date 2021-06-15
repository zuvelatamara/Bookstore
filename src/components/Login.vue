<template>
  <form @submit.prevent class="login__form">
    <!-- login__form-wrapper -->
    <template>
      <div class="login__form-title-wrapper">
        <h1 class="login__form-title">Login</h1>
      </div>
      <label style="font-weight: bolder" for="email">E-mail</label>
      <input
        v-model.trim="loginForm.email"
        type="email"
        id="email"
        name="email"
        placeholder="Your email address.."
      />

      <label style="font-weight: bolder" for="password">Password</label>
      <input
        v-model.trim="loginForm.password"
        type="password"
        id="password"
        name="password"
        placeholder="Password.."
      />

      <div class="login-button">
        <button
            :disabled="loginForm.email === '' || loginForm.password === ''"
            id="submit-button"
            class="submit-button"
            @click="login()">
          Submit
        </button>
        <!-- <input
          @click="login()" type="submit" value="Submit" /> -->
      </div>
    </template>
    <template>
      <div style="text-align: center" class="register__link-wrapper">
        <h2>
          <router-link class="link" to="/register">
            Still don't have an account?
          </router-link>
        </h2>
        <!-- <h3 id="information" style="display: none" class="info">Make sure to Register in order to <br> contribute to our Recipes List.</h3> -->
        <div class="register-button">
          <h1>
            <router-link class="button-link" to="/register">
              Go and Register
            </router-link>
          </h1>
        </div>
      </div>
    </template>
  </form>
  <!-- login__form-wrapper -->
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.loginForm.email,
        password: this.loginForm.password,
      });
      console.log('usao u login');
      // setTimeout(()=> {
      //   this.$router.push('/recipes');
      // }, 100);
    },
  },
};
</script>

<style scoped>
@import '../scss/login.css';
</style>
