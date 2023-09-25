const taskDatabase = require("../databases/task");
const { TASK_STATUS } = require("../models/task");

async function getTasksPaginated(page, pageSize) {
    let response = await taskDatabase.getTasksPaginated(page, pageSize);
    response.page = page;
    response.pageSize = pageSize;
    return response;
}

async function getTaskById(id) {
    return taskDatabase.getTaskById(id);
}

async function createTask(body) {
    body.status = TASK_STATUS.OPEN;
    return taskDatabase.createTask(body);
}

async function updateTask(id, body) {
    body.status = body.status || TASK_STATUS.OPEN;
    if (body.status == TASK_STATUS.COMPLETED) body.completedAt = new Date();
    return taskDatabase.updateTask(id, body);
}

async function deleteTask(id) {
    return taskDatabase.deleteTask(id);
}

async function getTaskMetrics() {
    let response = {
        "OPEN": 0,
        "COMPLETED": 0,
        "IN_PROGRESS": 0
    };
    const value = await taskDatabase.getTaskMetrics();
    value.forEach((row) => {
        response[row.dataValues.status] = parseInt(row.dataValues.count);
    });
    return response;
}

// Other possible solution is to group by [Month, status]
async function getTaskMetricsMonthwise(startDate, endDate) {
    // get all task lying in between date
    const tasks = await taskDatabase.getTasksBetweenDates(new Date(startDate), new Date(endDate));
    // groupBy month and calculate metrics
    const monthYearToMetrics = new Map();
    tasks.forEach((task) => {
        const month = task.createdAt.toLocaleString('default', { month: 'long' });
        const year = task.createdAt.getFullYear();
        const key = `${month} ${year}`;
        const metrics = monthYearToMetrics.get(key) || { "OPEN": 0, "COMPLETED": 0, "IN_PROGRESS": 0 }
        metrics[task.status]++;
        monthYearToMetrics.set(key, metrics);
    });
    let response = [];

    for (const [key, value] of monthYearToMetrics) {
        response.push({
            "date": key,
            "metrics": value
        })
    }
    return response;
}


module.exports = {
    getTasksPaginated,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    getTaskMetrics,
    getTaskMetricsMonthwise
};