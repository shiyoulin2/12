import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
    animals: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    logout(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },
    setAnimals(state, animals) {
      state.animals = animals
    },
    addAnimal(state, animal) {
      state.animals.push(animal)
    },
    updateAnimal(state, updatedAnimal) {
      const index = state.animals.findIndex(a => a.id === updatedAnimal.id)
      if (index !== -1) {
        state.animals.splice(index, 1, updatedAnimal)
      }
    },
    deleteAnimal(state, id) {
      state.animals = state.animals.filter(animal => animal.id !== id)
    }
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        const response = await axios.post('/api/users/login', { username, password })
        const token = response.data.token
        commit('setToken', token)
        return token
      } catch (error) {
        throw error.response.data.error
      }
    },
    async register({ commit }, userData) {
      try {
        await axios.post('/api/users/register', userData)
        return true
      } catch (error) {
        throw error.response.data.error
      }
    },
    logout({ commit }) {
      commit('logout')
    },
    async fetchAnimals({ commit }) {
      try {
        const response = await axios.get('/api/animals')
        commit('setAnimals', response.data)
        return response.data
      } catch (error) {
        throw error.response.data.error
      }
    },
    async addAnimal({ commit }, animalData) {
      try {
        const response = await axios.post('/api/animals', animalData)
        commit('addAnimal', response.data)
        return response.data
      } catch (error) {
        throw error.response.data.error
      }
    },
    async updateAnimal({ commit }, { id, animalData }) {
      try {
        await axios.put(`/api/animals/${id}`, animalData)
        commit('updateAnimal', { id, ...animalData })
        return true
      } catch (error) {
        throw error.response.data.error
      }
    },
    async deleteAnimal({ commit }, id) {
      try {
        await axios.delete(`/api/animals/${id}`)
        commit('deleteAnimal', id)
        return true
      } catch (error) {
        throw error.response.data.error
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    getAnimals: state => state.animals,
    getAnimalById: state => id => state.animals.find(animal => animal.id === id)
  }
})

export default store
    