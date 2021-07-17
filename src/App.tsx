import { useEffect, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';


import './styles/global.scss';

export function App() {

  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const handleClickButton = (selectedGenreId:number) : void => {
    console.log("clicked!");
    setSelectedGenreId(selectedGenreId)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar selectedGenreId = {selectedGenreId} handleClickButton = {handleClickButton} />
      <Content selectedGenreId = {selectedGenreId}/>
    </div>
  )
}