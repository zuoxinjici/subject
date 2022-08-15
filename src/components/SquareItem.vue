<template>
  <div class="square">
    <p  @click="visible = !visible">Square</p>
    <div class="children">
      <TriangleItem v-if="visible"></TriangleItem>
    </div>
  </div>
</template>
<script>
import TriangleItem from "./TriangleItem.vue";
import { graph, graphCN } from './dic';
export default {
  components: { 
    TriangleItem 
  //TriangleItem: () => import('./TriangleItem.vue'),
  },
  data() {
    return {
      visible: true,
    }
  },
  beforeCreate() {
    console.log("%c%s %c%s: %cbeforeCreate", 'color: gold', graph[1], 'color: black', graphCN[1], 'color: green');
  },
  created() {
    console.log("%c%s %c%s: %ccreated", 'color: gold', graph[1], 'color: black', graphCN[1], 'color: green');
  },
  beforeMount() {
    console.log("%c%s %c%s: %cbeforeMount", 'color: gold', graph[1], 'color: black', graphCN[1], 'color: brown');
  },
  mounted() {
    console.log("%c%s %c%s: %cmounted", 'color: gold', graph[1], 'color: black', graphCN[1], 'color: brown');

  },
  beforeUpdate() {
    console.log("%c%s %c%s: %cbeforeUpdate", 'color: gold', graph[1], 'color: black', graphCN[1], 'color: green');
  },
  updated() {
    console.log("%c%s %c%s: %cupdated", 'color: gold', graph[1], 'color: black', graphCN[1], 'color: green');
  },
  beforeDestroy() {
    console.log("%c%s %c%s: %cbeforeDestroy", 'color: gold', graph[1], 'color: black', graphCN[1], 'color: red');
  },
  destroyed() {
    console.log("%c%s %c%s: %cdestroyed", 'color: gold', graph[1], 'color: black', graphCN[1], 'color: red');
  },
};
</script>
<style scoped>
.square {
  width: 300px;
  height: 300px;
  background-color: gold;
}
.children {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
