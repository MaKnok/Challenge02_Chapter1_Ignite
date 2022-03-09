import { memo, useState, useMemo } from 'react';
import { List, AutoSizer, ListRowRenderer } from 'react-virtualized';
import { MovieCard } from './MovieCard';
import { Header } from './Header'; 
import { api } from '../services/api';

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
}

function ContentComponent({
  selectedGenreId,
}: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useMemo(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenreId])

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return(
      <div key ={key} style={style}>
          <MovieCard 
            title={movies[index].Title} 
            poster={movies[index].Poster} 
            runtime={movies[index].Runtime} 
            rating={movies[index].Ratings[0].Value} 
          />
      </div>
      
    );
  }

  return (      

      <div className="container">
        
        <Header selectedGenreId={selectedGenreId}></Header>

        <main>

          <div className="movies-list">
            <AutoSizer>
            {({width, height}) => (
              <List
                height={height}
                rowHeight={340}
                width={width}
                overscanRowCount={5}
                rowCount={movies.length}
                rowRenderer={rowRenderer}
               
              />
            )}
            </AutoSizer>
          
          </div>
        </main>
      </div>
  
  )

}

export const Content = memo(ContentComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.selectedGenreId, nextProps.selectedGenreId);
})