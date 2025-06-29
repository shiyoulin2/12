<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="logo">流浪动物救助中心</div>
          </el-col>
          <el-col :span="12" class="text-right">
            <el-button v-if="!isAuthenticated" @click="login">登录</el-button>
            <el-button v-else @click="logout">退出登录</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>© 2023 流浪动物救助中心 版权所有</el-footer>
    </el-container>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const isAuthenticated = computed(() => {
  return store.state.token
})

const login = () => {
  router.push({ name: 'Login' })
}

const logout = () => {
  store.dispatch('logout')
  router.push({ name: 'Home' })
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}

.el-header {
  background-color: #393D49;
  color: #fff;
  line-height: 60px;
}

.el-footer {
  background-color: #393D49;
  color: #fff;
  line-height: 60px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  padding: 20px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  padding-left: 20px;
}

.text-right {
  text-align: right;
  padding-right: 20px;
}
</style>
    