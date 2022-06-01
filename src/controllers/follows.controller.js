const followsModel = require('../models/follows.model');

const fetchFollowing = async (req, res) => {    
    try {
        res.status(200).json(await followsModel.find({ 'user_id': req.params.user_id }));      
    } catch (error) {
        res.status(500).send(error)
    }
}

const fetchFollowers = async (req, res) => {    
    try {
        res.status(200).json(await followsModel.find({ 'user_id': req.params.user_id }));      
    } catch (error) {
        res.status(500).send(error)
    }
}

const requestUser = async (req, res) => {    
    try {
        res.status(200).json(await followsModel.find({ 'user_id': req.params.user_id }));      
    } catch (error) {
        res.status(500).send(error)
    }
}

const responseUser = async (req, res) => {    
    try {
        res.status(200).json(await followsModel.find({ 'user_id': req.params.user_id }));      
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    fetchFollowing, fetchFollowers, requestUser, responseUser
}
