const config = require('config');
const verify = require('../middleware/verify');
const User = require('../models/user');

module.exports = function(router) {
    router.get('/user',
        verify,
        (req, res) => {
            const { user } = req.user;
            User.findOne({"walletaddress":user.address})
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
    );

    router.post('/edituser',
        verify,
        (req, res) =>{
            const { user } = req.user;
            const userUpdateDetails = req.body;
            User.findOne({"walletaddress":user.address})
            .then(
                userDetails => {
                    if(!userDetails){
                        return res.json({ message: 'User Not found', status: 401, type: 'Failure' })
                    }
                    User.findOneAndUpdate({"walletaddress":user.address},userUpdateDetails)
                        .then( res => {
                            return res.json({ message: "User details updated successfully.", status: 200, type:'Success' })
                        },
                        err => {
                            return res.json({ message: 'User details cannot update. please try again later', status: 500, type: 'Failure'})
                        })
                },
                err =>{
                    return res.json({ message: 'User details cannot find . please try again later', status: 500, type: 'Failure'})
                }
            )
        }
    )

}