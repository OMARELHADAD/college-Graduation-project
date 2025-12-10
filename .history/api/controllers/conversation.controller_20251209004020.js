import createError from "../utils/createError.js";
import Conversation from "../models/Conversation.model.js";
import User from "../models/user.model.js";


export const createConversations = async (req, res, next) => {
  const newConversation = new Conversation({
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
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

export const updateConversations = async (req, res, next) => {
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
        ? { sellerId: req.userId }
        : { buyerId: req.userId }
    );
    
    // Fetch user details for each conversation
    const conversationsWithUserData = await Promise.all(
      conversations.map(async (conv) => {
        const otherUserId = req.isSeller ? conv.buyerId : conv.sellerId;
        const user = await User.findById(otherUserId);
        return {
          ...conv.toObject(),
          userName: user?.username || "Unknown User",
          userImg: user?.profilePicture || "",
        };
      })
    );
    
    res.status(200).send(conversationsWithUserData);
  } catch (err) {
    next(err);
  }
};
  