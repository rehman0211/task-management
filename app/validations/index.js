const Joi = require("joi");

const validation = async (schemaName, data) => {
    const { error } = schemas[schemaName].validate(data);
    if (error) return new Error(error.details[0].message);

    return null;
};

const schemas = {
    Task: Joi.object({
        title: Joi.string().required().min(2).max(150),
        remarks: Joi.string(),
        status: Joi.valid("OPEN", "IN_PROGRESS", "COMPLETED"),
        completedAt: Joi.string().pattern(new RegExp('/(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/')).messages({
            'string.pattern.base': `Enter valid date format dd-mm-yyyy`
        })
    })
};

module.exports = {
    validation
}
