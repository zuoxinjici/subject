<template>
  <div class="triangle">
    <p>Triangle</p>
  </div>
</template>
<script>
import { graph, graphCN } from './dic';
export default {
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
}
</script>
<style scoped>
.triangle {
  width: 0;
  height: 0;
  border-left: 100px solid transparent;
  border-right: 100px solid transparent;
  border-bottom: 200px solid chocolate;
}

p {
  position: relative;
  left: -54px;
  bottom: -80px;
}
</style>