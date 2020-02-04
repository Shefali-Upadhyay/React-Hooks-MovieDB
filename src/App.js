import React, {useEffect, useState} from 'react';
import axios from 'axios'
import './App.css';
import Loader from 'react-loader-spinner';
import Search from './components/Search';
import MovieDetails from './components/MovieDetails';

function App() {
  const [loading, setLoading] = useState(true);
  const [moviesArr, setMoviesArr] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchValueError, setSearchValueError] = useState();
  const trendingMoviesUrl = "https://api.themoviedb.org/3/trending/all/day?api_key=c6b740fc5c62783128ecddbbbab989cf";
  
  const dataFetcherHandler = (url) => {
    axios.get(url)
      .then(response => {
        setMoviesArr(response.data.results);
        setLoading(false);
      })
      .catch(error => {
        setErrorMessage(error);
      })
  };

  useEffect(() => {
    dataFetcherHandler(trendingMoviesUrl);
  }, []);

  const search = (searchValue) => {
    const searchMoviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=c6b740fc5c62783128ecddbbbab989cf&query=${searchValue}`;
    setLoading(true);
    setSearchValueError(searchValue);
    dataFetcherHandler(searchMoviesUrl);
  };

  return (
    <div className='container'>
      <h1 className='text-center head'>The MovieDB Website</h1>
      <Search search={search}/>
      <div>
        {loading && !errorMessage ? (
          <div className="row h-100">
          <div className="col-sm-12 my-auto">
            <div className="card card-block w-25 mx-auto border-0">
            Loading...<Loader type="BallTriangle" color="black" height={100} width={100} />
            </div>
          </div>
        </div>
        ) : errorMessage ? (
          <div className="text-center text-danger">{errorMessage}</div>
        ) : moviesArr && Array.isArray(moviesArr) && moviesArr.length > 1 ? (
          moviesArr.map((movie) => (
        <MovieDetails key='movie.id' movie={movie} />
      ))

        ) : (
          <div className="text-center text-danger">
            {`Sorry, we couldn't find any results for '${searchValueError}'!`}
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
