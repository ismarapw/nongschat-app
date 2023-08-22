const { Op } = require('sequelize');
const User = require('../models/user');

const registerUser = async (req, res) => {
    try {
        // check username and email availabilty
        const userFound = await User.findOne({
            where : {
                [Op.or] : [
                    {username : req.body.username},
                    {email : req.body.email}
                ]
            }
        });

        if (userFound){
            return res.status(400).send({message: "username or email is already exist"});
        }

        // Create user if username and email is available
        const user = User.build(req.body);
        const result = await user.save();

        // store username and id in the session
        req.session.userId = result.id;
        req.session.username = result.username;

        return res.status(201).send({
            message : "User has been registered",
            session: req.session
        });

    } catch (error) {
        return res.status(500).send({message: "Internal Server Error" });
    }
}

const loginAuth = async (req, res) => {
    try {
        // check pair of username and password
        const userValid = await User.findOne({
            where : {
                username : req.body.username,
                password : req.body.password
            }
        })
        
        if (userValid) {
            // store username and id in the session
            req.session.userId = userValid.id;
            req.session.username = userValid.username;

            return res.status(201).send({ message: "Login successful", session: req.session }); 
        }

        return res.status(401).send({ message: "Wrong username or password" });
        
    } catch (error) {
        return res.status(500).send({message: "Internal Server Error" });
    }
}

const updatePicture = async (req, res) => {

    try {
        // Upload user image to DB
        await User.update(
            {
                image : req.file.filename
            },
            {
                where : {
                    id : req.session.userId
                }
            }
        )

        return res.status(201).send({message: "Picture upload success", file: req.file.filename});  
    } catch (error) {
        return res.status(500).send({message: "Internal Server Error" });
    }
}


const updateUsername = async (req,res) => {
    try {
        // check username availability
        const userNameFound = await User.findOne({
            where : {
                username : req.body.username,
                id : {
                    [Op.ne] : req.session.userId
                }
            }
        });

        if (userNameFound){
            return res.status(400).send({message: "Username is not available"});
        }

        // if available update user
        await User.update(
            {
                username : req.body.username
            },
            {
                where : {
                    id : req.session.userId
                }
            }
        ) 

        return res.status(201).send({message : "Username updated"});

    } catch (error) {
        return res.status(500).send({message: "Internal Server Error" });
    }
}

const updateEmail = async (req,res) => {
    try {
        // check username availability
        const emailFound = await User.findOne({
            where : {
                email : req.body.email,
                id : {
                    [Op.ne] : req.session.userId
                }
            }
        });

        if (emailFound){
            return res.status(400).send({message: "Email is already used"});
        }

        // if available update user
        await User.update(
            {
                email : req.body.email
            },
            {
                where : {
                    id : req.session.userId
                }
            }
        ) 

        return res.status(201).send({message : "Email updated"});

    } catch (error) {
        return res.status(500).send({message: "Internal Server Error" });
    }
}

const updatePassword = async (req,res) => {
    try {
        // Directly update password
        await User.update(
            {
                password : req.body.password
            },
            {
                where : {
                    id : req.session.userId
                }
            }
        ) 

        return res.status(201).send({message : "Password updated"});

    } catch (error) {
        return res.status(500).send({message: "Internal Server Error" });
    }
}

const getProfile = async (req,res) => {
    try {
        const userFound = await User.findOne({
            where : {
                id : req.session.userId
            }
        })

        if (userFound) {
            return res.status(200).send({
                message : "Data fetched successfullly",
                result : {
                    username : userFound.dataValues.username,
                    email : userFound.dataValues.email,
                    image : userFound.dataValues.image,
                    password : userFound.dataValues.password
                }
            });
        }

        return res.status(404).send({message : "User Not found"});

    }catch(error) {
        return res.status(500).send({message: "Internal Server Error" });
    }
}

const getLatestUser = async (req, res) => {
    try {
        const limit = 10;
        const data = await User.findAll({
            attributes : ['id','username', 'image', 'createdAt'],
            where : {
                id : {
                    [Op.ne] : req.session.userId
                }
            },
            limit : limit,
            order : [['createdAt', 'DESC']]
        });

        const latestUser = data.map(user => user.dataValues);

        return res.status(200).send({message : "Data Fetched", result : latestUser});
    } catch (error) {
        return res.status(500).send({message: "Internal Server Error" });
    }
}

const getSearchedUser = async (req, res) => {
    try {
        const limit = 5;
        const data = await User.findAll({
            attributes : ['id','username', 'image', 'createdAt'],
            where : {
                [Op.and] : [
                    {username : {
                            [Op.substring] : req.params.username
                        }
                    },
                    {username : {
                        [Op.ne] : req.session.username
                    }}
                ]
            },
            limit : limit,
        });
        
        if (data.length > 0) {
            const searchedUser = data.map(user => user.dataValues);
            return res.status(200).send({message : "User Found", result : searchedUser}); 
        }
        
        return res.status(400).send({message : "User Not Found"}); 
    

    } catch (error) {
        console.log(error);
    }
}

const getOtherUserProfile = async (req, res) => {
    try {
        const otherUser = await User.findOne({
            where : {
                id : req.params.id
            }
        })

        if (otherUser) {
            return res.status(200).send({
                message : "Data fetched successfullly",
                result : {
                    username : otherUser.dataValues.username,
                    email : otherUser.dataValues.email,
                    image : otherUser.dataValues.image,
                    joined : otherUser.dataValues.createdAt
                }
            });
        }

        return res.status(404).send({message : "User Not found"});

    }catch(error) {
        return res.status(500).send({message: "Internal Server Error" });
    }
}

const logout = (req,res) => {
    req.session.destroy(err => {
        if(!err) {
            return res.status(204).end();
        }

        return res.status(500).send({message: "Internal Server Error" });
    });
}

module.exports = {
    registerUser,
    loginAuth,
    updatePicture,
    updateUsername,
    updateEmail,
    updatePassword,
    getProfile,
    getLatestUser,
    getSearchedUser,
    getOtherUserProfile,
    logout
}