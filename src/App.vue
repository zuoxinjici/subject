<!--
 * @Author: zouyifei@myhexin.com
 * @Date: 2022-08-08 10:17:47
 * @LastEditors: zouyifei@myhexin.com
 * @LastEditTime: 2022-08-08 14:10:33
-->
<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/practice3">Practice 3</router-link>
    </nav>
    <keep-alive :include="$store.state.includeComponent">
    <router-view/>
    </keep-alive>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // liveComponent: this.$store.state.includeComponent
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 5px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
