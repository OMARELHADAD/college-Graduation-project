import User from "../models/user.model.js";
import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can delete only your account!"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted.");
};

export const updateUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can update only your account!"));
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.status(200).send(updatedUser);
};

export const saveGig = async (req, res, next) => {
  const gigId = req.body.gigId;

  try {
    const user = await User.findById(req.userId);
    const isSaved = user.savedGigs.includes(gigId);

    if (isSaved) {
      await User.findByIdAndUpdate(req.userId, {
        $pull: { savedGigs: gigId },
      });
      res.status(200).send("Gig removed from wishlist.");
    } else {
      await User.findByIdAndUpdate(req.userId, {
        $push: { savedGigs: gigId },
      });
      res.status(200).send("Gig saved to wishlist.");
    }
  } catch (err) {
    next(err);
  }
};

export const getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    // Find all gigs whose IDs are in the user's savedGigs array
    const savedGigs = await Gig.find({ _id: { $in: user.savedGigs } });

    res.status(200).send(savedGigs);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};

export const getTopSellers = async (req, res, next) => {
  try {
    const topSellers = await Gig.aggregate([
      {
        $group: {
          _id: "$userId",
          totalSales: { $sum: "$sales" },
          averageRating: {
            $avg: {
              $cond: [
                { $eq: ["$starNumber", 0] },
                0,
                { $divide: ["$totalStars", "$starNumber"] }
              ]
            }
          },
          mainCategory: { $first: "$cat" }
        },
      },
      { $sort: { totalSales: -1 } },
      { $limit: 3 },
      {
        $addFields: {
          // SAFE CONVERSION: If userId is invalid (like in bad seed data), this returns null.
          // This prevents the "Argument passed in must be a string of 12 bytes..." crash.
          userObjectId: {
            $convert: {
              input: "$_id",
              to: "objectId",
              onError: null,
              onNull: null
            }
          }
        }
      },
      {
        $match: {
          // Filter out any failed conversions so we don't try to lookup null IDs
          userObjectId: { $ne: null }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "userObjectId",
          foreignField: "_id",
          as: "seller",
        },
      },
      { $unwind: "$seller" },
      {
        $project: {
          _id: "$_id",
          username: "$seller.username",
          img: "$seller.img",
          sales: "$totalSales",
          rating: { $round: ["$averageRating", 1] },
          specialty: "$mainCategory",
          country: "$seller.country"
        },
      },
    ]);

    const rankedSellers = topSellers.map((seller, index) => ({
      ...seller,
      rank: index + 1
    }));

    res.status(200).send(rankedSellers);
  } catch (err) {
    next(err);
  }
};
