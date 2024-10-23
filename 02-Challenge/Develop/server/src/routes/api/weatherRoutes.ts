import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  const { city } = req.body;
  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    // GET weather data from city name
    const weatherData = await WeatherService.getWeatherForCity(city);

    // Save city to search history
    const newEntry = await HistoryService.addCity(city);

   return res.json({ weatherData, searchHistory: newEntry });
  } catch (error) {
   return res.status(500).json({ error: 'Failed to fetch weather data or save city to search history' });
  }
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const searchHistory = await HistoryService.getCities();
    res.json(searchHistory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await HistoryService.removeCity(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete city from search history' });
  }
});

export default router;
