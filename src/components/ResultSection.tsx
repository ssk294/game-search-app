import '../App.css';
interface ResultSectionProps {
    onStart: () => void;
    resultGame: any[]; 
}


    export default function ResultSection({ onStart, resultGame }: ResultSectionProps) {
    return (
        <div className="Result-container">
            <h2 className="announce-text">今のあなたに合うゲームはこちら！</h2>

            <div className="Result-card-container">
            {resultGame && resultGame.map((game, index) => (
            
                    <div className="Result-card" key={index}>
                        <h2>{game.title}</h2>

                        <div className="Result-image-container">
                            <img src={game.image} alt={game.title} className="Result-image" />
                        </div>

                        <p className="Result-desc">{game.desc}</p>

                        <div className="Result-tags-container" >
                            {game.tags && game.tags.map((tag: string, tagIndex: number) =>(
                                <span className="Result-tag-badge" key={tagIndex}>
                                    {tag}    
                                </span>
                            ))}
                        </div>

                        <a href={game.url} className="Result-Url" target="_blank" rel= "noopener noreferrer">詳細をみる！</a>
                    </div>
        
            ))}
            </div>

        </div>
    );
}