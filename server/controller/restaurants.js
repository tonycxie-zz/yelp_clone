const Restaurant = require('../models/restaurant.js'),
    path = require('path');

module.exports = {
    all_restaurants: (req, res) => {
        Restaurant.find({})
            .then(restaurants => res.json(restaurants))
            .catch(err => res.json({err}));
    },
    show_restaurant: (req, res) => {
        Restaurant.findById({_id: req.params.id})
            .then(restaurant => res.json(restaurant))
            .catch(err => res.json({err}));
    },
    add_restaurant: (req, res) => {
        let restaurant = new Restaurant({
            name: req.body.name,
            cuisine: req.body.cuisine
        });
        restaurant.save()
            .then(restaurant => res.json(restaurant))
            .catch(err => res.json({err}));
    },
    update_restaurant: (req, res) => {
        Restaurant.findOneAndUpdate(
            {_id: req.params.id},
            {$set: {
                name: req.body.name,
                cuisine: req.body.cuisine
            }},
            {runValidators: true}
        )
            .then(restaurant=> res.json(restaurant))
            .catch(err=> res.json({err}));
    },
    delete_restaurant: (req, res) => {
        Restaurant.findOneAndDelete({_id: req.params.id})
            .then(restaurant => res.json({message: "Successful delete"}))
            .catch(err => res.json({err}));
    },
    add_review: (req, res) => {
        Restaurant.findOneAndUpdate(
            {_id: req. params.id},
            {$push: {reviews: {
                reviewer: req.body.reviewer,
                stars: req.body.stars,
                desc: req.body.desc
            }}},
            {runValidators: true}
        )
            .then(restaurant => res.json({restaurant}))
            .catch(err => res.json({err}))
    },
    check_name: (req, res) => {
        Restaurant.find({name: req.params.name})
            .then(restaurant => res.json({restaurant}))
            .catch(err => res.json({err}));
    },
    angular: (req, res) => {
        res.sendFile(path.resolve('./public/dist/public/index.html'));
    }
};