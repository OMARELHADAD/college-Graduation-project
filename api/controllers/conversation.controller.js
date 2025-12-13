import createError from "../utils/createError.js";
import Conversation from "../models/Conversation.model.js";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";


export const createConversations = async (req, res, next) => {
  try {
    const { to: otherUserId, gigId } = req.body;

    // Fetch gig details for the conversation header if gigId exists
    let gigTitle = "General Chat";
    let gigImg = "";

    if (gigId) {
      const gig = await Gig.findById(gigId);
      if (gig) {
        gigTitle = gig.shortTitle || gig.title;
        gigImg = gig.cover;
      }
    }

    const newConversation = new Conversation({
      id: req.isSeller ? req.userId + otherUserId + (gigId || "") : otherUserId + req.userId + (gigId || ""),
      sellerId: req.isSeller ? req.userId : otherUserId,
      buyerId: req.isSeller ? otherUserId : req.userId,
      readBySeller: req.isSeller,
      readByBuyer: !req.isSeller,
      gigId: gigId,
      gigTitle: gigTitle,
      gigImg: gigImg,
    });

    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (err) {
    next(err);
  }
};

export const updateConversations = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          //readBySeller: true,
          //readByBuyer: true,
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      { new: true }
    );
    res.status(200).send(updatedConversation);
  } catch (err) {
    next(err);
  }
};

export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) return next(createError(404, "Not found!"));

    let isClient = false;
    if (conversation.gigId) {
      isClient = await Order.exists({
        gigId: conversation.gigId,
        buyerId: conversation.buyerId
      });
    }

    res.status(200).send({
      ...conversation.toObject(),
      isClient: !!isClient
    });
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
    ).sort({ updatedAt: -1 });
    // Fetch user details AND purchase status for each conversation
    const conversationsWithUserData = await Promise.all(
      conversations.map(async (conv) => {
        const otherUserId = req.isSeller ? conv.buyerId : conv.sellerId;
        const user = await User.findById(otherUserId);

        // Check if Buyer has purchased this specific Gig
        let isClient = false;
        if (conv.gigId) {
          isClient = await Order.exists({
            gigId: conv.gigId,
            buyerId: conv.buyerId
          });
        }

        return {
          ...conv.toObject(),
          userName: user?.username || "Unknown User",
          userImg: user?.img || "/img/noavatar.jpg",
          isClient: !!isClient, // Boolean flag for UI Priority
        };
      })
    );

    res.status(200).send(conversationsWithUserData);
  } catch (err) {
    next(err);
  }
};
