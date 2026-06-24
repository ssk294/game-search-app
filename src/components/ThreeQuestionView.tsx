import '../App.css';
interface ThreeQuestionViewProps{
    onStart: (hardware: string) =>void;
}

export default function ThreeQuestionView({ onStart } :ThreeQuestionViewProps){

    return(
        <div className ="Question-Section">
            <div className ="Progress-bar">
                <div className ="Progress-bar-fill">test</div>
            </div>

            <h1 className= "Question-text">プレイするハードは？</h1>

            <div className ="Question-container">
                <button className ="Question-btn" onClick ={() => onStart('スマホ')} >スマホ</button>
                <button className ="Question-btn" onClick ={() => onStart('ゲーム機')} >ゲーム機</button>
                <button className ="Question-btn" onClick ={() => onStart('PC')} >PC</button>
            </div>
        </div>
    );
}