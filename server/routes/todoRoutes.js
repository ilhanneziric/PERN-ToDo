const express = require('express');
const router = express.Router();
const todoControllers = require('../controllers/todoControllers');

router.get('/', todoControllers.getAllTodos); //return all todos
router.get('/:id', todoControllers.getTodo); //retuen one todo
router.post('/', todoControllers.addTodo); //add new todo
router.put('/:id', todoControllers.updateTodo); //update todo
router.delete('/:id', todoControllers.deleteTodo); //delete todo

module.exports = router