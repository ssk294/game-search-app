import './index.css';

import { useState } from 'react';
export default function App() {
  const gameTitle = 'aaaaaaa🎮';
  const [searchTerm, setSerchTerm] = useState('');

  const handleSearch = () =>{
    alert('検索ワード: ' + searchTerm);
  };

  return(
    <div className="card">
  
    </div>
  );
  }