// Сервіс роботи з БД

const Task = require('./schemas/task');

// Отримати всі завдання
// У моделі викликаю метод find та повертаю результат у контролер
const getAlltasks = async () => {
  return Task.find();
};

// Отримати конкретне завдання з id.
// Викликаю метод findOne, який знаходить єдиний результат за умовою { _id: id }.
// Якщо метод нічого не знайде, то буде повернено значення null
const getTaskById = id => {
  return Task.findOne({ _id: id });
};

// Створення нового завдання.
const createTask = ({ title, text }) => {
  return Task.create({ title, text });
};

// Оновити завдання методом findByIdAndUpdate
// Перший параметр - це умова пошуку (збіг за id)
// Другий - об'єкт з полями, які необхідно оновити.
// Третій параметр вказує, що метод має повернути вже оновлений документ, а не старий
const updateTask = (id, fields) => {
  return Task.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

// Видалення завдання з бази даних.
// В метод Mongoose findByIdAndRemove передаю id завдання. Метод знаходить та видаляє завдання з бази даних.
const removeTask = id => {
  return Task.findByIdAndRemove({ _id: id });
};

module.exports = {
  getAlltasks,
  getTaskById,
  createTask,
  updateTask,
  removeTask,
};
