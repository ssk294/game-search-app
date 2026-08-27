export default async function handler(req: any, res: any) {
    const apiKey = process.env.RAWG_API_KEY;
  
    const { genres, tags, ordering, dates, platforms } = req.query;
  
    const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&genres=${genres}&tags=${tags}&ordering=${ordering}&dates=${dates}&platforms=${platforms}&page_size=30`;
  
    const response = await fetch(apiUrl);
    const data = await response.json();
  
    res.status(200).json(data);
  }