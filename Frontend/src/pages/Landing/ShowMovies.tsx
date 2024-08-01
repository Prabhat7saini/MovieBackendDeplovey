import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import MovieCard from '../../component/common/MovieCard';
import { fetchFavMovie, fetchMovies } from '../../services/operations/Moviesapi';
import { useDispatch, useSelector } from 'react-redux';
import { setFavMovie, setLoading } from '../../redux/slices/movieSlice';
import { RootState } from '../../redux/store';
import Loader from '../../component/common/Loader';

const ShowMovies: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);

  const token: string = useSelector((state: RootState) => state.auth.token) as string 
  const loading=useSelector((state:RootState)=>state.movies.loading)

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAndSetMovies = async () => {
      try {
        dispatch(setLoading(true));
        const moviesRes = await fetchMovies();
        setMovies(moviesRes);

        if (token) {
          const favMoviesRes = await fetchFavMovie(token);
          // setFavMovies(favMoviesRes?.data.favMovies || []);
          dispatch(setFavMovie(favMoviesRes?.data.favMovies || []))
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
      finally{
        dispatch(setLoading(false))
      }
    };

    fetchAndSetMovies();
  }, [token]);

  return (
    loading ?(<Loader/>):( <Grid container spacing={2} sx={{ marginTop: "5px" }}>
      {movies.length > 0 ? (
        movies.map((ele, index) => (
          <Grid key={index} item xs={12}>
            <MovieCard
              Title={ele.Title}
              Poster={ele.Poster}
              Ratings={ele.Ratings[1].Value}
              Plot={ele.Plot}
              Year={ele.Year}
              _id={ele._id}
            />
          </Grid>
        ))
      ) : (
        <></>
      )}
    </Grid>)
   
  );
};

export default ShowMovies;
