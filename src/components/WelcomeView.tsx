import '../App.css';
interface WelcomeViewProps{
    onStart: () =>void;
}
export default function WelcomeView({ onStart }: WelcomeViewProps){
    return(
        <div>
            <div className = "Welcome-container">
                <p className = 'Welcome-text'>
                何万件もの作品から、今のあなたに最高の作品を導き出します。まずは診断してみましょう！
                </p>

            <button className = 'start-btn' onClick={onStart}>
            START
            </button>

            </div>

        </div>
    );
}