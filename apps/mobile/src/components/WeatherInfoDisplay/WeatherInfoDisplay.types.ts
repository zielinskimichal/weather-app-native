export type WeatherInfo = {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  conditions: string;
  iconUrl: string;
};

export type WeatherInfoDisplayProps = {
  data: WeatherInfo | null;
};
