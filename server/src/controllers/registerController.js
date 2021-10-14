const RegisterService = require('../services/registerService')
const CheckUsernameService = require('../services/checkUsernameService')
const CheckEmailService = require('../services/checkEmailService')
const validationService = require('../services/validation')



exports.register = async (req, res, next) => {

    // validationService(req, function (err, result) {
    //     console.log(req.body.username);
    //     if (err) throw err;

    //     if (!result.isEmpty()) {
    //         return res.status(422).json({ errors: result.array() })
    //     }
    //     else {
    CheckUsernameService(req.body.username, function (err, result) {
        if (err) {
            throw err
        }
        else if (result[0]) {
            return res.status(201).json({
                message: `This username is already in use.`,
            })
        }
        else {
            CheckEmailService(req.body.email, function (err, result) {
                if (err) {
                    throw err
                }
                else if (result[0]) {
                    return res.status(201).json({
                        message: `This email address is already in use.`
                    })
                }
                else {
                    RegisterService(req.body, function (err, user) {
                        if (err) throw err
                        res.status(201).json({ error: false, message: `The user with ID: ${user} has been added successfully!` })

                    })
                }
            })

        }
    })
}
//     })
// }