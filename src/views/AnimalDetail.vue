<template>
  <div class="animal-detail-container" v-if="animal">
    <el-card>
      <template #header>
        <div class="clearfix">
          <span>{{ animal.name }} - 详情</span>
          <el-button 
            v-if="isAuthenticated"
            style="float: right" 
            type="primary"
            @click="editAnimal">
            编辑
          </el-button>
        </div>
      </template>
      
      <el-row :gutter="20">
        <el-col :span="8">
          <img :src="animal.image" alt="动物照片" class="detail-image">
        </el-col>
        <el-col :span="16">
          <el-form label-width="120px">
            <el-form-item label="ID">
              <el-input v-model="animal.id" disabled></el-input>
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model="animal.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-input v-model="animal.type" disabled></el-input>
            </el-form-item>
            <el-form-item label="品种">
              <el-input v-model="animal.breed" disabled></el-input>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="animal.age" disabled></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-input v-model="animal.gender" disabled></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-tag :type="getStatusType(animal.status)">{{ animal.status }}</el-tag>
            </el-form-item>
            <el-form-item label="健康状况">
              <el-input type="textarea" v-model="animal.health" disabled></el-input>
            </el-form-item>
            <el-form-item label="性格特点">
              <el-input type="textarea" v-model="animal.personality" disabled></el-input>
            </el-form-item>
            <el-form-item label="救助日期">
              <el-input v-model="animal.rescue_date" disabled></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      
      <el-divider></el-divider>
      
      <el-row>
        <el-col :span="24">
          <h3>领养申请</h3>
          <el-button 
            v-if="animal.status === '待领养' && isAuthenticated"
            type="primary"
            @click="applyAdoption">
            申请领养
          </el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
  <div v-else>
    <el-empty description="加载中..."></el-empty>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const route = useRoute()
const store = useStore()

const animal = ref(null)

const isAuthenticated = computed(() => {
  return store.getters.isAuthenticated
})

const getStatusType = (status) => {
  switch (status) {
    case '待领养': return 'success'
    case '已被领养': return 'info'
    case '治疗中': return 'warning'
    default: return ''
  }
}

const fetchAnimal = async () => {
  try {
    const id = route.params.id
    const animals = await store.dispatch('fetchAnimals')
    animal.value = animals.find(a => a.id === parseInt(id))
    
    if (!animal.value) {
      ElMessage.error('未找到该动物信息')
      router.push({ name: 'Animals' })
    }
  } catch (error) {
    ElMessage.error(error)
    router.push({ name: 'Animals' })
  }
}

const editAnimal = () => {
  router.push({ name: 'EditAnimal', params: { id: animal.value.id } })
}

const applyAdoption = () => {
  ElMessageBox.confirm(
    `确定要申请领养 ${animal.value.name} 吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    ElMessage.success('领养申请已提交，我们会尽快与您联系！')
  }).catch(() => {
    ElMessage.info('已取消领养申请')
  })
}

onMounted(fetchAnimal)
</script>

<style scoped>
.animal-detail-container {
  max-width: 1200px;
  margin: 0 auto;
}

.detail-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
}
</style>
    