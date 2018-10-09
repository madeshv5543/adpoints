const config = require('config');
const verify = require('../middleware/verify');
const Campaign =  require('../models/campaign');
const upload = require('../utils/utils');

module.exports = function(router) {
    router.post('/addCampaign',
        upload.single('camimg'),
        (req, res) => {
            const user = req.user;
            const requireParams = [
                'title',
                'description',
                'category',
                'startdate',
                'enddate',
                'value',
                'place'
            ];
            let isValid =  requireParams.reduce((acc, p) => (  acc & p in req.body), true)
            if(!isValid) {
                return res.json({message: 'A require Param is not present ', status: 400, type: 'Failure'});
            };
            const {title, description, category, startdate, enddate, value, place} = req.body
            const newcampaign = new Campaign({
                title,
                description,
                category,
                startdate,
                enddate,
                value,
                place,
                status:'pending'
            });
            if(req.file){
                newcampaign.campaignImage = req.file.filename
            }
            newcampaign.save()
            .then(
                doc => {
                    return res.json({message: 'Campaign saved successfully', status: 200, type: 'Success'})
                },
                err => {
                    return res.json({message: 'Cannot save a campaign details. Try after sometime', status:500, type: 'Failure'})
                }
            )
        }
    );

    router.get('/campaigns',
        verify,
        (req, res) => {
            Campaign.find({status:"pending"})
            .then( docs => {
                return res.json({data: docs, status: 200, type: 'Success'})
            },
            err => {
                return res.json({message: 'Cannot get campaign list. Try after sometime', status:500, type: 'Failure'})
            })
        }
    )

    router.get('/campaign/:campaignId',
        verify,
        (req, res) => {
            const { campaignId}  = req.params
            Campaign.findById(campaignId)
            .then(
                doc => {
                    if(!doc) {
                        return res.json({message: "Cannot find camapign details", status: '204', type: 'Failure'})
                    }
                    res.json({data: doc, status: 200, type: 'Failure'})
                },
                err => {
                    return res.json({message: 'Cannot find campaign details. Try after sometime', status:500, type: 'Failure'})
                }
            )
        }
    )

    router.post('/camapign/:campaignId',
        verify,
        upload.single('camimg'),
        (req, res) => {
            const { campaignId } = req.params;
            const requireParams = [
                'title',
                'description',
                'category',
                'startdate',
                'enddate',
                'value',
                'place'
            ];
            let isValid =  requireParams.reduce((acc, p) => (  acc & p in req.body), true)
            if(!isValid) {
                return res.json({message: 'A require Param is not present ', status: 400, type: 'Failure'});
            }
            Campaign.findById(campaignId)
            .then( doc => {
                if(!doc) {
                    return res.json({message: "Cannot find camapign details", status: '204', type: 'Failure'})
                }
                Object.keys(doc).map( n => {
                    if(doc[n] !== req.body[n]) {
                        doc[n] = req.body[n]
                    }
                });
                doc.save()
                .then( saveres => {
                    return res.json({message: 'Campaign details updated successfully', status: 200, type: 'Success'})
                },
                err => {
                    return res.json({message: 'Cannot update campaign details. Try after sometime', status:500, type: 'Failure'})
                })
            },
            err => {
                return res.json({message: 'Cannot update campaign details. Try after sometime', status:500, type: 'Failure'})
            })
        }
    )
}