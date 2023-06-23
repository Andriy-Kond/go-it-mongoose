// Роутінг

// імпорт контролеру і для кожного маршруту та необхідного методу HTTP виклик відповідного методу контролеру ctrlTask.
const express = require('express');
const router = express.Router();
const ctrlTask = require('../controller');

router.get('/tasks', ctrlTask.get);

router.get('/tasks/:id', ctrlTask.getById);

router.post('/tasks', ctrlTask.create);

router.put('/tasks/:id', ctrlTask.update);

router.patch('/tasks/:id/status', ctrlTask.updateStatus);

router.delete('/tasks/:id', ctrlTask.remove);

//  При подальшій роботі над додатком тут можуть з'явитися проміжні ПЗ для авторизації необхідних маршрутів, для валідації даних, що передаються, та інші допоміжні функції.

module.exports = router;
