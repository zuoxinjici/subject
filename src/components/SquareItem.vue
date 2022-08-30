<template>
  <div class="square" :style="styleColor">
    <!-- <p  @click="visible = !visible">Square</p> -->
    <p>props1:{{props1}}</p>
    <p :style="{color:theme.background}">$attrs:{{$attrs}}</p>
    <div class="children">
      
      <TriangleItem v-if="visible" v-bind="$attrs" v-on="$listeners" @setRectColor="setColor"></TriangleItem>
    </div>
  </div>
</template>
<script>
import TriangleItem from "./TriangleItem.vue";
// import { graph, graphCN } from './dic';
export default {
  components: { 
    TriangleItem 
  //TriangleItem: () => import('./TriangleItem.vue'),
  },
  props:{
    props1:{
      type:String
    }
  }, 
  inject:['theme'],
  data() {
    return {
      visible: true,
      styleColor:{
        background:'gold'
      }
    }
  },
  methods:{
    setColor(){
      this.styleColor.background=this.styleColor.background==='gold'?'blue':'gold'
    }
  },
  // beforeCreate() {
  //   console.log("%c%s %c%s: %cbeforeCreate", 'color: gold', graph[1], 'color: black', graphCN[1], 'color: green');
  // },
  // created() {
  //   console.log("%c%s %c%s: %ccreated", 'color: gold', graph[1], 'color: black', graphCN[1], 'color: green');
  // },
  // beforeMount() {
  //   console.log("%c%s %c%s: %cbeforeMount", 'color: gold', graph[1], 'color: black', graphCN[1], 'color: brown');
  // },
  // mounted() {
  //   console.log("%c%s %c%s: %cmounted", 'color: gold', graph[1], 'color: black', graphCN[1], 'color: brown');

  // },
  // beforeUpdate() {
  //   console.log("%c%s %c%s: %cbeforeUpdate", 'color: gold', graph[1], 'color: black', graphCN[1], 'color: green');
  // },
  // updated() {
  //   console.log("%c%s %c%s: %cupdated", 'color: gold', graph[1], 'color: black', graphCN[1], 'color: green');
  // },
  // beforeDestroy() {
  //   console.log("%c%s %c%s: %cbeforeDestroy", 'color: gold', graph[1], 'color: black', graphCN[1], 'color: red');
  // },
  // destroyed() {
  //   console.log("%c%s %c%s: %cdestroyed", 'color: gold', graph[1], 'color: black', graphCN[1], 'color: red');
  // },
};
</script>
<style scoped>
.square {
  width: 800px;
  height: 400px;
  background-color: gold;
}
.children {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
p:nth-child(n+1) {
  font-size: 18px;
}
</style>
