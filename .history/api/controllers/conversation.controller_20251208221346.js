import createError from "../utils/createError.js";
import Conversation from "../models/Conversation.model.js";

export const createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    id: req.isSeller ? req.UserId + req.body.to : req.body.to + req.UserId,
    sellerId: req.isSeller ? req.UserId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.UserId,
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller,
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (err) {
    next(err);
  }
};

export const updateConversationsConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findByIdAndUpdate(
      { id: req.params.id },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
        },
      },
      { new: true }
    );
    res.status(200).send(updatedConversation);
  } catch (err) {
    next(err);
  }
};
  
export const getSingelConversations = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    res.status(200).send(conversation);
  } catch (err) {
    next(err);
  }
};
  
export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.isSeller
        ? { sellerId: req.UserId }
        : { buyerId: req.UserId }
    );
    res.status(200).send(conversations);
  } catch (err) {
    next(err);
  }
};
  