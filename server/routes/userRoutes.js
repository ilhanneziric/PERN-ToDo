const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');
const verify = require('../controllers/verifyToken');

router.get('/', verify, userControllers.getAllUsers); //return all users
router.get('/:id', userControllers.getUser); //retuen one user
router.post('/', userControllers.addUser); //add new user
router.post('/login', userControllers.login); //login
router.put('/:id', userControllers.updateUser); //update user
router.delete('/:id', userControllers.deleteUser); //delete user

module.exports = router