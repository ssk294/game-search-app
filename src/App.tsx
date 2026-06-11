import './index.css';
import './App.css';
import FeaturedSection from './components/FeaturedSection';

export default function App() {
  return (
    <div>

      <header className="header-title">
        GameStation
      </header>
      
      {/*最初のナビエリア*/}
      <div className="nav-container">
        <nav>
          <ul className="nav-list">
            <li>おすすめ</li>
            <li>カテゴリー</li>
            <li>ハードウェア</li>
            <li>プレイ手段</li>
          </ul>
        </nav>

        <div className="Serch-Box">
          <input placeholder ="ゲームを検索" className="Serch-Box-design" />
        </div>

      </div>

          <FeaturedSection />

    </div>
  );
}