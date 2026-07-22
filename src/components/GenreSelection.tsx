import '../App.css';
import { useState } from 'react';
import {GenreData} from '../DataFolder/GenreData';
interface GenreSelectionProps{
    onStart: (selected: string[]) =>void;
    onBack: () =>void;
}

export default function GenreSelection({ onStart, onBack } :GenreSelectionProps){

    const [selectedGenres, setSelectedGenres] =useState<string[]>([]);

    const handleCardClick = (genreId: string) => {
        if (selectedGenres.includes(genreId)){
            setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
        }   else {
                setSelectedGenres([...selectedGenres, genreId]);
        }
    };

    return(
        <div>
           <div className ="Question-Section">

                <h1 className= "Question-text">探してるジャンルは？（複数選択可）</h1>

                <div className= "GenreCard-container">
                    {GenreData.map((genre) => {
                    const isSelected = selectedGenres.includes(genre.id);

                    return (
                        <button 
                            key={genre.id}
                            className={`Cassette-card ${isSelected ? 'active' : ''}`}
                            onClick={() => handleCardClick(genre.id)}
                            >
                            
                            <div className="Cassette-name">
                                <h2>{genre.name}</h2>
                            </div>

                            <div className="Cassette-icon">
                                {genre.icon}
                            </div>

                            <div className="Cassette-desc">
                                <p>{genre.desc}</p>
                            </div>

                        </button>
                        );
                        })}

                        <div className ="btn-container">
                            <button className = 'start-btn' onClick={() => onStart(selectedGenres)}>
                            診断結果へ！
                            </button> 

                            <button  className="Back-btn-ver2" onClick={onBack}>前に戻る</button>
                        </div>
                </div>
            </div>
        </div>
    );
}