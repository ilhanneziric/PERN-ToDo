'use strict'

const db = require('../models/index')
const Todo = db.Todo
const User = db.User


const getAllTodos = async (req,res) => {
    try {
        const todos = await Todo.findAll({
            include: [{
                model: User
            }]
        });
        return res.status(200).json(todos);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getTodo = async (req,res) => {
    try {
        const todo = await Todo.findOne({
            where: {id: req.params.id},
            include: [{
                model: User
            }]
        });
        if(user){
            return res.status(200).json(todo);
        }
        return res.status(404).send('Todo with the specified id does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const addTodo = async (req,res) => {
    try {
        const todo = await Todo.create(req.body);
        return res.status(201).json(todo);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


const updateTodo = async (req,res) => {
    try {
        const [updated] = await Todo.update(req.body,{
            where: {id: req.params.id}
        });
        if (updated) {
            const updatedTodo = await Todo.findOne({ where: { id: req.params.id } });
            return res.status(200).json({ todo: updatedTodo });
        }
        return res.status(500).send('Todo not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deleteTodo = async (req,res) => {
    try {
        const deleted = await Todo.destroy({
            where: {id: req.params.id}
        });
        if(deleted){
            return res.status(204).json('Todo deleted');
        }
        return res.status(500).send('Todo not found');
    } catch (error) {
        return res.status(500).send(error.message);
        
    }
}


module.exports = {
    getAllTodos,
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo
}