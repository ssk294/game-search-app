const TAG_CATEGORIES: { keywords: string[]; color: string; bg: string}[] = [
    {
        keywords:["Singleplayer", "Multiplayer","Co-op","Online Co-op"],
        bg: "#EEEDFE",
        color: "#3C3489",
    },
    {
        keywords:["2D", "3D", "Atmospheric", "Pixel Graphics"],
        bg: "#E1F5EE",
        color: "#085041",
    },
    {
        keywords: ["Steam Achievements", "Full controller support", "Steam Cloud", "Steam Trading Cards"],
        bg: "#FBEAF0",
        color: "#72243E",
    },
    {
        keywords: ["Story Rich", "Great Soundtrack"],
        bg: "#FFF3D6",
        color: "#7A5300",
    },
];
/*渡されたタグの名前がどのカテゴリに当てはまるか探す*/
export const getTagStyle = (tagName: string) => {
    const matched = TAG_CATEGORIES.find((category) =>                   
        category.keywords.some((keyword) =>tagName.includes(keyword))
    );

    return matched ?? { bg:"#EFEFEF", color: "#555555"};
};