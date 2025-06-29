<template>
  <div class="animals-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <template #header>
            <div class="clearfix">
              <span>动物列表</span>
              <el-button 
                v-if="isAuthenticated"
                style="float: right" 
                type="primary"
                @click="addAnimal">
                添加动物
              </el-button>
            </div>
          </template>
          
          <el-form :inline="true" :model="searchForm" class="search-form">
            <el-form-item label="名称">
              <el-input v-model="searchForm.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="searchForm.type" placeholder="请选择类型">
                <el-option label="狗狗" value="狗狗"></el-option>
                <el-option label="猫咪" value="猫咪"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="searchForm.status" placeholder="请选择状态">
                <el-option label="待领养" value="待领养"></el-option>
                <el-option label="已被领养" value="已被领养"></el-option>
                <el-option label="治疗中" value="治疗中"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button @click="resetSearch">重置</el-button>
            </el-form-item>
          </el-form>
          
          <el-table 
            :data="filteredAnimals" 
            stripe 
            border
            @row-click="handleRowClick">
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="breed" label="品种"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="gender" label="性别"></el-table-column>
            <el-table-column prop="status" label="状态">
              <template #default="scope">
                <el-tag :type="getStatusType(scope.row.status)">{{ scope.row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template #default="scope">
                <el-button 
                  size="mini" 
                  type="primary"
                  @click="editAnimal(scope.row.id)">
                  编辑
                </el-button>
                <el-button 
                  size="mini" 
                  type="danger"
                  @click="deleteAnimal(scope.row.id)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="filteredAnimals.length">
          </el-pagination>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const searchForm = ref({
  name: '',
  type: '',
  status: ''
})

const currentPage = ref(1)
const pageSize = ref(10)

const isAuthenticated = computed(() => {
  return store.getters.isAuthenticated
})

const allAnimals = computed(() => {
  return store.getters.getAnimals
})

const filteredAnimals = computed(() => {
  let result = allAnimals.value
  
  if (searchForm.value.name) {
    result = result.filter(animal => 
      animal.name.includes(searchForm.value.name)
    )
  }
  
  if (searchForm.value.type) {
    result = result.filter(animal => 
      animal.type === searchForm.value.type
    )
  }
  
  if (searchForm.value.status) {
    result = result.filter(animal => 
      animal.status === searchForm.value.status
    )
  }
  
  return result
})

const getStatusType = (status) => {
  switch (status) {
    case '待领养': return 'success'
    case '已被领养': return 'info'
    case '治疗中': return 'warning'
    default: return ''
  }
}

const search = () => {
  currentPage.value = 1
}

const resetSearch = () => {
  searchForm.value = {
    name: '',
    type: '',
    status: ''
  }
  currentPage.value = 1
}

const handleSizeChange = (newSize) => {
  pageSize.value = newSize
}

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage
}

const handleRowClick = (row) => {
  router.push({ name: 'AnimalDetail', params: { id: row.id } })
}

const addAnimal = () => {
  router.push({ name: 'AddAnimal' })
}

const editAnimal = (id) => {
  router.push({ name: 'EditAnimal', params: { id } })
}

const deleteAnimal = async (id) => {
  try {
    await ElMessageBox.confirm(
      '确定要删除这条记录吗？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    await store.dispatch('deleteAnimal', id)
    ElMessage.success('删除成功')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败: ' + error)
    }
  }
}

onMounted(async () => {
  try {
    if (allAnimals.value.length === 0) {
      await store.dispatch('fetchAnimals')
    }
  } catch (error) {
    ElMessage.error(error)
  }
})
</script>

<style scoped>
.animals-container {
  max-width: 1200px;
  margin: 0 auto;
}

.search-form {
  margin-bottom: 20px;
}
</style>
    