// Контролери. Основна логіка програми.

// Кожен контролер приймає запит на обробку маршруту від роуту, звертається до бази даних через сервіс та з отриманим результатом формує відповідь програми.

const service = require('../service');

const get = async (req, res, next) => {
  try {
    // запит у бази всі поточні завдання TODO листа
    const results = await service.getAlltasks();

    // Надсилання отриманого результату клієнту
    res.json({
      status: 'success',
      code: 200,
      data: {
        tasks: results,
      },
    });
  } catch (e) {
    console.error(e);

    // Якщо є помилка, то відправляю її далі next(err), для обробника помилок у файлі server.js
    next(e);
  }
};

// Контролер для обробки запиту задачі по id схожий на попередній, але має важливу відмінність. У випадку, якщо сервіс нам нічого не повернув з бази даних, ми повертаємо відповідь 404 - нічого не знайдено.
const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await service.getTaskById(id);
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { task: result },
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found task id: ${id}`,
        data: 'Not Found',
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const { title, text } = req.body;
  try {
    const result = await service.createTask({ title, text });

    res.status(201).json({
      status: 'success',
      code: 201,
      data: { task: result },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { title, text } = req.body;
  try {
    const result = await service.updateTask(id, { title, text });
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { task: result },
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found task id: ${id}`,
        data: 'Not Found',
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  const { isDone = false } = req.body;

  try {
    const result = await service.updateTask(id, { isDone });
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { task: result },
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found task id: ${id}`,
        data: 'Not Found',
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await service.removeTask(id);
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { task: result },
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found task id: ${id}`,
        data: 'Not Found',
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  updateStatus,
  remove,
};
