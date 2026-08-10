import { useState } from 'react';
import './index.css';
import './App.css';
import WelcomeView from './components/WelcomeView';
import QuestionView from './components/QuestionView';
import {QUESTION_DATA} from "./DataFolder/Questions";
import ThreeQuestionView from "./components/ThreeQuestionView";
import GenreSelection from "./components/GenreSelection";
import ResultSection from "./components/ResultSection";
import {PLATFORM_MAP} from "./DataFolder/Platform_Map";
import {MOCKGAMES} from "./DataFolder/MockGames";
import {scoreMockGames, formatForDisplay} from "./DataFolder/mockUtils";

export default function App() {

  const [answers, setAnswers] = useState<string[]>([]);/*4つの質問の回答をためる箱*/
  const [hardware, setHardware] = useState<string>('');/*選んだハードを入れる棚*/
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);/*選らんだジャンルを入れる箱*/

  const [resultGame, setResultGame] = useState<any[]>([/*最終的な画面に表示する情報を入れる箱*/
    { title: '', image: '', desc: '' }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  const buildFilterParams = (answers:string[], hardware: string) =>{/*buildFilterParamsは機械でanswersは材料を入れるという意味*/
    let tags: string[] = [];/*選ばれたタグをどんどん追加していく箱*/
    let ordering = "-rating";/*初めに評価がいいものを入れておく*/
    let dates = "";
    let mustBeFree = false;

    if (answers[0] === "とにかく評価がいいもの！"){
      ordering = "-rating";/*orderingに評価重視を入れる*/
    } else if(answers[0] === "話題の最新作！"){
      ordering = "-added";
      const today = new Date();
      const pastDate = new Date();
      pastDate.setDate(today.getDate() - 365);
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + 365);
      dates = `${formatDate(pastDate)},${formatDate(futureDate)}`; 
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
      mustBeFree = true;
    }

    const platformId = PLATFORM_MAP[hardware] ?? "";

    return { tags: tags.join(","), ordering, dates, platformId, mustBeFree};/*箱につめてデータを出荷*/
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

    const { tags, ordering, dates, platformId, mustBeFree } = buildFilterParams(answers, hardware);/*アンサーデータを受け取る*/
    console.log("answersの中身:", answers);
    const genreString = genres.join(',');

    const apikey = import.meta.env.VITE_RAWG_API_KEY;

    setIsLoading(true);

    try {

        setResultGame([]);

        setResultGame([{
        title: "API接続待ち...",
        image: "https://placehold.jp/150x150.png",
        desc: "test"
        }]);
      
      const apiTagsParam = mustBeFree ? "free-to-play": tags;

      const apiUrl = `https://api.rawg.io/api/games?key=${apikey}&genres=${genreString}&tags=${apiTagsParam}&ordering=${ordering}&dates=${dates}&platforms=${platformId}&page_size=30`;
      console.log("実際に送っているURL:", apiUrl);
      const response = await fetch(apiUrl);
      const apiData = await response.json();
      console.log("APIから届いたデータ:", apiData);
      console.log("APIが返した件数:", apiData.results?.length);
      console.log("1件目のtagsの中身:", apiData.results?.[0]?.tags);
      console.log("APIが返した30件のタイトル一覧:", apiData.results.map((g: any) => g.name));
      console.log("30件のそれぞれのタグ:", apiData.results.map((g: any) => ({ name: g.name, tags: g.tags?.map((t: any) =>t.slug)}))) ;

      let filteredResults = apiData.results;

      if(mustBeFree){
        filteredResults = filteredResults.filter((game: any) =>
          game.tags?.some((t: any) => t.slug ==="free-to-play")
          );
      }
      console.log("無料フィルター後の件数:", filteredResults.length);

      const requiredTags = tags.split(",").filter((t) => t !== "");
      console.log("必要なタグ一覧:", requiredTags);    

      const scoredResults = filteredResults.map((game: any) => {
        const matchCount = requiredTags.filter((requiredTag) =>
        game.tags.some((gameTag: any) => gameTag.slug === requiredTag)
        ).length;

        return{...game,matchCount };
      });
      
      const sortedResults = scoredResults.sort((a: any, b: any) => b.matchCount - a.matchCount);
      console.log("並び替え後（上位5件の一致数）:", sortedResults.slice(0, 10).map((g: any) => g.matchCount));

      if (sortedResults.length > 0){
        const topGames = sortedResults.slice(0, 10).map((game: any) => ({
          title: game.name,
          image: game.background_image,
          desc: `評価: ${game.rating} / 発売日: ${game.released}` ,
          url: `https://rawg.io/games/${game.slug}`,/*URLも飛べるように*/
          tags: (game.tags ?? []).filter((t: any) => t.language === "eng").slice(0, 5).map((t: any) => t.name),/*ゲームのタグの上位５件を英語のフィルタリングして表示*/
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
      console.error("APIの取得に失敗しました。モックデータを使用します。", error);

      const requiredTags = tags.split(",").filter((t) => t !== "");

      const mockScored = scoreMockGames(MOCKGAMES,{
        genreList: genres,
        requiredTags,
        platformId,
        mustBeFree,
      });

      setResultGame(formatForDisplay(mockScored));
      nextStage();
      
    }finally{
      setIsLoading(false);
    }

  };

    const resetApp = () => {
    setScreenStage(0);
    setAnswers([]);
    setHardware('');
    setSelectedGenres([]);
    setResultGame([{ title: '', image: '', desc: '' }]);
  };

  return (
    <div>
      {isLoading &&(
        <div className="Loading-overlay">
          <p className="Loading-text">Now Loading...</p>
        </div>
      )}

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