const animalModel = require('../models/animalModel');

const getAnimals = async (req, res) => {
    try {
        const animals = await animalModel.getAnimals();
        res.json(animals);
    } catch (error) {
        console.error('Error fetching animals:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAnimalById = async (req, res) => {
    const { id } = req.params;
    try {
        const animal = await animalModel.getAnimalById(id);
        if (animal) {
            res.json(animal);
        } else {
            res.status(404).json({ error: 'Animal not found' });
        }
    } catch (error) {
        console.error('Error fetching animal:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createAnimal = async (req, res) => {
    const animal = req.body;
    try {
        const id = await animalModel.createAnimal(animal);
        res.status(201).json({ id, ...animal });
    } catch (error) {
        console.error('Error creating animal:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateAnimal = async (req, res) => {
    const { id } = req.params;
    const animal = req.body;
    try {
        await animalModel.updateAnimal(id, animal);
        res.json({ message: 'Animal updated successfully' });
    } catch (error) {
        console.error('Error updating animal:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteAnimal = async (req, res) => {
    const { id } = req.params;
    try {
        await animalModel.deleteAnimal(id);
        res.json({ message: 'Animal deleted successfully' });
    } catch (error) {
        console.error('Error deleting animal:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAnimals,
    getAnimalById,
    createAnimal,
    updateAnimal,
    deleteAnimal
};    