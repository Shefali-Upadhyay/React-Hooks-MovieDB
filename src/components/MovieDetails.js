import React from 'react'
import MovieImage from './MovieImage';
import MovieTitle from './MovieTitle';

function MovieDetails({movie}) {
  const movieReleaseDate =
		movie.release_date === undefined
			? new Date(movie.first_air_date).getFullYear().toString()
			: new Date(movie.release_date).getFullYear().toString();

	return (
		<div className='m-3 pt-2 px-2 border border-dark rounded'>
			<div className='row'>
				<div className='col-sm-4 mx-auto d-flex justify-content-center flex-wrap'>
					<MovieImage movie={movie} width="100%" />
				</div>
				<div className='col-sm-8'>
          <MovieTitle movie={movie} />
          <p className='movie-title'>({isNaN(movieReleaseDate) ? 'No Date' : movieReleaseDate})</p>
          <p className='movie-detail'>{movie.overview}</p>
        </div>
			</div>
		</div>
	);
}

export default MovieDetails
