<template>
  <div class="rect" :style="styleColor">
    <p @click="visible = !visible">Rect</p>
    <p>name:{{ name }}</p>
    <div class="children">
      <SquareItem
        v-if="visible"
        :props1="practice1"
        :props2="practice2"
        :props3="practice3"
        @setRectColor="setColor"
      ></SquareItem>
    </div>
  </div>
</template>

<script>
import { graph, graphCN } from "./dic";
export default {
  components: {
    SquareItem: () => import("./SquareItem.vue"),
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
  methods: {
    setColor() {
      this.styleColor.background =
        this.styleColor.background === "green" ? "orange" : "green";
      this.name = this.name === "abc" ? "cba" : "abc";
    },
  },
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
