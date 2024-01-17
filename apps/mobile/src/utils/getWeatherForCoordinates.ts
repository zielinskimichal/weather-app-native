import { WeatherInfo } from "../components/WeatherInfoDisplay/WeatherInfoDisplay.types";

export const getWeatherForCoordinates = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const res = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/weather?latitude=${latitude}&longitude=${longitude}`,
  );
  if (!res.ok) {
    return null;
  }
  const data = (await res.json()) as WeatherInfo;
  return data;
};
