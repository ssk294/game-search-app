import '../App.css';
interface ThreeQuestionViewProps{
    onStart: () =>void;
}

export default function ThreeQuestionView({ onStart } :ThreeQuestionViewProps){

    const handleAnswerClick = () =>{
        onStart();
    };

    return(
        <div className ="Question-Section">
            <div className ="Progress-bar">
                <div className ="Progress-bar-fill">test</div>
            </div>

            <h1 className= "Question-text">プレイするハードは？</h1>

            <div className ="Question-container">
                <button className ="Question-btn" onClick ={handleAnswerClick} >スマホ</button>
                <button className ="Question-btn" onClick ={handleAnswerClick} >ゲーム機</button>
                <button className ="Question-btn" onClick ={handleAnswerClick} >PC</button>
            </div>
        </div>
    );
}