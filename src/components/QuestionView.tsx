import '../App.css';
interface QuestionViewProps{
    onStart: () =>void;
    title: string;
    ansA: string;
    ansB: string;
}
export default function QuestionView({ onStart  ,title, ansA ,ansB } :QuestionViewProps){

    const handleAnswerClick = () =>{
        onStart();
    };

    return(
        <div className ="Question-Section">
            <div className ="Progress-bar">
                <div className ="Progress-bar-fill">test</div>
            </div>

            <h1 className= "Question-text">{title}</h1>

            <div className ="Question-container">
                <button className ="Question-btn" onClick ={handleAnswerClick} >{AnsA}</button>
                <button className ="Question-btn" onClick ={handleAnswerClick} >{AnsB}</button>
            </div>
        </div>
    );
}