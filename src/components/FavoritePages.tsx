import '../App.css';
import {GenreData} from '../DataFolder/GenreData';

export interface FavoriteGame {
    title: string;
    image: string;
    desc: string;
    url?: string;
    tags?: string[];
    genreIds: string[];
}

interface FavoritePageProps {
    favorites: FavoriteGame[];
    onRemove: (title: string) => void;
    onBack: () => void;
}

export default function FavoritePages({ favorites, onRemove, onBack }: FavoritePageProps) {
    return (
        <div>
            <button className="Back-btn-to-WelcomeView" onClick={onBack}>
                診断ページに戻る
            </button>

            <h1 className="FavoritePages-header">保存したゲーム一覧</h1>

            {GenreData.map((genre) => {
                const gamesInGenre = favorites.filter((game) => 
                game.genreIds.includes(genre.id)
                );

                if (gamesInGenre.length === 0){
                    return null;
                }

                return (
                    <div key={genre.id} className="Favorite-genre-section">
                        <h2>{genre.icon} {genre.name}</h2>

                    <div className="Favorite-scroll-wrapper">
                    <div className="Favorite-scroll-row">
                        {gamesInGenre.map((game) => (
                            <div key={game.title} className="Favorite-card">
                            <p className="Favorite-card-title">{game.title}</p>
                            <img src={game.image} alt={game.title} className="Favorite-card-art" />
                            <div className="Result-tags-container" >
                            {game.tags && game.tags.map((tag: string, tagIndex: number) =>(
                                <span className="Favorite-tag-badge" key={tagIndex}>
                                    {tag}    
                                </span>
                            ))}
                        </div>
                            <a href={game.url} className="Favorite-URL" target="_blank" rel= "noopener noreferrer">詳細をみる！</a>
                            <button className="Favorite-remove-btn" onClick={() => onRemove(game.title)}>
                            お気に入りから外す
                            </button>
                            </div>
                        ))}
                    </div>
                    </div>
                    </div>
                );
            })}

            {favorites.length === 0 && (
                <p>まだ保存したゲームがありません</p>
            )}

        </div>
    );
}