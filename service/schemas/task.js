// Схема для колекції завдань

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const task = new Schema(
  {
    title: {
      type: String,
      minlength: 2,
      maxlength: 70,
    },
    text: {
      type: String,
      minlength: 3,
      maxlength: 170,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },

  // Опція versionKey відповідає за версіонування документів.
  // Mongoose за замовчуванням додає версіонування - параметр __v, який вказує на версію зміненого документа.Здебільшого це потрібно для документів зі складною структурою, а оскільки структура цієї схеми плоска, то  версіонування відключаю.
  // Опція timestamps включає в схему дві додаткові властивості, час створення документа createdAt та час оновлення updatedAt. Mongoose автоматично встановлюватиме ці поля при створенні і буде змінювати поле updatedAt при кожному оновленні документа.
  { versionKey: false, timestamps: true }
);

const Task = mongoose.model('task', task);

module.exports = Task;
