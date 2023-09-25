module.exports = (sequelize, Sequelize) => {
	const Task = sequelize.define("task", {
		title: {
			type: Sequelize.STRING
		},
		remarks: {
			type: Sequelize.STRING
		},
		status: {
			type: Sequelize.ENUM("OPEN", "IN_PROGRESS", "COMPLETED"),
		},
		createdAt: {
			type: Sequelize.DATE
		},
		completedAt: {
			type: Sequelize.DATE
		}
	});

	return Task;
};
