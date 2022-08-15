let mixin = {
  beforeCreate(){
    console.log("我是mixin里面的beforecreate!")
  },
  created() {
    console.log("我是mixin里面的created!")
  },
  beforeMount() {
    console.log("我是mixin里面的beforeMount!")
  },
  mounted() {
    console.log("我是mixin里面的mounted!")
  },
  beforeUpdate(){
    console.log("我是mixin里面的beforeUpdate!")
  },
  updated() {
    console.log("我是mixin里面的updated!")
  },
  beforeDestroy() {
    console.log("我是mixin里面的beforeDestory!")
  },
  destroyed() {
    console.log("我是mixin里面的destoryed!")
  },

  methods: {
    hello() {
      console.log("hello from mixin!")
      this.$router.push('/')
    },
    
  }
}

export default mixin
