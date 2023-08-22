const Chat = require('../models/message');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');
const db = require('../config/connection');
const selectChatList = require('./rawQuery/selectChatList');


const sendMsg = async (req, res) => {
    const io = req.app.get('io');

    const chat = new Chat(req.body);

    try {
        const result = await chat.save();

        io.to(req.body.receiver_id).emit('receive_message', result.dataValues);

        return res.status(201).send({message : 'Message Sent', result : result.dataValues});

    } catch (error) {
        return res.status(500).send({message: "Internal Server Error" });
    }
}

const updateMsg = async (req, res) => {
    // update read message
    await Chat.update(
        {
            read_status : 'yes'
        },
        {
            where : {
                receiver_id: req.session.userId,
                sender_id: req.params.id,
            }
        }
    ) 
}


const getMsg = async (req, res) => {
    try {
        const result = await Chat.findAll({
            where : {
                [Op.or]: [
                    {
                      receiver_id: req.session.userId,
                      sender_id: req.params.id,
                    },
                    {
                      receiver_id: req.params.id,
                      sender_id: req.session.userId,
                    },
                ],
            }
        });

        // update message to read
        await updateMsg(req, res);

        const messages = result.map(msg => msg.dataValues);

        return res.status(201).send({message : 'Success', result : messages});

    } catch (error) {
        return res.status(500).send({message: "Internal Server Error" });
    }
}

const getChatList = async (req, res) => {

    try {
        const query = selectChatList(req.session.userId);

        const chatList = await db.query(query, { type: QueryTypes.SELECT });

        return res.status(200).send({message : "Chat list fetched", result : chatList});

    } catch (error) {
        return res.status(500).send({message: "Internal Server Error" });
    }
}

module.exports = {
    sendMsg,
    getMsg,
    getChatList,
    updateMsg
}