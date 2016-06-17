var Movies = require("../models/movies");

var MoviesController = {
  index: function(req, res, next) {
    Movies.all(function(error, movies) { // this is a callback
      if(error) {
        var err = new Error("Error retrieving movies list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movies);
        // var locals = { accounts : accounts};
        // res.render("accounts/index",locals);
        }
    });
  },

  sort: function(req, res, next) {
    // // GET /search?q=tobi+ferret
    // req.query.q
    // // => "tobi ferret"

    //Send in an ORDER clause and a LIMIT with OFFSET
    var options = {
      limit : req.query.n,
      order : req.params.column,
      offset: req.query.p
    }

    // products ordered in descending fashion
    Movies.sort_by_day(options, function(error, movies) { // this is a callback
      if(error) {
        var err = new Error("No such movie");
        err.status = 404;
        next(err);
      } else {
        res.json(movies)
      }
    });
  }
};

module.exports = MoviesController;
