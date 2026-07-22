import '../App.css';
interface ThreeQuestionViewProps{
    onStart: (hardware: string) =>void;
    onBack: () => void;
}

export default function ThreeQuestionView({ onStart, onBack } :ThreeQuestionViewProps){

    return(
        <div className ="Question-Section">

            <h1 className= "Question-text">プレイするハードは？</h1>

            <div className ="Question-container">
                <button className ="Question-btn" onClick ={() => onStart('スマホ')} >スマホ</button>
                <button className ="Question-btn" onClick ={() => onStart('PS5')} >PS5</button>
                <button className ="Question-btn" onClick ={() => onStart('PC')} >PC</button>
                <button className ="Question-btn" onClick ={() => onStart('Switch')} >Switch</button>
            </div>

            <button  className="Back-btn" onClick={onBack}>前に戻る</button>

        </div>
    );
}