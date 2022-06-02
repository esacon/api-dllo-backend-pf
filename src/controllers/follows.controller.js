const userModel = require('../models/users.model');
const requestModel = require('../models/requests.model');

// GET /follows/following
const fetchFollowing = async (req, res) => {    
    const { user_id } = req.query;
    const user = user_id ? await userModel.findById(user_id) : null;
    if (!user) res.status(400).send({ error: 'User not found.' }); 
    const following = await userModel.find({ _id: { $in: user.following } });
    res.status(200).send(following);
}

// GET /follows/followers
const fetchFollowers = async (req, res) => {  
    const { user_id } = req.query;
    const user = user_id ? await userModel.findById(user_id) : null;
    if (!user) res.status(400).send({ error: 'User not found.' }); 
    const followers = await userModel.find({ _id: { $in: user.followers } });
    res.status(200).send(followers);
}

// POST /follows/request
const requestUser = async (req, res) => {  
    const { id } = req.user;
    const { user_id } = req.body;
    const user = id ? await userModel.findById(id) : null;
    if (!user) res.status(404).send({ error: 'User not found.' }); 
    console.log(user.following);
    if (user_id in user.following) res.status(400).send({ error: 'The user is already being followed.' }); 
    const request = new requestModel({
        requester: id,
        requested: user_id
    });
    await request.save();
    res.status(200).send({});
}

// POST /follows/response
const responseUser = async (req, res) => {    
    const { id } = req.user;
    const { request_id, action } = req.body;
    const request = request_id ? requestModel.findById(request_id) : null; 
    if (!request || !action) res.status(400).send({ error: 'Invalid request_id or action.' }); 
    if (id === request.requested) {
        switch (action) {
            case 'accept':
                await userModel.findByIdAndUpdate(request.requester, { $push: { following: id}});
                await userModel.findByIdAndUpdate(id, { $push: { followers: request.requester}});
                res.status(200).send({});
                break;
            case 'reject':
                res.status(200).send({});
                break;
            default:
                res.status(500).send({error: 'Invalid action.'});
                break;
        }
    }
    res.status(403).send({error: 'Access denied.'});
}

module.exports = {
    fetchFollowing, fetchFollowers, requestUser, responseUser
}
