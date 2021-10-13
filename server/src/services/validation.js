const { validationResult } = require('express-validator')

function validateInput(param, result) {
    try {
        const errors = validationResult(param)
        if (!errors.isEmpty()) {
            result(null, errors)
        }
    }
    catch (err) {

    }
}

module.exports = validateInput
