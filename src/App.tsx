import { useState } from 'react';
import './index.css';
import './App.css';
import WelcomeView from './components/WelcomeView';
import QuestionView from './components/QuestionView';
import {QUESTION_DATA} from "./Questions";
import ThreeQuestionView from "./components/ThreeQuestionView";

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

      {screenStage === 1&& (
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

      {screenStage === 3&& (
        <QuestionView 
          onStart={nextStage}
          title={QUESTION_DATA[2].title}
          ansA={QUESTION_DATA[2].ansA}
          ansB={QUESTION_DATA[2].ansB}
        />
      )}

      {screenStage === 4&& (
          <QuestionView 
            onStart={nextStage}
            title={QUESTION_DATA[3].title}
            ansA={QUESTION_DATA[3].ansA}
            ansB={QUESTION_DATA[3].ansB}
              />
      )}

      {screenStage === 5&& (
          <ThreeQuestionView
            onStart={nextStage}
          />
      )}

    </div>
  );
}