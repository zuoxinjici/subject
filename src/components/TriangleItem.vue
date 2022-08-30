<template>
  <div class="triangle">
    <button @click="setColor">color</button>

    <p>props2:{{props2}}</p>
    <p :style="{color:theme.background}">props3:{{props3}}</p>
    <p>name:{{name}}</p>
  </div>
</template>
<script>
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