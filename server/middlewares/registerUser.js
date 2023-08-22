const yup = require('yup');

const validateUserReg = (req, res, next) => {
    console.log(req.body)
    const schema = yup.object().shape({
        email : yup.string().email().required(),
        username: yup.string().required().min(6),
        password: yup.string().required().min(6)
    });

    schema.validate(req.body)
        .then(() => next())
        .catch((err) => res.status(400).json({type : "Invalid Input", message : err.errors[0]}))
}

module.exports = {
    validateUserReg
};