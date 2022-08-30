# 第三次课题

## 课题目标

1. Vuex 的基本用法及进阶
2. Axios 基本用法、实现原理、请求中心（请求和响应的拦截、全局处理等），拓展其他请求方法。

## 第二次课题

### `$attrs` 和 `$listeners`

通过上一次的课题分享，我发现对于隔代组件通信上基本没有什么了解，所以针对这方面做了一些学习。

隔代组件通信方法：eventbus，vuex，ref嵌套，props嵌套，`$attrs`，provide

对于`$ref`嵌套和props嵌套这种隔代通信稍显复杂。

`$attr`和`$listener`实际上是一种语法糖一样的API，相当于将嵌套的props改成了更加简便的写法，通过`$attr`和`$listener`代替需要隔代传递的数据，简化代码。

`$attrs` 会包含父组件中没有被 prop 接收的所有属性（不包含class 和 style 属性），可以通过 `v-bind="$attrs"` 直接将这些属性传入内部组件。

`$listeners` 会包含所有父组件中的 v-on 事件监听器 (不包含 .native 修饰器的) ，可以通过 `v-on="$listeners"` 传入内部组件。

```html
<child v-bind="$attrs" v-on="$listeners"></child>
```

但是我们注意到，`$listeners`是可以把父组件所有的事件监听器都传递下去的，但是`$attrs`只会

传递中间组件没用到的数据，因此如果多个组件同时用到某个数据，就需要写多个props才能实现，也会冗余。这时候可以使用provide和inject。

`provide` 和 `inject` 需要在一起使用，它可以使一个祖先组件向其所有子孙后代注入一个依赖，可以指定想要提供给后代组件的数据/方法，不论组件层次有多深，都能够使用。

```jsx
provide: {
        author: 'yushihu',
    },

inject: ['author'],

provide: {
        author:()=>this.author,
    },
```

可以看做一个大范围有效的props，但是并不是响应式的，需要用箭头函数修改为响应式。

如果使用父组件的方法，可以把父组件实例作为参数传递，但是会显得冗余。

但是`$attrs`和`$listener`,`provide`和`inject`相对于层层嵌套的方法仍旧有很大优势，可以根据实际情况选择。

### **watch**

性能问题

大量使用`watch`容易造成逻辑混乱，多个`watch`嵌套循环调用，会造成死循环。

vue2和vue3的实现区别

vue2使用了原生的`Object.defineProperty`方法，对属性的`getter`和`setter`方法进行了重定义

```jsx
function defineReactive(obj, key, val, customSetter, shallow){
    //监听属性key
    //关键点：在闭包中声明一个Dep实例，用于保存watcher队列
    var dep = new Dep();
    var getter = property && property.get;
    var setter = property && property.set;

    if(!getter && arguments.length === 2) {
        val = obj[key];
    }
    //执行observe，监听属性key所代表的值val的子属性
    var childOb = observe(val);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            //获取值
            var value = getter ? getter.call(obj) : val;
            //依赖收集：如果当前有活动的Dep.target(观察者--watcher实例)
            if(Dep.target) {
                //将dep放进当前观察者的deps中，同时，将该观察者放入dep中，等待变更通知
                dep.depend();
                if(childOb) {
                    //为子属性进行依赖收集
                    //其实就是将同一个watcher订阅对象及其属性（一层）
                    childOb.dep.depend();
                }
            }
            return value
        },
        set: function reactiveSetter(newVal) {
            //获取value
            var value = getter ? getter.call(obj) : val;
            if(newVal === value || (newVal !== newVal && value !== value)) {
                return
            }
            if(setter) {
                setter.call(obj, newVal);
            } else {
                val = newVal;
            }
            //新的值需要重新进行observe，保证数据响应式
            childOb = observe(newVal);
            //关键点：遍历dep，通知所有的观察者
            dep.notify();
        }
      });
}

function observe(obj) {
    if (typeof obj !== 'object' || obj == null) {
        return
    }
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}
```

