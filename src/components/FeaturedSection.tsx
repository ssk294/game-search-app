import '../App.css';

export default function FeaturedSection(){
    return(
        <div className='featured-section'>
            <h2>あなたへのおすすめ</h2>
            
            <div className="feature-card">
                <div className="feature-left">
                <img src="/test.png" alt="仮画像" className="main-image"/>
                </div>

                <div className="feature-right">
                    <h3 className="game-title">タイトル</h3>
                        <ul className="sub-image-container">
                        <li><img src="/test.png" alt="仮画像" className="sub-image" /></li>
                        <li><img src="/test.png" alt="仮画像" className="sub-image" /></li>
                        <li><img src="/test.png" alt="仮画像" className="sub-image" /></li>
                        <li><img src="/test.png" alt="仮画像" className="sub-image" /></li>
                        </ul>

                        <div className ="game-info-tags">
                            <div className="game-genre">
                                <span>アクション</span>
                                <span>オープンワールド</span>
                            </div>
                        </div>

                        <div className ="review-rating">
                            レビュー:<span className ="rating-status">好評</span>
                        </div>

                        <div className ="price-display">
                            <span className ="discount-rate">-50%</span>
                            <span className ="original-price">￥7600</span>
                            <span className ="sale-price">￥3800</span>
                        </div>
                </div>

            </div>

        </div>
    );
}