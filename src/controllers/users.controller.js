const userModel = require('../models/users.model');
const crypt = require('../config/encrypting');
const jwt = require('jsonwebtoken');

const doRegister = async (req, res) => {
    let { display_name, username, password, confirm_password } = req.body;

    password = crypt.cryptPassword(password);

    const user = new userModel({
        display_name: display_name,
        username: username,
        password: password
    });

    try {
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

const doLogin = async (req, res) => {
    const { username, password } = req.body;
    const usr = await userModel.findOne({ 'username': username });

    try {
        if (crypt.comparePassword(password, usr.password)) {
            res.status(200).send(usr);    
        } else {
            res.status(404).send('User not found.');
        }       
    } catch (error) {
        res.status(500).send("error");
    }
}

const doLoginJWT = async (req, res) => {
    const { username, password } = req.body;
    const usr = await userModel.findOne({ 'username': username });
    const accessToken = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken});
    authenticateToken();
}

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, usr) => {
        if(err) return res.sendStatus(403);
        req.usr = usr;
        next()
    })
}

const fetchPrevLogin = async (req, res) => {
    res.status(200).send(await userModel.findById(req.body.user_id));
}

const fetchUser = async (req, res) => {
    try {
        res.status(200).send(await userModel.findById(req.query.user_id));      
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    doRegister, doLogin, doLoginJWT, fetchPrevLogin, fetchUser
}
