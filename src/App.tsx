import { useState } from 'react';
import './index.css';
import './App.css';
import WelcomeView from './components/WelcomeView';
import QuestionView from './components/QuestionView';
import {QUESTION_DATA} from "./DataFolder/Questions";
import ThreeQuestionView from "./components/ThreeQuestionView";
import GenreSelection from "./components/GenreSelection";
import ResultSection from "./components/ResultSection";

export default function App() {

  const [answers, setAnswers] = useState<string[]>([]);
  const [hardware, setHardware] = useState<string>('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const [resultGame, setResultGame] = useState({
    title: '',
    image: '',
    desc: ''
  });

  const [screenStage, setScreenStage] = useState(0);
  const nextStage = () =>{
    setScreenStage(screenStage + 1);
  };

  const handleQuestionAnswer = (answer: string) =>{
    setAnswers([...answers,answer]);
    nextStage();
  };

  const handleHardwareSelect = (selectedHardware: string) => {
    setHardware(selectedHardware);
    nextStage();
  };

  const handleGenreSelect = async (genres: string[]) => {
    setSelectedGenres(genres);

    if(answers.length !==4){
      alert("未回答の質問があります")
      return;
    }

    if(genres.length === 0){
      alert("ジャンルを選択してください")
      return;
    }


    if(hardware === ''){
      alert("ハードウェアを回答してください");
      return;
    }


    try {
      /*
      const apiUrl = `https://api.example.com/games?hard=${hardware}&genre=${genres[0]}`;
      const response = await fetch(apiUrl);
      const apiData = await response.json();

      setResultGame({
        title: apiData.title,
        image: apiData.image,
        desc: apiData.description
      });
      */

      nextStage();

      setResultGame({
        title: "API接続待ち...",
        image: "https://placehold.jp/150x150.png",
        desc: "test"
      });

    } catch (error) {
      console.error("APIの取得に失敗しました", error);
    }

  };

  const resetApp = () => {
    setScreenStage(0);
    setAnswers([]);
    setHardware('');
    setSelectedGenres([]);
    setResultGame({ title: '', image: '', desc: '' });
  };

  return (
    <div>

    {screenStage >= 1 && screenStage <= 6 && (
      <div className ="progress-bar-container">
          <div className ="progress-bar-fill" style={{ width:`${(screenStage - 1 )/ 6 * 100}%`}}/>
      </div>
    )}

      {screenStage === 0&&(
        <WelcomeView onStart={nextStage} />
      )}

      {screenStage === 1&& (
        <QuestionView 
          onStart={handleQuestionAnswer}
          title={QUESTION_DATA[0].title}
          ansA={QUESTION_DATA[0].ansA}
          ansB={QUESTION_DATA[0].ansB}
        />
      )}

      {screenStage === 2&& (
        <QuestionView 
          onStart={handleQuestionAnswer}
          title={QUESTION_DATA[1].title}
          ansA={QUESTION_DATA[1].ansA}
          ansB={QUESTION_DATA[1].ansB}
        />
      )}

      {screenStage === 3&& (
        <QuestionView 
          onStart={handleQuestionAnswer}
          title={QUESTION_DATA[2].title}
          ansA={QUESTION_DATA[2].ansA}
          ansB={QUESTION_DATA[2].ansB}
        />
      )}

      {screenStage === 4&& (
        <QuestionView 
          onStart={handleQuestionAnswer}
          title={QUESTION_DATA[3].title}
          ansA={QUESTION_DATA[3].ansA}
          ansB={QUESTION_DATA[3].ansB}
              />
      )}

      {screenStage === 5&& (
        <ThreeQuestionView
          onStart={handleHardwareSelect}
          />
      )}

      {screenStage ===6&&(
        <GenreSelection
          onStart={handleGenreSelect}
          />  
      )}

      {screenStage ===7&&(
        <ResultSection
          onStart={resetApp}
          title={resultGame.title}
          image={resultGame.image}
          desc={resultGame.desc}
          />  
      )}
    </div>
  );
}