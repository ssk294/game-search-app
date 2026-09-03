import '../App.css'
import { getTagStyle }from '../DataFolder/TagColors'
interface ResultSectionProps {
    onStart: () => void;
    resultGame: any[]; 
    onSave: (game:any) =>void;
    favorites: { title: string }[];
}


    export default function ResultSection({ onStart, resultGame, onSave, favorites }: ResultSectionProps) {
    return (
        <div className="Result-container">
            <h2 className="announce-text">今のあなたに合うゲームはこちら！</h2>

            <div className="Result-card-container">
            {resultGame && resultGame.map((game, index) => {
                const isSaved = favorites.some((f) => f.title === game.title);

                return(
            
                    <div className="Result-card" key={index}>
                        <div className="Result-title-container">
                            <h2>{game.title}</h2>

                            <button className="Save-btn" onClick={() => onSave(game)} disabled={isSaved}>
                                {isSaved ? "⭐": "❤️"}
                            </button>
                        </div>

                        <div className="Result-image-container">
                            <img src={game.image} alt={game.title} className="Result-image" />
                        </div>

                        <p className="Result-desc">{game.desc}</p>

                        <div className="Result-tags-container" >
                            {game.tags && game.tags.map((tag: string, tagIndex: number) =>{
                            const style = getTagStyle(tag);
                            
                            return(
                                <span className="Result-tag-badge" 
                                key={tagIndex}
                                style={{ backgroundColor: style.bg, color: style.color }}
                                >
                                    {tag}    
                                </span>
                            );
                        })}
                        </div>

                        <a href={game.url} className="Result-Url" target="_blank" rel= "noopener noreferrer">詳細をみる！</a>
                    </div>
                );
                })}
            </div>

        </div>
    );
}