```jsx
//Dep构造函数
var Dep = function Dep() {
    this.id = uid++;
    this.subs = [];
};
//向dep的观察者列表subs添加观察者
Dep.prototype.addSub = function addSub(sub) {
    this.subs.push(sub);
};
//从dep的观察者列表subs移除观察者
Dep.prototype.removeSub = function removeSub(sub) {
    remove(this.subs, sub);
};
Dep.prototype.depend = function depend() {
    //依赖收集：如果当前有观察者，将该dep放进当前观察者的deps中
    //同时，将当前观察者放入观察者列表subs中
    if(Dep.target) {
        Dep.target.addDep(this);
    }
};
Dep.prototype.notify = function notify() {
    // 循环处理，运行每个观察者的update接口
    var subs = this.subs.slice();
    for(var i = 0, l = subs.length; i < l; i++) {
        subs[i].update();
    }
};

//Dep.target是观察者，这是全局唯一的，因为在任何时候只有一个观察者被处理。
Dep.target = null;
//待处理的观察者队列
var targetStack = [];

function pushTarget(_target) {
    //如果当前有正在处理的观察者，将他压入待处理队列
    if(Dep.target) {
        targetStack.push(Dep.target);
    }
    //将Dep.target指向需要处理的观察者
    Dep.target = _target;
}

function popTarget() {
    //将Dep.target指向栈顶的观察者，并将他移除队列
    Dep.target = targetStack.pop();
}
```

Dep是一个订阅中心，负责通知Watcher，实际上是一个watcher队列。每一个被监听的属性都有一个dep实例。

```jsx
function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
    this.vm = vm;
    if(isRenderWatcher) {
        vm._watcher = this;
    }
    vm._watchers.push(this);
    // options
    if(options) {
        this.deep = !!options.deep; //是否启用深度监听
        this.user = !!options.user; //主要用于错误处理，侦听器 watcher的 user为true，其他基本为false
        this.lazy = !!options.lazy; //惰性求职，当属于计算属性watcher时为true
        this.sync = !!options.sync; //标记为同步计算，三大类型暂无
    } else {
        this.deep = this.user = this.lazy = this.sync = false;
    }
    //初始化各种属性和option

    //观察者的回调
    //除了侦听器 watcher外，其他大多为空函数
    this.cb = cb;
    this.id = ++uid$1; // uid for batching
    this.active = true;
    this.dirty = this.lazy; // for lazy watchers
    this.deps = [];
    this.newDeps = [];
    this.depIds = new _Set();
    this.newDepIds = new _Set();
    this.expression = expOrFn.toString();
    // 解析expOrFn，赋值给this.getter
    // 当是渲染watcher时，expOrFn是updateComponent，即重新渲染执行render（_update）
    // 当是计算watcher时，expOrFn是计算属性的计算方法
    // 当是侦听器watcher时，expOrFn是watch属性的名字，this.cb就是watch的handler属性

    //对于渲染watcher和计算watcher来说，expOrFn的值是一个函数，可以直接设置getter
    //对于侦听器watcher来说，expOrFn是watch属性的名字，会使用parsePath函数解析路径，获取组件上该属性的值（运行getter）

    //依赖（订阅目标）更新，执行update，会进行取值操作，运行watcher.getter，也就是expOrFn函数
    if(typeof expOrFn === 'function') {
        this.getter = expOrFn;
    } else {
        this.getter = parsePath(expOrFn);
    }
    this.value = this.lazy ? undefined : this.get();
};
//取值操作
Watcher.prototype.get = function get() {
    //Dep.target设置为该观察者
    pushTarget(this);
    var vm = this.vm;
    //取值
    var value = this.getter.call(vm, vm);
    if (this.deep) traverse(value)//循环添加watcher
    //移除该观察者
    popTarget();
    return value
};
Watcher.prototype.addDep = function addDep(dep) {
    var id = dep.id;
    if(!this.newDepIds.has(id)) {
        //为观察者的deps添加依赖dep
        this.newDepIds.add(id);
        this.newDeps.push(dep);
        if(!this.depIds.has(id)) {
            //为dep添加该观察者
            dep.addSub(this);
        }
    }
};
//当一个依赖改变的时候，通知它update
Watcher.prototype.update = function update() {
    //三种watcher，只有计算属性 watcher的lazy设置了true，表示启用惰性求值
    if(this.lazy) {
        this.dirty = true;
    } else if(this.sync) {
        //标记为同步计算的直接运行run，三大类型暂无，所以基本会走下面的queueWatcher
        this.run();
    } else {
        //将watcher推入观察者队列中，下一个tick时调用。
        //也就是数据变化不是立即就去更新的，而是异步批量去更新的
        queueWatcher(this);
    }
};

//update执行后，运行回调cb
Watcher.prototype.run = function run() {
    if(this.active) {
        var value = this.get();
        if(
            value !== this.value ||
            isObject(value) ||
            this.deep
        ) {
            var oldValue = this.value;
            this.value = value;
            //运行 cb 函数，这个函数就是之前传入的watch中的handler回调函数
            if(this.user) {
                try {
                    this.cb.call(this.vm, value, oldValue);
                } catch(e) {
                    handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
                }
            } else {
                this.cb.call(this.vm, value, oldValue);
            }
        }
    }
};

//对于计算属性，当取值计算属性时，发现计算属性的watcher的dirty是true
//说明数据不是最新的了，需要重新计算，这里就是重新计算计算属性的值。
Watcher.prototype.evaluate = function evaluate() {
    this.value = this.get();
    this.dirty = false;
};

//收集依赖
Watcher.prototype.depend = function depend() {
    var this$1 = this;

    var i = this.deps.length;
    while(i--) {
        this$1.deps[i].depend();
    }
};
function traverse(val) {
    var i, keys;
    // 数组逐个遍历
    if (Array.isArray(val)) {
        i = val.length;
        while (i--) {
            traverse(val[i])
        }
    }
    else {
        keys = Object.keys(val);
        i = keys.length;
        // val[keys[i]] 就是读取值了，然后值的对象就能收集到 watch-watcher
        while (i--) {
            traverse(val[keys[i]])//调用getter
        }
    }
}

```

