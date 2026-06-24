import '../App.css';
interface ResultSectionProps{
    onStart: () =>void;
    title: string;
    image: string;
    desc: string;
}
export default function ResultSection({ onStart ,title ,image ,desc } :ResultSectionProps){

    return(
    <div className ="Result-container">
        <h2>今のあなたに合うゲームはこちら！</h2>

        <div className="Result-card">
            <h2>{title}</h2>

            <div className ="Result-image-container">
                <img src={image} alt={title} className ="Result-image" />
            </div>

            <p className ="Result-desc" >{desc}</p>

        </div>
    </div>
    );

}
