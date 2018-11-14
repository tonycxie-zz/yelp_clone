const mongoose = require('../config/mongoose.js');

let ReviewSchema = new mongoose.Schema({
    reviewer: {
        type: String, 
        required: [true, "You must have a reviewer"], 
        minlength: [3, "Reviewer name must be at least 3 characters"]
    },
    stars: {
        type: String, 
        required: [true, "You must include stars in your review"]
    },
    desc: {
        type: String, 
        required: [true, "You must have a description"], 
        minlength: [3, "Description must be at least 3 characters"]
    }
}, {timestamps: true});
mongoose.model('Review', ReviewSchema);

let RestaurantSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Restaurant must have a name"], 
        minlength: [3, "Restaurant name must be at least 3 characters"]
    },
    cuisine: {
        type: String, 
        required: [true, "Type of cuisine is required"], 
        minlength: [3, "Type of cuisine must be at least 3 characters"]
    },
    reviews: [ReviewSchema]
}, {timestamps: true});

module.exports = mongoose.model('Restaurant', RestaurantSchema);