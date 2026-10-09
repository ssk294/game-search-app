import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any){
    const { id } = req.query;

    if (!id || !/^\d+$/.test(String(id))){
    res.status(400).json({ error: 'id must be a number' });
    return;
    } 

    try{

        const rawgKey = process.env.RAWG_API_KEY;
        const rawgRes = await fetch(`https://api.rawg.io/api/games/${id}?key=${rawgKey}`);

        if(!rawgRes.ok) {
            res.status(502).json({ error: 'RAWG request failed' });
            return;
        }

        const game = await rawgRes.json();
        const description: string | underfined = game.description_raw;

        if (!description){
            res.status(200).json({ summary: null });
            return;
        }

        const ai = new GoogleGenAI({});

        const prompt = `あなたはゲーム紹介ライターです。以下の「ゲーム情報」だけを根拠に、日本語で３行以内で、どんなゲームかを説明してください。
        - 情報に書かれていないことは書かない
        - 分からない部分は、無理に補わない

        【ゲーム名】${game.name}
        【ゲーム情報】
        ${description.slice(0,3000)}`;

            const response = await ai.models.generateContent({
                model: 'gemini-flash-latest',
                contents: prompt,
            });

            res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=3600');
            res.status(200).json({ summary: response.text ?? null });
        } catch (error){
            console.error(error);
            res.status(500).json({ error: 'summary failed' });
        }
    }