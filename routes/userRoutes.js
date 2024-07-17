
const express = require('express');
const userController = require('../controllers/userController'); 

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/get-all', userController.getAllUsers);  
router.get('/user/:id', userController.getUser);
router.delete('/delete/:id', userController.deleteUser);
router.put('/update/:id', userController.updateUser);

module.exports = router;
