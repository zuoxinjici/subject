
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <span>开启跳转</span>
      <button @click="changeStateTrue">确认</button>
    </div>
    <div>
      <span>关闭跳转</span>
      <button @click="changeStateFalse">确认</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    changeStateTrue() {
      this.$store.commit('setChange', true)
    },
    changeStateFalse() {
      this.$store.commit('setChange', false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
