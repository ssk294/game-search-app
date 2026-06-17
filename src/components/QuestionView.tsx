import '../App.css';
interface QuestionViewProps{
    onStart: () =>void;
}
export default function QuestionView({ onStart} :QuestionViewProps){
    return(
        <div className ="Question-Section">
            <h1 className= "Question-text">今の気分は？</h1>

            <div className ="Question-container">
                <button>手軽にプレイしたい</button>
                <button>じっくりプレイしたい</button>
            </div>
        </div>
    );
}