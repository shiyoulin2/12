const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');
const authMiddleware = require('../middleware/authMiddleware');

// 获取所有动物
router.get('/', animalController.getAnimals);

// 获取单个动物
router.get('/:id', animalController.getAnimalById);

// 创建动物 (需要认证)
router.post('/', authMiddleware, animalController.createAnimal);

// 更新动物 (需要认证)
router.put('/:id', authMiddleware, animalController.updateAnimal);

// 删除动物 (需要认证)
router.delete('/:id', authMiddleware, animalController.deleteAnimal);

module.exports = router;    