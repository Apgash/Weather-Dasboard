import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
interface Weather {
  city: string;
  date: string;
  description: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
}
// TODO: Complete the WeatherService class
class WeatherService {
   private baseURL: string;
   private apiKey: string;

  constructor() {
    this.baseURL = 'https://api.openweathermap.org/data/2.5/weather';
    this.apiKey = process.env.API_KEY || '';
  }

  private async fetchLocationData(city: string): Promise<Coordinates> {
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`);
    const data = response.data[0];
    return { lat: data.lat, lon: data.lon };
  }
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const query = this.buildWeatherQuery(coordinates);
    const response = await axios.get(query);
    return response.data;
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    return {
      temperature: response.main.temp,
      description: response.weather[0].description,
      city: response.name,
      date: new Date().toLocaleDateString(),
      humidity: response.main.humidity,
      windSpeed: response.wind.speed,
      uvIndex: 0,
    };
  }
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  public async getWeatherForCity(city: string): Promise<Weather> {
    const coordinates = await this.fetchLocationData(city);
    const weatherData = await this.fetchWeatherData(coordinates);
    return this.parseCurrentWeather(weatherData);
  }
}

export default new WeatherService();
