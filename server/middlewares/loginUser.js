const yup = require('yup');

const validateUserLogin = (req, res, next) => {

    const schema = yup.object().shape({
        username: yup.string().required().min(6),
        password: yup.string().required().min(6)
    });

    schema.validate(req.body)
        .then(() => next())
        .catch((err) => res.status(400).json({ type: "Invalid Input", message: err.message }))
}

module.exports = {
    validateUserLogin
};