1. 属性重写getter和setter，对象只递归一层
2. 每个属性维护一个watcher队列
3. Watcher创建，调用属性值，即属性的getter方法，如果有deep，则循环遍历该值的所有子属性的getter
4. 属性getter时将Watcher加入队列，如果有deep，则所有子属性的dep里面都有这个Watcher
5. 属性setter时将队列里的watcher依次调用更新

使用Object.defineProperty这种方式递归复杂，影响性能。除此之外，一个对象或者数组的新增属性或删除属性无法监听到，只能增加set和delete的API。

vue3使用了Proxy对象，可以实现对象完全的监听。Proxy可以劫持对象的增加删除修改操作，也可以劫持数组API，再加上类似的递归属性的操作就可以实现完全的深度监听。

## Vuex

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

### 目录结构

```bash
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```

### 基本用法

```jsx
// 创建 store
import { createApp } from 'vue'
import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      count: 0
    }
  },
	getters: {
	  // 可以接受其他 getter 作为第二个参数，通过属性调用会缓存
	  doneTodosCount (state, getters) {
	    return getters.doneTodos.length
	  }，
		// 通过方法调用，不会缓存
		getTodoById: (state) => (id) => {
	    return state.todos.find(todo => todo.id === id)
		}
	},
	// mutation 不能为异步操作，即必须为同步函数
  mutations: {
    increment (state) {
      state.count++
    }
  },
	// action 可以为异步操作
	actions: {
	  increment ({ commit }) {
	    commit('increment')
	  }
	},
	modules: {
		a: moduleA,
	},
})

const app = createApp({ /* 根组件 */ })

// 将 store 实例作为插件安装
app.use(store)

// 获取 state 对象通常使用计算属性 computed
compute: {
	count() {
		return this.$store.state.count;
	},
	...mapState({
		// ...
	})，
	doneTodos() {
		return this.$store.getters.doneTodos;
	}，
	...mapGetters([
		// ...
	]);
};
// 更改 state 对象状态
this.$store.commit('handle', payload);
// 快捷引入 mutations，使用辅助函数映射
methods: {
  ...mapMutations([
    'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    // `mapMutations` 也支持载荷：
    'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
  ]),
  ...mapMutations({
    add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
  })
}
```

