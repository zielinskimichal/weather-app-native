import { Injectable } from '@nestjs/common';
import { WeatherResponseDto } from './dto/weather.response.dto';
import { WeatherApiResponseDto } from './dto/WeatherApiResponse.dto';

@Injectable()
export class WeatherService {
  private readonly apiKey: string;
  constructor() {
    const _apiKey = process.env.WEATHERAPI_KEY;
    if (!_apiKey) {
      throw new Error('WEATHERAPI_KEY is not set');
    }
    this.apiKey = _apiKey;
  }

  private async fetchWeather(q: string): Promise<WeatherApiResponseDto> {
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${q}`,
    );

    if (!res.ok) {
      throw new Error('Error fetching weather');
    }

    return (await res.json()) as WeatherApiResponseDto;
  }

  private createWeatherResponse(
    weatherData: WeatherApiResponseDto,
  ): WeatherResponseDto {
    const weatherResponse: WeatherResponseDto = {
      city: weatherData.location.name,
      temperature: weatherData.current.temp_c,
      conditions: weatherData.current.condition.text,
      // the external api adds '//' to the begining of the icon url for some reason
      iconUrl: weatherData.current.condition.icon.replace('//', ''),
      humidity: weatherData.current.humidity,
      windSpeed: weatherData.current.wind_kph,
    };
    return weatherResponse;
  }

  public async getWeatherForCity(city: string): Promise<WeatherResponseDto> {
    const weatherData = await this.fetchWeather(city);
    return this.createWeatherResponse(weatherData);
  }

  public async getWeatherForCoordinates(
    lat: number,
    lon: number,
  ): Promise<WeatherResponseDto> {
    const weatherData = await this.fetchWeather(`${lat},${lon}`);
    return this.createWeatherResponse(weatherData);
  }
}
