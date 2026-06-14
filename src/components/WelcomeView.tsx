import '../App.css';

export default function WelcomeView(){
    return(
        <div>
            <div className = "Welcome-container">
                <p className = 'Welcome-text'>
                何万件もの作品から、今のあなたに最高の作品を導き出します。まずは診断してみましょう！
                </p>

            <button className = 'start-btn'>
            START
            </button>

            </div>

        </div>
    );
}