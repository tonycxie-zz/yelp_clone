const controller = require('../controller/restaurants.js');

module.exports = app => {
    app.get('/all_restaurants', controller.all_restaurants);
    app.get('/show_restaurant/:id', controller.show_restaurant);
    app.post('/add_restaurant', controller.add_restaurant);
    app.put('/update_restaurant/:id', controller.update_restaurant);
    app.delete('/delete_restaurant/:id', controller.delete_restaurant);
    app.put('/add_review/:id', controller.add_review);
    app.get('/check_name/:name', controller.check_name);
    app.all('*', controller.angular);
};