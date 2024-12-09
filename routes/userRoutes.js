const express = require('express');
const {
    registerUser,
    loginUser,
    listUsers,
    getUserDetails,
} = require('../controllers/userController'); // Import all needed controllers
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser); // Route to register a user
router.post('/login', loginUser);       // Route to login a user

// Protected routes
router.get('/users', protect, listUsers); // Route to get all users
router.get('/users/:id', protect, getUserDetails); // Route to get details of a single user

module.exports = router;
