<template>
  <div class="home-container">
    <el-carousel height="400px" indicator-position="outside">
      <el-carousel-item v-for="(item, index) in carouselItems" :key="index">
        <img :src="item.image" alt="轮播图" class="carousel-image">
        <div class="carousel-text">{{ item.text }}</div>
      </el-carousel-item>
    </el-carousel>

    <el-row class="feature-section" :gutter="20">
      <el-col :span="8" v-for="(feature, index) in features" :key="index">
        <el-card shadow="hover">
          <template #header>
            <div class="clearfix">
              <span>{{ feature.title }}</span>
              <el-button style="float: right; padding: 3px 0" type="text">查看更多</el-button>
            </div>
          </template>
          <div v-html="feature.content"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row class="latest-animals" :gutter="20">
      <el-col :span="24">
        <h2>最新救助的动物</h2>
        <el-divider></el-divider>
      </el-col>
      <el-col :span="6" v-for="animal in latestAnimals" :key="animal.id">
        <el-card shadow="hover" class="animal-card">
          <img :src="animal.image" alt="动物照片" class="card-image">
          <div class="card-content">
            <h3>{{ animal.name }}</h3>
            <p>{{ animal.breed }} | {{ animal.age }} | {{ animal.gender }}</p>
            <el-tag :type="getStatusType(animal.status)">{{ animal.status }}</el-tag>
            <el-button 
              v-if="isAuthenticated"
              type="primary" 
              size="small" 
              @click="viewAnimalDetail(animal.id)">
              查看详情
            </el-button>
            <el-button 
              v-else
              type="primary" 
              size="small" 
              @click="loginFirst">
              登录查看详情
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const carouselItems = ref([
  {
    image: 'https://picsum.photos/seed/slide1/1200/400',
    text: '救助流浪动物，让爱回家'
  },
  {
    image: 'https://picsum.photos/seed/slide2/1200/400',
    text: '每一个生命都值得被尊重'
  },
  {
    image: 'https://picsum.photos/seed/slide3/1200/400',
    text: '帮助它们，从现在开始'
  }
])

const features = ref([
  {
    title: '我们的使命',
    content: '致力于救助流浪动物，为它们提供临时庇护、医疗照顾，并寻找合适的领养家庭，让它们重新获得温暖的家。'
  },
  {
    title: '领养流程',
    content: '1. 提交申请<br>2. 面谈审核<br>3. 家访评估<br>4. 签订协议<br>5. 接宠回家<br>整个流程大约需要3-7天。'
  },
  {
    title: '如何帮助',
    content: '您可以通过领养、捐赠、志愿服务等方式帮助我们。每一份爱心都能让更多流浪动物获得新生的机会。'
  }
])

const latestAnimals = computed(() => {
  return store.getters.getAnimals.slice(0, 4)
})

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

const viewAnimalDetail = (id) => {
  router.push({ name: 'AnimalDetail', params: { id } })
}

const loginFirst = () => {
  router.push({ name: 'Login' })
}

onMounted(async () => {
  try {
    await store.dispatch('fetchAnimals')
  } catch (error) {
    ElMessage.error(error)
  }
})
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.carousel-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.carousel-text {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.feature-section {
  margin: 40px 0;
}

.latest-animals {
  margin: 40px 0;
}

.animal-card {
  height: 350px;
  display: flex;
  flex-direction: column;
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
}
</style>
    