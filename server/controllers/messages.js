const mongoose = require("mongoose");
const Message = require('../models/Message');
const {getOneUserName,deleteUser} = require("./user");


async function getMessages(req, res) {
    try {
        messages = []

        let messagesData = await Message.find({}).select('content user');
        for (const message of messagesData) {
            try {
                // Await the asynchronous function to get the username
               // console.log(message, "controllermessage line14");
                const username = await getOneUserName(message.user);
                if (!username) {
                    await Message.deleteOne({_id: message._id})
                }else{
                    // console.log('username of message', message, 'is', username);
                    messages.push({
                        id: message._id,
                        content: message.content,
                        userObject: {
                            id: message.user,
                            name: username,
                        }
                    });
                }

            } catch (err) {
                console.error(err); // Optionally log the error
            }
        }
        console.log(messages);
        return res.status(200).json(messages)
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: err.message});
    }
}

async function createMessage(req, res) {
    const {content, userId} = req.body
    console.log("data here :" + content)
    console.log(userId, " user to add to message")
    try {
        const message = await Message.create({content, user: userId});
        console.log(message, "message created")
        return res.status(201).send(message);
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: err.message});
    }


}

async function removeMessage(req, res) {
    try {
        const {id} = req.params;
        await Message.deleteOne({_id: id})

        return res.status(200).json({message: "ok"});
    } catch (err) {
        return res.status(500).send({message: err.message});

    }
}

module.exports = {getMessages, createMessage, removeMessage}