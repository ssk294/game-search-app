import './index.css';

import { useState } from 'react';
export default function App() {
  const gameTitle = 'おすすめのゲーム検索🎮';
  const [searchTerm, setSerchTerm] = useState('');

  const handleSearch = () =>{
    alert('検索ワード: ' + searchTerm);
  };

  return(
    <div className="card">
    <h1>🎮 {gameTitle}アプリ</h1>

    <input 
      type="text"
      placeholder="ゲーム名を入力"
      value={searchTerm}
      onChange={(e) => setSerchTerm(e.target.value)}
      className="search-text-card" />
    <button onClick={handleSearch} className="search-button">
      検索する
    </button>
    </div>
  );
  }