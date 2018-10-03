const config = require('config');
const verify = require('../middleware/verify');
const User = require('../models/user');

module.exports = function(router) {
    router.get('/user',
        verify,
        (req, res) => {
            const { user } = req.user;
            User.findById(user._id)
            .then(
                userDetails => {
                    if(!userDetails){
                        return res.json({ message: 'User Not found', status: 401, type: 'Failure' })
                    }
                },
                err =>{
                    return res.json({ message: 'User details cannot find . please try again later', status: 500, type: 'Failure'})
                }
            )
        }
    )
}