1. getters

通过属性访问具有缓存，通过方法访问没有缓存。

1. mutations

`mutation` 都是同步事务。

每一条 `mutation` 被记录，devtools 都需要捕捉到前一状态和后一状态的快照，而 `mutatin` 触发时，回调函数还没有被调用，实质上任何在回调函数中进行的状态的改变都是不可追踪的。

而且当同时存在多个回调改变同一状态时，无法判断执行顺序。

### 插件

对插件暴露出每次mutation的钩子，每次mutation后自动调用通过`subscribe`注册的选项。

需要在 new Store 时注册，放置在一个单独的 modules 里无效。

初始化时会触发除 `store.subscribe` 的部分，之后只会触发 `store.subscribe` 部分。

### 模块化

1. 通过 `this.$sotre.module.state` 来获取 `state` 。
2. `getter` 、`mutation` 、`action` 都是注册在**全局命名空间**的，想要限制在module内部，需要使用 `namespace: true` 。

```jsx
getters: {
  isAdmin () { ... } // -> getters['account/isAdmin']
},
actions: {
  login () { ... } // -> dispatch('account/login')
},
mutations: {
  login () { ... } // -> commit('account/login')
},
```

1. 动态注册

```jsx
// 注册模块 `myModule`
store.registerModule('myModule', {
  // ...
})
// 注册嵌套模块 `nested/myModule`
store.registerModule(['nested', 'myModule'], {
  // ...
})
// 动态拆卸模块，无法作用于静态模块，即创建 store 时声明的模块
store.unregisterModule(moduleName)
```

1. 模块重用

```jsx
// 使用一个函数来声明模块状态
state: () => ({}),
```

### 表单处理

- Vuex 的思维

```html
<input :value="message" @input="updateMessage">
```

```jsx
computed: {
  ...mapState({
    message: state => state.obj.message
  })
},
methods: {
  updateMessage (e) {
    this.$store.commit('updateMessage', e.target.value)
  }
}
```

- `setter` & `getter`

```html
<input v-model="message">
```

```jsx
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
```

## Axios

Axios是基于promise的网络请求库。

### 基本用法

```jsx
//创建axios实例
const baseAPI = axios.create({
  baseURL: 'http://122.112.142.182:3000',
  timeout: 3000,
})
//常用请求配置
//优先级：请求配置 > 实例配置 > 全局配置
// `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: false, // default
     // `auth` HTTP Basic Auth
  auth: {
    username: 'admin',
    password: '123456'
  },
  //当validateStatus返回值为true不会触发异常
    validateStatus: function(status) {
      return status < 300
    },
    //在数据发送前进行修改
    transformRequest: function(data,headers) {
      console.log('transformRequest修改数据')
      console.log(data)
      console.log(headers)
      data.add = "testAdd"
      console.log(data)
      return qs.stringify(data)
    },
    transformResponse: function(data,headers) {
      console.log('transformResponse修改数据')
      console.log(data)
      console.log(headers)
      console.log(data)
      return qs.stringify(data)
    },
    onUploadProgress: function (progressEvent) {
      // 处理原生进度事件
      console.log('上传进度事件',progressEvent)
    },

    // `onDownloadProgress` 允许为下载处理进度事件
    // 浏览器专属
    onDownloadProgress: function (progressEvent) {
      // 处理原生进度事件
      console.log('下载事件进度',progressEvent)
    },
```

### 实现原理是通过promise对xhr的封装

```jsx
function axios ({method,url}) {
      console.log('axios 函数执行');
      return new Promise((resolve, reject) => {
        // 发送 ajax 请求
        let xhr = new XMLHttpRequest();
        // 初始化
        xhr.open(method, url);
        // 发送
        xhr.send();
        // 绑定事件
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            // 判断成功的条件
            if (xhr.status >= 200 && xhr.status < 300) {
              // 成功的状态
              resolve({
                // 配置对象
                config: config,
                // 响应体
                data: xhr.response,
                // 响应头  字符串  parseHeaders
                headers: xhr.getAllResponseHeaders(),
                // xhr 请求对象
                request: xhr,
                // 响应状态码
                status: xhr.status,
                // 响应状态字符串
                statusText: xhr.statusText
              });
            } else {
              // 失败的状态
              reject(new Error('请求失败 失败的状态码为' + xhr.status));
            }
          }
        }
      });
    }

