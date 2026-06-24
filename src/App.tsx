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

  const handleGenreSelect = (genres: string[]) =>{
    setSelectedGenres(genres);
    nextStage();
  };

  return (
    <div>
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
          onStart={() => setScreenStage(0)}
          title="test"
          image="test"
          desc="test"
          />  
      )}
    </div>
  );
}