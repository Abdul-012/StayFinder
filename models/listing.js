const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Review = require("./reviews.js");

const listingSchema = new schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        filename: { type: String, default: "listingimage" },
        url: {
            type: String,
            default: "https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg",
            set: (url) =>
                url === ""
                    ? "https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg"
                    : url,
        },
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    reviews: [
        {
            type: schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});






const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
