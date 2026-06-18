import '../App.css';
import { useState } from 'react';
import {GenreData} from '../DataFolder/GenreData';
interface GenreSelectionProps{
    onStart: () =>void;
}

export default function GenreSelection({ onStart } :GenreSelectionProps){

    const [setselectedGenres, setSelectedGenres] =useState<string[]>([]);

    const handleCardClick = (genreId: string) => {
        if (SelectedGenres.includes(genreId)){
            setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
        }   else {
                setSelectedGenres([...selectedGenres, genreId]);
        }
    };

    return(
        <div>
           <div className ="Question-Section">
                <div className ="Progress-bar">
                    <div className ="Progress-bar-fill">test</div>
                </div>

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
                </div>
            </div>
        </div>
    );
}