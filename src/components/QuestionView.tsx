import '../App.css';
interface QuestionViewProps{
    onStart: (answer: string) =>void;
    title: string;
    ansA: string;
    ansB: string;
}
export default function QuestionView({ onStart  ,title, ansA ,ansB } :QuestionViewProps){

    return(
        <div className ="Question-Section">

            <h1 className= "Question-text">{title}</h1>

            <div className ="Question-container">
                <button className ="Question-btn" onClick ={() => onStart('A')} >
                    {ansA}
                </button>

                <button className ="Question-btn" onClick ={() => onStart('B')} >
                    {ansB}
                </button>
            </div>
        </div>
    );
}