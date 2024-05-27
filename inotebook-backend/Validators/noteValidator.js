const { body } = require('express-validator');

const noteValidator = [
    body('title', 'Name should be at least 5 characters long').isLength({ min: 5 }),
];



module.exports={noteValidator};