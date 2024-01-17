import { WeatherInfo } from "../components/WeatherInfoDisplay/WeatherInfoDisplay.types";

export const getWeatherForCity = async (city: string) => {
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/weather/${city}`);

  if (!res.ok) {
    return null;
  }
  const data = (await res.json()) as WeatherInfo;
  return data;
};
