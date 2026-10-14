const tagJa: Record<string, string> = {
    Singleplayer: 'ソロプレイ',
    Multiplayer: 'マルチプレイ',
    'Co-op': '協力',
    'Story Rich': '豪華ストーリー',
    'Steam Achievements': 'Steam実績',
    'Full controller support':'コントローラー対応',
    Atmospheric: '雰囲気重視',
    Horror: 'ホラー',
    'Great Soundtrack': '音楽の良い',
    'Partial Controller Support': 'コントローラー部分的対応',
    Sandbox: 'サンドボックス',
    Comedy: 'コメディ',
    'Free to Play': '無料プレイ',
    cooperative: '協力型',
    'Third Person': '三人称',
    'Steam Cloud': 'Steamクラウド',
    'Difficult': '難しい',
    'Open World': 'オープンワールド',
    'Pixel Graphics': 'ピクセルグラフィック',
    'Female Protagonist': '女性主人公'
};

export const getTagJa = (tagName: string) => {
    return tagJa[tagName] || tagName
};