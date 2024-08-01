const Movie = require("../models/movies.models");
const User=require('../models/user.models')
const mongoose=require('mongoose')
const Comment=require("../models/comment.models")

exports.getMovie = async (req, res) => {
  try {
    const allMovie = await Movie.find()
    .populate({
      path: 'commentIds', 
      populate: {
        path: 'userId', 
        select: '-_id name' 
      }
    })
    .exec();
     
    return res.status(200).json({
      success: true,
      message: "Movies retrieved successfully.",
      allMovie
    });
  } catch (error) {
    console.error(error.message); 
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching movies."
    });
  }
};




exports.setMovieFav = async (req, res) => {
  try {
    const { movieId } = req.params; 
    const userId = req.userId; 
const users=req.user;
// console.log(`userid->${userId}  \n user-> ${users.id}`)
    // Find the movie by ID
    const favMovie = await Movie.findById(movieId);
    if (!favMovie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found."
      });
    }

    // Find the user and update the favMovie array
    const user = await User.findById(users.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    // Check if the movie is already in the favorites
    if (user.FavMovie.includes(movieId)) {
      return res.status(400).json({
        success: false,
        message: "Movie is already in favorites."
      });
    }

    // Add the movie to the user's favMovies array
    user.FavMovie.push(movieId);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Movie added to favorites successfully.",
      favMovies: User.favMovies
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while setting the favorite movie."
    });
  }
};







exports.removeFavMovie = async (req, res) => {
  try {
    const { movieId } = req.params; 
    const user = req.user;
    const userId=user.id

    
    const movieObjectId = new mongoose.Types.ObjectId(movieId) ;

    // Find the user and update the favMovies array
    const userDoc = await User.findById(userId);

    if (!userDoc) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    
    if (!userDoc.FavMovie.filter(id => id.equals(movieObjectId))) {
      return res.status(400).json({
        success: false,
        message: "Movie is not in favorites."
      });
    }

    
    userDoc.FavMovie = userDoc.FavMovie.filter(id => !id.equals(movieObjectId));

        await userDoc.save();

    
    const populatedUserDoc = await User.findById(userId).populate('FavMovie');

    return res.status(200).json({
      success: true,
      message: "Movie removed from favorites successfully.",
      favMovies: populatedUserDoc.FavMovie 
    });
  } catch (error) {
    console.error("Error removing favorite movie:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while removing the favorite movie."
    });
  }
};




exports.getUserFavMovies = async (req, res) => {
  try {
    const userId = req.user; 


    const user = await User.findById(userId.id).populate({
      path: 'FavMovie',
      populate: {
        path: 'commentIds',
        populate: {
          path: 'userId', 
          select: '-_id name' 
        }
      },


    }).exec();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

   
    const favMovies = user.FavMovie;

    if (!favMovies || favMovies.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No favorite movies found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Favorite movies retrieved successfully.",
      favMovies 
    });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving favorite movies."
    });
  }
};



exports.addComment = async (req, res) => {
  try {
    const { movieId } = req.params;
    const user = req.user;
    const userId = user.id;
    const { text ,rating} = req.body;

    if (!text || !rating) {
      console.log(`text->${text}\n rating ${rating}`)
      return res.status(400).json({
        success: false,
        message: "Comment and rating both  is required"
      });
    }

    // Create a new comment
    const newComment = await Comment.create({
      text,
      rating,
      userId
    });

    // Find the movie
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found"
      });
    }

    
    if (!Array.isArray(movie.commentIds)) {
      movie.commentIds = [];
    }

    // Add the new comment ID
    movie.commentIds.push(newComment._id);

    // Save the updated movie document
    await movie.save();

    return res.status(201).json({
      success: true,
      message: "Comment successfully created",
    
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding the comment"
    });
  }
};
