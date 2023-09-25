const db = require("../config/database");
const Task = db.tasks;
const Op = db.Sequelize.Op;
const { fn, col } = require("sequelize");

async function getTasksPaginated(page, pageSize) {
    return Task.findAndCountAll({
        offset: page * pageSize,
        limit: pageSize
    });
}

async function getTaskById(id) {
    return Task.findByPk(id);
}

async function createTask(body) {
    return Task.create(body);
}

async function updateTask(id, body) {
    return Task.update(body, {
        where: { id: id }
    });
}

async function deleteTask(id) {
    return Task.destroy({
        where: { id: id }
    });
}

async function getTaskMetrics() {
    return Task.findAll({
        attributes: ["status",
            [fn("count", col("id")), "count"]],
        group: ["status"]
    });
}

async function getTasksBetweenDates(startDate, endDate) {
    return Task.findAll({
        where: {
            createdAt: {
                [Op.between]: [startDate, endDate]
            }
        },
        attributes: ["status", "createdAt"]
    });
}


module.exports = {
    getTasksPaginated,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    getTaskMetrics,
    getTasksBetweenDates
};