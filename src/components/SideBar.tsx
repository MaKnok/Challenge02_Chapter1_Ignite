import { Button } from './Button';
import { useEffect, useState } from 'react';

import '../styles/sidebar.scss';

import { api } from '../services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps{
  selectedGenreId: number;
  handleClickButton(arg: number) : void;
}



export function SideBar(props: SideBarProps) {

  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    setSelectedGenreId(selectedGenreId)
  }, [selectedGenreId]);


  /*function handleClickButton(selectedGenreId: number) {
    setSelectedGenreId(selectedGenreId);
  }*/


  return (
  
      <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => props.handleClickButton(genre.id)}
              selected={props.selectedGenreId === genre.id}
            />
          ))}
        </div>
      </nav>
    
  );

}