```

### 请求中心

在请求发送前和接收响应调用then前执行

```jsx
const reqInterceptors = baseAPI.interceptors.request.use(config => {
  console.log('请求拦截器被触发')
  config.headers.Token = 'testToken'
  let noAllData = localStorage.getItem('noGetData')
  console.log(noAllData)
  if(noAllData === 'true'){
    removePending(config)
    config.cancelToken = new CancelToken( c => {
      pending.push({u: config.url+ '&' + config.method, f: c})
    })
  }
  console.log(config)
  return config
}, error => {
  console.log('请求失败拦截器内容')
  console.log(error)
  return Promise.reject(error)
})

const resInterceptors = baseAPI.interceptors.response.use(response => {
  console.log('响应拦截器被触发')
  console.log(response)
  return response.data
}, error => {
  console.log('响应失败拦截器内容')
  console.log(error)
  console.log(error.resquest)
  console.log(error.response)
  return Promise.reject(error)
})
```

### 取消请求（防抖应用）

通过在请求拦截器中通过添加对应取消请求标识，在下一个请求发送前，来取消上一个请求的发送

```jsx
let pending = []
let removePending = (event) => {
  for(let p in pending) {
    if(pending[p].u === event.url + '&' + event.method) {
      pending[p].f('取消请求')
      pending.splice(p,1)
    }
  }
}
const reqInterceptors = baseAPI.interceptors.request.use(config => {
  console.log('请求拦截器被触发')
  config.headers.Token = 'testToken'
  let noAllData = localStorage.getItem('noGetData')
  console.log(noAllData)
  if(noAllData === 'true'){
    removePending(config)
    config.cancelToken = new CancelToken( c => {
      pending.push({u: config.url+ '&' + config.method, f: c})
    })
  }
  console.log(config)
  return config
}, error => {
  console.log('请求失败拦截器内容')
  console.log(error)
  return Promise.reject(error)
})
//单个请求的取消
//在单个请求加入取消标识
const CancelToken = axios.CancelToken
let source = CancelToken.source()
  get({url, params, ...config}) {
    console.log('处理请求')
    console.log(config)
    console.log(reqInterceptors,resInterceptors)
    let options = {}
    let cancel = {
      cancelToken: source.token
    }
    console.log(source)
    if(params) {
      options.params = params
    }
    return baseAPI.get(url,cancel,options)
  },
export function cancelResquest() {
  console.log(source)
  source.cancel('请求取消')
  source = axios.CancelToken.source()
}
```

### 取消请求

将cancelToken中的promise形式的token状态从pending转变为fulfilled状态从而达成取消请求的目的

```jsx
token: CancelToken
promise: Promise
then: ƒ (onfulfilled)
[[Prototype]]: Promise
[[PromiseState]]: "pending"
[[PromiseResult]]: undefined
=>
cancelToken: CancelToken
promise: Promise
then: ƒ (onfulfilled)
[[Prototype]]: Promise
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: CanceledError
```

### 扩展请求

```jsx
axios.get(url[, config])  // 只支持 params 传参
axios.delete(url[, config])  // 只支持 params传参
axios.head(url[, config]) // 只支持 params传参
axios.post(url[, data[, config]]) // 同时支持  data 和 params
axios.put(url[, data[, config]]) // 同时支持  data 和 params
axios.patch(url[, data[, config]]) // 同时支持  data 和 params
axios.put用于更新数据
axios.put('/put', data}).then(
                (res) => {
                    //执行成功后代码处理
                }
            )
axios.patch对put的补充用于局部更新资源用于更新数据
axios.patch('/patch', data}).then(
                (res) => {
                    //执行成功后代码处理
                }
            )
axios.delete删除数据
axios.delete('/delete', {
                parmas:{
                    id:12
                }
            }).then(
                (res) => {
                    //执行成功后代码处理
                }
            )
```