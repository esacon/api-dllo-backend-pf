const historyModel = require('../models/follows.model');

const fetchHistory = async (req, res) => {    
    try {
        res.status(200).json(await historyModel.find({ 'user_id': req.params.user_id }));      
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    fetchHistory
}
