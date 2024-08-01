
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/user/SignUp'; // Adjust the path as necessary
import Login from './pages/user/Login';
import ShowMovies from './pages/Landing/ShowMovies';
import FavMovies from './pages/user/FavMovies';
import Navbar from './component/common/Navbar';
import MovieDetailCard from './component/common/MovieDetailsCard';
// import Loader from './component/common/Loader';

function App() {
  return (
    <Router>
      <Navbar/>
      {/* <Loader></Loader> */}
      <Routes>
        <Route path='/' element={<ShowMovies/>}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/favmovie' element={<FavMovies/>}/>
        <Route path='/movie-details/:_id' element={<MovieDetailCard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
