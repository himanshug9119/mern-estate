import Listing from "../models/listing.model.js";
export const createListing = async (req , res , next)=>{
    try {
        const listing = await Listing.create(req.body);
        return res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}
export const deleteListing = async (req , res, next)=>{
    try{
        const listing = await Listing.findById(req.params.id);
        if(listing.userRef != req.user.id) return next(errorHandler(401 , "You can only delete your own listings"));
        const result = await Listing.findByIdAndDelete(req.params.id);
        return res.status(200).json("Listing has been deleted");
    }
    catch (error) {
        next(error);
    }
}