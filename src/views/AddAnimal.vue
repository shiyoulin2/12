<template>
  <div class="add-animal-container">
    <el-card>
      <template #header>
        <div class="clearfix">
          <span>添加动物</span>
        </div>
      </template>
      
      <el-form :model="animalForm" :rules="rules" ref="animalFormRef" label-width="120px" class="animal-form">
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
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const animalFormRef = ref(null)

const animalForm = reactive({
  name: '',
  type: '',
  breed: '',
  age: '',
  gender: '',
  status: '',
  health: '',
  personality: '',
  image: 'https://picsum.photos/seed/animal/400/300',
  rescueDate: new Date()
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

const handleSubmit = async () => {
  try {
    await animalFormRef.value.validate()
    
    const formData = {
      ...animalForm,
      rescue_date: animalForm.rescueDate
    }
    
    await store.dispatch('addAnimal', formData)
    
    ElMessage.success('添加成功')
    router.push({ name: 'Animals' })
  } catch (error) {
    ElMessage.error(error || '添加失败')
  }
}

const handleCancel = () => {
  router.push({ name: 'Animals' })
}
</script>

<style scoped>
.add-animal-container {
  max-width: 1200px;
  margin: 0 auto;
}

.animal-form {
  padding: 20px;
}
</style>
    