<!--
 * @Author: zouyifei@myhexin.com
 * @Date: 2022-08-08 10:17:47
 * @LastEditors: zouyifei@myhexin.com
 * @LastEditTime: 2022-08-08 14:37:29
-->
<template>
  <div class="about" ref="abc">
    <h1>This is an about page</h1>
    <div class="keep">
      <span>缓存的数据为{{ num }}</span>
      <button @click="add">+</button>
      <button @click="reduce">-</button>
    </div>
    <div>
      <span>开启页面缓存</span>
      <button @click="keepAlive">确认</button>
    </div>
    <div>
      <span>关闭页面缓存</span>
      <button @click="dekeepAlive">确认</button>
    </div>
    <div>
      <input type="checkbox" id="cbox1" value="cbox1" v-model="checkboxs" />
      <label for="cbox1">cbox1</label>
      <input type="checkbox" id="cbox2" value="cbox2" v-model="checkboxs" />
      <label for="cbox12">cbox2</label>
      <input type="checkbox" id="cbox3" value="cbox3" v-model="checkboxs" />
      <label for="cbox13">cbox3</label>
      <p>Vuex Count: {{ vxcount }}</p>
      <button @click="updateVuexcount">VuexCount -2</button>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: 'aboutView',
  data() {
    return {
      num: 0,
      checkboxs1: [],
    };
  },
  computed: {
    checkboxs: {
      get() {
        return this.$store.state.checkbox.checkboxs;
      },
      set(value) {
        this.$store.commit("updateCheckboxs", value);
      },
    },
    ...mapState({
      vxcount: (state) => state.count.vxcount,
    }),
  },
  methods: {
    updateVuexcount() {
      this.$store.commit("updateVxcount", -2);
    },
    add() {
      console.log('add')
      this.num = this.num + 1
    },
    reduce() {
      if (this.num > 0) {
        this.num = this.num - 1
      }
    },
    async changeUpdate() {
      await setTimeout(() => {
        console.log('settimeout')
      }, 5000)
    },
    keepAlive() {
      this.$store.commit('setIncludeComponent', 'aboutView')
      console.log(this.$store.state.includeComponent)
    },
    dekeepAlive() {
      this.$store.commit('setIncludeComponent', 'view')
      console.log(this.$store.state.includeComponent)
    }
  },
  beforeCreate() {
    // console.log('-----beforeCreate-----')
    // console.log('num值为'+ this.num)
    // console.log(this.$el)
  },
  created() {
    // console.log('-----created-----')
    // console.log('num值为'+ this.num)
    // console.log(this.$el)
  },
  beforeMount() {
    // console.log('-----beforeMount-----')
    // console.log('num值为'+ this.num)
    // console.log(this.$el)
  },
  mounted() {
    // console.log('-----mounted-----')
    // console.log('num值为'+ this.num)
    // console.log(this.$el)
  },
  beforeUpdate() {
    // console.log('-----beforeUpdate-----')
    // console.log('num值为'+ this.num)
    // console.log(this.$el)
    // console.log('el',this.$refs.abc.innerHTML)
  },
  updated() {
    // console.log('-----updated-----')
    // console.log('num值为'+ this.num)
    // console.log(this.$el)
    // console.log('el',this.$refs.abc.innerHTML)
  },
  beforeDestroy() {
    // console.log('-----beforeDestroy-----')
    // console.log('num值为'+ this.num)
    // console.log(this.$el)
  },
  destroyed() {
    // console.log('-----destroyed-----')
    // console.log('num值为'+ this.num)
    // console.log('el',this.$refs.abc)
  },
  activated() {
    // console.log('-----activated-----')
    // console.log('num值为'+ this.num)
    // console.log(this.$el)
  },
  deactivated() {
    // console.log('-----deactivated-----')
    // console.log('num值为'+ this.num)
    // console.log(this.$el)
  },
};
</script>
