<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <span>开启跳转</span>
      <button @click="changeStateTrue">确认</button>
    </div>
    <div>
      <span>关闭跳转</span>
      <button @click="changeStateFalse">确认</button>
    </div>
    <div>
      <span>{{ isCancelValue ? '关闭' : '开启' }}取消获取数据</span>
      <button @click="isCancelValue = !isCancelValue">确认</button>
    </div>
    <div>
      <span>获取数据</span>
      <button @click="getData">确认</button>
    </div>
    <div>
      <span>并行请求数据</span>
      <button @click="getAllData">确认</button>
    </div>
    <div>
      <span>{{ noGetData ? '获取' : '剔除' }}重复数据请求</span>
      <button @click="noAllData">确认</button>
    </div>
    <el-dialog
      title="登录"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="30%"
    >
      <div>
        <span>账号</span>
        <el-input label="123" v-model="userName" />
      </div>
      <div>
        <span>密码</span>
        <el-input v-model="passWord" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="userLogin">确 定</el-button>
      </span>
    </el-dialog>
    <p>checkboxs: {{ checkboxs }}</p>
    <button @click="reset2">Reset Checkbox</button>
    <p>Vuex Count: {{ vxcount }}</p>
    <button @click="updateVuexcount">VuexCount ++</button>
  </div>
</template>

<script>
// import {
//   removeReqInterceptors,
//   removeResInterceptors
// } from '@/utils/api/baseReq'
import { cancelResquest } from '@/utils/api/baseReq'
import { test, login } from '@/utils/api/server'
export default {
  name: 'HelloWorld',
  data() {
    return {
      dialogVisible: true,
      userName: '',
      passWord: '',
      isCancelValue: false,
      noGetData: false
    }
  },
  props: {
    msg: String
  },
  computed: {
    checkboxs() {
      return this.$store.state.checkbox.checkboxs
    },
    checkboxLength() {
      return this.$store.state.checkbox.checkboxs.length
    },
    vxcount() {
      return this.$store.state.count.vxcount
    }
  },
  methods: {
    reset() {
      this.$store.dispatch('reset')
    },
    async reset2() {
      console.log('reset2')
      while (this.checkboxs.length > 0) {
        await new Promise((resolve) =>
          setTimeout(() => {
            this.$store.commit('pop')
            resolve('done')
          }, 10)
        )
      }
    },
    changeStateTrue() {
      this.$store.commit('setChange', true)
    },
    changeStateFalse() {
      this.$store.commit('setChange', false)
    },
    isCancel() {
      setTimeout(() => {
        console.log('取消请求')
        cancelResquest()
      }, 10)
    },
    getData() {
      console.log('get数据')
      // removeReqInterceptors()
      // removeResInterceptors()
      test()
      if (this.isCancelValue) {
        this.isCancel()
      }
    },
    getAllData() {
      Promise.all([test(), test(), test()]).then(
        (arr) => {
          console.log('并行数据请求完成')
          console.log(arr)
        },
        (err) => {
          console.log('出现问题了！', err)
        }
      )
    },
    noAllData() {
      this.noGetData = !this.noGetData
      localStorage.setItem('noGetData', this.noGetData)
    },
    userLogin() {
      login({
        userName: this.userName,
        passWord: this.passWord
      }).then(
        (res) => {
          console.log('触发成功then回调')
          console.log(res)
          this.dialogVisible = false
          this.$message({
            message: '登入成功，欢迎访问',
            type: 'success'
          })
        },
        (rej) => {
          console.log('触发失败then回调')
          console.log(rej)
          this.$message({
            message: '登入失败，请检查账号或密码',
            type: 'error'
          })
        }
      )
    },
    updateVuexcount() {
      this.$store.commit('updateVxcount', 1)
    }
  },
  beforeCreate() {
    localStorage.setItem('noGetData', false)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-input {
  display: inline-block;
  width: 70%;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
