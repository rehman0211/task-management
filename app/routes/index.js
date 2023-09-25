const taskController = require("../controllers/task");
const { verifyUser } = require("../middlewares/auth");
const express = require("express");
var router = express.Router();

// get All Task : 
// Ex: {BASE_URL}/api/task?page=1&pageSize=10 (default page-Size=10 & page=1)
router.get('/task', [verifyUser], taskController.getAllTasks);
// get Task by ID
router.get('/task/:id', [verifyUser], taskController.getTaskById);
// update Task
router.put('/task/:id', [verifyUser], taskController.updateTask);
// delete Task
router.delete('/task/:id', [verifyUser], taskController.deleteTask);
// create Task
router.post('/task', [verifyUser], taskController.createTask);
// fetch Task metrics
router.get('/get-task-metrics', [verifyUser], taskController.getTaskMetrics);
// fetch Task metrics-monthwise
router.get('/get-task-metrics-monthwise', [verifyUser], taskController.getTaskMetricsMonthwise);

module.exports = router;