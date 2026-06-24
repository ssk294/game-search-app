import '../App.css';
interface ResultSectionProps{
    onStart: () =>void;
}
export default function ResultSection({ onStart } :ResultSectionProps){

    const handleAnswerClick = () =>{
        onStart();
    };

    return(
    <div className ="Result-container">
        <h2>今のあなたに合うゲームはこちら！</h2>
    </div>
    );

}
