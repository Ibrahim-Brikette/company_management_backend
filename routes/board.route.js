const express = require('express');
const { byId, deleteProjectBoard, deleteBoard, updateBoard, deleteTaskBoard } = require('../controllers/board.controller');
const router = express.Router();


router.get('/boardbyid/:id',byId);
router.put('/updateboard/:id',updateBoard);
router.put('/deletetaskboard/:id',deleteTaskBoard);











module.exports = router