<template>
  <div class="rect" :style="styleColor">
    <p @click="visible = !visible">Rect</p>
    <p>name:{{ name }}</p>
    <!-- <button @click="count++">RectCount1 {{ count }}</button>
    <p>computed: {{ countListen }}</p>
    <p>watch: {{ countWatcher }}</p>
    <p>RectCount2: {{ rectCount }}</p> -->
    <div class="children">
      <SquareItem
        v-if="visible"
        :props1="practice1"
        :props2="practice2"
        :props3="practice3"
        @setRectColor="setColor"
      ></SquareItem>

      <!-- <CircleItem v-if="visible" :rectCount.sync="rectCount"></CircleItem> -->
    </div>
  </div>
</template>

<script>
//import Vue from "vue";
//mport CircleItem from "./CircleItem.vue";
//import SquareItem from "./SquareItem.vue";
import { graph, graphCN } from "./dic";
export default {
  components: {
    //CircleItem,
    //SquareItem,
    // 下面这种写法会在父组件 mounted 后，再加载子组件
    // beforeUpdate -> 子组件渲染 -> updated
    // 与 Vue 的渲染机制有关（？
    // 完成第一次加载后，后续切换页面等重新渲染，生命周期关系同预期则一致
    SquareItem: () => import("./SquareItem.vue"),
    // CircleItem: () => import('./CircleItem.vue'),
  },
  provide() {
    return {
      theme: this.styleColor,
      name: this.name,
    };
  },
  data() {
    return {
      count: 0,
      rectCount: 0,
      countWatcher: 0,
      graph,
      graphCN,
      visible: true,
      practice1: "practice1",
      practice2: "practice2",
      practice3: "practice3",
      styleColor: {
        background: "orange",
      },
      name: "abc",
    };
  },
  // computed: {
  //   countListen() {
  //     console.log(
  //       "%c%s %c%s: computed",
  //       "color: coral",
  //       graph[0],
  //       "color: black",
  //       graphCN[0],
  //       this.rectCount
  //     );
  //     return this.rectCount;
  //   },
  // },
  // watch: {
  //   rectCount() {
  //     console.log(
  //       "%c%s %c%s: watch",
  //       "color: coral",
  //       graph[0],
  //       "color: black",
  //       graphCN[0],
  //       this.rectCount
  //     );
  //     this.countWatcher = this.rectCount;
  //   },
  // },
  methods: {
    setColor() {
      this.styleColor.background =
        this.styleColor.background === "green" ? "orange" : "green";
      this.name = this.name === "abc" ? "cba" : "abc";
    },
  },
  // beforeCreate() {
  //   console.log(
  //     "%c%s %c%s: %cbeforeCreate",
  //     "color: coral",
  //     graph[0],
  //     "color: black",
  //     graphCN[0],
  //     "color: green"
  //   );
  // },
  // created() {
  //   console.log(
  //     "%c%s %c%s: %ccreated",
  //     "color: coral",
  //     graph[0],
  //     "color: black",
  //     graphCN[0],
  //     "color: green"
  //   );
  // },
  // beforeMount() {
  //   console.log(
  //     "%c%s %c%s: %cbeforeMount",
  //     "color: coral",
  //     graph[0],
  //     "color: black",
  //     graphCN[0],
  //     "color: brown"
  //   );
  // },
  // mounted() {
  //   console.log(
  //     "%c%s %c%s: %cmounted",
  //     "color: coral",
  //     graph[0],
  //     "color: black",
  //     graphCN[0],
  //     "color: brown"
  //   );
  // },
  // beforeUpdate() {
  //   console.log(
  //     "%c%s %c%s: %cbeforeUpdate",
  //     "color: coral",
  //     graph[0],
  //     "color: black",
  //     graphCN[0],
  //     "color: green"
  //   );
  // },
  // updated() {
  //   console.log(
  //     "%c%s %c%s: %cupdated",
  //     "color: coral",
  //     graph[0],
  //     "color: black",
  //     graphCN[0],
  //     "color: green"
  //   );
  // },
  // beforeDestroy() {
  //   console.log(
  //     "%c%s %c%s: %cbeforeDestroy",
  //     "color: coral",
  //     graph[0],
  //     "color: black",
  //     graphCN[0],
  //     "color: red"
  //   );
  // },
  // destroyed() {
  //   console.log(
  //     "%c%s %c%s: %cdestroyed",
  //     "color: coral",
  //     graph[0],
  //     "color: black",
  //     graphCN[0],
  //     "color: red"
  //   );
  // },
};
</script>

<style scoped>
* {
  margin: 10px;
}
.rect {
  width: 800px;
  height: 600px;
  background-color: coral;
}
.children {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
