const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createTask, getTasks, getTask, updateTask, deleteTask } = require('../controllers/taskController');

router.use(authMiddleware); // protect all task routes

router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;