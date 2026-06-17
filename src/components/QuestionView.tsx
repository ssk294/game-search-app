import '../App.css';
interface QuestionViewProps{
    onStart: () =>void;
}
export default function QuestionView({ onStart} :QuestionViewProps){
    return(
        <div className ="Question-Section">
            <div className ="Progress-bar">
                <div className ="Progress-bar-fill">test</div>
            </div>

            <h1 className= "Question-text">今の気分は？</h1>

            <div className ="Question-container">
                <button className ="Question-btn">手軽にプレイしたい</button>
                <button className ="Question-btn">じっくりプレイしたい</button>
            </div>
        </div>
    );
}