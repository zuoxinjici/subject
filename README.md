# 第二次课题

Vue 生命周期钩子 + 路由导航守卫

## 课题目标

1. Vue 生命周期钩子函数和基本用法
2. router 路由导航守卫和基本用法
3. 组件之间生命周期执行顺序
4. mixin 混入的生命周期钩子执行
5. watch 和 computed 的触发时机

### Vue 生命周期钩子函数和基本用法
### router 路由导航守卫和基本用法

### 组件之间生命周期执行顺序
[![父子组件生命周期](https://s1.ax1x.com/2022/08/07/vKXnII.png)](https://imgtu.com/i/vKXnII)  
加载渲染过程  
`父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted`  
销毁过程  
`父beforeDestroy->子beforeDestroy->子destroyed->父destroyed`  
更新过程  
`父beforeUpdate->子beforeUpdate->子updated->父updated`  
### mixin 混入的生命周期钩子执行

### watch 和 computed 的触发时机
第一次渲染时，会触发 `computed` ，但是不会触发 `watch` 。  
组件的数据更新时，触发顺序如下：  
`watch -> beforeUpdate -> computed -> updated`