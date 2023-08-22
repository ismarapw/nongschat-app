const yup = require('yup');

const validateUserName = (req, res, next) => {
    const schema = yup.object().shape({
        username: yup.string().required().min(6)
    });

    schema.validate(req.body)
        .then(() => next())
        .catch((err) => res.status(400).json({type: "Invalid Input", message: err.errors}))
}

const validateEmail = (req, res, next) => {
    const schema = yup.object().shape({
        email : yup.string().email().required()
    });

    schema.validate(req.body)
        .then(() => next())
        .catch((err) => res.status(400).json({type: "Invalid Input", message: err.errors}))
}

const validatePassword = (req, res, next) => {
    const schema = yup.object().shape({
        password: yup.string().required().min(6)
    });

    schema.validate(req.body)
        .then(() => next())
        .catch((err) => res.status(400).json({type: "Invalid Input", message: err.errors}))
}


module.exports = {
    validateUserName,
    validateEmail,
    validatePassword
};