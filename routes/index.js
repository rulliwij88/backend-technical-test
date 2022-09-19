const express = require('express')
const router = express.Router()

const ActivityGroupController = require('../controllers/activity.controller')
router.get('/activity-groups', ActivityGroupController.getAll)
router.get('/activity-groups/:id', ActivityGroupController.getDetail)
router.post('/activity-groups', ActivityGroupController.create)
router.delete('/activity-groups/:id', ActivityGroupController.delete)
router.patch('/activity-groups/:id', ActivityGroupController.update)

const TodoItemController = require('../controllers/todo.controller')
router.get('/todo-items', TodoItemController.getAll)
router.get('/todo-items/:id', TodoItemController.getDetail)
router.post('/todo-items', TodoItemController.create)
router.delete('/todo-items/:id', TodoItemController.delete)
router.patch('/todo-items/:id', TodoItemController.update)
module.exports = router