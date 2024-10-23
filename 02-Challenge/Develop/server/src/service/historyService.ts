import fs from "fs";
import path from "path";
import {v4 as uuidv4} from "uuid";

const filePath = path.join(__dirname, "../../data/searchHistory.json");

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(JSON.parse(data));
      });
    });
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, JSON.stringify(cities, null, 2), (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  public async getCities(): Promise<City[]> {
    return this.read();
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  public async addCity(city: string): Promise<City> {
    const cities = await this.read();
    const newCity = { id: uuidv4(), name: city };
    cities.push(newCity);
    await this.write(cities);
    return newCity;
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  public async removeCity(id: string): Promise<void> {
    const cities = await this.read();
    const updatedCities = cities.filter(city => city.id !== id);
    await this.write(updatedCities);
  }
}

export default new HistoryService();
