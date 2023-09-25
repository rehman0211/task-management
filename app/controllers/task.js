const taskService = require("../services/task");
const { validation } = require("../validations");

async function getAllTasks(req, res) {
    const clientIp = req.ip;
    try {
        const defaultPageLimit = 10;
        let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : defaultPageLimit;
        pageSize = pageSize > 0 ? pageSize : defaultPageLimit;
        const page = req.query.page || 1;

        const result = await taskService.getTasksPaginated(page, pageSize);

        return res.status(200).send(result);
    } catch (err) {
        // logging error: We may use logging services later on
        console.error({
            error: err,
            clientIp: clientIp,
            reqUrl: req.url
        });
        return res.sendStatus(500);
    }
}

async function getTaskById(req, res) {
    const clientIp = req.ip;
    try {
        const { id } = req.params;
        const result = await taskService.getTaskById(id);

        return res.status(200).send(result);
    } catch (err) {
        // logging error: We may use logging services later on
        console.error({
            error: err,
            clientIp: clientIp,
            reqUrl: req.url
        });
        return res.sendStatus(500);
    }
}


async function createTask(req, res) {
    const clientIp = req.ip;
    try {
        const data = req.body;
        const validationResult = await validation('Task', data);
        if (validationResult instanceof Error) return res.status(400).send(validationResult.message);

        const result = await taskService.createTask(data);

        return res.status(200).send(result);
    } catch (err) {
        // logging error: We may use logging services later on
        console.error({
            error: err,
            clientIp: clientIp,
            reqUrl: req.url
        });
        return res.sendStatus(500);
    }
}

async function updateTask(req, res) {
    const clientIp = req.ip;
    try {
        const { id } = req.params;
        const data = req.body;
        const validationResult = await validation('Task', data);
        if (validationResult instanceof Error) return res.status(400).send(validationResult.message);

        await taskService.updateTask(id, data);

        return res.sendStatus(200);
    } catch (err) {
        // logging error: We may use logging services later on
        console.error({
            error: err,
            clientIp: clientIp,
            reqUrl: req.url
        });
        return res.sendStatus(500);
    }
}

async function deleteTask(req, res) {
    const clientIp = req.ip;
    try {
        const { id } = req.params;
        const result = await taskService.deleteTask(id);

        return res.sendStatus(200);
    } catch (err) {
        // logging error: We may use logging services later on
        console.error({
            error: err,
            clientIp: clientIp,
            reqUrl: req.url
        });
        return res.sendStatus(500);
    }
}

async function getTaskMetrics(req, res) {
    const clientIp = req.ip;
    try {
        const result = await taskService.getTaskMetrics();

        return res.status(200).send(result);
    } catch (err) {
        // logging error: We may use logging services later on
        console.error({
            error: err,
            clientIp: clientIp,
            reqUrl: req.url
        });
        return res.sendStatus(500);
    }
}

async function getTaskMetricsMonthwise(req, res) {
    const clientIp = req.ip;
    try {

        const {startDate, endDate} = req.query;
        // const validationResult = await validation('TaskMetricDates', {startDate, endDate});
        // if (validationResult instanceof Error) return res.status(400).send(validationResult.message);
        const result = await taskService.getTaskMetricsMonthwise(startDate, endDate);

        return res.status(200).send(result);
    } catch (err) {
        // logging error: We may use logging services later on
        console.error({
            error: err,
            clientIp: clientIp,
            reqUrl: req.url
        });
        return res.sendStatus(500);
    }
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    getTaskMetrics,
    getTaskMetricsMonthwise
};