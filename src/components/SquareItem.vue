<template>
  <div class="square" :style="styleColor">
    <p>props1:{{ props1 }}</p>
    <p :style="{ color: theme.background }">$attrs:{{ $attrs }}</p>
    <div class="children">
      <TriangleItem
        v-if="visible"
        v-bind="$attrs"
        v-on="$listeners"
        @setRectColor="setColor"
      ></TriangleItem>
    </div>
  </div>
</template>
<script>
import TriangleItem from "./TriangleItem.vue";
export default {
  components: {
    TriangleItem,
  },
  props: {
    props1: {
      type: String,
    },
  },
  inject: ["theme"],
  data() {
    return {
      visible: true,
      styleColor: {
        background: "gold",
      },
    };
  },
  methods: {
    setColor() {
      this.styleColor.background =
        this.styleColor.background === "gold" ? "blue" : "gold";
    },
  },
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
p:nth-child(n + 1) {
  font-size: 18px;
}
</style>
