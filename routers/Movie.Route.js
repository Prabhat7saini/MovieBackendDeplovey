// Import the required modules
const express = require("express")
const router = express.Router();

const { getMovie ,setMovieFav,getUserFavMovies, removeFavMovie, addComment} = require("../controllers/Movie");
const {auth} =require(`../middlewares/auth`);
const { validateSchema } = require("../utils/validationSchema/userSchema");
const { commentSchema } = require("../utils/validationSchema/commentSchema");
router.post(`/setFavMovies/:movieId`,auth,setMovieFav);
router.post(`/removeFavMovies/:movieId`,auth,removeFavMovie);
router.get('/allMovies',getMovie)
router.get(`/getUserFavMovies`,auth,getUserFavMovies)
router.post('/addComment/:movieId',validateSchema(commentSchema),auth,addComment);

module.exports = router