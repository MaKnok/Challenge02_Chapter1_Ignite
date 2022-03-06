import { memo } from 'react';
import { MovieCard } from './MovieCard';
import { Header } from './Header'; 

import '../styles/content.scss';


interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps{
  selectedGenreId: number;
  movies: MovieProps[];
}

function ContentComponent({
  selectedGenreId,
  movies
}: ContentProps) {


  return (      

      <div className="container">
        
        <Header selectedGenreId={selectedGenreId}></Header>

        <main>
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
            ))}
          </div>
        </main>
      </div>
  
  )

}

export const Content = memo(ContentComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.selectedGenreId, nextProps.selectedGenreId);
})