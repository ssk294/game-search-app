import { useState } from 'react';
import './index.css';
import './App.css';
import WelcomeView from './components/WelcomeView';
import QuestionView from './components/QuestionView';
import {QUESTION_DATA} from "./Questions";

export default function App() {

  const [screenStage, setScreenStage] = useState(0);
  const nextStage = () =>{
    setScreenStage(screenStage + 1);
  };

  return (
    <div>
      {screenStage === 0&&(
        <WelcomeView onStart={nextStage} />
      )}

      {screenStage === 1 && (
        <QuestionView 
          onStart={nextStage}
          title={QUESTION_DATA[0].title}
          ansA={QUESTION_DATA[0].ansA}
          ansB={QUESTION_DATA[0].ansB}
        />
      )}

      {screenStage === 2&& (
        <QuestionView 
          onStart={nextStage}
          title={QUESTION_DATA[1].title}
          ansA={QUESTION_DATA[1].ansA}
          ansB={QUESTION_DATA[1].ansB}
        />
      )}

    </div>
  );
}