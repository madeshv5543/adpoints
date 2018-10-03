const config = require('config');
const verify = require('../middleware/verify');
const Campaign =  require('../models/campaign');

module.exports = function(router) {
    router.get('/mycampaign',
        verify,
        (req, res) => {
            Campaign.find({sponser: user._id})
            .then (
                campaigns => {
                    return res.json({ data: campaigns, status: 200, type: 'Success' })
                },
                err => {
                    return res.json({ message: 'Cannot get campaigns list. Try after some time', status: 500, type: 'Failure'})
                }
            )
        }
    ),

    router.get('/campaing/:campaignId',
        verify,
        (req, res) => {
            const { campaignId } = req.params;
            Campaign.findById(campaignId)
            .then( campaign  => {
                if(!campaign) {
                    return res.json({message: "Cannot  details not found", status: 204, type: 'Failure'})
                }
               return res.json( { data: campaign, status:200, type: 'success'})
            },
            err => {
                return res.json({ message: 'Cannot find campaign details. Try after some time', status: 500, type: 'Failure'})
            })
        }
    )

    router.post('/sponsercampaign',
        verify,
        (req, res) =>{ 
            const { campaignId } = req.body;
            Campaign.findById(campaignId)
            .then(
                dbres => {
                    //
                    if(!dbres) {
                        return res.json({ message: "cannot find campaign details", status:401, type:'Failure' })
                    };
                    //transaction function
                },
                err =>{
                    return res.json({ message: 'Cannot process your request. Try after some time', status: 500, type: 'Failure'})
                }
            )
        }
    )
}