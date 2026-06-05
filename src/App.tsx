import './index.css';
import './App.css';

export default function App() {
  return (
    <div>

      <header>
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

    </div>
  );
}