<template>
  <div class="triangle">
    <button @click="setColor">color</button>

    <p>props2:{{props2}}</p>
    <p :style="{color:theme.background}">props3:{{props3}}</p>
    <p>name:{{name}}</p>
  </div>
</template>
<script>
import { graph, graphCN } from './dic';
export default {
  props:{
    props2:{
      type:String
    },
    props3:{
      type:String
    }
  },
  inject:['theme','name'],
  beforeCreate() {
    console.log("%c%s %c%s: %cbeforeCreate", 'color: chocolate', graph[2], 'color: black', graphCN[2], 'color: green');
  },
  created() {
    console.log("%c%s %c%s: %ccreated", 'color: chocolate', graph[2], 'color: black', graphCN[2], 'color: green');
  },
  beforeMount() {
    console.log("%c%s %c%s: %cbeforeMount", 'color: chocolate', graph[2], 'color: black', graphCN[2], 'color: brown');
  },
  mounted() {
    console.log("%c%s %c%s: %cmounted", 'color: chocolate', graph[2], 'color: black', graphCN[2], 'color: brown');

  },
  beforeUpdate() {
    console.log("%c%s %c%s: %cbeforeUpdate", 'color: chocolate', graph[2], 'color: black', graphCN[2], 'color: green');
  },
  updated() {
    console.log("%c%s %c%s: %cupdated", 'color: chocolate', graph[2], 'color: black', graphCN[2], 'color: green');
  },
  beforeDestroy() {
    console.log("%c%s %c%s: %cbeforeDestroy", 'color: chocolate', graph[2], 'color: black', graphCN[2], 'color: red');
  },
  destroyed() {
    console.log("%c%s %c%s: %cdestroyed", 'color: chocolate', graph[2], 'color: black', graphCN[2], 'color: red');
  },
  methods:{
    setColor(){
      this.$emit('setRectColor')
    }
  }
}
</script>
<style scoped>
.triangle {
  width: 0;
  height: 0;
  border-left: 200px solid transparent;
  border-right: 200px solid transparent;
  border-bottom: 300px solid chocolate;
}
button {
  position: relative;
  left: -24px;
  bottom: -80px;
}
p {
  position: relative;
  left: -64px;
  bottom: -81px;
  font-size: 18px;
}
</style>