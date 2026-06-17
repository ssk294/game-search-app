import { useState } from 'react';
import './index.css';
import './App.css';
import WelcomeView from './components/WelcomeView';
import QuestionView from './components/QuestionView';

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
        <QuestionView onStart={nextStage}/>
      )}

      {screenStage === 2&& (
        <QuestionView onStart={nextStage}/>
      )}

    </div>
  );
}