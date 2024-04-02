const { body } = require('express-validator');

const userValidator = [
    body('name', 'Name should be at least 3 characters long').isLength({ min: 3 }),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password should be at least 6 characters long').isLength({ min: 6 }),
];

const loginValidator = [
    body('email', 'Invalid email').isEmail(),
];

module.exports={userValidator,loginValidator};