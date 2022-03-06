import { useEffect, useState, useMemo } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';

import { api } from './services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

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

export function App() {

  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenreId]);

  const handleClickButton = (selectedGenreId:number) : void => {
    console.log("clicked!");
    setSelectedGenreId(selectedGenreId)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar genres = {genres} selectedGenreId = {selectedGenreId} handleClickButton = {handleClickButton} />
      <Content selectedGenreId = {selectedGenreId} movies = {movies}/>
    </div>
  )
}