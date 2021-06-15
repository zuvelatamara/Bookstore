<template>
  <b-navbar toggleable>
    <b-navbar-brand to="/" class='navbar-title'>All Booked Up Shop</b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle-collapse">
      <template #default="{ expanded }">
        <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
        <b-icon v-else icon="chevron-bar-down"></b-icon>
      </template>
    </b-navbar-toggle>

    <b-collapse class='navbar-collapse' id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/home">Home</b-nav-item>
        <b-nav-item to="/about">About</b-nav-item>
        <b-nav-item v-if="isLoggedIn" to="/products">Products</b-nav-item>
        <b-nav-item v-if="!isLoggedIn" to="/login">Login</b-nav-item>
        <b-nav-item v-if="isLoggedIn" @click="logout()">Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    methods: {
      logout() {
        this.$store.dispatch("logout");
      }
    },
    //computed se koristi za dinamicke rekalkulacije i uvek ima return
    computed: {
    ...mapState(["userProfile"]),
    //Ako je korisnik ulogovan, prikazi samo logout
    //Ako nije, prikazi samo login
    isLoggedIn() {
      return Object.keys(this.userProfile).length > 1
    }
  },
  }

</script>

<style scoped>
@import '../scss/header.css';
</style>

