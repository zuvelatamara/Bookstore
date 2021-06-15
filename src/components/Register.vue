<template>
  <form @submit.prevent class="register__form">
    <h1 class="register__form-title">Register</h1>
    <label style="font-weight: bolder" for="fname">First Name</label>
    <input
      v-model="registerForm.name"
      type="text"
      id="fname"
      name="firstname"
      placeholder="Your name.."
    />
    <label style="font-weight: bolder" for="lname">Last Name</label>
    <input
      v-model="registerForm.lastName"
      type="text"
      id="lname"
      name="lastname"
      placeholder="Your last name.."
    />
    <label style="font-weight: bolder" for="email">E-mail</label>
    <input
      v-model="registerForm.email"
      type="email"
      id="email"
      name="email"
      placeholder="Your email address.."
    />
    <label style="font-weight: bolder" for="password">Password</label>
    <!-- <password
      class="password"
      :placeholder="placeholder"
      :secureLength="secureLength"
      v-model="registerForm.password">
    </password> -->
     <input
      v-model="registerForm.password"
      type="password"
      id="password"
      name="password"
      placeholder="Password.."
    />
    <label style="font-weight: bolder" for="password">Repeat Password</label>
    <input
      v-model="repeatedPassword"
      type="password"
      id="repeatpassword"
      name="repeatpassword"
      placeholder="Re-type your Password.."
    />
    <div class="terms-wrapper">
      <label style="font-weight: bolder" for="agree">
        <input v-model="isChecked" type="checkbox" id="checkboxAgree" />
        I agree to the terms of service.
      </label>
    </div>
    <div class="register-button-wrapper">
      <button
        :disabled="
          !isChecked ||
          registerForm.name === '' ||
          registerForm.lastName === '' ||
          registerForm.email === '' ||
          registerForm.password === '' ||
          registerForm.password.length < 6
        "
        id="submit-button"
        class="submit-button"
        @click="register"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script>
//import Password from 'vue-password-strength-meter'
export default {
  data() {
    return {
      registerForm: {
        name: "",
        lastName: "",
        email: "",
        password: "",
      },
      placeholder: 'Enter at least 6 character',
      secureLength: 6, // minimum password
      isChecked: false,
    };
  },
  methods: {
    register() {
      this.$store.dispatch('register', {
        name: this.registerForm.name,
        lastName: this.registerForm.lastName,
        email: this.registerForm.email,
        password: this.registerForm.password
      })
      console.log('usao u register');
      // setTimeout(() => {
      //   this.$router.push('/');
      // }, 1000)
    }
  }
};
</script>

<style scoped>
@import '../scss/register.css';
</style>
