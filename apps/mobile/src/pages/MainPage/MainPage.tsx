import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";

import { WeatherInfoDisplay } from "../../components/WeatherInfoDisplay/WeatherInfoDisplay";
import { weatherInfoDisplayMocks } from "../../components/WeatherInfoDisplay/WeatherInfoDisplay.mocks";
import { WeatherInfo } from "../../components/WeatherInfoDisplay/WeatherInfoDisplay.types";
import { getUserLocation, LocationType } from "../../utils";
import { getWeatherForCity } from "../../utils/getWeatherForCity";
import { getWeatherForCoordinates } from "../../utils/getWeatherForCoordinates";

export const MainPage = () => {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState<string | null>(null);

  const { longitude, latitude } = location || {};

  useEffect(() => {
    getUserLocation(setLocation);
  }, []);

  useEffect(() => {
    const fetchWeatherInfo = async () => {
      if (city) {
        const data = await getWeatherForCity(city);
        setWeatherInfo(data);
      } else if (longitude && latitude) {
        const data = await getWeatherForCoordinates({
          latitude,
          longitude,
        });
        setWeatherInfo(data);
      } else {
        setWeatherInfo(null);
      }
    };

    fetchWeatherInfo();
  }, [longitude, latitude, city]);

  return (
    <View>
      <Searchbar
        placeholder="Search for a city"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={() => setCity(searchQuery)}
        style={styles.searchbar}
      />
      <WeatherInfoDisplay data={weatherInfo} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    marginTop: 20,
  },
});
