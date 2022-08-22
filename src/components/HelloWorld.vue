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
    <div>
      <p>checkboxs: {{ checkboxs }}</p>
      <p>Vuex Count: {{ vxcount }}</p>
      <button @click="updateVuexcount">VuexCount ++</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  computed: {
    checkboxs() {
      return this.$store.state.checkboxs;
    },
    vxcount() {
      return this.$store.state.vxcount;
    },
  },
  methods: {
    changeStateTrue() {
      this.$store.commit("setChange", true);
    },
    changeStateFalse() {
      this.$store.commit("setChange", false);
    },
    updateVuexcount() {
      this.$store.commit("updateVxcount", 1);
    },
  },
};
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
