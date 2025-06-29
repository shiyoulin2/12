<template>
  <div class="edit-animal-container" v-if="animal">
    <el-card>
      <template #header>
        <div class="clearfix">
          <span>编辑动物</span>
        </div>
      </template>
      
      <el-form :model="animalForm" :rules="rules" ref="animalFormRef" label-width="120px" class="animal-form">
        <el-form-item label="ID">
          <el-input v-model="animalForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="animalForm.name"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="animalForm.type" placeholder="请选择类型">
            <el-option label="狗狗" value="狗狗"></el-option>
            <el-option label="猫咪" value="猫咪"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品种" prop="breed">
          <el-input v-model="animalForm.breed"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="animalForm.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="animalForm.gender" placeholder="请选择性别">
            <el-option label="公" value="公"></el-option>
            <el-option label="母" value="母"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="animalForm.status" placeholder="请选择状态">
            <el-option label="待领养" value="待领养"></el-option>
            <el-option label="已被领养" value="已被领养"></el-option>
            <el-option label="治疗中" value="治疗中"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="健康状况" prop="health">
          <el-input type="textarea" v-model="animalForm.health"></el-input>
        </el-form-item>
        <el-form-item label="性格特点" prop="personality">
          <el-input type="textarea" v-model="animalForm.personality"></el-input>
        </el-form-item>
        <el-form-item label="照片URL" prop="image">
          <el-input v-model="animalForm.image"></el-input>
        </el-form-item>
        <el-form-item label="救助日期" prop="rescueDate">
          <el-date-picker
            v-model="animalForm.rescueDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
  <div v-else>
    <el-empty description="加载中..."></el-empty>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const route = useRoute()
const store = useStore()

const animalFormRef = ref(null)
const animal = ref(null)

const animalForm = reactive({
  id: 0,
  name: '',
  type: '',
  breed: '',
  age: '',
  gender: '',
  status: '',
  health: '',
  personality: '',
  image: '',
  rescueDate: null
})

const rules = reactive({
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '请选择类型', trigger: 'change' }
  ],
  breed: [
    { required: true, message: '请输入品种', trigger: 'blur' }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'change' }
  ],
  image: [
    { required: true, message: '请输入照片URL', trigger: 'blur' }
  ],
  rescueDate: [
    { required: true, message: '请选择救助日期', trigger: 'change' }
  ]
})

const fetchAnimal = async () => {
  try {
    const id = route.params.id
    const animals = await store.dispatch('fetchAnimals')
    const foundAnimal = animals.find(a => a.id === parseInt(id))
    
    if (!foundAnimal) {
      ElMessage.error('未找到该动物信息')
      router.push({ name: 'Animals' })
      return
    }
    
    animal.value = foundAnimal
    
    // 复制数据到表单
    animalForm.id = foundAnimal.id
    animalForm.name = foundAnimal.name
    animalForm.type = foundAnimal.type
    animalForm.breed = foundAnimal.breed
    animalForm.age = foundAnimal.age
    animalForm.gender = foundAnimal.gender
    animalForm.status = foundAnimal.status
    animalForm.health = foundAnimal.health
    animalForm.personality = foundAnimal.personality
    animalForm.image = foundAnimal.image
    animalForm.rescueDate = new Date(foundAnimal.rescue_date)
  } catch (error) {
    ElMessage.error(error)
    router.push({ name: 'Animals' })
  }
}

const handleSubmit = async () => {
  try {
    await animalFormRef.value.validate()
    
    const formData = {
      ...animalForm,
      rescue_date: animalForm.rescueDate
    }
    
    await store.dispatch('updateAnimal', {
      id: animalForm.id,
      animalData: formData
    })
    
    ElMessage.success('更新成功')
    router.push({ name: 'Animals' })
  } catch (error) {
    ElMessage.error(error || '更新失败')
  }
}

const handleCancel = () => {
  router.push({ name: 'Animals' })
}

onMounted(fetchAnimal)
</script>

<style scoped>
.edit-animal-container {
  max-width: 1200px;
  margin: 0 auto;
}

.animal-form {
  padding: 20px;
}
</style>
    