var Rentals = require('../models/rentals');
var Movies = require("../models/movies");
var Customers = require("../models/customers");

var RentalsController = {

  find_movie: function(req, res, next) {
    var movie = req.params.title;

    Movies.find(movie, function(error, found_movie) {
      if(error) {
        var err = new Error("No such movie");
        err.status = 404;
        next(err);
      } else {
        obj = {}
        obj['status'] = 200;
        obj['Movie Info'] = {};
        obj['Movie Info']['Synopsis'] = found_movie.overview;
        obj['Movie Info']['Release Date'] = found_movie.release_date;
        obj['Movie Info']['Total Inventory'] = found_movie.inventory;
        Rentals.available(found_movie.id, function(err, number){
          obj['Movie Info']['Available Inventory'] = number
          res.json(obj);
        });
      }
    });
  },

  current_customers: function(req, res, next) {
    var movie = req.params.title;

    Rentals.find_customers_by_title(movie, function(error, customers) {
      if(error) {
        var err = new Error("No such movie");
        err.status = 404;
        next(err);
      } else {
        var obj = {};
        if (customers.length === 0) {
          obj["status"] = 204;
        } else {
          obj["status"] = 200;
        }
        obj["customers"] = customers;
        res.json(obj);
      }
    })
  }
};

module.exports = RentalsController;
