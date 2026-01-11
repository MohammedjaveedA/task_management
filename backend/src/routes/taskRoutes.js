const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  searchTasks,
  getTaskStats
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const { validateTask } = require('../middleware/validationMiddleware');

// All routes are protected
router.use(protect);

// Search route (should come before /:id routes)
router.get('/search', searchTasks);
router.get('/stats', getTaskStats);

// CRUD routes
router.route('/')
  .get(getTasks)
  .post(validateTask, createTask);

router.route('/:id')
  .get(getTask)
  .put(validateTask, updateTask)
  .delete(deleteTask);

module.exports = router;