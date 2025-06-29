const pool = require('../utils/db');

const getAnimals = async () => {
    const [rows] = await pool.execute('SELECT * FROM animals');
    return rows;
};

const getAnimalById = async (id) => {
    const [rows] = await pool.execute('SELECT * FROM animals WHERE id = ?', [id]);
    return rows[0];
};

const createAnimal = async (animal) => {
    const { name, type, breed, age, gender, status, health, personality, image, rescueDate } = animal;
    const [result] = await pool.execute(
        'INSERT INTO animals (name, type, breed, age, gender, status, health, personality, image, rescue_date) VALUES (?,?,?,?,?,?,?,?,?,?)',
        [name, type, breed, age, gender, status, health, personality, image, rescueDate]
    );
    return result.insertId;
};

const updateAnimal = async (id, animal) => {
    const { name, type, breed, age, gender, status, health, personality, image, rescueDate } = animal;
    await pool.execute(
        'UPDATE animals SET name = ?, type = ?, breed = ?, age = ?, gender = ?, status = ?, health = ?, personality = ?, image = ?, rescue_date = ? WHERE id = ?',
        [name, type, breed, age, gender, status, health, personality, image, rescueDate, id]
    );
};

const deleteAnimal = async (id) => {
    await pool.execute('DELETE FROM animals WHERE id = ?', [id]);
};

module.exports = {
    getAnimals,
    getAnimalById,
    createAnimal,
    updateAnimal,
    deleteAnimal
};    