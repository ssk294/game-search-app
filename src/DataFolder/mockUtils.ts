export function scoreMockGames(
    game:any[],
    {
        genreList,
        requiredTags,
        platformId,
        mustBeFree,
    }: {genreList: string[]; requiredTags: string[]; platformId: string; mustBeFree: boolean}
){
    let candidates = games;

    if(mustBeFree){
        candidates = candidates.filter((game) =>
        game.tags?.some((t: any) => t.slug === "free-to-play")
        );
    }

    const scored = candidates.map((game) =>{
        let matchCount = 0;

        if(genreList.some((g) => game.genres?.some((gg: any) => String(gg.id) === g))){
            matchCount += 1;
        }

        return { ...game,matchCount};
    });
}

export function formatForDisplay(games: any[]){
    return games.slice(0,10).map((game: any) => ({
        title: game.name,
        image: game.background_image,
        desc:`評価: ${game.rating} / 発売日: ${game.released}`,
        url: `https://rawg.io/games/${game.slug}`,
        tags: (game.tags ?? [])
            .filter((t: any) => t.language === "eng")
            .slice(0, 5)
            .map((t: any) => t.name),
    }));
}