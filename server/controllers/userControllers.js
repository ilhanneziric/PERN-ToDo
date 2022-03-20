'use strict'

const db = require('../models/index')
const User = db.User
const Todo = db.Todo
const { registerValidation, loginValidation } = require('../validation');
const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const getAllUsers = async (req,res) => {
    // res.send(req.user);//uvijek imamo access za usera koji koristi kontroler
    try {
        const users = await User.findAll({
            include: [{
                model: Todo
            }]
        });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getUser = async (req,res) => {
    try {
        const user = await User.findOne({
            where: {id: req.params.id},
            include: [{
                model: Todo
            }]
        });
        if(user){
            return res.status(200).json(user);
        }
        return res.status(404).send('User with the specified id does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

//register
const addUser = async (req,res) => {
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error);

    const emailExist = await User.findOne({where: {email: req.body.email}});
    if(emailExist) return res.status(400).send('Email already exists');

    const salt = await bcript.genSalt(10);
    req.body.password = await bcript.hash(req.body.password, salt);
    try {
        const user = await User.create(req.body);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

//login
const login = async (req,res) => {
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error);

    const user = await User.findOne({where: {email: req.body.email}});
    if(!user) return res.status(400).send('Wrong email or password!');

    const validPass = await bcript.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Wrong email or password!');

    const token = jwt.sign({id: user.id}, process.env.TOKEN);
    res.header('auth-token', token).send(token);

    // res.status(200).send('Valid login');
};

const updateUser = async (req,res) => {
    try {
        const [updated] = await User.update(req.body,{
            where: {id: req.params.id}
        });
        if (updated) {
            const updatedUser = await User.findOne({ where: { id: req.params.id } });
            return res.status(200).json({ user: updatedUser });
        }
        return res.status(500).send('User not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deleteUser = async (req,res) => {
    try {
        const deleted = await User.destroy({
            where: {id: req.params.id}
        });
        if(deleted){
            return res.status(204).json('User deleted');
        }
        return res.status(500).send('User not found');
    } catch (error) {
        return res.status(500).send(error.message);
        
    }
}

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    login,
    updateUser,
    deleteUser
}