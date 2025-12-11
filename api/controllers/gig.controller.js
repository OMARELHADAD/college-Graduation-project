import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

// Create Gig
export const createGig = async (req, res, next) => {
    if (!req.isSeller) 
        return next(createError(403, "Only sellers can create gigs"));

    try {
        const newGig = new Gig({
            userId: req.userId,
            ...req.body,
        });

        const savedGig = await newGig.save();
        res.status(201).json(savedGig);
    } catch (err) {
        next(err);
    }
};

// Delete Gig
export const deleteGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id);

        if (!gig) return next(createError(404, "Gig not found"));
        if (gig.userId !== req.userId)
            return next(createError(403, "You can delete only your gig"));

        await Gig.findByIdAndDelete(req.params.id);
        res.status(200).send("Gig deleted successfully");
    } catch (err) {
        next(err);
    }
};

// Get single Gig
export const getGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id).populate("userId", "username img");

        if (!gig) return next(createError(404, "Gig not found"));
        res.status(200).json(gig);
    } catch (err) {
        next(err);
    }
};

// Get all gigs with filters
export const getGigs = async (req, res, next) => {
    const { min, max, search, cat, sort } = req.query;

    const filters = {
        ...(cat && { cat }),
        ...(min || max ? { price: { ...(min && { $gte: min }), ...(max && { $lte: max }) }} : {}),
        ...(search && { title: { $regex: search, $options: "i" } }),
    };

    try {
        const gigs = await Gig.find(filters).sort({ [sort]: -1 });
        res.status(200).json(gigs);
    } catch (err) {
        next(err);
    }
};

// Get gigs of a specific seller
export const getUserGigs = async (req, res, next) => {
    try {
        const gigs = await Gig.find({ userId: req.params.id });

        if (!gigs) return next(createError(404, "No gigs found"));
        res.status(200).json(gigs);
    } catch (err) {
        next(err);
    }
};
