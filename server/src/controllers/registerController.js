const RegisterService = require('../services/registerService')
const CheckService = require('../services/checkService')
const validationService = require('../services/validation')



exports.register = async (req, res, next) => {
    
    // validationService(req, function (err, result) {
    //     console.log(req.body.username);
    //     if (err) throw err;
        
    //     if (!result.isEmpty()) {
    //         return res.status(422).json({ errors: result.array() })
    //     }
    //     else {
            CheckService(req.body.username, function (err, result) {
                if (err) {
                    throw err
                }
                else if (result[0]) {
                    return res.status(201).json({
                        message: `This username is already in use`,
                    })
                }
                else {
                    RegisterService(req.body, function (err, user) {
                        if (err) throw err
                        res.status(201).json({ error: false, message: `The user with ID: ${user} has been added successfully!`})

                    })
                }
            })
        }
//     })
// }