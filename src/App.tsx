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

  const [resultGame, setResultGame] = useState<any[]>([
    { title: '', image: '', desc: '' }
  ]);

  const buildFilterParams = (answers:string[]) =>{
    let tags: string[] = [];/*選ばれたタグをどんどん追加していく箱*/
    let ordering = "-rating";/*初めに評価がいいものを入れておく*/

    if (answers[0] === "とにかく評価がいいもの！"){
      ordering = "-rating";/*orderingに評価重視を入れる*/
    } else if(answers[0] === "話題の最新作！"){
      ordering = "-released";/*リリース重視を入れる*/
    }   

    if (answers[1] === "１人でじっくり！"){
      tags.push("singleplayer");/*tagsに一人派を追加する。*/
    }else if (answers[1] === "友達や誰かとワイワイ！"){
      tags.push("multiplayer");/*tagsにマルチ派を追加する（以後同じ）*/
    }

    if (answers[2] === "3D美麗グラフィック！"){
      tags.push("3d");
    }else if (answers[2] === "2Dやイラスト！"){
      tags.push("2d");
    }

    if (answers[3] === "基本無料で気軽に始めたい！"){
      tags.push("free-to-play");
    }

    return { tags: tags.join(","), ordering };
  };

  const [screenStage, setScreenStage] = useState(0);
  const nextStage = () =>{
    setScreenStage(screenStage + 1);
  };

  const prevStage = () =>{
    if (screenStage === 6 ){
      setSelectedGenres([]);
    }

    if (screenStage === 5 ){
      setHardware('');
      setAnswers((prev) => prev.slice(0,-1));
    }

    if(screenStage >= 2 && screenStage<= 4 ){
      setAnswers((prev) => prev.slice(0,-1));
    }

    setScreenStage(screenStage - 1 );
  }

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

    const answersString = answers.join(','); 
    const genreString = genres.join(',');

    const apikey = import.meta.env.VITE_RAWG_API_KEY;

    try {

        setResultGame([]);

        setResultGame({
        title: "API接続待ち...",
        image: "https://placehold.jp/150x150.png",
        desc: "test"
      });
      
      const apiUrl = `https://api.rawg.io/api/games?key=${apikey}&genres=${genreString}&page_size=3`;
      console.log("実際に送っているURL:", apiUrl);
      const response = await fetch(apiUrl);
      const apiData = await response.json();
      console.log("APIから届いたデータ:", apiData);

      
      if (apiData.results && apiData.results.length > 0) {
        const topGames = apiData.results.slice(0, 3).map((game: any) => ({
          title: game.name,
          image: game.background_image,
          desc: `評価: ${game.rating} / 発売日: ${game.released}`
        }));
  
        setResultGame(topGames);
      } else {
        setResultGame([{
          title: "おすすめのゲームが見つかりませんでした。",
          image: "❓",
          desc : "条件にあうゲームが見つかりませんでした。"
        }]);
      }
  
      nextStage();
  
    } catch (error) {
      console.error("APIの取得に失敗しました", error);
      setResultGame([{
        title: "エラーが発生しました",
        image: "☠️",
        desc: "データの取得に失敗しました。電波のいい環境でもう一度お試しください"
      }]);
      
      nextStage();
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
          <div className ="progress-bar-fill" style={{ width:`${(screenStage - 1 )/ 5 * 100}%`}}/>
      </div>
    )}

      {screenStage === 0&&(
        <WelcomeView onStart={nextStage} />
      )}

      {screenStage === 1&& (
        <QuestionView 
          onStart={handleQuestionAnswer}
          onBack={prevStage}
          title={QUESTION_DATA[0].title}
          ansA={QUESTION_DATA[0].ansA}
          ansB={QUESTION_DATA[0].ansB}
        />
      )}

      {screenStage === 2&& (
        <QuestionView 
          onStart={handleQuestionAnswer}
          onBack={prevStage}
          title={QUESTION_DATA[1].title}
          ansA={QUESTION_DATA[1].ansA}
          ansB={QUESTION_DATA[1].ansB}
        />
      )}

      {screenStage === 3&& (
        <QuestionView 
          onStart={handleQuestionAnswer}
          onBack={prevStage}
          title={QUESTION_DATA[2].title}
          ansA={QUESTION_DATA[2].ansA}
          ansB={QUESTION_DATA[2].ansB}
        />
      )}

      {screenStage === 4&& (
        <QuestionView 
          onStart={handleQuestionAnswer}
          onBack={prevStage}
          title={QUESTION_DATA[3].title}
          ansA={QUESTION_DATA[3].ansA}
          ansB={QUESTION_DATA[3].ansB}
              />
      )}

      {screenStage === 5&& (
        <ThreeQuestionView
          onStart={handleHardwareSelect}
          onBack={prevStage}
          />
      )}

      {screenStage ===6&&(
        <GenreSelection
          onStart={handleGenreSelect}
          onBack={prevStage}
          />  
      )}

      {screenStage ===7&&(
        <ResultSection
          onStart={resetApp}
          resultGame={resultGame}
          />  
      )}
    </div>
  );
}